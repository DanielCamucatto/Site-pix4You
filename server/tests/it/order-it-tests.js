process.env.NODE_ENV = 'test';
const fs = require('fs')
const assert = require("assert");
const mongoose = require('mongoose');
const config = require('../../config/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
let Order = require('../../api/orders/order');
//const server = require('../../server');
//const DB = require('mongoose').Db;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const FILE_TEST = '\\resources\\favicon.ico';
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
    itemId: 1
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

  before(() => {
    server = require('../../server');
  });

  beforeEach((done) => {
    Order.deleteMany({}, (err) => {
      // console.log('error erasing user data');
    });
    done();
  });

  it('it should create an order.', async () => {

    try {

      let tempOrder = generateValidOrderMock();

      var result = await chai.request(SERVER_APPLICATION_HOST).post(ORDER_URL)
        .set('Content-Type', FORM_CONTENT_TYPE)
        .field('userEmail', tempOrder.userEmail)
        .field('phoneNumber', tempOrder.phoneNumber)
        .field('itemId', tempOrder.itemId)
        .attach('uploaded_file', fs.readFileSync(__dirname + FILE_TEST), 'favicon.ico')

      expect(result.status).to.equal(201);
      expect(result.body.order).to.have.property('userEmail');
      expect(result.body.order).to.have.property('_id');
      expect(result.body.order.status).to.equal('CREATED');
      expect(fs.existsSync(IMAGES_TMP_FOLDER + '/' + result.body.order.images[0])).to.equal(true);

    } catch (err) {
      console.log(err)
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

    } catch (err) {
      assert.fail(err.message);
    }
  });

});