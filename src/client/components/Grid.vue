<template> 
  <div>
    <div class="grid grid-cols-4 gap-4 grid__wrapper">
      <template v-if="list.length" >
      <div v-for="(item, index) of list" :key="index" class="flex items-center justify-center text-white text-2xl font-extrabold">
        <slot :item="item">{{item}}</slot>
      </div>
      </template>
      <div v-else>
        {{ emptyMessage }}
      </div>
    </div>
    <footer>
      <div ref="infinitescrolltrigger" id="scoll-trigger"></div>
      <div class="circle-loader border-indigo-900" v-if="showLoader"></div>
    </footer>
  </div>
</template>
<style scoped lang="scss">
.grid__wrapper {
  position: relative;
  width: 100%;
}
footer {
  position: relative;
  width: 100%;
    height: 100px;
    #scroll-trigger {
      height: 50px;
    }
    .circle-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid;
      border-top: 5px solid #fff;
      animation: animate 1.5s infinite linear;
    }
  }
  @keyframes animate {
    0% {
      transform: translate(-50%,-50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%,-50%) rotate(360deg);
    }
  }
</style>
<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 4,
    },
    fetch: {
      type: Function,
      required: true,
    },
    limit: {
      type: Number,
      default: 20,
    },
    intersectionObserver: {
      type: Boolean,
      default: true,
    },
    emptyMessage: {
      type: String,
      default: ""
    }
  },
  data() {
      return {
        current: 0,
        list: [],
        showLoader: true,
      }
  },
  computed: {
    pageOffset() {
      return this.limit * this.current;
    }
  },
  mounted() {
    if(this.intersectionObserver) {
      this.scrollTrigger()
    } else {
      this.loading()
    }
  },
  methods: {
    async loading() {
      this.showLoader = true
      const promises = await this.fetch(this.limit, this.current, this.pageOffset)
      const result = await Promise.all(promises)
      this.list.push(...result)
      this.current += 1
      this.showLoader = false
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.intersectionRatio > 0) {
            this.loading()
          }
        })
      })
      observer.observe(this.$refs.infinitescrolltrigger);
    }
  },
}
</script>
