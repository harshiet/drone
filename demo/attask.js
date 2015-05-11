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
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				var json = JSON.parse(chunk);
				var sessionID = json.data.sessionID;
				getDroneTasks(sessionID);
			});
		}).end();

		var taskCompleteDelay = 2000;
		var getDroneTasks = function(sessionID) {
			var options = {
				host : 'pharmaref1.attask-ondemand.com',
				// port : 443,
				path : 'https://pharmaref1.attask-ondemand.com/attask/api/project/search?fields=tasks&name=Drone%20Launch&sessionID=' + sessionID,
				method : 'GET'
			};

			http.request(options, function(res) {
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					var json = JSON.parse(chunk);
					var tasks = json.data[0].tasks;
					console.log('tasks: ' + tasks);
					setTimeout(function() {
						completeTask(i, tasks);
					}, taskCompleteDelay);

				});
			}).end();
		}

		var completeTask = function(i, tasks) {
			console.log(i + ',' + tasks.length + ',' + tasks[i]);
			if (i < tasks.length) {
				console.log('complete');
				setTimeout(function() {
					completeTask(i + 1, tasks);
				}, taskCompleteDelay);

			} else {
				console.log('last task');
			}
			/*
			 * var options = { host : 'pharmaref1.attask-ondemand.com', // port :
			 * 443, path :
			 * 'https://pharmaref1.attask-ondemand.com/attask/api/task/' +
			 * task[i].ID + '?updates={status:"CPL"}&sessionID=' + sessionID,
			 * method : 'PUT' };
			 * 
			 * http.request(options, function(res) { res.setEncoding('utf8');
			 * res.on('data', function(chunk) { var json = JSON.parse(chunk);
			 * console.log(json); }); }).end();
			 */

		}
	}
	doProcess();
} catch (err) {
	console.log(err);
}