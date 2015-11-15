fs = require('fs');

function log(file, message) {
	var year = new Date().getFullYear();
	fs.appendFile(__dirname + '/../../logs/MoveDocumentsToS3-' + year + '.log', JSON.stringify(message) + '\n', function (err) {
		if (err) {
			console.log('fs.appendFile', file, err);
		}
	});
}

exports.log = log;