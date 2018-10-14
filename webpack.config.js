const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
	template: path.resolve(__dirname,"src/index.html"),
	filename: path.resolve(__dirname,"dist/index.html")
})
const cleanPlugin = new CleanWebpackPlugin(["dist"]);

module.exports = {
	entry: ["./src/client/index.js"],
	output: {
		path: path.resolve(__dirname,"dist"),
		publicPath: "/",
		filename: "scripts/bundle.js"
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
		contentBase: path.resolve(__dirname,"dist"),
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