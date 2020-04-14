<template>
	<div class="topBar">
		<div class="title_div"><span class="title">{{title}}</span></div>
		<Button class="add_class" type="primary" v-if="addFlag" shape="circle" icon="ios-add-circle" @click="addClick"></Button>
	</div>
</template>
<script type="text/javascript">
	export default{
		name: 'TopBar',
		props:{
			title:{
				type:String,
				default:''
			},
			addFlag:{
				type:Boolean,
				default: false
			}
		},
		computed:{

		},
		methods:{
			addClick(){
				this.$emit("addClick",this.title)
			}
		}
	}
</script>
<style type="text/css">
	.topBar .title_div{
		height: 40px;
	    width: 100%;
	    background-color: #3dcccc;
	    position: fixed;
	    top: 0;
	}
	.topBar .title_div .title{
		line-height: 40px;
	}
	.topBar .add_class{
	    position: absolute;
	    right: 8px;
	    top: 0px;
	    background-color: initial;
	    border: none;
	}
	.topBar .add_class .ivu-icon.ivu-icon-ios-add-circle{
		font-size: 30px;
	}
</style>