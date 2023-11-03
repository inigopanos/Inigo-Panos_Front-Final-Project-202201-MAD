import { MutationTree, GetterTree, Commit } from "vuex";

export interface PlacesStateI{
    isLoading: boolean;
    userLocation?: [number, number];
}

function estado(): PlacesStateI{
    return {
        isLoading: true,
        userLocation: undefined,
    }
};

const actions = {
    getInitialLocation({ commit }: {commit: Commit}) {
        // todo: colocar loading
        navigator.geolocation.watchPosition(
            ( coords ) => commit('setLngLat', coords),
            (err) => {
                console.error(err);
                throw new Error('No geolocation');
            }
        );
    }
}

const mutations: MutationTree<PlacesStateI> = {
    setLngLat(state: PlacesStateI, coords){
        console.log('Coordenadas usuario:', {coords});
        state.userLocation = coords;
        state.isLoading = false;
    }
};

const getters = {
    isUserlocationReady(state: PlacesStateI) {
        console.log('Is userLocationReady:', !!state.userLocation);
        return !!state.userLocation;
    },
};

export const places = {
    namespaced: true,
    estado,
    actions,
    mutations,
    getters,
};