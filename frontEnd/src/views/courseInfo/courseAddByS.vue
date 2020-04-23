<template>
  <div>
    <TopBar :title="title" :addFlag="addFlag" @addClick="addClick"></TopBar>
    <div class="form">
      <List>
        <ListItem v-for="item in courseList" :key="item.id">
            <ListItemMeta :title="item.scheduleName" />
            <template slot="action">
                <li>
                  <div @click="detailInfo(item)">加入</div>
                </li>
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
      title:'课程选择页面'
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
      let name = ""
      // +"&queryName="+name
      self.request("api/schedule/findByName?userId="+self.sessionInfo.id,{
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
      var self = this;
      let data = {
        scheduleId: item.id,
        userId:self.sessionInfo.id
      }
      self.request("api/schedule/joinSchedule",{
        "method":"POST",
        "data":data,
        "success": function(res){
          self.jump("/main/courseList")
        }
      });
    },

  }
}
</script>
<style>

</style>