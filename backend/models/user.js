const mongoose = require('mongoose');


const User = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    subscriptions:[{
        type: String
    }]
});

module.exports = mongoose.model('User', User);