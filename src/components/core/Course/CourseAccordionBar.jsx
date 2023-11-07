import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io'
import SubSectionAccordion from './SubSectionAccordion';

const CourseAccordionBar = ({section, isActive, handleActive}) => {

  const contentEl = useRef(null)

  // Accordian state
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(section._id))
  }, [isActive])

  // Height
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setSectionHeight(active ? 
      contentEl.current.scrollHeight + 30 : 0)
  }, [active]);

  return (
    <div className='border border-richblack-800 w-full md:w-[65%]'>
      <div onClick={() => {
            handleActive(section._id)}} className='bg-richblack-300 px-6 py-6 flex justify-between items-center cursor-pointer transition-[0.3s] bg-opacity-20'>
        <div className='flex gap-x-2 items-center'>
          <i className={`${isActive.includes(section._id) ? "rotate-180" : "rotate-0"}`}>
            <IoIosArrowDown fontSize={20} fill='#838894'/>
          </i>
          <p className='text-richblack-25 font-semibold'>{section?.sectionName}</p>
        </div>
        <div className='flex gap-x-2 items-center text-sm'>
          <span className='text-yellow-50'>{section?.subSection.length} lectures</span>
          <span className='text-richblack-200'>15min</span>
        </div>
      </div>
      <div ref={contentEl} className={`${isActive.includes(section._id) && "px-7 pt-2 pb-2"} relative overflow-hidden bg-richblack-900  transition-all duration-[0.35s] ease-[ease]`} style={{height : sectionHeight}}>
        {
          section?.subSection.map((subSection, index) => (
            <SubSectionAccordion key={index} subSection={subSection} />
          ))
        }
      </div>
    </div>
  )
}

export default CourseAccordionBar