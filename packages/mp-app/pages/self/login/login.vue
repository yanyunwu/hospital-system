<template>
	<view class="login_outer">
		<view class="login_avator">
			<image src="../../../static/touxiang.png" mode="widthFix"></image>
		</view>
		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" :modelValue="baseFormData">
			<uni-forms-item label="学号" label-align="center" label-width="50">
				<uni-easyinput v-model="form.username" placeholder="请输入你的学号" />
			</uni-forms-item>
			<uni-forms-item label="密码" label-align="center" label-width="50">
				<uni-easyinput v-model="form.password" placeholder="请输入密码" type="password"/>
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit">登录</button>
		<button plain style="border: none;color: blue;">当前测试，第一次登录默认注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			submit() {
				this.$request({
					url: '/api/mp/appLogin',
					method: 'post',
					data: {
						stuID: this.form.username,
						password: this.form.password
					}
				}).then(value => {
					uni.setStorageSync('token', value.data.data?.access_token)
					
					uni.showToast({
						title: '登录成功',
						duration: 2000,
						complete() {
							uni.switchTab({
								url:'/pages/self/self'
							})
						}
					});
				})
			},
			
			goToRegister() {
				uni.navigateTo({
					url:'/pages/register/register'
				})
			}
		}
	}
</script>

<style>
.login_outer {
	padding: 10% 50rpx 0;
}
.login_avator {
	text-align: center;
	padding-bottom: 30rpx;
}

.login_avator  image{
	width: 200rpx;
}
</style>