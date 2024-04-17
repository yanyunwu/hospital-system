<template>
	<view class="container">
		<view class="chat_message_list">
			<scroll-view class="scroll-view" scroll-y="true" style="height: 100%" 
				:scroll-top="scrollTop"  scroll-with-animation="true">
				<view class="official-content">
					<view style="padding: 10px;">
						<view class="intro">
							{{intro}}
						</view>
					</view>
					<view v-for="item in messageList" >
						<!-- <template :key="item.id"> -->
							<view v-if="item.speakUserType === 0" class="chat_message_item chat_message_self">
								<image :src="sessionInfo.user?.avatar" class="avatar"  style="float: right;"></image>
								<view style="margin-right: 100rpx;">
									<view><text>{{sessionInfo.user?.nickname}}</text></view>
									<view style="display: flex;">
										<view class="chat_message_text">
											{{item.content}}
										</view>
									</view>
								</view>
							</view>
							
							<view v-else-if="item.speakUserType === 1" class="chat_message_item chat_message_other">
								<image :src="sessionInfo.adminUser?.avatar" class="avatar" style="float: left;"></image>
								<view style="margin-left: 100rpx;">
									<view><text>{{sessionInfo.adminUser?.nickname}}</text></view>
									<view style="display: flex;">
										<view class="chat_message_text" style="margin-left: 0;">
											{{item.content}}
										</view>
									</view>
								</view>
							</view>
							
							<view v-else class="message_system">
								<view>
									{{item.content}}
								</view>
							</view>
						<!-- </template> -->
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="chat_send" >
			<view>
				<view class="chat_send_input">
					<input type="text" v-model="waitMsg" />
				</view>
				<image mode="widthFix" src="../../static/biaoqing.png"></image>
				<image mode="widthFix" src="../../static/fasong.png" @click="handleSendMessage"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import io from '@hyoga/uni-socket.io';
	import { nextTick } from 'vue';
	import request, { BASE_SOCKET_URL } from '../../utils/request.js'
	
	let socket

	export default {
		data() {
			return {
				sessionId: null,
				messageList: [],
				selfimg: "../../static/touxiang.png",
				scrollTop: 0,
				endId:"",
				bottomHeight: "",
				scrollTo: "",
				waitMsg: "",
				 scrollTop: 0, //滚动条位置
				scrollHeight: 0, // 滚动视图的高度
				sessionInfo: {},
				
				
				intro: `您已成功进入会话聊天，请耐心等待医生回复，退出界面会话依然有效。您可以在首页的消息页面查看，也可先留言讲述你的问题。`
			}
		},
		methods: {
			handleSendMessage() {
				socket?.send({
					sessionId: this.sessionId,
					text: this.waitMsg,
				})
				
				this.waitMsg = ""
			},
			initScrollHeight() {
			            uni.createSelectorQuery()
			                .in(this)
			                .select('.scroll-view')
			                .boundingClientRect(data => {
			                    if (data) {
			                        this.scrollHeight = data.height
									this.initContentHeight()
			                    }
			                })
			                .exec();
			        },
			// 获取内容高度
			initContentHeight() {
				uni.createSelectorQuery()
					.in(this)
					.select('.official-content')
					.boundingClientRect(data => {
						if (data) {
							let top = data.height - this.scrollHeight;
							console.log('datadatadata', top, data.height)
							if (top > 0) {
								this.scrollTop = top;
							}
						}
					})
					.exec();
			},
			initSocket() {
				const token = uni.getStorageSync('token')
				
				socket = io(BASE_SOCKET_URL,  {
				  query: {token: `${token}`},
				  transports: [ 'websocket', 'polling' ],
				  timeout: 5000,
				});
				
				socket.on('connect', () => {
					console.log('ws 已连接');
				});
				
				socket.on('error', (msg) => {
					console.log('ws error', msg);
				});
						
				socket.on('message', (message) => {
					console.log('message', message)
					if (message.liveChat.id !== this.sessionId) {
						return 
					}
					
					this.messageList.push(message)
					setTimeout(() => {
						this.initContentHeight()
					}, 1)
				})
				
				socket?.on('message_ok', (message) => {
					this.messageList.push(message)
					console.log('message', message)
					setTimeout(() => {
						this.initContentHeight()
					}, 1)
				})
			},
			
			getMessageList() {
				request({
					url: '/api/admin/session/getSessionMessageList',
					data: {
						id: this.sessionId
					}
				}).then(value => {
					this.messageList = value.data.data
					console.log('getMessageList', value)
				})
			},
			
			getSessionInfo() {
				request({
					url: '/api/admin/session/getOneSessionInfo',
					data: {
						id: this.sessionId
					}
				}).then(value => {
					const { data: uniData } = value
					this.sessionInfo = uniData.data
					console.log('getSessionInfo', value)
				})
			}
		},
		 mounted() {
			// 先获取滚动视图的高度
			this.initScrollHeight();
		},
		onLoad(query) {
			const sessionId = parseInt(query.sessionId)
			this.sessionId = sessionId
			this.initSocket()
			this.getSessionInfo()
			this.getMessageList()
		},
		onUnload() {
			socket?.close()
		}
	}
</script>

<style lang="less" scoped>
		
	.container {
		height: 100%;
		position: relative;
		
		.intro {
		  background-color: skyblue;
		  color: white;
		  word-wrap:break-word;
		  word-break:normal; 
		  padding: 20rpx;
		  border-radius: 20rpx;
		}
	}
	
	.chat_message_list {
		position: absolute;
		bottom: 100rpx;
		left: 0;
		right: 0;
		top: 0;
		background-color: #F1F1F1;
		padding-bottom: 20rpx;
	}
	
	.chat_message_item {
		padding: 10rpx 15rpx;
	}
	
	.chat_message_item .chat_message_text {
		background-color: white;
		border-radius: 10rpx;
		line-height: 60rpx;
		padding: 5rpx 20rpx;
		margin-top: 15rpx;
		word-break:break-all;
		margin-left: auto;
		overflow: hidden;
	}
	
	.chat_message_self>view {
		margin-right: 20rpx;
	}
	
	.chat_message_self>view>view:first-child {
		text-align: right;
	}
	
	
	.chat_message_other>view {
		margin-left: 20rpx;
	}
	
	.chat_message_self {
		flex-direction: row-reverse;
	}
	
	
	.chat_message_other {

	}
	
	.chat_send {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding-top: 5rpx;
		padding-bottom: 25rpx;
		background-color: #eee;
		box-shadow: 0 1px 1px 1px #ddd;
	}
	
	.chat_send > view {
		display: flex; 
		align-items: center;
		margin: 0 10rpx;
	}
	
	.chat_send > view > image {
		width: 50rpx;
		margin-right: 10rpx;
	}
	
	.chat_send .chat_send_input {
		height: 75rpx;
		background-color: white;
		flex: 1;
		margin: 0 10rpx;
		border-radius: 20rpx;
	}
	
	.chat_send input {
		height: 100%;
		line-height: 30rpx;
		padding: 0 10rpx;
	}
	
	.chat_popup {
		width: 350rpx;
		background-color: white;
		padding: 20rpx;
		text-align: center;
		border-radius: 20rpx;
	}
	.chat_popup button {
		margin: 10rpx;
	}
	
	.message_system {
		overflow: hidden;
	}
	
	.message_system > view{
		margin: 30rpx 20%;
		background-color: rgba(0, 0, 0, .5);
		color: white;
		border-radius: 10rpx;
		text-align: center;
	}
	
	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 1000px;
	}

</style>
