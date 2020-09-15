import { shallowMount } from '@vue/test-utils';
import VueGridDesigner        from '@/component.vue';
//import Vue              from 'vue';

// For async/await
import 'babel-polyfill';

describe ( 'VueGridDesigner.vue Test', () => {

    let wrapper;

    it ( 'exports the correct component name', () => {

        wrapper = shallowMount ( VueGridDesigner, {
            propsData: {}
        } );

        // Check the name of the component
        expect ( VueGridDesigner.name )
            .toMatch ( 'VueGridDesigner' )
        ;

    } );

    afterEach ( () => {
        wrapper.destroy ();
    } );

} );