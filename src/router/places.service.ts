import { computed, onMounted } from 'vue';
import { places } from '@/store/places.modules';
import { PlacesStateI } from "@/_helpers/interfaces";
import { useStore } from 'vuex';

export const userPlacesStore = () => {
    const store = useStore<PlacesStateI>();

    onMounted(() => {
        console.log("Se llama a placesStore, onMounted");
        if (!store.getters['places/isUserlocationReady'])
        {
            store.dispatch('places/getInitialLocation');
        }
    })

    
    // console.log('IsLoading, userLocation: ', store.state);
    
    
    return{
        isLoading: computed(() => store.state.isLoading),
        userLocation: computed(() => store.state.userLocation),
    }
}