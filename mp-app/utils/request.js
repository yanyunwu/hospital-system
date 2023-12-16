
export const BASE_URL = process.env.NODE_ENV === 'production'
	? 'xxxx'
	: 'http://localhost:3000'

export default async function (options = {}) {
	const token = uni.getStorageSync('token') 
	
	const data =  await uni.request({
		...options,
		url: BASE_URL + options.url,
		header:{
			"content-type": "application/x-www-form-urlencoded",
			authorization: `Bearer ${token}`
		}
	})
	
	if (data.data.statusCode === 401) {
		uni.showToast({
			icon:'none',
			title:'请先登录！',
			success() {
				uni.clearStorageSync()
				uni.switchTab({
					url:'/pages/self/self'
				})
			}
		})
		return
	}
	
	return data
}