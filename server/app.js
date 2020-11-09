const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const multer = require('multer');
const upload = multer({
    dest: 'pix4funImages/'
})

const users = require('./api/users/userRoute');
const orders = require('./api/orders/orderRoute');

const app = express();
const cors = require('cors');

let env = process.env.NODE_ENV || 'dev';

//if (env === 'dev') {
    console.log('configuring cors for dev environment.');
    let whitelist = ['http://localhost:3000', 'http://0.0.0.0:3000'];

    let corsOptions = {
        origin: function (origin, callback) {
            callback(null, true)
            /*
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
            */
        },
        methods: 'DELETE, POST, GET, OPTIONS, PUT',
        allowedHeaders: "Content-Type, Authorization"
    }
    app.use(cors(corsOptions));
//}
app.use(express.static("dist"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


/*
app.use((req, res, next) => {
    req.isAuth = true;
    next();
});
*/
app.use('/api/users', users);

app.use('/api/orders', upload.array('uploaded_file', 12), orders);

//e2e means end to end test outside production
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'e2e') {
    app.use('/static', express.static('build/static'))
    app.use('/img', express.static('build/img'))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, './build/index.html'));
    });
}

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            error: error.code,
            message: error.message
        }
    });
});

module.exports = app;