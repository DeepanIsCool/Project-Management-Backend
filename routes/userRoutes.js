//userRoutes.js
const express = require("express");
const router = express.Router();
const {
  Sign_up,
  Sign_upvalidation,

} = require("../controllers/authController");

router.route("/signup").post(Sign_up);
router.route("/signupvalidation").post(Sign_upvalidation);
// router.route("/callback").get(pjwt_callback);

module.exports = router;