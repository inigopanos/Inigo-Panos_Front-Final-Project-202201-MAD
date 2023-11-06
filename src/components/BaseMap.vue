<template>
  <div class="loading-map">
      <div class="loading-text">
        <h3>Espere por favor</h3>
        <span>Localizando</span>
      </div>
  </div>
  <p>1: {{ places.userLocation }}, </p>
  <p> 2: {{ places.isLoading }},</p>
  <p>3: {{ places }}</p>
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
    ...mapActions('places', ['getInitialLocation']),
    ...mapGetters('places', ['isUserlocationReady']),
    ...mapState(['places']),
  },

  methods:{
    ...mapActions('places', [
      'isUserlocationReady'
    ])
  },

  setup() {
    const { isLoading, userLocation,} = userPlacesStore();

    console.log('Polla', isLoading.value, userLocation.value);

    return { 
      isLoading,
      userLocation, 
    }
  },

  mounted() {
    const { isLoading, userLocation } = userPlacesStore();
    console.log('Prueba1:', isLoading.value, userLocation.value);
  }

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
  z-index: 999;
  display:flex;
  justify-content: center;
  align-items: center;

  .loading-text {
    text-align: center;
}
}


</style>