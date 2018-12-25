<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-form">
    <img src="../assets/avatar.jpg" alt="">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">登录</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import axios from 'axios'
// console.log(axios)
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 9, message: '长度在3到9个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在6到12个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        // 发送ajax请求
        axios({
          url: 'http://localhost:8888/api/private/v1/login',
          method: 'post',
          data: this.form
        }).then(res => {
          if (res.data.meta.status === 200) {
            // 使用提示信息
            this.$message({
              message: '登录成功了',
              type: 'success',
              duration: 1000
            })
            // 先将token存储起来
            localStorage.setItem('token', res.data.data.token)
            // 登录成功跳转到首页组件
            this.$router.push('/home')
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
  .login{
    height: 100%;
    background-color: #2d434c;
    overflow: hidden;
    .el-form{
      width: 400px;
      margin: 200px auto;
      background-color: #fff;
      padding: 75px 40px 15px;
      border-radius: 20px;
      position: relative;
      img {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -80px;
        border-radius: 50%;
        border: 10px solid #fff;
      }
      .el-button + .el-button {
        margin-left: 70px;
      }
    }
  }
</style>
