var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
    name: { type: String, required: false},
    title: { type: String, required: true },
    host_id: { type: String, required: true },
    description: {type: String, required: true },
    longitude: {type: Number, required: true },
    latitude: {type: Number, required: true}
});

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
