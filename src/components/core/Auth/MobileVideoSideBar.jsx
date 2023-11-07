import React from 'react'
import VideoDetailsSidebar from '../ViewCourse/VideoDetailsSidebar'
import useDropdown from '../../../hooks/useDropdown';
import {BsLayoutSidebarInset, BsReverseLayoutSidebarInsetReverse} from "react-icons/bs"

const MobileVideoSideBar = ({setReviewModal}) => {

    const {isOpen, toggleDropDown, dropDownRef , setIsOpen} = useDropdown();

  return (
    <div ref={dropDownRef}>   
        <span  onClick={toggleDropDown} className='absolute ml-1 visible sm:hidden text-richblack-25 bg-richblack-800 z-[200]'>
            {
                !isOpen ? <BsReverseLayoutSidebarInsetReverse  fontSize={25}/> : <BsLayoutSidebarInset fontSize={25}/>
            }
            
        </span>
        
        <div className={`${isOpen ? "translate-x-0" : "-translate-x-60" }  absolute left-0  top-0 z-[100] h-full transition-all duration-200`}>
            <VideoDetailsSidebar mobile={true} setReviewModal={setReviewModal}/>
        </div>
    </div>
  )
}

export default MobileVideoSideBar