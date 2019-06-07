const path = require('path');

const mipMapSizes = [
	16,
	32,
	48,
	128
];

module.exports = {
	entry: {
		'popup': './src/popup'
	},
	output: {
		filename: '[name].js',
		path: path.resolve('dist')
	},
	module: {
		rules: [
			
		]
	},
	resolve: {
		extensions: [ '.js' ]
	}
}