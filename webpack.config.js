const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const PATHS = {
	client: path.join(__dirname, 'src/client'),
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname,'dist')
}

const htmlPlugin = new HtmlWebPackPlugin({
	template: `${PATHS.src}/index.html`,
	filename: `${PATHS.dist}/index.html`
})
const cleanPlugin = new CleanWebpackPlugin([`${PATHS.dist}/scripts`, `${PATHS.dist}/index.html`]);

module.exports = {
	entry: {
		bundle:	[`${PATHS.client}/index.js`]
	},
	output: {
		path: PATHS.dist,
		publicPath: "/",
		filename: "scripts/[name].js"
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
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
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
		 htmlPlugin
	]
};