var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/app';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.once('open', function(){
  console.log('Mongodb connection open');
});

module.exports = db;
