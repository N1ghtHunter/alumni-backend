const { DataTypes, Model } = require("sequelize");
const db = require("../config/db_config");

class Roles extends Model { }

Roles.init({
    Role_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Role_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Role_Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Roles',
    tableName: 'Roles',
});

module.exports = Roles;