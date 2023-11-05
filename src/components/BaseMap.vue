<template>
  <head>
    <p>{{ places }}</p>
    <p>{{ userLocation }}, {{ isLoading }}</p>
  </head>
  <div id="map"></div>
</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import {mapState, mapGetters} from 'vuex';
  import { computed, defineComponent } from 'vue';
  import {userPlacesStore} from '../router/places.service'

export default defineComponent({
  components: { },
  // data() {
  //   return {
  //     userLocation: [Number, Number],
  //     isLoading: Boolean,
  //   };
  // },

  computed:{
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapState(['places']),
  },

  setup() {
    const { isLoading, userLocation,} = userPlacesStore();

    return { 
      isLoading,
      userLocation, 
    }
  },

});
</script>
