const express = require("express");
const router = express.Router();
const { CreateProject, EditProject } = require("../Projects/projectController");
//const { adminChecker } = require("../Admin/adminChecker");

router.route("/createProject").post(CreateProject);
router.route("/editProject").post(EditProject);


module.exports = router;