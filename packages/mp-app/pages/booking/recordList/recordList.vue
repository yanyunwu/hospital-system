<template>
	<view class="container">
		<zb-tab
		  :activeStyle="{
		    fontWeight: 'bold',
		    transform: 'scale(1.1)'
		    }"
		  :data="list"
		  v-model="activeTab"
		 ></zb-tab>
		 
		 <Empty style="margin-top: 40rpx;" v-if="!dataList.length" content="暂无记录!" />
		 
		 <view class="box">
			 <view class="box-item" v-for="item in dataList">
				 <view class="title">
					 <text>{{item.bookingDate?.booking?.title}}</text>
					 <uni-tag :text="tagMap[item.status].text" size='mini' :type="tagMap[item.status].type" circle style="margin-left: 20rpx;"></uni-tag>
				 </view>
				 <view class="content">
					 <text>
						 时间：{{item.bookingDate?.date}}
					 </text>
					 <button v-if="item.status === 0" type="warn" size="mini" style="margin: 0;" @click="handleCancel(item.id)">取消</button>
					 <button v-else type="warn" size="mini" style="margin: 0;" @click="handleDel(item.id)">删除</button>
				 </view>
			 </view>
		 </view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	import Empty from '@/components/Empty.vue'
	const map = {
		[-1]: null,
		[0]: [0],
		[1]: [1],
		[2]: [2,3,4]
	}
	// 状态 0已预约 1已完成 2未完成/过期 3用户取消 4系统取消	
	export default {
		components: {Empty},
		data() {
			return {
				list: [
					{
					    name: '全部',
					    value: -1,
					},  {
					    name: '已预约',
					    value: 0,
					},{
					    name: '已完成',
					    value: 1,
					}, {
					    name: '未完成',
					    value: 2,
					}
				],
				
				activeTab: -1,
				
				dataList: [],
				
				tagMap: {
					0: {
						text: '预约成功',
						type: 'primary'
					},
					1: {
						text: '已完成',
						type: 'success'
					},
					2: {
						text: '未完成/过期',
						type: 'warning'
					},
					3: {
						text: '用户取消',
						type: 'default'
					},
					4: {
						text: '系统取消',
						type: 'error'
					},
				}
			};
		},
		watch: {
			activeTab() {
				this.getList()
			}	
		},
			
		methods: {
			handleCancel(id) {
				uni.showModal({
					title: '提示',
					content: '确定要取消预约吗？',
					success: (res) => {
						if (res.confirm) {
							this.cancel((id))
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			handleDel(id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除预约记录吗？',
					success: (res) => {
						if (res.confirm) {
							this.del(id)
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			getList() {
				request({
					url: '/api/booking/getUserRecord',
					data: {
						status: map[this.activeTab]
					}
				}).then(res => {
					console.log('预约记录', res)

					this.dataList = res.data.data
				})
			},
			del(id) {
				request({
					url: '/api/booking/delBookingDateRecord',
					method: 'post',
					data: {
						ids: [id]
					}
				}).then(res => {
					console.log('预约记录删除', res)
					uni.showToast({
						icon: 'none',
						title: '删除成功！'
					})
					this.getList()
				})
			},
			cancel(id) {
				request({
					url: '/api/booking/setBookingDateRecord',
					method: 'post',
					data: {
						id,
						status: 3
					}
				}).then(res => {
					console.log('预约记录取消', res)
					uni.showToast({
						icon: 'none',
						title: '取消成功！'
					})
					this.getList()
				})
			}
		},
		
		onLoad() {
			this.getList()
		}
	}
</script>

<style lang="less" scoped>
	.box {
		padding: 20px;
		background-color: #f8f8f8;
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 10px;
		
		.box-item {
		  margin-bottom: 20px;
		  background-color: #ffffff;
		  border-radius: 10px;
		  padding: 15px;
		  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		  
		  .title {
			  display: flex;
			  align-items: center;
		  	font-size: 16px;
			font-weight: 600;
		  }
		  
		  .content {
			  margin-top: 20rpx;
			  display: flex;
			  font-size: 14px;
			  color: #aaa;
			  align-items: center;
			  justify-content: space-between;
		  }
		}
	}
</style>
