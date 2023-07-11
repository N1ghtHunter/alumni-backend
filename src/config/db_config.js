const { Sequelize } = require('sequelize');
const config = require('./config');
let sequelize = null;
if (config.NODE_ENV !== "dev") {
    sequelize = new Sequelize(
        config.DB_NAME,
        config.DB_USER_NAME,
        config.DB_PASSWORD,
        {
            logging: false,
            host: config.DB_HOST,
            dialect: 'mysql',
            dialectOptions: {
                ssl: {
                    require: true,
                }
            }
        }
    );
}
else {
    sequelize = new Sequelize(
        config.DB_NAME,
        config.DB_USER_NAME,
        config.DB_PASSWORD,
        {
            logging: false,
            host: config.DB_HOST,
            dialect: 'mysql',
        }
    );
}

module.exports = sequelize;