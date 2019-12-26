<template>
  <div>
    <Layout>
      <Header class="header">
        <!-- <eMenu></eMenu> -->
        <eSearch @on-search="searchHandle"></eSearch>
      </Header>
      <Content class="content">
        <eList :list="list"></eList>
      </Content>
      <Footer class="footer">
        <ePage :current="current"
               :total="total"
               :page-size="pageSize"
               @on-change="changePage"
               @on-page-size-change="changePageSize"></ePage>
        <!-- <div style="text-align: center;">代码搜索</div> -->
      </Footer>
    </Layout>
  </div>
</template>

<script>
// 接口 获取番号列表
import { getList } from '../../api/data'

// 菜单
import eMenu from '../e-menu'
// 搜索条
import eSearch from '../e-search'
// 显示列表
import eList from '../e-list'
// 分页
import ePage from '../e-page'
export default {
  name: 'home',
  components: {
    eMenu,
    eSearch,
    eList,
    ePage
  },
  props: {},
  data () {
    return {
      // 当前页数
      current: 1,
      // 总条数
      total: 0,
      // 分页条数
      pageSize: 10,
      // 查询关键词
      keyword: '',
      // 数据列表
      list: [
        { id: 1, title: 'ipx-177', pic: 'fghbghdjgbd', type: 1 },
        { id: 2, title: 'ipx-177', pic: 'fghbghdjgbd', type: 1 },
        { id: 3, title: 'ipx-177', pic: 'fghbghdjgbd', type: 1 },
        { id: 4, title: 'ipx-177', pic: 'fghbghdjgbd', type: 1 },
        { id: 5, title: 'ipx-177', pic: 'fghbghdjgbd', type: 1 },
        { id: 6, title: 'ipx-177', pic: 'fghbghdjgbd', type: 1 },
        { id: 7, title: 'ipx-177', pic: 'fghbghdjgbd', type: 0 },
        { id: 8, title: 'ipx-177', pic: 'fghbghdjgbd', type: 0 },
        { id: 9, title: 'ipx-177', pic: 'fghbghdjgbd', type: 0 }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 搜索事件
    searchHandle (value) {
      this.keyword = value
      this.listReload()
    },
    // 分页变化
    changePage (page) {
      this.current = page
      this.listReload()
    },
    // 分页条数变化
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.listReload()
    },
    listReload () {
      getList(this.current, this.pageSize, this.keyword).then(res => {
        console.log(res)
        if (res.status === 200) {
          let result = res.data
          this.current = result.current
          this.list = result.data
          this.total = result.total
        } else {
          this.$Message.error('查询失败！')
        }
      })
    }
  },
  created () {
    this.listReload()
  },
  mounted () { }
}
</script>
<style lang="scss">
.header {
  // background: #2d8cf0;
  background: #ffffff !important;
}
.content {
  height: calc(100vh - 150px);
  overflow-x: hidden;
  overflow-y: auto;
}
.footer {
  height: 80px;
}

/*滚动条整体样式*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #dddee1;
}

::-webkit-scrollbar-track {
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #f8f8f9;
}
</style>
