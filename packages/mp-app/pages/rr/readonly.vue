<template>
	<view class="container">
		<view class="inner">
			<view class="content">
	<uni-section title="以下是你填报的信息(不可更改)" type="line">
		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" :modelValue="baseFormData" label-position="top" label-width="200" d>
			<uni-forms-item label="申请报销人姓名" required>
				<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="申请报销人学号" required>
				<uni-easyinput type="number" v-model="baseFormData.stuId" placeholder="请输入学号" />
			</uni-forms-item>
			<uni-forms-item label="性别" required>
				<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
			</uni-forms-item>
			<uni-forms-item label="手机号码" required>
				<uni-easyinput type="number" v-model="baseFormData.phone" placeholder="请输入手机号码" />
			</uni-forms-item>
			<uni-forms-item label="校外就诊时间">
				<uni-datetime-picker type="datetime" v-model="baseFormData.datetime"/>
			</uni-forms-item>
			<uni-forms-item label="申请备注">
				<uni-easyinput type="textarea" v-model="baseFormData.remark" placeholder="请输入备注" />
			</uni-forms-item>
		</uni-forms>
		<view class="intro">
			<text>
				你提交的材料如下：\n
				1. 学生证照片 \n
				2. 转诊报销单照片（外部医院）\n
				3. 其他辅助审核照片
			</text>
		</view>
		<view  class="image-list">
			<image @click="handlePreview(item, imageList)" mode="widthFix" :src="item" v-for="item in imageList"></image>
			<!-- <view class="upload">
				<image mode="widthFix" src="/static/upload.png" @click="handleSelectImage"></image>
			</view> -->
		</view>
		<!-- <button type="primary" @click="handleSubmit">提交审核</button> -->
	</uni-section>
					
			</view>
		</view>
	</view>
</template>

<script>
	import request, { BASE_URL } from '@/utils/request.js'
	export default {
		data() {
			return {
				rrId: null,
				active: 0,
				list1: [{
					title: '填写基本信息'
				}, {
					title: '上传资料'
				}],
				
				baseFormData: {
					name: '',
					age: '',
					remark: '',
					sex: 0,
					datetime: '',
					phone: '',
					stuId: ''
				},
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				
				imageList: [],
				picture: []
};
		},
		
		
		methods: {
			getData() {
				if (!this.rrId) {
					return
				}
				
				request({
					url: '/api/rr/getRR',
					data: {
						id: parseInt(this.rrId)
					}
				}).then(res => {
					console.log('getRR', res)
					this.baseFormData = res.data.data ?? {}
					this.picture = res.data.data.picture
					this.imageList = res.data.data.picture
				})
			},
			change() {
				if (this.active < this.list1.length - 1) {
					this.active += 1
				} else {
					this.active = 0
				}
			},
			
			handlePreview(current, list) {
				uni.previewImage({
					urls:list,
					current:current,
				})
			},
			
			handleSelectImage() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'],
					success: (res) => {
						console.log(res);
						
						res.tempFilePaths.forEach((item, index) => {
							uni.uploadFile({
								url: `${BASE_URL}/api/file/upload`, //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								success: (uploadFileRes) => {
									const data = JSON.parse(uploadFileRes.data)
									this.picture[index] = data.data
								}
							});
						})
						
						this.imageList = [...res.tempFilePaths]
					}
				});
			},
			
			handleSubmit() {
				request({
					url: '/api/rr/addRR',
					method: 'post',
					data: {
						...this.baseFormData,
						picture: this.picture
					}
				}).then(res => {
					console.log('提交转诊报销申报', res)
					uni.showModal({
						showCancel: false,
						title: '提示',
						content: '提交成功，请耐心等待后台审批！',
						success(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						}
					})
				})
			}
			
			
		},
		
		
		onLoad(query) {
			this.rrId = query.rrId
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	
.upload {
	border: 1px solid rgba(0, 0, 0, .3);
	border-radius: 15rpx;
	width: 150rpx;
	height: 150rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	image {
		width: 50rpx;
	}
}
	
.container {
	min-height: 100%;
	background-color: #eee;
	padding: 40rpx;
	box-sizing: border-box;
	
	.inner {
		background-color: white;
		border-radius: 20rpx;
		
		padding: 40rpx;
		
		padding-top: 10rpx;
		
		.intro {
		  background-color: green;
		  color: white;
		  word-wrap:break-word;
		  word-break:normal; 
		  padding: 20rpx;
		  margin-bottom: 40rpx;
		  border-radius: 20rpx;
		}
		
		.image-list {
			display: flex;
			gap: 10rpx;
			flex-wrap: wrap;
			max-height: 400rpx;
			overflow: auto;
			margin-bottom: 40rpx;
			
			> image {
				width: calc((100% - 30rpx) / 4);
			}
		}
	}
}
</style>
