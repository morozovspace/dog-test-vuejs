<template>
  <div class="h-64 grid grid-cols-4 gap-4">
    <div v-for="dog of dogs" :key="dog">
      {{ dog }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dogs: [],
    }
  },
  async created() {
    try {
      this.dogs = (await this.$axios.$get("/list/all")).message
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  },
}
</script>
