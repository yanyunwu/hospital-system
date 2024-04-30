<template>
	<view :class="`container ${display}`">
		<view class="avatar-content">
			<image class="avatar" :src="avatar"></image>
		</view>
		<view class="message-content">
			<view class="message-top">
				<uni-tag v-if="showTag" text="机器人" size='mini' type="success" style="margin-right: 10rpx;" />
				<text class="name">{{name}}</text>
			</view>
			<view class="message" :style="`background-color: ${contentColor};color: ${color}`">
				<text space='nbsp'>{{content}}</text>
				<image v-if="loading" style="width: 20rpx;height: 20rpx; margin-left: 5rpx;" src="/static/loading.gif"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"UserMessage",
		props: {
			avatar: {
				type: String,
			},
			name: {
				type: String
			},
			content: {
				type: String
			},
			showTag: {
				type: Boolean,
				default: false
			},
			contentColor: {
				type: String,
				default: 'skyblue'
			},
				
			color: {
				type: String,
				default: 'white'
			},
			display: {
				// left | right
				type: String,
				default: 'left'
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
	}
</script>

<style lang="less" scoped>
	
	.container {
		display: flex;
		
		
		.avatar-content {
			width: 80rpx;
			.avatar {
				width: 80rpx;
				height: 80rpx;
				
				border-radius: 10rpx;
			}
		}
		
		.message-content {
			.message-top {
				display: flex;
				align-items: center;
				margin-bottom: 15rpx;
				padding-top: 5rpx;
				
				.name {
					font-size: 13px
				}
			}
			
			.message {
				border-radius: 10rpx;
				padding: 15rpx;
				font-size: 14px;
				word-break: break-all;
				line-height: 1.5;
			}
		}
		
		
	}
	
	
	.left {
		.avatar-content {
			padding-right: 20rpx;
		}
		
	}
	
	.right {
		flex-direction: row-reverse;
		.avatar-content {
			padding-left: 20rpx;
		}
		
		.message-content {
			.message-top {
				justify-content: flex-end;
			}
		}
	}
</style>