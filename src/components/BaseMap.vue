<template>
  <!-- <div
  v-if="!isUserlocationReady"
  class="loading-map">
      <div class="loading-text">
        <h3>Espere por favor</h3>
        <span>Localizando</span>
      </div>
  </div> -->
  
  <div class="map" ref="mapElement"/>

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
      allRuinsCoords: []
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
  },

  setup() {
    const route = useRoute();

    console.log('Coordenadas de la ruina: ', route.params.coords, typeof(route.params.coords));

    let ruinCoordinates;
    let ruinCoords: [lng: number, lat: number];

    if (route?.params?.coords)
    {  
      ruinCoordinates = route.params.coords;
      ruinCoordinates = (ruinCoordinates as string).split(' ');
      
      const lngRuin = parseFloat(ruinCoordinates[1]);
      const latRuin = parseFloat(ruinCoordinates[0]);

      ruinCoords = [lngRuin, latRuin]
    }

    const store = useStore();
    console.log('Store: ', store?.state?.places);
   
    const mapElement = ref<HTMLDivElement>();

    // CREACIÓN DEL MAPA

    const initMap = async (allRuinsCoords: [number, number][]) => {
      
      await Promise.resolve();
          
      if (!mapElement.value) throw new Error('Div Element no existe');
  
      const bounds: [[number, number], [number, number]] = [
        [-9.465087353810635, 35.31818720563167], // [west, south]
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        [5.1948353404399747, 44.48518712768742]  // [east, north]
      ];

      const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-4.739859783755799, 40.110300848632406], // starting position [lng, lat]
        zoom: 1, // starting zoom
        }); 
      
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragPan.enable();
      map.setMaxBounds(bounds);

      const ruinLocationPopup = new mapboxgl.Popup({offset:[0, -45]})
      .setLngLat(ruinCoords)
      .setHTML(`
      <h4> Aquí se encuentra la ruina </h4>
      <p> ${ruinCoords} </p>
      `);
      
      const ruinLocationMarker = new mapboxgl.Marker()
      .setLngLat(ruinCoords)
      .setPopup(ruinLocationPopup)
      .addTo(map);
    }

    return { 
      mapElement,
      initMap
    }
  },

  mounted() {

    const datosRuinas = this.ruins?.allRuinsData;

    type Coordenada = { x: number; y: number };
    const allRuinsCoords: [number,number][] = [];

    for (let i = 0; i < datosRuinas?.length; i+=1){
      if ('coords' in datosRuinas[i]) {
        const coords = datosRuinas[i].coords as Coordenada;
      
        if ('x' in coords && 'y' in coords) 
          {
            allRuinsCoords.push([coords.x, coords.y]);
          }
      }
    }

    if (allRuinsCoords.length > 0){
      return this.initMap(allRuinsCoords);
    } 
    
    return {
      allRuinsCoords,
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
        this.initMap(this.allRuinsCoords);
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