<template>
	<view class="container">
		<view class="onwer-card-container">
			<view class="onwer-card">
				<view class="onwer-card-top">
					<image mode="widthFix" src="../../static/bianji.png" @click="handleEdit"></image>
					<image mode="widthFix" src="../../static/shezhi.png" @click="handleSetting"></image>
				</view>
				<view class="onwer-card-avator">
					<image :src="userData.avatar" @click="handleLogin"></image>
				</view>
				<view class="onwer-card-name">
					<text>{{userData.nickname}}</text>
				</view>
			</view>
			<view class="onwer-extend">
				<view class="title"><text>个人签名</text></view>
				<view class="content"><text>这是你的个人签名~~~</text></view>
			</view>
		</view>
		<view class="index_middle">
			<view @click="handleTo(`/pages/self/posts/posts?userID=${userData.id}`)">
				<image src="../../static/self1.png" mode="widthFix"></image>
				<text>发帖记录</text>
			</view>
			<view>
				<image @click="handleTo('/pages/booking/recordList/recordList')" src="../../static/self2.png" mode="widthFix"></image>
				<text>预约记录</text>
			</view>
			<view>
				<image @click="handleTo('/pages/rr/record/record')" src="../../static/self3.png" mode="widthFix"></image>
				<text>转诊报销</text>
			</view>
		</view>
		<view class="onwer-info-card">
			<view class="onwer-info-card-item">
				<view class="onwer-info-card-item-label">姓名</view>
				<view class="onwer-info-card-item-value">{{userData.name || '未设置'}}</view>
			</view>
			<view class="onwer-info-card-item">
				<view class="onwer-info-card-item-label">性别</view>
				<view class="onwer-info-card-item-value">{{getSex(userData.sex)}}</view>
			</view>
			<view class="onwer-info-card-item">
				<view class="onwer-info-card-item-label">年龄</view>
				<view class="onwer-info-card-item-value">{{userData.age || '无'}}</view>
			</view>
			<view class="onwer-info-card-item">
				<view class="onwer-info-card-item-label">出生年月</view>
				<view class="onwer-info-card-item-value">{{userData.birthday || '未设置'}}</view>
			</view>
			<view class="onwer-info-card-item">
				<view class="onwer-info-card-item-label">学号</view>
				<view class="onwer-info-card-item-value">{{userData.stuId || '未设置'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	const initData = {
		id: null,
					age: null,
					birthday: "登录后查看",
					createTime: "2023-12-13T10:53:19.115Z",
					id: 2,
					nickname: "点击头像进行登录",
					openId: "otlQF5ACNXeJxMRzPHK2CeKSDZ3I",
					password: null,
					sex: 2,
					stuId: null,
					username: "登录后查看",
					avatar: '../../static/touxiang.png',
					name: '登录后查看'
				}
	export default {
		data() {
			return {
				userData: initData,
			}
		},
		methods: {
			getSex(sex) {
				return sex === 0 
				 ? '男'
				 : sex === 1
				 ? '女'
				 : '未知'
			},
			handleLogin() {
				const token = uni.getStorageSync('token')
				
				if (token) {
					uni.showToast({
						title: "您已登录！",
						icon: "none"
					})
					return 
				}
				
				// #ifdef APP || WEB
				uni.navigateTo({
					url: '/pages/self/login/login'
				})
				return
				// #endif
				
				uni.showToast({
					title: "正在登录中...",
					icon: "loading"
				})

				uni.getUserProfile({
					desc: "用于完善会员资料",
					success: (res) => {
						console.log('getUserProfile', res)
						console.log('userInfo', res.userInfo)
						const userInfo = res.userInfo
						uni.setStorageSync('userInfo', userInfo)
						if (!token) {
							uni.login({
								success: (res) => {
									console.log('login', res)
									request({
										url: '/api/mp/login', 
										method: "post",
										data: {
											code: res.code,
											userInfo: {
												avatarUrl: userInfo.avatarUrl,
												nickName: userInfo.nickName
											}
										}
									}).then((data) => {
										console.log('data', data)
										uni.setStorageSync('token', data.data.data.access_token)
										this.getInfo()
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
					fail: (res) => {
						console.log('getUserProfile err', res)
					}
				})			
			},
			
			
			
			handleAppLogin() {
				
			},
			
			setInfo() {
				const userInfo = uni.getStorageSync('userInfo')
					
				if (!userInfo) {
					return
				}
				
				this.name = userInfo.nickName
				this.avator = userInfo.avatarUrl
			},
			
			getInfo() {
				request({
					url: '/api/mp/user/getMyInfo'
				}).then(res => {
					console.log('获取用户信息', res)
					this.userData = res.data.data || initData
				})
			},
			
			
			handleEdit() {
				uni.navigateTo({
					url: '/pages/self/edit/edit'
				})
			},
			
			handleSetting() {
				uni.navigateTo({
					url: '/pages/self/setting/setting'
				})
			},
			
			handleTo(path) {
				uni.navigateTo({
					url:path
				})
			},
		},
		
		onLoad() {
			// this.setInfo()
		},
		
		onShow() {
			const token = uni.getStorageSync('token')
			if (!token) {
				this.userData = initData
			}
			
			this.getInfo()
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
			margin-bottom: 20rpx;
			
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
					height: 150rpx;
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
	
	.index_middle {
			display: flex;
			justify-content: space-around;
		
			// box-shadow: 0 0 40rpx rgba(0, 0, 0, .1);
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			background-color: white;
			font-size: 12px;
		}
		
		.index_middle > view {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 20rpx;
			color: #666;
		}
		
		.index_middle > view image {
			width: 60rpx;
			margin-bottom: 10rpx;
		}
</style>
