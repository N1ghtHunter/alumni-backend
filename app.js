const express = require('express');
const PORT = process.env.PORT || 3008;
const db = require('./src/config/db_config');
const app = express();

db.authenticate()
    .then(() => {
        console.log("\x1b[32m", 'Database connection has been established successfully.');
    })
    .catch(err => {
        console.error("\x1b[31m", 'Unable to connect to the database:', err);
    });


// Set middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set middleware for serving static files
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log("\x1b[32m", `Server listening on: http://localhost:${PORT}`);
});

module.exports = app; // Exporting for testing purposes
