const router = require('express').Router();
const { isHR, isAlumniOrStudent, isAuthorized, isAdmin } = require('../middlewares/Auth');
const jobsController = require('../controllers/jobsController');

router.post('/add-job-category', isHR, jobsController.addJobCategory);

router.post('/add-job-post', isHR, jobsController.addJobPost);

router.get('/get-job-categories', isHR, jobsController.getAllJobCategories);

router.get('/get-job-post/:Job_Id', isAuthorized, jobsController.getJobPostById);

router.get('/get-job-posts', isAuthorized, jobsController.getJobPosts);

router.post('/add-job-application', isAlumniOrStudent, jobsController.postJobApplication);

router.get('/user-job-applications', isAlumniOrStudent, jobsController.getJobApplicationsByUser);

router.get('/job-applications/:Job_Id', isHR, jobsController.getJobApplicationsByJob);

router.put('/update-job-application-status', isHR, jobsController.updateJobApplicationStatus);

router.delete('/delete-job-post/:Job_Id', isHR, jobsController.deleteJobPost);

router.delete('/delete-job-category/:Job_Category_Id', isAdmin, jobsController.deleteJobCategory);

module.exports = router;
