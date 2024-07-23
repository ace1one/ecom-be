const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
    phone_number: Number,
    gender: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const UserDetail = mongoose.model('user_detail', UserDetailSchema);

module.exports = UserDetail;
