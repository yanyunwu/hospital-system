<template>
	<view class="container">
		<view class="intro">
			欢迎提交您的意见反馈，如果您在使用上有任何问题，可以第一时间在这里提交你的反馈，我们会积极反馈并处理。
		</view>
		<view class="input">
			<uni-easyinput type="textarea" v-model="content" placeholder="请输入内容" />
		</view>
		<view class="image-list"></view>
		<button type="primary" @click="handleSubmit">提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			};
		},
		
		methods: {
			handleSubmit() {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		height: 100%;
		background-color: #eee;
		padding: 40rpx;
		box-sizing: border-box;
		
		.intro {
		  background-color: skyblue;
		  color: white;
		  word-wrap:break-word;
		  word-break:normal; 
		  padding: 20rpx;
		  margin-bottom: 10px;
		  border-radius: 20rpx;
		}
		
		.input{
			margin-bottom: 10px;
		}
	}
</style>
