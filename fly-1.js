var arDrone = require('ar-drone');
var client = arDrone.createClient();
client.ftrim();
client.takeoff();

client
  .after(5000, function() {
    this.stop();
    this.land();
  });
