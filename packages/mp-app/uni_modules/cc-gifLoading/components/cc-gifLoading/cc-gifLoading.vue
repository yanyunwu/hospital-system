<template>
<view class="loading">
  <view class="bg-white">
    <image :src="gifSrc" mode="aspectFit"
	></image>
	<text>加载中</text>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
	  // gif地址
	  gifSrc:{
		  type: String,
		  default:''
	  }
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.loading{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #a3a3a3;
  opacity: 0.99;
 
  
}
.bg-white{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bg-white image{
  width: 36px;
  height: 36px;
  display: block;
  margin-top: -20px;
  
 
}

.bg-white text{
  
  margin-top: 20px;
 
}
</style>