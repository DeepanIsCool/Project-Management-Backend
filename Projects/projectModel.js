const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },

  launchDate: {
    type: String,
    required: true,
  },
  launchTime:{
  type: String,
  required: true,
},
status: {
    type: String,
    required: true,
    enum: ["Ongoing", "upcoming", "Completed"],
  },

  project_cover_img: {
    type: String, 
    default:null,
  },

  expiryDate: {
    type: String,
    required: true,
  },

  projectDuration:{
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  requirements: {
    type: String,
    default: null,
  },
  faculty_list:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "admin",
  },
  createdBY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },



});

module.exports = mongoose.model("projects", projectSchema);