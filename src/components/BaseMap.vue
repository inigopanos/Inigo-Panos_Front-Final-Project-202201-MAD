<template>
  <head>
  </head>
  <p>1: {{ userLocation }}, </p>
  <p> 2: {{ isLoading }},</p>
  <p>3: {{ prueba1 }}</p>
  <div id="map"></div>
</template>

<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import { defineComponent } from 'vue';
  import {userPlacesStore} from '../router/places.service'


export default defineComponent({
  components: { },
  data() {
    return {
      prueba1: ""
    };
  },

  computed:{
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapState(['store']),
  },

  methods:{
    ...mapActions('places', [
      'isUserlocationReady'
    ])
  },

  setup() {
    const { isLoading, userLocation,} = userPlacesStore();

    console.log('Polla', isLoading, userLocation);

    return { 
      isLoading,
      userLocation, 
    }
  },

  mounted() {
    const { isLoading, userLocation } = userPlacesStore();
    console.log('Prueba1:', isLoading, userLocation);
  }

});
</script>
