<template>
  <div
    class="map" 
    ref="mapElement"
    id = "mapElementId"/>

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
      const popups: mapboxgl.Popup[] = [];

      for (let i = 0; i < Object.keys(markerCoords).length; i += 1) {


        popups[i] = new mapboxgl.Popup()
        .setLngLat(markerCoords[`ruinCoordsMarker${i}`])
        .setHTML(JSON.stringify(this.listOfRuinsData[i].name))
        .addTo(map);

        const el = document.createElement('div');
        el.className = 'marker';

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

.map {
  display: flex;
  align-items: center;
  width: 60vw;
  height: 80vh;
  margin-right: 5rem;
}

.marker {
  background-image: url('../../public/marker-icon.png');
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
}

</style>