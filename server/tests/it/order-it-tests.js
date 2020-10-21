process.env.NODE_ENV = 'test';
const fs = require('fs')
const assert = require("assert");
const mongoose = require('mongoose');
const config = require('../../config/config');
const paymentService = require('./../../api/payment/paymentService');
let chai = require('chai');
let chaiHttp = require('chai-http');
let Order = require('../../api/orders/order');
//const server = require('../../server');
//const DB = require('mongoose').Db;
const sinon = require("sinon");
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const FILE_TEST = '\\resources\\favicon.ico';
const FILE_TMP_TEST = '\\resources\\temp.txt';
const IMAGES_TMP_FOLDER = process.env.IMAGE_STORAGE_PATH || 'pix4funImages';

chai.use(chaiHttp);
let mongoServer;
let con;
let db;

const expect = chai.expect;

const SERVER_APPLICATION_HOST = 'http://localhost:8089';
const ORDER_URL = '/api/orders/';

const FORM_CONTENT_TYPE = 'multipart/form-data';

const generateValidOrderMock = () => {
  return {
    userEmail: 'jean@mail.com',
    phoneNumber: '1199556655',
    itemId: 1,
    userName: 'Logan'
  }
}

before(async () => {

  mongoServer = new MongoMemoryServer({
    debug: false
  });

  await mongoServer.getConnectionString().then((mongoUri) => {
    return mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err) => {
      if (err) {
        throw err;
      };
    });
  }).catch(error => {
    console.debug('error ' + error);
  });
  //console.log('mongoServer ' + mongoServer);
});

after(() => {
  mongoose.disconnect();
  mongoServer.stop();

  fs.readdirSync(IMAGES_TMP_FOLDER).forEach(function (filename) {
    fs.unlinkSync(IMAGES_TMP_FOLDER + '/' + filename);
  });
});

describe('Orders ', () => {

  let paymentServiceStub, server;

  before(() => {
    paymentServiceStub = sinon.stub(paymentService, 'initialize');
    server = require('../../server');
  });

  beforeEach((done) => {
    Order.deleteMany({}, (err) => {
      // console.log('error erasing user data');
    });
    done();
  });

  afterEach(() => {
    generateGlobalId.restore();
  });

  it('it should create an order.', async () => {

    try {

      generateGlobalId = sinon.stub(paymentService, 'generateGlobalId').returns('globalid-132');

      let tempOrder = generateValidOrderMock();

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('userEmail', tempOrder.userEmail)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('userName', tempOrder.userName)
        .field('itemId', tempOrder.itemId)
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')

      expect(result.status).to.equal(201);
      expect(result.body.order).to.have.property('globalId');
      expect(result.body.order).to.have.property('orderId');

      let orderQuery = await Order.find({
        status: 'CREATED_EXTERNALLY'
      });

      expect(orderQuery.length).to.equal(1);

    } catch (err) {
      console.log(err)
      assert.fail(err.message);
    }
  });

  it('it error getting global id.', async () => {

    try {

      let errorMessage = 'test exception';
      generateGlobalId = sinon.stub(paymentService, 'generateGlobalId').throws(new Error(errorMessage));

      let tempOrder = generateValidOrderMock();

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('userEmail', tempOrder.userEmail)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('userName', tempOrder.userName)
        .field('itemId', tempOrder.itemId)
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')

      expect(result.status).to.equal(500);
      expect(result.body.error.message).to.equal(errorMessage)

      let queryOrder = await Order.find({
        status: 'ERROR_GLOBAL_ID'
      });

      expect(queryOrder.length).to.equal(1);

      let secondOrderQuery = await Order.find({
        status: 'CREATED_EXTERNALLY'
      });

      expect(secondOrderQuery.length).to.equal(0);

    } catch (err) {
      console.log(err)
      assert.fail(err.message);
    }
  });

  it('invalid image format given return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('userEmail', tempOrder.userEmail)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('itemId', tempOrder.itemId)
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TMP_TEST), 'temp.txt')
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')

      expect(result.status).to.equal(400);
      expect(result.body.error.message.indexOf('image')).to.gte(0);

    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('invalid order with no image return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('userEmail', tempOrder.userEmail)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('itemId', tempOrder.itemId)

      expect(result.status).to.equal(400);
      expect(result.body.error.message.indexOf('image')).to.gte(0);

    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('invalid order with no email should return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('itemId', tempOrder.itemId)
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')

      expect(result.status).to.equal(400);
      expect(result.body.error.message.indexOf('email')).to.gte(0);

    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('invalid order with invalid item id should return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();
      tempOrder.itemId = 0;

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('userEmail', tempOrder.userEmail)
        .field('itemId', tempOrder.itemId)
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')

      expect(result.status).to.equal(400);
      expect(result.body.error.message.indexOf('order')).to.gte(0);

    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('not order with invalid item id should return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('userEmail', tempOrder.userEmail)
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')

      expect(result.status).to.equal(400);
      expect(result.body.error.message.indexOf('item')).to.gte(0);

    } catch (err) {
      assert.fail(err.message);
    }
  });

});