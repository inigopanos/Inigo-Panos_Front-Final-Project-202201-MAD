<template>
  <div
    class="map" 
    ref="mapElement"
    id = "mapElementId"/>

  <div>
    Datos: {{ ruinsData }}
  </div>
  <!-- <div
    class="loading-map">
      <div class="loading-text">
        <h3>Espere por favor</h3>
        <span>Localizando</span>
      </div>
  </div> -->

</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapboxgl, { LngLatLike } from 'mapbox-gl';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    ruinsData: {
      type: Array, 
      required: true,
    },
},

  data() {
    return {
      isLoading: false,
      userLocation: [],
      allRuinsCoords: [] as any[],
    }
  },

  computed:{
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapGetters('ruins', ['listOfRuinsData']),

    ...mapState(['places']),
    ...mapState(['ruins']),
  },


  async mounted() { 

    await this.getAllRuins();

    const datosRuinas = this.$store.state.ruins.allRuinsData;
    this.allRuinsCoords = [];

    for (let i = 0; i < datosRuinas?.length; i+=1){
      const coords = datosRuinas[i].coords;

      if (datosRuinas[i].coords.length >= 1){
        this.allRuinsCoords.push(coords);
      }
    }

    if (this.allRuinsCoords?.length >= 1){
      this.initializeMap();
    } 
  },

  methods:{
    ...mapActions('places', ['getInitialLocation']),
    ...mapActions('ruins', ['getAllRuins']),

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


    async initMap() {

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
      map.setProjection('mercator');

      const markerCoords = this.setLngLatCoordinates();
      const markers: mapboxgl.Marker[] = [];
      const popups: mapboxgl.Popup[] = [];

      for (let i = 0; i < Object.keys(markerCoords).length; i += 1) {

        console.log('Hola mundo:', markerCoords[`ruinCoordsMarker${i}`]);

        popups[i] = new mapboxgl.Popup()
        .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
        .setHTML(JSON.stringify(markerCoords[`ruinCoordsMarker${i}`]))
        .addTo(map);

        markers[i] = new mapboxgl.Marker()
        .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
        .setPopup(new mapboxgl.Popup().setHTML('Tu texto aquí'))
        .setPitchAlignment('map')
        .addTo(map);
      }
    },

    async initializeMap() {
      await Promise.resolve(); // Wait for the DOM to update
      this.initMap();
    }
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