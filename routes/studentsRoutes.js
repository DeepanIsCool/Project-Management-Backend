//studentRoutes.js
const express = require('express');
const { Sign_upvalidation } = require('../controllers/authController');
const router = express.Router();

router.route("/getStudentData").post(Sign_upvalidation);

module.exports = router;
