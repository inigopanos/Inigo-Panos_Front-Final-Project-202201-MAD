import Vuex from 'vuex';

import { account } from './account.modules';
import { ruins } from './ruins.modules';
import { places } from './places.modules'

export const store = new Vuex.Store({
  modules: {
    account,
    ruins,
    places, 
  },
});
