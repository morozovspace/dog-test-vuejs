<template>
  <nuxt-link
    class="bg-gray-700 rounded w-full h-full relative card__wrapper overflow-hidden p-4"
    :to="`/breeds/${title}`">
    {{ title }}
  </nuxt-link>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
