const {smart} = require('webpack-merge')
const base = require('./webpack.config.base')
const apiMocker = require('mocker-api')
const path = require('path')
const webpack = require('webpack')

module.exports = smart(base,{
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
        DEV: JSON.stringify('dev'), //字符串
        FLAG: 'true' //FLAG 是个布尔类型
    })
  ],
  devServer: {
    port: '3020',
    hot: true,
    before(app){
      apiMocker(app, path.resolve('./mock/mocker.js'))
    },
    // proxy:{
    //   '/api': {
    //     target: 'http://localhost:4001',
    //     pathRewrite: {'^/api': ''}
    //   }
    // }
  }
})