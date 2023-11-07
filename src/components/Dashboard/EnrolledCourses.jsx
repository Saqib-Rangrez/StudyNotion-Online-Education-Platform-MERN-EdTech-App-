import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../services/operations/profileApi';
import Spinner from "../common/Spinner"
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses]  = useState(null);

    const getEnrolledCourses = async () => {
      try{
        const response = await getUserEnrolledCourses(token);
        // console.log(response)
        setEnrolledCourses(response);
      }catch(error){
        // console.log("Unable to fetch enrolled courses");
        // console.log(error)
      }
    }
    
    useEffect(() => {
      getEnrolledCourses();
    },[]);

  return (
    <div>
        <p className='text-richblack-200 mb-4 font-semibold'>Home / Dashboard / <span className='text-yellow-50'>Enrolled Courses</span></p>
        <div className="text-3xl font-semibold text-richblack-50">Enrolled Courses</div>
        {
          !enrolledCourses ? (
          <div className="grid min-h-[calc(100vh-5rem)] place-items-center">
           <Spinner />
          </div>) 
          : !enrolledCourses.length ? (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any course yet!</p>) 
          : (
            <div className="my-8 text-richblack-5">
              <div className="flex rounded-t-lg justify-between bg-richblack-500 ">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="hidden sm:block w-1/5 px-2 py-3">Duration</p>
                <p className="flex w-1/4 px-2 py-3 mr-5 sm:mr-0 text-start sm:text-center">Progress</p>
              </div>
              {/* Cards of Enrolled Courses */}
              {
                enrolledCourses.map((course, index, arr) => (
                  <div className={`flex justify-between items-center border border-richblack-700 ${
                  index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                  }`} key={index}>
                    <div div
                      className="flex w-[70%] sm:w-[45%] cursor-pointer items-center gap-4 px-3 sm:px-5 py-3"
                      onClick={() => {
                        navigate(
                          `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                      }}
                    >
                      <img src={course?.thumbnail} alt="course_img"
                      className="h-14 w-14 rounded-md object-cover"/>
                      <div className="flex max-w-xs flex-col gap-2">
                        <p className="font-semibold">{course?.courseName}</p>
                        <p className="text-xs text-richblack-300">
                          {course.courseDescription.length > 50
                          ? `${course.courseDescription.slice(0, 50)}...`
                          : course.courseDescription}
                        </p>
                      </div>
                    </div>

                    <div className="w-1/5 hidden sm:block px-2 py-3">
                      {course?.totalDuration}
                    </div>

                    <div className="flex w-[30%] sm:w-1/4 flex-col gap-2 px-2 py-3">
                      <p className='text-sm sm:text-lg'>Progress: {course?.progressPercentage || 0}%</p>
                      <ProgressBar completed={course?.progressPercentage || 0} 
                        height='8px'
                        isLabelVisible={false}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }

    </div>
  )
}

export default EnrolledCourses