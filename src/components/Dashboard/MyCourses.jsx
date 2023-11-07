import React from 'react'
import IconBtn from '../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import {AiOutlinePlus} from "react-icons/ai"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchInstructorCourses } from '../../services/operations/courseDetailsAPI'
import CourseTable from './InstructorCourses/CourseTable'

const MyCourses = () => {

  const {token} = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchCourse =  async () => {
      const result = await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
      }
    }

    fetchCourse();
  }, []);

  return (
    <div>
      <div className='flex justify-between mb-14'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-richblack-25'>My Courses</h1>
        <IconBtn text={"Add Course"} customClasses={"font-semibold px-1 py-2 sm:px-5 sm:py-3"} onClick={() => navigate("/dashboard/add-course")}
        >
          <AiOutlinePlus />
        </IconBtn>
      </div>

      {
        courses && <CourseTable courses={courses} setCourses={setCourses} />
      }
    </div>
  )
}

export default MyCourses