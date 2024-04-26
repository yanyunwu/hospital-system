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
			 <view class="box-item" v-for="item in dataList" @click="handleTo(item.id)">
				 <view class="title">
					 <text>申请人：{{item.name}}</text>
					 <uni-tag :text="tagMap[item.status].text" size='mini' :type="tagMap[item.status].type" circle style="margin-left: 20rpx;"></uni-tag>
				 </view>
				 <view style="font-size: 14px;margin-top: 10rpx;">
					<text>
						学号：{{item.stuId}}
					</text>	
				 </view>
				 <view  class="image-list" style=" margin-top: 20rpx;">
				 	<image @click="handlePreview(pitem, item.picture)" mode="widthFix" :src="pitem" v-for="pitem in item.picture"></image>
				 </view>
				 <view class="content">
					 <text>
						 创建时间：{{dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}
					 </text>
					 <button type="primary" size="mini" style="margin: 0;" >查看</button>
				 </view>
			 </view>
		 </view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	import Empty from '@/components/Empty.vue'
	import dayjs from 'dayjs'
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
					    name: '审核中',
					    value: 0,
					},{
					    name: '审核成功',
					    value: 1,
					}, {
					    name: '审核失败',
					    value: 2,
					},
					{
					    name: '已完成',
					    value: 3,
					}
				],
				
				activeTab: -1,
				
				dataList: [],
				
				tagMap: {
					0: {
						text: '提交审核中',
						type: 'primary'
					},
					1: {
						text: '审核成功',
						type: 'success'
					},
					2: {
						text: '审核失败',
						type: 'error'
					},
					3: {
						text: '已完成报销/已到款',
						type: 'warning'
					}
				}
			};
		},
		watch: {
			activeTab() {
				this.getList()
			}	
		},
			
		methods: {
			getList() {
				request({
					url: '/api/rr/getUserRR',
					data: {
						status: this.activeTab === -1 ? undefined : this.activeTab
					}
				}).then(res => {
					console.log('记录', res)
					this.dataList = res.data.data
				})
			},
			handleTo(id) {
				uni.navigateTo({
					url: `/pages/rr/readonly?rrId=${id}`
				})
			},
			dayjs(...args) {
				return dayjs(...args)
			},
			handlePreview(current, list) {
				uni.previewImage({
					urls: list,
					current: current,
				})
			},
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
	
	.image-list {
		display: flex;
		gap: 10rpx;
		flex-wrap: wrap;
		max-height: 400rpx;
		overflow: auto;
		margin-bottom: 40rpx;
		
		> image {
			width: calc((100% - 30rpx) / 4);
		}
	}
</style>
