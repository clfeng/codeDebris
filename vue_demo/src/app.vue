<template>
    <div class="app">
        <header></header>
        <div class="main">
            <router-view></router-view>
        </div>
        <footer></footer>
    </div>
</template>
<style scoped>
</style>
<script>

import VueRouter from 'vue-router';
import Header from './header/index.vue';
import Footer from './footer/index.vue';
import RouteConfig from './route_config.js';

let router = new VueRouter({
    routes: RouteConfig
});

export default {
    name: 'App',
    
    router,
    
    components: {
        Header,
        Footer
    },

    data () {
        return {
        }
    }
}
</script>
