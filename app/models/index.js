const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.user_detail = require('./userDetail.model');

//category
db.category = require('./category.model')
db.sub_category = require('./sub_category.model')

module.exports = db;