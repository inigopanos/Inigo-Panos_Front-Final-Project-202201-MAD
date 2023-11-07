<template>
  <header>  
    <h3>{{ places }}</h3>
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
  import mapboxgl from 'mapbox-gl';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import { defineComponent, ref, watch } from 'vue';
  import {userPlacesStore} from '../router/places.service'

export default defineComponent({
  components: { },

  computed:{
    ...mapActions('places', ['getInitialLocation']),
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapState(['places']),
  },

  methods:{
    ...mapActions('places', [
      'isUserlocationReady'
    ]),
  },

  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { isLoading, userLocation,} = userPlacesStore();

    const initMap = async () => {
      if (!mapElement.value) return;
      if (!userLocation) return;

      await Promise.resolve();
      
      console.log('Valor de localización del usuario en initMap()', );

      const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 5, // starting zoom 
      }); 

      map.scrollZoom.disable();
      map.boxZoom.enable();
    }

    return { 
      isLoading,
      userLocation, 
      mapElement,
      initMap
    }
  },

  // eslint-disable-next-line consistent-return
  onMounted() {
    if (this.isUserlocationReady){
      console.log('Se ha montado el mapa');
      return this.initMap();
    }

    console.log(this.isUserlocationReady, ' localización del jugador');
  },

  watch:{
    ...mapGetters('places', [
      'isUserlocationReady'
    ]),
    
    isUserlocationReady(newValue) {
      console.log('Valor de isUserLocationReady en el watcher', {newValue});
      if (newValue)
      {
        this.initMap();
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
  width: 100vw;
  height: 100vh;
  background-color: red;
}

</style>