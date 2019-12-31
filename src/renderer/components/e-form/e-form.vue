<template>
  <div>
    <Form ref="formData"
          :model="formData"
          :rules="formValidate"
          :label-width="80">
      <FormItem label="代码"
                prop="title">
        <Input v-model="formData.title"
               placeholder="请输入代码"></Input>
      </FormItem>
      <FormItem label="类型"
                prop="type">
        <Select v-model="formData.type"
                placeholder="请选择代码">
          <Option v-for="item in typeList"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="图片"
                prop="type">
        <Input v-model="formData.pic"
               readonly
               class="picInput"
               placeholder="请选择图片"></Input>
        <Upload :action="$baseUrl + '/upload'"
                ref="upload"
                class="picUpload"
                name="file"
                :show-upload-list="false"
                :format="['png', 'jpg', 'jpeg', 'gif']"
                :max-size="10 * 1024"
                :headers="headers"
                :on-success="uploadSuccess"
                :on-format-error="uploadFormatError"
                :on-exceeded-size="uploadSizeError">
          <Button type="primary"
                  icon="ios-cloud-upload-outline">选择</Button>
        </Upload>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// 接口 根据id获取番号信息, 新增番号信息, 更新番号信息
import { getInfoById, createInfo, updateInfo } from '../../api/data'
import typeList from './typeList'
import empty from './empty'
export default {
  name: 'e-form',
  components: {},
  props: {
    codeId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      typeList,
      formData: empty,
      formValidate: {
        title: [
          { required: true, message: '代码不能为空！', trigger: 'blur' }
        ]
      },
      headers: {}
    }
  },
  watch: {},
  computed: {
    formId () {
      return this.codeId
    }
  },
  methods: {
    // 初始化
    init () {
      if (this.formId) {
        this.getFormData(this.formId)
      } else {
        this.reload()
      }
    },
    // 重置表单
    reload () {
      this.formData = {...empty}
      this.$refs.formData.resetFields()
    },
    // 根据id获取番号信息
    getFormData (id) {
      getInfoById(id).then(res => {
        if (res.status === 200) {
          this.formData = res.data
        } else {
          this.$Message.error('获取信息失败！')
        }
      })
    },
    // 新增
    createFormData () {
      createInfo(this.formData).then(res => {
        const type = res.status === 201
        this.saveFormRes(type)
      })
    },
    // 更新
    updateFormData () {
      updateInfo(this.formData).then(res => {
        const type = res.status === 200
        this.saveFormRes(type)
      })
    },
    // 保存结果
    saveFormRes (type) {
      this.$emit('on-save-res', type)
    },
    // 上传成功
    uploadSuccess (response, file, fileList) {
      console.log(response)
      this.formData.pic = response.pic
    },
    // 文件格式验证
    uploadFormatError () {
      this.$Modal.warning({
        title: '文件格式错误',
        content: '只能上传png,jpg,jpeg,gif文件！'
      })
    },
    // 文件大小验证
    uploadSizeError () {
      this.$Modal.warning({
        title: '文件太大',
        content: '上传文件不能大于10MB！'
      })
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.picInput {
  width: calc(100% - 82px);
}
.picUpload {
  float: right;
}
</style>