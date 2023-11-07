import React from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setCourse, setEditCourse } from '../../../slices/courseSlice';
import { useState } from 'react';
import Spinner from '../../common/Spinner';
import { getFullDetailsOfCourse } from '../../../services/operations/courseDetailsAPI';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    // console.log(courseId)
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            // console.log(courseId)
            const result = await getFullDetailsOfCourse(courseId,token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }

        populateCourseDetails();
    }, [])

    if(loading){
        return (
        <div className='w-full h-[80vh] grid place-items-center'>
            <Spinner />
        </div>)
    }

  return (
    <>
        <h1 className='text-4xl text-richblack-25 mb-16'>Edit Course</h1>
        <div className='w-11/12 max-w-maxContentTab mx-auto '>
            {
                course ? <RenderSteps /> : <div className='text-richblack-600 text-4xl w-full h-[50vh] grid place-items-center'>Course Not Found! </div>
            }
        </div>
    </>
    
  )
}

export default EditCourse