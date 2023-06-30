<div style="text-align: center;" align="center">

# egg-nuxt-tool

An egg plugin for using nuxt render programatically

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## Install

```bash
# use pnpm
$ pnpm install egg-nuxt-tool

# use yarn
$ yarn add egg-nuxt-tool
```

## Usage

```js
// {app_root}/config/plugin.js
exports.nuxt = {
  enable: true,
  package: 'egg-nuxt-tool'
}
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.nuxt = {
  whitePath: [/^\/java\//, '/public', '/graphql'], // whiteList
  ...nuxtConfig // nuxtConfig
  // ...
}
```

see [config/config.default.js](config/config.default.js) for more detail.

## Change logs

[Change logs](./CHANGELOG.md)

## Questions & Suggestions

Please open an issue [here](https://github.com/saqqdy/egg-nuxt-tool/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/egg-nuxt-tool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-nuxt-tool
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/egg-nuxt-tool/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/egg-nuxt-tool&utm_campaign=Badge_Grade
[snyk-image]: https://snyk.io/test/npm/egg-nuxt-tool/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-nuxt-tool
[download-image]: https://img.shields.io/npm/dm/egg-nuxt-tool.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-nuxt-tool
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_egg-nuxt-tool
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_egg-nuxt-tool
