const express = require('express');
const PORT = process.env.PORT || 3008;
const db = require('./src/config/db_config');
const app = express();
const util = require('./src/util/util');
const cors = require('cors');
const session = require('express-session');
const { checkRoles } = require('./src/util/role_util');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


db.authenticate()
    .then(() => {
        console.log("\x1b[32m", 'Database connection has been established successfully.');
    })
    .catch(err => {
        console.error("\x1b[31m", 'Unable to connect to the database:', err);
    });


util.syncTables().then(() => {
    console.log("\x1b[34m%s\x1b[0m", 'Tables synced successfully.');
})
    .then(() => {
        checkRoles().then(() => {
            console.log("\x1b[34m%s\x1b[0m", 'Roles checked successfully.');
        }).catch((err) => {
            console.log("\x1b[31m", 'Error checking roles:');
            console.error("\x1b[31m", err);
        });
    })
    .catch((err) => {
        console.log("\x1b[31m", 'Error syncing tables:');
        console.error("\x1b[31m", err);
    });

const sessionStore = new SequelizeStore({
    db: db,
    modelKey: 'Session',
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    // Default is 1 week
    expiration: 7 * 24 * 60 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
});
sessionStore.sync();
// Set middleware for sessions
app.use(session({
    secret: 'a very strong secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    }
}));

// Set middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set middleware for serving static files
app.use(express.static('public'));
// Set middleware for CORS
app.use(cors());

// check if public/uploads folder exists and if not create it
const uploadsFolder = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder);
}
// check if public/uploads/pictures folder exists and if not create it
const picturesFolder = path.join(__dirname, 'public', 'uploads', 'pictures');
if (!fs.existsSync(picturesFolder)) {
    fs.mkdirSync(picturesFolder);
}
// check if public/uploads/cvs folder exists and if not create it
const cvsFolder = path.join(__dirname, 'public', 'uploads', 'cvs');
if (!fs.existsSync(cvsFolder)) {
    fs.mkdirSync(cvsFolder);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'picture') {
            cb(null, 'public/uploads/pictures');
        }
        else if (file.fieldname === 'cv') {
            cb(null, 'public/uploads/cvs');
        }
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } }).fields([{ name: 'picture', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);
app.use(upload);



app.listen(PORT, () => {
    console.log("\x1b[1m", `Server listening on: http://localhost:${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("\x1b[31m", err.stack);
    res.status(500).send('Something broke!');
});


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/users', require('./src/routes/users'));
app.use('/api/roles', require('./src/routes/roles'));

// 404 middleware
app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});
module.exports = app; // Exporting for testing purposes
