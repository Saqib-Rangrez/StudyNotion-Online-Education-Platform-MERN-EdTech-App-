const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60*1000
    }
});

//  a function to send email
async function sendVerificationEmail (email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email", otpTemplate(`${otp}`));
        console.log("Email sent Successfully:", mailResponse)
    }catch(error){
        console.log("Error occurd while sending maik",error);
        throw error;
    }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function(next) {
    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);