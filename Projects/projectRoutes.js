const express = require("express");
const router = express.Router();
const { CreateProject, EditProject, getAllProjects } = require("../Projects/projectController");
//const { adminChecker } = require("../Admin/adminChecker");

router.route("/createProject").post(CreateProject);
router.route("/editProject/:id").put(EditProject);
router.route("/getProject").get(getAllProjects);

module.exports = router;