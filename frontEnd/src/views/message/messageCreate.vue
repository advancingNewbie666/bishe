<template>
    <div data-messagecreate-box>
        <TopBar :title="title"></TopBar>
        <Form ref="formItem" :model="formItem" :label-width="80" :rules="rules">
            <FormItem label="发帖内容" prop="messageInfo">
                <Input type="textarea" v-model="formItem.messageInfo" placeholder="请输入发帖内容"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit()">发布</Button>
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
        messageInfo:''
      },
      rules:{
        messageInfo:[{required:true,message:'请输入发帖内容',trigger:'blur'}]
      },
      title:'发帖内容'
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
          self.request("api/message/create",{
            "method":"POST",
            "data": data,
            "success": function(res){
              if(res.data&&res.data.id) {
                self.jump("/main/messageList");
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