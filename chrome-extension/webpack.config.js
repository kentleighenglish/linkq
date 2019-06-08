const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('config');

const mipMapSizes = [
	16,
	32,
	48,
	128
];

const convertToSass = (input, key = '') => {
	const type = typeof input;
	if (type !== 'object' && key !== '') {
		return `$${key}: ${input};`;
	}
	if (type === 'object') {
		if (Array.isArray(input)) {
			return input.map((value, propKey) => {
				return convertToSass(value, key !== '' ? `${key}-${propKey}` : propKey);
			}).join('');
		} else {
			return Object.keys(input).map((propKey) => {
				return convertToSass(input[propKey], key !== '' ? `${key}-${propKey}` : propKey);
			}).join('');
		}
	}

	return '';
}

module.exports = (env = { NODE_ENV: 'production' }) => {
	return {
		mode: env.NODE_ENV === 'development' ? 'development' : 'production',
		devtool: 'cheap-module-source-map',
		entry: {
			'popup': './src/popup',
			'bg': './src/bg'
		},
		output: {
			filename: '[name].js',
			path: env.NODE_ENV === 'development' ? path.resolve('dist') : path.resolve('build')
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
						{
							loader: "sass-loader",
							options: {
								data: convertToSass(config)
							}
						}
					]
				},
				{
					test: /\.html$/,
					use: [ 'raw-loader' ]
				}
			]
		},
		resolve: {
			extensions: [ '.js' ]
		},
		plugins: [
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: "[name].css",
				chunkFilename: "[id].css"
			})
		]
	}
};
