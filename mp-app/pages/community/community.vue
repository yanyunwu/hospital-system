<template>
	<view class="container">
		<view class="post" v-for="item in posts" @click="handleClickPost(item)">
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
		
		<view class="post-publish" @click="handleClickPublish">
			<image mode="widthFix" src="../../static/post-publish.png"></image>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				posts: []
			}
		},
		methods: {
			handleClickPost(item) {
				uni.navigateTo({
					url: `/pages/community/post/post?postId=${item.id}`
				})
			},
			
			handleClickPublish() {
				uni.navigateTo({
					url: '/pages/community/publish/publish'
				})
			},
			
			handlePreview(current, list) {
				uni.previewImage({
					urls:list,
					current:current,
				})
			},
			
			getPostList() {
				request({
					url: '/api/community/getPostList'
				}).then(res => {
					console.log('帖子列表', res)
					this.posts = res.data.data.data.map(item => {
						item.avatar = '../../static/touxiang.png'
						return item
					})
				})
			}
		},
		
		onShow() {
			this.getPostList()
		},
		
		onPullDownRefresh() {
			this.getPostList()
		}
	}
</script>


<style scoped lang="less">
	.container {
	  padding: 20px;
	  background-color: #f8f8f8;
	  min-height: 100vh;
	  box-sizing: border-box;
	
	  .post {
	    margin-bottom: 20px;
	    background-color: #ffffff;
	    border-radius: 10px;
	    padding: 15px;
	    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	
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
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3; 
			-webkit-box-orient: vertical;
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
	  
	  .post-publish {
		  position: fixed;
		  right: 50rpx;
		  bottom: 100rpx;
		  width: 100rpx;
		  image {
			  width: 100%;
		  }
	  }
	}

</style>
