const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

const ALUMNI_ROLE_ID = 1;
const ADMIN_ROLE_ID = 2;
const STUDENT_ROLE_ID = 3;
const HR_ROLE_ID = 4;

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

//check email existance
async function checkEmailExists(email) {
    const user = await User.findOne({ where: { email } });
    return user !== null;
}

// check National Id existance
async function checkNationalIdExists(National_Id) {
    const user = await User.findOne({ where: { National_Id } });
    return user !== null;
}

// UserName existance
async function checkUserNameExists(UserName) {
    const user = await User.findOne({ where: { UserName } });
    return user !== null;
}

const addStudent = async ({ UserName, Password, Email, National_Id, Academic_Id }) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        await User.create({
            UserName: UserName,
            Password: hashedPassword,
            Email: Email,
            National_Id: National_Id,
            Academic_Id: Academic_Id,
            Role_Id: STUDENT_ROLE_ID
        });
    } catch (err) {
        throw err;
    }
}

const getStudent = async (UserName) => {
    try {
        const student = await User.findOne({
            where: {
                UserName: UserName,
                Role_Id: STUDENT_ROLE_ID
            }
        });
        return student;
    } catch (err) {
        throw err;
    }
}

const addHR = async ({ UserName, Password, Email, FirstName, LastName }) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        await User.create({
            UserName: UserName,
            Password: hashedPassword,
            Email: Email,
            FirstName: FirstName,
            LastName: LastName,
            Role_Id: HR_ROLE_ID
        });
    } catch (err) {
        throw err;
    }
}

const getHR = async (UserName) => {
    try {
        const hr = await User.findOne({
            where: {
                UserName: UserName,
                Role_Id: HR_ROLE_ID
            }
        });
        return hr;
    } catch (err) {
        throw err;
    }
}

const uploadAlumniPicture = async (User_Id, Img) => {
    try {
        await User.update({
            Img: Img
        }, {
            where: {
                User_Id: User_Id
            }
        });
    } catch (err) {
        throw err;
    }
}

const updateAbout = async (User_Id, About) => {
    try {
        await User.update({
            About: About
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
    checkEmailExists,
    checkNationalIdExists,
    checkUserNameExists,
    addStudent,
    getStudent,
    addHR,
    getHR,
    uploadAlumniPicture,
    updateAbout,
}