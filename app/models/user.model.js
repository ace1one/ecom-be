const mongoose = require('mongoose');
const UserDetail = require('./userDetail.model');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;