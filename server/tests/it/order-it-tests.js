process.env.NODE_ENV = 'test';
const assert = require("assert");
const mongoose = require('mongoose');
const config = require('../../config/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
let Order = require('../../api/orders/order');
//const server = require('../../server');
//const DB = require('mongoose').Db;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

chai.use(chaiHttp);
let mongoServer;
let con;
let db;

const expect = chai.expect;

const SERVER_APPLICATION_HOST = 'http://localhost:8089';
const USER_ID = '5c48eada47227ff3460dce9b';
const ORDER_URL = '/api/orders/';


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

      var result = await postCall(ORDER_URL, generateValidOrderMock());

      expect(result.status).to.equal(201);
      expect(result.body.order).to.have.property('userEmail');
      expect(result.body.order).to.have.property('_id');
      expect(result.body.order.status).to.equal('CREATED');

    } catch (err) {
      console.log(err)
      assert.fail(err.message);
    }
  });

  it('invalid order with no email should return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();
      delete tempOrder.userEmail;

      var result = await postCall(ORDER_URL, tempOrder);

      expect(result.status).to.equal(400);

    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('invalid order with invalid item id should return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();
      tempOrder.itemId = 0;

      var result = await postCall(ORDER_URL, tempOrder);

      expect(result.status).to.equal(400);

    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('not order with invalid item id should return bad request error.', async () => {

    try {

      let tempOrder = generateValidOrderMock();
      delete tempOrder.itemId;

      var result = await postCall(ORDER_URL, tempOrder);

      expect(result.status).to.equal(400);

    } catch (err) {
      assert.fail(err.message);
    }
  });

});

async function postCall(url, body) {
  return chai.request(SERVER_APPLICATION_HOST).post(url).send(body);
}


//vitimas ?

//vindima?