/**
 The component mixin
 */
import { v4 as UUID }       from 'uuid';
import { findIndex, merge } from 'lodash-es';
import Sortable             from 'sortablejs/modular/sortable.core.esm.js';

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
                    group          : this.enableMoveBlocksBetweenRows ? 'vgd' : undefined,
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

        // Return the model for caller
        model () {
            return this.rows;
        }

    },

    // Watchers
    watch: {

        blocksPerRow ( n, o ) {
            if ( n !== o ) {

                // When blocks per row changes, re-calculate the width of each block "space"
                this.blockWidthPercentage = 100 / this.blocksPerRow;

                // Blocks can not be wider then blocksPerRow
                let changed = false;
                for ( const [ rowId, row ] of this.rows.entries () ) {
                    for ( const [ blockId, block ] of row.blocks.entries () ) {
                        if ( block.span > this.blocksPerRow ) {
                            this.rows[rowId].blocks[blockId].span = this.blocksPerRow;
                        }
                    }
                }
                if ( changed ) {
                    this.fireChanged();
                }

            }
        },

        // When mode changes, update the "handle" option
        mode ( n, o ) {
            if ( n !== o ) {

                // For view mode create a non-existent handle to disable DnD
                const disable = n === 'view';

                this.setModeClass();

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

                Sortable
                    .get ( this.$el.firstChild )
                    .option ( 'disabled', disable );

            }
        }

    },

    // Component methods
    methods: {

        // Get VGD event object
        getEventData ( e, sourceRow = 'from' ) {

            const vgd = {
                row  : null,
                block: null
            };

            // Find the row
            if ( e[ sourceRow ] ) {
                const rowId = e[ sourceRow ].getAttribute ( 'data-id' );
                vgd.row = this.rows.find ( x => x._id === rowId );
            }

            // Find the block
            if ( vgd.row && e.item ) {
                const blockId = e.item.getAttribute ( 'data-id' );
                vgd.block = vgd.row.blocks.find ( x => x._id === blockId );
            }

            return vgd;

        },

        setModeClass () {
            this.mode === 'view'
                ? this.$el.classList.remove ( 'editmode' )
                : this.$el.classList.add ( 'editmode' );
        },

        // Fire input event for v-model
        fireChanged () {
            this.$emit ( 'input', this.model );
        },

        // Remove row class to disable hover state
        onStart ( e ) {

            e.target.classList.remove ( 'use-hover' );
            this.isDragging = true;

            e.vdg = this.getEventData ( e );
            this.$emit ( 'drag-start', e );

        },

        // Add row class to enable hover state
        onEnd ( e ) {

            e.target.classList.add ( 'use-hover' );
            this.isDragging = false;

            e.vdg = this.getEventData ( e, 'to' );
            this.$emit ( 'drag-stop', e );

        },

        // When a sortable row is updated (block moved)
        onUpdate ( e ) {

            // Did it actually move?
            if ( e.oldDraggableIndex === e.newDraggableIndex ) {
                return;
            }

            if ( e.item.className.match ( /vgd__row/ ) ) {

                // 1. When moving a ROW
                this.$emit ( 'update', e );

                // Move the item in the model
                const temp = this.rows.splice ( e.oldDraggableIndex, 1 );
                this.rows.splice ( e.newDraggableIndex, 0, temp[ 0 ] );

                // Update model
                this.fireChanged ();

                e.vdg = this.getEventData ( e );
                this.$emit ( 'update', e );

            } else {

                // 2. When moving a BLOCK
                // Get the updated row
                const rowId = e.from.getAttribute ( 'data-id' );
                const row = this.rows.find ( x => x._id === rowId );

                // Move the item in the model
                const temp = row.blocks.splice ( e.oldDraggableIndex - 1, 1 );
                row.blocks.splice ( e.newDraggableIndex - 1, 0, temp[ 0 ] );

                // Update model
                this.fireChanged ();

                e.vdg = this.getEventData ( e );
                this.$emit ( 'update', e );

            }

        },

        // When a sortable block is removed from its row
        onRemove ( e ) {

            // Get the row the block was removed from
            const rowId = e.from.getAttribute ( 'data-id' );
            const row = this.rows.find ( x => x._id === rowId );

            e.vdg = this.getEventData ( e );
            this.$emit ( 'remove-block', e );

            // Remove from the model
            row.blocks.splice ( e.oldDraggableIndex - 1, 1 );

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
            destRow.blocks.splice ( e.newDraggableIndex - 1, 0, block );

            // Update model
            this.fireChanged ();

            e.vdg = this.getEventData ( e, 'to' );
            this.$emit ( 'add-block', e );

        },

        // Initialise the whole grid
        initGrid () {

            // Init all rows one by one
            for ( const [ , row ] of this.rows.entries () ) {
                this.initSortableRow ( row );
            }

            // Init sortable grid
            Sortable.create (
                this.$el.firstChild,
                {
                    ...this.getSortableOptions,
                    ...{
                        group: {
                            name: 'vgd-rows',
                            pull: 'vgd-rows',
                            put : 'vgd-rows'
                        }
                    }
                }
            );

            this.setModeClass();

            this.$emit ( 'ready' );

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
                cursor                : this.mode === 'edit' ? 'move' : 'inherit',
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
        expandBlock ( e, row, block, num = 1 ) {

            if ( ( block.span + num ) > this.blocksPerRow ) {
                return;
            }

            block.span += num;

            this.fireChanged ();

            e.vdg = { row, block };
            this.$emit ( 'block-changed', e );

        },

        // Collapse the span of a block
        collapseBlock ( e, row, block, num = 1 ) {

            if ( block.span <= 1 ) {
                return;
            }

            block.span -= num;

            this.fireChanged ();

            e.vdg = { row, block };
            this.$emit ( 'block-changed', e );

        },

        // Delete a block
        deleteBlock ( e, row, block ) {

            const blockIdx = findIndex ( row.blocks, x => x._id === block._id );
            if ( blockIdx === -1 ) {
                throw new Error ( 'Block not found in the row specified.' );
            }
            row.blocks.splice ( blockIdx, 1 );

            this.fireChanged ();

            e.vdg = { row, block };
            this.$emit ( 'remove-block', e );

        },

        // Add a block to a row
        async addBlock ( e, row, span = 1 ) {

            // Do we have a custom callback?
            let custom = {};
            if ( typeof this.onNewBlock === 'function' ) {
                custom = await this.onNewBlock ( row, span );
            }

            const block = merge (
                // Default structure
                {
                    span: span
                },

                // User-specific
                custom,

                // Mandatory
                {
                    _id: UUID ()
                }
            );

            row.blocks.push ( block );

            // Update model
            this.fireChanged ();

            e.vdg = { row, block };
            this.$emit ( 'add-block', e );

        },

        // Delete a row
        deleteRow ( e, row ) {

            // Remove row from our model
            this.rows.splice (
                findIndex ( this.rows, x => x._id === row._id ),
                1
            );

            // Update model
            this.fireChanged ();
            e.vdg = { row, block: null };
            this.$emit ( 'remove-row', e );

        },

        // Add a new row
        async addRow ( e ) {

            // Do we have a custom callback?
            let custom = {};
            if ( typeof this.onNewRow === 'function' ) {
                custom = await this.onNewRow ();
            }

            const row = merge (
                // Default blocks structure
                {
                    blocks: []
                },

                // User-specific
                custom,

                // Mandatory
                {
                    _id: UUID ()
                }
            );

            // Default block needed?
            if ( row.blocks.length === 0 ) {
                await this.addBlock ( e, row, this.blocksPerRow );
            }

            this.rows.push ( row );

            // Init sortable
            this.$nextTick ( () => {

                this.initSortableRow ( row );

                // Update model
                this.fireChanged ();

                e.vdg = { row, block: null };
                this.$emit ( 'add-row', e );

            } );

        }

    },

    created () {

        // Initialise grid default if no grid given
        if ( ( this.value || [] ).length === 0 ) {

            this.rows = [];

        } else {

            // Deep clone for a local working copy and decorate all elements with an ID
            this.rows = this.value.map ( row => {

                row._id = UUID ();
                row.blocks = ( row.blocks || [] ).map ( block => {

                    block._id = UUID ();
                    block.span = block.span || 1;

                    return block;

                } );

                return row;

            } );

        }

        this.fireChanged ();

    },

    mounted () {

        this.initGrid ();

    }

};