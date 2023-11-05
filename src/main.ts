import { createApp } from 'vue';

import mapboxgl from 'mapbox-gl';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store/index';


mapboxgl.accessToken = "pk.eyJ1IjoiaW5pZ29wYW5vcyIsImEiOiJjbDFrbG5zanIwMWFrM2NvMm9tMTE0c3d2In0.BEgKsJ0w4GIoj-yn_P7UFg";

if (!navigator.geolocation){
    alert('Tu navegador no puede usar el sistema de GeoLocation');
    throw new Error('Tu navegador no puede usar el sistema de GeoLocation');
}

createApp(App).use(store).use(router).mount('#app');
