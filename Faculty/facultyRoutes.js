//authRoutes.js
const express = require("express");
const router = express.Router();
const {
  Sign_in,
  Sign_up,
  Sign_upvalidation,
  SendOtpNumber,
  SendOtpEmail,
  ValidateEmailOTP,
  ValidatePhoneNumber,
  getAllFaculty

} = require("./facultyController");
const { facultyChecker } = require("./facultyChecker");
const { facultyDashboard } = require("./facultyDashboard");
const { studentsChecker } = require("../Students/studentsChecker");

router.route("/signin").post(Sign_in);
router.route("/signup").post(Sign_up);
router.route("/signupvalidation").post(Sign_upvalidation);
router.route("/signup/SendOtpEmail").post(SendOtpEmail);
router.route("/signup/SendOtpNumber").post(SendOtpNumber);
router.route("/signupvalidation/validateEmailOTP").post(ValidateEmailOTP);
router.route("/signupvalidation/validatePhoneNumberOTP").post(ValidatePhoneNumber);
router.route("/facultyDashboard").post(facultyChecker,facultyDashboard);
router.route("/getAllFaculty").get(facultyChecker,getAllFaculty);
router.route("/getAllFaculty").get(studentsChecker,getAllFaculty);
// router.route("/callback").get(pjwt_callback);

module.exports = router;