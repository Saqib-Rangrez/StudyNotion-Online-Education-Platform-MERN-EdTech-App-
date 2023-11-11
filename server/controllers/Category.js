const Category = require("../models/Category");
const mongoose = require("mongoose");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// Create Category handler function
exports.createCategory = async (req, res) => {
    try{
        // Fetch data from req body
        const {name, description} = req.body;
        // Validation
        if(!name){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            });
        }

        // create entry in db
        const categoryDetails = await Category.create({
            name : name,
            description : description
        });
        console.log(categoryDetails);

        // return response
        return res.status(200).json({
            success : true,
            message : "Category created successfullly"
        });
    }catch{
        return res.status(500).json({
            success : false,
            message : "Error whaile creating Category",
            error : error.message
        });
    }
};

// Get all Categories
exports.showAllCategories = async (req, res) =>{
    try{
        const allCategories = await Category.find(
            {}, 
            {name : true, description: true}
            );
        res.status(200).json({
            success : true,
            message : "All Categories returned successfully",
            data : allCategories
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while showing Categories",
            error : error.message
        });
    }
};

// Category page details
exports.categoryPageDetails = async (req, res) => {
    try{
        // get category id
        const {categoryId} = req.body;
        // console.log("At server", categoryId);

        if( !categoryId ) {
            return res.status(404).json({
                success : false,
                message : "CategoryId is undefined",
                error : error.message
            })
        }

        // get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
        //   match: { status: "Published" },
          populate: "ratingAndReviews",
          populate: {
            path: "instructor",
        },
        }).exec();
        console.log("Selected Category",selectedCategory.courses)
        console.log("Selected category length",selectedCategory.courses.length);

        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success : false,
                message : "Data not found"
            })
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
              success: false,
              message: "No courses found for the selected category.",
            })
        }

        // get courses for different category
        const categoriesExceptSelected = await Category.find(
            {
                _id :{$ne : categoryId}
            });
        
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
        .populate({
            path: "courses",
            // match: { status: "Published" },
            populate: {
                path: "instructor",
            },
        })
        .exec();

        // get top 10 selling courses -HW
        const allCategories = await Category.find()
        .populate({
          path: "courses",
        //   match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec();

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length).slice(0, 10)
        
        // return response
        return res.status(200).json({
            success : true,
            data : {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}