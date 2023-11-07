const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessEmail');
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");


exports.capturePayment = async (req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({
            success : false,
            message : "Please provide Course Id"
        })
    }

    let totalAmount = 0;
    for(const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(404).json({
                    success : false,
                    message : "Could not found the course"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success : false,
                message : "Student is already enrolled"
            });}

            totalAmount += course.price;
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }

    const options = {
        amount : totalAmount*100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success : true,
            message : "Order Captured Successfuly",
            data : paymentResponse
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


// Verify Payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(404).json({
            success : false,
            message : "Payment failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature === razorpay_signature) {
        // enroll student 

        await enrollStudents(courses, userId, res);

        // return res
        return res.status(200).json({
            success : true,
            message : "Payment Verified"
        })   
    }else{
        return res.status(200).json({
            success : false,
            message : "Payment Failed"
        })
    }
}

const enrollStudents = async (courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({
            success : false,
            message : "Please provide data for courses and user_id"
        })
    }

    for(const course_id of courses ){
       try{
             // Find the course and enroll students in it
        const enrolledCourse = await Course.findByIdAndUpdate(course_id, {$push : {studentsEnrolled : userId}}, {new : true});

        if(!enrolledCourse){
            return res.status(500).json({
                success : false,
                message : "Course not found"
            })
        }

        const courseProgress = await CourseProgress.create({
            courseId : course_id,
            userId : userId,
            completedVideos : []
        })

        // Find student and add course in it courses prop
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push : {courses : course_id, courseProgress : courseProgress._id},}, {new : true});
        if(!enrolledStudent) {
            return res.status(500).json({
                success : false,
                message : "Student not found"
            }
            )
        }

        const emailResponse = await mailSender(enrolledStudent.email, 
            `Successfully enrolled into ${enrolledCourse.courseName}`, 
            courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName))

        // return res.status(200).json({
        //     success : true,
        //     message : "Signature verified and Course added"
        // });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const {orderId, paymentId, amount} = req.body;
    console.log("Send success mail",orderId, paymentId, amount)
    const userId = req.user.id;

    if(!userId || !orderId || !paymentId || !amount) {
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(enrolledStudent.email, 
            "Payment Received",
            paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`,amount/100,orderId,paymentId));
            return res.status(200).json({
                success : true,
                message : "Email Sent Successfully"
            })
    }catch(error){
        console.log("ERROR in sending mail", error);
        return res.status(500).json({
            success : false,
            message : "Could not send mail"

        })
    }
}


// capture the payment and initiate the razrorpay order
// exports.capturePayment = async (req, res) => {
//     // get courseid and userid
//     const {course_id} = req.body;
//     const userId = req.user.id;

//     // validation
//     // valid courseID
//     if(!course_id){
//         return res.json({
//             success : false,
//             message : "Please provide valid course ID"
//         });
//     }

//     // valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success : false,
//                 message : "Could not find course "
//             });
//         }

//          // user already paid for the same course
//          const uid = new mongoose.Types.ObjectId(userId);
//          if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success : false,
//                 message : "Student is already enrolled"
//             });
//          }
//     }catch(error){
//         console.error(error);
//         return res.status(500).json({
//             success : false,
//             message : error.message
//         });
//     }
   
//     // order create 
//     const amount = course.price;
//     const options = {
//         amount : amount * 100,
//         currency: "INR",
//         receipt : Math.random(Date.now()).toString(),
//         notes : {
//             courseId : course_id,
//             userId : userId
//         }
//     };

//     try{
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         // return response
//         return res.status(200).json({
//             success : true,
//             courseName : course.courseName,
//             courseDescription : course.courseDescription,
//             thumbnail  :course.thumbnail,
//             orderId : paymentResponse.id,
//             currency : paymentResponse.currency,
//             amount : paymentResponse.amount
//         })
//     }catch(error){
//         console.log(error);
//         return res.json({
//             success : false,
//             message : "Could not initate order"
//         })
//     }
// };

// // verify signature of razorpay and server
// exports.verifyPayment = async (req, res) => {
//     // server signature
//     const webhookSecret = "12345678"

//     // razorpay signature
//     const signature = req.headers["x-razorpay-signature"];
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest('hex');

//     // compare signature
//     if(signature === digest) {
//         console.log("Payment is Authorized");

//         // payment successfull -> get userid and course id to update 
//         const {courseID, userId} = req.body.payload.payment.entity.notes;

//         try{
//             // fullfill the action
//             // find the course and entroll the student in it
//             const enrolledCourse = await Course.findOneAndUpdate({_id:courseID},{$push : {studentsEnrolled : userId}},{new : true});

//             if(!enrolledCourse) {
//                 return res.status(500).json({
//                     success : false,
//                     message : "Course not found"
//                 });
//             }
//             console.log(enrolledCourse);

//             // find the user and add course id in it 
//             const enrolledStudent = await User.findOneAndUpdate({_id:userId},{$push :{courses : courseID}},{new:true});
//             if(!enrolledStudent) {
//                 return res.status(500).json({
//                     success : false,
//                     message : "Student not found"
//                 })
//             }
//             console.log(enrolledStudent);

//             // mail send 
//             const emailResponse = await mailSender(enrolledStudent.email,"Congratulations from StudyNotion","Congratulations, you are onboarded to new CodeHelp Course");
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success : true,
//                 message : "Signature verified and Course added"
//             });
//         }catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success : false,
//                 message : error.message
//             });
//         }
//     }else{
//         return res.status(400).json({
//             success : false,
//             message : "Invalid request"
//         });
//     }
// };