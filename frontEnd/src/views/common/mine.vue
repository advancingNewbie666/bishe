<template>
  <div>
    <TopBar :title="title"></TopBar>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="工号" readonly>
          <el-input v-model="form.userNo" size="mini" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="密码" readonly>
          <el-input v-model="form.password" size="mini" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" readonly>
          <el-input v-model="form.name" size="mini" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" readonly>
          <el-input v-model="form.mail" size="mini" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" readonly>
          <el-input v-model="form.phone" size="mini" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="角色" readonly>
          <Select v-model="form.roleId" style="width:200px" placeholder="请选择角色">
              <Option v-for="item in roleIdSelect" :value="item.paramValue" :key="item.paramValue">{{ item.paramName }}</Option>
          </Select>
        </el-form-item>
        <el-form-item label="学校" readonly>
          <Select v-model="form.schoolId" style="width:200px" placeholder="请选择学校">
              <Option v-for="item in schoolIdSelect" :value="item.paramValue" :key="item.paramValue">{{ item.paramName }}</Option>
          </Select>
        </el-form-item>
        <el-form-item label="学院" readonly>
          <Select v-model="form.majorId" style="width:200px" placeholder="请选择学院">
              <Option v-for="item in majorIdSelect" :value="item.paramValue" :key="item.paramValue">{{ item.paramName }}</Option>
          </Select>
        </el-form-item>
        <el-form-item v-show="false">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
.form{width: 500px;margin: 0 auto;}
.title{text-align: center;}
</style>
<script>
import TopBar from '@/views/common/TopBar.vue'
export default {
  components:{
    TopBar
  },
  name: 'mine',
  data () {
  	return{
      schoolIdSelect:[],
      roleIdSelect:[],
      majorIdSelect:[],
      title:"我的",
      form: {
        userNo: '',
        password: '',
        name:'',
        mail:'',
        phone:'',
        roleId:1,
        schoolId:-1,
        majorId:-1
      },
      rules:{
        userNo:[{required:true,message:'请输入工号',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}],
        name:[{required:true,message:'请输入姓名',trigger:'blur'}],
        mail:[{required:true,message:'请输入邮箱',trigger:'blur'}],
        phone:[{required:true,message:'请输入手机号码',trigger:'blur'}],
        roleId:[{required:true,message:'请选择角色',trigger:'change'}],
        schoolId:[{required:true,message:'请选择学校',trigger:'change'}],
        majorId:[{required:true,message:'请选择专业',trigger:'change'}]
      }
    }
  },
  created: function() {
    this.initSelect('school',this.schoolIdSelect)
    this.initSelect('role',this.roleIdSelect)
    this.initSelect('majorId',this.majorIdSelect)
    this.$nextTick(()=>{
      this.submit();
    })
  },
  methods:{
    initSelect: function(paramCode,selectInfo) {
      var self = this;
      let data = {
        paramCode:paramCode
      }
      self.request("api/dictParam/where?paramCode="+paramCode,{
        "success": function(res){
          if(res.data) {
            // if(paramCode == 'school'){
            //   self.schoolIdSelect = res.data;
            //   return;
            // }else if(paramCode == 'role'){
            //   self.roleIdSelect = res.data;
            //   return;
            // }else if(paramCode == 'majorId'){
            //   self.majorIdSelect = res.data;
            //   return;
            // }
            selectInfo = res.data;
          } else {
            selectInfo = [];
          }
        }
      });
    },
    submit: function() {
      var self = this;
      self.form=JSON.parse(localStorage.getItem('UNIFO'));
    }
  }
}
</script>