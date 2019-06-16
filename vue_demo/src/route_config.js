import Safety from './safety/index.vue';
import Manager from './manager/index.vue';

export default [
    { path: '/safety', component: Safety },
    { path: '/manager', component: Manager },
    { path: '/', redirect: '/safety'},
]