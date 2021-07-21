<template>
  <div class="bg-gray-700 rounded-md w-full h-full">
      <img
        click="addToFavorite(source)"
          class="max-h-56 w-full max object-contain "
          :src="source"
          alt="Doge"
        >
  </div>
</template>
<script>
export default {
  props: {
      source: {
        type: String,
        required: true,
      },
  },
  methods: {
    addToFavorite(source) {
        console.log("ADD TO FAVORITE", source)
    },
  },
}
</script>
