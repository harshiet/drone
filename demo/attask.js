try {
	var doProcess = function() {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
		var http = require('https');
		var taskCompleteDelay = 100;
		var sessionID = '';

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
				sessionID = json.data.sessionID;
				getDroneTasks();
			});
		}).end();

		var getDroneTasks = function() {
			var options = {
				host : 'pharmaref1.attask-ondemand.com',
				// port : 443,
				path : 'https://pharmaref1.attask-ondemand.com/attask/api/project/search?fields=tasks&name=Drone%20Launch&sessionID=' + sessionID,
				method : 'GET'
			};
			var str = '';
			http.request(options, function(res) {
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					str += chunk;
				});

				res.on('end', function() {
					console.log('str: ' + str);
					var json = JSON.parse(str);
					console.log('json: ' + json);
					var tasks = json.data[0].tasks;
					console.log('tasks: ' + tasks);
					setTimeout(function() {
						completeTask(0, tasks);
					}, taskCompleteDelay);

				})
			}).end();
		}

		var completeTask = function(i, tasks) {
			console.log(i + ',' + tasks.length + ',' + tasks[i].name);
			console.log('completing');
			var options = {
				host : 'pharmaref1.attask-ondemand.com',
				path : 'https://pharmaref1.attask-ondemand.com/attask/api/task/' + tasks[i].ID + '?fields=name,status&updates={status:"CUR"}&sessionID=' + sessionID,
				method : 'PUT'
			};

			http.request(options, function(res) {
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					// var json = JSON.parse(chunk);
					console.log(chunk);
				});
				res.on('end', function() {
					if (i < tasks.length - 2) {
						setTimeout(function() {
							completeTask(i + 1, tasks);
						}, taskCompleteDelay);
					} else {
						console.log('last task');
					}
				});
			}).end();
		}
	}
	doProcess();
} catch (err) {
	console.log(err);
}