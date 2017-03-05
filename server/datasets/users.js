var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
  email: String,
  username: String,
  bio: String,
  //pass not secure
  password: String,
  image: String
});
