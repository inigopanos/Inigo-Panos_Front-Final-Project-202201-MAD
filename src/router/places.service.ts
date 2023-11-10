import { computed, onMounted } from 'vue';
import { PlacesStateI } from "@/_helpers/interfaces";
import { useStore } from 'vuex';

export const userPlacesStore = () => {
    const store = useStore<PlacesStateI>();

    onMounted(() => {
        if (!store.getters['places/isUserlocationReady'])
        {
            store.dispatch('places/getInitialLocation');
        }
    })

    console.log('En userPlacesStore:', {...store.state.userLocation});
    // Devuelve un objeto vacío Prototipo
    return{
        isLoading: computed(() => store.state.isLoading),
        userLocation: computed(() => store.state.userLocation),
    }
}