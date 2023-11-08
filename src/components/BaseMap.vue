<template>
  <header>  
    <h3>{{ places }}, {{ isUserlocationReady }}</h3>
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
  import mapboxgl, { MercatorCoordinate } from 'mapbox-gl';
  import {mapActions, mapState, mapGetters, useStore} from 'vuex';
  import { defineComponent, ref, watch } from 'vue';
  import {userPlacesStore} from '../router/places.service'

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
    const store = useStore();
    console.log('Store: ', store?.state?.places);
    // Objeto proxy

    const mapElement = ref<HTMLDivElement>();

    const initMap = async (userLocationFromWatcher: [number, number]) => {
      if (!mapElement.value) return;

      await Promise.resolve();

      const userLocation = userLocationFromWatcher;
      
      console.log('Se ha resuelto la promesa del mapa');

      const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 15, // starting zoom
        }); 
      
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragPan.enable();
      
    }

    return { 
      mapElement,
      initMap
    }
  },

  // eslint-disable-next-line consistent-return
  onMounted() {
    if (this.isUserlocationReady){
      console.log('Se ha montado el mapa');
      return this.initMap(this.places.userLocation);
    }
  },

  watch:{
    ...mapGetters('places', [
      'isUserlocationReady'
    ]),
    
    isUserlocationReady(newValue) {
      console.log('Valor de isUserLocationReady en el watcher', {newValue});
      if (newValue)
      {
        // this.userLocation es proxy array de 0
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
  // z-index: 9999;
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
  background-color: red;
}

</style>