import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {BiSolidMessageSquareAdd} from "react-icons/bi"
import { createSection, updateSection } from '../../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import {GrLinkNext} from "react-icons/gr"
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import NestedView from './NestedView';
import toast from 'react-hot-toast';


const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState : {errors}
  } = useForm();


  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // **************Cancel Edit*****************
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  // **************Go To Next Handle*****************
  const goToNext = () => {
    if(course?.courseContent.length === 0){
      toast.error("Please add atleast one section");
    }
    else if(course?.courseContent?.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
    }else{
    dispatch(setStep(3));
    }
  }

  // ***************Go Back Handle******************
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  // *****************Handle Changed Edit Section Name*******************
  const handleChangedEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }else{
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
    }
  }

  // ***********On Submit Handle**************
  const onSubmitHandle = async (data) => {
    setLoading(true);
    let result ;

    // *************Edit Section*************
    if(editSectionName) {
      const formData = new FormData();
      formData.append("sectionId", editSectionName);
      formData.append("sectionName", data.sectionName);
      formData.append("courseId", course._id);
      result = await updateSection(formData, token);
    }else{
      // ********Create Section***************
      const formdata = new FormData();
      formdata.append("courseId", course._id);
      formdata.append("sectionName", data.sectionName);
      result = await createSection(formdata, token);
      // console.log("API result", result)
    }  

    // update values
    if(result){
      dispatch(setCourse(result));
      // console.log("Course after update",course)
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }


  return (
    <div className='bg-richblack-800 p-6 rounded-md border border-richblack-700'>
      <h1 className='text-2xl text-richblack-5 font-semibold mb-10'>Course Builder</h1>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Section Name
            <sup className='text-pink-200'>*</sup>
          </p>
          <input type='text' name='sectionName' placeholder='Enter section name' {...register("sectionName", {required : {value : true, message: "Section name is required"}})} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 mt-1 p-[12px] text-richblack-5" />
          {
            errors.sectionName && (
              <span className="-mt-1 text-[12px] text-yellow-100"> {errors.sectionName.message} </span>
            )
          }
        </label>

        <div className='flex gap-x-4'>
          <button type='submit' className='bg-richblack-900 border border-yellow-50 text-yellow-50 flex text-sm sm:text-base gap-x-1 sm:gap-2 items-center rounded-md px-3 sm:px-4 py-2 mt-4 hover:scale-[98%] transition-all duration-200 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] shadow-richblack-700'>
            {
              editSectionName ? "Edit Section Name" : "Create Section"
            }
            <BiSolidMessageSquareAdd />
          </button>

          {
            editSectionName && (
              <button
               type='button' onClick={() => setEditSectionName(cancelEdit)}
               className='text-sm text-richblack-300 underline text-center pt-4 hover:text-richblack-400 transition-all duration-200'>Cancel Edit</button>
            )
          }
        </div>
      </form>

      {
        course?.courseContent.length > 0 && (
          <NestedView handleChangedEditSectionName={handleChangedEditSectionName} />
        )
      }

      <div className='flex flex-row gap-x-3 items-center justify-end mt-10'>
        <button onClick={goBack} className='bg-richblack-300 font-semibold text-richblack-900 text-center px-5 py-2 rounded-md hover:scale-[98%] transition-all duration-200'>Back</button>
        <IconBtn 
          text={"Next"} onClick={goToNext} customClasses={"hover:scale-[98%] font-semibold transition-all duration-200"} >
            <GrLinkNext fontSize={14} className='font-semibold' />
          </IconBtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm