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
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--用户列表-->
    <el-table :data="userList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="username" label="用户名" width="130" sortable></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120" sortable></el-table-column>
      <el-table-column prop="email" label="电子邮箱" min-width="180" sortable></el-table-column>
      <el-table-column prop="enabled" label="活动状态" width="120" sortable>
        <template scope="scope">
          <el-tag size="medium" type="success" v-if="scope.row.enabled === true">
            启动
          </el-tag>
          <el-tag size="medium" v-else type="danger">
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

    <!--新增用户界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="userface">
          <el-input v-model="addForm.userface" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" width="120">
          <el-switch v-model="addForm.enabled" :on-value="1" :off-value="0" on-text="启用" off-text="禁用" on-color="#13ce66" off-color="#ff4949">
          </el-switch>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

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
      pagesize: 4,
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入电子邮箱",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ]
      },
      //新增界面数据
      addForm: {
        username: "",
        password: "",
        nickname: "",
        email: "",
        userface: "",
        enabled: ""
      }
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
        .get("http://localhost:9090/alls", {
          params: {
            keywords: this.filters.nickname,
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
    //显示新增用户界面
    handleAdd() {
      this.addFormVisible = true;
      this.addForm = {
        username: "",
        password: "",
        nickname: "",
        email: "",
        userface: "",
        enabled: ""
      };
    },
    //新增的时候提交
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let params = this.addForm
            this.$http
              .post("http://localhost:9090/user", {
                params
              })
              .then(res => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功！",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getUser();
              });
          });
        }
      });
    },
    //显示编辑界面
    handleEdit() {},
    //删除用户
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
              this.loading = false
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getUser();
            });
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
};
</script>