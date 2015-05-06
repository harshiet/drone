try {
	var doProcess = function() {
		console.log('polling');
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
		var http = require('https');

		var options = {
			host : 'pharmaref1.attask-ondemand.com',
			// port : 443,
			path : '/attask/api/login?username=harsh.agarwal@aurotechcorp.com&password=Aurotech12',
			method : 'GET'
		};

		http.request(options, function(res) {
			// console.log('STATUS: ' + res.statusCode);
			// console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				//console.log('BODY: ' + chunk);
				var json = JSON.parse(chunk);
				var sessionID = json.data.sessionID;
				getDroneTask(sessionID);
			});
		}).end();

		var getDroneTask = function(sessionID) {
			var options = {
				host : 'pharmaref1.attask-ondemand.com',
				// port : 443,
				path : '/attask/api/task/search?name=Drone%20Demo&sessionID=' + sessionID,
				method : 'GET'
			};

			http.request(options, function(res) {
				// console.log('STATUS: ' + res.statusCode);
				// console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					//console.log('BODY: ' + chunk);
					var json = JSON.parse(chunk);
					var status = json.data[0].status;
					console.log('Status: ' + status);
					if (status == 'CPL') {
						console.log('launch drone');
					} else {
						setTimeout(function() {
							doProcess();
						}, 2000);
					}
				});
			}).end();
		}
	}
	doProcess();
} catch (err) {
	console.log(err);
}