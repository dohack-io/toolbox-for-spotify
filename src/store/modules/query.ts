import { Module, ActionContext } from "vuex";
import { RootState } from "..";
import spotify from "spotify-web-api-js";

import * as _ from "lodash";
import { getField, updateField } from "vuex-map-fields";
import SpotifyWebApi from 'spotify-web-api-js';

export interface ResultItem {
  selected: boolean,
  track: SpotifyApi.TrackObjectFull;
}

export interface QueryState {
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
};

const mutations = {
<<<<<<< HEAD
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
  }
=======
    updateField,
    setPlaylists(store: QueryState, playlists: Array<{ id: string }>) {
        store.settings.source.playlists = playlists;
    },
    setResultItems(store: QueryState, items: ResultItem[]) {
        store.results.items = items;
    }
>>>>>>> 02abac12fe58329ca843083d0783d0b47afaddb0
};

export const query: Module<QueryState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
