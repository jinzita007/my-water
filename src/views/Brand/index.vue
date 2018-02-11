<template>

  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.brandName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getGoodsBrand">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--商品品牌列表-->
    <el-table :data="goodsBrandList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>

      <el-table-column prop="brandName" label="品牌名称" width="130" sortable></el-table-column>
      <el-table-column prop="brandTitile" label="品牌介绍" width="120" sortable></el-table-column>
      <el-table-column label="品牌图片" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.img[0].url" width="40" height="40" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="活动状态" width="120" sortable>
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
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑商品品牌界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="editForm.brandName"></el-input>
        </el-form-item>
        <el-form-item label="品牌介绍" prop="brandTitile">
          <el-input v-model="editForm.brandTitile"></el-input>
        </el-form-item>
        <el-form-item label="品牌折扣" prop="brandRebate">
          <el-input v-model="editForm.brandRebate"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="brandImg">
          <el-upload class="avatar-uploader" action="string" accept="*/*" multiple :http-request="uploadImg" :show-file-list="false" :before-upload="beforeUpload">
            <img v-if="editForm.url" :src="editForm.url" class="avatar">
            <img v-show="Imgshow" v-if="editForm.img" :src="editForm.img[0].url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>

        <el-form-item label="是否上线" prop="status">
          <el-radio v-model="editForm.status" :label="1">上线</el-radio>
          <el-radio v-model="editForm.status" :label="2">下线</el-radio>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit()" :loading="editLoading">提交</el-button>
      </div>

    </el-dialog>

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
      goodsBrandList: [],
      ImgList: [],
      loading: false,
      filters: {
        brandName: ""
      },
      fileList: [],
      total: 0,
      page: 1,
      pagesize: 4,
      //编辑界面是否显示
      editFormVisible: false,
      editLoading: false,
      //编辑界面数据
      editForm: {
        brandName: "",
        brandTitile: "",
        brandRebate: "",
        brandImg: "",
        status: "",
        sort: "0"
      },
      Imgshow: true,
      rules: {
        brandName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        brandTitile: [
          { required: true, message: "请输入品牌介绍", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        brandRebate: [
          { required: true, message: "请输入品牌折扣", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getGoodsBrand();
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
      this.getGoodsBrand();
    },
    //获取商品品牌列表数据
    getGoodsBrand() {
      this.$http
        .get("http://localhost:9090/brand", {
          params: {
            q: this.filters.brandName,
            pageNo: this.page,
            pageSize: this.pagesize
          }
        })
        .then(res => {
          this.goodsBrandList = res.data.data;
          this.loading = false;
          this.total = res.data.total;
          var array = res.data.data;
          let data = [];

          if (array) {
            for (let i = 0; i < array.length; i++) {
              array[i].img.forEach(item => {
                data.push({
                  name: item.name,
                  url: item.url
                });
              });
            }
          }
          this.ImgList = data;
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新增商品品牌--进入新增页面
    handleAdd() {
      this.$router.push(`brand/add`);
    },

    //显示编辑界面
    handleEdit(index, row) {
      this.Imgshow = true;
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //提交更新
    editSubmit() {
      
      //上传时覆盖图片
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //this.$confirm("确认删除该记录吗？", "提示",{})
          //.then(() => {
          this.editLoading = true;
          /*var params = new URLSearchParams();
            params.append('brandName', this.editForm.brandName);
            params.append('brandTitile', this.editForm.brandTitile);
            params.append('brandRebate', this.editForm.brandRebate);
            params.append('brandImg', this.editForm.brandImg);
            params.append('status', this.editForm.status);
            params.append('sort', this.editForm.sort);*/
          let params = Object.assign({}, this.editForm);
          let id = this.editForm.brandId;
          this.$http
            .put("http://localhost:9090/brand/" + id, params)
            .then(res => {
              this.editLoading = false;
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getGoodsBrand();
            });
          // })
        }
      });
    },
    // 自定义文件上传的方式
    uploadImg(item) {
      
      let filename = this.editForm.img[0].name;
      console.log(filename);
      //删除七牛云图片
      this.$http
        .delete("http://localhost:9090/deleteById?name=" + filename)
        .then(res => {
          this.ruleForm.brandImg = "";
          console.log(res.data);
          // return this.$confirm(`确定移除 ${file.name}？`);
        })
        .catch(err => {
          console.log(err);
        });
        
      let params = new FormData();
      params.append("file", item.file);
      this.$http
        .post("http://localhost:9090/uploadqiniu", params)
        .then(res => {
          this.$message.success("上传成功");
          //this.editForm.img = res.data
          //this.editForm.brandId = res.data.brandId
          console.log(res.data);
          this.editForm.brandImg = res.data.id;
          this.Imgshow = false;
          this.editForm.url = res.data.url;
        })
        .catch(err => {
          this.$message.error("上传失败，请重新上传");
        });
    },
    beforeUpload(file) {},

    //删除商品品牌
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          let filename = row.img[0].name;
          console.log(filename);
          //删除七牛云图片
          this.$http
            .delete("http://localhost:9090/deleteById?name=" + filename)
            .then(res => {
              this.ruleForm.brandImg = "";
              console.log(res.data);
              // return this.$confirm(`确定移除 ${file.name}？`);
            })
            .catch(err => {
              console.log(err);
            });

          this.$http
            .delete("http://localhost:9090/brand/" + row.brandId)
            .then(res => {
              this.loading = false;
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getGoodsBrand();
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
