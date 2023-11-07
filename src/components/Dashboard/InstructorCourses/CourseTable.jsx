import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Th, Td, Thead, Tr, Tbody } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {formatDate} from '../../../services/formatDate'
import { COURSE_STATUS } from '../../../utils/constants';
import {HiClock} from "react-icons/hi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {FaCheck} from "react-icons/fa"
import {FiEdit2} from "react-icons/fi"
import ConfirmationModal from '../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

export default function CourseTable  ({courses, setCourses}) {
  
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("courseId", courseId);
    await deleteCourse(formData, token);
    const result = await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  }
  
  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex sm:flex-row flex-col gap-x-5 gap-y-5 sm:gap-x-10 rounded-t-md border-b border-b-richblack-800 px-3 sm:px-6 py-2">
            <Th className="sm:flex-1 text-left text-sm font-medium uppercase text-richblack-100 ">
              Courses
            </Th>
            <Th >
              <span className="sm:block hidden text-left text-sm font-medium uppercase text-richblack-100 ">
                Duration
              </span>
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex flex-col sm:flex-row gap-y-6 gap-x-2 sm:gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 flex-col sm:flex-row gap-y-4 gap-x-4 text-richblack-100 mt-2 sm:mt-0">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] sm:min-w-[220px] sm:w-[220px] sm:max-w-[220px] w-[150px] min-w-[150px] max-w-[150px] rounded-lg object-cover shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-richblack-700 sm:mr-0 mr-4"
                  />
                  <div className="flex flex-col gap-y-1 mt-2 sm:mt-0 justify-between">
                    <p className=" sm:text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td>
                  <span className="sm:block hidden text-sm font-medium text-richblack-100 w-[80px]">
                  2hr 30min
                  </span>
                </Td>
                <Td className="text-sm font-medium text-richblack-100 mt-2 sm:mt-0  ">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 mt-2 mb-2 sm:mb-0 sm:mt-0 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="sm:px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
