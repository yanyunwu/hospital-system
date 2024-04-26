<template>
	<view v-if="loading">
		<view style="display: flex; justify-content: center;flex-direction: column;align-items: center;">
			<image mode="widthFix" style="width: 50rpx;height: auto;" src="/static/loading.gif"></image>
			<view style="margin-top: 10rpx; color: #aaa;font-size: 12px;">
				加载中... 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Loading",
		props: {
			loading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>