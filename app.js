module.exports = app => {
	app.config.coreMiddleware.unshift('nuxtTooL')
	// onBeforeStart
	app.beforeStart(async () => {
		// try {
		//   await app.nuxt.ready()
		//   if (app.config.nuxt.dev) {
		//     await app.nuxtBuild.build()
		//   }
		// } catch (error) {
		//   console.log('[nuxt] Building error', error)
		//   process.exit(1)
		// }
	})
}
