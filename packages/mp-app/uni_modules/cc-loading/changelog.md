## 1.0.0（2023-06-18）

#### 使用方法 
```使用方法
		
	
<!-- ref:唯一ref  top：距离中间顶部距离 -->
		
<cc-loading ref="mixLoad" :top="0"></cc-loading> 


// 隐藏动画
this.$refs.mixLoad.hideAnimation();		
					
```

#### HTML代码部分
```html

<template>
	<view class="content">

		<!-- ref:唯一ref  top：距离中间顶部距离 -->
		<cc-loading ref="mixLoad" :top="0"></cc-loading> 




	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				

			}
		},

		mounted() {

			let mythis = this;
			setTimeout(function() {

				mythis.goHideAnimation();

			}, 6000);

		},
		methods: {

			goHideAnimation() {

				console.log('隐藏动画');
				this.$refs.mixLoad.hideAnimation();
			}

			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;

	}

	.shareView {

		margin-top: 60px;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: antiquewhite;


		align-self: center;
	}
</style>


```

