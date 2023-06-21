const express = require('express');
const PORT = process.env.PORT || 3008;

const app = express();

// Set middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set middleware for serving static files
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log("\x1b[32m", `Server listening on: http://localhost:${PORT}`);
});

module.exports = app; // Exporting for testing purposes
