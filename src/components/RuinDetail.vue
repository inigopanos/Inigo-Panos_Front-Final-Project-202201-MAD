/* eslint-disable no-underscore-dangle */
<template>
  <div>
    <h1>Detalles de la ruina</h1>
  </div>

  <main>
    <div>
    <ul v-if="ruinDetails" class="ul-ruin-details">
      <li><span class="bold">Nombre: <br>
      </span> {{ ruinDetails?.name }}</li>
      <li><span class="bold">Localización: <br>
      </span> {{ ruinDetails?.location }}</li>
      <li><span class="bold">Descripción: <br> </span> {{ ruinDetails?.description }}</li>
      <li><span class="bold">Links de interés: <br> </span > <a :href="ruinDetails?.link">{{ ruinDetails?.link }}</a></li>


      <li class="ruinImage"> 
        <span class="bold">Imágenes: <br> </span>
       
        <carousel :items-to-show="1.5">
          <slide class="slide" v-for="image in ruinDetails.images" :key="image">
            <img v-bind:src="image" class="ruin-image" alt="ruin-image" />
          </slide>

          <template #addons>
            <navigation />
            <pagination />
         </template>
        </carousel>
      </li>

      <div class="map-link">
        <router-link :to="`/ruins`">
        <a>Ver en el mapa</a>
      </router-link >
      </div>

      <template v-if="ruinDetails?.comments">
        <span class="bold" v-if="ruinDetails.comments > 1"> Comentarios:</span>
        <ul class="ruin-details__comment-card-container">
          <div
            v-for="comment in ruinDetails?.comments"
            :key="comment.text"
            class="ruin-details__comment-card-container__div"
          >
            <li class="ruin-details__comment-card-container__div__userName">
              <img
                class="ruin-details__comment-card-container__div__image"
                src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/user%20(2).png?alt=media&token=fde454b9-e3e9-474e-aced-4f12108acc91"
                alt="user icon"
              />
              {{ comment?.author_id?.userName }} :
            </li>
            <li>
              <img
                class="ruin-details__comment-card-container__div__image"
                src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/comment%20(1).png?alt=media&token=4aaba2c6-e20c-4f14-ac25-37184a4a478c"
                alt=""
              />
              {{ comment?.text }}
            </li>
            -- | --

            <div v-if="comment?.author_id?._id === userData?.userFound?._id">
              <button
                type="button"
                class="deleteCommentButton"
                v-on:click="deleteRuinComment(comment?._id)"
              >
                <img
                  class="delete-button"
                  src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/trash.png?alt=media&token=5fd16359-53ca-41d4-975d-39c97d73f975"
                  alt="trash-icon"
                />
              </button>
            </div>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group" v-if="userData?.userFound">
              <label for="comment">
                <input type="comment" v-model="newComment" name="comment" /> |
                <button class="comment-button" type="button" v-on:click="handleSubmit">
                  Enviar comentario
                </button>
              </label>
            </div>
          </form>
        </ul>
      </template>
    </ul>
    <div class="icons-container">
      <div class="icons-container__icon" v-if="userData?.userFound">
        <button type="button"  v-on:click="ruinFavorites()">
          <img
          v-if="!favorited"
          id="favoriteButton"         
          src = "https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/heart.png?alt=media&token=7da07779-588f-4a3b-9012-660ecaf7dcad"
          alt="favorited-empty-heart-icon" />
          <img
          v-else
          id="favoriteButton"         
          src = "https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/heart%20(1).png?alt=media&token=391a8dfa-e83a-46de-b396-970fccc7e7a7"
          alt="favorited-heart-icon" />
          
        </button>
      </div>
      <div class="icons-container__icon" v-if="userData?.userFound">
        <button type="button"  v-on:click="ruinVisited()">
          <img
            v-if="!visited"
            id="visitedButton"
            src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/thumbtack.png?alt=media&token=d589e556-9ac6-4c96-95e2-755b125763d5"
            alt="visited-empty-icon"
          />
          <img
            v-else
            id="visitedButton"
            src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/thumbtack_filled.png?alt=media&token=2b0034f4-63fc-450d-a1c5-231da984ea9b"
            alt="visited-icon"
          />
        </button>
      </div>
    </div>

      <div v-if="userData?.userFound?.isAdmin" class="update-delete">
      <router-link :to="`/ruinUpdate/${ruinDetails?._id}`">
        <a>Actualizar datos</a>
      </router-link>
      |
      <button type="button" id="deleteRuinButton" v-on:click="deleteRuinById()">
        <img
          class="delete-button"
          src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/trash.png?alt=media&token=5fd16359-53ca-41d4-975d-39c97d73f975"
          alt="trash-icon"
        />
      </button>
    </div>
  </div>
  
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import { useRoute } from 'vue-router';

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default defineComponent({
  name: 'ruin-data',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  data() {
    return {
      ruinInfo: {
        _id: '',
        name: '',
        location: '',
        description: '',
        images: [''],
        coords: ['', ''],
        score: '',
        comments: [],
        isAdmin: false,
        isAuthor: false,
        prueba: '',
      },
      newComment: '',
      favorited: false,
      visited: false,
    };
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails', 'listOfRuinsData']),
    ...mapGetters('account', ['userData']),
    ...mapState('ruins', ['allRuinsData']),
  },
  methods: {
    ...mapActions('ruins', [
      'getRuinDetails',
      'getAllRuins',
      'deleteRuin',
      'updateRuin',
      'addRuinToFavorites',
      'addRuinToVisited',
      'addCommentToRuin',
      'deleteCommentFromRuin',
    ]),
    ...mapActions('account', ['getUserData']),

    deleteRuinById() {
      this.deleteRuin(this.ruinDetails._id);
    },

    ruinFavorites() {
      this.addRuinToFavorites(this.ruinDetails._id);
      
      this.favorited = !this.favorited;

      if (!this.favorited)
      {
        const favoriteButton = document.getElementById("favoriteButton") as HTMLImageElement;
        favoriteButton.src = "https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/heart.png?alt=media&token=7da07779-588f-4a3b-9012-660ecaf7dcad";
      } else {
        const favoriteButton = document.getElementById("favoriteButton") as HTMLImageElement;
        favoriteButton.src = "https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/heart%20(1).png?alt=media&token=391a8dfa-e83a-46de-b396-970fccc7e7a7";
      };
    },

    ruinVisited() {
      this.addRuinToVisited(this.ruinDetails._id);

      this.visited = !this.visited;

      if (!this.visited)
      {
        const favoriteButton = document.getElementById("visitedButton") as HTMLImageElement;
        favoriteButton.src = "https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/thumbtack.png?alt=media&token=d589e556-9ac6-4c96-95e2-755b125763d5";
      } else {
        const favoriteButton = document.getElementById("visitedButton") as HTMLImageElement;
        favoriteButton.src = "https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/thumbtack_filled.png?alt=media&token=2b0034f4-63fc-450d-a1c5-231da984ea9b";
      };
    },

    deleteRuinComment(id: string) {
      const payloadComment = {
        ruinId: this.ruinDetails?._id,
        commentId: id,
      };

      this.deleteCommentFromRuin(payloadComment);
    },

    handleSubmit() {
      let idUsuario = localStorage.getItem('id');
      idUsuario = JSON.parse(idUsuario as string);
      const payload = {
        author_id: idUsuario,
        ruin_id: this.ruinDetails._id,
        text: this.newComment,
      };
      this.addCommentToRuin(payload);
    }, 

    checkFavorited() {
      if (this.userData?.userFound?.favorites.length > 0){

        for(let i = 0; i < this.userData?.userFound?.favorites.length; i+=1)
        {

          if (this.userData?.userFound?.favorites[i]._id == this.ruinDetails?._id)
          {
            this.favorited = true;
            return;
          } 
        } 
      } 
      this.favorited = false;
    },

    checkVisited() {
      if (this.userData?.userFound?.visited?.length > 0)
      {
        for(let i = 0; i < this.userData?.userFound?.visited.length; i+=1)
        {
          if (this.userData?.userFound?.visited[i]._id == this.ruinDetails?._id)
          {
            this.visited = true;
            return;
          } 
        }
      }
      this.visited = false;
    },
  },

  onMounted() {
    this.checkFavorited();
    this.checkVisited();
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;
    this.getRuinDetails(id);
    this.getAllRuins();
    },
});

</script>
<style lang="scss">

button {
  all: unset;
}

.favoriteButton::before{
  content: url("https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/heart.png?alt=media&token=fe00aee2-c848-4302-8d09-de9f19742d6d");
}
.favoriteButton::af{
  content: url("https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/heart%20(1).png?alt=media&token=391a8dfa-e83a-46de-b396-970fccc7e7a7");
}

.update-delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
h1 {
  font-size: 25px;
  margin: 0 auto;
  text-align: center;
}
.bold {
  font-weight: bold;
}
.delete-button {
  margin-top: 0.4rem;
  width: 20px;
  height: 20px;
}
.icons-container {
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;
}

.ul-ruin-details {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-right: 30rem;
  padding-left: 30rem;

  li {
    margin: 1rem 0;
  
    .ruin-image {
      height: 50vh;
      width: 50vw;
    }
  }

  .ruin-details {
    &__comment-card-container {
      background-color: rgb(165, 158, 158);

      width: 90%;
      margin: 0 auto;
      padding-top: 1rem;
      padding-bottom: 1rem;
      
      border-radius: 30px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;

      .form-group {
        display: flex;
        justify-content: center;
      }

      &__div {
        background-color: rgb(197, 188, 188);
        border-color: black 10px;

        padding: 0.5rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        width: 90%;
        margin: 0 auto;
        margin-bottom: 1rem;
        &__userName {
          font-weight: bold;
        }

        &__image {
          height: 15px;
          width: 15px;
        }
      }
    }
  }
}
</style>
