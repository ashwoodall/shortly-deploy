var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LinkSchema = new Schema({

  link: {
    type: String
  },
  url: {
    type: String
  },
  baseUrl: {
    type: String
  },
  code: {
    type: String
  },
  title: {
    type: String
  },
  visits: {
    type: Number
  },
  
});

var Link = mongoose.model('link', LinkSchema);

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};


LinkSchema.pre('save', (next) => {
  var code = createSha(this.url);
  this.code = code;
  next();

});


module.exports = Link;
