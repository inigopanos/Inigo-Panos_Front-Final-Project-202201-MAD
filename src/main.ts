import { createApp } from 'vue';
import * as dotenv from 'dotenv';
import mapboxgl from 'mapbox-gl';
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store/index';

dotenv.config(); 
mapboxgl.accessToken = process.env.ENV_MAPBOX_TOKEN as string;

createApp(App).use(store).use(router).use(VueLazyload).mount('#app');
