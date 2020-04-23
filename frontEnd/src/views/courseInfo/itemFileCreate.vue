<template>
    <div data-itemcreate-box>
        <TopBar :title="title"></TopBar>
        <Form ref="formItem" :model="formItem" :label-width="80" :rules="rules">
            <FormItem label="资料名称" prop="fileName">
                <Input v-model="formItem.fileName" placeholder="请输入资料名称"></Input>
            </FormItem>
                <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">
                    <div class="add-file-right-img" style="margin-left:70px;">上传文件：</div>
                    <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" style="margin-left:70px;" accept=".pdf">
                    <span class="add-file-right-more">支持扩展名：.doc .docx .pdf </span>
                </div>
                <div class="add-file-list">
                    <ul>
                        <li v-for="(item, index) in addArr" :key="index"><a >{{item.name}}</a></li>
                    </ul>
                </div>
                <div>
                    <el-button type="primary" @click="submitAddFile" size="small">开始上传</el-button>
                    <!-- <el-button @click="resetAdd" size="small">全部删除</el-button> -->
               </div>
            <!-- <FormItem label="资料url" prop="fileUrl"> -->
<!--               <el-upload
                class="upload-demo"
                action="/api/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传pdf/avi文件</div>
              </el-upload> -->
            <!-- </FormItem> -->
            <!-- <FormItem>
                <Button type="primary" @click="submit()">提交</Button>
            </FormItem> -->
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
        // fileUrl:[{required:true,message:'请输入资料url',trigger:'blur'}],
        fileName:[{required:true,message:'请输入资料名称',trigger:'blur'}]
      },
      fileList:[],
      title:'添加学习资源',
      addFileName:'',
      addArr:[],
      filePath:''
    }
  },
  created: function() {
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))},
    scheduleItemId(){return localStorage.getItem('scheduleItemId')},
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
                self.$nextTick(()=>{
                  self.jump("/main/itemFileInfo");
                })
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
    },
    getFile(event){
           var file = event.target.files;
           for(var i = 0;i<file.length;i++){
            //    上传类型判断
               var imgName = file[i].name;
                var idx = imgName.lastIndexOf(".");  
                if (idx != -1){
                    var ext = imgName.substr(idx+1).toUpperCase();   
                    ext = ext.toLowerCase( ); 
                     if (ext!='pdf'){
                       
                    }else{
                          this.addArr=[file[i]];
                    }   
                }else{

                }
           }
       },
        submitAddFile(){
          var self = this
           if(0 == self.addArr.length){
             self.$message({
               type: 'info',
               message: '请选择要上传的文件'
             });
             return;
           }

            var formData = new FormData();
            for(var i=0;i<self.addArr.length;i++){
                formData.set('imgUploader',self.addArr[i]);
            }
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'Authorization': this.token
            }
          };
          self.$refs['formItem'].validate((valid)=>{
            if(valid){
              self.request("api/upload",{
                "method":"POST",
                "data": formData,
                "success": function(res){
                  if(res.data&&res.data.code=='0000') {
                    debugger
                    self.filePath=res.data.name
                    let inputData = {
                      scheduleItemId:self.scheduleItemId,
                      fileUrl:self.filePath,
                      fileName:self.formItem.fileName
                    }
                    self.request("api/file/create",{
                      "method":"POST",
                      "data": inputData,
                      "success": function(res){
                        self.$nextTick(()=>{
                          self.jump("/main/itemFileInfo");
                        })
                      }
                      })
                  } else {
                    alert("Fail");
                  }
                }
              });
            }
            })

        }
  }
}
</script>
<style>

</style>