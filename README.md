# WepackPluginGetAssets

A webpack plugin of getting built assets

## Dependency

- webpack3+ || webpack4+ || webpack5+

## Support

- [x] Export resources to the specified file.
- [ ] Custom output format

## Usage

```js
module.exports = {
  ...
  plugins: [
    new WebpackGetFileNamePlugin({
      filename: "version.txt"
    })
    ...
  ]
}
```

## Reference

<https://github.com/xuwenchao66/webpack-plugin-practice>
