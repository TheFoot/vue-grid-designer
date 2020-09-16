import { afterAll, beforeAll, describe, it } from '@jest/globals';
import { shallowMount, mount }               from '@vue/test-utils';
import VueGridDesigner                       from '@/component.vue';

// For async/await
import 'babel-polyfill';

describe ( 'Defaults Test', () => {

    let wrapper, props, vm;

    beforeAll ( () => {

        // Shallow mount component
        wrapper = shallowMount ( VueGridDesigner, {
            propsData: {}
        } );

        // Get refs for props and data
        props = wrapper.props ();
        vm = wrapper.vm;

    } );

    it ( 'should export the correct component name', () => {

        expect ( VueGridDesigner.name )
            .toMatch ( 'VueGridDesigner' )
        ;

    } );

    it ( 'should generate a default grid', () => {

        // Test markup
        const rows = wrapper.findAll ( '.vgd .vgd__row' );

        // Total rows
        expect ( vm.rows.length )
            .toBe ( 1 );
        expect ( rows.length )
            .toBe ( 1 );

        // Blocks in first row
        expect (
            rows
                .at ( 0 )
                .findAll ( '.vgd__block' ).length
        )
            .toBe ( 2 );
        expect ( vm.rows[ 0 ].blocks.length )
            .toBe ( 2 );

    } );

    it ( 'should default to edit mode', () => {

        const rowTbs = wrapper.findAll ( '.vgd .vgd__row__toolbar' );
        const blockTbs = wrapper.findAll ( '.vgd .vgd__block__toolbar' );

        expect ( rowTbs.length )
            .toBe ( 1 );

        expect ( blockTbs.length )
            .toBe ( 2 );

        expect ( props.mode )
            .toBe ( 'edit' );

    } );

    it ( 'should default to 4 blocks per row', () => {

        expect ( props.blocksPerRow )
            .toBe ( 4 );

    } );

    it ( 'should default to no max rows', () => {

        expect ( props.maxRows )
            .toBe ( 0 );

    } );

    it ( 'should not create additional row classes', () => {

        expect ( props.rowClass )
            .toBe ( '' );

    } );

    it ( 'should not create additional block classes', () => {

        expect ( props.blockClass )
            .toBe ( '' );

    } );

    it ( 'should set the minimum block height to 100px', () => {

        expect ( props.minBlockHeight )
            .toBe ( 100 );

    } );

    it ( 'should set a default block margin of 6px', () => {

        expect ( props.blockMargin )
            .toBe ( 6 );

    } );

    it ( 'should allow blocks to move between rows', () => {

        expect ( props.enableMoveBlocksBetweenRows )
            .toBe ( true );

    } );

    it ( 'should set the correct sortable ghost class', () => {

        expect ( props.sortableGhostClass )
            .toBe ( 'vgd__block--ghost' );

    } );

    it ( 'should set the correct sortable chosen class', () => {

        expect ( props.sortableChosenClass )
            .toBe ( 'vgd__block--chosen' );

    } );

    it ( 'should set the correct sortable drag class', () => {

        expect ( props.sortableDragClass )
            .toBe ( 'vgd__block--drag' );

    } );

    it ( 'should set the sortable animation speed to 50ms', () => {

        expect ( props.sortableAnimation )
            .toBe ( 50 );

    } );

    it ( 'should default to no additional native sortable options', () => {

        expect ( props.sortableOptions )
            .toBeUndefined ();

    } );

    it ( 'should generate the correct set of SortableJS options', () => {

        // Accessing the computed properties from the mixin requires a full mount
        const fullWrapper = mount ( VueGridDesigner );
        expect ( fullWrapper.vm.getSortableOptions )
            .toMatchObject ( {
                'ghostClass'     : 'vgd__block--ghost',
                'chosenClass'    : 'vgd__block--chosen',
                'dragClass'      : 'vgd__block--drag',
                'animation'      : 50,
                'disabled'       : false,
                'group'          : 'vgd',
                'filter'         : '.no-drag',
                'preventOnFilter': true
            } );

        fullWrapper.destroy ();

    } );

    afterAll ( () => wrapper.destroy () );

} );