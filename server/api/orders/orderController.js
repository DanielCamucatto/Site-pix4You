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

const IMAGES_FORMAT_ALLOWED = ['jpg', 'jpeg', 'ico', 'gif'];

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

async function create(req, res, next) {

    //  console.log('header ' + req.header('content-type'))

    if (req.files != undefined && req.files.length > 0 && hasInvalidFiles(req)) {
        let errorMessage = 'Invalid image format given.';
        console.log(errorMessage);
        return next(ErrorsUtils.createBadRequest(errorMessage));
    }

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