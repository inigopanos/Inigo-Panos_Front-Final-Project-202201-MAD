<template>
  <head>
    <p>{{ userLocation }}, {{ isLoading }}</p>
  </head>
  <div id="map"></div>
</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import {mapState} from 'vuex';
  import { defineComponent } from 'vue';
  import {userPlacesStore} from '../router/places.service'

export default defineComponent({
  components: { },
  data() {
    return {
      userLocation: [Number, Number],
      isLoading: Boolean,
    };
  },

  computed:{
  },

  setup() {
    userPlacesStore();
  },

});
</script>
