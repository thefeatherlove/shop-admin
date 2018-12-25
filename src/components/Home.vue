<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>后台管理系统</h1>
      </div>
      <div class="logout">
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // 弹出确认框
      this.$confirm('您确定要退出吗', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功',
          duration: 1000
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 1000
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.home{
  height: 100%;
  .el-header{
    background-color: #B3C1CD;
    display: flex;
    .logo{
      width: 180px;
      background-image: url('~@/assets/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .title{
      flex: 1;
      line-height: 60px;
      color: #fff;
      text-align: center;
      h1{
       font-size: 30px;
      }
    }
    .logout{
      width: 180px;
      font-weight: 700;
      text-align: right;
      line-height: 60px;
      a{
        text-decoration: none;
        color: darkseagreen;
      }
    }
  }
  .el-aside{
    background-color: #545C64;
  }
  .el-main{
    background-color: #D4DFE4;
  }

}
</style>
