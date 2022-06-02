const pluginName = 'WebpackPluginGetAssets'; // 插件名称，必须是独一无二的
const fs = require('fs-extra');
const path = require('path');
const { validate } = require('schema-utils');
const schema = require('./schema.json');
// 默认参数
const defaultDefinitions = {
  filename: 'assets.txt'
}

class Plugin {
  constructor(definitions) {
    // 校验参数
    validate(schema, definitions, { name: pluginName })
    this.definitions = { ...defaultDefinitions, ...definitions }
  }
  apply (compiler) {
    const definitions = this.definitions
    if (!compiler.hooks || !compiler.hooks.done) {
      // webpack3
      compiler.plugin('emit', function(compilation, callback) {
        const content = Object.keys(compilation.assets).reduce((acc, key) => {
          acc += `${key}\n`
          return acc
        })
        // 获取输出路径，如没传入，则使用 webpack 的 output.path
        const outputPath = definitions.path || compilation.outputOptions.path
        // 输出文件
        fs.outputFile(path.resolve(outputPath, definitions.filename), content)
        callback()
      })
    } else {
      // webpack4+
      compiler.hooks.done.tap(pluginName, (stats) => {
        const { assets, outputOptions } = stats.compilation
        // 拼接文本
        const content = Object.keys(assets).reduce((acc, key) => {
          acc += `${key}\n`
          return acc
        }, '')
        // 获取输出路径，如没传入，则使用 webpack 的 output.path
        const outputPath = definitions.path || outputOptions.path
        // 输出文件
        fs.outputFile(path.resolve(outputPath, definitions.filename), content)
      })

    }
  }
}

module.exports = Plugin
