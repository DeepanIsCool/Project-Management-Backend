const express = require("express");
const router = express.Router();
const { CreateProject, EditProject, getProjects, applyForProject, approveApplication,getAllApplications, deleteProject,getAllProjects } = require("../Projects/projectController");
const { facultyChecker } = require("../Faculty/facultyChecker");
const { studentsChecker } = require("../Students/studentsChecker");
//const { adminChecker } = require("../Admin/adminChecker");

router.route("/createProject").post(facultyChecker,CreateProject);
router.route("/editProject").put(facultyChecker,EditProject);
router.route("/getProjects").get(facultyChecker,getProjects);
// router.route("/getProjects/:id").get(studentsChecker,getProjects);
router.route("/applyforProject").post(studentsChecker,applyForProject);
router.route("/approveforProject").post(facultyChecker,approveApplication);
router.route("/getallapplications").get(facultyChecker,getAllApplications);
router.route("/deleteProject").delete(facultyChecker,deleteProject);
router.route("/getAllProjects").get(studentsChecker,getAllProjects);

module.exports = router;