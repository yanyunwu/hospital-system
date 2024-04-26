
export const HOST = process.env.NODE_ENV === 'production'
	? 'hospital.api.yanyun.ltd'
	: 'localhost:3000'
	// : '192.168.1.3:3000'
	// : '10.84.151.246:3000'
	// : 'hospital.api.yanyun.ltd'

export const BASE_URL = `http://${HOST}`
export const BASE_SOCKET_URL = `ws://${HOST}`
export const FAIL_BASE_URL = `http://file.yanyun.ltd`

	
export class MyError extends Error {
	
	constructor(message, options) {
		super(message)
		Object.assign(this, options)
	}
	
}

export default async function (options = {}) {

	const token = uni.getStorageSync('token')
	const uniData =  await uni.request({
		...options,
		url: BASE_URL + options.url,
		header:{
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		}
	})
	
	const data = uniData.data
	
	if (uniData.statusCode === 401) {
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
	
	if (uniData.statusCode === 400 || uniData.statusCode === 500) {
		uni.showToast({
			icon: 'none',
			duration: 3000,
			title: data.message || '未知错误'
		})
		throw new MyError(data.message, data)
	}
	
	return uniData
	
}