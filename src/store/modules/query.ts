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
    isAuthenticated: (state: QueryState) => state.code !== undefined,
};

const actions = {
    authenticate({ commit }: ActionContext<QueryState, RootState>, code: string) {
        commit("setCode", code);
    },
};

const mutations = {

};

export const auth: Module<AuthenticationState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
