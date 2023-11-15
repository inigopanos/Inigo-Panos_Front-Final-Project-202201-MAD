<template>
  <div
  v-if="!isUserlocationReady"
  class="loading-map">
      <div class="loading-text">
        <h3>Espere por favor</h3>
        <span>Localizando</span>
      </div>
  </div>
  
  <div
  v-dom-ready="initializeMap"
  class="map" 
  ref="mapElement"/>

</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapboxgl, { LngLat } from 'mapbox-gl';
  import {mapActions, mapState, mapGetters, useStore} from 'vuex';
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';

export default defineComponent({
  components: { },

  data() {
    return {
      isLoading: false,
      userLocation: [],
      allRuinsCoords: [] as any[],
      mapElement: ref<HTMLDivElement>(),
    }
  },

  computed:{
    ...mapActions('places', ['getInitialLocation']),
    ...mapActions('ruins', ['getAllRuins']),

    ...mapGetters('places', ['isUserlocationReady']),
    ...mapGetters('ruins', ['listOfRuinsData']),

    ...mapState(['places']),
    ...mapState(['ruins']),
  },

  methods:{
    ...mapActions('places', [
      'isUserlocationReady'
    ]),
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapState(['places']),

    ...mapGetters('ruins', ['listOfRuinsData']),
    ...mapState(['ruins']),


    async initMap(allRuinsCoords: [number, number][]) {
      await Promise.resolve();
      await this.$nextTick(); 
      if (!this.mapElement) return;
      console.log('Coordenadas ruinas dentro de map:', allRuinsCoords);

      const bounds: [[number, number], [number, number]] = [
        [-9.465087353810635, 35.31818720563167], // [west, south]
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        [5.1948353404399747, 44.48518712768742]  // [east, north]
      ];

      const map = new mapboxgl.Map({
        container: this.mapElement,
        style: 'mapbox://styles/mapbox/streets-v12', 
        center: [-4.739859783755799, 40.110300848632406], // starting position [lng, lat]
        zoom: 1, 
        }); 
      
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragPan.enable();
      map.setMaxBounds(bounds);
    },

    async initializeMap() {
      await this.$nextTick(); // Wait for the DOM to update

      if (!this.mapElement) throw new Error('Div Element no existe');
      console.log('Coordenadas ruinas dentro de map:', this.allRuinsCoords);

      this.initMap(this.allRuinsCoords);
    }
  },

  setup() {
    const route = useRoute();
    const store = useStore();
    console.log('Store: ', store?.state?.places);
   
    return {  }
  },

  mounted() {

    const datosRuinas = this.ruins?.allRuinsData;

    console.log('Se llama a mounted()', datosRuinas);

    // No need to redefine allRuinsCoords here, just assign it a new value
    this.allRuinsCoords = [];

    for (let i = 0; i < datosRuinas?.length; i+=1){

      console.log('1:', datosRuinas[i].name, datosRuinas[i].coords); 

      if ('coords' in datosRuinas[i]) {
        
        console.log('2: ', datosRuinas[i].coords.length);
        const coords = datosRuinas[i].coords;

        if (datosRuinas[i].coords.length >= 1){

          console.log('3: ', coords);
               
          this.allRuinsCoords.push(coords);
          console.log('4: ', this.allRuinsCoords);
        }
      }
    }

    if (this.allRuinsCoords.length > 0){
      console.log('Se llama a initalizeMap desde mounted:', this.allRuinsCoords);
      this.initializeMap();
    } 
    
    return {
      allRuinsCoords: this.allRuinsCoords,
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
        console.log('Se llama a initalizeMap desde el watch:', this.allRuinsCoords);
        this.initializeMap();
      }
    }, 
  },
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
  display: flex;
  align-items: center;
  width: 60vw;
  height: 80vh;
  margin-right: 1%;
}

</style>