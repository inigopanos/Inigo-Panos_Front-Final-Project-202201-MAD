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
    return{
        isLoading: computed(() => store.state.isLoading),
        userLocation: computed(() => store.state.userLocation),
    }
}