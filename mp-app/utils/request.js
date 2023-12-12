
const BASE_URL = process.env.NODE_ENV === 'production'
	? 'xxxx'
	: 'http://localhost:3000'

export default function request (options = {}) {
	return uni.request({
		...options,
		url: BASE_URL + options.url
	})
}