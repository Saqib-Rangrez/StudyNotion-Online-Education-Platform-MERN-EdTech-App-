import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import { Checkbox } from "@material-tailwind/react";
import {PiMonitorPlayBold} from "react-icons/pi"

const VideoDetailsSidebar = ({setReviewModal,mobile}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation()
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        // Different syntax for decalring as well as calling the function
        ;(() => {
            if(!courseSectionData.length){
                return;
            }
            const currentSectionIndex = courseSectionData?.findIndex((data) =>
                                        data._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.
                                            findIndex((data) => data._id === subSectionId); 
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            // Set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current subsection here
            setVideobarActive(activeSubSectionId);
        })();
    }, [courseEntireData, courseSectionData, location.pathname])

  return (
    <>
        <div className={`${mobile ? "block sm:hidden absolute transition-all duration-200 z-[150] h-full" : "sm:block hidden"} text-richblack-25  max-w-[2300px] min-w-[230px] sm:max-w-[230px] md:max-w-[270px] py-4 bg-richblack-800`}>
            {/* For buttons and headings */}
            <div className='w-full mt-5 sm:mt-0 px-6 flex flex-col gap-y-3 mb-4 border-b border-richblack-700 pb-2'>
                {/* for buttons */}
                <div className='flex flex-col gap-y-2 sm:flex-row sm:justify-between gap-x-3 sm:items-center'>
                    <div onClick={() => navigate("/dashboard/enrolled-courses")} className='bg-richblack-600 text-center cursor-pointer rounded-md py-2 sm:px-2 md:px-5'>
                        Back
                    </div>
                    <div>
                        <IconBtn text={"Add Review"}
                        onClick={() => setReviewModal(true)} customClasses={"sm:px-3 sm-py-2 md:px-5 w-full sm:w-fit text-center "} />
                    </div>
                </div>
                {/* for heading or title */}
                <div className='flex gap-x-2 sm:gap-x-1 sm:justify-between items-center w-full'>
                    <span className='sm:text-base md:text-xl text-[15px] w-[70%] text-richblack-50'>{courseEntireData?.courseName}</span>
                    <span className='text-sm w-[30%] text-end text-caribbeangreen-100'>{completedLectures?.length} / {totalNoOfLectures}</span>
                </div>
            </div>

            {/* For sections and subsections */}
            <div>
                {
                    courseSectionData.map((course, index) => (
                        <div onClick={() => setActiveStatus(course?._id)}
                        key={index} className='bg-richblack-700 border border-richblack-800 mt-1'
                        >
                            {/* set section */}
                            <div className='w-full flex justify-between py-3 px-2'>
                                <div>
                                    {course?.sectionName}
                                </div>
                                <span className={`${activeStatus?.includes(course?._id) ? "rotate-180" : "rotate-0"} transition-all duration-200`}>
                                    <MdOutlineKeyboardArrowDown />
                                </span>
                            </div>

                            {/* SubSection */}
                            <div>
                                {
                                    activeStatus === course?._id && (
                                        <div>
                                            {
                                                course?.subSection.map((topic , index) => (
                                                    <div key={index}
                                                      className={`flex cursor-pointer gap-x-2 pr-2 sm:pr-0 pl-4 py-2 items-center ${completedLectures?.includes(topic._id) && "line-through "} ${videobarActive === topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-800 text-richblack-25"}`}
                                                      onClick={() => {
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
                                                        setVideobarActive(topic?._id)
                                                      }}
                                                    >
                                                    <input type='checkbox' checked={completedLectures?.includes(topic._id)}
                                                        readOnly className="
                                                        relative peer shrink-0
                                                        appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white
                                                        mt-1
                                                        checked:bg-blue-800 checked:border-0
                                                        focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100
                                                        disabled:border-steel-400 disabled:bg-steel-400 mb-1
                                                        "     
                                                    />

                                                        <div className='flex items-center gap-x-1'>
                                                            <span>
                                                            {topic?.title}
                                                            </span>
                                                            <PiMonitorPlayBold />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> 
                                    )
                                }
                                
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar