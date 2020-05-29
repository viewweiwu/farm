import Vue from 'vue';
import Router from 'vue-router';
import Scene from '@/views/Scene';

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'scene',
    component: Scene
  }]
})