<template>
  <section>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="品牌名称" prop="brand_name">
        <el-input v-model="ruleForm.brand_name"></el-input>
      </el-form-item>
      <el-form-item label="品牌介绍" prop="brand_titile">
        <el-input v-model="ruleForm.brand_titile"></el-input>
      </el-form-item>
      <el-form-item label="品牌折扣" prop="brand_rebate">
        <el-input v-model="ruleForm.brand_rebate"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="goods_img">
        <el-upload class="upload-demo" action="http://localhost:9090/uploadqiniu" :before-upload="beforeUpload" :limit="1" multiple :on-success="handSuccess" :on-exceed="handleExceed" :before-remove="beforeRemove" :file-list="fileList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否上线">

        <el-radio v-model="ruleForm.status" label="1">上线</el-radio>
        <el-radio v-model="ruleForm.status" label="2">下线</el-radio>

      </el-form-item>

      {{ruleForm}}

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
      /*fileList: [
        {
          name: "",
          url: ""
        }
      ],*/
      filename: "",

      fileList: [],
      ruleForm: {
        brand_name: "",
        brand_title: "",
        brand_rebate: "",
        goods_img: "",
        status: "1"
      },
      rules: {
        brand_name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        brand_title: [
          { required: true, message: "请输入品牌介绍", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        brand_rebate: [
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
          alert("submit!");
        } else {
          console.log("error submit!!");
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
          this.ruleForm.goods_img = "";
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
      this.ruleForm.goods_img = response.id;
      this.filename = response.name;
    }
  }
};
</script>