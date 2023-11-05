<template>
  <head>
    <!-- <script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script> -->
  </head>
  <div id="map"></div>
</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import {mapState} from 'vuex';
  import { defineComponent } from 'vue';
  import {userPlacesStore} from '../router/places.service'

export default defineComponent({
  components: {},
  data() {
    return {
      userLocation: [Number, Number],
      isLoading: Boolean,
    };
  },

  computed:{
    ...mapState('places'),
  },

  setup() {
    userPlacesStore();
  },

});
</script>
