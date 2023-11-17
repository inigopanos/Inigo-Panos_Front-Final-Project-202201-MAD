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
  import {mapActions, mapState, mapGetters, useStore} from 'vuex';
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';

export default defineComponent({
  components: { },

  data() {
    return {
      isLoading: false,
      userLocation: [],
    }
  },

  props: {
    allRuinsCoords: [] as any[],
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

      // console.log('RuinCoordsMarkers:', ruinCoordsMarkers);
      return ruinCoordsMarkers;
    },


    async initMap(allRuinsCoords: [number, number][]) {

      await Promise.resolve();
      await this.$nextTick(); 
      // console.log('Coordenadas ruinas dentro de map:', allRuinsCoords);

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
        // console.log(markerCoords[`ruinCoordsMarker${i}`], ' de tipo: ', typeof(markerCoords[`ruinCoordsMarker${i}`]));
        
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
      // console.log('Coordenadas ruinas dentro de map:', this.allRuinsCoords);

      this.initMap(this.allRuinsCoords);
    }
  },

  setup(props) {
    const route = useRoute();
    const store = useStore();
    

    function setLngLatCoordinates(){
      let ruinCoords: [number, number][] = [];
      ruinCoords = props.allRuinsCoords;
      
      const ruinCoordsMarkers: { [key: string]: LngLatLike } = {};

      for (let i = 0; i < ruinCoords.length; i += 1){
        const separatedRuinCoordinatesString = (ruinCoords[i][0] as unknown as string).split(' ');
        
        const lngRuin = parseFloat(separatedRuinCoordinatesString[1]);
        const latRuin = parseFloat(separatedRuinCoordinatesString[0]);

        const ruinCoordsMarker: LngLatLike = { lng: lngRuin, lat: latRuin };
        ruinCoordsMarkers[`ruinCoordsMarker${i}`] = ruinCoordsMarker;
      }

      // console.log('RuinCoordsMarkers:', ruinCoordsMarkers);
      return ruinCoordsMarkers;
    }


    async function initMap(allRuinsCoords: [number, number][]) {

      await Promise.resolve();
      // console.log('Coordenadas ruinas dentro de map:', allRuinsCoords);

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

      const markerCoords = setLngLatCoordinates();
      const markers: mapboxgl.Marker[] = [];
      const popups: mapboxgl.Popup[] = [];

      for (let i = 0; i < Object.keys(markerCoords).length; i += 1) {
        // console.log(markerCoords[`ruinCoordsMarker${i}`], ' de tipo: ', typeof(markerCoords[`ruinCoordsMarker${i}`]));
        
        markers[i] = new mapboxgl.Marker()
          .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
          .addTo(map);

        popups[i] = new mapboxgl.Popup()
        .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
        .setHTML(`${markerCoords[i]}`)
        .addTo(map)
      }
    }

    async function initializeMap() {
      await Promise.resolve(); 
      // console.log('Coordenadas ruinas dentro de map:', this.allRuinsCoords);

      initMap(props.allRuinsCoords);
    }

    initializeMap();

    
  },

  mounted() {
    const datosRuinas = this.ruins?.allRuinsData;

    // console.log('Se llama a mounted()', datosRuinas);
    this.allRuinsCoords = [];

    for (let i = 0; i < datosRuinas?.length; i+=1){
      if ('coords' in datosRuinas[i]) {
        const coords = datosRuinas[i].coords;

        if (datosRuinas[i].coords.length >= 1){
          this.allRuinsCoords.push(coords);
          // console.log('4: ', this.allRuinsCoords);
        }
      }
    }

    this.initializeMap();
   
    return {
      // allRuinsCoords: this.allRuinsCoords,
    }
  },

  watch:{
    ...mapGetters('places', [
      'isUserlocationReady'
    ]),
      
    isUserlocationReady(newValue) {
      // console.log('Valor de isUserLocationReady en el watcher', {newValue});
      if (newValue)
      {
        // console.log('Se llama a initalizeMap desde el watch:', this.allRuinsCoords);
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