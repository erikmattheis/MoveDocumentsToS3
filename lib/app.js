var s3Backup = require('./node-mongodb-s3-backup'),
config = require('./config.json'),
logger = require('./log/logger.js');

function init() {
	s3Backup.sync(getDbOptions(), getS3Options(), function(err, result) {
	  if (err) return logger.log(err);
	  logger.log(result);
	  console.log("Exiting", result);
	});
}

init();

function query() {
	var lastMidnight = getLastMidnightInMS();
	var str = '{'
		+ '\"localTime\":{'
		+ '\"\$gte\":' + lastMidnight + ','
		+ '\"$lt\":' + (lastMidnight + (24*60*60*1000)) + '}}';
	return str;
}

function getDbOptions() {
	config.db.query = query();
	return config.db;
}

function getS3Options() {
	return config.s3;
}

function getLastMidnightInMS() {
	var d = new Date();
	d.setHours(0,0,0,0);
	return d.getTime();
}