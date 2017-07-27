var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', UserSchema);


UserSchema.pre('save', function(next) {
  console.log('RANNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN????????????')
  return new Promise((resolve, reject) => {
    bcrypt.hash(this.password, null, null, (err, hash) => {
      if (err) {
        reject(err);
        next();
      } else {
        this.password = hash;
        console.log('did u hashed?', this.password);
        resolve(hash);
        next();
      }
    });
  });

});



module.exports = User;
