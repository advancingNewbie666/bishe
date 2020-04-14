<template>
    <div data-itemcreate-box>
        <TopBar :title="title" :addFlag="addFlag" @addClick="addClick"></TopBar>
        <div class="test_item_info" v-if="testType==1">
          <div v-for="(item,index) in itemList" :key="item.id">
            <p>
              <span>{{ index }}</span>
              <el-input v-model="item.itemName" style="width: 70%;" size="mini"></el-input>
            </p>
            <p>
              <RadioGroup v-model="item.answerId">
                <Radio v-for="(chooseitem,chooseindex) in item.chooseList" :key="chooseitem.id">
                  <el-input v-model="chooseitem.answerName" style="width: 70%;" size="mini"></el-input>
                </Radio>
              </RadioGroup>
            </p>
          </div>
        </div>
        <div class="test_item_info" v-if="testType==2">
          <div v-for="(item,index) in itemList" :key="item.id">
            <p><span>{{ index }}</span><span>{{ item.itemName }}</span></p>
            <p>
              <RadioGroup v-model="item.answerId">
                <Radio v-for="(chooseitem,chooseindex) in item.chooseList" :key="chooseitem.id" :label="chooseitem.answerName"></Radio>
              </RadioGroup>
            </p>
          </div>
        </div>
        <div class="test_item_info" v-if="testType==3">
          <div v-for="(item,index) in itemList" :key="item.id">
            <p><span>{{ index }}</span><span>{{ item.itemName }}</span></p>
            <p>
              <RadioGroup v-model="item.answerId">
                <Radio v-for="(chooseitem,chooseindex) in item.chooseList" :key="chooseitem.id" :label="chooseitem.answerName"></Radio>
              </RadioGroup>
            </p>
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
  name: 'testAnswer',
  data () {
    return{
      itemList:[],
      title:'创建试卷'
    }
  },
  created: function() {
  },
  computed:{
    sessionInfo(){return JSON.parse(localStorage.getItem('UNIFO'))},
    testType(){return localStorage.getItem('testType')}, // 1新建试题    2答题   3答题记录,
    addFlag(){return this.sessionInfo.roleId==1? true:false}
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
    },
    addClick(title){
      var self = this;
      let chooseList = []
      chooseList.push({ answerName:'',answerSeq:1 })
      chooseList.push({ answerName:'',answerSeq:2 })
      chooseList.push({ answerName:'',answerSeq:3 })
      chooseList.push({ answerName:'',answerSeq:4 })
      self.itemList.push({ itemName:'',chooseList:chooseList })
    },
  }
}
</script>
<style>

</style>