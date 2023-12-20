<template>
	<view class="container">
		<view class="list">
			<button type="warn" @click="handleUnlogin">退出登录</button>
			<button type="default" @click="handleAbout">关于</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		
		methods: {
			handleUnlogin() {
				uni.clearStorageSync()
				uni.switchTab({
					url: '/pages/self/self'
				})
			},
			
			handleAbout() {
				
			}
		}
	}
</script>

<style lang="less">
	.container {
		padding: 40rpx;
		
		.list {
			button {
				margin-bottom: 40rpx;
			}
		}
	}
</style>
