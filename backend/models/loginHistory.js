const mongoose = require('mongoose');


const LoginHistory = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
    },
    ipAddress: {
        type: String
    },
},{
    timestamps: true
});

module.exports = mongoose.model('LoginHistory', LoginHistory);