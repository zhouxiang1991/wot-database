// const path = require('path')

// const webpack = require('webpack')
// const { getCssVar } = require('./script/cssVarHelper')

// const CopyWebpackPlugin = require('copy-webpack-plugin')

// console.log(webpack.Compiler.hooks)
const publicPath = '/'

// const api = `${publicPath}api`
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = {
  lintOnSave: true,
  publicPath,

  // outputDir: 'lib',
  // filenameHashing: false,
  chainWebpack (config) {
    // config.plugin('analyzer').use(BundleAnalyzerPlugin).end()
    // config.module.rules.store.get('js').exclude.store.add(/axios/)
    // config.entry('app').clear()
    //   .add('./test/main.js')
    //   .end()
    const FILE_RE = /\.(vue|js|ts|svg)$/

    config.module.rule('svg').issuer((file) => !FILE_RE.test(file))
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .issuer((file) => FILE_RE.test(file))
      .use('svg-sprite')
      .loader('svg-sprite-loader')

    // config.module
    //   .rule('css-var')
    //   .test(/\.(vue|js|css)$/)
    //   .use('cssVar')
    //   .loader(path.resolve('loader/css/cssVar.js'))
    //   .options({ cssVar: getCssVar() })

    // config.module
    //   .rule('iview')
    //   .test(/\.js$/)
    //   .include
    //   .add(/iview(\\|\/)src/)
    //   .end()
    //   .exclude
    //   .add(/iview(\\|\/)src(\\|\/)utils(\\|\/)date/)
    //   .end()
    //   .use('babel')
    //   .loader('babel-loader')
    //   .options({
    //     presets: [
    //       [
    //         '@babel/preset-env',
    //         { modules: false },
    //       ],
    //     ],
    //   })

    // config.plugin('vendor').use(webpack.DllReferencePlugin, [{ manifest: require(path.resolve('manifest/vendor.json')) }])
  },

  // devServer: {
  //   port: 8080,
  //   disableHostCheck: true,
  //   proxy: { 'svs-data-center-apps': { target: process.env.VUE_APP_DEV_SERVER } },
  // },
}
