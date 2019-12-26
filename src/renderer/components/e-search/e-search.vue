<template>
  <div>
    <Input v-model="searchText"
           search
           class="search"
           placeholder="请输入关键字"
           @on-search="searchHandle" />
  </div>
</template>

<script>
export default {
  name: 'e-search',
  components: {},
  props: {},
  data () {
    return {
      searchText: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    searchHandle (value) {
      this.$emit('on-search', value)
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss">
.search {
  display: block !important;
  width: 60% !important;
  min-width: 200px;
  max-width: 400px;
  margin: 12px auto;
  .ivu-input {
    height: 40px;
    line-height: 40px;
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 40px;
  }
  .ivu-icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
  }
}
</style>