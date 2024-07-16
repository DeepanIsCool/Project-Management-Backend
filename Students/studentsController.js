//authController.js
const asyncHandler = require("express-async-handler");
const { sendOtp } = require("../OTPs/otpUtils");
const otpModel = require("../OTPs/otpModel")
const Student  = require("./studentsModel")
const client = require("./studentsUserModel");
const constants = require("../constants");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Sign_in = asyncHandler(async (req, res) => {
  const { enrollment_no, password } = req.body;
  if (!enrollment_no || !password) {
    return res.status(constants.VALIDATION_ERROR).json({ message: "All fields are required" });
  }
  
  const userAvailable = await client.findOne({ enrollment_no });

  if (userAvailable && await bcrypt.compare(password, userAvailable.password)) {
    const accessToken = jwt.sign(
      { user: { _id: userAvailable._id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "90m" }
    );
    
    userAvailable.access_token = accessToken;
    await userAvailable.save();
    return res.status(constants.OK).json({ accessToken });
  } else {
    return res.status(constants.UNAUTHORIZED).json({ message: "Enrollment number or password is invalid" });
  }
});

const Sign_up = asyncHandler(async (req, res) => {
    const { name, email, password, phone, enrollment_no } = req.body;
    if (!name || !email || !password || !phone || !enrollment_no) {
      return res
        .status(constants.VALIDATION_ERROR)
        .json("all fields are required");
    }
    const userAvailable = await client.findOne({
      $or: [{ email: email }, { enrollment_no: enrollment_no }, { phone: phone }],
    });
    if (userAvailable) {
      return res.status(constants.CONFLICT).json("user already registered");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const New_user = {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        enrollment_no: enrollment_no,
        ProfileImage: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
      };
      const user = await client.create(New_user);
      const accessToken = jwt.sign(
        {
          user: {
            _id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "90m" }
      );
      user.access_token = accessToken;
      await user.save();
  
      user
        ? res.json({accessToken: accessToken})
        : (e) => {
            res.json(e);
          };
    }
  });

const Sign_upvalidation = asyncHandler(async (req, res) => {
    const { EnrollmentNo } = req.body;
  console.log(EnrollmentNo)
    if (!EnrollmentNo) {
      res
        .status(constants.VALIDATION_ERROR)
        .json("please provide your enrollment no");
    } else {
      const userAvailable1 = await Student.findOne({
        Enrollment_No: EnrollmentNo,
      });
      console.log(userAvailable1)
      if (userAvailable1) {
        res
          .status(constants.OK)
          .json({
            Name: userAvailable1.Name,
            email: userAvailable1.Email,
            phone_no: userAvailable1.Mobile_Number,
          });
        
      }
      else {
        res
         .status(constants.NOT_FOUND)
         .json({ message: "Enrollment No is not registered" });
      }
    }
  });

const SendOtpNumber = asyncHandler(async (req, res) => {
  const { number } = req.body;
  // console.log(req.body);
  if (!number) {
    return res
      .status(constants.VALIDATION_ERROR)
      .json("all fields are required");
  }
  const otp = Math.floor(1000 + Math.random() * 9000);
  // console.log(otp);
  const otpStatus = await sendOtp(req, res, "+91" + number, otp);
  console.log(otpStatus);

  if (otpStatus === true) {
    const numberAvilable = await otpModel.findOne({ number });
    if (numberAvilable) {
      numberAvilable.Number_otp = otp;
      numberAvilable.number = number;
      await numberAvilable.save();
    } else {
      await otpModel.create({ number: number, Number_otp: otp });
    }
    res.json({ message: "OTP sent successfully" });
  }
});

const SendOtpEmail=asyncHandler(async(req,res)=>{
  const{email}=req.body;
  if(!email)
    {
      return res.status(constants.VALIDATION_ERROR).json("email is required");
    }
   
    const user2=await Student.findOne({Email:email})
    if(user2)
      {
        let otp1 = 0;
        console.log(otp1);
  
        const sendResetPasswordEmail = async (eMail) => {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "sadhukhandeepan@gmail.com",
              pass: "opie ojxq xdrv ndkz",
            },
          });
          otp1 = Math.floor(1000 + Math.random() * 9000);
          const mailOptions = {
            from: "sadhukhandeepan@gmail.com",
            to: eMail,
            subject: "Your OTP for email is :",
            text: `Your OTP IS ${otp1}`,
          };
          console.log(otp1);
  
          const sendOTP1 = await transporter.sendMail(mailOptions);
          if (sendOTP1) {
            const emailAvilable2 = await otpModel.findOne({
              email: user2.Email,
            });
            if (emailAvilable2) {
              emailAvilable2.Email_otp = otp1;
              await emailAvilable2.save();
            } else {
              await otpModel.create({
                email: user2.Email,
                Email_otp: otp1,
              });
            }
            res.status(constants.OK).json("OTP SENT SUCCESSFULLY IN EMAIL");
          }
        };
        try {
          await sendResetPasswordEmail(user2.Email);
        } catch (err) {
          console.log(err.message);
        }
      }
      else
      {
        res.json({message:"user is not present"});
      }
  })

  
const ValidateEmailOTP=asyncHandler(async(req,res)=>{
    const {Email,otp}=req.body;
    
    if(!Email ||!otp){
        return res.status(constants.VALIDATION_ERROR).json("all fields are required");
    }
    const verifyOtp1 = await otpModel.findOne({email:Email});
    console.log(verifyOtp1)
    if(verifyOtp1)
      {
        if (verifyOtp1.Email_otp === otp) {
          res
           .status(constants.ACCEPTED)
           .json({ message: "OTP verified successfully" });
        } else {
          res
           .status(constants.UNAUTHORIZED)
           .json({ message: "OTP is not verified" });
        }
      }
      else {
        res.status(constants.REQUEST_TIMEOUT).json({ message: "OTP is expired" });
      }
    })
  
  
const ValidatePhoneNumber=asyncHandler(async(req,res)=>{
      const {Number,otp}=req.body;
      if (!Number || !otp) {
        return res
          .status(constants.VALIDATION_ERROR)
          .json("all fields are required");
      }
     const verifyOTP2=await otpModel.findOne({number: Number});
     {
      if(verifyOTP2) {
      if(verifyOTP2.Number_otp===otp)
        {
          res
           .status(constants.ACCEPTED)
           .json({ message: "OTP1 verified successfully" });
        }
        else{
          res
          .status(constants.UNAUTHORIZED)
          .json({ message: "OTP is not verified" });
    
        }
     }
     else{
      res.status(constants.REQUEST_TIMEOUT).json({ message: "OTP is expired" });
     }
    }
    
    })

module.exports = {Sign_in,Sign_up,Sign_upvalidation, SendOtpNumber,SendOtpEmail,ValidateEmailOTP,ValidatePhoneNumber};
