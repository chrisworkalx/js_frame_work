<!--
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-12-19 17:07:36
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2022-12-19 17:33:25
 * @FilePath     : \\vue-draggable\\src\\views\\Form.vue
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <div style="max-width: 400px; margin: 200px auto">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="子表单" prop="subProp">
          <sub-form ref="childForm" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SubForm from '../components/SubForm.vue';

export default {
  name: 'f-orm',
  components: {
    SubForm
  },
  data() {
    return {
      title: 'Element-form测试',
      ruleForm: {
        name: '',
        subProp: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        subProp: { required: true, message: '请输入', trigger: 'blur' }
      }
    };
  },
  methods: {
    async submitForm(formName) {
      // await this.$refs.childForm.resetForm();
      this.$refs.childForm.clearValidate();
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-alert
          alert('submit!');
        } else {
          console.log('error submit!!');
          this.$refs.childForm.clearValidate();

          this.$refs.childForm.resetForm();
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped></style>
