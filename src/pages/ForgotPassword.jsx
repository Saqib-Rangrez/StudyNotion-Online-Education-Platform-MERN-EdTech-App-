import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from "react-router-dom"
import { getPasswordResetToken } from '../services/operations/authAPI'

const ForgotPassword = () => {

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className='text-white flex justify-center items-center min-h-[80vh]'>
      {
        loading ? (<div className='spinner'></div>) :
        (
          <div className='max-w-[450px] w-11/12 flex flex-col gap-3'>
            <h1 className='text-3xl'>
              {
                !emailSent ? "Reset your Password" : "Check your Email"
              }
            </h1>
            <p className='text-richblack-5'>
              {
                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
              }
            </p>
            <form onSubmit={handleOnSubmit} className='flex flex-col gap-3'>
              {
                !emailSent && (
                  <label className='w-full'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className="text-pink-200">*</sup></p>
                    <input required type="email" value={email} name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email Address' 
                    style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"/>
                  </label>
                )
              }
              <button type='submit' className="mt-3 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900 w-full hover:scale-95 transition-all duration-200">
                {
                  !emailSent ? "Reset Password" : "Resend Email"
                }
              </button>
            </form>

            <div>
              <Link to="/login" className='flex items-center gap-2'>
                <BiArrowBack  fontSize={14} fill='#7A98A6'/>
                <p className='text-sm text-blue-100'>Back to login</p>
              </Link>
            </div>
          </div>
        ) 
      }  
    </div>
  )
}

export default ForgotPassword