<template>
  <nav class="bg-gray-200">
        <div class="">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div>
                <div class="ml-8 flex items-baseline">
                  <NuxtLink
                    v-for="(link, index) of links"
                    :key="index"
                    :to="link.to"
                    v-slot="slot">
                      <a :class="link.class(index, slot)" :href="slot.href">
                        {{ link.title }}
                      </a>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    },
    getInfo(obj) {
      console.log("OBSERVER", obj)
    },
  },
  computed: {
    links() {
      const ctx = this
      const defaultClass = "px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      let isActive = -1
      function calcClass (index, slot) {
        const activeName = ctx.$route.name
        isActive = this.id.findIndex((el) => el === activeName)
        return `${index > 0 ? "ml-2" : "" } ${defaultClass} ${isActive !== -1 ? "text-gray-100 bg-gray-700" : "text-gray-800" }`
      }
      return [
        {
          id: ["index"],
          title: "Home",
          to: "/",
          class: calcClass,
        },
        {
          id: ["breeds", "breeds-id"],
          title: "Browse breed list",
          to: "/breeds",
          class: calcClass,
        },
        {
          id: ["favorites"],
          title: "Favorites",
          to: "/favorites",
          class: calcClass,
        },
      ]
    },
  },
}
</script>
