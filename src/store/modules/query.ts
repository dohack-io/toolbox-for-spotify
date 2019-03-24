import { Module, ActionContext } from "vuex";
import { RootState } from "..";
import spotify from "spotify-web-api-js";

import * as _ from "lodash";
import { getField, updateField } from "vuex-map-fields";
import { parseExpression } from "../../toolbox/parser"

import { loadTracksFromSource, QuerySource } from "../../toolbox/query"
import { filterTracks, Expression } from "../../toolbox/filter";

export interface ResultItem {
    selected: boolean,
    track: SpotifyApi.TrackObjectFull;
}

export interface QueryState {
    display: "settings" | "results",
    settings: {
        source: {
            selected: "all" | "playlists" | "user",
            playlists: Array<{ id: string }>,
        },
        filter: {
            selected: "simple" | "complex",
            simple: {
                artists: Array<{ name: string }>,
                genres: Array<{ name: string }>,
                releaseDates: Array<{ year: number }>
            },
            complex: {
                expression: string
            },
            
        }
    };
    executing: boolean,
    error: string | undefined,
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
            simple: {
                artists: [{ name: "" }],
                genres: [{ name: "" }],
                releaseDates: [{ year: 2019 }]
            },
            complex: {
                expression: ""
            }
        }

    },
    executing: false,
    error: undefined,
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
    canExecuteQuery: (state: QueryState, getters: { filterExpression: Expression | undefined }) => {
        return /* getters.filterExpression !== undefined && */ !state.executing;
    },
    selectedSongs: (state: QueryState) => {
        return state.results.items.filter(s => s.selected).length;
    }
};

const actions = {
    addNewPlaylist({ commit, state }: ActionContext<QueryState, RootState>) {
        commit("setPlaylists", [...state.settings.source.playlists, { id: "" }]);
    },
    removePlaylist({ commit, state, }: ActionContext<QueryState, RootState>, index: number) {
        commit("setPlaylists", _.filter(state.settings.source.playlists, (x, i) => i !== index));
    },
    addNewArtist({ commit, state }: ActionContext<QueryState, RootState>) {
        commit("setArtists", [...state.settings.filter.simple.artists, { name: "" }]);
    },
    removeArtist({ commit, state, }: ActionContext<QueryState, RootState>, index: number) {
        commit("setArtists", _.filter(state.settings.filter.simple.artists, (x, i) => i !== index));
    },
    addNewGenre({ commit, state }: ActionContext<QueryState, RootState>) {
        commit("setGenres", [...state.settings.filter.simple.genres, { name: "" }]);
    },
    removeGenre({ commit, state, }: ActionContext<QueryState, RootState>, index: number) {
        commit("setGenres", _.filter(state.settings.filter.simple.genres, (x, i) => i !== index));
    },
    addNewReleaseDate({ commit, state }: ActionContext<QueryState, RootState>) {
        commit("setReleaseDates", [...state.settings.filter.simple.releaseDates, { year: 2019 }]);
    },
    removeReleaseDate({ commit, state, }: ActionContext<QueryState, RootState>, index: number) {
        commit("setReleaseDates", _.filter(state.settings.filter.simple.releaseDates, (x, i) => i !== index));
    },
    executeQuery({ commit, state, getters, rootState }: ActionContext<QueryState, any>, ) {
        if (state.executing) {
            return;
        }

        commit("startQueryExecution");
        const authCode = rootState.auth.code;
        let source: QuerySource;
        const filter: Expression = getters.filterExpression;

        if (state.settings.source.selected == "all") {
            source = { type: "all" };
        } else if (state.settings.source.selected == "user") {
            source = { type: "user" };
        } else {
            source = {
                type: "playlists",
                playlistIds: state.settings.source.playlists.map(p => p.id)
            };
        }

        loadTracksFromSource(authCode, source, undefined)
            .then(results => {
                return filterTracks(results, filter);
            }).then((results) => {
                return new Promise(resolve => setTimeout(() => {
                    commit("setQueryResults", results);
                    resolve();
                }, 1000));
            })
            .catch((err: any) => {
                commit("setQueryError", err.message);
            }).finally(() => {
                commit("finishQueryExecution");
            });
    },
    markAllResultItems({ commit, state, }: ActionContext<QueryState, RootState>, checked: boolean) {
        commit("setResultItems", _.map(state.results.items, ({ track }) => ({ selected: checked, track })));
    },
};

const mutations = {
    updateField,
    setPlaylists(store: QueryState, playlists: Array<{ id: string }>) {
        store.settings.source.playlists = playlists;
    },
    setArtists(store: QueryState, artists: Array<{ name: string }>) {
        store.settings.filter.simple.artists = artists;
    },
    setGenres(store: QueryState, genres: Array<{ name: string }>) {
        store.settings.filter.simple.genres = genres;
    },
    setReleaseDates(store: QueryState, releaseDates: Array<{ year: number }>) {
        store.settings.filter.simple.releaseDates = releaseDates;
    },
    setResultItems(store: QueryState, items: ResultItem[]) {
        store.results.items = items;
    },
    startQueryExecution(store: QueryState) {
        store.executing = true;
        store.error = undefined;
    },
    finishQueryExecution(store: QueryState) {
        store.executing = false;
    },
    setQueryError(store: QueryState, error: string) {
        store.error = error;
    },
    setQueryResults(store: QueryState, results: SpotifyApi.TrackObjectFull[]) {
        store.results.items = results.map(track => {
            return {
                selected: true,
                track
            };
        });
        store.display = "results";
    }
};

export const query: Module<QueryState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
