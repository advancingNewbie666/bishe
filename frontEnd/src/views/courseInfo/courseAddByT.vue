<template>
    <div data-courseaddbyt-box>
        <TopBar :title="title"></TopBar>
        <Form ref="formItem" :model="formItem" :label-width="80" :rules="rules">
            <FormItem label="课程名称" prop="scheduleName">
                <Input v-model="formItem.scheduleName" placeholder="请输入课程名称"></Input>
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
        scheduleName:''
      },
      rules:{
        scheduleName:[{required:true,message:'请输入课程名称',trigger:'blur'}]
      },
      title:'添加课程'
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
          data.userId = this.sessionInfo.id
          data.scheduleType = 1
          self.request("api/schedule/create",{
            "method":"POST",
            "data": data,
            "success": function(res){
              if(res.data&&res.data.id) {
                self.jump("/main/courseList");
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