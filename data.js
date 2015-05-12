var arDrone = require('ar-drone');
var client = arDrone.createClient({'ip': '192.168.1.12'});
var pngStream = client.getPngStream();
pngStream.on('data', console.log);
