import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import RuinList from '../components/RuinList.vue';
import UserData from '../components/UserData.vue';
import CreateRuin from '../components/CreateRuin.vue';
import RuinDetail from '../components/RuinDetail.vue';
import UpdateRuin from '../components/UpdateRuin.vue';
import BaseMap from '../components/BaseMap.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: RuinList,
  },
  {
    path: '/map/:coords?',
    name: 'map',
    component: BaseMap,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/ruins',
    name: 'ruins',
    component: RuinList,
  },
  {
    path: '/ruinDetails/:id',
    name: 'ruinDetails',
    component: RuinDetail,
  },
  {
    path: '/ruinUpdate/:id',
    name: 'updateRuin',
    component: UpdateRuin,
  },
  {
    path: '/userData',
    name: 'userData',
    component: UserData,
  },
  {
    path: '/addRuin',
    name: 'addRuin',
    component: CreateRuin,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { routes };
export default router;
