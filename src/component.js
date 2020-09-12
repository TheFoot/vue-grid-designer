import Component from '@/component.vue';

Component.install = Vue => {
    Vue.component ( Component.name, Component );
};

export default Component;