const { DataTypes, Model } = require("sequelize");
const db = require("../config/db_config");
const Users = require("./User");
const Skills = require("./Skill");

class Users_Skills extends Model { }

Users_Skills.init({
    User_Skill_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    User_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Users,
            key: 'User_Id'
        }
        ,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    Skill_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Skills,
            key: 'Skill_Id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    Rate: {
        type: DataTypes.FLOAT,
    }

}, {
    sequelize: db,
    modelName: 'Users_Skills',
    tableName: 'Users_Skills',
});


module.exports = Users_Skills;
