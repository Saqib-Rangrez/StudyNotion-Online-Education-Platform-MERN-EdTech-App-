import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails, getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Spinner from '../components/common/Spinner';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../components/common/RatingStars';
import {AiFillInfoCircle} from "react-icons/ai";
import {MdOutlineLanguage} from "react-icons/md";
import { formatDate } from '../services/formatDate';
import CourseCardDetails from '../components/core/Course/CourseCardDetails';
import ConfirmationModal from '../components/common/ConfirmationModal';
import Footer from '../components/common/Footer';
import ReactMarkdown from 'react-markdown';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import ReviewSlider from '../components/common/ReviewSlider';

const CourseDetails = () => {

    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    const {user} = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        
        const fetchFullCourseDetails = async () => {
            setLoading(true);
            const response = await fetchCourseDetails(courseId);
            // console.log("Response ",response);
            if(response){
                setCourse(response);
            }
            setLoading(false);
        }
        fetchFullCourseDetails();
    }, []);

    useEffect(() => {
        if(course){
            const result = GetAvgRating(course?.courseDetails?.ratingAndReviews);
            setAvgRating(result);
        }
    })

    // Total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    useEffect(() => {
        let lectures = 0
        course?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures)
    }, [course])


    // *********Handle Buy Course**********
    const handleBuyCourse = () => {
        if (token) {
          buyCourse(token, [courseId], user, navigate, dispatch)
          return
        }
        setConfirmationModal({
          text1: "You are not logged in!",
          text2: "Please login to Purchase Course.",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2Handler: () => setConfirmationModal(null),
        })
      }

    // Collapse all
    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
        !isActive.includes(id)
            ? isActive.concat([id])
            : isActive.filter((e) => e !== id)
        )
    }
    
      if (paymentLoading) {
        // console.log("payment loading")
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <Spinner />
          </div>
        )
    }

    if(loading || !course){
        return  (
            <div className='grid h-[calc(100vh-3rem)] place-items-center'>
                <Spinner />
            </div>
        )
    }

  return (
    <div>
        {
            !course && !loading ? <div className='text-4xl grid place-items-center h-[80vh] text-richblack-400'>Course Not Found!</div> 
            : (
            <>
                <div className='bg-richblack-800 text-richblack-25 relative w-full'>
                    {/* ****************Hero Section************ */}
                    <div className='w-11/12 lg:max-w-maxContent md:max-w-[650px] relative flex flex-col gap-y-4 py-16 ml-10 xl:mx-auto'>
                        <p className='text-richblack-200'>Home / Learning / <span className='text-yellow-50'>{course?.courseDetails?.category?.name}</span></p>
                        <p className='text-4xl text-richblack-25'>{course?.courseDetails?.courseName}</p>
                        <p className='md:w-[60%] w-[90%] text-richblack-300 '>{course?.courseDetails?.courseDescription}</p>
                        <div className='flex gap-x-4 items-center'>
                            <div className='flex gap-x-1 items-center'>
                                <span className='text-xl font-semibold text-yellow-200'>{avgRating}</span>
                                <RatingStars Review_Count={avgRating} />
                            </div>
                            <div className='flex gap-x-1 items-center text-richblack-300 text-sm'>
                                <span>{`(${course?.courseDetails?.ratingAndReviews?.length} ratings)`} </span>
                                <span>{course?.courseDetails?.studentsEnrolled.length } students</span>
                            </div>
                        </div>
                        <p className='text-xl text-richblack-25'>Created By <span className='text-richblack-300 text-base'>{course?.courseDetails?.instructor?.firstName} {course?.courseDetails?.instructor?.lastName}</span></p>
                        <div className='flex lg:flex-row flex-col gap-4 text-sm md:text-[15px] lg:text-base lg:items-center'>
                            <div className='flex gap-x-2 items-center'>
                                <AiFillInfoCircle fontSize={20} fill='#838894'/>
                                <span className='text-richblack-50 '>Created at {formatDate(course?.courseDetails?.createdAt)}</span>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <MdOutlineLanguage fontSize={20} fill='#838894'/>
                                <span className='text-richblack-50'>English</span>
                            </div>
                        </div>
                        <div className='visible md:hidden h-36 w-full'></div>
                        <div className='xl:visible hidden absolute right-[35%] top-10 w-[1px] h-[350px] bg-richblack-700'></div>
                    </div>

                    {/* ******************Course Card*************** */}
                    <div className='absolute xl:h-[700] xl:w-[350px] lg:h-[500] md:w-[330px] sm:w-[450px] w-[320px] md:top-[10%] top-[70%] right-[8%] sm:right-[15%] mx-auto md:mx-0 md:right-[3%] xl:right-[8%] rounded-lg
                     bg-richblack-700 flex flex-col gap-y-3 border-y border-y-richblack-500 shadow-[inset_-12px_-8px_40px_#46464620] shadow-richblack-800 '>
                        <CourseCardDetails course={course} setConfirmationModal={setConfirmationModal} handleBuyCourse={handleBuyCourse} />
                    </div>
                </div>

                <div className='w-11/12 max-w-maxContent mx-auto mt-8'>
                    <div className='bg-transparent lg:py-10 lg:px-8 md:py-7 md:px-5 py-6 px-5 border border-richblack-600 w-full mt-[33rem] md:mt-0 md:max-w-[50%] lg:max-w-[65%]'>
                        <p className='lg:text-3xl md:text-2xl text-xl font-semibold text-richblack-25'>What You Will Learn</p>
                        <ReactMarkdown className="text-richblack-50 mt-3">{course?.courseDetails?.whatYouWillLearn}</ReactMarkdown>
                    </div>
                </div>

                <div className='w-11/12 max-w-maxContent mx-auto mt-14 sm:mt-20'>
                    <div className='md:w-[65%] w-full'>
                        <h2 className='text-3xl text-richblack-25 font-semibold mb-3'>Course Content</h2>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-x-1 text-richblack-100 text-sm font-semibold mr-1 sm:mr-0'>
                                <span>{course?.courseDetails?.courseContent?.length} sections</span>
                                <span>・ {totalNoOfLectures} lectures</span>
                                <span className='hidden sm:block'>・ total length</span>
                            </div>
                            <button
                                className="text-yellow-100 bg-richblack-800 border border-richblack-700 py-2 px-3 rounded-md hover:text-yellow-200 hover:bg-richblack-900 transition-all duration-200"
                                onClick={() => setIsActive([])}
                            >
                                Collapse all sections
                            </button>
                        </div>
                    </div>

                    {/* Course Details Accordion */}
                    <div className="py-4">
                        {
                            course?.courseDetails?.courseContent?.map((section, index) => (
                                <CourseAccordionBar
                                section={section}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                                />
                            ))
                        }
                    </div>

                    {/* Course Author */}
                    <div className='mt-6 mb-14 flex flex-col gap-y-2 items-baseline w-full md:w-[65%] bg-richblack-800 shadow-[inset_-12px_-8px_40px_#46464620] shadow-richblack-900 rounded-lg p-6'>
                        <p className='text-2xl text-richblack-25 font-semibold'>Author</p>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <div className='w-24 border-[1px] aspect-square rounded-full border-richblack-700 flex justify-center items-center'>
                                <img src={course?.courseDetails?.instructor?.image} alt={course?.courseDetails?.instructor?.firstName}
                                className='aspect-square w-[90%] rounded-full object-cover' />
                            </div>
                             <span className='text-richblack-25 text-lg'>{course?.courseDetails?.instructor?.firstName} {course?.courseDetails?.instructor?.lastName}</span>
                             
                        </div>
                        <p className='text-sm text-richblack-200'>{course?.courseDetails?.instructor?.additionalDetails?.about}</p>
                    </div>                    
                </div>
            </>
            )
        }

        {
        confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
            )
        }
        
        {/* Reviews from other learners */}
        <div className='w-11/12 max-w-maxContent flex flex-col justify-between mx-auto my-[5rem] text-richblack-5'>
            <h1 className='text-4xl text-center mx-auto font-bold mb-10'>Review from other learners</h1>
            <ReviewSlider/>
        </div>
        <Footer />
    </div>
  )
}

export default CourseDetails