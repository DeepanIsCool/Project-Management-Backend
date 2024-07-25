//studentRoutes.js
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
  studentDetails

} = require("./studentsController");
const { studentsChecker } = require("./studentsChecker");
const { studentDashboard } = require("./studentsDashboard");
const { facultyChecker } = require("../Faculty/facultyChecker");

router.route("/signin").post(Sign_in);
router.route("/signup").post(Sign_up);
router.route("/signupvalidation").post(Sign_upvalidation);
router.route("/signupvalidation/validateEmailOTP").post(ValidateEmailOTP);
router.route("/signupvalidation/validatePhoneNumberOTP").post(ValidatePhoneNumber);
router.route("/signup/SendOtpEmail").post(SendOtpEmail);
router.route("/signup/SendOtpNumber").post(SendOtpNumber);
router.route("/studentDashboard").post(studentsChecker,studentDashboard);
router.route("/studentdetails/:id").get(facultyChecker,studentDetails);
// router.route("/callback").get(pjwt_callback);

module.exports = router;
