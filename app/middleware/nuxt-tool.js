const { Nuxt, Builder } = require('nuxt')

module.exports = (options, app) => {
	// console.log('egg-nuxt-tool', options, app)
	const { httpProxy = {} } = app.config
	const nuxtRender = new Nuxt(options)
	const isDev = process.env.NODE_ENV !== 'production'
	// if (isDev) {
	// 	new Builder(nuxtRender).build()
	// }
	return async function (ctx, next) {
		let flag = false,
			routerArr = []
		// console.log(7777, flag, ctx.path, ctx.path.indexOf('/java/') > -1)
		// if (ctx.path === '/java/region/getRegion') ctx.path = '/region/getRegion'
		if (!flag) {
			routerArr = app.router.stack.map(el => el.path)
			flag = true
		}
		for (const key in httpProxy) {
			if (ctx.originalUrl.indexOf(key) === 0) return await next()
		}
		for (const route of routerArr) {
			if (typeof route === 'string' && route === ctx.path) return await next()
			const reg = new RegExp(route)
			if (reg.test(ctx.path)) return await next()
		}
		// if (routerArr.some(el => el === ctx.path)) {
		// 	return await next()
		// }
		ctx.status = 200
		ctx.req.session = ctx.session
		const { res, req } = ctx
		return new Promise((resolve, reject) => {
			ctx.res.on('close', resolve)
			ctx.res.on('finish', resolve)
			nuxtRender.render(req, res, promise => {
				promise.then(resolve).catch(reject)
			})
		})
	}
}
