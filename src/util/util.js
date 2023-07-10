const User = require('../models/User');
const Role = require('../models/Role');
const Skill = require('../models/Skill');
const Users_Skills = require('../models/Users_Skills');
const ExperienceSkills = require('../models/Experience_Skills');
const Experience = require('../models/Experience');


const syncTables = async () => {
    await User.sync();
    await Role.sync();
    await Skill.sync();
    await Users_Skills.sync();
    await Experience.sync();
    await ExperienceSkills.sync();
}

module.exports = {
    syncTables
}