<template>
  <div data-messagelist-box>
    <TopBar :showBack="false" :title="title" :addFlag="true" @addClick="addClick"></TopBar>
    <div class="form" v-if="ifShow">
      <div v-for="item in messageList" :key="item.messageId" class="message_each_div">
        <div class="message_each_top"><span class="user_name_span">{{item.name}}</span><span>{{item.messageInfo}}</span></div>
        <div class="message_each_bottom"><div v-if="false" class="timeclass">{{item.createdAt}}</div><div @click="showBackInput(item)">评论</div></div>
        <div class="back_div" v-show="item.backList&&item.backList.length>0">
          <div class="back_each_div" v-for="(backItem,backIndex) in item.backList" :key="backIndex">
            <div v-if="backItem.isAdd">
              <span>{{backItem.userName}}:</span>
              <el-input v-model="backAddInfo" style="width: 70%;" size="mini"></el-input>
              <el-button type="primary" size="mini" @click="submit(backItem,item)">提交</el-button>
            </div>
            <div v-else>
              <span>{{backItem.name}}:</span>
              <span>{{backItem.backInfo}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from '@/views/common/TopBar.vue'
export default {
  components:{
    TopBar
  },
  name: 'messageList',
  data () {
  	return{
      messageList:[],
      title:'论坛',
      ifShow:false,
      backAddInfo:''
    }
  },
  created: function() {
    this.initList()
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))}
  },
  methods:{
    initList: function() {
      var self = this;
      self.request("api/message/findAll",{
        "method":"GET",
        "success": function(res){
          self.messageList = res.data;
          if(res.data&&res.data.length>0) {
            self.messageList = res.data;
            self.messageList.forEach((item,index)=>{
              self.request("api/backInfo/find?messageId="+item.id,{
                "method":"GET",
                "success": function(res){
                  item.backList=res.data;
                  if(index==self.messageList.length-1){
                    self.$nextTick(()=>{
                      self.ifShow = true;
                    })
                  }
                  // item.backList=[{backInfo:'123',isAdd:true,userName:self.sessionInfo.name}]
                }
              })
            })
          }
        }
      });
    },
    addClick(title){
      var self = this;
      if(self.title==title){
        self.jump("/main/messageCreate")
      }

    },
    showBackInput(item){
      this.ifShow = false;
      if(item.backList){
        if(item.backList.length==0||item.backList[item.backList.length-1].id){
          item.backList.push({backInfo:'',isAdd:true,userName:this.sessionInfo.name})
        }
      }
      this.ifShow=true;
    },
    submit(backItem,item){
      var self = this;
      self.ifShow=false;
      if(self.backAddInfo.trim()!=''){
        let data = {
          messageId:item.id,
          backInfo:self.backAddInfo,
          userId:self.sessionInfo.id
        }
        self.request("api/back/create",{
          "method":"POST",
          "data":data,
          "success": function(res){
            self.$nextTick(()=>{
              self.initList();
            })
          }
        })
      }
    }
  }
}
</script>
<style type="text/css">
/*div[data-messagelist-box]{
  .ivu-list-item-meta-title{
    text-align: left;
  }*/
  .form{
    padding-left: 18px;
    padding-right: 18px;
  }
  .ivu-list-item-meta-title{
    text-align: left;
  }
  .message_each_div{
    border-bottom: 1px solid #e8eaec;
    padding-bottom: 10px;
  }
  .message_each_top{
    display: flex;
    text-align: left;
    flex-flow: column;
  }
  .message_each_top .user_name_span{
    font-weight: 700;
    margin-bottom: 4px;
    color: #515a6e;
    font-size: 14px;
    line-height: 22px;
  }
  .message_each_bottom{
    text-align: right;
    /*display: flex;
    justify-content: space-between;*/
  }
  .timeclass{
        color: #c3b4b4;
  }
  .message_each_div .back_div{
    width: 80%;
    margin: auto;
    text-align: left;
    background-color: #d6d0d0;
    padding: 2px 6px;
  }
  .message_each_div .back_div .back_each_div{
    border-bottom: 1px solid #e8eaec;
    padding: 1px;
  }
  .message_each_div .back_div .back_each_div:last-child{
    border-bottom: 0;
  }
  .message_each_div .back_div .back_each_div span{
    color: #696565;
  }
  .message_each_div .back_div .back_each_div .user_name_span{
    color: #080808;
  }
/*}*/

</style>