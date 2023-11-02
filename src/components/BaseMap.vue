<template>
  <head>
    <script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script>
  </head>
  <div id="map"></div>
</template>

<script lang="ts">
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { tokenMap } from '../_helpers/config';

export default {
  components: {},
  data() {
    return {
    };
  },

  mounted() {
    // We need to set mapbox-gl library here in order to use it in template
    console.log('No se ha creado un mapa: ');

    // this.mapbox = Mapbox;
    // console.log('Esto es el mapbox, ', this.mapbox);

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [40.416775, -3.70379], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    console.log('Se ha creado un mapa: ', map);
  },
};
</script>
