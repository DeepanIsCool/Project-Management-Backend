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

const asyncHandler = require("express-async-handler");
const Project = require("./projectModel");

const EditProject = asyncHandler(async (req, res) => {
    try {
        // Parse the form data
        const { project_name, launchDate, launchTime, status, expiryDate, expiryTime, requirements, projectDuration, description } = req.body;

        // Find the project by ID
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Update fields if they are present in the request
        if (project_name) project.project_name = project_name;
        if (launchDate) project.launchDate = launchDate;
        if (launchTime) project.launchTime = launchTime;
        if (status) project.status = status;
        if (expiryDate) project.expiryDate = expiryDate;
        if (expiryTime) project.expiryTime = expiryTime;
        if (requirements) project.requirements = requirements;
        if (projectDuration) project.projectDuration = projectDuration;
        if (description) project.description = description;

        // Save the updated project
        const updatedProject = await project.save();
        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = {CreateProject, EditProject };

