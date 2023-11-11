const Course = require("../models/Course");
const Category = require("../models/Category");
const CourseProgress = require("../models/CourseProgress")
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {convertSecondsToDuration} = require("../utils/secToDuration")

//create course
exports.createCourse = async (req, res) => {
    try{
        // fetch data 
        let {courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            category,
            instructions : _instructions,
            tags : _tags,
            status
        } = req.body;
        console.log(req.body);
        
        // fetch thumbnail
        const thumbnail = req.files.thumbnailImage;
        // console.log("Thumbnail", thumbnail)

        // Convert the tag and instructions from stringified Array to Array
        const tags = _tags.split(',').map(tag => tag.trim());
        const instructions = _instructions.split(',').map(instruction => instruction.trim());
        if (!status || status === undefined) {
            status = "Draft"
        }

        // Validation
        if(!courseName || !courseDescription ||!whatYouWillLearn || !price || !category || !thumbnail || !instructions.length || !tags.length){
            return res.status(400).json({
                succss : false,
                message : "All fields are required"
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor"});
        // console.log("Instructor Details", instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                succss : false,
                message : "Instructor deails not found!"
            });
        }

        // check given Category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                succss : false,
                message : "Category deails not found!"
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME, 300, 85);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            category : categoryDetails._id,
            whatYouWillLearn,
            price,
            thumbnail : thumbnailImage.secure_url,
            tags,
            instructions,
            status
        });

        // Update user - add the new course to the schema of instructor
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                },
            },
            {new : true})
        
        // Update the category schema
        await Category.findByIdAndUpdate({_id: categoryDetails._id}, {$push:{courses : newCourse._id}},{new:true});

        // return response
        return res.status(200).json({
            success : true,
            message : "Course created successfully",
            data : newCourse
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Failed to create course. Please try again",
            error : error.message
        });
    }
}

// Fetch all courses
exports.showAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find({},
            {
            courseName : true,
            price : true,
            thumbnail : true,
            instructor : true,
            ratingAndReviews : true,
            studentsEnrolled : true
        }).populate("instructor").exec();

        return res.status(200).json({
            success : true,
            message : "Data for all courses fetched successfully",
            data : allCourses
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Cannot Fetch Course data",
            error : error.message
        })
    }
}

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try{
        // get id
        const {courseId} = req.body;
        console.log(req.body)
        console.log(courseId)

        // find course details
        const courseDetails = await Course.findOne(
            {_id:courseId})
            .populate(
                {
                    path : "instructor",
                    populate : {
                        path : "additionalDetails"
                    }
                })
                .populate("category")
                .populate("ratingAndReviews")
                .populate(
                    {
                        path : "courseContent", 
                        populate :{
                            path : "subSection"
                        }
                    }).exec();
        
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : `Could not find course with ${courseId}`
            })
        }

        const course = {
          courseDetails : courseDetails
        }

        // return response
        return res.status(200).json({
            success : true,
            message : "Course details fetched successfully",
            data : course
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message 
        })
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      console.log(updates, updates["category"])
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        // console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tags" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          }else if(key === "category"){
            await Category.findByIdAndUpdate(course.category, {$pull : {courses : course._id}});
            course[key] = updates[key];
            await Category.findByIdAndUpdate(updates[key], {$push : {courses : course._id}});
          } 
          else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}


exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}
  
  // Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).populate("instructor").sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
}

  // Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }

      // Delete course from its category
      const categoryId = course.category;
      await Category.findByIdAndUpdate(categoryId, {$pull: {courses : courseId}})
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
}