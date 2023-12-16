<template>
	<view class="container"> 
		<textarea v-model="content" placeholder="请输入内容吧..."></textarea>
		<view class="operate">
			<view class="operate-top">
				<view class="left">
					<image mode="widthFix" src="../../../static/biaoqing.png"></image>
					<image mode="widthFix" src="../../../static/zhaop.png" @click="handleSelectImage"></image>
				</view>
				<view class="right">
					<view style="margin-right: 50rpx;"><radio style="transform:scale(0.8)" :checked="anonymous" @click="anonymous = !anonymous" /><text>是否匿名</text></view>
					<button type="primary" size="mini" @click="handleSend">发送</button>
				</view>
			</view>
			<view v-if="imageList.length" class="operate-imagelist">
				<image @click="handlePreview(item, imageList)" mode="widthFix" :src="item" v-for="item in imageList"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { BASE_URL } from '../../../utils/request.js'
	export default {
		data() {
			return {
				imageList: [],
				
				// form
				picture: [],
				anonymous: false,
				content: ""
			}
		},
		methods: {
			handleSelectImage() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'],
					success: (res) => {
						console.log(res);
						
						res.tempFilePaths.forEach((item, index) => {
							uni.uploadFile({
								url: `${BASE_URL}/api/file/upload`, //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								success: (uploadFileRes) => {
									this.picture[index] = uploadFileRes.data.data
									console.log(uploadFileRes.data);
								}
							});
						})
						
						this.imageList = [...res.tempFilePaths]
					}
				});
			},
			handlePreview(current, list) {
				uni.previewImage({
					urls:list,
					current:current,
				})
			},
			handleSend() {
				uni.showModal({
					title: "发送帖子",
					content: "确定要发送吗？",
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
		onLoad() {
			uni.enableAlertBeforeUnload({
				message: '你还没有发布，确定要返回吗（内容将丢失）？'
			})
		}
	}
</script>

<style scoped lang="less">
	.container {
		height: 100%;
		box-sizing: border-box;
		background-color: #eee;
		
		textarea {
			box-sizing: content-box;
			height: 50%;
			width: calc(100% - 40rpx);
			padding: 20rpx;
		}
		
		.operate {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			min-height: 50rpx;
			padding-bottom: 50rpx;
			padding-top: 20rpx;
			background-color: white;
			
			&-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.left {
					image {
						width: 50rpx;
						margin: 0 10rpx;
					}
				}
				
				.right {
					font-size: 14px;
					color: #777;
					display: flex;
					align-items: center;
					padding-right: 20rpx;
				}
			}
			
			&-imagelist {
				display: flex;
				gap: 10rpx;
				flex-wrap: wrap;
				max-height: 400rpx;
				overflow: auto;
				
				image {
					width: calc((100% - 30rpx) / 4);
				}
			}
		}
	}
</style>
