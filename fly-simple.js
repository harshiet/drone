var arDrone = require('ar-drone');
var client = arDrone.createClient();
var fs = require('fs'), df = require('dateformat');
try {
	var takeoffCallBack = function() {
		client.getPngStream().once('data', function(data) {
			var fileName = 'pano_.png';
			fs.writeFile(fileName, data, function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log(fileName + ' Saved');
				}
			});
			client.land(function() {
				process.exit(0);
			})
		});

	}

	client.ftrim()
	setTimeout(function() {
		client.takeoff(takeoffCallBack);
		client.stop();
	}, 5000);

} catch (err) {
	console.log(err);
}