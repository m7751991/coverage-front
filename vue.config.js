const { defineConfig } = require('@vue/cli-service')// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? '/coverage-front/dist' : '/',
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }))
  }
})
