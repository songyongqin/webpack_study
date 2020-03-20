const {smart} = require('webpack-merge')
const base = require('./webpack.config.base')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = smart(base,{
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssPlugin()
  ]
})
