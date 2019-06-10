const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('config');

module.exports = (env = { NODE_ENV: 'production' }) => {
	const envMode = env.NODE_ENV === 'development' ? 'development' : 'production';

	const { socket } = config;

	const clientConfig = {
		socket
	}

	return {
		mode: envMode,
		devtool: 'cheap-module-source-map',
		entry: {
			'popup': './src/popup',
			'bg': './src/bg'
		},
		output: {
			filename: '[name].js',
			path: envMode === 'development' ? path.resolve('dist') : path.resolve('build')
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [ '@babel/preset-env' ]
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					]
				},
				{
					test: /\.html$/,
					use: [ 'raw-loader' ]
				}
			]
		},
		resolve: {
			modules: [ path.resolve(__dirname, 'node_modules') ],
			extensions: [ '.js' ],
			alias: {
				'shared': path.resolve('..', 'shared'),
				'_global.scss': path.resolve('..', 'shared', 'scss', '_global.scss')
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: "[name].css",
				chunkFilename: "[id].css"
			}),
			new webpack.DefinePlugin({
				ENV_MODE: JSON.stringify(envMode),
				config: JSON.stringify(clientConfig)
			})
		]
	}
};
