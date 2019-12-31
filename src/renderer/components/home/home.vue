<template>
  <div>
    <Layout>
      <Header class="header">
        <!-- <eMenu></eMenu> -->
        <eSearch @on-search="searchHandle"></eSearch>
      </Header>
      <Content class="content">
        <eList :list="list"
               @on-create="createHandle"
               @on-edit="editHandle"
               @on-delete="deleteHandle"></eList>
        <eSpin v-if="spinLoading"
               :current="70"></eSpin>
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
    <Modal v-model="formShow"
           :title='modalTitle'
           :width="600"
           :mask-closable="false"
           :closable="false"
           :loading="formLoading"
           @on-ok="okHandle"
           @on-cancel="cancelHandle">
      <e-form ref="codeFrom"
              v-if="formShow"
              :code-id="formId"
              @on-save-res="saveResHandle"></e-form>
    </Modal>
  </div>
</template>

<script>
// 接口 获取番号列表, 删除番号信息
import { getInfoList, deleteInfo } from '../../api/data'

// 加载动画
import eSpin from '../e-spin'
// 菜单
import eMenu from '../e-menu'
// 搜索条
import eSearch from '../e-search'
// 显示列表
import eList from '../e-list'
// 表单
import eForm from '../e-form'
// 分页
import ePage from '../e-page'
export default {
  name: 'home',
  components: {
    eSpin,
    eMenu,
    eSearch,
    eList,
    eForm,
    ePage
  },
  props: {},
  data () {
    return {
      // 加载动画
      spinLoading: false,
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
        { id: 1, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 1 },
        { id: 2, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 1 },
        { id: 3, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 1 },
        { id: 4, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 1 },
        { id: 5, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 1 },
        { id: 6, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 1 },
        { id: 7, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 0 },
        { id: 8, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 0 },
        { id: 9, title: 'ipx-177', pic: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFW', type: 0 }
      ],
      formShow: false,
      formId: null,
      formLoading: true
    }
  },
  watch: {},
  computed: {
    modalTitle () {
      return this.formId ? '编辑' : '新增'
    }
  },
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
    // 列表加载事件
    listReload () {
      // this.spinLoading = true
      getInfoList(this.current, this.pageSize, this.keyword).then(res => {
        if (res.status === 200) {
          let result = res.data
          this.current = result.current
          this.list = result.data
          this.total = result.total
        } else {
          this.$Message.error('查询失败！')
        }
        // this.spinLoading = false
      })
    },
    // 新增事件
    createHandle () {
      this.formId = null
      this.formShow = true
    },
    // 编辑事件
    editHandle (id) {
      this.formId = id
      this.formShow = true
    },
    // 删除事件
    deleteHandle (id) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该番号信息？',
        onOk: () => {
          deleteInfo(id).then(res => {
            if (res.status === 200) {
              this.listReload()
            } else {
              this.$Message.error('删除失败！')
            }
          })
        },
        onCancel: () => { }
      })
    },
    // 保存事件
    okHandle () {
      if (this.formId) {
        this.$refs.codeFrom.updateFormData()
      } else {
        this.$refs.codeFrom.createFormData()
      }
    },
    // 保存结果
    saveResHandle (type) {
      if (type) {
        this.formShow = false
        this.listReload()
      } else {
        this.formLoading = false
        this.$nextTick(() => {
          this.formLoading = true
        })
      }
    },
    // 取消事件
    cancelHandle () {
      this.formId = null
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
  height: calc(100vh - 124px);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.footer {
  height: 60px;
  padding: 14px 50px !important;
  text-align: right;
  border-top: solid 1px #e5e5e5;
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
