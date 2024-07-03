//studentRoutes.js
const express = require('express');
const { Sign_upvalidation } = require('../controllers/authController');
const { Sign_up } = require('../controllers/authController');
const { ValidateEmailOTP } = require('../controllers/authController');
const router = express.Router();

router.route("/signup").post(Sign_up);
router.route("/getStudentData").post(Sign_upvalidation);
router.route("/ValidateEmailOtp").post(ValidateEmailOTP);

module.exports = router;
