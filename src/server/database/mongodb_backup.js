const fs = require('fs');
const exec = require('child_process').exec;
const serverConfig = require('../config');


const dbOptions = {
	user: '',
	pass: '',
	host: serverConfig.mongoHost,
	port: serverConfig.mongoPort,
	database: 'rtdNextTrain',
	backup_database: 'rtdNextTrain_backup',
	autoBackup: true,
	removeOldBackup: true,
	keepLastDaysBackup: 2,
	autoBackupPath: './src/server/database/backups/' 
};
// console.table(dbOptions);

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
				console.log("no error ");
				if (dbOptions.removeOldBackup == true) {
					if (fs.existsSync(oldBackupPath)) {
						exec("rm -rf " + oldBackupPath, function(err) {});
					}
				}
				// use newbackup to create backup database
				let cmd2;
				if (!dbOptions.user || !dbOptions.pass) {
					cmd2 = `mongorestore --host ${dbOptions.host} --port ${dbOptions.port} --db ${dbOptions.backup_database} --drop ${newBackupPath}/${dbOptions.database}/`; 
				} else {
					cmd2 = `mongorestore --host ${dbOptions.host} --port ${dbOptions.port} --db ${dbOptions.backup_database} --username ${dbOptions.user} --password  ${dbOptions.pass} --drop ${newBackupPath}/${dbOptions.database}/`; 
				}
				exec(cmd2,function(error,stdout,stderr) {
					console.log("error ",error);
					console.log("stdout ",stdout);
					console.log("stderr ",stderr);
				});				
			} else {
				console.log("error in dbbackup exec: ",error);
			}
		});
	}
}

module.exports = dbAutoBackup;