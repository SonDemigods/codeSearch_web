<template>
  <div>
    <Page :current="current"
          :total="total"
          :page-size="pageSize"
          :page-size-opts="pageSizeOpts"
          show-elevator
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize" />
  </div>
</template>

<script>
export default {
  name: 'e-page',
  components: {},
  props: {
    current: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default () {
        return [10, 20, 50, 100]
      }
    }

  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    changePage (page) {
      this.$emit('on-change', page)
    },
    changePageSize (pageSize) {
      this.$emit('on-page-size-change', pageSize)
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="less" scoped>
</style>