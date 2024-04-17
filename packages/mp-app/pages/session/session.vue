<template>
    <view>
        <uni-segmented-control :values="['消息', '通知']" @clickItem="onClick" style="width: 100%;border-radius: 0;"></uni-segmented-control>
        <view v-if="activeTab === 0" class="content">
			<uni-swipe-action>
				<uni-swipe-action-item  v-for="(item, index) in messages" :right-options="options" @click="handleDelMessage($event, item.id)">
					<view class="info" :key="index" @click="handleClickItem(item.id)">
						<view class="avatar">
							<image mode="widthFix" :src="item.adminUser?.avatar"></image>
						</view>
						<view class="title">
							<view class="name">{{item.adminUser?.nickname}}</view>
							<view class="time">{{item.lastMessage}}</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
        </view>
        <view v-if="activeTab === 1" class="content">
            <view class="notification" v-for="(item, index) in notifications" :key="index">
                <text>{{ item }}</text>
            </view>
        </view>
    </view>
</template>

<script>
	import request from '@/utils/request.js'
	let timer
export default {
    data() {
        return {
            activeTab: 0,
            messages: [],
            notifications: ['通知1', '通知2', '通知3'],
			options:[
			        {
			            text: '取消',
			            style: {
			                backgroundColor: '#007aff'
			            }
			        }, {
			            text: '删除',
			            style: {
			                backgroundColor: '#dd524d'
			            }
			        }
			      ]
        }
    },
    methods: {
        onClick(e) {
			console.log(e)
            this.activeTab = e.currentIndex;
        },
		
		handleClickItem(id) {
			uni.navigateTo({
				url: `/pages/chat/chat?sessionId=${id}`
			})
		},
		
		handleDelMessage(e, id) {
			if (e.content.text === '删除') {
				request({
					url: '/api/session/delSession',
					method: 'post',
					data: {
						sessionId: id
					}
				}).then(res => {
					console.log('delSession', res)
					this.getUserSessionList()
				})
			}			
		},
		
		
		getUserSessionList() {
			request({
				url: '/api/session/getUserSessionList'
			}).then(res => {
				console.log('getUserSessionList', res)
				this.messages = res.data.data
			})
		}
    },
	onShow() {
		this.getUserSessionList()
		timer = setInterval(() => {
			this.getUserSessionList()
		}, 1000)
	},
	onUnload() {
		clearInterval(timer)
	},
	onHide() {
		clearInterval(timer)
	}
}
</script>

<style lang="less" scoped>
.content {
    padding: 20px;
}
.message, .notification {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f8f8f8;
}
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
.name, .text {
    margin-left: 10px;
}

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
			  padding-left: 10px;
	        }
	      }
	    }
</style>
