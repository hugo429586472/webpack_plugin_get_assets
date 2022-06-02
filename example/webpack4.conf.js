const path = require('path')
const WebpackPluginGetAssets = require('webpack-plugin-get-assets')

const resolve = (...args) => path.resolve(process.cwd(), ...args)

module.exports = {
  mode: 'production',
  output: {
    path: resolve('example/webpack4'),
    filename: 'bundle.js'
  },
  entry: resolve('example/index.js'),
  // 增加一个plugins
  plugins: [
    new WebpackPluginGetAssets({
      filename: "version.txt"
    })
  ],
}