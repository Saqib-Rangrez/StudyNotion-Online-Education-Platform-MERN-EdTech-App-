import React from 'react'
import {BsReverseLayoutSidebarInsetReverse,BsLayoutSidebarInset} from "react-icons/bs"
import useDropdown from '../../../hooks/useDropdown';
import SideBar from '../../Dashboard/SideBar';


const DashboardSideBar = () => {

    const {isOpen, toggleDropDown, dropDownRef , setIsOpen} = useDropdown();

  return (
    <div ref={dropDownRef}>
        <span  onClick={toggleDropDown} className='absolute ml-1 visible md:hidden text-richblack-25 bg-richblack-800 z-[200]'>
            {
                !isOpen ? <BsReverseLayoutSidebarInsetReverse fontSize={25}  /> : <BsLayoutSidebarInset fontSize={25} />
            }  
        </span>
        <SideBar mobile={true} isOpen={isOpen} setIsOpen={setIsOpen} />  
    </div>
  )
}

export default DashboardSideBar