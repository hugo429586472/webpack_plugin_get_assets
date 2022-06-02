const WebpackPluginGetAssets = require('webpack-plugin-get-assets')

module.exports = {
  publicPath: '/',
  outputDir: 'example/dist',
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.plugins.push(new WebpackPluginGetAssets({
      filename: 'version.txt'
    }))
  }
}