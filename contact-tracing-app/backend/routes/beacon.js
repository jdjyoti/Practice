const router = require('express').Router();
let BeaconDetails = require('../model/beacon_Schema.model');

router.route('/').get((req, res) => {
  BeaconDetails.find()
    .then(beacon => res.json(beacon))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  let beaconId = req.body.beaconId;
  let room_no = req.body.room_no;
  let matricula = req.body.matricula;
  let entry_time =  req.body.entry_time;
  let is_active =  req.body.is_active;

  const newBeaconDetails = new BeaconDetails({
    beaconId,
    room_no,
    matricula,
    entry_time,
    is_active
  });

  newBeaconDetails.save()
  .then(() => res.json('BeaconDetails added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  BeaconDetails.findById(req.params.id)
    .then(be_con => res.json(be_con))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  BeaconDetails.findByIdAndDelete(req.params.id)
    .then(() => res.json('BeaconDetails deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  BeaconDetails.findById(req.params.id)
    .then(be_con => {
      be_con.username = req.body.username;
      be_con.description = req.body.description;
      be_con.duration = Number(req.body.duration);
      be_con.date = Date.parse(req.body.date);

      be_con.save()
        .then(() => res.json('BeaconDetails updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;