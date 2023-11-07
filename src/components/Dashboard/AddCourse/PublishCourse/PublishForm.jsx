import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import { COURSE_STATUS } from '../../../../utils/constants';
import { resetCourseState, setStep } from '../../../../slices/courseSlice';

const PublishForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors}
  } = useForm();

  useEffect(() => {
    if(course?.COURSE_STATUS?.PUBLISHED) {
      setValue("status", true);
    }
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    dispatch(setStep(2));
  }

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  }

  const handleCoursePublish = async () => {
    if(course?.status === COURSE_STATUS?.PUBLISHED && getValues("status") === true || (course?.status === COURSE_STATUS?.DRAFT && getValues("status")) === false)  {
      // No updation in form no api call
      goToCourses();
      return;
    }

    const formData =  new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("status") === true ? COURSE_STATUS?.PUBLISHED : COURSE_STATUS?.DRAFT ;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if(result){
      goToCourses();
    }
}

  // ********onSubmit handler********
  const onSubmit = (data) => {
    handleCoursePublish();
  }

  return (
    <div className='bg-richblack-800 rounded-lg p-6 flex flex-col gap-y-6 border-[1px] border-richblack-700 '>
      <h1 className='text-3xl text-richblack-25'>Publish Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='flex items-center gap-x-4'>
          <input type='checkbox' {...register("status")} name='status' className='h-4 w-4' /> 
          <span className='text-richblack-300 text-lg'>Make this course as public</span>
        </label>

        <div className='flex justify-end items-center gap-x-3 mt-8'>
          <button disabled={loading} onClick={goBack} className='bg-richblack-400 px-4 py-2 text-richblack-900 rounded-md font-semibold'>Back</button>
          <IconBtn disabled={loading} text={"Save Changes"} type={"submit"} customClasses={"font-semibold"}/>
        </div>
      </form>
    </div>
  )
}

export default PublishForm