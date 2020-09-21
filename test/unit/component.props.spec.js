import { afterEach, describe, test } from '@jest/globals';
import { shallowMount }              from '@vue/test-utils';
import VueGridDesigner               from '@/component.vue';
import VueGridDesignerPropsMixin     from '@/mixins/props.mixin';

// For async/await
import 'babel-polyfill';

describe ( 'Props Test', () => {

    let wrapper;

    test ( 'v-model (value)', () => {

        wrapper = shallowMount ( VueGridDesigner, {
            propsData: {
                value: [
                    { blocks: [ { span: 2 }, { span: 1 } ] },
                    { blocks: [ { span: 1 }, { span: 2 } ] }
                ]
            }
        } );

        const model = wrapper.props ().value;
        expect ( Array.isArray ( model ) )
            .toBeTruthy ()
        ;

        expect ( model.length )
            .toBe ( 2 );
        expect ( model[ 1 ].blocks.length )
            .toBe ( 2 );
        expect ( model[ 1 ].blocks[ 0 ].span )
            .toBe ( 1 );

    } );

    test ( 'mode', () => {

        const validator = VueGridDesignerPropsMixin.props.mode.validator;

        expect ( validator ( 'view' ) )
            .toBeTruthy ();
        expect ( validator ( 'batman' ) )
            .toBeFalsy ();

    } );

    test ( 'blocksPerRow', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                blocksPerRow: {
                    type   : Number,
                    default: 4
                }
            } );

    } );

    test ( 'maxRows', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                maxRows: {
                    type   : Number,
                    default: 0
                }
            } );

    } );

    test ( 'rowClass', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                rowClass: {
                    type   : String,
                    default: ''
                }
            } );

    } );

    test ( 'blockClass', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                blockClass: {
                    type   : String,
                    default: ''
                }
            } );

    } );

    test ( 'minBlockHeight', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                minBlockHeight: {
                    type   : Number,
                    default: 100
                }
            } );

    } );

    test ( 'blockMargin', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                blockMargin: {
                    type   : Number,
                    default: 6
                }
            } );

    } );

    test ( 'enableMoveBlocksBetweenRows', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                enableMoveBlocksBetweenRows: {
                    type   : Boolean,
                    default: true
                }
            } );

    } );

    test ( 'sortableGhostClass', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                sortableGhostClass: {
                    type   : String,
                    default: 'vgd__block--ghost'
                }
            } );

    } );

    test ( 'sortableChosenClass', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                sortableChosenClass: {
                    type   : String,
                    default: 'vgd__block--chosen'
                }
            } );

    } );

    test ( 'sortableDragClass', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                sortableDragClass: {
                    type   : String,
                    default: 'vgd__block--drag'
                }
            } );

    } );

    test ( 'sortableOptions', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                sortableOptions: {
                    type   : Object,
                    default: {}
                }
            } );

    } );

    test ( 'onNewRow', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                onNewRow: {
                    type   : Function
                }
            } );

    } );

    test ( 'onNewBlock', () => {

        expect ( VueGridDesignerPropsMixin.props )
            .toMatchObject ( {
                onNewBlock: {
                    type   : Function
                }
            } );

    } );

    afterEach ( () => wrapper && wrapper.destroy () );

} );