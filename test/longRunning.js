function longRunning(num) {
	let sum = 0;
	for(let i=0; i<num;i++) {
		if (i%2 === 0) {
			sum = sum + i;
		}
	}
	return sum;
}

process.on('message', (msg) => {
	if (msg === 'start') {
		let sum = longRunning(123456789)
		process.send(sum)
	} else {
		process.exit()
	}
})

