//authRoutes.js
const express = require("express");
const router = express.Router();
const {
  Sign_up,
  Sign_upvalidation,
  SendOtpNumber,
  SendOtpEmail,
  ValidateEmailOTP,
  ValidatePhoneNumber,

} = require("../controllers/authController");

router.route("/signup").post(Sign_up);
router.route("/signupvalidation").post(Sign_upvalidation);
router.route("/signupvalidation/validateEmailOTP").post(ValidateEmailOTP);
router.route("/signupvalidation/validatePhoneNumberOTP").post(ValidatePhoneNumber);
router.route("/signup/SendOtpEmail").post(SendOtpEmail);
router.route("/signup/SendOtpNumber").post(SendOtpNumber);
// router.route("/callback").get(pjwt_callback);

module.exports = router;