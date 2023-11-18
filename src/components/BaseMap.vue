<template>
  <!-- <div
  v-if="!isUserlocationReady"
  class="loading-map">
      <div class="loading-text">
        <h3>Espere por favor</h3>
        <span>Localizando</span>
      </div>
  </div> -->
  
  <div
    class="map" 
    ref="mapElement"
    id = "mapElementId"> </div>

</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapboxgl, { LngLat, LngLatLike, Marker } from 'mapbox-gl';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import { computed, defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';

export default defineComponent({ // Options API

  data() {
    return {
      isLoading: false,
      userLocation: [],
      allRuinsCoords: [] as any[],
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


  mounted() {
    const datosRuinas = this.ruins?.allRuinsData;
    this.allRuinsCoords = [];
    console.log('Hola Mundo', datosRuinas);

    for (let i = 0; i < datosRuinas?.length; i+=1){

      const coords = datosRuinas[i].coords;

      if (datosRuinas[i].coords.length >= 1){
        this.allRuinsCoords.push(coords);
      }

      if ('coords' in datosRuinas[i]) {
        console.log('Datos Ruinss en for ', datosRuinas[i]); 
      }
    }

    this.initializeMap();
   
    return {
      allRuinsCoords: this.allRuinsCoords,
    }
  },

  methods:{
    setLngLatCoordinates(){
      let ruinCoords: [number, number][] = [];
      ruinCoords = this.allRuinsCoords;
      
      const ruinCoordsMarkers: { [key: string]: LngLatLike } = {};

      for (let i = 0; i < ruinCoords.length; i += 1){
        const separatedRuinCoordinatesString = (ruinCoords[i][0] as unknown as string).split(' ');
        
        const lngRuin = parseFloat(separatedRuinCoordinatesString[1]);
        const latRuin = parseFloat(separatedRuinCoordinatesString[0]);

        const ruinCoordsMarker: LngLatLike = { lng: lngRuin, lat: latRuin };
        ruinCoordsMarkers[`ruinCoordsMarker${i}`] = ruinCoordsMarker;
      }

      return ruinCoordsMarkers;
    },


    async initMap(allRuinsCoords: [number, number][]) {

      await Promise.resolve();
      await this.$nextTick(); 

      const bounds: [[number, number], [number, number]] = [
        [-9.465087353810635, 35.31818720563167], // [west, south]
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        [5.1948353404399747, 44.48518712768742]  // [east, north]
      ];

      const map = new mapboxgl.Map({
      container: 'mapElementId',
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-4.739859783755799, 40.110300848632406], // starting position [lng, lat]
      zoom: 1, 
      }); 

      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragPan.enable();
      map.setMaxBounds(bounds);

      // Marcadores

      const markerCoords = this.setLngLatCoordinates();
      const markers: mapboxgl.Marker[] = [];
      const popups: mapboxgl.Popup[] = [];

      for (let i = 0; i < Object.keys(markerCoords).length; i += 1) {
        
        markers[i] = new mapboxgl.Marker()
          .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
          .addTo(map);

        popups[i] = new mapboxgl.Popup()
        .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
        .setHTML(`${markerCoords[i]}`)
        .addTo(map)
      }
    },

    async initializeMap() {
      await Promise.resolve(); // Wait for the DOM to update
      this.initMap(this.allRuinsCoords);
    }
  },

  //   const store = useStore();

  //   function setLngLatCoordinates(){
  //     let ruinCoords: [number, number][] = [];
     
  //     ruinCoords = props.allRuinsCoordsSetup; // Undefined
  //     console.log('RuinCoords.Length:', ruinCoords);
      
  //     const ruinCoordsMarkers: { [key: string]: LngLatLike } = {};

      
  //     for (let i = 0; i < ruinCoords.length; i += 1){
  //       const separatedRuinCoordinatesString = (ruinCoords[i][0] as unknown as string).split(' ');
        
  //       const lngRuin = parseFloat(separatedRuinCoordinatesString[1]);
  //       const latRuin = parseFloat(separatedRuinCoordinatesString[0]);

  //       const ruinCoordsMarker: LngLatLike = { lng: lngRuin, lat: latRuin };
  //       ruinCoordsMarkers[`ruinCoordsMarker${i}`] = ruinCoordsMarker;
  //     }

  //     // console.log('RuinCoordsMarkers:', ruinCoordsMarkers);
  //     return ruinCoordsMarkers;
  //   }


  //   async function initMap(allRuinsCoords: [number, number][]) {
  //     await Promise.resolve();

  //     const bounds: [[number, number], [number, number]] = [
  //       [-9.465087353810635, 35.31818720563167], // [west, south]
  //       // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  //       [5.1948353404399747, 44.48518712768742]  // [east, north]
  //     ];

  //     const map = new mapboxgl.Map({
  //     container: 'mapElementId',
  //     style: 'mapbox://styles/mapbox/streets-v12', 
  //     center: [-4.739859783755799, 40.110300848632406], 
  //     zoom: 1, 
  //     }); 

  //     map.scrollZoom.enable();
  //     map.boxZoom.enable();
  //     map.dragPan.enable();
  //     map.setMaxBounds(bounds);


  //     const markerCoords = setLngLatCoordinates();
  //     const markers: mapboxgl.Marker[] = [];
  //     const popups: mapboxgl.Popup[] = [];

  //     for (let i = 0; i < Object.keys(markerCoords).length; i += 1) {
  //       // console.log(markerCoords[`ruinCoordsMarker${i}`], ' de tipo: ', typeof(markerCoords[`ruinCoordsMarker${i}`]));
  //       markers[i] = new mapboxgl.Marker()
  //         .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
  //         .addTo(map);

  //       popups[i] = new mapboxgl.Popup()
  //       .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
  //       .setHTML(`${markerCoords[i]}`)
  //       .addTo(map)
  //     }
  //   }

  //   function initializeMap() {
  //     const datosRuinas = store.getters['ruins/listOfRuinsData'];
  //     console.log('En InitalizeMap()', datosRuinas.value);
      
      
  //     const prueba = ref(props.allRuinsCoordsSetup);
  //     for (let i = 0; i < datosRuinas.value?.length; i+=1){
  //       if ('coords' in datosRuinas.value[i]) {
  //         const coords = datosRuinas.value[i].coords;

  //         if (datosRuinas.value[i].coords.length >= 1){
  //           prueba.value.push(coords);
  //           // console.log('4: ', prueba.value, typeof(prueba.value)); // No se llama
  //         }
  //       }
  //     }
    
  //     initMap(props.allRuinsCoordsSetup); 
  //   }
  
  //   initializeMap();

  //   return {
  //     ruinsData: computed(() => store.getters.listOfRuinsData)
  //   }
    
  // },

  watch:{
    ...mapGetters('places', [
      'isUserlocationReady'
    ]),
      
    isUserlocationReady(newValue) {
      if (newValue)
      {       
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