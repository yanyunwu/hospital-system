<template>
	<view class="container">
		<uni-section title="请录入您的个人信息" type="line">
					<view class="example">
						<!-- #ifndef APP || WEB -->
						<button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" plain>
							 <image :src="avatarUrl"></image>
						</button>
						<!-- #endif -->
						<!-- #ifdef APP || WEB -->
						<button class="avatar-button" @click="handleSelectImage" plain>
							 <image :src="avatarUrl"></image>
						</button>
						<!-- #endif -->
						<!-- #ifndef APP || WEB -->
						<view class="tip">点击头像获取微信头像</view>
						<!-- #endif -->
						<!-- #ifdef APP || WEB -->
						<view class="tip">点击头像上传头像</view>
						<!-- #endif -->
						<view class="nickname-view">
							<text>
								昵称
							</text>
							<input v-model="nickname" type="nickname" placeholder="点击获取微信昵称,也可自定义" @change="onNicknameInput"/>
						</view>
						<!-- 基础用法，不包含校验规则 -->
						<uni-forms ref="baseForm" :modelValue="baseFormData">
							<uni-forms-item label="姓名" required>
								<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item label="年龄" required>
								<uni-datetime-picker
									type="date"
									v-model="baseFormData.birthday"
									placeholder="请选择出生日期"
								/>
							</uni-forms-item>
							<uni-forms-item label="性别" required>
								<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
							</uni-forms-item>
							<uni-forms-item label="学号" required>
								<uni-easyinput v-model="baseFormData.stuId" placeholder="请输入学号" />
							</uni-forms-item>
							<uni-forms-item label="自我介绍">
								<uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入自我介绍" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</uni-section>
					<button type="primary" @click="submit('valiForm')">保存</button>
	</view>
</template>

<script>
	import request, {FAIL_BASE_URL} from '@/utils/request.js'
	const defaultAvatarUrl = '../../../static/touxiang.png'
	export default {
		data() {
			return {
				baseFormData: {
					name: '',
					birthday: null,
					introduction: '',
					sex: 2,
					stuId: null
				},
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				
				avatarUrl: defaultAvatarUrl,
				nickname: ''
				
			};
		},
		
		methods: {
			submit() {
				request({
					url: '/api/mp/user/setMyInfo',
					method: 'post',
					data: {
						...this.baseFormData,
						avatar: this.avatarUrl,
						nickname: this.nickname
					}
				}).then(res => {
					console.log('保存结果', res)
					uni.showToast({
						icon: 'success',
						title: '信息保存成功',
						success() {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/self/self'
								})
							}, 1000)
						}
					})
				})
			},
			onChooseAvatar(e) {
				const { avatarUrl } = e.detail 
				this.base64(avatarUrl, 'png').then(value => {
					console.log('base64', value)
					this.avatarUrl = value
				})
			},
			onNicknameInput(e) {
				console.log('onNicknameInput', e)
				this.nickname = e.detail.value
			},
			
			// 图片转64代码
			base64(url, type) {
			  return new Promise((resolve, reject) => {
			    uni.getFileSystemManager().readFile({
			      filePath: url, //选择图片返回的相对路径
			      encoding: 'base64', //编码格式
			      success: res => {
			        resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
			        // resolve(res.data)
			      },
			      fail: res => reject(res.errMsg)
			    })
			  })
			},
			
			handleSelectImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'],
					success: (res) => {
						console.log(res);
						const access_token = uni.getStorageSync('token')
						res.tempFilePaths.forEach((item, index) => {
							uni.uploadFile({
								url: `${FAIL_BASE_URL}/api/file/upload`,
								filePath: item,
								header: {
									authorization: `Bearer ${access_token}`
								},
								name: 'file',
								success: (uploadFileRes) => {
									const outerData = JSON.parse(uploadFileRes.data)
									this.avatarUrl = `${FAIL_BASE_URL}${outerData.data?.url}`
									console.log('uploadFileRes', outerData.data)
								}
							});
						})
						
						this.avatarUrl = res.tempFilePaths[0]
					}
				});
			},

		},
		
		onLoad() {
			request({
				url: '/api/mp/user/getMyInfo'
			}).then(res => {
				console.log('获取用户信息', res)
				
				const uniData = res.data
				
				this.baseFormData = uniData.data
				this.avatarUrl = uniData.data.avatar || defaultAvatarUrl
				this.nickname = uniData.data.nickname || ''
			})
		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding: 10px;
	}
	
	.example {
		padding: 15px;
		background-color: #fff;
	}
		
	.tip {
		font-size: 12px;
		color: #ccc;
		text-align: center;
	}
	
	.avatar-button {
		border: none;
		
		image {
			width: 150rpx;
			height: 150rpx;
		}
	}

	.nickname-view {

		display: flex;
		justify-content: center;
		padding: 10px 0;

		text {
			width: 58px;
			text-align: left;
			line-height: 35px;
			padding-right: 12px;
			color: #606266;
		}

		input {
			flex: 1;
			height: 23px;
			border: 1px solid #eee;
			border-radius: 5px;
			padding: 5px;
			font-size: 12px;
		}
	}
</style>
