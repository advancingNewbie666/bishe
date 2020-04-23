<template>
  <div>
    <TopBar :title="title" :addFlag="addFlag" @addClick="addClick"></TopBar>
    <div class="form">
      <List>
        <ListItem v-for="item in courseList" :key="item.id">
            <ListItemMeta :title="item.scheduleItemName" />
            <template slot="action">
                <li>
                    <div @click="detailInfo(item)">详情</div>
                </li>
                <li v-if="!addFlag">
                    <div @click="testInfo(item)">考试</div>
                </li>
                <li v-if="addFlag">
                    <div @click="testInfo(item)">学生考试历史</div>
                </li>
                <li v-if="addFlag">
                    <div @click="createTest(item)">出题</div>
                </li>
                <!-- <li v-if="addFlag">
                    <div @click="deleteInfo(item)">删除</div>
                </li> -->
            </template>
        </ListItem>
      </List>
    </div>
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
      courseList:[],
      title:'章节信息'
    }
  },
  created: function() {
    this.initList();
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))},
    scheduleId(){return localStorage.getItem('scheduleId')},
    addFlag(){return this.sessionInfo.roleId==1? true:false}
  },
  methods:{
    initList: function() {
      var self = this;
      let data = "?scheduleId="+this.scheduleId+"&scheduleType=2"
      self.request("api/schedule/find"+data,{
        "method":"GET",
        "success": function(res){
          if(res.data&&res.data.length>0) {
            self.courseList=res.data
          } else {
            self.courseList=[]
          }
        }
      });
    },
    addClick(title){
      var self = this;
      if(self.title == title){
        if(self.sessionInfo.roleId==1){
          self.jump("/main/courseItemCreate");
        }else{
          // self.jump("/main/courseAddByS");
        }
      }
    },
    detailInfo(item){
      localStorage.setItem('scheduleItemId',item.id)
      this.jump("/main/itemFileInfo")
    },
    testInfo(item){
      localStorage.setItem('scheduleItemId',item.id)
      localStorage.setItem('testType',2) // 1新建试题    2答题   3答题记录
      if(this.sessionInfo.roleId==1){
        this.jump("/main/testInfo")
      }else{
        this.jump("/main/testAnswer")
      }
    },
    createTest(item){
      localStorage.setItem('scheduleItemId',item.id)
      localStorage.setItem('testType',1) // 1新建试题    2答题   3答题记录
      this.jump("/main/testAnswer");
    },
    deleteInfo(item){
      var self = this;
      let data = {
        id:item.id
      }
      self.request("api/schedule/delete",{
        "method":"DELETE",
        "data":data,
        "success": function(res){
          // if(res.data.code='0000') {
            self.initList();
          // }
        }
      });
    }
  }
}
</script>
<style>

</style>