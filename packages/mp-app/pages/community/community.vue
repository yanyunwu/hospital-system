<template>
	<view>
		<view style="margin: ;">
			<zb-tab
			  :activeStyle="{
			    fontWeight: 'bold',
			    transform: 'scale(1.1)'
			    }"
			  :data="list"
			  v-model="activeTab"
			 ></zb-tab>
		</view>
		<view class="container">
			<uni-notice-bar show-icon scrollable text="社区里鼓励真诚地表达、专业地讨论、友善地互动，反对不友善、低质、低俗、抄袭、侵权、虚假认证、恶意营销导流等破坏社区生态的内容与行为，禁止一切违法违规行为。" />
				
			<Loading :loading="loading" />
			
			<Empty  style="margin-top: 40rpx;" v-if="!posts.length && !loading" content="这里还没有相关帖子呢!" />
			
			<view v-if="!loading" class="post" v-for="item in posts" @click="handleClickPost(item)">
				<view class="info">
					<view class="avatar">
						<image mode="widthFix" :src="item.anonymous ? anonymousAvatar : item.user?.avatar"></image>
					</view>
					<view class="title">
						<view class="name">{{item.anonymous ? anonymousName : item.user?.nickname}}
							<image v-if="item.user?.sex === 0" mode="widthFix" style="width: 30rpx;" src="../../static/nan.png"></image>
							<image v-if="item.user?.sex === 1" mode="widthFix" style="width: 30rpx;" src="../../static/nv.png"></image>
						</view>
						<view class="time">{{dayjs(item.createTime).format('YYYY/MM/DD HH:mm:ss')}}</view>
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
				<image mode="widthFix" src="/static/post-publish.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import request from '../../utils/request.js'
	import Loading from '../../components/Loading.vue'
	import Empty from '../../components/Empty.vue'
	export default {
		components: {
			Loading,
			Empty
		},
		data() {
			return {
				loading: false,
				list: [
					{
					    name: '综合',
					    value: 0,
					}, {
					    name: '推荐',
					    value: 1,
					}, {
					    name: '提问',
					    value: 2,
					}, {
					    name: '情感',
					    value: 3,
					},
					{
					    name: '日常分享',
					    value: 4,
					}
				],
				activeTab: 0,
				posts: [],
				anonymousAvatar: "/static/touxiang.png",
				anonymousName: "匿名用户"
			}
		},
		watch: {
			activeTab() {
				this.getPostList()
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
				
				this.loading = true
				
				if (this.activeTab === 1) {
					return request({
					url: '/api/recommend/getRecommend',
				}).then(res => {
					console.log('帖子列表', res)
					this.loading = false
					this.posts = res.data.data.data
				}).finally(() => {
					this.loading = false
				}
				)
				}
				
				return request({
					url: '/api/community/getPostList',
					data: {
						type: this.activeTab
					}
				}).then(res => {
					console.log('帖子列表', res)
					this.loading = false
					this.posts = res.data.data.data
				}).finally(() => {
					this.loading = false
				}
				)
			},
			
			dayjs(...args) {
				return dayjs(...args)
			}
		},
		
		onLoad() {
			this.getPostList()
		},
		
		onPullDownRefresh() {
			this.getPostList().then(() => {
				uni.showToast({
					icon: 'none',
					title: '刷新成功！',
					duration: 500
				})
				uni.stopPullDownRefresh()
			})
		}
	}
</script>


<style scoped lang="less">
	.container {
	  padding: 20px;
	  background-color: #f8f8f8;
	  min-height: 100vh;
	  box-sizing: border-box;
	  padding-top: 10px;
	  
	  .intro {
		  background-color: skyblue;
		  color: white;
		  word-wrap:break-word;
		  word-break:normal; 
		  padding: 20rpx;
		  margin-bottom: 10px;
		  border-radius: 20rpx;
	  }
	
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
			word-break: break-all;
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
