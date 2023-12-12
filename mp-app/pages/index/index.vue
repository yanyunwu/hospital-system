<template>
	<view class="container">
		<swiper class="swiper-box" @change="change">
			<swiper-item v-for="(item ,index) in info" :key="index">
				<view class="swiper-item">
					<image mode="widthFix" style="height: auto; width: 100%;" :src="item"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="navigation">
			<view v-for="item in index_nav" @click="goTo(item)">
				<view>
					<image :src="item.image" mode="widthFix" style="height: auto;"></image>
				</view>
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>


<script>
export default {
	data() {
		return {
			info: [
				"../../static/index_b1.png",
				"../../static/index_b2.jpg",
				"../../static/index_b3.jpg"
			],
			index_nav: [
				{
					image: "../../static/yuyue.png",
					text: "预约服务"
				},
				{
					image: "../../static/zaixianjiaoliu.png",
					text: "在线交流",
					to: "/pages/chat/chat"
				}
			]
		}
	},
	methods: {
		goTo(item) {
			uni.navigateTo({
				url: item.to
			})
		}
	}
}

</script>

<style lang="less" scoped>
	.container {
		background-color: #eee;
		height: 100%;
		
		.navigation {
			background-color: #fff;
			border-radius: 20px;
			margin: 10px;
			display: flex;
			
			> view {
				width: 150rpx;
				margin: 50rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				> view {
					width: 100rpx;
					> image {
						width: 100%;
					}
				}
			}
		}
	}
</style>
