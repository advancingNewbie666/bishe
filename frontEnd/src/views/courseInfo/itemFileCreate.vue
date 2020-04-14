<template>
    <div data-itemcreate-box>
        <TopBar :title="title"></TopBar>
        <Form ref="formItem" :model="formItem" :label-width="80" :rules="rules">
            <FormItem label="资料名称" prop="fileName">
                <Input v-model="formItem.fileName" placeholder="请输入资料名称"></Input>
            </FormItem>
            <FormItem label="资料url" prop="fileUrl">
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
                <div slot="tip" class="el-upload__tip">只能上传pdf/avi文件</div>
              </el-upload>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit()">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import TopBar from '@/views/common/TopBar.vue'
export default {
  components:{
    TopBar
  },
  name: 'signin',
  data () {
    return{
      formItem:{
        fileName:'',
        fileUrl:""
      },
      formatList:['jpg','jpeg','png'],
      rules:{
        fileUrl:[{required:true,message:'请输入资料url',trigger:'blur'}],
        fileName:[{required:true,message:'请输入资料名称',trigger:'blur'}]
      },
      fileList:[],
      title:'添加学习资源'
    }
  },
  created: function() {
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))}
  },
  methods:{
    submit: function() {
      var self = this;
      self.$refs['formItem'].validate((valid)=>{
        if(valid){
          let data = this.formItem
          data.scheduleItemId = localStorage.getItem('scheduleItemId')
          self.request("api/file/create",{
            "method":"POST",
            "data": data,
            "success": function(res){
              if(res.data&&res.data.id) {
                self.jump("/main/itemFileInfo");
              } else {
                alert("Fail");
              }
            }
          });
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
<style>

</style>