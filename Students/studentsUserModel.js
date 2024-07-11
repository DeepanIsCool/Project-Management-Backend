const mongoose = require("mongoose");

const studentUserSchema = new mongoose.Schema(
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

    enrollment_no: {
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

const studentUser = mongoose.model("StudentsUsers", studentUserSchema);
module.exports = studentUser;
