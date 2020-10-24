const express = require('express')
const router = express.Router();
const OrderController = require('./orderController');

router.post('/', async (req, res, next) => {
    return OrderController.create(req, res, next);
});

router.put('/:orderId', async (req, res, next) => {
    console.log('OrderController update order ->')
    return OrderController.update(req, res, next);
});

module.exports = router;