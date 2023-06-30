// const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const NUXT = Symbol('Application#nuxt')
const NUXT_BUILD = Symbol('Application#nuxtBuild')

function loadNuxtConfig(config) {
	let { nuxt } = config
	try {
		typeof nuxt === 'string' && (nuxt = require(nuxt))
	} catch (e) {
		console.warn('[egg-nuxt-tool] ' + nuxt + ' nuxt config file is not exists')
		nuxt = {
			// srcDir: path.join(config.baseDir, './client'),
			// rootDir: config.baseDir
		}
		console.warn('[egg-nuxt] default nuxt:', JSON.stringify(nuxt))
	}
	// Create development build when calling `egg-bin dev`
	// nuxt.dev = config.env === 'local'
	return nuxt
}

// function loadNuxtConfig(config) {
// 	let options = config.nuxt
// 	try {
// 		typeof options === 'string' && (options = require(options))
// 	} catch (e) {
// 		console.warn('[egg-nuxt] ' + options + ' nuxt config file is not exists')
// 		options = {
// 			srcDir: path.join(config.baseDir, './resources'),
// 			rootDir: config.baseDir
// 		}
// 		console.warn('[egg-nuxt] default options:', JSON.stringify(options))
// 	}
// 	// Create development build when calling `egg-bin dev`
// 	options.dev = config.env === 'local'
// 	return options
// }

module.exports = {
	get nuxt() {
		if (!this[NUXT]) {
			// this[NUXT] = new Nuxt(this.config.nuxt)
			this[NUXT] = new Nuxt(loadNuxtConfig(this.config))
		}
		return this[NUXT]
	},
	get nuxtBuild() {
		if (!this[NUXT_BUILD]) {
			this[NUXT_BUILD] = new Builder(this.nuxt)
		}
		return this[NUXT_BUILD]
	}
}
