<template>
	<view>
		<view style="display: flex; justify-content: center;flex-direction: column;align-items: center;">
			<image mode="widthFix" style="width: 100rpx;height: auto;" src="/static/empty.png"></image>
			<view style="margin-top: 10rpx; color: #aaa;font-size: 12px;">
				{{content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Loading",
		props: {
			content: {
				type: String,
				default: ''
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