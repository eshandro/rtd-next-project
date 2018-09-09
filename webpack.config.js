const path = require('path');

module.exports = {
	entry: ["./src/scripts/index.js"],
	output: {
		path: path.resolve(__dirname,"dist/scripts/"),
		publicPath: "/scripts/",
		filename: "bundle.js"
	},
	// module: {
	// 	loaders: [
	// 		{
	// 			exclude: /node_modules/,
	// 			loader: "babel"
	// 		}
	// 	]
	// },
	// resolve: {
	// 	extensions: ["", ".js", ".jsx"]
	// },
	module: {
		rules: [
	    	{
	    		test: /\.js$/,
	    		exclude: /node_modules/,
	    		use: {
					loader: "babel-loader"
	    		}
			}
		]
	},
	devServer: {
		contentBase: "./"
	}
};