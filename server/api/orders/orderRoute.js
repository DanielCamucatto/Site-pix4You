const express = require('express')
const router = express.Router();
const OrderController = require('./orderController');

router.post('/', async (req, res, next) => {
    return OrderController.create(req, res, next);
});

module.exports = router;