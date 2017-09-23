var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user_id: { type: String, required: true },
    description: {type: String, required: true },
    longitude: {type: Number, required: true },
    latitude: {type: Number, required: true}
});

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
