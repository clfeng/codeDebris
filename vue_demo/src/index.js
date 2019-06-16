import Vue from 'vue';
import App from './app.vue';

let app = new Vue({
    template: `
        <app />
    `,
    components: {
        App
    }
}); 

app.$mount('#app');