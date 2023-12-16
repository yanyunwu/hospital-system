<template>
	<view class="container">
		<view class="post">
			<view class="info">
				<view class="avatar">
					<image mode="widthFix" :src="item.avatar"></image>
				</view>
				<view class="title">
					<view class="name">{{item.name}}</view>
					<view class="time">{{item.time}}</view>
				</view>
			</view>
			<view class="text">{{item.content}}</view>
			<view class="picture">
				<image @click.stop="handlePreview(imageUrl, item.picture)" mode="widthFix" v-for="imageUrl in item.picture" :src="imageUrl"></image>
			</view>
			<view class="post-info">
				<view class="post-info-base">
					<view>{{item.comments}}评论</view>
					<view>{{item.views}}浏览</view>
				</view>
			</view>
		</view>
		
		<view class="reply">
			<input />
			<button>回复</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
						id: 1,
						avatar: "../../../static/touxiang.png",
						anonymous: false,
						name: "周杨杰",
						time: "2023/10/21",
						content: '这样，您就可以将 NestJS 配置为静态资源服务器，并通过 URL 访问图片了。请注意，如果您在 URL 中使用的文件名或路径包含非 ASCII 字符，可能需要对其进行编码。',
						picture: [
						  'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
						  'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
						  'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
						  'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
						],
						comments: 0,
						views: 22
					}
			};
		},
		
		methods: {
			handlePreview(current, list) {
				uni.previewImage({
					urls:list,
					current:current,
				})
			}
		},
		
		onLoad() {
			
		}
	}
</script>

<style lang="less" scoped>
	.container {
	  background-color: #f8f8f8;
	  min-height: 100vh;
	  box-sizing: border-box;
	
	  .post {
	    margin-bottom: 20px;
	    background-color: #ffffff;
	    padding: 15px;
	
	    .info {
	      display: flex;
	      align-items: center;
	      margin-bottom: 15px;
	
	      .avatar {
	        width: 50px;
	        height: 50px;
	        border-radius: 50%;
	        overflow: hidden;
	
	        image {
	          width: 100%;
	          height: 100%;
	          object-fit: cover;
	        }
	      }
	
	      .title {
	        margin-left: 10px;
	
	        .name {
	          font-size: 18px;
	          color: #333;
	        }
	
	        .time {
	          font-size: 14px;
	          color: #999;
	        }
	      }
	    }
	
	    .text {
	      font-size: 16px;
	      color: #333;
	      line-height: 1.5;
	      margin-bottom: 15px;
	    }
	
	    .picture {
	      display: flex;
	      justify-content: flex-start;
		  flex-wrap: wrap;
		  width: 100%;
		  gap: 15rpx;
		  margin-bottom: 15px;
	      image {
	        width: calc((100% - 30rpx) / 3);
	        object-fit: cover;
			min-width: 50rpx;
	      }
	    }
	
	    .post-info {
	      display: flex;
	      justify-content: space-between;
	      align-items: center;
	      font-size: 14px;
	      color: #999;
	
	      .post-info-base {
	        display: flex;
	
	        view {
	          margin-right: 10px;
	        }
	      }
	    }
	  }
	  
	  .reply {
		  position: fixed;
		  bottom: 0;
	  }
	}

</style>
