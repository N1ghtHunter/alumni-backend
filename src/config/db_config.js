const { Sequelize } = require('sequelize');
const config = require('./config');

module.exports = new Sequelize(
    config.DB_NAME,
    config.DB_USER_NAME,
    config.DB_PASSWORD,
    {
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            acquire: 120000,
            idle: 120000
        },
        dialectOptions: {
            ecrypt: true,
            options: {
                requestTimeout: 120000
            }
        },
        host: config.DB_HOST,
        port: config.DB_PORT,
        logging: false
    },
);

