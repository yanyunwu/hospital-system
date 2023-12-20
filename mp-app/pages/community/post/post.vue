<template>
	<view class="container">
		<view class="post">
			<view class="info">
				<view class="avatar">
					<image mode="widthFix" :src="item.anonymous ? anonymousAvatar : item.avatar"></image>
				</view>
				<view class="title">
					<view class="name">{{item.anonymous ? anonymousName : item.user.nickname}}
						<image v-if="item.user.sex === 0" mode="widthFix" style="width: 30rpx;" src="../../../static/nan.png"></image>
						<image v-if="item.user.sex === 1" mode="widthFix" style="width: 30rpx;" src="../../../static/nv.png"></image>
					</view>
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
		
		<view class="reply-list" v-if="list.length">
			<view v-for="item in list">
				<view class="info">
					<view class="avatar">
						<image mode="widthFix" :src="anonymousAvatar"></image>
					</view>
					<view class="title">
						<view class="name">{{item.user.nickname}}</view>
						<view class="time">{{new Date(item.createTime).toLocaleDateString() + ' ' + new Date(item.createTime).toLocaleTimeString()}}</view>
					</view>
				</view>
				<view class="text">{{item.content}}</view>
			</view>
		</view>
		
		<view class="reply">
			<view class="input"><input placeholder="请发表你的言论吧..." v-model="replyValue"/></view>
			<view><button type="primary" size="mini" @click="handSendReply">回复</button></view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js'
	export default {
		data() {
			return {
				anonymousAvatar: "../../../static/touxiang.png",
				anonymousName: "匿名用户",
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
				},
				
				replyValue: '',
				
				list: [
				]
			};
		},
		
		methods: {
			handlePreview(current, list) {
				uni.previewImage({
					urls: list,
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
					this.list = this.item.replies
					this.item.avatar = '../../../static/touxiang.png'
				})
			},
			handSendReply() {
				request({
					url: '/api/community/addPostReply',
					method: 'post',
					data: {
						postId: this.id,
						content: this.replyValue
					}
				}).then(res => {
					console.log('新增帖子回复', res)
					uni.showToast({
						title: '回复成功！',
						icon: 'none'
					})
					this.replyValue = ''
					this.getPost()
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
	  overflow: hidden;
	
	  .post {
	    margin-bottom: 10px;
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
		  display: flex;
		  position: fixed;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  background-color: white;
		  justify-content: space-around;
		  align-items: center;
		  padding: 10rpx 0;
		  padding-bottom: 50rpx;
		  border-top: 1px solid #eee;
		  .input {
			  width: 550rpx;
			  height: 80rpx;
			  background-color: #eee;
			  input {
				  height: 60rpx;
				  padding: 10rpx;
			  }
			  border-radius: 20rpx;
		  }
	  }
	  
	  .reply-list {
		  margin-top: 1px;
		  background-color: white;
		  padding: 15px;
		  margin-bottom: 150rpx;
		  .info {
		    display: flex;
		    align-items: center;
		    margin-bottom: 15px;
		  	
		    .avatar {
		      width: 40px;
		      height: 40px;
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
		        font-size: 16px;
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
			padding: 0 10rpx;
		  }
	  }
	}

</style>
