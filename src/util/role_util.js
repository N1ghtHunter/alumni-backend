const Role = require("../models/Role");

const addRole = async (Role_Name, Role_Description) => {
    try {
        await Role.create({
            Role_Name: Role_Name,
            Role_Description: Role_Description
        });
    }
    catch (err) {
        throw err;
    }
}

const getRoles = async () => {
    try {
        const roles = await Role.findAll();
        return roles;
    }
    catch (err) {
        throw err;
    }
}

const getRoleByName = async (Role_Name) => {
    try {
        const role = await Role.findOne({
            where: {
                Role_Name: Role_Name
            }
        });
        return role;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    addRole,
    getRoles,
    getRoleByName
}
