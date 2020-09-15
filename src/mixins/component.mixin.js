/**
 The component mixin
 */
import { v4 as UUID } from 'uuid';
import { findIndex }  from 'lodash-es';
import Sortable       from 'sortablejs/modular/sortable.core.esm.js';

// Exported interface
export default {

    // Component data
    data () {
        return {

            isDragging: false,

            blockWidthPercentage: 100 / this.blocksPerRow,

            // Local data
            rows: []

        };
    },

    // Computed props
    computed: {

        // Compile a set of sortable options
        getSortableOptions () {

            return {
                ...this.sortableOptions,
                ...{

                    ghostClass     : this.sortableGhostClass,
                    chosenClass    : this.sortableChosenClass,
                    dragClass      : this.sortableDragClass,
                    animation      : this.sortableAnimation,
                    disabled       : this.mode === 'view',
                    group          : this.enableMoveBlocksBetweenRows ? 'vld' : undefined,
                    filter         : '.no-drag',
                    preventOnFilter: true,
                    onUpdate       : this.onUpdate,
                    onRemove       : this.onRemove,
                    onAdd          : this.onAdd,

                    // Chrome has a hover bug https://github.com/SortableJS/Sortable/issues/232
                    onStart: this.onStart,
                    onEnd  : this.onEnd

                }
            };

        },

        // Cleanup the model for caller
        model () {
            return this.rows.map ( row => {
                return {
                    blocks: row.blocks.map ( block => {
                        return {
                            span   : block.span,
                            content: block.content
                        };
                    } )
                };
            } );
        }

    },

    // Watchers
    watch: {

        // When blocks per row changes, re-calculate the width of each block "space"
        blocksPerRow ( n, o ) {
            if ( n !== o ) {
                this.blockWidthPercentage = 100 / this.blocksPerRow;
            }
        },

        // When mode changes, update the "handle" option
        mode ( n, o ) {
            if ( n !== o ) {

                // For view mode create a non-existent handle to disable DnD
                const disable = n === 'view';

                this.rows.forEach ( row => {

                    const $comp = this.$refs[ `row_${ row._id }` ];
                    if ( $comp.length === 0 ) {
                        throw new Error ( `Unable to locate DOM element for row ${ row._id }.` );
                    }

                    Sortable
                        .get ( $comp[ 0 ] )
                        .option ( 'disabled', disable )
                    ;

                } );

            }
        }

    },

    // Component methods
    methods: {

        // Fire input event for v-model
        fireChanged () {
            this.$emit ( 'input', this.model );
        },

        // Remove row class to disable hover state
        onStart ( e ) {

            e.target.classList.remove ( 'use-hover' );
            this.isDragging = true;

        },

        // Add row class to enable hover state
        onEnd ( e ) {

            e.target.classList.add ( 'use-hover' );
            this.isDragging = false;

        },

        // When a sortable row is updated (block moved)
        onUpdate ( e ) {

            // Did it actually move?
            if ( e.oldDraggableIndex === e.newDraggableIndex ) {
                return;
            }

            // Get the updated row
            const rowId = e.from.getAttribute ( 'data-id' );
            const row = this.rows.find ( x => x._id === rowId );

            // Move the item in the model
            const temp = row.blocks.splice ( e.oldDraggableIndex, 1 );
            row.blocks.splice ( e.newDraggableIndex, 0, temp[ 0 ] );

            // Update model
            this.fireChanged ();

        },

        // When a sortable block is removed its row
        onRemove ( e ) {

            // Get the row the block was removed from
            const rowId = e.from.getAttribute ( 'data-id' );
            const row = this.rows.find ( x => x._id === rowId );

            // Remove from the model
            row.blocks.splice ( e.oldDraggableIndex, 1 );

            // Update model
            this.fireChanged ();

        },

        // When a sortable block is added to another sortable row
        onAdd ( e ) {

            // Get the row the block was added to
            let rowId = e.to.getAttribute ( 'data-id' );
            const destRow = this.rows.find ( x => x._id === rowId );

            // Get the block
            rowId = e.from.getAttribute ( 'data-id' );
            const sourceRow = this.rows.find ( x => x._id === rowId );
            const blockId = e.item.getAttribute ( 'data-id' );
            const block = sourceRow.blocks.find ( x => x._id === blockId );

            // Add block to new row
            destRow.blocks.splice ( e.newDraggableIndex, 0, block );

            // Update model
            this.fireChanged ();

        },

        // Initialise the whole grid
        initGrid () {

            for ( const [ , row ] of this.rows.entries () ) {
                this.initSortableRow ( row );
            }

        },

        // Initialise a single row
        initSortableRow ( row ) {

            // Get the UI element
            const $comp = this.$refs[ `row_${ row._id }` ];
            if ( $comp.length === 0 ) {
                throw new Error ( `Unable to locate DOM element for row ${ row._id }.` );
            }

            Sortable.create (
                $comp[ 0 ],
                this.getSortableOptions
            );

        },

        // Compile list styles
        getBlockStyles ( row, block ) {

            return {
                margin                : `${ this.blockMargin }px`,
                '--block-width'       : `${ this.blockWidthPercentage * block.span }%`,
                '--block-total-margin': `${ 2 * this.blockMargin }px`,
                cursor                : this.mode === 'edit' ? 'pointer' : 'inherit',
                'min-height'          : `${ this.minBlockHeight }px`
            };

        },

        // Get common animation transition style
        getAnimationStyle () {

            if ( this.sortableAnimation === 0 ) {
                return {};
            }

            const secs = this.sortableAnimation / 1000;

            return {
                transition: `all ${ secs }s ease-in`
            };

        },

        // Expand the span of a block
        expandBlock ( row, block, num = 1 ) {

            if ( block.span >= this.blocksPerRow ) {
                return;
            }

            block.span += num;

            this.fireChanged ();

        },

        // Collapse the span of a block
        collapseBlock ( row, block, num = 1 ) {

            if ( block.span <= 1 ) {
                return;
            }

            block.span -= num;

            this.fireChanged ();

        },

        // Delete a block
        deleteBlock ( row, block ) {

            const blockIdx = findIndex ( row.blocks, x => x._id === block._id );
            row.blocks.splice ( blockIdx, 1 );

            this.fireChanged ();

        },

        // Add a block to a row
        addBlock ( row, span = 1 ) {

            const block = {
                _id    : UUID (),
                content: '',
                span   : span
            };

            row.blocks.push ( block );

            // Update model
            this.fireChanged ();

        },

        // Delete a row
        deleteRow ( row ) {

            // Remove row from our model
            this.rows.splice (
                findIndex ( this.rows, x => x._id === row._id ),
                1
            );

            // Update model
            this.fireChanged ();

        },

        // Add a new row
        addRow () {

            const row = {
                _id   : UUID (),
                blocks: [
                    {
                        _id    : UUID (),
                        content: '',
                        span   : this.blocksPerRow
                    }
                ]
            };
            this.rows.push ( row );

            // Init sortable
            this.$nextTick ( () => {

                this.initSortableRow ( row );

                // Update model
                this.fireChanged ();

            } );

        }

    },

    created () {

        // Initialise grid default if no grid given
        if ( ( this.value || [] ).length === 0 ) {

            this.rows = [
                {
                    _id   : UUID (),
                    blocks: [
                        { _id: UUID (), span: 2, content: '' },
                        { _id: UUID (), span: 2, content: '' }
                    ]
                }
            ];

        } else {

            // Deep clone the value to a local property
            this.rows = this.value.map ( row => {

                return {

                    _id: UUID (),

                    blocks: ( row.blocks || [] ).map ( block => {
                        return {
                            _id    : UUID (),
                            span   : block.span || 1,
                            content: block.content || ''
                        };
                    } )

                };

            } );

        }

        this.fireChanged ();

    },

    mounted () {

        // Initialise the sortable grid
        this.initGrid ();

    }

};