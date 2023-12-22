<template>
	<view class="container">
		<view class="list">
			<template v-for="item in list">
				<view class="booking"  v-if="item.status === 1" @click="handleClick(item.id)">
					<view class="title">
						<text>{{item.title}}</text>
						<view>预约 ></view>
					</view>
					<view class="intro">
						{{item.intro}}
					</view>
				</view>
			</template>
		
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				list: [
					
				]
			};
		},
		
		onLoad() {
			request({
				url: '/api/booking/getBookingList'
			}).then(res => {
				console.log('预约列表', res)
				this.list = res.data.data.data
			})
		},
		
		methods: {
			handleClick(id) {
				request({
					url: '/api/booking/getUserRecord',
					data: {
						bookingId: id
					}
				}).then(res => {
					console.log('用户已预约列表', res)
					if (res.data.data.length) {
						console.log(res.data.data.length)
						uni.showModal({
							content: '你已预约该项！',
							confirmText: '查看预约',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/booking/recordList/recordList'
									})
								}
							}
						})
						return 
					}
					
					uni.navigateTo({
						url: `/pages/booking/bookingDate/bookingDate?bookId=${id}`
					})
				})
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding: 40rpx;
		background-color: #eee;
		height: 100%;
		box-sizing: border-box;
		
		.list {
			.booking {
				border-radius: 20rpx;
				background-color: white;
				margin-bottom: 40rpx;
				padding: 20rpx 40rpx;
				
				.title {
					padding: 10px 0;
					
					text {
						font-size: 20px;
						font-weight: bold;
					}
					
					view {
						background-color: green;
						color: white;
						border-radius: 10rpx;
						padding: 10rpx;
						font-size: 12px;
					}
					
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				
				.intro {
					font-size: 14px;
					padding: 10px 0;
					word-wrap:break-word;
					word-break:normal; 
				}
			}
		}
	}
</style>
