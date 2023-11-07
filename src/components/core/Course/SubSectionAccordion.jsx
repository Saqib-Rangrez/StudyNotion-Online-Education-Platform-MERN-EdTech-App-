import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

const SubSectionAccordion = ({subSection}) => {

  return (
    <div className='cursor-pointer'>
        <div>
            <div className='flex flex-col gap-y-1 '>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-row gap-x-2 items-center text-richblack-5'>
                        <HiOutlineDesktopComputer />
                        <span className='text-richblack-50'>{subSection?.title}</span>
                        <i>
                            <IoIosArrowDown />
                        </i>
                    </div>
                    <div>
                        <span className='text-richblack-50'>{subSection?.timeDuration || "15:30"}</span>
                    </div>
                </div>
                <p className='text-richblack-200 px-3 text-xs sm:px-6'>{subSection?.description}</p>
            </div>
        </div>
    </div>
  )
}

export default SubSectionAccordion