const express = require("express");
const router = express.Router();
const { CreateProject, EditProject, getAllProjects, applyForProject, approveApplication } = require("../Projects/projectController");
const { facultyChecker } = require("../Faculty/facultyChecker");
const { studentsChecker } = require("../Students/studentsChecker");
//const { adminChecker } = require("../Admin/adminChecker");

router.route("/createProject").post(facultyChecker,CreateProject);
router.route("/editProject/:id").put(facultyChecker,EditProject);
router.route("/getProject").get(facultyChecker,getAllProjects);
router.route("/applyforProject").post(applyForProject);
router.route("/approveforProject").post(approveApplication);

module.exports = router;