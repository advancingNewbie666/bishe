<template>
  <div>
    <div class="form" style="padding-top: 50px;">
      <!-- <p class="title">登录页面</p> -->
      <Form ref="form" :model="form" :rules="rules" inline>
          <FormItem prop="userNo">
              <Input type="text" v-model="form.userNo" placeholder="请输入工号">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <br>
          <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <br>
          <FormItem>
              <Button type="primary" size="mini" @click="login()">登录</Button>
              <Button type="primary" size="mini" @click="signup()">注册</Button>
          </FormItem>
      </Form>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'login',
  data () {
  	return{
      form: {
        userNo: '',
        password: ''
      },
      rules:{
        userNo:[{required:true,message:'请输入工号',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}]
      }
    }
  },
  created: function() {
    // console.log("location.href---");
    // console.log(location.href);
    // var url = location.href.replace("http://","https://");
    // console.log(url);
    // location.href = url;
  },
  methods:{
    login: function() {
      var self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          let data = "?userNo="+self.form.userNo+"&password="+self.form.password;
          self.request("api/login"+data,{
            "success": function(res){
              if(res.data&&res.data.length>0) {
                localStorage.setItem('UNIFO',JSON.stringify(res.data[0]));
                self.jump("/main/courseList");
              } else {
                self.request("api/login?userNo="+self.form.userNo,{
                  "success": function(res){
                    if(res.data&&res.data.length>0) {
                      alert("密码错误");
                    } else {
                      alert("账户不存在！请先注册");
                    }
                  }
                })
                
              }
            }
          });
        } else {
          this.$Message.error('Fail!');
        }
      })

    },
    signup: function() {
      var self = this;
      self.jump("/signin")
      // self.request("api/signup",{
      //   "method":"POST",
      //   "data": {name: self.form.name,password: self.encrypt(self.form.password)},
      //   "success": function(res){
      //     console.log(res);
      //   }
      // });
    }
  }
}
</script>