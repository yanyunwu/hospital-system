<template>
	<!-- loading 加载 -->
	<view class="mix-loading-content" v-if="isShow">
		<view class="mix-loading-wrapper">
			<view>

				<image class="mix-loading-icon" src="./icon.png">
				</image>
				<view style="margin-top: 4px;">加载中..</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {

		props: {
			top: {
				//距离顶部距离，单位upx
				type: Number,
				default: 0
			},

		},
		data() {
			return {

				isShow: true

			};
		},

		methods: {

			hideAnimation() {

				this.isShow = false;
			}

		}
	}
</script>

<style>
	.mix-loading-content {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: transparent;

	}

	.mix-loading-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		animation: loading .5s ease-in infinite both alternate;
	}

	.mix-loading-icon {
		width: 80upx;
		height: 80upx;
		transition: .3s;
	}

	@keyframes loading {
		0% {
			transform: translateY(-20upx) scaleX(1);
		}

		100% {
			transform: translateY(4upx) scaleX(1.3);
		}
	}
</style>