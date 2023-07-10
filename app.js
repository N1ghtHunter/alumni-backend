const express = require('express');
const PORT = process.env.PORT || 3008;
const db = require('./src/config/db_config');
const app = express();
const util = require('./src/util/util');
const cors = require('cors');

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

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app; // Exporting for testing purposes
