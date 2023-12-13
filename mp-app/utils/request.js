
const BASE_URL = process.env.NODE_ENV === 'production'
	? 'xxxx'
	: 'http://localhost:3000'

export default function (options = {}) {
	const token = uni.getStorageSync('token') 
	
	return uni.request({
		...options,
		url: BASE_URL + options.url,
		header:{
			"content-type": "application/x-www-form-urlencoded",
			authorization: `Bearer ${token}`
		}
	})
}