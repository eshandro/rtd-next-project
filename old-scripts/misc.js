function writeJsonFile(filePath, jsonStream) {
	filePath = convertFileExt(filePath,'json');
	let file = fs.createWriteStream(filePath);
	jsonStream.pipe(file);
	file
		.on('open', () => {
			console.log("file open event -", filePath);
		})
		.on('finish', () => {
			console.log("file finish event -", filePath);
		})
	// fs.writeFile(file, json, 'utf-8', (err) => {
	// 	if (err) {
	// 		let errMsg = `Error writing json file ${path}: ${err}`;
	// 		throw errMsg
	// 	}
	// 	console.log(`${file} written successfully`);
	// });
}

function convertFileExt(file, newExt) {
	let newFile = '';
	newFile = file.substring(0, file.lastIndexOf('.')+1) + newExt;
	return newFile;
}

