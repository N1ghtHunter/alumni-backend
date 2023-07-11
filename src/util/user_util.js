const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

const ALUMNI_ROLE_ID = 1;

const addAlumni = async ({ UserName, Password, Email, National_Id }) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        await User.create({
            UserName: UserName,
            Password: hashedPassword,
            Email: Email,
            National_Id: National_Id,
            Role_Id: ALUMNI_ROLE_ID
        });
    } catch (err) {
        throw err;
    }
}

const getAlumni = async (UserName) => {
    try {
        const alumni = await User.findOne({
            where: {
                UserName: UserName,
                Role_Id: ALUMNI_ROLE_ID
            }
        });
        return alumni;
    } catch (err) {
        throw err;
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const updatePhone = async (User_Id, Phone) => {
    try {
        await User.update({
            Phone: Phone
        }, {
            where: {
                User_Id: User_Id
            }
        });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addAlumni,
    getAlumni,
    comparePassword,
    updatePhone,
}