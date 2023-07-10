const { DataTypes, Model } = require("sequelize");
const db = require("../config/db_config");
class Skills extends Model { }

Skills.init({
    Skill_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Skill_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Skill_Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Skills',
    tableName: 'Skills',
});

module.exports = Skills;

