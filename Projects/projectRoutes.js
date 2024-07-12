const express = require("express");
const router = express.Router();
const { CreateProject } = require("../Projects/projectController");
//const { adminChecker } = require("../Admin/adminChecker");

router.route("/createProject").post(CreateProject);



module.exports = router;