var mosca = require('mosca');
const BeaconDetails = require('./model/beacon_Schema.model');
require("dotenv/config");

var settings = {
  port: 1883,
  http: { port: 8080, bundle: true, static: './' }
};

var server = new mosca.Server(settings, function () {
  console.log("Mosca server running");
});


server.on("ready", function () {
  console.log("Mosca Server up");
});

// fired when a  client is connected
server.on("clientConnected", function (client) {
  console.log("client connected", client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
  console.log(packet.payload.toString());
  if (packet.payload != "scanner1" && packet.payload.toString().includes("beaconId")) {
    addToDb(packet.topic, JSON.parse(packet.payload.toString()));
    messageToClient(packet.topic, JSON.parse(packet.payload.toString()));
  }
});

// fired when a client subscribes to a topic
server.on('subscribed', function (topic, client) {
  console.log("subscribed : ", topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function (topic, client) {
  console.log("unsubscribed : ", topic);
});

// fired when a client is disconnected
server.on("clientDisconnected", function (client) {
  console.log("clientDisconnected : ", client.id);
});

function addToDb(topic, beaconSet) {
  Array.from(beaconSet).forEach(beaconData => {
    let filter = {
      beaconId: beaconData,
      is_active: false
    }
    let updatedBeacon = {
      beaconId: beaconData,
      room_no: topic,
      entry_time: new Date(),
      exit_time : null,
      is_active: true
    }
    BeaconDetails.updateOne(filter, updatedBeacon, function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated Docs : ", docs);
      }
    });
  });
  BeaconDetails.find({ is_active: true }, { _id: 1, beaconId: 1 }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      var activeBeaconsInDB = new Set();
        docs.forEach(element => {
           activeBeaconsInDB.add(element.beaconId);
        });
        var beaconsExited = calculateExitedBeacons(activeBeaconsInDB, beaconSet);
        console.log(beaconsExited);
        Array.from(beaconsExited).forEach(beacon => {
            let filter = {
              beaconId: beacon
            }
            let exitedBeacon = {
              exit_time: new Date(),
              is_active: false
            }
            BeaconDetails.findOneAndUpdate(filter, exitedBeacon, function (err, docs) {
              if (err) {
                console.log(err)
              }
              else {
                console.log("Exited Beacon : ", docs);
              }
            });
        });
    }
  });
}

function calculateExitedBeacons(beaconsInDb, beaconsActive) {
  return Array.from(beaconsInDb).filter(x => !Array.from(beaconsActive).includes(x));
}



function messageToClient(topic, payload) {
  if (Array.from(payload).length > 10) {
    server.publish("Room is " + topic + "overcrowded.");
  }
  BeaconDetails.find({is_active : true}, {_id : 0, beaconId : 1, matricula : 1, 
    is_active : 1}, 
    function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      var message = {
        topic: '/dashboard',
        payload: docs
      };
      server.publish(message);
    }
  });
}

module.exports = { server };