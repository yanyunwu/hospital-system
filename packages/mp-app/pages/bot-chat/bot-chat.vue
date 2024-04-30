<template>
	<view class="container">
		<view class="top-container">
			<view class="message-list" >
				<view v-for="item in messageList" class="message-item">
					<UserMessage v-if="item.type === 'user'" display="right" :avatar="item.avatar" :name="item.nickname" :content="item.content" content-color="#007aff" />
					<UserMessage v-if="item.type === 'assistant'" display="left" :avatar="item.avatar" :name="item.nickname" :content="item.content" content-color="white" color="black" :loading="item.loading"/>
				</view>
			</view>
		</view>
		
		<view class="chat_send" >
			<view>
				<view class="chat_send_input">
					<input :disabled="loading" type="text" v-model="waitMsg" :placeholder="loading ? '正在回复中...' :'请输入你想发送的消息吧...'"/>
				</view>
				<image mode="widthFix" src="/static/fasong.png" @click="handleSendMessage"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { fetchEventSource } from '@microsoft/fetch-event-source'
	import request, {BASE_URL} from '@/utils/request.js'
	import UserMessage from '@/components/UserMessage.vue'
	export default {
		components: { UserMessage },
		data() {
			return {
				chatID: null,
				waitMsg: '',
				sessionInfo: {},
				messageList: [
				
				],
				loading: false,
			}
		},
		
		methods: {
			handleSendMessage() {
				if (!this.waitMsg) {
					uni.showToast({
						icon: 'none',
						title: '不能发送空消息哦！'
					})
					return
				}
				
				this.addMessage({
					content: this.waitMsg,
					type: 0,
					onSuccess: () => {
						this.messageList.push({
							avatar: this.sessionInfo.user?.avatar,
							nickname: this.sessionInfo.user?.nickname,
							content: this.waitMsg,
							type: "user"
						})
						this.requestBot(this.waitMsg)
						this.waitMsg = ''
					}
				})
			},
			
			addMessage({ content, type, onSuccess }) {
				request({
					url: '/api/session/addMessage',
					method: "post",
					data: {
						liveChatId: this.chatID,
						content: content,
						type: type
					}
				}).then(() => {
					onSuccess?.()
				})
			},
			
			getSessionInfo() {
				request({
					url: '/api/admin/session/getOneSessionInfo',
					data: {
						id: this.chatID
					}
				}).then(value => {
					const { data: uniData } = value
					this.sessionInfo = uniData.data
					this.getMessageList()
				})
			},
			
			getMessageList() {
				
				const map = {
					[0]: 'user',
					[1]: 'assistant'
				}
				
				const info_map = {
					[0]: {
						avatar: this.sessionInfo.user?.avatar,
						nickname: this.sessionInfo.user?.nickname
					},
					[1]: {
						avatar: this.sessionInfo.adminUser?.avatar,
						nickname: this.sessionInfo.adminUser?.nickname
					}
				}
				
				request({
					url: '/api/admin/session/getSessionMessageList',
					data: {
						id: this.chatID
					}
				}).then(value => {
					const uniData = value.data
					this.messageList = (uniData.data || []).map(item => {
						return {
							avatar: info_map[item.speakUserType]?.avatar,
							nickname: info_map[item.speakUserType].nickname,
							content: item.content,
							type: map[item.speakUserType]
						}
					})
					console.log('getMessageList', value)
				})
			},
			
			requestBot(message) {
				this.messageList.push({
					avatar: this.sessionInfo.adminUser?.avatar,
					nickname: this.sessionInfo.adminUser?.nickname,
					content: '',
					type: "assistant",
					loading: true
				})
				
				this.loading = true
				
				const lastMessage = this.messageList[this.messageList.length - 1]
				
				
				 fetchEventSource(`${BASE_URL}/api/model/chat`, {
				      method: 'post',
				      headers: {
				        'Content-Type': 'application/json',
				      },
					  body: JSON.stringify({
							message
						}),
				      onmessage: (ev) => {
							
						if (ev.data === '[DONE]') {
							lastMessage.loading = false
							this.loading = false
							this.addMessage({ content: lastMessage.content, type: 1 })
							return
						}
						  
						const data = JSON.parse(ev.data)
						const choice = data.choices[0]
						if (choice.delta?.content) {
							lastMessage.content += choice.delta.content
						}
						
				        console.log('onmessage', ev)
				      },
				      onerror(event) {
				        // 服务异常
				        console.log('服务异常', event)
				      }
				    })
			}
		},
		
		
		
		onLoad(query) {
			this.chatID = query.chatID && parseInt(query.chatID)
			this.getSessionInfo()
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background-color: #F1F1F1;
		height: 100%;
		overflow: auto;
		.top-container {
			padding-bottom: 100rpx;
			.message-list {
				padding: 30rpx;
				.message-item:not(:last-child) {
					margin-bottom: 30rpx;
				}
			}
		}
	}
	
	.chat_send {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 10rpx;
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
		width: 40rpx;
		margin: 0 10rpx;
	}
	
	.chat_send .chat_send_input {
		height: 65rpx;
		background-color: white;
		flex: 1;
		margin: 0 10rpx;
		border-radius: 10rpx;
	}
	
	.chat_send input {
		height: 100%;
		line-height: 30rpx;
		padding: 0 10rpx;
	}
</style>
