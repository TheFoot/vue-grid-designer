import { afterEach, beforeEach, describe, test } from '@jest/globals';
import { shallowMount }                          from '@vue/test-utils';
import VueGridDesigner                           from '@/component.vue';

// For async/await
import 'babel-polyfill';

// VDG Event helper
const hasVdgObject = e => {
    expect ( e )
        .toHaveProperty ( 'vdg' );
    expect ( e.vdg )
        .toHaveProperty ( 'row' );
    expect ( e.vdg )
        .toHaveProperty ( 'block' );
};

describe ( 'Events Test', () => {

    let wrapper;

    beforeEach ( () => {

        // Shallow mount component
        wrapper = shallowMount ( VueGridDesigner, {
            propsData: {
                value: [
                    {
                        blocks: [
                            { span: 2},
                            { span: 2}
                        ]
                    }
                ]
            }
        } );

    } );

    test ( 'ready', () => {

        expect ( wrapper.emitted ( 'ready' ) )
            .toHaveLength ( 1 );

    } );

    test ( 'remove-block', async () => {

        const btn = wrapper.find (
            '.vgd div.vgd__row:nth-child(1) > div.vgd__block:nth-child(2) .vgd__block__toolbar .vgd__block__toolbar__button[title="Delete"]'
        );
        btn.trigger ( 'click' );

        // Wait cycle
        await wrapper.vm.$nextTick ();
        const event = wrapper.emitted ();

        expect ( event[ 'remove-block' ] )
            .toBeTruthy ();
        expect ( event[ 'remove-block' ].length )
            .toBe ( 1 );
        expect ( event[ 'remove-block' ][ 0 ].length )
            .toBe ( 1 );
        hasVdgObject ( event[ 'remove-block' ][ 0 ][ 0 ] );

    } );

    test ( 'add-block', async () => {

        const btn = wrapper.find (
            '.vgd div.vgd__row:nth-child(1) > .vgd__row__toolbar .vgd__row__toolbar__button[title="Add block"]'
        );
        btn.trigger ( 'click' );

        // Wait cycle
        await wrapper.vm.$nextTick ();
        const event = wrapper.emitted ();

        expect ( event[ 'add-block' ] )
            .toBeTruthy ();
        expect ( event[ 'add-block' ].length )
            .toBe ( 1 );
        expect ( event[ 'add-block' ][ 0 ].length )
            .toBe ( 1 );
        hasVdgObject ( event[ 'add-block' ][ 0 ][ 0 ] );

    } );

    test ( 'remove-row', async () => {

        const btn = wrapper.find (
            '.vgd div.vgd__row:nth-child(1) > .vgd__row__toolbar .vgd__row__toolbar__button[title="Delete row"]'
        );
        btn.trigger ( 'click' );

        // Wait cycle
        await wrapper.vm.$nextTick ();
        const event = wrapper.emitted ();

        expect ( event[ 'remove-row' ] )
            .toBeTruthy ();
        expect ( event[ 'remove-row' ].length )
            .toBe ( 1 );
        expect ( event[ 'remove-row' ][ 0 ].length )
            .toBe ( 1 );
        hasVdgObject ( event[ 'remove-row' ][ 0 ][ 0 ] );

    } );

    test ( 'add-row', async () => {

        const btn = wrapper.find ( '.vgd .vgd__footer__button' );
        btn.trigger ( 'click' );

        // Wait cycle
        await wrapper.vm.$nextTick ();
        const event = wrapper.emitted ();

        expect ( event[ 'add-row' ] )
            .toBeTruthy ();
        expect ( event[ 'add-row' ].length )
            .toBe ( 1 );
        expect ( event[ 'add-row' ][ 0 ].length )
            .toBe ( 1 );
        hasVdgObject ( event[ 'add-row' ][ 0 ][ 0 ] );

    } );

    test ( 'block-changed', async () => {

        // Collapse
        let btn = wrapper.find (
            '.vgd div.vgd__row:nth-child(1) > div.vgd__block:nth-child(2) .vgd__block__toolbar .vgd__block__toolbar__button[title="Collapse"]'
        );
        btn.trigger ( 'click' );

        // Wait cycle
        await wrapper.vm.$nextTick ();
        event = wrapper.emitted ();

        expect ( event[ 'block-changed' ] )
            .toBeTruthy ();
        expect ( event[ 'block-changed' ].length )
            .toBe ( 1 );
        expect ( event[ 'block-changed' ][ 0 ].length )
            .toBe ( 1 );
        hasVdgObject ( event[ 'block-changed' ][0 ][ 0 ] );

        // Expand
        btn = wrapper.find (
            '.vgd div.vgd__row:nth-child(1) > div.vgd__block:nth-child(2) .vgd__block__toolbar .vgd__block__toolbar__button[title="Expand"]'
        );
        btn.trigger ( 'click' );

        // Wait cycle
        await wrapper.vm.$nextTick ();
        let event = wrapper.emitted ();

        expect ( event[ 'block-changed' ] )
            .toBeTruthy ();
        expect ( event[ 'block-changed' ].length )
            .toBe ( 2 );
        expect ( event[ 'block-changed' ][ 0 ].length )
            .toBe ( 1 );
        hasVdgObject ( event[ 'block-changed' ][ 0 ][ 0 ] );

    } );

    afterEach ( () => wrapper.destroy () );

} );