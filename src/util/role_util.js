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

// check if there is a role with the id 1 (alumni) and if not add it and check if there is a role with the id 2 (admin) and if not add it and check if there is a role with the id 3 (student) and if not add it
const checkRoles = async () => {
    try {
        const alumniRole = await Role.findOne({
            where: {
                Role_Id: 1
            }
        });
        if (alumniRole) {
            if (alumniRole.Role_Name !== "Alumni" || alumniRole.Role_Description !== "Alumni role") {
                alumniRole.Role_Name = "Alumni";
                alumniRole.Role_Description = "Alumni role";
                await alumniRole.save();
            }
        } else {
            await addRole("Alumni", "Alumni role");
        }
        const adminRole = await Role.findOne({
            where: {
                Role_Id: 2
            }
        });
        if (adminRole) {
            if (adminRole.Role_Name !== "Admin" || adminRole.Role_Description !== "Admin role") {
                adminRole.Role_Name = "Admin";
                adminRole.Role_Description = "Admin role";
                await adminRole.save();
            }
        } else {
            await addRole("Admin", "Admin role");
        }
        const studentRole = await Role.findOne({
            where: {
                Role_Id: 3
            }
        });
        if (studentRole) {
            if (studentRole.Role_Name !== "Student" || studentRole.Role_Description !== "Student role") {
                studentRole.Role_Name = "Student";
                studentRole.Role_Description = "Student role";
                await studentRole.save();
            }
        } else {
            await addRole("Student", "Student role");
        }
        const hrRole = await Role.findOne({
            where: {
                Role_Id: 4
            }
        });
        if (hrRole) {
            if (hrRole.Role_Name !== "HR" || hrRole.Role_Description !== "HR role") {
                hrRole.Role_Name = "HR";
                hrRole.Role_Description = "HR role";
                await hrRole.save();
            }
        }
        else {
            await addRole("HR", "HR role");
        }
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    addRole,
    getRoles,
    getRoleByName,
    checkRoles
}
