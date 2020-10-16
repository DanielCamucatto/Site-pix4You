const mongoose = require('mongoose');
let timestampPlugin = require('../plugins/timestamp')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The username is required.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required.']
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, 'The phone number is required.']
    }
});

userSchema.plugin(timestampPlugin);

module.exports = mongoose.model('User', userSchema);