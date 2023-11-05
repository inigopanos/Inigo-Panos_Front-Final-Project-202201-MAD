<template>
  <head>
    <!-- <script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script> -->
  </head>
  <h1>Map View</h1>
  <p>IsLoading: {{ isLoading }}, userLocation: {{ userLocation }}</p>
  <div id="map"></div>
</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { defineComponent } from 'vue';
  import { mapMutations, mapGetters, mapState } from 'vuex';
  import {userPlacesStore} from '../router/places.service'

export default defineComponent({
  name: 'BaseMap',

  data(){
    return{
      isLoading: Boolean,
      userLocation:[Number, Number]
    }
  },
  
  computed: {
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapMutations('places', ['setLngLat']),
    ...mapState(['state'])
  },

  setup() {

    const { isLoading, userLocation } = userPlacesStore();

    console.log('Is Loading:', isLoading,'UserLocation:', userLocation);
  },
});
</script>
