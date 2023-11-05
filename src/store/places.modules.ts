/* eslint-disable @typescript-eslint/no-shadow */
import { MutationTree, GetterTree, Commit } from "vuex";
import { PlacesStateI } from "@/_helpers/interfaces";

function state(): PlacesStateI{
    return {
        isLoading: true,
        userLocation: undefined,
    }
};

const actions = {
    getInitialLocation({ commit }: {commit: Commit}) {
        // todo: colocar loading
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
        console.log('Coordenadas usuario:', {lng, lat});
        state.userLocation = [lng, lat];
        state.isLoading = false;
    }
};

const getters: GetterTree<PlacesStateI, PlacesStateI> = {
    isUserlocationReady(state: PlacesStateI) {
        console.log('Is userLocationReady:', !!state.userLocation);
        return !!state.userLocation;
    },
};

export const places = {
    namespaced: true,
    actions,
    mutations,
    getters,
};