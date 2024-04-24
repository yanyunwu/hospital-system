<script>
	import request from './utils/request.js'
	export default {
		data() {
			return {
				token: ""
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		 mounted() {
		    document.body.style.overflow = 'hidden';
		    document.body.style.overscrollBehavior = 'none';
		  },
	}
</script>

<style>
	/*每个页面公共css */
	page {
		height: 100%;
	}
	
	image {
		height: auto;
	}
</style>
