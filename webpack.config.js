const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "../index.html"
})

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
	plugins: [htmlPlugin],
	devServer: {
		contentBase: "./dist/"
	}
};