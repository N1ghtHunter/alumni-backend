const router = require('express').Router();
const user_util = require('../util/user_util');
const { isAlumni } = require('../util/Auth');
router.post('/alumni_signup', async (req, res, next) => {
    try {
        const { UserName, Password, Email, National_Id } = req.body;
        if (!UserName || !Password || !Email || !National_Id) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
        }
        await user_util.addAlumni({ UserName, Password, Email, National_Id });
        res.status(201).send({ success: true, message: 'Alumni added successfully.' });
    } catch (err) {
        next(err);
    }
});

router.post('/alumni_login', async (req, res, next) => {
    try {
        const { UserName, Password } = req.body;
        if (!UserName || !Password) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
        }
        const alumni = await user_util.getAlumni(UserName);
        if (!alumni) {
            res.status(404).send({ success: false, message: 'Alumni not found.' });
        } else {
            const isMatch = await user_util.comparePassword(Password, alumni.Password);
            if (!isMatch) {
                res.status(401).send({ success: false, message: 'Invalid credentials.' });
            } else {
                req.session.RoleName = "Alumni";
                req.session.IsLoggedIn = true;
                req.session.User_Id = alumni.User_Id;
                req.session.UserName = alumni.UserName;
                // log session 
                console.log(req.session);
                res.status(200).send({
                    success: true,
                    actor: "Alumni",
                    user_id: alumni.User_Id,
                    user_name: alumni.UserName,
                    message: 'Alumni logged in successfully.'
                });
            }
        }
    } catch (err) {
        next(err);
    }
});

router.get('/alumni_logout', isAlumni, (req, res, next) => {
    try {
        req.session.destroy();
        res.status(200).send({ success: true, message: 'Alumni logged out successfully.' });
    } catch (err) {
        next(err);
    }
});

router.put('/update_phone', isAlumni, async (req, res, next) => {
    try {
        const { User_Id } = req.session;
        const { Phone } = req.body;
        if (!Phone) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        await user_util.updatePhone(User_Id, Phone);
        res.status(200).send({ success: true, message: 'Phone updated successfully.' });
    } catch (err) {
        next(err);
    }
});



module.exports = router;
