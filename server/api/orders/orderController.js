const Order = require('./order');
const fs = require('fs');
const paymentService = require('./../payment/paymentService');
const ErrorsUtils = require('../util/errorsUtils');
const IMAGES_TMP_FOLDER = process.env.IMAGE_STORAGE_PATH || 'pix4funImages';
const URL_PAYMENT_RESPONSE_SUCCESS = process.env.URL_PAYMENT_RESPONSE_SUCCESS || 'http://localhost:3000/loja';
const URL_PAYMENT_RESPONSE_FAILURE = process.env.URL_PAYMENT_RESPONSE_FAILURE || 'http://localhost:3000/loja';
const URL_PAYMENT_RESPONSE_PENDING = process.env.URL_PAYMENT_RESPONSE_PENDING || 'http://localhost:3000/loja';

paymentService.initialize();

const predefinedItems = [{
        title: 'PACK COM 6',
        unit_price: 17.99,
        quantity: 1,
        id: 1
    },
    {
        title: 'PACK COM 12',
        unit_price: 21.99,
        quantity: 1,
        id: 2
    },
    {
        title: 'PACK COM 18',
        unit_price: 26.99,
        quantity: 1,
        id: 3
    }];

const IMAGES_FORMAT_ALLOWED = ['jpg', 'jpeg', 'ico', 'gif', 'png'];

const generateItem = (req) => {

    let itemId = req.body.itemId || req.params.itemId;

    //console.log('itemId ' + itemId);

    let filteredItem = predefinedItems.filter((i) => i.id == itemId);

    if (undefined == itemId || filteredItem.length == 0) {
        return undefined;
    } else {
        return filteredItem[0];
    }
}

const generateImages = (req) => {

    if (req.files != undefined && req.files.length > 0) {
        let images = [];
        req.files.forEach(f => images.push(buildImage(f)));
        return images;
    }
}

const buildImage = (file) => {

    if (fs.existsSync(IMAGES_TMP_FOLDER + '/' + file.filename)) {
        let updatedName = file.filename + file.originalname.substring(file.originalname.lastIndexOf('.'));
        fs.renameSync(IMAGES_TMP_FOLDER + '/' + file.filename, IMAGES_TMP_FOLDER + '/' + updatedName);
        let image = {
            storagePath: IMAGES_TMP_FOLDER + '/' + updatedName,
            id: updatedName
        }
        return image;
    }
}

const hasInvalidFiles = (req) => {

    let filterResponse = req.files.filter((file) => {
        let fileFormat = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        //console.log('fileFormat ' + fileFormat);
        if (IMAGES_FORMAT_ALLOWED.indexOf(fileFormat.toLowerCase()) >= 0) {
            return true;
        }
        return false;
    });
    //console.log('filterResponse ' + filterResponse);
    return filterResponse.length != req.files.length;
}

const findItem = (order) => {
    return predefinedItems.filter(p => p.id == order.item.id)[0];
}

const deleteImages = (order) => {
    if (order != undefined && order.images != undefined && order.images.length > 0) {
        order.images.forEach((i) => removeImage(i.id));
    }
}

async function update(req, res, next) {
    try {

    //console.log('updating order given ' + req.params.orderId)

    let order = await Order.findById(req.params.orderId);

    if (!order) {
        console.log('order not found: ' + req.params.orderId);
        return next(ErrorsUtils.createNotFound('order not found'));
    }

    if (req.body.externalOrder == undefined || req.body.externalOrder == null || req.body.externalOrder == '') {
        return next(ErrorsUtils.createBadRequest('external order missing'));
    }

    //console.log('comparisong ' + (order.externalOrder == req.body.externalOrder));

    if (order.externalOrder != null && JSON.stringify(order.externalOrder) == JSON.stringify(req.body.externalOrder)) {
        console.log('-> The order %s has already an external order.', order._id);
        return next(ErrorsUtils.createBadRequest('duplicated order request. Order number: ' + req.params.orderId));
    }

    order.externalOrder = req.body.externalOrder;
    order.status = 'PLACED_EXTERNALLY';

    //console.log('externalOrder given %j', req.body.externalOrder);

    let updateOrder = await order.save();

    if (updateOrder) {
        return res.status(200).json({
            'updateOrder': updateOrder
        });
    } else {
        return next(errorsUtils.createGenericError(error.message));
    }

} catch (error) {
    console.log('error ', error);
    return next(errorsUtils.createGenericError(error.message));
};
}

async function create(req, res, next) {

   // console.log('header ' + req.header('content-type'));

    if (req.files != undefined && req.files.length > 0 && hasInvalidFiles(req)) {
        let errorMessage = 'Invalid image format given.';
        console.log(errorMessage);
        return next(ErrorsUtils.createBadRequest(errorMessage));
    }

    let order = new Order({
        userEmail: req.body.userEmail,
        item: generateItem(req),
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        images: generateImages(req)
    });

    const error = order.validateSync();

    if (error) {
        deleteImages(order)
        console.log('Invalid order given ' + order + ' .');
        console.log(error.message);
        return next(ErrorsUtils.createBadRequest(error.message));
    }

    let orderSaved = await Order.create(order);

    //console.debug('orderSaved  %j.', orderSaved);

    if (orderSaved) {

        let globalId = '';

        try {
            
            let preference = {
                items: [findItem(order)]
            }

            preference.back_urls =  {
                "success": URL_PAYMENT_RESPONSE_SUCCESS,
                "failure": URL_PAYMENT_RESPONSE_FAILURE,
                "pending": URL_PAYMENT_RESPONSE_PENDING
            };

            preference.external_reference = order._id.toString();
            preference.auto_return = 'approved';

            globalId = await paymentService.generateGlobalId(preference);
            //console.log('global id found for the order ' + order._id + '. Global id: ' + globalId);

        } catch (err) {
            console.error('Error getting global id ' + err);
            order.status = 'ERROR_GLOBAL_ID';
            deleteImages(order);
            order.save();
            return next(ErrorsUtils.createGenericError(err.message));
        }

        order.globalId = globalId;
        order.status = 'CREATED_EXTERNALLY'

        console.log('updating order ' +  order._id);
        order = await order.save();

        return res.status(201).json({
            'order': {
                globalId: order.globalId,
                orderId: order._id
            }
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
    create, update
};