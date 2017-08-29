const port = process.envPORT || 3000;
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

const VENDOR_LIBS = [
	'react', 'react-dom', 'prop-types', 'd3'
];

if(TARGET_ENV === 'development') {
	console.log('Serving locally...');
}

if(TARGET_ENV === 'production') {
	console.log('Building for prod...');
}

module.exports = {
	entry: {
		bundle: './src/index.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	devServer: {
		inline: true,
		contentBase: './src/',
		port: port
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'es2015', 'react']
					}
				},
				exclude: /node_modules/
			},
			{	test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 40000 }
					},
					'image-webpack-loader'
				]
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new htmlWebpackPlugin({
			template: 'src/index.html',
			favicon: 'src/images/favicon.ico'
		}),
		new ExtractTextPlugin('App.css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};
