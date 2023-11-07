import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import GetAvgRating from '../../../utils/avgRating';
import ReactStars from "react-rating-stars-component";
import {GiNinjaStar} from "react-icons/gi";
import {RiDeleteBin6Line} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../slices/cartSlice';

const CartCourseCard = ({course, index}) => {

    const [avgrating, setAvgRating] = useState();
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(()=> {
        const res = GetAvgRating(course?.ratingAndReviews);
        setAvgRating(res);
    }, [course]);

  return (
    <div className={`cartCard flex w-full items-start justify-between gap-6 ${
        index !== cart.length - 1 && "md:border-b border-b-richblack-400 pb-6"
      } ${index !== 0 && "md:mt-6"} `}>
        <div className="w-full flex md:flex-row justify-between gap-4 flex-col">
            <img src={course?.thumbnail} alt={course?.courseName} className="md:h-[140px] h-[180px] w-full md:w-[200px] rounded-lg object-cover"/>
            <div className="flex flex-col justify-between gap-y-0 md:space-y-2 md:w-[40%]">
                <p className="text-lg font-medium text-richblack-5">{course.courseName}</p>
                <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{avgrating || 0}</span>
                    <ReactStars 
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<GiNinjaStar />}
                        fullIcon={<GiNinjaStar/>}
                    />
                    <span className="text-richblack-400">{`${course?.ratingAndReviews?.length} Ratings`}</span>
                </div>
                <p className='font-semibold text-sm text-richblack-200'>Total Courses • Lesson • Beginner</p>
            </div>
            <div className="flex flex-row justify-between md:flex-col md:items-end space-y-2 md:w-[20%] ">
                <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                >
                    <RiDeleteBin6Line />
                    <span>Remove</span>
                </button>
                <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {course?.price}</p>
            </div>
        </div>
    </div>
  )
}

export default CartCourseCard