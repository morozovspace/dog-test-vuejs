<template>
<Grid
  :fetch="fetch"
  :intersectionObserver="false"
  class="px-8 py-8"
  v-slot="{ item }"
  :empty-message="'Select favorite'"
>
 <DogeCard :click="click" :favorites="favorites" :source="item" />
</Grid>
</template>
<script>
import Grid from "@/components/Grid.vue"
import DogeCard from "@/components/DogeCard.vue"
import { mapState, mapMutations } from "vuex"
export default {
  components: { Grid, DogeCard },
  data() {
    return {
      dogs: [],
      error: 0,
    }
  },
  computed: {
    ...mapState({
      favorites: "favorites",
    }),
  },
  methods: {
    ...mapMutations({
      init: "initFavorites",
      add: "addFavorite",
      remove: "removeFavorite",
    }),
    click(isFavorite, favoriteIndex, source) {
      if (isFavorite) {
        this.remove(favoriteIndex)
      } else {
        this.add(source)
      }
    },
    fetch() {
      this.init()
      return Promise.resolve(this.favorites)
    },
  }
}
</script>
