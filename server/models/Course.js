const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        trim : true
    },
    courseDescription : {
        type : String,
        trim : true
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        requried : true,
        ref : "User"
    },
    whatYouWillLearn : {
        type : String 
    },
    courseContent : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Section"
        }
    ],
    ratingAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReview"
        }
    ],
    price : {
        type : Number,
    },
    thumbnail : {
        type : String
    },
    category : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    tags : {
        type : [String],
        required : true
    },
    studentsEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            // required : true
        }
    ],
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    instructions : {
        type : [String]
    },
    createdAt: {
		type: Date,
		default: Date.now
	}    
});

module.exports = mongoose.model("Course", courseSchema);