<template>
  <div>
    <TopBar :title="title" @addClick="addClick"></TopBar>
    <div class="form">
      <List>
        <ListItem v-for="item in testList" :key="item.id">
            <ListItemMeta :title="item.name+'--'+item.score+'分'" />
            <template slot="action">
                <li>
                  <div @click="detailInfo(item)">详情</div>
                </li>
            </template>
        </ListItem>
      </List>
    </div>
    <el-dialog></el-dialog>
  </div>
</template>
<script>
import TopBar from '@/views/common/TopBar.vue'
export default {
  components:{
    TopBar
  },
  name: 'testinfo',
  data () {
    return{
      testList:[],
      title:'试卷信息',
      value:""
    }
  },
  created: function() {
    this.initList();
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))},
    scheduleItemId(){return localStorage.getItem('scheduleItemId')},
    addFlag(){return this.sessionInfo.roleId==1? true:false}
  },
  methods:{
    initList: function() {
      var self = this;
      self.request("api/itemAndAnswer/findUserList?scheduleItemId="+this.scheduleItemId,{
        "method":"GET",
        "success": function(res){
          if(res.data&&res.data.length>0) {
            self.testList=res.data
          } else {
            self.testList=[]
          }
        }
      });
    },
    mainClick(title){
      var self = this;
      if(self.title == title){
        if(self.sessionInfo.roleId==1){
          localStorage.setItem('testId',item.id)
          localStorage.setItem('testType',1) // 1新建试题    2答题   3答题记录
          self.jump("/main/testAnswer");
        }else{
          // self.jump("/main/courseAddByS");
        }
      }
    },
    addClick(title){
      var self = this;
      if(self.title == title){
        if(self.sessionInfo.roleId==1){
          self.value=""
          self.$Modal.confirm({
              render: (h) => {
                  return h('Input', {
                      props: {
                          value: self.value,
                          autofocus: true,
                          placeholder: '请输入试卷名称'
                      },
                      on: {
                          input: (val) => {
                              self.value = val;
                          }
                      }
                  })
              },
          onOk: () => {
            let data = {
              scheduleItemId:self.scheduleItemId,
              testName:this.value
            }
            self.request("api/test/create",{
              "method":"POST",
              "data":data,
              "success": function(res){
                item.testList.push(res.data);
              }
            })
          },
          onCancel:() => {

          }})
        }else{
          // self.jump("/main/courseAddByS");
        }
      }

    },
    detailInfo(item){
      var self = this;
      if(self.addFlag){
        if(self.sessionInfo.roleId==1){
          localStorage.setItem('userId',item.userId)
          localStorage.setItem('testType',3) // 1新建试题    2答题   3答题记录
          self.jump("/main/testAnswer");
        }else{
          // self.jump("/main/courseAddByS");
        }
      }
      // if(this.addFlag){
      //   localStorage.setItem('scheduleItemId',item.id)
      //   this.jump("/main/testAnswerHisList")
      // }else{
      //   localStorage.setItem('scheduleItemId',item.id)
      //   localStorage.setItem('testType',3) // 1新建试题    2答题   3答题记录
      //   this.jump("/main/testAnswer")
      // }

    },
    testInfo(item){
      localStorage.setItem('testId',item.id)
      localStorage.setItem('testType',2) // 1新建试题    2答题   3答题记录
      this.jump("/main/testAnswer")
    },
    deleteInfo(item){
      var self = this;
      let data = {
        id:item.id
      }
      self.request("api/test/delete",{
        "method":"DELETE",
        "data":data,
        "success": function(res){
          // if(res.data&&res.data.length>0) {
          //   self.courseList=res.data
          // } else {
          //   self.courseList=[]
          // }
        }
      });
    }
  }
}
</script>
<style>
</style>