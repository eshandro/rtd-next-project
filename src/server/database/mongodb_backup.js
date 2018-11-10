const fs = require('fs');
const exec = require('child_process').exec;

const dbOptions = {
	user: '',
	pass: '',
	host: 'localhost',
	port: 27017,
	database: 'rtdNextTrain',
	autoBackup: true,
	removeOldBackup: true,
	keepLastDaysBackup: 2,
	autoBackupPath: './src/server/database/backups/' 
};

/* return if variable is empty or not. */
function emptyCheck (mixedvar) {
	let undef, key, i, len;
	let emptyValues = [undef, null, false, 0, '', '0'];
	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixedvar === emptyValues[i]) {
			return true;
		}
	}
	if (typeof mixedvar === 'object') {
		for (key in mixedvar) {
			return false;
		}
		return true;
	}
	return false;
};


// Auto backup script
function dbAutoBackup () {
	// check for auto backup is enabled or disabled
	if (dbOptions.autoBackup == true) {
		let date = new Date();
		let beforeDate, oldBackupDir, oldBackupPath;
		let newBackupDir = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		let newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
		// check for remove old backup after keeping # of days given in configuration
		if (dbOptions.removeOldBackup == true) {
			beforeDate = new Date();
			beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
			oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
			oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
		}
		let cmd;
		// Command for mongodb dump process
		if (!dbOptions.user || !dbOptions.pass) {
			cmd = `mongodump --host ${dbOptions.host} --port ${dbOptions.port} --db ${dbOptions.database} --out ${newBackupPath}`; 
		} else {
			cmd = `mongodump --host ${dbOptions.host} --port ${dbOptions.port} --db ${dbOptions.database} --username ${dbOptions.user} --password  ${dbOptions.pass} --out ${newBackupPath}`; 
		}

		exec(cmd, function(error, stdout, stderr) {
			if (emptyCheck(error)) {
				// check for remove old backup after keeping # of days given in configuration
				if (dbOptions.removeOldBackup == true) {
					if (fs.existsSync(oldBackupPath)) {
						exec("rm -rf " + oldBackupPath, function(err) {});
					}
				}
			}
		});
	}
}

module.exports = dbAutoBackup;