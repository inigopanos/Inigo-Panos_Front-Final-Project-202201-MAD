<template>
  <header>  
    <h3>{{ places }}, Is userLocationReady: {{ isUserlocationReady }}</h3>
  </header>
  <div
  v-if="!isUserlocationReady"
  class="loading-map">
      <div class="loading-text">
        <h3>Espere por favor</h3>
        <span>Localizando</span>
      </div>
  </div>
  
  <div v-show="isUserlocationReady" class="map" ref="mapElement"/>

</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapboxgl, { LngLat, MercatorCoordinate } from 'mapbox-gl';
  import {mapActions, mapState, mapGetters, useStore} from 'vuex';
  import { defineComponent, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

export default defineComponent({
  components: { },

  data() {
    return {
      isLoading: false,
      userLocation: [],
    }
  },

  computed:{
    ...mapActions('places', ['getInitialLocation']),
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapState(['places']),
  },

  methods:{
    ...mapActions('places', [
      'isUserlocationReady'
    ]),
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapState(['places']),
  },

  setup() {
    
    const route = useRoute();
    
    const ruinCoords = route.params.coords;

    console.log('Coordenadas de la ruina: ', {ruinCoords});

    

    const store = useStore();
    console.log('Store: ', store?.state?.places);
   
    const mapElement = ref<HTMLDivElement>();

    const initMap = async (userLocationFromWatcher: [number, number]) => {
      
      await Promise.resolve();
      
      const userLocation = userLocationFromWatcher;
      
      if (!mapElement.value) throw new Error('Div Element no existe');
      if (!userLocation) throw new Error('User Location no existe');
      if (!ruinCoords) console.log('No hay coordenadas de ruinas');

      console.log('Se ha resuelto la promesa del mapa', userLocation);

      const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 13, // starting zoom
        }); 
      
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragPan.enable();
      
      const myLocationPopup = new mapboxgl.Popup({offset:[0, -45]})
      .setLngLat(userLocation)
      .setHTML(`
      <h4> Aquí estoy </h4>
      <p>${userLocation}</p>
      `);

      // const ruinLocationMarker = new mapboxgl.Marker()
      // .setLngLat(ruinCoords)
      // .addTo(map);

      const myLocationMarker = new mapboxgl.Marker()
      .setLngLat(userLocation)
      .setPopup(myLocationPopup)
      .addTo(map);
    }

    return { 
      mapElement,
      initMap
    }
  },

  mounted() {
    const test = this.isUserlocationReady; // No puedo usar este getter
    if (test){
      return this.initMap(this.places.userLocation);
    }
    return console.log('No se ha montado el mapa en OnMounted():', test);
  },

  watch:{
    ...mapGetters('places', [
      'isUserlocationReady'
    ]),
      
    isUserlocationReady(newValue) {
      console.log('Valor de isUserLocationReady en el watcher', {newValue});
      if (newValue)
      {
        console.log(this.places.userLocation, ' localización del usuario al ejecutar el watcher.');
        this.initMap(this.places.userLocation);
      }
    }, 
  }

});
</script>

<style lang="scss">
.loading-map {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0px;
  width: 100vw;
  z-index: 9999;
  display:flex;
  justify-content: center;
  align-items: center;

  .loading-text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
 }
}
.map {
  position: fixed;
  width: 80vw;
  height: 80vh;
}

</style>