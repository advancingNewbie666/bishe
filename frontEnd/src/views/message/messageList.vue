<template>
  <div data-messagelist-box>
    <TopBar :title="title" :addFlag="true" @addClick="addClick"></TopBar>
    <div class="form">
      <div v-for="item in messageList" :key="item.messageId" class="message_each_div">
        <div class="message_each_top"><span class="user_name_span">{{item.userName}}</span><span>{{item.messageInfo}}</span></div>
        <div class="message_each_bottom"><span @click="showBackInput(item)">评论</span></div>
        <div class="back_div" v-if="item.backList&&item.backList.length>0">
          <div class="back_each_div" v-for="backItem in item.backList" :key="item.backId">
            <div v-if="backItem.isAdd">
              <span>{{backItem.userName}}:</span>
              <el-input v-model="backItem.backInfo" style="width: 70%;" size="mini"></el-input>
              <el-button type="primary" size="mini" @click="submit(backItem,item)">提交</el-button>
            </div>
            <div v-else>
              <span>{{backItem.userName}}:</span>
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
      messageList:[{
        messageId:1,
        userId:1,
        userName:'肖战',
        messageInfo:'我今天想早点睡觉',
        backList:[{
          backId:1,
          userId:2,
          userName:'王一博',
          backInfo:'我允许了',
        },{
          backId:2,
          userId:3,
          userName:'孟美岐',
          backInfo:'累了吗',
        }]
      },{
        messageId:2,
        userId:2,
        userName:'王一博',
        messageInfo:'不想说话',
      },{
        messageId:3,
        userId:4,
        userName:'大美女',
        messageInfo:'呼哈哈哈哈啊哈哈哈哈',
      }],
      title:'论坛'
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
            self.messageList.forEach((item)=>{
              self.request("api/back/find?messageId="+item.id,{
                "method":"GET",
                "success": function(res){
                  item.backList=res.data;
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
      if(item.backList){
        if(item.backList.length==0||item.backList[item.backList.length-1].backId){
          item.backList.push({backInfo:'',isAdd:true,userName:this.sessionInfo.name})
        }
      }
    },
    submit(backItem,item){
      var self = this;
      if(backItem.backInfo.trim()!=''){
        let data = {
          messageId:item.id,
          backInfo:backItem.backInfo,
          userId:this.sessionInfo.id
        }
        self.request("api/back/create",{
          "method":"POST",
          "data":data,
          "success": function(res){
            item.backList[item.backList.length-1]=res.data;
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