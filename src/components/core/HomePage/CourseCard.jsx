import React from 'react'
// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({course, currentCard, setCurrentCard}) => {
  return (
    <div className={`w-[310px] md:w-[360px] lg:w-[30%] text-richblack-25 h-[280px] md:h-[300px] box-border cursor-pointer ${currentCard === course.heading? "bg-white shadow-[10px_10px_yellow]" : "bg-richblack-800"} lg:translate-y-[10rem]`} onClick={() => setCurrentCard(course.heading)}>
        <div className={`flex flex-col gap-2`}>
            <div className='border-b-[2px] border-richblack-400 border-dashed h-[230px] h-9/10 p-6 flex flex-col gap-3'>
            <div className= {`text-xl ${currentCard === course.heading ? "text-richblack-900" : "text-white"} font-semibold`}>
                {course.heading}
            </div>
            <div className={` ${currentCard === course.heading ? "text-richblack-700" : "text-richblack-600"}`} >
                {course.description}
            </div>
            </div>
            
            <div className={`flex justify-between ${currentCard === course?.heading ? "text-blue-300" : "text-richblack-300"
            } px-6 py-3 font-medium`}>
                <div className="flex items-center gap-2 text-[16px]">
                <HiUsers />
                <p>{course?.level}</p>
                </div>
                <div className="flex items-center gap-2 text-[16px]">
                <ImTree />
                <p>{course?.lessionNumber} Lession</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseCard