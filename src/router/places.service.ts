import axios from 'axios';
import { PlacesStateI } from '@/store/places.modules';
import { useStore } from 'vuex';
import { onMounted } from 'vue';

export const userPlacesStore = () => {
    const store = useStore<PlacesStateI>();

    onMounted(() => {
        if (!store.getters['places/isUserLocationReady'])
        {
            store.dispatch('places/getInitialLocation');
        }
    })

    return{
        // todo: 
    }
}