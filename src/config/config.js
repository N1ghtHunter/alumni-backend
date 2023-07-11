const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, `.env`) });

if (process.env.NODE_ENV?.trim() != "dev") {
    module.exports = {
        NODE_ENV: "prod",
        DB_USER_NAME: process.env.DB_USER_NAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        SSL: true
    }
} else {
    module.exports = {
        NODE_ENV: "dev",
        DB_USER_NAME: process.env.DB_USER_NAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: "127.0.0.1",
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        SSL: false
    }
}
