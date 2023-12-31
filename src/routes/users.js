const router = require('express').Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const { isAlumni, isStudent, isHR, isAuthorized, isAlumniOrStudent, isProfessor } = require('../middlewares/Auth');
const { createLimiter } = require('../utils/util');
//! Deprecated routes - do not use
// router.post('/alumni_signup', usersController.addAlumni); //* Use /auth/register instead
// router.post('/student_signup', usersController.addStudent); //* Use /auth/register instead
// router.post('/hr_signup', usersController.addHR); //* Use /auth/register instead
// router.get('/is_logged_in', isAuthorized, authController.isLoggedIn); //* Use /auth/status instead
// router.get('/logout', isAuthorized, authController.logout); //* Use /auth/logout instead
// router.post('/reset_password', authController.sendResetPasswordEmail); //* Use /auth/reset_password instead
// router.post('/reset_password/:token', authController.changePassword); //* Use /auth/reset_password/:token instead
//! End of deprecated routes

router.get('/get_alumni', isAlumni, usersController.getAlumni);

router.get('/get_student', isStudent, usersController.getStudent);

router.get('/get_hr', isHR, usersController.getHR);

router.post('/professor_signup', usersController.addProfessor);

router.get('/get_professor', isProfessor, usersController.getProfessor);

router.post('/check_national_id', usersController.checkNationalIdExists);

router.post('/check_email', usersController.checkEmailExists);

router.post('/check_user_name', usersController.checkUserNameExists);

router.post('/check_academic_id', usersController.checkAcademicIdExists);

router.put('/update_phone', isAuthorized, usersController.updatePhone);

// upload picture
router.post('/upload_picture', isAuthorized, usersController.uploadProfilePicture);

router.post('/upload_cv', isAlumniOrStudent, usersController.uploadCV);

router.put('/update_about', isAuthorized, usersController.updateAbout);

router.put('/update_country', isAuthorized, usersController.updateCountry);

router.put('/update_social_urls', isAuthorized, usersController.updateSocialUrls);

router.put('/update_name', isAuthorized, usersController.updateName);

router.put('/update_position', isAuthorized, usersController.updatePosition);
const genCvLimit = createLimiter(1000 * 60 * 60, 10); // 1 h window, max 10 request
router.get('/generate_cv', isAuthorized, genCvLimit, usersController.generateCV);

//! Deprecated route - do not use
router.get('/fetch_cookie', (req, res, next) => {
	try {
		// extract cookie from request
		console.log('Cookies: ');
		console.log(req.cookies);
		console.log('Signed Cookies: ', req.signedCookies);
		res.status(200).send({ success: true, message: 'Cookie fetched successfully.', cookie: req.cookies });
	} catch (err) {
		next(err);
	}
});

router.delete('/delete_profile_picture', isAuthorized, usersController.deleteProfilePicture);

router.delete('/delete_cv', isAuthorized, usersController.deleteCV);

router.delete('/delete_behance_url', isAuthorized, usersController.deleteBehanceUrl);

router.delete('/delete_github_url', isAuthorized, usersController.deleteGitHubUrl);

router.delete('/delete_linkedin_url', isAuthorized, usersController.deleteLinkedInUrl);

router.delete('/delete_about', isAuthorized, usersController.deleteAbout);

router.delete('/delete_phone', isAuthorized, usersController.deletePhone);

router.get('/', isAuthorized, usersController.getFullUser);

module.exports = router;
