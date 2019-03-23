import { Module, ActionContext } from "vuex";
import { RootState } from "..";
import spotify from "spotify-web-api-js";

import * as _ from "lodash";
import { getField, updateField } from "vuex-map-fields";
import SpotifyWebApi from 'spotify-web-api-js';

export interface ResultItem {
    selected: boolean,
    track: SpotifyApi.TrackObjectFull
}

export interface QueryState {
    settings: {
        source: {
            selected: "all" | "playlists" | "user",
            playlists: Array<{ id: string }>,
        },
        filter: {
            selected: "simple" | "complex",
            simple: {},
            complex: {
                expression: string
            }
        }
    };
    results: {
        items: ResultItem[],
    };
}

const state: QueryState = {
    settings: {
        source: {
            selected: "all",
            playlists: [{ id: "" }],
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
    addNewPlaylist({ commit, state }: ActionContext<QueryState, RootState>) {
        commit("setPlaylists", [...state.settings.source.playlists, { id: "" }]);
    },
    removePlaylist({ commit, state, }: ActionContext<QueryState, RootState>, index: number) {
        commit("setPlaylists", _.filter(state.settings.source.playlists, (x, i) => i != index));
    },
};

const mutations = {
    updateField,
    setPlaylists(store: QueryState, playlists: Array<{ id: string }>) {
        store.settings.source.playlists = playlists;
    },
    setResultItems(store: QueryState, items: ResultItem[]) {
        store.results.items = items;
    }
};

export const query: Module<QueryState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
