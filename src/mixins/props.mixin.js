/**
 The props mixin
 */

export default {

    // Component props
    props: {

        // The v-model grid data; rows and blocks
        value: {
            type   : Array,
            default: () => []
        },

        // Component mode - edit or view
        mode: {
            type     : String,
            default  : 'edit',
            validator: ( prop ) => [ 'edit', 'view' ].includes ( prop )
        },

        // Logical blocks per row
        blocksPerRow: {
            type   : Number,
            default: 4
        },

        // Maximum number of rows
        maxRows: {
            type   : Number,
            default: 0
        },

        // CSS row class
        rowClass: {
            type   : String,
            default: ''
        },

        // CSS block class
        blockClass: {
            type   : String,
            default: ''
        },

        // Minimum block height - in pixels
        minBlockHeight: {
            type   : Number,
            default: 100
        },

        // Block margin - in pixels
        blockMargin: {
            type   : Number,
            default: 6
        },

        // Allow blocks to be moved between rows
        enableMoveBlocksBetweenRows: {
            type   : Boolean,
            default: true
        },

        /*
         SortableJS Props with local defaults and managed locally
         */

        // CSS Class for the ghost position indicator element
        sortableGhostClass: {
            type   : String,
            default: 'vgd__block--ghost'
        },

        // CSS Class for the selected element
        sortableChosenClass: {
            type   : String,
            default: 'vgd__block--chosen'
        },

        // CSS Class for the element when dragged
        sortableDragClass: {
            type   : String,
            default: 'vgd__block--drag'
        },

        // Animation speed. 0 for no animation
        sortableAnimation: {
            type   : Number,
            default: 50
        },

        // Pass-thru remaining SortableJS options
        sortableOptions: {
            type   : Object,
            default: () => {
            }
        }

    }

};