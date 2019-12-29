<template>
  <div>
    <Spin fix>
      <div class="over-box">
        <div v-for="(item, index) in itemList"
             :key="index"
             class="item"
             :style="{top: topNumber + '%', animationDuration: item.time + 's', opacity: item.opacity}"></div>
      </div>
    </Spin>
  </div>
</template>

<script>
export default {
  name: 'e-spin',
  components: {},
  props: {
    current: {
      type: [String, Number],
      default: 50
    },
    number: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {
    itemList () {
      let number = this.number < 6
        ? this.number > 0
          ? this.number
          : 1
        : 5
      const initTime = [7, 11, 13, 17, 19]
      const initOpacity = [0.9, 0.7, 0.5, 0.3, 0.1]
      let itemList = []
      for (let i = 0; i < number; i++) {
        itemList.push({
          time: initTime[i],
          opacity: initOpacity[i]
        })
      }
      return itemList
    },
    topNumber () {
      let current = 100 - parseFloat(this.current)
      console.log(current)
      return current.toFixed(2)
    }
  },
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.over-box {
  width: 100px;
  height: 100px;
  border: solid 1px #2d8cf0;
  border-radius: 100%;
  box-shadow: #2d8cf0 1px 1px 1px;
  box-sizing: border-box;
  overflow: hidden;
  animation: water infinite linear;
  position: relative;
  .item {
    position: absolute;
    // top: 50%;
    left: -50%;
    width: 200%;
    height: 200%;
    border-radius: 33%;
    background: #2d8cf0;
    animation: inherit;
    // animation-duration: 7s;
    // opacity: .7;
    // &:nth-child(2) {
    //   animation-duration: 11s;
    //   opacity: .5;
    // }
    // &:nth-child(3) {
    //   animation-duration: 15s;
    //   opacity: .3;
    // }
  }
}

@keyframes water {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>