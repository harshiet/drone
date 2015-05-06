var arDrone = require('ar-drone');
var client = arDrone.createClient();
client.ftrim()
client.stop();
client.land();
client.ftrim()

