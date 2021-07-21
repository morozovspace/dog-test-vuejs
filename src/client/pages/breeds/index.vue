<template>
  <Grid :fetch="fetch" v-slot="{ imageSource }" class="px-8 py-8">
    <DogeCard :source="imageSource" />
  </Grid>
</template>
<script>
import Grid from "@/components/Grid.vue"
import DogeCard from "@/components/DogeCard.vue"
export default {
  components: { Grid, DogeCard },
  data() {
    return {
      dogs: [],
      error: 0,
    }
  },
  methods: {
    async getRandom() {
      try {
        /*
        const delay = ms => new Promise((resolve, reject) => setTimeout(() => {
          resolve("https://images.dog.ceo/breeds/rottweiler/n02106550_7473.jpg")
        }, 1000))
        */
        const { message } = await this.$axios.$get("/image/random")
        return Promise.resolve(message)
      } catch (e) {
        return Promise.resolve(null)
      }
    },
    async fetch(limit) {
      const promises = []
      for(let i = 0; i < limit; i++) {
        const data = await this.getRandom()
        if (data) {
          promises.push(data)
        }
      }
      return Promise.resolve(promises)
    },
  }
}
</script>
