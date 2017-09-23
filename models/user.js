var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var pHash = Promise.promisify(bcrypt.hash);

var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  return pHash(this.password, null, null).bind(this)
  .then( function(hashed){
    console.log(`hashed pass: ${hashed}`);
    this.password = hashed;
    next();
  });
});

// userSchema.methods.toJSON = function() {
//   return {
//     _id: this._id,
//     username: this.username
//   }
// }

var User = mongoose.model('User', userSchema);

User.checkPassword = function(attemptedPassword, savedPassword, callback){
  bcrypt.compare(attemptedPassword, savedPassword, function(err, match){
    if (err) {
      return callback(err, false);
    } else {
      callback(null, match);
    }
  });
}

module.exports = User;
