import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Link, useLocation, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import {resetPassword} from '../services/operations/authAPI'

const ResetPassword = () => {
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    function handleChange(event) {
        setFormData((prev) => ({
          ...prev,
          [event.target.name]: event.target.value, 
        }));
    }

    const {newPassword, confirmPassword} = formData;
    const location = useLocation()

    function handleOnSubmit (event) {
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        // console.log(token)
        dispatch(resetPassword(newPassword, confirmPassword, token));
    }

  return (
    <div className='min-h-[80vh] flex justify-center items-center
    '>
        {
            loading ? (<Spinner/>) : 
            (
                <div className='flex flex-col mx-auto justify-center w-11/12 max-w-[450px] gap-3'>
                    <h1 className='text-3xl text-richblack-5'>
                        Choose New Password
                    </h1>
                    <p className='text-richblack-5 text-xl'>Almost done, Enter your new password and you're all set.</p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-3'>
                        <label className='w-full relative'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password
                            <sup className="text-pink-200">*</sup></p>
                            <input type={showPassword ? "text" : "password"} name='newPassword' value={formData.newPassword} placeholder='Enter new password' onChange={handleChange} style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"/>
                            <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">{showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}</span>
                        </label>
                        <label className='w-full relative'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password
                            <sup className="text-pink-200">*</sup></p>
                            <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={formData.confirmPassword} placeholder='Enter new password' onChange={handleChange} style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"/>
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer"> {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}</span>
                        </label>
                        <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900 w-full">Reset Password</button>
                    </form>
                    <Link to="/login">
                        <div className='flex gap-2 items-center text-sm text-blue-100'>
                            <BiArrowBack />
                            <p>Back to login</p>
                        </div>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default ResetPassword