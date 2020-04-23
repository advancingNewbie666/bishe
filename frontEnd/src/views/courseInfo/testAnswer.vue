<template>
    <div data-itemcreate-box>
        <TopBar :title="title" :addFlag="addFlag" @addClick="addClick"></TopBar>
        <div class="test_item_info" v-if="testType==1">
          <div v-for="(item,index) in itemList" :key="item.id">
            <p>
              <span>{{ index+1 }}.</span>
              <el-input v-model="item.itemName" style="width: 70%;" size="mini"></el-input>
            </p>
            <p>
            <el-radio-group v-model="item.answerId">
              <el-radio v-for="(chooseitem,chooseindex) in item.answerList" :key="chooseindex" :label="chooseindex"><el-input v-model="chooseitem.answerName" style="width: 70%;" size="mini"></el-input></el-radio>
            </el-radio-group>
            </p>
          </div>
        </div>
        <div class="test_item_info" v-if="testType==2">
          <div v-for="(item,index) in itemList" :key="item.id">
            <p><span>第{{ index+1 }}题:</span><span>{{ item.itemName }}</span></p>
            <p>
              <el-radio-group v-model="item.answerId">
                <el-radio v-for="(chooseitem,chooseindex) in item.answerList" :key="chooseindex" :label="chooseitem.answerId">
                  <span :class="ifShowTrue&&chooseitem.answerId==item.tureAnswerId ? 'ifShowTrue' : 'noifShowTrue'">{{chooseitem.answerName}}</span>
                </el-radio>
              </el-radio-group>
            </p>
          </div>
        </div>
        <div class="test_item_info" v-if="testType==3&&ifShowHis">
          <div v-for="(item,index) in itemList" :key="item.id">
            <p><span>第{{ index+1 }}题:</span><span>{{ item.itemName }}</span></p>
            <p>
              <el-radio-group v-model="item.answerId">
                <el-radio v-for="(chooseitem,chooseindex) in item.answerList" :key="chooseindex" :label="chooseitem.answerId">
                  <span :class="ifShowTrue&&chooseitem.answerId==item.tureAnswerId ? 'ifShowTrue' : 'noifShowTrue'">{{chooseitem.answerName}}</span>
                </el-radio>
              </el-radio-group>
            </p>
          </div>
        </div>
        <Button v-if="testType!=3&&!ifShowTrue" type="primary" @click="submit()">提交</Button>
    </div>
</template>
<script>
import TopBar from '@/views/common/TopBar.vue'
export default {
  components:{
    TopBar
  },
  name: 'testAnswer',
  data () {
    return{
      itemList:[],
      title:'创建试卷',
      ifShowTrue:false,
      ifShowHis:false
    }
  },
  created: function() {
    this.initTestInfo();
    if(this.testType==2){
      this.title="准备答题"
    }else if(this.testType==3){
      this.title="历史记录"
    }
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))},
    testType(){return localStorage.getItem('testType')}, // 1新建试题    2答题   3答题记录,
    addFlag(){return this.sessionInfo.roleId==1&&this.testType==1? true:false}
  },
  methods:{
    submit: function() {
      var self = this;
      if(self.testType==2){
        self.studentSubmit()
      }else{
        // self.$refs['formItem'].validate((valid)=>{
        //   if(valid){
            let data= {}
            // data.userId = this.sessionInfo.id
            data.testName = "试卷名称"
            data.scheduleItemId = localStorage.getItem('scheduleItemId')
            let itemList = this.itemList
            if(itemList.length>0){
              itemList.map((item,index)=>{
                item.itemName = item.itemName
                let answerList = []
                item.answerList.map((ansitem,ansindex)=>{
                  ansitem.answerSeq = ansindex
                  ansitem.isTrue = item.answerId == ansindex
                })
              })
            }
            data.itemList = itemList;
            self.request("api/schedule/test/create",{
              "method":"POST",
              "data": data,
              "success": function(res){
                alert("Sucess");
              }
            });
        //   }
        // })
      }

    },
    studentSubmit(){
      var self = this;
      let fenshu = 0;
      let totafen = 0;
      let noCount = 0;
      let answerList = []
      self.itemList.map((item,index)=>{
        if(item.answerId){
          item.answerList.map((ansItem,ansindex)=>{
            if(item.answerId == ansItem.answerId){
              // item.answerId=ansItem.answerId
              if(ansItem.isTrue==1){
                fenshu+=10;
              }
              let obj = {
                userId: self.sessionInfo.id,
                testId: item.testId,
                itemId: item.itemId,
                scheduleItemId: localStorage.getItem('scheduleItemId'),
                answerId: item.answerId
              }
              if(index == self.itemList.length-1){
                obj.score = fenshu
              }
              answerList.push(obj)
            }

          })
        }else{
          noCount=noCount+1;
        }
        totafen+=10;
      })
      this.$nextTick(()=>{
        if(noCount>0){
          alert('你还有'+noCount+'题目未答！不能提交！');
          return;
        }else{
          alert('您的得分是'+fenshu+',满分是'+totafen);
        }
        // self.$refs['formItem'].validate((valid)=>{
        //   if(valid){
            let data = {}
            data.itemList = answerList;

            self.request("api/itemAndAnswer/create",{
              "method":"POST",
              "data": data,
              "success": function(res){
                self.jump("/main/courseItemList");
              }
            });
        //   }
        // })
      })


    },
    addClick(title){
      var self = this;
      let answerList = []
      answerList.push({ answerName:'',answerSeq:1 })
      answerList.push({ answerName:'',answerSeq:2 })
      answerList.push({ answerName:'',answerSeq:3 })
      answerList.push({ answerName:'',answerSeq:4 })
      self.itemList.push({ itemName:'',answerList:answerList })
    },
    initTestInfo(){
      let self = this;
      self.ifShowTrue = false;
      self.ifShowHis = false;
      // if(self.testType==2||self.testType==3){
        self.request("api/test/find?scheduleItemId="+localStorage.getItem('scheduleItemId'),{
          "method":"GET",
          "success": function(res){
            if(res.data&&res.data.length>0) {
              
              let testId = res.data[0].id
              self.request("api/itemAndAnswer/find?testId="+testId+"&scheduleItemId="+localStorage.getItem('scheduleItemId'),{
                "method":"GET",
                "success": function(res3){
                  if(res3.data) {
                    self.itemList = res3.data
                    let _itemList = []
                    let itemIdList = []
                    self.itemList.map((itemObj)=>{
                      if(itemIdList.indexOf(itemObj.itemId)==-1){
                        itemIdList.push(itemObj.itemId)
                        let obj = {
                          "testId": itemObj.testId,
                          "itemName": itemObj.itemName,
                          "itemId": itemObj.itemId,
                        }
                        _itemList.push(obj)
                      }
                    })
                    itemIdList.map((answerItem,index)=>{
                      let tureAnswerId = ''
                      let answerList = self.itemList.filter((_todoitem)=>{
                        if(_todoitem.isTrue==1){
                          tureAnswerId = _todoitem.answerId
                        }
                        return answerItem == _todoitem.itemId ;
                      })
                      _itemList[index].answerList = answerList
                      _itemList[index].tureAnswerId = tureAnswerId
                    })
                    self.itemList = _itemList
                    self.ifShowTrue=true;
                    if(self.testType==3){
                      let userId = localStorage.getItem('userId')
                      self.request("api/itemAndAnswer/findHisByUserId?testId="+testId+"&userId="+userId,{
                        "method":"GET",
                        "success": function(res2){
                          if(res2&&res2.data&&res2.data.length>0){
                            self.ifShowTrue = true;
                            res2.data.map((res1item,res1Index)=>{
                              self.itemList.map((selfItem)=>{
                                if(res1item.itemId == selfItem.itemId){
                                  selfItem.answerId = res1item.answerId
                                  if(res1Index == res2.data.length-1){
                                    self.ifShowHis=true;
                                  }
                                }
                              })
                            })
                          }
                        }
                      })
                    }else if(self.testType==2){
                    // 判断考试完成没
                      self.request("api/itemAndAnswer/findHisByUserId?testId="+res.data[0].id+"&userId="+self.sessionInfo.id,{
                        "method":"GET",
                        "success": function(res1){
                          if(res1&&res1.data&&res1.data.length>0){
                            self.ifShowTrue = true;
                            res1.data.map((res1item)=>{
                              self.itemList.map((selfItem)=>{
                                if(res1item.itemId == selfItem.itemId){
                                  selfItem.answerId = res1item.answerId
                                }
                              })
                            })
                          }
                        }
                      })
                    }
                  } else {
                    // alert("Fail");
                  }
                }
              });
            } else {
              // alert("Fail");
            }
          }
        });
      // }
    }
  }
}
</script>
<style>
.ifShowTrue{
  color: red;
}
.test_item_info >div{
  padding: 0 24px;
}
.test_item_info >div p{
  text-align: left;
  font-size: 14px;
}
.el-radio-group{
  display: flex;
  flex-flow: column;
}
</style>