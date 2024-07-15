const asyncHandler = require("express-async-handler");
const Project = require("./projectModel");
const constants = require("../constants");

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

module.exports = {CreateProject, EditProject };

