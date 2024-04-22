
export const HOST = process.env.NODE_ENV === 'production'
	? 'hospital.api.yanyun.ltd'
	// : 'localhost:3000'
	// : '192.168.1.3:3000'
	// : '10.84.151.246:3000'
	: 'hospital.api.yanyun.ltd'

export const BASE_URL = `http://${HOST}`
export const BASE_SOCKET_URL = `ws://${HOST}`

export default async function (options = {}) {
	const token = uni.getStorageSync('token') 
	const data =  await uni.request({
		...options,
		url: BASE_URL + options.url,
		header:{
			'Content-Type': 'application/json',
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