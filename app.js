const express = require('express');
const PORT = process.env.PORT || 3008;
const db = require('./src/config/db_config');
const app = express();
const util = require('./src/util/util');
const cors = require('cors');
const session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);



db.authenticate()
    .then(() => {
        console.log("\x1b[32m", 'Database connection has been established successfully.');
    })
    .catch(err => {
        console.error("\x1b[31m", 'Unable to connect to the database:', err);
    });


util.syncTables().then(() => {
    console.log("\x1b[34m%s\x1b[0m", 'Tables synced successfully.');
}).catch((err) => {
    console.log("\x1b[31m", 'Error syncing tables:');
    console.error("\x1b[31m", err);
});

const sessionStore = new SequelizeStore({
    db: db,
    modelKey: 'Session',
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
});
sessionStore.sync();
app.use(session({
    secret: 'a very strong secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// Set middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set middleware for serving static files
app.use(express.static('public'));
// Set middleware for CORS
app.use(cors());

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
