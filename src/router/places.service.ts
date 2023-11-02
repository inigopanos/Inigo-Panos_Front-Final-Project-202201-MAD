import axios from 'axios';
import { PlacesStateI } from '@/store/places.modules';
import { useStore } from 'vuex';

export const userPlacesStore = () => {
    const store = useStore<PlacesStateI>();

    return{
        
    }
}