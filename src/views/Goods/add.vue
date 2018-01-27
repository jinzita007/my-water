<template>
<section>

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="商品销量" prop="xs">
    <el-input v-model="ruleForm.xs"></el-input>
  </el-form-item>
  <el-form-item label="商品宣传语" prop="title">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>
  <el-form-item label="商品主图" prop="goods_img">
  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="1"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-form-item>

  <el-form-item label="商品多图" prop="goods_img_list">
  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList2"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-form-item>
  <el-form-item label="商品品牌" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择品牌">
      <el-option label="桶装水" value="shanghai"></el-option>
      <el-option label="瓶装水" value="beijing"></el-option>
      <el-option label="饮水机" value="beijing2"></el-option>
      <el-option label="热销" value="beijing3"></el-option>

    </el-select>
  </el-form-item>

  <el-form-item label="商品现价（销售价格）">
    <el-input></el-input>
  </el-form-item>

  <el-form-item label="商品原价">
    <el-input></el-input>
  </el-form-item>

  <el-form-item label="商品折扣">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

  <el-form-item label="水票价格">
    <el-input></el-input>
  </el-form-item>

  <el-form-item label="是否作为积分商品">
    <el-radio-group>
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  
  <el-form-item label="兑换所需积分">
    <el-input></el-input>
  </el-form-item>

  <el-form-item label="兑换所需等级">
    <el-select placeholder="请选择品牌">
      <el-option label="水滴" value="shanghai"></el-option>
      <el-option label="水湾" value="beijing"></el-option>
      <el-option label="水库" value="beijing2"></el-option>
    </el-select>
  </el-form-item>
  
  <!--<el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>-->

  <el-form-item label="商品类型" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="商品"></el-radio>
      <el-radio label="赠品"></el-radio>
      <el-radio label="公益活动"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="商品是否可以作为水票" prop="resources">
    <el-radio-group v-model="ruleForm.resources">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="是否创建其附属赠票" prop="resourcess">
    <el-radio-group v-model="ruleForm.resourcess">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="是否有水桶押金" prop="resourcesss">
    <el-radio-group v-model="ruleForm.resourcesss">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  <!--<el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>-->
  <el-form-item label="商品描述" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
        fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      ],
        fileList2: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
          ],
        ruleForm: {
          name: '',
          xs:'',
          title: '',
          region: '',
          delivery: false,
          resource: '',
          resources: '',
          resourcess: '',
          resourcesss: '',
          desc: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择商品品牌', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择商品类型', trigger: 'change' }
          ],
          resources: [
            { required: true, message: '请选择商品是否可以作为水票', trigger: 'change' }
          ],
          resourcess: [
            { required: true, message: '请选择是否创建其附属赠票', trigger: 'change' }
          ],
          resourcesss: [
            { required: true, message: '请选择是否有水桶押金', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>