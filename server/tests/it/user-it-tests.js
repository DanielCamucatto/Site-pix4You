process.env.NODE_ENV = 'test';
const assert = require("assert");
const mongoose = require('mongoose');
const config = require('../../config/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
let User = require('./../../api/users/user');
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
const USER_URL = '/api/users/';

const VALID_USER_MOCK = {
  'username': 'Jean Grey',
  'email': 'jean@mail.com',
  'phoneNumber': '1199556655'
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

describe('Users ', () => {

  before(() => {
    server = require('../../server');
  });

  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      // console.log('error erasing user data');
    });
    done();
  });

  it('it should not find user by id.', async () => {

    var result = await chai.request(SERVER_APPLICATION_HOST).get(USER_URL + USER_ID);

    expect(result.status).to.equal(404);

  });

  it('it should create an user.', async () => {

    try {

      var result = await postCall(USER_URL, VALID_USER_MOCK);

      expect(result.status).to.equal(201);
      expect(result.body.user).to.have.property('email');
      expect(result.body.user).to.have.property('_id');

    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('invalid user should return bad request error.', async () => {

    try {

      let tempUser = VALID_USER_MOCK;
      delete tempUser.email;

      var result = await postCall(USER_URL, tempUser);

      expect(result.status).to.equal(400);

    } catch (err) {
      assert.fail(err.message);
    }
  });

});

async function postCall(url, body) {
  return chai.request(SERVER_APPLICATION_HOST).post(url).send(body);
}