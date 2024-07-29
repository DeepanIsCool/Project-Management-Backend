const express = require("express");
const router = express.Router();
const { CreateProject, EditProject, getProjects, applyForProject, approveApplication,getAllApplications } = require("../Projects/projectController");
const { facultyChecker } = require("../Faculty/facultyChecker");
const { studentsChecker } = require("../Students/studentsChecker");
//const { adminChecker } = require("../Admin/adminChecker");

router.route("/createProject").post(facultyChecker,CreateProject);
router.route("/editProject/:id").put(facultyChecker,EditProject);
router.route("/getProjects").get(facultyChecker,getProjects);
// router.route("/getProjects/:id").get(studentsChecker,getProjects);
router.route("/applyforProject/:id").post(applyForProject);
router.route("/approveforProject").post(facultyChecker,approveApplication);
router.route("/getallapplications").get(facultyChecker,getAllApplications);

module.exports = router;