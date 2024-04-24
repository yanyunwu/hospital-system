<template>
	<view class="container">
		<view class="info">
			<view class="left">
				<view>预约总数: <text>{{currentDate.count}}</text></view>
			</view>
			<view class="right">
				<view>剩余预约名额: <text>{{currentDate.count - currentDate.bookingDateRecords?.length}}</text></view>
			</view>
		</view>
		<view class="select">
			<uni-section title="选择你想要预约的时间" type="line"></uni-section>
			<view class="picker">
				<uni-datetime-picker
					type="date"
					:value="single"
					@change="change"
					:start="start"
					:end="end"
				/>
			</view>
		</view>
		<button type="primary" @click="handleBook">立即预约</button>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				bookId: null,
				single: "",
				data: {},
				start: '',
				end: '',
				currentDate: {}
			};
		},
		
		
		onLoad(query) {
			const bookId = query.bookId
			this.bookId = parseInt(bookId)
			this.getBookDateList()
		},
		
		methods: {
			change(e) {
				const dataList = this.data.data
				const res = dataList.find((item) => item.date === e) 
				this.currentDate = res
				this.single = e
			},
			
			findBookingDateId() {
				const dataList = this.data.data
				const res = dataList.find((item) => item.date === this.single) 
				return res && res.id
			},
			
			handleBook() {
				
				if (!this.single) {
					uni.showToast({
						icon: 'none',
						title: '请先选择日期'
					})
					return
				}
				
				const bookingDateId = this.findBookingDateId()
				if (!bookingDateId) {
					uni.showToast({
						icon: 'none',
						title: '当前日期无预约'
					})
					return 
				}
				
				request({
					url: '/api/booking/addBookingDateRecord',
					method: 'post',
					data: {
						bookingDateId: bookingDateId,
						code: new Date().getTime()
					}
				}).then(res => {
					console.log('预约结果', res)
					uni.showModal({
						showCancel: false,
						confirmText: '返回主页',
						content: '您已预约成功！',
						
						success(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						}
					})
				})
			},
			
			getBookDateList() {
				request({
					url: '/api/booking/getBookingDateList',
					data: {
						bookingId: this.bookId
					}
				}).then(res => {
					console.log('预约列表', res)
					this.data = res.data.data
					const dataList = res.data.data.data
					this.start = dataList[0]?.date
					this.end = dataList[dataList.length-1]?.date
					// this.single = this.start
					this.currentDate = dataList[0]
				})
			}
		}
	}
</script>

<style lang="less">
	.container {
		padding: 40rpx;
		background-color: #eee;
		height: 100%;
		box-sizing: border-box;
		
		.info{
			margin-bottom: 20rpx;
			.left {
				margin-bottom: 20rpx;
			}
		}
		
		
		
		.select {
			margin-bottom: 20rpx;
			.picker {
				background-color: #fff;
				padding: 10px;
			}
		}
	}
</style>
