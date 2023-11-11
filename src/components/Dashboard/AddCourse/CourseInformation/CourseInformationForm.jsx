import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import RequirementField from "./RequirementField"
import ChipInput from './ChipInput';
import Upload from './Upload';
import IconBtn from '../../../common/IconBtn';
import { setCourse, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import {COURSE_STATUS} from "../../../../utils/constants"
import {GrLinkNext} from "react-icons/gr"

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState : {errors}
  } = useForm();

  const dispatch = useDispatch();
  const {course, editCourse} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length > 0){
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    if(editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tags.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() ||
        currentValues.courseImage !== course.thumbnail 
      )
      return true
    else 
      return false;
  }

  const onSubmit = async (data) => {
    if(editCourse){
      if(isFormUpdated){
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if(currentValues.courseTitle !== course.courseName){
          formData.append("courseName",data.courseTitle)
        }
        if(currentValues.courseShortDesc !== course.courseDescription){
          formData.append("courseDescription",data.courseShortDesc)
        }
        if(currentValues.coursePrice !== course.price){
          formData.append("price",data.coursePrice)
        }
        if(currentValues.courseTags.toString() !== course.tags.toString()){
          formData.append("tags",JSON.stringify(data.courseTags))
        }
        if(currentValues.courseBenefits !== course.whatYouWillLearn){
          formData.append("whatYouWillLearn",data.courseBenefits)
        }
        if(currentValues.courseCategory._id !== course.category._id){
          formData.append("category",data.courseCategory)
        }
        if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }
        if(currentValues.courseImage !== course.thumbnail){
          formData.append("thumbnailImage",data.courseImage)
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if(result){
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      }
      else {
        toast.error("No changes made to the course")
      }
      return;
    }

    // create a new course
    const formData = new FormData();
    formData.append("courseName",data.courseTitle);
    formData.append("courseDescription",data.courseShortDesc);
    formData.append("price",data.coursePrice);
    formData.append("whatYouWillLearn",data.courseBenefits);
    formData.append("tags",data.courseTags);
    formData.append("instructions",data.courseRequirements);
    formData.append("thumbnailImage",data.courseImage);
    formData.append("category",data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if(result) {
      
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-md border-richblack-700 bg-richblack-800 p-4 sm:p-6 space-y-8 text-richblack-400 flex flex-col '
    >
        {/* ************Course Name************ */}
        <>
        <label className=''>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Course Title 
            <sup className='text-pink-200'>*</sup></p>
            <input type='text' name='courseTitle' placeholder='Enter course title' {...register("courseTitle", {required : true})} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
            {
              errors.courseTitle && (
                <span className="-mt-1 text-[12px] text-yellow-100">Course title is required</span>
              )
            }
          </label>
        </>  
        

        {/* **************Course Description************* */}
        <>
          <label className='mt-6'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Course Short Description 
            <sup className='text-pink-200'>*</sup></p>
            <textarea cols={20} rows={6}  name='courseShortDesc' placeholder='Enter course description' {...register("courseShortDesc", {required : true})} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
            {
              errors.courseTitle && (
                <span className="-mt-1 text-[12px] text-yellow-100">Course description is required</span>
              )
            }
          </label>
        </>

        {/* ***************Course Price*************** */}
        <>
          <label className='relative flex flex-col'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Course Price 
            <sup className='text-pink-200'>*</sup></p>
            <input type='text' name='coursePrice' placeholder='Enter course price' {...register("coursePrice", {required : true, valueAsNumber : true})} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 pl-10 p-[12px] text-richblack-5" />
            <span className='absolute left-3  top-[50%]'><HiOutlineCurrencyRupee fontSize={24} /></span>
          
            {
              errors.courseTitle && (
                <span className="mt-1 text-[12px] text-yellow-100">Course price is required</span>
              )
            }
          </label>
        </>

        {/* **************Course Category********* */}
        <>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Course Category 
            <sup className='text-pink-200'>*</sup></p>
            <select name='courseCategory' placeholder='Select course category' {...register("courseCategory", {required : true})} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5">
            <option value="">
              Choose a Category
            </option>
              {!loading &&
                courseCategories?.map((category,index) => (
                  <option key={index} value={category?._id} onChange={() => setValue("courseCategory", category._id)}>
                    {category?.name}
                  </option>
                ))
              }
            </select>
            {
              errors.courseCategory && (
                <span className="-mt-1 text-[12px] text-yellow-100">Course category is required</span>
              )
            }
          </label>
        </>
        
          {/* create a custom component for handling tags input */}
          <ChipInput 
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />

          {/* Create a component for uploading and showing preview of media */}
          <Upload 
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            errors={errors}
            setValue={setValue}
            editData={editCourse ? course?.thumbnail : null}
          />

          {/* Benifits of the course */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Benifits of the Course
            <sup className='text-pink-200'>*</sup></p>
            <textarea cols={30} rows={5}
              name='courseBenefits'
              placeholder='Enter benefits of the course'
              {...register("courseBenefits",{required:true})} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
              {
                errors.courseBenefits && (
                  <span className="-mt-1 text-[12px] text-yellow-100">Benifits of the Course is required</span>
                )
              }
          </label>

          <RequirementField 
            name="courseRequirements"
            label="Requirements / Instructions"
            placeholder="Enter Requirements or Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />

          <div className='flex justify-end gap-x-3'>
            {
              editCourse && (
                <button onClick={() => dispatch(setStep(2))} className='bg-richblack-300 rounded-md py-2 px-3 text-richblack-900 font-semibold'>
                  Continue Without Saving
                </button>
              )
            }

            <IconBtn type={"submit"} text={!editCourse ? "Next" : "Save Changes"} customClasses={"sm:px-5 px-3 text-sm sm:text-base font-semibold hover:scale-[98%] transition-all duration-200 font-medium"} >
              <GrLinkNext  fontSize={14} />
            </IconBtn>
          </div>
    </form>
  )
}

export default CourseInformationForm