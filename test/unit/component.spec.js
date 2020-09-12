import { shallowMount } from '@vue/test-utils';
import Component        from '@/component.vue';
import Vue              from 'vue';

// For async/await
import 'babel-polyfill';

describe ( 'Component.vue Test', () => {

    let wrapper;

    it ( 'exports the correct component name', () => {

        wrapper = shallowMount ( Component, {
            propsData: {}
        } );

        // Check the name of the component
        expect ( Component.name )
            .toMatch ( 'HelloWorld' )
        ;

    } );

    it ( 'renders a default message', () => {

        wrapper = shallowMount ( Component, {
            propsData: {}
        } );

        expect (
            wrapper
                .get ( 'h1' )
                .text ()
        )
            .toMatch ( 'Hello World' );

    } );

    it ( 'renders a specific message', () => {

        wrapper = shallowMount ( Component, {
            propsData: {
                name: 'Jest'
            }
        } );

        expect (
            wrapper
                .get ( 'h1' )
                .text ()
        )
            .toMatch ( 'Hello Jest' );

    } );

    it ( 'reverses the message', async () => {

        wrapper = shallowMount ( Component, {
            propsData: {
                name: 'Jest'
            }
        } );

        // Call component method
        wrapper.vm.reverse ();

        // As the template uses a computed component, we need to wait for render
        await Vue.nextTick ();

        expect (
            wrapper
                .get ( 'h1' )
                .text ()
        )
            .toMatch ( 'tseJ olleH' );

    } );

    afterEach ( () => {
        wrapper.destroy ();
    } );

} );