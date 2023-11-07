import React from 'react'
import { useForm } from 'react-hook-form';
import {RxCross1} from "react-icons/rx"
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { useEffect } from 'react';
import ReactStars from "react-rating-stars-component"
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState : {errors}
    } = useForm();

    const onSubmitHandler = async (data) => {
        await createRating(
            {
                courseId : courseEntireData?._id,
                rating : data.rating,
                review : data.review
            },
            token
        );
        setReviewModal(false);
    }

    useEffect(() => {
        setValue("review", "");
        setValue("rating", 0);
    }, [])

  return (
    <div className='fixed inset-0 z-[1000] bg-richblack-900 bg-opacity-20 flex justify-center items-center backdrop-blur-sm'>

    <div className='w-11/12 max-w-[800px] bg-richblack-800 rounded-lg '>
        <div className='flex justify-between items-center w-full bg-richblack-700 border-b border-richblack-100 rounded-t-lg px-6 py-6'>
            <h2 className='text-2xl text-richblack-25'>Add Review</h2>
            <button onClick={() => setReviewModal(false)} className='text-richblack-50 font-bold'>
                <RxCross1 fontSize={24} />
            </button>
        </div>
        <div className='mx-auto flex flex-row gap-x-3 justify-center items-center pt-4 px-6'>
            <img src={user?.image} alt={user?.firstName} loading='lazy' 
                className='w-20 aspect-square rounded-full' />
            <div className='flex flex-col gap-1 text-richblack-25'>
                <p className='text-richblack-25'>{user?.firstName} {user?.lastName}</p>
                <p className='text-sm text-richblack-200'>Posting Publicly</p>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)} className='w-[90%] mx-auto'>
            <div className='mx-auto flex justify-center items-center pb-2 '>
                <ReactStars count={5}
                    onChange={(newRating) => { setValue("rating",newRating)}}
                    size={50}
                    activeColor="#ffd700"/>
            </div>
            <label className='flex flex-col gap-2'>
                <p className='text-base text-richblack-50 leading-[0.85rem]'>
                    Add your experience
                    <span className='text-pink-200'>*</span>
                </p>
                <textarea placeholder='Share details of your experience for this course' name='review' 
                    {...register("review", {required : true})} style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full border border-transparent mb-6 focus:border-transparent rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5 h-32" />
                {
                    errors.review && (
                        <span className='text-yellow-50 text-sm'>Your response is required</span>
                    )
                }
            </label>
            <div className='flex justify-end items-center gap-x-3 pb-6'>
                <button onClick={() => setReviewModal(false)} className='bg-richblack-600 px-4 py-2 rounded-md text-richblack-25'>
                    Cancel
                </button>
                <IconBtn type={"submit"} text={"Submit"} />
            </div>
        </form>
    </div>

    </div>
  )
}

export default CourseReviewModal