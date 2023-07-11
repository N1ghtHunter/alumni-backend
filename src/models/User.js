const { DataTypes, Model } = require("sequelize");
const db = require("../config/db_config");
const Roles = require("./Role");

class Users extends Model { }

Users.init({
    User_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    UserName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FirstName: {
        type: DataTypes.STRING,
    },
    LastName: {
        type: DataTypes.STRING,
    },
    Role_Id: {
        type: DataTypes.INTEGER,
        references: {
            model: Roles,
            key: 'Role_Id'
        }
        ,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    National_Id: {
        type: DataTypes.STRING,
    },
    Academic_Id: {
        type: DataTypes.STRING,
    },
    Gender: {
        type: DataTypes.STRING,
    },
    CV: {
        type: DataTypes.STRING,
    },
    Img: {
        type: DataTypes.STRING,
    },
    About: {
        type: DataTypes.STRING,
    },
    Color: {
        type: DataTypes.STRING,
    },
    Date_Of_Birth: {
        type: DataTypes.DATE,
    },
    Country: {
        type: DataTypes.STRING,
    },
    GPA: {
        type: DataTypes.FLOAT
    },
    College_Speciality: {
        type: DataTypes.STRING,
    },
    Start_Date_Of_College: {
        type: DataTypes.DATE,
    },
    Graduation_Date_Of_College: {
        type: DataTypes.DATE,
    },
    Grade: {
        type: DataTypes.STRING,
    },
    LinkedIn_URL: {
        type: DataTypes.STRING,
    },
    Behance_URL: {
        type: DataTypes.STRING,
    },
    GitHub_URL: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: db,
    modelName: 'Users',
    tableName: 'Users',
});




module.exports = Users;
