const Order = require('./order');
const fs = require('fs');
const ErrorsUtils = require('../util/errorsUtils');
const IMAGES_TMP_FOLDER = process.env.IMAGE_STORAGE_PATH || 'pix4funImages';

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

    let filteredItem = predefinedItems.filter((i) => i.id == itemId);

    if (undefined == itemId || filteredItem.length == 0) {
        return undefined;
    } else {
        return filteredItem;
    }
}

const generateImages = (req) => {
    if (req.file != undefined) {
        return [req.file.filename];
    }
}

async function create(req, res, next) {

    //  console.log('header ' + req.header('content-type'))
    let order = new Order({
        userEmail: req.body.userEmail,
        item: generateItem(req),
        phoneNumber: req.body.phoneNumber,
        images: generateImages(req)
    });

    const error = order.validateSync();

    if (error) {
        if (req.file != undefined) {
            removeImage(req.file.filename);
        }
        console.log('Invalid order given ' + order + ' .');
        console.log(error.message);
        return next(ErrorsUtils.createBadRequest(error.message));
    }
    /*
    console.log('filename ' + req.file.originalname)
    console.log('filename ' + req.file.path)
    */

    let orderSaved = await Order.create(order);

    console.debug('orderSaved  %j.', orderSaved);

    if (orderSaved) {
        return res.status(201).json({
            'order': order
        });
    } else {
        return next(ErrorsUtils.createGenericError(error.message));
    }
}

const removeImage = (imageName) => {
    if (fs.existsSync(IMAGES_TMP_FOLDER + '/' + imageName)) {
        fs.unlinkSync(IMAGES_TMP_FOLDER + '/' + imageName);
    }
}

module.exports = {
    create
};