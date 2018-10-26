const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			// {
			// 	enforce: 'pre',
			// 	test: /\.(js|jsx)$/,
			// 	exclude: /node_modules/,
			// 	use: 'eslint-loader'
			// },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					// options: {
					// 	presets: ['@babel/preset-env', '@babel/preset-react']
					// }
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								// require('postcss-cssnext')({
								// 	stage: 3,
								// 	features: {
								// 		'color-mod-function': { unresolved: 'warn' }
								// 	}
								// }),
								// require('postcss-color-function')(),
								// require('postcss-custom-properties')(),
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'main.css' }),
		new WebpackNotifierPlugin()
	]
}
