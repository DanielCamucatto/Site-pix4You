const Order = require('./order');
const ErrorsUtils = require('../util/errorsUtils');

const predefinedItems = [{
        title: 'Firs plan',
        unit_price: 100,
        quantity: 1,
        id: 1
    },
    {
        title: 'Second Plan',
        unit_price: 100,
        quantity: 1,
        id: 2
    }
];

const generateItem = (req) => {

    let itemId = req.body.itemId;

    let filteredItem = predefinedItems.filter((item) => item.id === itemId);

    if (undefined == itemId || filteredItem.length == 0) {
        return undefined;
    } else {
        return filteredItem;
    }
}

async function create(req, res, next) {

    let order = new Order({
        userEmail: req.body.userEmail,
        item: generateItem(req),
        phoneNumber: req.body.phoneNumber,
        //   images: generateImages(red)
    });

    //console.log('body received %j', req.body);

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

module.exports = {
    create
};