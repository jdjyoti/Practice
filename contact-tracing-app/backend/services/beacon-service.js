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
