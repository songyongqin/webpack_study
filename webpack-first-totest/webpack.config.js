const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
console.log(config)
module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
			index: './src/index.js',
			login: './src/login.js'
		},
    output: {
        path: path.resolve(__dirname, 'dist'), //必须是绝对路径
        filename: '[name].[hash:6].js',
        publicPath: '/' //通常是CDN地址
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.(le|c)ss$/,
                use: [{
									loader: MiniCssExtractPlugin.loader,
									options: {
										publicPath: '../',
										// hmr: isDev,
										// reloadAll: true
									}
								}, 'css-loader', 'less-loader'],
                exclude: /node_modules/
						},
						// {
						// 	test: /\.(le|c)ss$/,
						// 	use: ['style-loader', 'css-loader', 'less-loader'],
						// 	exclude: /node_modules/
						// },
            // {
            //     test: /.html$/,
            //     use: 'html-withimg-loader'
            // },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
    plugins: [
			//数组 放着所有的webpack插件
			new HtmlWebpackPlugin({
					template: './public/index.html',
					filename: 'index.html', //打包后的文件名
					config: config.template,
					chunks: ['index']
					// hash: true //是否加上hash，默认是 false
			}),
			new HtmlWebpackPlugin({
				template: './public/login.html',
				filename: 'login.html', //打包后的文件名
				config: config.template,
				chunks: ['login']
				// hash: true //是否加上hash，默认是 false
				//excludeChunks //不包含哪些
		}),
			new CleanWebpackPlugin({
					cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
			}),
			new CopyWebpackPlugin([
					{
						from: 'public/js/*.js',
						to: path.resolve(__dirname, 'dist', 'js'),
						flatten: true, //它只会拷贝文件，而不会把文件夹路径都拷贝上
						ignore:['other.js']
					}
			]),
			new webpack.ProvidePlugin({ //添加全局变量
				React: 'react',
				Component: ['react', 'Component'],
				Vue: ['vue/dist/vue.esm.js', 'default'],
				$: 'jquery',
				_map: ['lodash', 'map']
			}),
			new MiniCssExtractPlugin({ //抽离css
				filename: 'css/[name].css',
			}),
			new OptimizeCssPlugin(), //将抽离出的css进行压缩
			new webpack.HotModuleReplacementPlugin() //热更新
    ],
    devServer:{
				port: '3050',
				hot: true,
        stats: "errors-only", //终端仅打印 error
        compress: true //是否启用 gzip 压缩
    },
}