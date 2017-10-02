var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var pCompare = Promise.promisify(bcrypt.compare);
var pHash = Promise.promisify(bcrypt.hash);

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pins: [String]
});

userSchema.pre('save', function(next) {
  return pHash(this.password, null, null).bind(this)
    .then( function(hashed){
      console.log(`hashed pass: ${hashed}`);
      this.password = hashed;
      next();
    });
});

var User = mongoose.model('User', userSchema);

User.checkPassword = function(attemptedPassword, savedPassword){
  return pCompare(attemptedPassword, savedPassword);
};


module.exports = User;
