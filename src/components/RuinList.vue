<template>
  <div>
    <h1>Lista de ruinas</h1>
  </div>
  <main class="main__body">
    <ul v-if="listOfRuinsData">
      <li v-for="ruin in listOfRuinsData" :key="ruin._id" class="ruin-list__wrapper">
        <div class="ruin-list__card">
          <router-link :to="`/ruinDetails/${ruin._id}`">
            <div class="ruin-card__header">
              <a class="card-name">{{ ruin.name }}</a>
            </div>
            <div class="ruin-card__body">
              <div class="ruin-card__left">
                <div class="ruin-card__left-item">
                  <a class="card-location">{{ ruin.location }}</a>
                </div>
                <div class="ruin-card__left-item"></div>
                <div class="ruin-card__left-item"></div>
              </div>
              <div class="ruin-card__right">
                <div class="ruin-card__right__image">
                  <img v-bind:src="ruin.images" alt="imagen-ruina">
                 
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </li>
    </ul> 

     <div class="map">
       <BaseMap :ruinsData="listOfRuinsData2"/>
     </div>
  </main> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useVirtualList } from '@vueuse/core';
import BaseMap from './BaseMap.vue';

export default defineComponent({
    name: 'ruins-list',
    props: {
      ruinsData: {
        required: true,
      },
    },

    data() {
        return {
            name: '',
            listOfRuinsData2: [],
        };
    },
    computed: {
        ...mapGetters('ruins', ['listOfRuinsData']),
    },
    mounted() {
        this.getAllRuins();
        this.listOfRuinsData2 = this.listOfRuinsData;
    },
    methods: {
        ...mapActions('ruins', ['getAllRuins']),
    },
    components: { BaseMap }
});
</script>
<style lang="scss">

@media(min-width: 1300px) {
    .ruin--fullscreen-right {
        margin-left:0!important
    }
}

ul {
  list-style-type: none;
}

.ruin-card__right__image > img{
  width: 150px;
  height: 100px;
  border: 1px solid #000;
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
  //   .ruin:hover {
  //   cursor: pointer;
  //   }
  //   .ruin--highlight, .ruin:hover {
  //       border: 1px solid #dcdcdc;
  //       box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  //   }
  // }

  .ruin-list__wrapper{
    display: flex;

    flex-direction: row;
    flex-wrap: wrap;

    justify-content: space-between;
    align-items: center;
    
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
     flex-direction: column;   
      flex-grow: 1;
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

      &__body{
        @extend .ruin-list__card;
        height: 120px;
        background-color: red;
      }

      .ruin-card__right__image {
        flex-shrink: 5;
        max-width: 100%;
        height: auto;
        object-fit: fill;
      }
    }
  }
}
</style>
