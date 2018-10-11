const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
	// template: "./src/index.html",
	filename: "./dist/index.html"
})
const cleanPlugin = new CleanWebpackPlugin(["dist/scripts"]);

module.exports = {
	entry: ["./src/client/index.js"],
	output: {
		path: path.resolve(__dirname,"dist/scripts/"),
		publicPath: "scripts/",
		filename: "bundle.js"
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
				test: /\.html?/,
				use: [
					{
						loader: "html-loader"
					}
				]
			}
		]
	},
	devServer: {
		contentBase: "./dist/",
		proxy: {
			"/api": "http://localhost:8000"
		}
	},
	plugins: [htmlPlugin]
};