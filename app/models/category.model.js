const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: String,
  description:String,
  is_active:Boolean
});

const Category = mongoose.model('category', UserSchema);

module.exports = Category;