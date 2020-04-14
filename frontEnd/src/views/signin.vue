<template>
  <div class="data-signin-box">
    <div class="form">
      <!-- <p class="title">注册页面</p> -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="工号">
          <el-input v-model="form.userNo" size="mini" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" size="mini" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" size="mini" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.mail" size="mini" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone" size="mini" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <Select v-model="form.roleId" size="mini" placeholder="请选择角色">
              <Option v-for="item in roleIdSelect" :value="item.paramValue" :key="item.paramValue">{{ item.paramName }}</Option>
          </Select>
        </el-form-item>
        <el-form-item label="学校">
          <Select v-model="form.schoolId" size="mini" placeholder="请选择学校">
              <Option v-for="item in schoolIdSelect" :value="item.paramValue" :key="item.paramValue">{{ item.paramName }}</Option>
          </Select>
        </el-form-item>
        <el-form-item label="学院">
          <Select v-model="form.majorId" size="mini" placeholder="请选择学院">
              <Option v-for="item in majorIdSelect" :value="item.paramValue" :key="item.paramValue">{{ item.paramName }}</Option>
          </Select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
  .data-signin-box .form{width: 100%;margin: 0 auto;}
  .data-signin-box .title{text-align: center;}
  .data-signin-box .el-input{width: 70%}
  .data-signin-box .ivu-select{width: 70%}
</style>
<script>
export default {
  name: 'signin',
  data () {
  	return{
      schoolIdSelect:[],
      roleIdSelect:[],
      majorIdSelect:[],
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
            if(paramCode == 'school'){
              self.schoolIdSelect = res.data;
              return;
            }else if(paramCode == 'role'){
              self.roleIdSelect = res.data;
              return;
            }else if(paramCode == 'majorId'){
              self.majorIdSelect = res.data;
              return;
            }
          } else {
            selectInfo = [];
          }
        }
      });
    },
    submit: function() {
      var self = this;
      self.$refs['form'].validate((valid)=>{
        if(valid){
          let data = this.form
          self.request("api/createUser",{
            "method":"POST",
            "data": data,
            "success": function(res){
              if(res.data&&res.data.id) {
                localStorage.setItem('UNIFO',JSON.stringify(res.data));
                self.jump("/main/courseList");
              } else {
                alert(res.data.data);
              }
            }
          });
        }
      })
    }
  }
}
</script>