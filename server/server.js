const app = require('./app');
const http = require('http');
const config = require('./config/config');
const mongoose = require('mongoose');

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '8089';

app.set('port', port);
const option = {
  /*
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  */
  useNewUrlParser: true,
  dbName: 'pix'
}
//if (process.env.NODE_ENV !== 'test') {
console.log('connection url ' + config.db.url)
mongoose
  .connect(config.db.url, option)
  .then(() => {
    console.log('Database connected.');
  });
//}

http.createServer(app).listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});