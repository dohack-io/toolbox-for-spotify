import { Module, ActionContext } from "vuex";
import { RootState } from "..";

export interface AuthenticationState {
    code: string|undefined;
}

const state: AuthenticationState = {
    code: undefined,
};

const getters = {
    isAuthenticated: (state: AuthenticationState) => state.code !== undefined,
};

const actions = {
    authenticate({ commit }: ActionContext<AuthenticationState, RootState>, code: string) {
        commit("setCode", code);
    },
};

const mutations = {
    setCode(state: AuthenticationState, code: string) {
        state.code = code;
    },
};

export const auth: Module<AuthenticationState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
