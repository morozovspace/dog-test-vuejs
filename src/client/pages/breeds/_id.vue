<template>
  <Grid :fetch="fetch" v-slot="{ item }" class="px-8 py-8">
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
      current: 1,
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
    async getBreed() {
      try {
        const { message } = await this.$axios.$get(`breed/${this.$route.params.id}/images`)
        return Promise.resolve(message)
      } catch (e) {
        return Promise.resolve(null)
      }
    },
    async fetch(limit, current, pageOffset) {
      const data = await this.getBreed()
      const res = data.slice(pageOffset, pageOffset + limit)
      return Promise.resolve(res)
    },
  }
}
</script>
