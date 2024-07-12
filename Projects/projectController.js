const asyncHandler = require("express-async-handler");
const Projects = require("./projectModel");


const CreateProject = async (req, res) => {

    try {
        // Destructure required fields from formData
        const { project_name,launchDate,launchTime,status, expiryDate,expiryTime,requirements,projectDuration,description} = req.body;

        // Check if all required fields are present
        if (!project_name || !launchDate || !launchTime || !status || !expiryDate || !expiryTime || !requirements || !projectDuration || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if a project with the same project_name already exists
        const existingProject = await Project.findOne({ project_name });
        if (existingProject) {
            return res.status(400).json({ error: "A project with the same project_name already exists" });
        }
        try {

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
                head_faculty: req.user._id
            });

            // Save the Project to the database
            const Project = await newProject.save();
            res.status(201).json({ message: "Project created successfully", Projects });
        } catch (error) {
            console.error("Error creating project:", error);
            res.status(500).json({ error: "Error creating project", message: error.message });
        }
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Error creating project", message: error.message });
    }
};

module.exports = { CreateProject };
