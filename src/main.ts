import { createApp } from 'vue';
import mapboxgl from 'mapbox-gl';
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store/index';

mapboxgl.accessToken = "pk.eyJ1IjoiaW5pZ29wYW5vcyIsImEiOiJjbHA2enUzcTcyOGprMmlycHphbnlvMG9lIn0.YdZs7aTRm-5F1Q5zz0wqDw";

createApp(App).use(store).use(router).use(VueLazyload).mount('#app');
