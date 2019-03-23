import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./modules/auth";
import { query } from "./modules/query";

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
    auth,
    query,
  },
  state,
  mutations,
  actions,
});
