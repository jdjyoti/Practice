const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const beaconSchema = new Schema({
  beaconId: { type: String, required: true },
  room_no: { type: String },
  matricula : {type: String, required: true },
  entry_time: { type: Date},
  exit_time: { type: Date},
  is_active: {type: Boolean, required: true}
}, {
  timestamps: true,
});

const BeaconDetails = mongoose.model('BeaconDetails', beaconSchema);

module.exports = BeaconDetails;