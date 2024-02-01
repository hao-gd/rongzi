<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
      label-position="top">
      <el-row type="flex" justify="center" align="middle" gutter="15">
        <el-col :span="8">
          <el-form-item label="红人编号" prop="field101">
            <el-input v-model="formData.field101" placeholder="请输入红人编号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="站点" prop="field104">
            <el-select v-model="formData.field104" placeholder="请选择站点" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field104Options" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" gutter="15">
        <el-col :span="8">
          <el-form-item label="红人姓名" prop="field110">
            <el-input v-model="formData.field110" placeholder="请输入红人姓名" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="红人性别" prop="field113">
            <el-select v-model="formData.field113" placeholder="请选择红人性别" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field113Options" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" gutter="15">
        <el-col :span="8">
          <el-form-item label="业务线" prop="field108">
            <el-select v-model="formData.field108" placeholder="请选择业务线" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field108Options" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Profile Link" prop="field121">
            <el-input v-model="formData.field121" placeholder="请选择Profile Link" clearable
              :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" gutter="15">
        <el-col :span="8">
          <el-form-item label="头像" prop="field118" required>
            <el-upload ref="field118" :file-list="field118fileList" :action="field118Action"
              :before-upload="field118BeforeUpload">
              <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Banner" prop="field119">
            <el-upload ref="field119" :file-list="field119fileList" :action="field119Action"
              :before-upload="field119BeforeUpload">
              <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" gutter="15">
        <el-col :span="8">
          <el-form-item label-width="200px" label="Amazon influencer 报价" prop="field125">
            <el-input v-model="formData.field125" placeholder="请输入Amazon influencer 报价" clearable
              :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 版权佣金" prop="field129">
            <el-input v-model="formData.field129" placeholder="请输入 版权佣金" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="150px" label="Amazon Video 佣金" prop="field126">
            <el-input v-model="formData.field126" placeholder="请输入Amazon Video 佣金" clearable
              :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Add",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: undefined,
        field104: undefined,
        field110: undefined,
        field113: 1,
        field108: undefined,
        field121: undefined,
        field118: null,
        field119: null,
        field125: undefined,
        field129: undefined,
        field126: undefined,
      },
      rules: {
        field101: [],
        field104: [{
          required: true,
          message: '请选择站点',
          trigger: 'change'
        }],
        field110: [{
          required: true,
          message: '请输入红人姓名',
          trigger: 'blur'
        }],
        field113: [{
          required: true,
          message: '请选择红人性别',
          trigger: 'change'
        }],
        field108: [{
          required: true,
          message: '请选择业务线',
          trigger: 'change'
        }],
        field121: [],
        field125: [{
          required: true,
          message: '请输入Amazon influencer 报价',
          trigger: 'blur'
        }],
        field129: [],
        field126: [],
      },
      field118Action: 'https://jsonplaceholder.typicode.com/posts/',
      field118fileList: [],
      field119Action: 'https://jsonplaceholder.typicode.com/posts/',
      field119fileList: [],
      field104Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field113Options: [{
        "label": "男",
        "value": 1
      }, {
        "label": "女",
        "value": 2
      }],
      field108Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    field118BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
    field119BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
