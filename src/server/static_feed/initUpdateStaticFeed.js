const 	{fork} = require('child_process'),
		forceUpdate = process.argv[2];

const start = fork('./src/server/static_feed/runUpdateStaticFeed.js');


start.on('message', (msg) => {
	console.log("msg received by main process ", msg);
	if (msg === 'ready') {
		if (forceUpdate) {
			start.send('force update');
		} else {
			start.send('update');
		}
	} else if (!msg.success) {
		start.disconnect();
		console.log(`runUpdateStaticFeed msg: ${msg.msg}`);
	} else {
		start.disconnect();
		console.log(`runUpdateStaticFeed msg: ${msg.msg}`);
	}
});
