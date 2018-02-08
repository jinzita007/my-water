<template>

  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.brandName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUser">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--用户列表-->
    <el-table :data="userList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      
      <el-table-column prop="brandName" label="品牌名称" width="130" sortable></el-table-column>
      <el-table-column prop="brandTitile" label="品牌介绍" width="120" sortable></el-table-column>
      <el-table-column label="品牌图片" width="100">
      <template slot-scope="scope">
                    <img :src="scope.row.brandImg" width="40" height="40" class="head_pic"/>
      </template>
      </el-table-column>
      <el-table-column prop="上线/下线" label="活动状态" width="120" sortable>
        <template slot-scope="scope">
          <el-tag size="medium" type="success" v-if="scope.row.status === 1">
            上线
          </el-tag>
          <el-tag size="medium" v-else type="danger">
            下线
          </el-tag>
        </template>
      </el-table-column>
    
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger">批量删除</el-button>
      <!-- 分页 -->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>



  </section>

</template>

<script>
export default {
  data() {
    return {
      userList: [],
      loading: false,
      filters: {
        brandName: ""
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
        .get("http://localhost:9090/brand", {
          params: {
            q: this.filters.brandName,
            pageNo: this.page,
            pageSize: this.pagesize
          }
        })
        .then(res => {
          this.userList = res.data.data;
          this.loading = false;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新增商品品牌
    handleAdd() {

    },

    //删除商品品牌
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          let params = { id: row.id };
          this.$http
            .delete("http://localhost:9090/user", {
              params
            })
            .then(res => {
              this.loading = false;
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getUser();
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>