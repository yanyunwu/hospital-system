<template>
	<view class="container">
		<view class="onwer-card-container">
			<view class="onwer-card">
				<view class="onwer-card-top">
					<image mode="widthFix" src="../../static/bianji.png"></image>
					<image mode="widthFix" src="../../static/shezhi.png"></image>
				</view>
				<view class="onwer-card-avator">
					<image mode="widthFix" :src="avator" @click="handleLogin"></image>
				</view>
				<view class="onwer-card-name">
					<text>{{name}}</text>
				</view>
			</view>
			<view class="onwer-extend">
				<view class="title"><text>个人签名</text></view>
				<view class="content"><text>为世界一切美好的事物而战</text></view>
			</view>
		</view>
		<view class="onwer-info-card">
			<view class="onwer-info-card-item" v-for="item in info">
				<view class="onwer-info-card-item-label">{{item.label}}</view>
				<view class="onwer-info-card-item-value">{{item.value}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				info: [
					{
						label: "姓名",
						value: "周杨杰"
					},
					{
						label: "出生年月",
						value: "2001.10.22"
					},
					{
						label: "学号",
						value: "2020315220308"
					}
				],
				
				name: '点击头像进行登录',
				avator: "../../static/touxiang.png"
			}
		},
		methods: {
			handleLogin() {
				const token = uni.getStorageSync('token')
				const userInfo = uni.getStorageSync('userInfo')
				
				
			
				if (!userInfo) {
					uni.getUserProfile({
						desc: "用于完善会员资料",
						success: (res) => {
							console.log('getUserProfile', res)
							uni.setStorageSync('userInfo', res.userInfo)
							this.setInfo()
						},
						fail: (res) => {
							console.log('getUserProfile err', res)
						}
					})
				}
			
				
				
				if (!token) {
					uni.showToast({
						title: "正在登录中...",
						icon: "loading"
					})
					uni.login({
						success: (res) => {
							console.log('login', res)
							request({
								url: '/api/mp/login', 
								method: "post",
								data: {
									code: res.code
								}
							}).then((data) => {
								console.log('data', data)
								uni.setStorageSync('token', data.data.data.access_token)
							})
						}
					})
				} else {
					uni.showToast({
						title: "您已登录！",
						icon: "none"
					})
				}
			},
			
			setInfo() {
				const userInfo = uni.getStorageSync('userInfo')
					
				if (!userInfo) {
					return
				}
				
				this.name = userInfo.nickName
				this.avator = userInfo.avatarUrl
			}
		},
		
		onLoad() {
			this.setInfo()
		}
	}
</script>

<style lang="less" scoped>
	
	.container {
		box-sizing: border-box;
		height: 100%;
		background-color: #eee;
		padding: 160rpx 30rpx 20rpx 30rpx;
		
		.onwer-card-container {
			padding-bottom: 20rpx;
			background-color: white;
			border-radius: 15rpx;
			margin-bottom: 40rpx;
			
			.onwer-extend {
				.title {
					padding: 20rpx 0;
					text-align: center;
				}
				
				.content {
					text-align: center;
					font-size: 14px
				}
			}
		}
		
		.onwer-card {
			background-color: royalblue;
			border-radius: 15rpx;
			padding: 40rpx 20rpx;
			padding-top: 20rpx;
			
			&-top {
				display: flex;
				justify-content: space-between;
				image {
					width: 50rpx;
				}
			}
			
			&-avator {
				display: flex;
				justify-content: center;
				padding: 15rpx 0;
				
				& > image {
					width: 150rpx;
					border-radius: 1000px;
				}
			}
			
			&-name {
				text-align: center;
				color: white;
			}
		}
		
		.onwer-info-card {
			background-color: white;
			border-radius: 15rpx;
			padding: 40rpx;
			
			&-item {
				border-bottom: 1px solid #eee;
				
				&-label {
					padding: 15rpx;
					padding-left: 0;
					color: rgba(0, 0, 0, .5);
					font-size: 16px;
					font-weight: 700;
				}
				
				&-value {
					padding: 15rpx;
					padding-left: 0;
					color: black;
					font-size: 15px;
					padding-top: 0;
				}
			}
		}
	}
</style>
