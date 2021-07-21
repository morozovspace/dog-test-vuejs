<template>
  <Grid :fetch="fetch" v-slot="{ item }" :intersectionObserver="false" class="px-8 py-8">
    <BreedCard :title="item" />
  </Grid>
</template>
<script>
import Grid from "@/components/Grid.vue"
import BreedCard from "@/components/BreedCard"
import { mapState, mapMutations } from "vuex"
export default {
  components: { Grid, BreedCard },
  data() {
    return {
      dogs: [],
      error: 0,
    }
  },
  mounted() {
    this.init()
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
    async getBreeds() {
      try {
        /*
        const delay = ms => new Promise((resolve, reject) => setTimeout(() => {
          resolve("https://images.dog.ceo/breeds/rottweiler/n02106550_7473.jpg")
        }, 1000))
        */
        const { message } = await this.$axios.$get("breeds/list/all")
        return Promise.resolve(message)
      } catch (e) {
        return Promise.resolve(null)
      }
    },
    async fetch(limit) {
      const data = await this.getBreeds()
      return Promise.resolve(Object.keys(data))
    },
  }
}
</script>
