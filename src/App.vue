/* eslint-disable vue/no-parsing-error */
<template>
  <body>
    <div ref="" class="app-template">
      <nav>
        <router-link to="/ruins">Lista de ruinas</router-link> |
        <router-link to="/addRuin" v-if="userData?.userFound?.isAdmin"
          >Crear Ruinas |</router-link
        > 
        <div v-if="userLoggedStatus?.loggedIn === true">
          <router-link to="/userData">
            <img
              class="profile_image"
              src="https://vignette.wikia.nocookie.net/spqr-series/images/1/17/Augustus.png/revision/latest?cb=20140205212909"
              alt="RomanBust"
          /></router-link>
        </div>
        <div v-else>
          <button v-on:click="logOutUser()">
            <router-link to="/login">
              <img
                class="profile_image"
                src="https://vignette.wikia.nocookie.net/spqr-series/images/1/17/Augustus.png/revision/latest?cb=20140205212909"
                alt="RomanBust"
            /></router-link>
          </button>
        </div>
      </nav>

      <router-view />
      <main></main>
      <footer>
        <a :href="'https://www.linkedin.com/in/iñigo-paños-basterra-040021197/'" target="_blank">
          <img
            class="logo"
            src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/linkedin.png?alt=media&token=97094566-c7dd-4780-8df7-63c2fd788478"
            alt="linkedinLogo"
          />
        </a>
        <a :href="'https://github.com/inigopanos'" target="_blank">
          <img
            class="logo"
            src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/github.png?alt=media&token=82317cd3-1295-497e-8875-143fa6180345"
            alt="linkedinLogo"
          />
        </a>
      </footer>
    </div>
  </body>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapState } from 'vuex';
import { userPlacesStore } from './router/places.service';

export default {
  data() {
    return {
      idUser: '',
    };
  },

  computed: {
    ...mapState('account', ['']),
    ...mapGetters('account', ['userInfo', 'userData', 'userLoggedStatus']),
  },

  methods: {
    ...mapActions('account', ['loginWithToken', 'logout']),

    logOutUser() {
      this.logout();
    },
  },

  setup(){
    userPlacesStore();
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style-type: none;
  line-height: 1.5;
  min-height: 100%;
}
#app {
  width: 100%;
  height: 100%;

  position: relative;
  nav {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
  body {
    position: relative;
  }

  body::before {
    content: '';
    background-image: url(https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/hanibal.png?alt=media&token=c2abda80-0fe9-4296-ac1a-00a0a2fd37cc);
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: -1;
    opacity: 0.18;
  }

  footer {
    display: flex;
    margin-top: 15px;
    justify-content: space-evenly;
    opacity: 0.5;
    // margin-top:auto;

    a {
      .logo{
        height: 100%;
        width: 100%; 
      }
    }
  }

  font-family: Cinzel, sans-serif;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;

  .img.ruin {
    width: 100px;
    height: 100px;
  }

  .profile_image {
    width: 50px;
    height: 68px;
  }

  .ruin-details__comment-card-container__div__image {
    width: 15px;
    height: 15px;
    margin: 1px;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
