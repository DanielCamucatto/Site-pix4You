const Order = require('./order');
const ErrorsUtils = require('../util/errorsUtils');

async function create(req, res, next) {

    let order = new Order({
        order: req.body.useremail
    });

    const error = order.validateSync();

    if (error) {
        console.log('Invalid order given ' + order + ' .');
        console.log(error.message);
        return next(ErrorsUtils.createBadRequest(error.message));
    }

    let orderSaved = await Order.create(order);

    //console.debug('Saved user %j.', userSaved);

    if (orderSaved) {
        return res.status(201).json({
            'order': order
        });
    } else {
        return next(ErrorsUtils.createGenericError(error.message));
    }
}