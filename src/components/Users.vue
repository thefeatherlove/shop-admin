<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/home'}">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>
    <el-button type="success" plain @click="showAdd">添加用户</el-button>
    <!-- 表格 -->
    <template>
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="180">
          <template slot-scope="scope">
            <el-switch
              @change="changeeState(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              plain
              @click="showEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              plain
              @click="delUser(scope.row.id)"
            ></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" plain round>分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加的弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form></el-form> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      userList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      dialogVisible: false
    }
  },
  methods: {
    // 获取数据渲染页面
    getUserList() {
      // console.log(this.baseURL)
      this.axios({
        method: 'get',
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        // console.log(res)
        let {
          meta: { status },
          data: { users, total }
        } = res
        if (status === 200) {
          this.userList = users
          this.total = total
          // console.log(this.userList, this.total)
        }
      })
    },
    // 每页显示几条
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    // 跳转当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getUserList()
    },
    // 点击搜索
    searchUser() {
      this.currentPage = 1
      this.getUserList()
    },
    // 删除数据
    delUser(id) {
      // console.log(id)
      this.$confirm('您确定要删除吗', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          // console.log(111)
          this.axios({
            method: 'delete',
            url: `users/${id}`
          }).then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
              // 如果当前就剩一条，还渲染当前，就会有问题，当前页没有数据了
              if (this.userList.length <= 1 && this.currentPage > 1) {
                this.currentPage--
              }
              this.getUserList()
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          })
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    // 改变状态
    changeeState(state) {
      // console.log(state)
      this.axios({
        method: 'put',
        url: `users/${state.id}/state/${state.mg_state}`
      }).then(res => {
        if (res.meta.status === 200) {
          this.$message.success('修改成功')
          // 是否需要重新渲染？？？？
          this.getUserList()
        }
      })
    },
    // 显示添加模态框
    showAdd() {
      this.dialogVisible = true
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
}
.el-input {
  width: 400px;
  margin-bottom: 5px;
}
</style>
