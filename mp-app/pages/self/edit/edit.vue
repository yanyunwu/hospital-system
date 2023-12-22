<template>
	<view class="container">
		<uni-section title="请录入您的个人信息" type="line">
					<view class="example">
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
	import request from '@/utils/request.js'
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
			};
		},
		
		methods: {
			submit() {
				request({
					url: '/api/mp/user/setMyInfo',
					method: 'post',
					data: {
						...this.baseFormData
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
			}
		},
		
		onLoad() {
			request({
				url: '/api/mp/user/getMyInfo'
			}).then(res => {
				console.log('获取用户信息', res)
				this.baseFormData = res.data.data
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
</style>
