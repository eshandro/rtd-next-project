const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const PATHS = {
	client: path.join(__dirname, 'src/client'),
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname,'dist')
}

const htmlPlugin = new HtmlWebPackPlugin({
	template: `${PATHS.src}/index.html`,
	filename: `${PATHS.dist}/index.html`
});

const cleanPlugin = new CleanWebpackPlugin([`${PATHS.dist}/scripts`, `${PATHS.dist}/styles`, `${PATHS.dist}/index.html`]);

const miniCssPlugin = new MiniCssExtractPlugin({
	filename: devMode ? 'styles/[name].css' : 'styles/[name].[contenthash].css',
	chunkFilename: devMode ? 'styles/[id].css' : 'styles/[id].[contenthash].css'
});

const hashedModuleIdsPlugin = new webpack.HashedModuleIdsPlugin();


module.exports = {
	entry: {
		bundle:	[`${PATHS.client}/index.js`]
	},
	output: {
		path: PATHS.dist,
		publicPath: '/',
		filename: devMode ? 'scripts/[name].js' : 'scripts/[name].[contenthash].js',
		chunkFilename: devMode ? 'scripts/[name].js' : 'scripts/[name].[contenthash].js'
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					name: 'vendor',
					chunks: 'all',
					test: /node_modules/
				}
			}
		}
	},
	module: {
		rules: [
	    	{
	    		test: /\.js$/,
	    		exclude: /node_modules/,
	    		use: {
					loader: "babel-loader"
	    		}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
						'css-loader', 
						'sass-loader'
					]
			},
			// {
			// 	test: /\.css$/,
			// 	use: ['style-loader', 'css-loader']
			// }
			// {
			// 	test: /\.html?/,
			// 	use: [
			// 		{
			// 			loader: "html-loader"
			// 		}
			// 	]
			// }
		]
	},
	devServer: {
		contentBase: PATHS.dist,
		watchContentBase: true,
		publicPath: "/",
		proxy: {
			"/api": "http://localhost:8000"
		}
	},
	plugins: [
		 cleanPlugin,
		 htmlPlugin,
		 miniCssPlugin,
		 hashedModuleIdsPlugin
	]
};