import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import { MdModeEditOutline,MdArrowDropDown} from "react-icons/md"
import {IoMdAdd} from "react-icons/io"
import {RiDeleteBin5Line} from "react-icons/ri"
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import SubSectionModal from './SubSectionModal';
import Error from "../../../../pages/Error"


const NestedView = ({handleChangedEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    // *************Delete Section****************
    const deleteCourseSection = async (sectionId) => {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("courseId", course._id);
      const response = await deleteSection(formData, token);

      if(response) {
        dispatch(setCourse(response));
      }
      setConfirmationModal(null);
    }

    // **********Delete Sub Section*****************
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
      const courseId = course._id;
      const formData = new FormData();
      formData.append("subSectionId",subSectionId);
      formData.append("sectionId",sectionId);
      formData.append("courseId",courseId);
      const response = await deleteSubSection(formData, token);
      if(response) {
        const updatedCourseContent = course?.courseContent.map((section) => {
          return section._id === sectionId ? response : section
        })
        dispatch(setCourse({...course,courseContent:updatedCourseContent}));
      }
      setConfirmationModal(null);
    }

  return (
    <div>
      <div className='flex flex-col gap-6 mt-7 px-3 py-4 sm:p-6 bg-richblack-700 rounded-lg shadow-[inset_-12px_-8px_40px_#46464620] shadow-richblack-800'>
        {
          course?.courseContent?.map((section) => (
            <details key={section._id} open className='cursor-pointer'>
              <summary className='flex flex-row justify-between items-center border-b-2 border-richblack-600 py-2 mx-1 sm:mx-4'>
                
                <div className='flex flex-row gap-x-2 items-center text-richblack-100'>
                  <RxDropdownMenu fontSize={24} />
                  <p className='text-richblack-50'>{section.sectionName}</p>
                </div>

                <div className='flex flex-row gap-x-2 text-richblack-300 items-center'>
                  <button onClick={() => handleChangedEditSectionName(section._id, section.sectionName)}>
                    <MdModeEditOutline fontSize={20}  className='hover:text-richblack-500 transition-all duration-200'/>
                  </button>
                  <button onClick={() => setConfirmationModal({
                    text1 : "Delete this Section",
                    text2 : "All the lectures in this section will be deleted",
                    btn1Text : "Delete",
                    btn2Text : "Cancel",
                    btn1Handler : () => deleteCourseSection(section._id),
                    btn2Handler : () => setConfirmationModal(null)
                  })}>
                    <RiDeleteBin5Line fontSize={20} className='hover:text-richblack-500 transition-all duration-200' />
                  </button>
                  <div className='w-[2px] h-5 bg-richblack-400'></div>
                  <MdArrowDropDown fontSize={30} className='-ml-2' />
                </div>

              </summary>

              {/* **********Sub-Section Part**************** */}
              <div className='flex flex-col space-y-4 mt-4'>
              {
                section?.subSection.map((data) => (
                  <div key={data._id} onClick={() => setViewSubSection(data)} className='flex justify-between mx-3 sm:mx-6 md:mx-8 border-b-2 border-richblack-600 py-2'>
                    <div className='flex flex-row gap-x-2 items-center text-richblack-100'>
                      <RxDropdownMenu fontSize={24} />
                      <p className='text-richblack-50'>{data.title}</p>
                    </div>
                    
                    <div onClick={(e) => e.stopPropagation()} className='flex flex-row gap-x-2 text-richblack-300 items-center '>
                      <button onClick={() => setEditSubSection({...data, sectionId : section._id})} >
                        <MdModeEditOutline fontSize={20}  className='hover:text-richblack-500 transition-all duration-200'/>
                      </button>
                      <button onClick={() => setConfirmationModal({
                        text1 : "Delete this Sub Section",
                        text2 : "Selected lecture will be deleted",
                        btn1Text : "Delete",
                        btn2Text : "Cancel",
                        btn1Handler : () => handleDeleteSubSection(data._id,section._id),
                        btn2Handler : () => setConfirmationModal(null)
                      })}>
                        <RiDeleteBin5Line fontSize={20} className='hover:text-richblack-500 transition-all duration-200' />
                      </button>
                    </div>
                  </div>
                ))
              }
              </div>
              

              {/* *******Button to add lecture or subSection**** */}
              <button onClick={() => setAddSubSection(section._id)} className='text-yellow-50 rounded-md flex flex-row gap-1 mt-3 items-center mx-8 font-semibold'>
                <IoMdAdd fontSize={24} />
                <span>Add Lecture</span>
              </button>

            </details>
          ))
        }
      </div>
      {
        confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )
      }
      {
        addSubSection ? (
          <SubSectionModal setModalData={setAddSubSection} modalData={addSubSection} add={true} />
        ) : viewSubSection ? (<SubSectionModal setModalData={setViewSubSection} modalData={viewSubSection} view={true} />
        ) : editSubSection ? (<SubSectionModal setModalData={setEditSubSection} modalData={editSubSection} edit={true} />) : ""
      }
      {
        viewSubSection && (
          <SubSectionModal setModalData={setViewSubSection} modalData={viewSubSection} view={true} />
        )
      }
      {
        editSubSection && (
          <SubSectionModal setModalData={setEditSubSection} modalData={editSubSection} edit={true} />
        )
      }
    </div>
  )
}

export default NestedView