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
		}
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
