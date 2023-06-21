const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, `.env`) });

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
}
