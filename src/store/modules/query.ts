import { Module, ActionContext } from "vuex";
import { RootState } from "..";

export interface QueryState {
    query: string,
    results: {
        foo: Number[]
    }
}

const state: QueryState = {
    query: "",
    results: {
        foo: [1, 2, 3, 4]
    }
};

const getters = {
    
};

const actions = {
    
};

const mutations = {

};

export const auth: Module<QueryState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
