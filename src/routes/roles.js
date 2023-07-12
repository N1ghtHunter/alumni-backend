const role_util = require('../util/role_util');
const router = require('express').Router();

router.post('/addRole', async (req, res, next) => {
    const { Role_Name, Role_Description } = req.body;
    if (!Role_Name || !Role_Description)
        return res.status(400).send('Please provide a role name and description.');
    try {
        await role_util.addRole(Role_Name, Role_Description);
        res.status(200).send({ success: true });
    }
    catch (err) {
        next(err);
    }
});

router.get('/getRoles/:name', async (req, res, next) => {
    if (!req.params.name) {
        try {
            const roles = await role_util.getRoles();
            res.status(200).send({ success: true, roles: roles });
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        try {
            const role = await role_util.getRoleByName(req.params.name);
            res.status(200).send({ success: true, role: role });
        }
        catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;
