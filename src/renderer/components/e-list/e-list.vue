<template>
  <div class="list-box">
    <Card v-for="item in list"
          :key="item.id"
          :icon="item.type === 1 ? 'md-grid' : 'md-videocam'"
          :title="item.title"
          class="item">
      <p>{{item}}</p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'e-list',
  components: {},
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.list-box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  .item {
    // flex-grow: 1;
    width: 25%;
    min-width: 300px;
    max-width: 400px;
    margin: 10px;
  }
}
</style>