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
    required: false,
    default:""
  },

  expiryTime: {
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
    type: Array,
    required: true,
  },
  head_faculty:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: null,
  }


});

module.exports = mongoose.model("projects", projectSchema);