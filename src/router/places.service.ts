import { computed, onMounted } from 'vue';
import { PlacesStateI } from "@/_helpers/interfaces";
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
        isLoading: computed(() => store.state.isLoading),
        userLocation: computed(() => store.state.userLocation),
    }
}