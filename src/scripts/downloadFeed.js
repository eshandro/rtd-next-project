const	fs = require('fs'), 
	url = require('url'),
	http = require('http'),
	feedUrl = "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
	downloadFolder = "./test-download/",
	file_name = '';


function downloadFile(fileUrl, apiPath, encoding, callback) {

	let p = url.parse(fileUrl),           
		timeout = 10000; 
	file_name = p.pathname.substring(p.pathname.lastIndexOf('/')+1);
	console.log("file_name ",file_name);

	let file = fs.createWriteStream(apiPath+file_name);
	console.log("file ",file);
	
	let timeout_wrapper = function( req ) {
		return function() {
			 console.log('abort');
			 req.abort();
			 callback("File download timeout!");
		};
	};


	let request = http.get(fileUrl).on('response', function(res) { 

		let len = parseInt(res.headers['content-length'], 10);
		if (!len) {
			callback("No data received");
			clearTimeout( timeoutId );
			// End stream and delete file
			file.end(() => { fs.unlinkSync(apiPath+file_name)});
			return;
		}

		let downloaded = 0;
		
		res.on('data', function(chunk) {
			file.write(chunk);
			downloaded += chunk.length;
			// process.stdout.write("Downloading " + (100.0 * downloaded / len).toFixed(2) + "% " + downloaded + " bytes" + isWin ? "\033[0G": "\r");
			process.stdout.write("Downloading " + (100.0 * downloaded / len).toFixed(2) + "% " + downloaded + " bytes" + "\n\r");
			// reset timeout
			clearTimeout( timeoutId );
			timeoutId = setTimeout( fn, timeout );
		}).on('end', function () {
			// clear timeout
			clearTimeout( timeoutId );
			file.end();
			console.log(file_name + ' downloaded to: ' + apiPath);
			callback(null);
		}).on('error', function (err) {
			// clear timeout
			clearTimeout( timeoutId );
			// End stream and delete file                
			file.end(() => { fs.unlinkSync(apiPath+file_name)});
			callback(err.message);
		});           
	});

	// generate timeout handler
	let fn = timeout_wrapper( request );

	// set initial timeout
	let timeoutId = setTimeout( fn, timeout );
}

downloadFile(feedUrl,downloadFolder, 'utf-8', (data) => console.log('data', data) );
