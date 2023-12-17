<template>
	<view class="container">
		<view class="post">
			<view class="info">
				<view class="avatar">
					<image mode="widthFix" :src="item.avatar"></image>
				</view>
				<view class="title">
					<view class="name">{{item.user.nickname}}</view>
					<view class="time">{{new Date(item.createTime).toLocaleDateString() + ' ' + new Date(item.createTime).toLocaleTimeString()}}</view>
				</view>
			</view>
			<view class="text">{{item.content}}</view>
			<view class="picture">
				<image @click.stop="handlePreview(imageUrl, item.picture)" mode="widthFix" v-for="imageUrl in item.picture" :src="imageUrl"></image>
			</view>
			<view class="post-info">
				<view class="post-info-base">
					<view>{{item.replies?.length || 0}}评论</view>
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
	import request from '../../../utils/request.js'
	export default {
		data() {
			return {
				id: null,
				item: {
					id: 1,
					avatar: "../../../static/touxiang.png",
					anonymous: false,
					user: {
						nickname: 'xxxx'
					},
					createTime: "2023/10/21",
					content: '加载中...',
					picture: [],
					comments: [],
					views: 0
				}
			};
		},
		
		methods: {
			handlePreview(current, list) {
				uni.previewImage({
					urls:list,
					current:current,
				})
			},
			getPost() {
				if (!this.id) {
					return
				}
				
				request({
					url: '/api/community/getPost',
					data: {
						id: this.id
					}
				}).then(res => {
					console.log('帖子', res)
					this.item = res.data.data
					this.item.avatar = '../../../static/touxiang.png'
				})
			}
		},
		
		onLoad(query) {
			this.id = query.postId
			this.getPost()
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
