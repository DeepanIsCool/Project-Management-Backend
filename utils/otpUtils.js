//otpUtils.js
const constants = require("../constants")

const otpRequests = {}

// Get OTP on Mobile number
exports.sendOtp = async (req , res, mobileNumber, otpCode) => {
  try {
    const currentTime = Date.now()
    if (
      otpRequests[mobileNumber] &&
      currentTime - otpRequests[mobileNumber] < 180000
    ) {
      throw new Error(
        "OTP request throttled. Please wait before requesting again."
      )
    }

    const params = {
      Message: `Your OTP is ${otpCode}`,
      PhoneNumber: mobileNumber,
    }

    otpRequests[mobileNumber] = currentTime
  } catch (err) {
     console.error("Error sending OTP via SMS:", err.message)
    // if(err.includes("Please wait before requesting again")) {
        console.log(err.message)
        res.status(constants.REQUEST_TIMEOUT).json("Please wait before requesting again")
    // }
  
    // res.json(err)
    // throw new Error(err)
    
  }
}