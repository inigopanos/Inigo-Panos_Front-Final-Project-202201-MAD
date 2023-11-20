<template>
  <div>
    <h2>Añada una nueva localización</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">
          <input  class="data-input" type="text" id="name" v-model="ruin.name" name="name" placeholder="Nombre" />
        </label>
        <div v-show="submitted && !ruin.name" class="invalid-feedback">
          Es necesario que introduzca un nombre
        </div>
      </div>

      <div class="form-group">
        <label for="location">
          <input  class="data-input" type="location" v-model="ruin.location" name="location" placeholder="Localización"
        /></label>
        <div v-show="submitted && !ruin.location" class="invalid-feedback">
          Es necesario que introduzca una localización
        </div>
      </div>

      <div class="form-group">
        <label for="description">
          <input 
          class="textarea" 
          type="description"
          v-model="ruin.description"
          name="description"
          placeholder="Descripción"
        /></label>
        <div v-show="submitted && !ruin.description" class="invalid-feedback">
          Es necesario que introduzca una descripción
        </div>
      </div>

      <div class="form-group">
        <label for="link">
          <input
          class="data-input"
            type="link"
            v-model="ruin.link"
            name="link"
            placeholder="Link de interés"
        /></label>
        <div v-show="submitted && !ruin.link" class="invalid-feedback">
          Es necesario que introduzca un link de interés
        </div>
      </div>

      <div class="form-group">
        <label for="images">
          <input
            class="data-input"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            name="images"
            placeholder="Imágenes"
            multiple
        /></label>
        <div v-show="submitted && !ruin.images" class="invalid-feedback">
          Es necesario que introduzca al menos una imagen
        </div>
      </div>

      <div class="form-group">
        <label for="coords">
          <input
          class="data-input"
            type="coords"
            v-model="ruin.coords"
            name="coords"
            placeholder="Coordenadas lng lat"
        /></label>
        <div v-show="submitted && !ruin.coords" class="invalid-feedback">
          Es necesario que introduzca unas coordenadas válidas
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Añadir</button>
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
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { storage } from '@/firebase';


export default defineComponent({
  name: 'register-form',
  components:
  {
  },

  data() {
    return {
      ruin: {
        name: '',
        location: '',
        description: '',
        link: '',
        images: [''],
        coords: '',
      },
      imageFiles: [],
      isAdmin: false,
      id: '',
      idRuina: '',
      submitted: false,
      fileToUpload: [{
        fileName: '',
      }],
    };
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
    ...mapGetters('account', ['userData', 'userInformation']),
  },

  methods: {
    ...mapActions('ruins', ['createNewRuin']),

    handleImageChange(e: any) {      
      this.fileToUpload = e.target.files;
      console.log('Lista de archivos', this.imageFiles);
    },

    handleSubmit() {
      this.submitted = true;

      // Por cada imagen crea una referencia y una url. Luego crea la ruina.
      // El backend es un array de strings que son referencias a los links de imagenes en firebase ARRAY DE STRINGS

      for( let i = 0; i < this.fileToUpload.length; i +=1){
        const newRef = ref(storage, uuid() + this.fileToUpload[i].fileName);

        uploadBytes(newRef, this.fileToUpload[i] as any).then(() => {
          getDownloadURL(newRef).then((url: string) => {
            this.ruin.images[i] = url;            
          })
        });
      }
      console.log('Ruina a crear:', this.ruin);
      this.createNewRuin(this.ruin);
    },

  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;
    this.idRuina = id as string;
  },
});
</script>
<style lang="scss">
// input,
// input::before,
// input::after {
//   box-sizing: border-box;
// }



.data-input {
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

.textarea {
  resize: both;
  overflow: scroll;
}

h2 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;

  div {
    margin: 1rem;
  }
}
</style>
