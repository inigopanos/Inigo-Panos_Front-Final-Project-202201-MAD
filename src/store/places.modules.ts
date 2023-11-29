import { MutationTree, GetterTree, Commit } from "vuex";
import { PlacesStateI } from "@/_helpers/interfaces";

function estado(): PlacesStateI{
    return {
        isLoading: true,
        userLocation: undefined,
    }
};

const actions = {
    getInitialLocation({ commit }: {commit: Commit}) {
        navigator.geolocation.watchPosition(
            ( {coords} ) => commit('setLngLat', {lng: coords.longitude, lat: coords.latitude}), // Se llama a la mutación
            (err) => {
                console.error(err);
                throw new Error('No geolocation');
            }
        );
    }
}

const mutations: MutationTree<PlacesStateI> = {
    setLngLat(state: PlacesStateI, {lng, lat}: {lng: number, lat: number}){
        state.userLocation = [lng, lat];
        state.isLoading = false;
    }
};

const getters = {
    isUserlocationReady(state: PlacesStateI) {
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