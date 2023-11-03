import axios from 'axios';
import { onMounted } from 'vue';
import { PlacesStateI } from '@/store/places.modules';
import { useStore } from 'vuex';

export const userPlacesStore = () => {
    const store = useStore<PlacesStateI>();

    onMounted(() => {
        console.log("Se llama a placesStore, onMounted");
        if (!store.getters['places/isUserlocationReady'])
        {
            console.log('No hay storeGetters places IsUserlocation');
            store.dispatch('places/getInitialLocation');
        }
    })

    return{
        // todo: 
    }
}