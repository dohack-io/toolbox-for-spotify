import { Module, ActionContext } from "vuex";
import { RootState } from "..";

import { getField, updateField } from 'vuex-map-fields';

export interface QueryState {
    settings: {
        source: {
            selected: "all" | "playlists" | "user",
            playlists: { id: string }[],
        },
        filter: {
            selected: "simple" | "complex",
            simple: {},
            complex: {
                expression: string
            }
        }
    }
    results: {
        items: object[],
    }
}

const state: QueryState = {
    settings: {
        source: {
            selected: "all",
            playlists: [  { id: "" } ],
        },
        filter: {
            selected: "simple",
            simple: {},
            complex: {
                expression: ""
            }
        }

    },
    results: {
        items: []
    }
};

const getters = {
    getField
};

const actions = {
    
};

const mutations = {
    updateField
};

export const query: Module<QueryState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
