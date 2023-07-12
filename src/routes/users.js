const router = require('express').Router();
const user_util = require('../util/user_util');
const { isAlumni, isStudent, isHR, isAuthorized } = require('../util/Auth');
router.post('/alumni_signup', async (req, res, next) => {
    try {
        const { UserName, Password, Email, National_Id } = req.body;
        if (!UserName || !Password || !Email || !National_Id) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        if (await user_util.checkEmailExists(Email) || await user_util.checkNationalIdExists(National_Id) || await user_util.checkUserNameExists(UserName)) {
            res.status(400).send({ success: false, message: 'Email or National Id or User Name already exists.' });
            return;
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
        res.clearCookie('connect.sid');
        res.status(200).send({ success: true, message: 'Alumni logged out successfully.' });
    } catch (err) {
        next(err);
    }
});

router.put('/update_phone', isAuthorized, async (req, res, next) => {
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

router.post('/check_national_id', async (req, res, next) => {
    try {
        const { NID } = req.body;
        if (!NID) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        const exists = await user_util.checkNationalIdExists(NID);
        if (exists) {
            res.status(200).send({ success: false, message: 'National Id exists please try another one..' });
        }
        else {
            res.status(404).send({ success: true, message: 'National Id does not exist.' });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/check_email', async (req, res, next) => {
    try {
        const { Email } = req.body;
        if (!Email) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        const exists = await user_util.checkEmailExists(Email);
        if (exists) {
            res.status(200).send({ success: false, message: 'Email already exists please try another one.' });
        }
        else {
            res.status(404).send({ success: true, message: 'Email does not exist.' });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/check_user_name', async (req, res, next) => {
    try {
        const { UserName } = req.body;
        if (!UserName) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        const exists = await user_util.checkUserNameExists(UserName);
        if (exists) {
            res.status(200).send({ success: false, message: 'User Name exists please try another one..' });
        }
        else {
            res.status(200).send({ success: true, message: 'User Name does not exist.' });
        }
    } catch (err) {
        next(err);
    }
});

// check if user is logged in
router.get('/is_logged_in', (req, res, next) => {
    try {
        if (req.session.IsLoggedIn) {
            const actor = req.session.RoleName;
            res.status(200).send({ success: true, message: 'User is logged in.', actor });
        }
        else {
            res.status(404).send({ success: false, message: 'User is not logged in.' });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/get_alumni', isAlumni, async (req, res, next) => {
    try {
        const { UserName } = req.session;
        const alumni = await user_util.getAlumni(UserName);
        if (!alumni) {
            res.status(404).send({ success: false, message: 'Alumni not found.' });
            return;
        }
        res.status(200).send({ success: true, alumni });
    } catch (err) {
        next(err);
    }
});

router.post('/student_signup', async (req, res, next) => {
    try {
        const { UserName, Password, Email, National_Id, Academic_Id } = req.body;
        if (!UserName || !Password || !Email || !National_Id || !Academic_Id) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        if (await user_util.checkEmailExists(Email) || await user_util.checkNationalIdExists(National_Id) || await user_util.checkUserNameExists(UserName)) {
            res.status(400).send({ success: false, message: 'Email or National Id or User Name already exists.' });
            return;
        }
        console.log({ UserName, Password, Email, National_Id, Academic_Id });
        await user_util.addStudent({ UserName, Password, Email, National_Id, Academic_Id });
        res.status(201).send({ success: true, message: 'Student added successfully.' });
    } catch (err) {
        next(err);
    }
});

router.post('/student_login', async (req, res, next) => {
    try {
        const { UserName, Password } = req.body;
        if (!UserName || !Password) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
        }
        const student = await user_util.getStudent(UserName);
        if (!student) {
            res.status(404).send({ success: false, message: 'Student not found.' });
        } else {
            const isMatch = await user_util.comparePassword(Password, student.Password);
            if (!isMatch) {
                res.status(401).send({ success: false, message: 'Invalid credentials.' });
            } else {
                req.session.RoleName = "Student";
                req.session.IsLoggedIn = true;
                req.session.User_Id = student.User_Id;
                req.session.UserName = student.UserName;
                // log session
                console.log(req.session);
                res.status(200).send({
                    success: true,
                    actor: "Student",
                    user_id: student.User_Id,
                    user_name: student.UserName,
                    message: 'Student logged in successfully.'
                });
            }
        }
    } catch (err) {
        next(err);
    }
});

router.get('/student_logout', isStudent, (req, res, next) => {
    try {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.status(200).send({ success: true, message: 'Student logged out successfully.' });
    } catch (err) {
        next(err);
    }
});

router.get('/get_student', isStudent, async (req, res, next) => {
    try {
        const { UserName } = req.session;
        const student = await user_util.getStudent(UserName);
        if (!student) {
            res.status(404).send({ success: false, message: 'Student not found.' });
            return;
        }
        res.status(200).send({ success: true, student });
    } catch (err) {
        next(err);
    }
});

router.post("/hr_signup", async (req, res, next) => {
    try {
        const { UserName, Password, Email, LastName, FirstName } = req.body;
        if (!UserName || !Password || !Email || !FirstName || !LastName) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        if (await user_util.checkEmailExists(Email) || await user_util.checkUserNameExists(UserName)) {
            res.status(400).send({ success: false, message: 'Email or National Id or User Name already exists.' });
            return;
        }
        await user_util.addHR({ UserName, Password, Email, FirstName, LastName });
        res.status(201).send({ success: true, message: 'HR added successfully.' });
    } catch (err) {
        next(err);
    }
});

router.post('/hr_login', async (req, res, next) => {
    try {
        const { UserName, Password } = req.body;
        if (!UserName || !Password) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
        }
        const hr = await user_util.getHR(UserName);
        if (!hr) {
            res.status(404).send({ success: false, message: 'HR not found.' });
        } else {
            const isMatch = await user_util.comparePassword(Password, hr.Password);
            if (!isMatch) {
                res.status(401).send({ success: false, message: 'Invalid credentials.' });
            } else {
                req.session.RoleName = "HR";
                req.session.IsLoggedIn = true;
                req.session.User_Id = hr.User_Id;
                req.session.UserName = hr.UserName;
                // log session
                console.log(req.session);
                res.status(200).send({
                    success: true,
                    actor: "HR",
                    user_id: hr.User_Id,
                    user_name: hr.UserName,
                    message: 'HR logged in successfully.'
                });
            }
        }
    } catch (err) {
        next(err);
    }
});

router.get('/hr_logout', isHR, (req, res, next) => {
    try {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.status(200).send({ success: true, message: 'HR logged out successfully.' });
    } catch (err) {
        next(err);
    }
});

// upload picture
router.post('/upload_alumni_picture', isAlumni, async (req, res, next) => {
    try {
        const { User_Id } = req.session;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send({ success: false, message: 'No files were uploaded.' });
            return;
        }
        const { picture } = req.files;
        const pictureName = picture[0].filename;
        console.log(pictureName);
        await user_util.uploadAlumniPicture(User_Id, pictureName);
        res.status(200).send({ success: true, message: 'Picture uploaded successfully.' });
    } catch (err) {
        next(err);
    }
});

router.put('/update_about', isAuthorized, async (req, res, next) => {
    try {
        const { User_Id } = req.session;
        const { About } = req.body;
        if (!About) {
            res.status(400).send({ success: false, message: 'Missing credentials.' });
            return;
        }
        await user_util.updateAbout(User_Id, About);
        res.status(200).send({ success: true, message: 'About updated successfully.' });
    } catch (err) {
        next(err);
    }
});






module.exports = router;
