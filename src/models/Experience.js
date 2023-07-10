const { DataTypes, Model } = require("sequelize");
const db = require("../config/db_config");
const Users = require("./User");

class Experience extends Model { }

Experience.init({
    Experience_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Job_Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Company_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Start_Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    End_Date: {
        type: DataTypes.DATE,
    },
    Job_Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    User_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'User_Id'
        }
        ,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    Salary: {
        type: DataTypes.FLOAT,
    },
    Job_Domain: {
        type: DataTypes.STRING,
    },
    Referral: {
        type: DataTypes.STRING,
    }

}, {
    sequelize: db,
    modelName: 'Experience',
    tableName: 'Experience',
});

module.exports = Experience;
