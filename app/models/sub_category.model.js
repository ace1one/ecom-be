const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: String,
  description:String,
  is_active:Boolean,
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
}
});

const SubCategory = mongoose.model('sub_category', UserSchema);

module.exports = SubCategory;