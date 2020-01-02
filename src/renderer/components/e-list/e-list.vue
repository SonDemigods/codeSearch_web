<template>
  <div class="list-box">
    <Card class="item">
      <Button class="create"
              type="dashed"
              icon="ios-add-circle-outline"
              @click="createHandle"></Button>
    </Card>
    <Card v-for="item in list"
          :key="item.id"
          :icon="item.type === 1 ? 'md-grid' : 'md-videocam'"
          class="item">
      <div slot="title"
           class="title"
           @click="titleHandle(item.title)">{{item.title}}</div>
      <div slot="extra"
           class="operation">
        <Button type="text"
                @click="editHandle(item.id)">
          <Icon type="md-brush"
                class="primary"
                :size="18" />
        </Button>
        <Button type="text"
                @click="deleteHandle(item.id)">
          <Icon type="md-trash"
                class="error"
                :size="18" />
        </Button>
      </div>
      <div>
        <img :src="$picUrl + item.pic"
             :alt="item.title"
             @click="picShowHandle(item.pic)"
             class="pic" />
      </div>
      <Modal v-model="picShow"
             title='预览'
             :width="900"
             :mask-closable="false"
             footer-hide>
        <img v-if="picShow"
             :src="$picUrl + currentPic"
             :alt="currentPic"
             class="picView" />
      </Modal>
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
      picShow: false,
      currentPic: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 新增事件
    createHandle () {
      this.$emit('on-create')
    },
    // 点击标题事件
    titleHandle (keyword) {
      this.$emit('on-title', keyword)
    },
    // 编辑事件
    editHandle (id) {
      this.$emit('on-edit', id)
    },
    // 删除事件
    deleteHandle (id) {
      this.$emit('on-delete', id)
    },
    // 预览图片
    picShowHandle (url) {
      this.currentPic = url
      this.picShow = true
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss">
.list-box {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  .item {
    // flex-grow: 1;
    width: 25%;
    min-width: 300px;
    max-width: 400px;
    margin: 10px;
    .title {
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #2d8cf0;
      }
    }
    .operation {
      display: none;
      height: 20px;
      button {
        height: 20px;
        line-height: 20px !important;
        padding: 0 6px;
        .primary {
          color: #2d8cf0;
        }
        .error {
          color: #ed4014;
        }
      }
    }
    &:hover {
      .operation {
        display: block;
      }
    }
    .create {
      display: block;
      height: 100px;
      line-height: 100px;
      width: 100px;
      font-size: 40px;
      margin: 20px auto;
      border-radius: 20px;
    }
    .pic {
      display: block;
      width: 100%;
      min-height: 100%;
      cursor: pointer;
    }
  }
}
.picView {
  display: block;
  width: 100%;
  min-height: 100%;
}
</style>