<template>
  <div>
    <div class="page-header mt-3">
      <h1>Results</h1>

      <b-list-group>
        <b-list-group-item>
          <div class="row">
            <div class="col-1 text-center p-0">
              <b-form-checkbox v-model="allSongsSelected" @change="markAllSongs"></b-form-checkbox>
            </div>
            <div class="col-11 p-0">{{ selectedItemCount }} Songs selected</div>
          </div>
        </b-list-group-item>

        <b-list-group-item
          v-for="song in items.map(i => i.track)"
          v-bind:key="song.id"
        >
          <div class="row align-items-center">
            <div class="col-1 text-center p-0">
              <b-form-checkbox v-model="song.selected"></b-form-checkbox>
            </div>
            <div class="col-1 p-0">
              <img :src="song | getCoverUrl" alt="" class="src" />
            </div>
            <div class="col-10 p-0">
              <h4>
                {{ song.artists | concatFields("name") }} - {{ song.name }}
              </h4>
              <h6>
                {{ song.album.name }} -
                {{ song.duration_ms | msToMinutesAndSeconds }}
              </h6>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "query-results",
  components: {},
  data() {
    return {
      selectedItemCount: 0,
      allSongsSelected: false,
      items: [
        {
          track: {
            selected: false,
            album: {
              images: [
                {
                  height: 640,
                  url:
                    "https://i.scdn.co/image/9f4b8d0cd28219d7f583395f75a86a59e91c63b0",
                  width: 640
                },
                {
                  height: 300,
                  url:
                    "https://i.scdn.co/image/f5c995797b1888873918aabee7737b2bb758a9ef",
                  width: 300
                },
                {
                  height: 64,
                  url:
                    "https://i.scdn.co/image/31e2082a346fb9838e1b9449d2f198f127077376",
                  width: 64
                }
              ],
              name: "Bee-Sting"
            },
            artists: [
              {
                name: "The Wombats"
              }
            ],
            duration_ms: 214432,
            id: "7xdPwAhj4mMqDaNxvNoYnV",
            name: "Bee-Sting"
          },
          video_thumbnail: { url: null }
        }
      ]
    };
  },
  methods: {
    markAllSongs(checked: boolean) {
      this.items.forEach(i => (i.track.selected = checked));
    }
  },
  filters: {
    concatFields(artists: any[], fieldName: string) {
      return artists.map(a => a[fieldName] as string).join(", ");
    },
    msToMinutesAndSeconds(ms: number) {
      const seconds = ms / 1000;
      return Math.floor(seconds / 60) + ":" + Math.floor(seconds % 60);
    },
    getCoverUrl(song: any) {
      if ("images" in song) {
        return song.images[2].url;
      } else if ("images" in song.album) {
        return song.album.images[2].url;
      }
    }
  },
  watch: {
    items: {
      handler(value) {
        this.selectedItemCount = this.items.filter(
          i => i.track.selected
        ).length;
        this.allSongsSelected = this.selectedItemCount === this.items.length;
      },
      deep: true
    }
  }
});
</script>

<style>
</style>
 