const mongoose = require('mongoose');
let timestampPlugin = require('../plugins/timestamp')

const orderSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: [true, 'The user email is required.']
    },
    phoneNumber: {
        type: String,
        required: [true, 'The phoneNumber is required.']
    },
    item: {
        type: Object,
        required: [true, ' The order item is required.']
    },
    status: {
        type: String,
        required: [true, 'The status is required.'],
        default: 'CREATED'
    },
    images: {
        type: Object,
        required: [true, 'The images are required.'],
    }
});

orderSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Order', orderSchema);