const mongoose = require('mongoose');
let timestampPlugin = require('../plugins/timestamp')

const orderSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: [true, 'The user email is required.']
    }
});

orderSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Order', orderSchema);