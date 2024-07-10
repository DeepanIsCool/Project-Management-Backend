const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: [false, "please add the password"],
    },

    name: {
      type: String,
      required: true,
    },

    employee_id: {
      type: String,
      required: true,
      unique: true,
    },
    ProfileImage: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
    },
  },
  { timestamps: true }
);

const facultyUser = mongoose.model("Faculty", facultySchema);
module.exports = facultyUser;
