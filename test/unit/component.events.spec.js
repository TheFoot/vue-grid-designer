import { afterEach, beforeEach, describe, test } from '@jest/globals';
import { shallowMount }                          from '@vue/test-utils';
import VueGridDesigner                           from '@/component.vue';

// For async/await
import 'babel-polyfill';

describe ( 'Events Test', () => {

    let wrapper, vm;

    beforeEach ( () => {

        // Shallow mount component
        wrapper = shallowMount ( VueGridDesigner );

        vm = wrapper.vm;

    } );

    test ('', () =>{});

    afterEach ( () => wrapper.destroy () );

} );