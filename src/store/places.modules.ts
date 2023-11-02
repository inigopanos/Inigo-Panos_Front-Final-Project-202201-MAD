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
            ( coords ) => commit('setLntLat', coords),
            (err) => {
                console.error(err);
                throw new Error('No geolocation');
            }
        );
    }
}

const mutations: MutationTree<PlacesStateI> = {
    someMutation(){
        console.log('Se llama a mutation de places');
        return true;
    }
};

const getters = {
    isUserlocationReady(state: any) {
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