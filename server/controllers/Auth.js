const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate")

// sendOtp
exports.sendOTP = async(req, res) => {
    try{
        // fetch email from req body
        const {email} = req.body;

        // check if user already exist
        const checkUserPresent = await User.findOne({email});

        // if user already exist, then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success : false,
                message : "User already registered"
            })
        }

        // if not generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        })
        console.log("Otp generated :" , OTP);

        // check unique otp or not
        // Note : This is bad practice as we have to check otp again n again in
        // db , so in companies we'll use some services that will generate unique
        // OTPs

        let result = await OTP.findOne({otp : otp});

        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false
            });
            result = await OTP.findOne({otp : otp});
        }

        // save entry in db
        const otpPayload = {email, otp};

        // create an entry in db
        const otpBody = OTP.create(otpPayload);
        // console.log(otpBody);

        // return response successful
        res.status(200).json({
            success : true,
            message : "OTP Sent Successfully",
            OTP : otp
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

//signUp
exports.signUp = async (req, res) => {
    try{
        // Fetch data from request's body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        // Validate the data 
        if(!firstName || !lastName || !email || !password || !confirmPassword
            || !otp) {
                return res.status(403).json({
                    success : false,
                    message : "All fields are required"
                })
            }

        // Compare passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password and ConfirmPassword Value cannot match"
            })
        }
        // Check user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User is already registered"
            })
        }
        // Find most recent Otp stored for the user
        const recentOTP = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        
        // Validate OTP
        if(recentOTP.length === 0){
            // OTP not found 
            return res.status(400).json({
                success : false,
                message : "OTP Not Found"
            })
        }else if(otp !== recentOTP[0].otp){
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            })
        }
        // Hassh password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create entry in db
        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null
        })

        const user = await User.create ({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails : profileDetails._id,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        // return response
        return res.status(200).json({
            success : true,
            message : "User is Registered Successfully",
            user : user

        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "User cannot be registered. Please try again"
        })
    }
}

// login
exports.login = async (req, res) => {
    try{
        // get data from req body
        const {email, password} = req.body;
        // validate the data
        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : "All fields are required. Please try again"
            })
        }
        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success : false,
                message : "User is not registered. Please signup first"
            })
        }

        // generate JWT, after password match
        if(await bcrypt.compare(password, user.password)){
            const expireTime = Date.now() + 5*60*60*1000;
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
                iat : Date.now(),
                exp : expireTime
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET);
            user.token = token; //might need to use toObject
            user.password = undefined || null;

            // create cookie and send response
            const options = {
                expires : new Date(Date.now() + 5*60*60*1000),
                httpOnly : true
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : "Logged in successfully"
            })
        }else{
            return res.status(401).json({
                success : false,
                message : "Password is Incorrect"
            })
        }  
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Failed to login. Please try again"
        })
    }
}

// changePassword - HW
exports.changePassword = async (req, res) => {
    try{
        // find user by id 
        // Note: as the user is already logged in so 
        // we have access to token and its verfied in
        // the earlier auth middleware so we have 
        // access to req.user hence we'll use it
        const user = await User.findById(req.user.id);

        // get data from req body
        const {oldPassword, newPassword} = req.body;

        // Validation
        if(!oldPassword || !newPassword ) {
            return res.status(403).json({
                success : false,
                message : "Fill all the required fields."
            });
        }

        // password missmatch
        let updatedUserDetails;
        if(! await bcrypt.compare(oldPassword, user.password)){
            return res.json({
                success : false,
                message : "Current password is incorrect"
            });
        }else{
            // hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // update password in DB
            updatedUserDetails = await User.findByIdAndUpdate(user.id, {password : hashedPassword}, {new : true}).populate({path : "additionalDetails"}).exec();
        }
        
        // send mail - Password updated
        try {
            const response = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(`Password updated successfully for${updatedUserDetails.firstName} 
                    ${updatedUserDetails.lastName}`)
            )
        }catch(error){
            return res.json({
                success : false,
                message : "Error while sending confirmation mail"
            })
        }

        // return response
        return res.status(200).json({
            success : true,
            message : "Password Updated Successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error.message
        })
    }
}