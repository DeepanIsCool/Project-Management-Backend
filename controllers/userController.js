

const asyncHandler = require("express-async-handler");
const client = require("../models/userModel");
const constants = require("../constants");



const userInfo= asyncHandler(async (req, res) => {
    const user = await client.findOne({ _id: req.user._id });
    res.json({
        ProfileImage:user.ProfileImage,
      name: user.name,
      enrollment_no: user.enrollment_no,
      phone: user.phone,
      email: user.email
    });
    
  
  });


module.exports = { userInfo };
