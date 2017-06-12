const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
	// entry: './src/test.js',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	// devtool: 'cheap-module-eval-source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2017', 'stage-0']
				}
			},
			{
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('app.css'),
		// new webpack.optimize.UglifyJsPlugin(),
		new WebpackNotifierPlugin(),
		new webpack.ProvidePlugin({
			React: 'react'
		})
	]
}
