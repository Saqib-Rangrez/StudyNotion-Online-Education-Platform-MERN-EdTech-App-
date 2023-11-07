import React from 'react'
import toast from 'react-hot-toast'
import {FaHandPointRight,FaShareSquare} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import copy from "copy-to-clipboard"
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'


const CourseCardDetails = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
          toast.error("You are an Instructor. You can't buy a course.")
          return
        }
        if (token) {
          dispatch(addToCart(course?.courseDetails))
          return
        }
        setConfirmationModal({
          text1: "You are not logged in!",
          text2: "Please login to add To Cart",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2Handler: () => setConfirmationModal(null),
        })
    }

  return (
    <>
        <img src={course?.courseDetails?.thumbnail} alt={course?.courseDetails?.courseName} 
            className='md:max-h-[300px] md:h-[270px] md:min-h-[180px] md:w-[400px] max-w-full max-h-[250px] h-[230px] min-h-[140px] overflow-hidden rounded-t-lg object-cover'loading='lazy' />
                        
        <div className='px-8 pb-8 pt-4 flex flex-col gap-y-4'>
            <p className='text-richblack-25 font-semibold text-2xl'>₹ {course?.courseDetails?.price}</p>
            <button onClick={user && course?.courseDetails?.studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse} className='bg-yellow-50 py-2 w-full text-richblack-900 font-semibold rounded-md'>
                {
                    user && course?.courseDetails?.studentsEnrolled.includes(user._id) ? 
                    ("Go To Course") : ("Buy Now")
                }
            </button>
            {
                !user || !course?.courseDetails?.studentsEnrolled.includes(user._id) && 
                <button onClick={handleAddToCart} className='bg-richblack-800 py-2 w-full border-b border-richblack-500 text-richblack-50 font-semibold rounded-md'>
                    Add to Cart
                </button>
            }
            <p className='text-center text-richblack-200 text-sm'>30-Day Money-Back Guarantee</p>
            <p className='text-xl sm:text-2xl font-semibold text-richblack-50'>This Course Includes :</p>
            <ul className='list-none -mt-2 flex flex-col gap-y-1'>
                {
                    course?.courseDetails?.instructions.map((data, index) => (
                        <li key={index} className='flex gap-x-2 items-center text-caribbeangreen-300 text-sm'>
                            <FaHandPointRight />
                            <span>{data}</span>
                        </li>
                    ))
                }
            </ul>
            <button onClick={handleShare} className="flex items-center gap-x-1 justify-center text-yellow-100">
                <FaShareSquare />
                <span>Share</span>
            </button>
        </div>
    </>
  )
}

export default CourseCardDetails