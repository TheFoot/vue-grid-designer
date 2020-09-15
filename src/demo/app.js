import Vue            from 'vue';
import App            from './app.vue';
import VueHighlightJS from 'vue-highlightjs';

Vue.use ( VueHighlightJS );

new Vue (
    {
        render: h => h ( App )
    }
).$mount ( '#app' );