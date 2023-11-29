<template>
  <div>
    <h2>
      Modifique la ruina: <br />
      {{ ruinDetails?.name }}
    </h2>

    <form @submit.prevent="handleSubmit" v-if="ruinDetails">
      <div class="form-group">
        <p><span class="bold"> Nombre: </span> {{ ruinDetails?.name }}</p>
        <label for="name">
          <input type="text" id="name" v-model="ruinDetails.name" name="name" />
        </label>
      </div>

      <div class="form-group">
        <p><span class="bold">Localización:</span> {{ ruinDetails?.location }}</p>

        <label for="location">
          <input type="location" v-model="ruinDetails.location" name="location"
        /></label>
      </div>

      <div class="form-group">
        <p><span class="bold">Descripción:</span> {{ ruinDetails?.description }}</p>

        <label for="description">
          <input type="description" v-model="ruinDetails.description" name="description"
        /></label>
      </div>

      <div class="form-group">
        <p><span class="bold">Link de interés:</span> {{ ruinDetails?.link }}</p>

        <label for="link">
          <input type="link" v-model="ruinDetails.link" name="link"
        /></label>
      </div>

      
      <div class="form-group">
        <p><span class="bold">Coordenadas:</span> {{ ruinDetails?.coords }}</p>

        <label for="coords">
          <input type="coords" v-model="ruinDetails.coords" name="coords"
        /></label>
      </div>


      <div class="ruinImage">
        <img v-bind:src="ruinDetails?.images" alt="ruin" />
        <label for="images">
          <input
            type="file"
            accept="image/*"
            name="images"
            placeholder="Imágenes"
        /></label>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Actualizar</button>
        |
        <router-link to="/" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'update-form',
  data() {
    return {
      payload: {
        ruin: {
          name: '',
          location: '',
          description: '',
          link: '',
          images: [],
          score: 5,
          coords: [],
        },
      },

      isAdmin: false,
      id: '',
      submitted: false,
    };
  },

  methods: {
    ...mapActions('ruins', ['modifyExistingRuin', 'getRuinDetails']),

    handleSubmit() {
      this.submitted = true;
      this.payload.ruin = this.ruinDetails;
      this.modifyExistingRuin(this.payload);
    },
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
    ...mapGetters('account', ['userData']),
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;
    this.getRuinDetails(id);
  },
});
</script>

<style lang="scss">
input,
input::before,
input::after {
  box-sizing: border-box;
}

input {
  border: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f2f2f2;
  padding: 12px;
  border-radius: 3px;
  width: 250px;
  font-size: 14px;
}
.bold {
  font-weight: bold;
}
.ruinImage {
  width: 95%;
  height: auto;
  margin: 0 auto;

  img {
    margin: 0 auto;
    width: 50%;
    height: 50%;
  }
}
</style>
