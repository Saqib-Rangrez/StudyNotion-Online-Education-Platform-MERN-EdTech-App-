const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
require("cookie-parser");

// auth
exports.auth = async (req, res, next) => {
    try{
        // Extracting JWT from request cookies, body or header
		const token =
                    req.cookies.token ||
                    req.body.token ||
                    req.header("Authorization").replace("Bearer ", "");
                    
        // if token missing
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token is missing"
            });
        }

        // verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        }catch(error){
            // verification - issue
            console.log(error.message);
            return res.status(401).json({
                success : false,
                message : "Token is invalid"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            error : error.message,
            message : "Something went wrong while validating the token"
        });
    }
}

// isStudent
exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for Student Only"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "User role cannot be varified, please try again"
        });
    }
}

// isInstructor
exports.isInstructor = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for Instructor Only"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "User role cannot be varified, please try again"
        });
    }
};

// isAdmin 
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for Admin Only"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "User role cannot be varified, please try again"
        });
    }
};