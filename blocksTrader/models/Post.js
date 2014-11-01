var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  location: { type: String},
  userid: {type: String},
  email: {type: String}
});

module.exports = mongoose.model('Post', postSchema);