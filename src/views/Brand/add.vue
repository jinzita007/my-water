<template>
  <section>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="品牌名称" prop="brandName">
        <el-input v-model="ruleForm.brandName"></el-input>
      </el-form-item>
      <el-form-item label="品牌介绍" prop="brandTitile">
        <el-input v-model="ruleForm.brandTitile"></el-input>
      </el-form-item>
      <el-form-item label="品牌折扣" prop="brandRebate">
        <el-input v-model="ruleForm.brandRebate"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="brandImg">
        <el-upload class="upload-demo" action="http://localhost:9090/uploadqiniu" :before-upload="beforeUpload" :limit="1" multiple :on-success="handSuccess" :on-exceed="handleExceed" :before-remove="beforeRemove" :file-list="fileList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否上线">
        <el-radio v-model="ruleForm.status" label="1">上线</el-radio>
        <el-radio v-model="ruleForm.status" label="2">下线</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filename: "",
      fileList: [],
      ruleForm: {
        brandName: "",
        brandTitile: "",
        brandRebate: "",
        brandImg: "",
        status: "1",
        sort:"0"
      },
      rules: {
        brandName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        brandTitile: [
          { required: true, message: "请输入品牌介绍", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        brandRebate: [
          { required: true, message: "请输入品牌折扣", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append('brandName',this.ruleForm.brandName);
          params.append('brandTitile',this.ruleForm.brandTitile);
          params.append('brandRebate',this.ruleForm.brandRebate);
          params.append('brandImg',this.ruleForm.brandImg);
          params.append('status',this.ruleForm.status,);
          params.append('sort',this.ruleForm.sort);

          this.$http.post("http://localhost:9090/brand",params)
          .then(res => {
            this.addLoading = false;
                this.$message({
                  message: "提交成功！",
                  type: "success"
                });
                //提交成功之后跳转到品牌列表页
                this.$router.push(`/brand`);
          })

        } else {
          console.log("提交失败!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeUpload(file) {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(res, file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      this.$http
        .delete("http://localhost:9090/deleteById?name="+this.filename)
        .then(res => {
          this.ruleForm.brandImg = "";
          console.log(res.data);
         // return this.$confirm(`确定移除 ${file.name}？`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handSuccess(response, file, fileList) {
      //console.log(response)
      console.log("上传图片成功的回调>>>" + JSON.stringify(response));
      this.ruleForm.brandImg = response.id;
      this.filename = response.name;
    }
  }
};
</script>