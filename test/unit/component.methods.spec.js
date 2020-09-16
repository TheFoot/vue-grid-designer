import { afterEach, beforeEach, describe, test } from '@jest/globals';
import { shallowMount }                                    from '@vue/test-utils';
import VueGridDesigner                                     from '@/component.vue';

// For async/await
import 'babel-polyfill';

describe ( 'Methods Test', () => {

    let wrapper, vm;

    beforeEach ( () => {

        // Shallow mount component
        wrapper = shallowMount ( VueGridDesigner );

        vm = wrapper.vm;

    } );

    test ( 'getBlockStyles', () => {

        expect (
            vm.getBlockStyles (
                {},
                { span: 2 }
            )
        )
            .toMatchObject ( {
                margin                : '6px',
                '--block-width'       : `${ vm.blockWidthPercentage * 2 }%`,
                '--block-total-margin': `${ 2 * vm.blockMargin }px`,
                cursor                : 'pointer',
                'min-height'          : `${ vm.minBlockHeight }px`
            } )
        ;

        // Change mode
        wrapper.setProps ( {
            mode       : 'view',
            blockMargin: 10
        } );
        expect (
            vm.getBlockStyles (
                {},
                { span: 4 }
            )
        )
            .toMatchObject ( {
                margin                : '10px',
                '--block-width'       : `${ vm.blockWidthPercentage * 4 }%`,
                '--block-total-margin': `${ 2 * vm.blockMargin }px`,
                cursor                : 'inherit',
                'min-height'          : `${ vm.minBlockHeight }px`
            } )
        ;

    } );

    test ( 'getAnimationStyle', () => {

        expect (
            vm.getAnimationStyle ()
        )
            .toMatchObject ( {
                transition: `all ${ vm.sortableAnimation / 1000 }s ease-in`
            } )
        ;

        // Change animation prop
        wrapper.setProps ( {
            sortableAnimation: 0
        } );
        expect (
            vm.getAnimationStyle ()
        )
            .toMatchObject ( {} )
        ;

    } );

    test ( 'expandBlock', () => {

        // Too big - no change expected
        let block = { span: 2 };
        vm.expandBlock ( {}, {}, block, 3 );
        expect ( block.span )
            .toBe ( 2 );

        // Change blocksPerRow prop
        wrapper.setProps ( {
            blocksPerRow: 10
        } );

        // Now big enough - should change block span
        vm.expandBlock ( {}, {}, block, 3 );
        expect ( block.span )
            .toBe ( 5 );

    } );

    test ( 'collapseBlock', () => {

        // Too small - no change expected
        let block = { span: 1 };
        vm.collapseBlock ( {}, {}, block, 1 );
        expect ( block.span )
            .toBe ( 1 );

        // Too small - no change expected
        block = { span: 2 };
        vm.collapseBlock ( {}, {}, block, 1 );
        expect ( block.span )
            .toBe ( 1 );

        // Should change block span
        block = { span: 4 };
        vm.collapseBlock ( {}, {}, block, 2 );
        expect ( block.span )
            .toBe ( 2 );

    } );

    test ( 'deleteBlock', () => {

        let fakeBlock = { _id: 'foo' };
        try {
            vm.deleteBlock ( {}, vm.rows[ 0 ], fakeBlock );
            expect ( true )
                .toBeFalsy ();
        } catch ( e ) {
            expect ( e.message )
                .toMatch ( /not found/ );
        }

        let _id = vm.rows[ 0 ].blocks[ 0 ]._id;
        vm.deleteBlock ( {}, vm.rows[ 0 ], vm.rows[ 0 ].blocks[ 0 ] );
        let block = vm.rows[ 0 ].blocks.find ( x => x._id === _id );
        expect ( block )
            .toBeUndefined ();

    } );

    test ( 'addBlock', () => {

        let row = vm.rows[ 0 ];
        let count = row.blocks.length;

        vm.addBlock ( {}, row, 2 );

        expect ( row.blocks.length )
            .toBe ( count + 1 );

        let newBlock = row.blocks.pop ();
        expect ( newBlock )
            .toBeDefined ();
        expect ( newBlock.span )
            .toBe ( 2 );

    } );

    test ( 'deleteRow', () => {

        let row = vm.rows[ 0 ];

        vm.deleteRow ( {}, row );

        expect ( vm.rows.length )
            .toBe ( 0 );

        vm.deleteRow ( {}, { _id: 'foo' } );

        expect ( vm.rows.length )
            .toBe ( 0 );

    } );

    test ( 'addRow', () => {

        vm.addRow ( {} );

        expect ( vm.rows.length )
            .toBe ( 2 );

        expect ( vm.rows[ 1 ].blocks.length )
            .toBe ( 1 );

        expect ( vm.rows[ 1 ].blocks[ 0 ].span )
            .toBe ( vm.blocksPerRow );

    } );

    afterEach ( () => wrapper.destroy () );

} );