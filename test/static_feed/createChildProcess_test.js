// const runUpdateStaticFeed = require('../../src/server/static_feed/runUpdateStaticFeed')
const {fork} = require('child_process');


describe('Test for creating child_process to run long running items', ()=> {
	it('can start a long running child_process via fork', () => {
		let longrun = fork('./test/longRunning.js')
		longrun.send('start')
		let shortrun = shortRunning(100);
		console.log("shortrun isn't blocked",shortrun);
		longrun.on('message', (msg) => {
			console.log("longrun as child_process ",msg);
		})
	})
	it('long running process will block without child_process', () => {
		let longrun = longRunning(123456789);
		console.log("longrun ",longrun);
		let shortrun = shortRunning(100)
		console.log('shortrun is blocked', shortrun)
	})
})


function shortRunning(num) {
	let sum = 0;
	for(let i=0; i<num;i++) {
		if (i%2 === 0) {
			sum = sum + i;
		}
	}
	return sum;
}

function longRunning(num) {
	let sum = 0;
	for(let i=0; i<num;i++) {
		if (i%2 === 0) {
			sum = sum + i;
		}
	}
	return sum;
}