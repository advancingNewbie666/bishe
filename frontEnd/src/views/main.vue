<template>
<div data-main-box>
  <router-view></router-view>
  <Tabbar></Tabbar>
</div>
</template>
<script>
import Tabbar from './common/Tabbar.vue'
export default {
  components:{
    Tabbar,
  },
  data () {
  	return{
      index: 'address'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      var self = this;
      if(key == "signout") {
        self.request("api/user/signout",{
          "method":"POST",
          "data": {token: localStorage.getItem('token')},
          "success": function(res){
            if(res.data.success) {
              localStorage.clear();
              self.jump("/login");
            } else {
              alert(res.data.data);
              localStorage.clear();
            }
          }
        });
      }else {
        self.jump("/main/" + key);
      }
    }
  }
}
</script>
<style scoped>
div[data-main-box]{
  padding-top: 40px;
}
</style>
