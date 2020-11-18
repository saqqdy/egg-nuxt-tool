'use strict'

const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const NUXT = Symbol('Application#nuxt')
const NUXTBUILD = Symbol('Application#nuxtBuild')

function loadNuxtConfig(config) {
	let { nuxtTool } = config
	try {
		typeof nuxtTool === 'string' && (nuxtTool = require(nuxtTool))
	} catch (e) {
		console.warn('[egg-nuxt-tool] ' + nuxtTool + ' nuxt config file is not exists')
		nuxtTool = {
			// srcDir: path.join(config.baseDir, './client'),
			// rootDir: config.baseDir
		}
		console.warn('[egg-nuxt] default nuxtTool:', JSON.stringify(nuxtTool))
	}
	// Create development build when calling `egg-bin dev`
	// nuxtTool.dev = config.env === 'local'
	return nuxtTool
}

module.exports = {
	get nuxt() {
		if (!this[NUXT]) {
			this[NUXT] = new Nuxt(this.config.nuxtTool)
		}
		return this[NUXT]
	},
	get nuxtBuild() {
		if (!this[NUXTBUILD]) {
			this[NUXTBUILD] = new Builder(this.nuxt)
		}
		return this[NUXTBUILD]
	}
}
