const { Sequelize } = require('sequelize');
const config = require('./config');

module.exports = new Sequelize(config.DB_NAME, config.DB_USER_NAME, config.DB_PASSWORD, {
    dialect: 'mysql',
    host: config.DB_HOST,
    port: config.DB_PORT,
    logging: false
});