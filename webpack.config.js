const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const dotEnvPlugins = new Dotenv({
  path: path.resolve(__dirname, '.env'),
  safe: false
})

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
			{
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
				loader: 'babel-loader',

				options: {
					presets: ['es2015']
				}
			}
		]
  },
  target: 'node',
  plugins: [
    dotEnvPlugins,
    new UglifyJSPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /\/iconv-loader$/, 'node-noop'
    )
  ]
};
