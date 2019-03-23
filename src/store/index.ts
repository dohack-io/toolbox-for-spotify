import Vue from "vue";
import Vuex from "vuex";
import { authentication } from "./modules/authentication";

Vue.use(Vuex);

export interface RootState {

}

const state: RootState = {

};

const mutations = {

};

const actions = {

};

export default new Vuex.Store<RootState>({
  modules: {
    authentication,
  },
  state,
  mutations,
  actions,
});
