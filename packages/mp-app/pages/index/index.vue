<template>
	<view class="container">
		<view class="swiper">
			<liu-slide-img :list="list" :type="2" :autoplay="autoplay" :interval="interval"></liu-slide-img>
		</view>
		
		<view class="navigation">
			<view v-for="item in index_nav" @click="goTo(item)">
				<view class="icon">
					<!-- #ifdef MP-WEIXIN -->
					<image :src="item.image" mode="widthFix" style="height: auto;"></image>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<image :src="item.image" mode="widthFix"></image>
					<!-- #endif -->
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
					text: "预约服务",
					to: "/pages/booking/booking"
				},
				{
					image: "../../static/zaixianjiaoliu.png",
					text: "在线交流",
					to: "/pages/chat/chat"
				},
				{
					image: "../../static/zixun.png",
					text: "情绪小助手",
					to: "/pages/bot-chat/bot-chat"
				},
				{
					image: "../../static/zhuanzhenbaoxiao.png",
					text: "转诊报销",
					to: "/pages/rr/rr"
				},
				{
					image: "../../static/jieshao.png",
					text: "医院介绍",
					to: "/pages/introduce/introduce"
				},
				{
					image: "../../static/yijianfankui.png",
					text: "意见反馈",
					to: "/pages/feedback/feedback"
				},
				{
					image: "../../static/xinlijiankang.png",
					text: "心理健康",
					onClick() {
						uni.showModal({
							title: '欢迎加入华农心理健康社区',
							content: '随着社会的飞速发展，人们的生活节奏正在日益加快，竞争越来越强烈，人际关系也变得越来越复杂；由于科学技术的飞速进步，知识爆炸性地增加，迫使人们不断地进行知识更新；“人类进入了情绪负重年代”，人们的观念意识、情感态度复杂嬗变。作为现代社会组成部分，在大学院校生活和学习的大学生，对社会心理这块时代的“晴雨表”，十分敏感',
							confirmText: '马上加入',
							success: (res) => {
								if (res.confirm) {
									uni.switchTab({
										url: '/pages/community/community'
									})
								}
							}
						})
					}
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
			
			if (item.to === '/pages/bot-chat/bot-chat') {
				this.handleBeforeGoToBotChat(item)
				return 
			}
			
			if (item.onClick) {
				item.onClick()
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
		},
		async handleBeforeGoToBotChat(item) {
			const data = await request({
				url: "/api/session/addNewSession",
				method: "post",
				data: {
					isModel: true
				}
			})
			
			uni.navigateTo({
				url: `${item.to}?chatID=${data.data.data.id}`
			})
		}
	},
	 mounted() {
	    document.body.style.overflow = 'hidden';
	    document.body.style.overscrollBehavior = 'none';
	  },
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
