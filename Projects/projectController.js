const asyncHandler = require("express-async-handler");
const Project = require("./projectModel");
const ProjectAssignment = require("./projectApplicationModel");
const constants = require("../constants");
const FacultyUser = require("../Faculty/facultyUserModel");
const StudentUser = require("../Students/studentsUserModel");
const Faculty = require("../Faculty/facultyUserModel");

const CreateProject = asyncHandler(async (req, res) => {
    // Destructure required fields from formData
    const { project_name, launchDate, launchTime, status, expiryDate, expiryTime, requirements, projectDuration, description } = req.body;

    // Check if all required fields are present
    if (!project_name || !launchDate || !launchTime || !status || !expiryDate || !expiryTime || !requirements || !projectDuration || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if a project with the same project_name already exists
    const existingProject = await Project.findOne({ project_name });
    if (existingProject) {
        return res.status(400).json({ error: "A project with the same project_name already exists" });
    }

    // Create new project
    const newProject = new Project({
        project_name,
        launchDate,
        launchTime,
        status,
        expiryDate,
        expiryTime,
        projectDuration,
        description,
        requirements,
        createdBY: req.user._id, // Assume user ID is available in req.user
    });

    // Save the Project to the database
    try {
        const savedProject = await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: savedProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Error creating project", message: error.message });
    }
});

const getAllApplications = asyncHandler(async (req, res) => {
  try {
    // Extract facultyId from the authenticated user
    const facultyId = req.user.id;

    // Find all project applications where the head_facultyId matches the facultyId
    const applications = await ProjectAssignment.find({ head_facultyId: facultyId });

    // Return the applications in the response
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const EditProject = async (req, res) => {
    try {
      
      const {project_name,launchDate,launchTime,status,expiryDate,expiryTime,projectDuration,description,requirements} = req.body;
  
      let project = await Project.findById(req.params.id);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
     
  
      if (project_name || launchDate ||launchTime ||status ||expiryDate ||expiryTime ||projectDuration ||description ||requirements ) {
        if (project_name) project.project_name = project_name;
        if (description) project.description = description;
        if (launchDate) project.launchDate = launchDate;
        if (launchTime) project.launchTime = launchTime;
        if (status) project.status = status;
        if (expiryDate) project.expiryDate = expiryDate;
        if (expiryTime) project.expiryTime = expiryTime;
        if (projectDuration) project.projectDuration = projectDuration;
        if (requirements) project.requirements = requirements;
      } else {
        return res.status(400).json({ error: "At least one field should be provided for update" });
      }
  
        project.save();
  
      res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// Function to get all projects
const getProjects = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the request

    // Fetch and return all projects for which the user is the head faculty (createdBY)
    const projects = await Project.find({ createdBY: userId });

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this user' });
    }

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Student applies for a project
const applyForProject = async (req, res) => {
  const projectId = req.params.id;
  // console.log(projectId);
  const { studentId } = req.body;
  // console.log(studentId);

  try {
    // Fetch the project using the provided project ID
    const project = await Project.findById({_id:projectId});
    console.log(project);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Extract the faculty ID from the project
    // const facultyId = project.createdBY;
    // // console.log(facultyId);

    // // Check if the faculty exists
    // const facultyuser = await FacultyUser.findById({_id:facultyId});
    // if (!facultyuser) {
    //   return res.status(404).json({ message: 'FacultyUser not found' });
    // }

    // Check if the student has already applied for this project
    const existingApplication = await ProjectAssignment.findOne({ studentId, projectId });
    console.log(existingApplication);
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this project' });
    }
    const student = await StudentUser.findById({_id:studentId});
    console.log(student);
    // Create a new project assignment
    const application = new ProjectAssignment({
      studentId: studentId,
      projectId: projectId,
      head_facultyId: project.createdBY,
      student_name: student.name,
      project_name: project.project_name,
    });

    await application.save();

    // Return a success response
    res.status(201).json({ message: 'Application submitted successfully' , application: application});
  } catch (error) {
    // Log and return the error
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const approveApplication = async (req, res) => {
  const { applicationId, status } = req.body; // status can be 'approve' or 'reject'
  console.log(applicationId,status);
  try {
      // Find the application by ID and populate project details
      const application = await ProjectAssignment.findById({_id:applicationId});
      console.log(application);
      if (!application) {
          return res.status(404).json({ message: 'Application not found' });
      }

      // Check if the requesting user is authorized to approve the application
      // if (application.projectId.facultyId.toString() !== req.user._id.toString()) {
      //     return res.status(403).json({ message: 'You are not authorized to approve this application' });
      // }

      // Handle the status (approve or reject)
      if (status === 'Approved') {
          application.status = 'Approved';
          // await Project.findByIdAndUpdate(application.projectId._id, {
          //     $addToSet: { approvedStudents: application.studentId }
          // });
          await application.save();
          res.status(200).json({ message: 'Application approved successfully' });
      } else if (status === 'Rejected') {
          await ProjectAssignment.findByIdAndDelete(applicationId);
          res.status(200).json({ message: 'Application rejected and deleted successfully' });
      } else {
          return res.status(400).json({ message: 'Invalid status' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


  
module.exports = { getProjects, EditProject, CreateProject, applyForProject, approveApplication, getAllApplications };
  

