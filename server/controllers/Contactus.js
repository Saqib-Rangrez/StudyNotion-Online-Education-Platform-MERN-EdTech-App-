const mailSender = require("../utils/mailSender");
const {contactUsEmail} = require("../mail/templates/contactFormRes");


exports.contactUsController = async (req, res) => {
    try{
        const {
            firstname, 
            lastname, 
            email, 
            phoneNo, 
            message, 
            countryCode} = req.body;

        const emailResponse = await mailSender(email, "Your message sent successfully", contactUsEmail(email, firstname, lastname, message, phoneNo, countryCode));

        const emailToStudyNotion = await mailSender('rangrezsaqib773@gmail.com', `Mail recieved from ${firstname} ${lastname}`, contactUsEmail(email, firstname, lastname, message, phoneNo, countryCode))
        
        // console.log("Email Res ", emailResponse)
        return res.json({
        success: true,
        message: "Email send successfully",
        })
        
    }catch(error){
        console.log("error", error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong...",
            error : error.message
        })
    }
}