const { DataTypes, Model } = require("sequelize");
const db = require("../config/db_config");
const Experience = require("./Experience");
const Users_Skills = require("./Users_Skills");

class Experience_Skills extends Model { }

Experience_Skills.init({
    Experience_Skill_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Experience_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Experience,
            key: 'Experience_Id'
        }
        ,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

    User_Skill_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize: db,
    modelName: 'Experience_Skills',
    tableName: 'Experience_Skills',
});

// one to one relation between Experience_Skills and Users_Skills
Users_Skills.belongsTo(Experience_Skills, { foreignKey: 'User_Skill_Id' });
Experience_Skills.hasOne(Users_Skills, { foreignKey: 'User_Skill_Id' });

module.exports = Experience_Skills;

