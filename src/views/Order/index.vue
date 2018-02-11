<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUser">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">新增</el-button>
        </el-form-item>

      </el-form>
    </el-col>
    <!--用户列表-->
    <template>
      <el-table :data="userList" highlight-current-row v-loading="loading" style="width: 100%;">

        <el-table-column type="index" width="60"></el-table-column>

        <el-table-column prop="username" label="用户名" width="130" sortable></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120" sortable></el-table-column>
        <el-table-column prop="email" label="电子邮箱" min-width="180" sortable></el-table-column>
        <el-table-column prop="enabled" label="活动状态" width="120" sortable>
          <template slot-scope="scope">
            <el-tag size="medium" type="success" v-if="scope.row.enabled === true">
              启动
            </el-tag>
            <el-tag size="medium" v-else type="danger">
              禁用
            </el-tag>

          </template>

        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
      </el-pagination>
    </template>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      loading: false,
      filters: {
        nickname: ""
      },
      total: 0,
      page: 1,
      pagesize: 4
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //获取分页
    handleCurrentChange(val) {
      this.page = val;
      this.getUser();
    },
    //获取用户列表数据
    getUser() {
      this.$http
        .get("http://localhost:9090/alll", {
          params: {
            //nickname: this.filters.nickname,
            pageNo: this.page,
            pageSize: this.pagesize
          }
        })
        .then(res => {
          this.userList = res.data.Users;
          this.loading = false;
          this.total = res.data.totalCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //显示编辑界面
    handleEdit() {},
    //删除用户
    handleDel() {}
  }
};
</script>