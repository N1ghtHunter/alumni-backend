
// verify session
const isAlumni = (req, res, next) => {
    if (req.session.RoleName === "Alumni" && req.session.IsLoggedIn) {
        next();
    } else {
        res.status(401).send({ success: false, message: 'Unauthorized.' });
    }
}

const isAdmin = (req, res, next) => {
    if (req.session.RoleName === "Admin" && req.session.IsLoggedIn) {
        next();
    } else {
        res.status(401).send({ success: false, message: 'Unauthorized.' });
    }
}

const isStudent = (req, res, next) => {
    if (req.session.RoleName === "Student" && req.session.IsLoggedIn) {
        next();
    } else {
        res.status(401).send({ success: false, message: 'Unauthorized.' });
    }
}

const isHR = (req, res, next) => {
    if (req.session.RoleName === "HR" && req.session.IsLoggedIn) {
        next();
    } else {
        res.status(401).send({ success: false, message: 'Unauthorized.' });
    }
}

module.exports = {
    isAlumni,
    isAdmin,
    isStudent,
    isHR
}
