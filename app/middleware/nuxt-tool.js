const { Nuxt, Builder } = require('nuxt')
const getType = require('js-cool/lib/getType')

module.exports = (options, app) => {
	const { static: staticSrc = {} } = app.config
	let { whitePath = [] } = options
	const nuxtRender = new Nuxt(options)
	// const isDev = process.env.NODE_ENV !== 'production'
	// if (isDev) {
	// 	new Builder(nuxtRender).build()
	// }
	return async function (ctx, next) {
		let flag = false,
			whitePathType = getType(whitePath),
			routerArr = []
		if (whitePathType === 'string') whitePath = [whitePath]
		// whiteList go next
		for (let src of whitePath) {
			const srcType = getType(src)
			if (srcType === 'string' && ctx.originalUrl.indexOf(src) === 0) return await next()
			else if (srcType === 'regexp' && src.test(ctx.originalUrl)) return await next()
		}
		// router path
		if (!flag) {
			routerArr = app.router.stack.map(el => el.path)
			flag = true
		}
		// single static path
		if (staticSrc.prefix && ctx.path.indexOf(staticSrc.prefix) === 0) return await next()
		// muti static path
		if (staticSrc.dir) {
			for (let dir of staticSrc.dir) {
				if (dir.prefix && dir.prefix !== '/' && ctx.path.indexOf(dir.prefix) === 0) return await next()
			}
		}
		// router path
		for (const route of routerArr) {
			if (typeof route === 'string' && route === ctx.path) return await next()
			try {
				const reg = new RegExp(route)
				if (reg.test(ctx.path)) return await next()
			} catch (e) {
				throw e
			}
		}
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
