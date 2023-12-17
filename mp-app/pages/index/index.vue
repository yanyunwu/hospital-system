<template>
	<view class="container">
		<view class="swiper">
			<liu-slide-img :list="list" :type="2" :autoplay="autoplay" :interval="interval"></liu-slide-img>
		</view>
		
		<view class="navigation">
			<view v-for="item in index_nav" @click="goTo(item)">
				<view class="icon">
					<image :src="item.image" mode="widthFix" style="height: auto;"></image>
				</view>
				<view class="icon_text"><text>{{item.text}}</text></view>
			</view>
		</view>
		
		<view class="announcement"></view>
	</view>
</template>


<script>
import request from '../../utils/request.js'
export default {
	data() {
		return {
			autoplay: true,
			interval: 3000,
			 list: [{
					src: "/static/index_b1.png"
				},
				{
					src: "/static/index_b2.jpg"
				},
				{
					src: "/static/index_b3.jpg"
				}
			],
			
			info: [
				"@/static/index_b1.png",
				"@/static/index_b2.jpg",
				"@/static/index_b3.jpg"
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
				},
				{
					image: "../../static/zhuanzhenbaoxiao.png",
					text: "转诊报销",
					to: "/pages/chat/chat"
				},
				{
					image: "../../static/jieshao.png",
					text: "医院介绍",
					to: "/pages/chat/chat"
				},
				{
					image: "../../static/yijianfankui.png",
					text: "意见反馈",
					to: "/pages/chat/chat"
				},
				{
					image: "../../static/xinlijiankang.png",
					text: "心理健康",
					to: "/pages/chat/chat"
				},
				{},{}
			]
		}
	},
	methods: {
		goTo(item) {
			if (item.to === '/pages/chat/chat') {
				this.handleBeforeGoToChat(item)
				return 
			}
			
			uni.navigateTo({
				url: item.to
			})
		},
		
		async handleBeforeGoToChat(item) {
			
			const data = await request({
				url: "/api/session/addNewSession",
				method: "post"
			})
			
			console.log('sessionId data', data)
			
			
			uni.navigateTo({
				url: `${item.to}?sessionId=${data.data.data.id}`
			})
		}
	}
}

</script>

<style lang="less" scoped>
	.container {
		background-color: #eee;
		height: 100%;
		
		.swiper {
			padding: 40rpx 0;
		}
		
		.navigation {
			background-color: #fff;
			border-radius: 15rpx;
			margin: 10px 20px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 10rpx;
			
			> view {
				width: 160rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 30rpx 0;
				
				.icon {
					width: 80rpx;
					> image {
						width: 100%;
					}
				}
				
				.icon_text {
					font-size: 14px;
				}
			}
		}
	}
</style>
