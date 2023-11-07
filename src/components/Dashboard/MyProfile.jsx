import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../common/IconBtn';
import {FaEdit} from "react-icons/fa"

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    // console.log(user)

  return (
    <>
        <p className='text-richblack-200 mb-4 font-semibold'>Home / Dashboard / <span className='text-yellow-50'>My Profile</span></p>
        <h1 className='text-richblack-5 font-semibold text-4xl mb-10'>My Profile</h1>

        {/* Section 1 */}
        <div className='bg-richblack-800 w-full py-4 px-2 sm:py-6 sm:px-5 md:py-8 md:px-8 border border-richblack-700 flex flex-col gap-y-1 mx-auto rounded-lg'>
            <div className='flex items-center justify-between px-2'>
                <p className='text-richblack-5 font-semibold'>Profile</p>
                <IconBtn
                text="Edit"
                onClick={() => navigate('/dashboard/settings')}
                customClasses={"h-fit"}
                >
                    <FaEdit />
                </IconBtn>
            </div>
            
            <div className='flex flex-row gap-x-1 md:gap-x-4 items-center'>
                <img src={user?.image} alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[60px] sm:w-[70px] md:w-[80px] rounded-full object-cover'
                />
                <div className='flex flex-col gap-1'>
                    <p className='font-bold text-base text-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-richblack-400 text-sm '>{user?.email}</p>
                </div>
            </div>
        </div>

        {/* Section 2 */}
        <div className='bg-richblack-800 w-full border border-richblack-700 mt-14 px-4 py-6 sm:py-6 sm:px-5 md:px-8 md:py-8 flex flex-col gap-6 mx-auto rounded-lg'>
            <div className='flex flex-row justify-between items-center'>
                <p className='font-bold text-lg text-richblack-5 '>About</p>
                <IconBtn
                    text={"Edit"}
                    onClick={() => {
                        navigate("/dashboard/settings")
                    }}
                >
                    <FaEdit />
                </IconBtn>
                
            </div>
            <p className='text-richblack-400 w-full md:w-[85%] text-sm'>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
        </div>

        {/* Section 3 */}
        <div className='bg-richblack-800 w-full border border-richblack-700 mt-14 px-4 py-6 sm:py-6 sm:px-5 md:px-8 md:py-8 flex flex-col gap-6 mx-auto rounded-lg'>
            <div className='flex flex-row justify-between items-center'>
                <p className='font-bold text-richblack-5 text-lg'>Personal Details</p>
                <IconBtn text={"Edit"} onClick={() => {
                        navigate("/dashboard/settings")
                    }} >
                        <FaEdit />
                    </IconBtn>
            </div>
            
            <div className='grid grid-cols-2 md:gap-x-6 md:gap-y-4 gap-x-32 gap-y-4 w-full'>
                <div>
                    <p className='text-richblack-400 text-sm '>First Name</p>
                    <p className='text-base text-richblack-5'>{user?.firstName}</p>
                </div>
                <div>
                    <p className='text-richblack-400 text-sm '>Last Name</p>
                    <p className='text-base text-richblack-5'>{user?.lastName}</p>
                </div>
                <div>
                    <p className='text-richblack-400 text-sm '>Email</p>
                    <p className='text-base text-richblack-5 '>{user?.email}</p>
                </div>
                <div>
                    <p className='text-richblack-400 text-sm '>Phone Number</p>
                    <p className='text-base text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                <div>
                    <p className='text-richblack-400 text-sm '>Gender</p>
                    <p className=' text-base text-richblack-5'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                <div>
                    <p className='text-richblack-400 text-sm '>Date of Birth</p>
                    <p className='text-base text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add DoB"}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default MyProfile