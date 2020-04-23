<template>
  <div>
    <TopBar :showBack="false" :title="title" :addFlag="true" @addClick="addClick"></TopBar>
    <div class="form">
      <List>
        <ListItem v-for="item in courseList" :key="item.id">
            <ListItemMeta :title="item.scheduleName" />
            <template slot="action">
                <li>
                    <div @click="detailInfo(item)">详情</div>
                </li>
                <li v-if="sessionInfo.roleId==1">
                    <div @click="deleteInfo(item)">删除</div>
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
      courseList:[{
        scheduleId:1,
        scheduleName:'数学课--大一',
      },{
        scheduleId:2,
        scheduleName:'数学课--大2',
      },{
        scheduleId:3,
        scheduleName:'数学课--大3',
      },{
        scheduleId:4,
        scheduleName:'数学课--大4',
      }],
      title:'我的课程'
    }
  },
  created: function() {
    this.initList();
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))}
  },
  methods:{
    initList: function(paramCode,selectInfo) {
      var self = this;
      if(this.sessionInfo.roleId ==2){
        let data = "?userId="+this.sessionInfo.id+"&scheduleType=1"
        self.request("api/schedule/findByS"+data,{
          "method":"GET",
          "success": function(res){
            if(res.data&&res.data.length>0) {
              self.courseList=res.data
            } else {
              self.courseList=[]
            }
          }
        });
      }else if(this.sessionInfo.roleId ==1){
        let data = "?userId="+this.sessionInfo.id+"&scheduleType=1"
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
      }

    },
    addClick(title){
      var self = this;
      if(self.title == title){
        if(self.sessionInfo.roleId==1){
          self.jump("/main/courseAddByT");
        }else{
          self.jump("/main/courseAddByS");
        }
      }
    },
    detailInfo(item){
      localStorage.setItem('scheduleId',item.id)
      this.jump("/main/courseItemList")
    },
    deleteInfo(item){
      var self = this;
      let data = {
        id:item.id,
        scheduleType:1
      }
      self.request("api/schedule/delete",{
        "method":"DELETE",
        "data":data,
        "success": function(res){
          if(res&&res.data>0){
            self.initList();
          }
        }
      });
    }
  }
}
</script>
<style>

</style>