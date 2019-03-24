import { Module, ActionContext } from "vuex";
import { RootState } from "..";
import spotify from "spotify-web-api-js";

import * as _ from "lodash";
import { getField, updateField } from "vuex-map-fields";
import { parseExpression } from "../../toolbox/parser"

import { loadTracksFromSource, QuerySource } from "../../toolbox/query"
import { filterTracks, Expression } from "../../toolbox/filter";
import { getAvailablePlaylists, createPlaylist, appendTracks, replaceTracks } from '@/toolbox/save';
import { auth } from './auth';

export interface ResultItem {
  selected: boolean,
  track: SpotifyApi.TrackObjectFull;
}

export interface QueryState {
  display: "settings" | "results" | "save",
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
      }
    }
  };
  executing: boolean,
  error: string | undefined,
  results: {
    items: ResultItem[],
  };
  sink: {
    new: {
      name: string,
      publicPlaylist: boolean,
    }
    existing: {
      mode: "append" | "replace",
      availablePlaylist: SpotifyApi.PlaylistObjectSimplified[],
      selectedId: string | undefined,
    },
  }
}

type FilterExpressionState = { status: "empty" } | { status: "success", expr: Expression } | { status: "error", message: string };

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
  },
  sink: {
    new: {
      name: "",
      publicPlaylist: false,
    },
    existing: {
      mode: "append",
      availablePlaylist: [],
      selectedId: undefined,
    },
  }
};

const getters = {
  getField,
  filterExpression(state: QueryState): FilterExpressionState {
    if (state.settings.filter.selected == "simple") {
      return { status: "empty" };
    } else {
      const input = state.settings.filter.complex.expression;

      if (/^\s*$/.test(input)) {
        return { status: "empty" };
      }

      const parseResult = parseExpression(input);

      if (parseResult.status) {
        return { status: "success", expr: parseResult.value };
      }

      return {
        status: "error", message: `Expected ${parseResult.expected.join(" or ")} at line ${parseResult.index.line}, column ${parseResult.index.column}`
      }
    }
  },
  canExecuteQuery: (state: QueryState, getters: { filterExpression: FilterExpressionState }) => {
    return getters.filterExpression.status != "error" && !state.executing;
  },
  canSaveResults: (state: QueryState) => {
    return state.results.items.length > 0;
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
    const filter: FilterExpressionState = getters.filterExpression;

    if (state.executing || filter.status == "error") {
      return;
    }

    commit("startQueryExecution");
    const authCode = rootState.auth.code;
    let source: QuerySource;

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
        if (filter.status == "success") {
          return filterTracks(results, filter.expr);
        } else {
          return results;
        }
      }).then((results) => {
        return new Promise(resolve => setTimeout(() => {
          commit("setQueryResults", results);
          resolve();
        }, 1000));
      })
      .catch((err: any) => {
        commit("setExecutionError", err.message);
      }).finally(() => {
        commit("finishExecution");
      });
  },
  markAllResultItems({ commit, state, }: ActionContext<QueryState, RootState>, checked: boolean) {
    commit("setResultItems", _.map(state.results.items, ({ track }) => ({ selected: checked, track })));
  },
  executeSelectResults({ commit, state, rootState }: ActionContext<QueryState, any>) {
    if (state.executing) {
      return;
    }

    commit("startExecution");
    const authCode = rootState.auth.code;

    getAvailablePlaylists(authCode)
      .then((results) => {
        return new Promise(resolve => setTimeout(() => {
          commit("setAvailablePlaylists", results);
          commit("setDisplay", "save");
          resolve();
        }, 1000));
      })
      .catch((err: any) => {
        commit("setExecutionError", err.message);
      }).finally(() => {
        commit("finishExecution");
      });
  },
  executeSaveToNewPlaylist({ commit, state, rootState }: ActionContext<QueryState, any>) {
    if (state.executing) {
      return;
    }

    commit("startExecution");
    const authCode = rootState.auth.code;
    const { name, publicPlaylist } = state.sink.new;
    const tracks = state.results.items.map(i => i.track);

    return createPlaylist(authCode, name, publicPlaylist)
      .then((playlist) => {
        return appendTracks(authCode, playlist.id, tracks);
      })
      .catch((err: any) => {
        commit("setExecutionError", err.message);
      }).finally(() => {
        commit("finishExecution");
      });
  },
  executeSaveToExistingPlaylist({ commit, state, rootState }: ActionContext<QueryState, any>) {
    if (state.executing || state.sink.existing.selectedId === undefined) {
      return;
    }

    commit("startExecution");
    const authCode = rootState.auth.code;
    const tracks = state.results.items.map(i => i.track);
    const playlistId = state.sink.existing.selectedId;

    let promise;
    if (state.sink.existing.mode === "append") {
      promise = appendTracks(authCode, playlistId, tracks);
    } else {
      promise = replaceTracks(authCode, playlistId, tracks);
    }

    promise
      .catch((err: any) => {
        commit("setExecutionError", err.message);
      }).finally(() => {
        commit("finishExecution");
      });
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
  startExecution(store: QueryState) {
    store.executing = true;
    store.error = undefined;
  },
  finishExecution(store: QueryState) {
    store.executing = false;
  },
  setExecutionError(store: QueryState, error: string) {
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
  },
  setAvailablePlaylists(store: QueryState, results: SpotifyApi.PlaylistObjectSimplified[]) {
    store.sink.existing.availablePlaylist = results;
  },
  setDisplay(store: QueryState, display: "settings" | "results" | "save") {
    store.display = display;
  }
};

export const query: Module<QueryState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
