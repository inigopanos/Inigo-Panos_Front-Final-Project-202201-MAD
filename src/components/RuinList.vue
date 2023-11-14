<template>
  <div>
    <h1>Lista de ruinas</h1>
  </div>
  <main class="main__body">
    <ul v-if="listOfRuinsData">
      <li v-for="ruin in listOfRuinsData" :key="ruin._id" class="ruin-list__wrapper">
        <div class="ruin-list__card">
          <router-link :to="`/ruinDetails/${ruin._id}`">
            <div class="trail-card__header">
              <a class="card-name">{{ ruin.name }}</a>
            </div>
            <div class="trail-card__body">
              <div class="trail-card__left">
                <div class="trail-card__left-item">
                  <a class="card-location">{{ ruin.location }}</a>
                </div>
                <div class="trail-card__left-item"></div>
                <div class="trail-card__left-item"></div>
              </div>
              <div class="trail-card__right">
                <div class="trail-card__right__image"></div>
              </div>
            </div>
           
            
           
          </router-link>
        </div>
      </li>
    </ul> 

     <div class="map">
      <BaseMap/>
    </div>
  </main> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import BaseMap from './BaseMap.vue';

export default defineComponent({
    name: 'ruins-list',
    data() {
        return {
            name: '',
        };
    },
    computed: {
        ...mapGetters('ruins', ['listOfRuinsData']),
    },
    mounted() {
        this.getAllRuins();
    },
    methods: {
        ...mapActions('ruins', ['getAllRuins']),
    },
    components: { BaseMap }
});
</script>
<style lang="scss">

@media(min-width: 1300px) {
    .trail--fullscreen-right {
        margin-left:0!important
    }
}

ul {
  list-style-type: none;
}

.main__body {

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  

  // wrapper {
  //   .trail:hover {
  //   cursor: pointer;
  //   }
  //   .trail--highlight, .trail:hover {
  //       border: 1px solid #dcdcdc;
  //       box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  //   }
  // }

  .ruin-list__wrapper{
    display: block;
    &:hover {
      cursor: pointer;
    }
    &:hover {
        border: 1px solid #dcdcdc;
        box-shadow: 0 10px 10px 0 rgba(0,0,0,.15);
    }

    .ruin-list__card {
      min-width: 454px;
      max-width: 754px;
      -webkit-box-orient: vertical;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      -ms-flex-preferred-size: 575px;
      flex-basis: 575px;
      width: 100%;
      margin: 0 15px 8px;
      border-radius: 6px;
      min-height: 187px;

      background-color: white;
      opacity: 0.8;

      border-radius: 3px;

      box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.5);
      transition: 0.3s;
      text-decoration: none;
      font-size: 20px;
      text-align: center;
    }
  }

  

}


</style>
