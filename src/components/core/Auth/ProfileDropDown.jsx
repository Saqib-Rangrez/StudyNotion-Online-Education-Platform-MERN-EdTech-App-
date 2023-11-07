import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowDropdown } from 'react-icons/io';
import useDropdown from '../../../hooks/useDropdown';
import { Link, useNavigate } from 'react-router-dom';
import {RiDashboard2Fill} from "react-icons/ri"
import {BiLogOut} from "react-icons/bi"
import { logout } from '../../../services/operations/authAPI';


const ProfileDropDown = () => {
  
  const {user} = useSelector((state) => state.profile);
  const {isOpen, toggleDropDown, dropDownRef } = useDropdown();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut (event) {
    event.preventDefault();
    dispatch(logout(navigate));
  }
  
  return (
    <div className='flex gap-1 items-center cursor-pointer relative' ref={dropDownRef} onClick={toggleDropDown}>
        <img src={user?.image} alt={`${user?.firstName}`} className=' w-[29px] aspect-square rounded-full object-cover overflow-hidden' />
        <IoMdArrowDropdown fill='#AFB2BF' fontSize={20}/>

        {
          isOpen && (
            <div className='bg-richblack-800 w-[120px] absolute top-[50%] left-[50%] translate-x-[-90%] translate-y-[25%] flex flex-col rounded-md justify-center items-start border border-richblack-700 overflow-hidden z-[100]'>
            <Link to="/dashboard/my-profile" className='hover:bg-richblack-600 transition-all duration-200 cursor-pointer w-full'>
              <div className='flex gap-1 border-b border-richblack-700 items-center p-2  '>
                <RiDashboard2Fill fill='#838894' fontSize={16}/>
                  <p className='text-richblack-300'>Dashboard</p>
              </div>
            </Link>

              <button onClick={handleLogOut} className='flex gap-1 items-center p-2 hover:bg-richblack-600 transition-all duration-200 cursor-pointer w-full'>
                <BiLogOut fill='#838894' fontSize={16}/>
                <p className='text-richblack-300'>Logout</p> 
              </button>
            </div> 
          )
        }
    </div>
  )
}

export default ProfileDropDown