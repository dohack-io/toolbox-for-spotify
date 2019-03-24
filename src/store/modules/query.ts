import { Module, ActionContext } from "vuex";
import { RootState } from "..";
import spotify from "spotify-web-api-js";

import * as _ from "lodash";
import { getField, updateField } from "vuex-map-fields";
import SpotifyWebApi from 'spotify-web-api-js';
import { Expression } from '@/toolbox/filter';
import { parseExpression} from "../../toolbox/parser"

export interface ResultItem {
    selected: boolean,
    track: SpotifyApi.TrackObjectFull
}

export interface QueryState {
    display: "settings"|"results",
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
    display: "settings",
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
    getField,
    filterExpression: (state: QueryState) => {
        if (state.settings.filter.selected == "simple") {
            return undefined;
        } else {
            const parseResult = parseExpression(state.settings.filter.complex.expression);

            if (parseResult.status) {
                return parseResult.value;
            }

            return undefined;
        }
    },
    canExecuteQuery: (state: QueryState, getters: { filterExpression: Expression|undefined }) => {
        return getters.filterExpression !== undefined;
    },

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
