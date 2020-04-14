<template>
    <div data-itemcreate-box>
        <TopBar :title="title"></TopBar>
        <Form ref="formItem" :model="formItem" :label-width="80" :rules="rules">
            <FormItem label="章节顺序" prop="scheduleSeq">
                <Input type="number" v-model="formItem.scheduleSeq" placeholder="请输入章节顺序"></Input>
            </FormItem>
            <FormItem label="章节名称" prop="scheduleItemName">
                <Input v-model="formItem.scheduleItemName" placeholder="请输入章节名称"></Input>
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
        scheduleItemName:'',
        scheduleSeq:1
      },
      rules:{
        scheduleSeq:[{required:true,message:'章节顺序',trigger:'blur'}],
        scheduleItemName:[{required:true,message:'请输入章节名称',trigger:'blur'}]
      },
      title:'添加章节'
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
          data.scheduleType = 2
          data.scheduleId = localStorage.getItem('scheduleId')
          self.request("api/schedule/create",{
            "method":"POST",
            "data": data,
            "success": function(res){
              if(res.data&&res.data.id) {
                self.jump("/main/courseItemList");
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