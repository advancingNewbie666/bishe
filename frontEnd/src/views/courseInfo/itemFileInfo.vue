<template>
  <div>
    <TopBar :title="title" :addFlag="addFlag" @addClick="addClick"></TopBar>
    <div class="form">
      <List>
        <ListItem v-for="item in fileList" :key="item.id">
            <ListItemMeta :title="item.fileName" />
            <template slot="action" v-if="addFlag">
                <li>
                    <a href="#" @click="deleteInfo(item)">删除</a>
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
      fileList:[],
      title:'学习资料'
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
      let data = "?scheduleItemId="+this.scheduleItemId
      self.request("api/file/find"+data,{
        "method":"GET",
        "success": function(res){
          if(res.data&&res.data.length>0) {
            self.fileList=res.data
          } else {
            self.fileList=[]
          }
        }
      });
    },
    addClick(title){
      var self = this;
      if(self.title == title){
        if(self.sessionInfo.roleId==1){
          self.jump("/main/itemFileCreate");
        }else{
          // self.jump("/main/courseAddByS");
        }
      }
    },
    deleteInfo(item){
      var self = this;
      let data = {
        id:item.id,
      }
      self.request("api/file/delete",{
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
<style scoped>
.form{width: 500px;margin: 0 auto;}
.title{text-align: center;}
</style>