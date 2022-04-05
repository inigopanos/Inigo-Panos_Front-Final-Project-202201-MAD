<template>
  <MglMap :accessToken="tokenMap" :mapStyle="mapStyle" />
  <div id="map"></div>
</template>

<script lang="ts">
import Mapbox from 'mapbox-gl';
import { tokenMap } from '../_helpers/config';

export default {
  components: {},
  data() {
    return {};
  },

  mounted() {
    // We need to set mapbox-gl library here in order to use it in template
    console.log('No se ha creado un mapa: ');

    this.mapbox = Mapbox;
    console.log('Esto es el mapbox, ', this.mapbox);

    const map = new Mapbox.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [40.416775, -3.70379], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    console.log('Se ha creado un mapa: ', map);
  },
};
</script>
