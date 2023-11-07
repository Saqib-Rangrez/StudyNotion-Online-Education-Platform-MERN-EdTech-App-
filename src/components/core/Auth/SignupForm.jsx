import React, { useState } from 'react'
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Tab from "../../common/Tab"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import toast from 'react-hot-toast'

const SignupForm = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState(
    {
      firstName : "", 
      lastName : "", 
      email : "", 
      password : "",
      confirmPassword: "",
    });

  function handleChange (event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name] : event.target.value
    }))
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.error("Password Do not Match")
      return;
    }

    const signupData = {
      ...formData,
      accountType 
    }
    // setting up signup data to state to be used after otp verification
    dispatch(setSignupData(signupData));

    // send otp for user verification
    dispatch(sendOtp(formData.email, navigate));

    // reset
    setFormData({
      firstName : "", 
      lastName : "", 
      email : "", 
      password : "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]


  return (
    <div>
        <Tab field={accountType} setField={setAccountType} tabData={tabData} />

        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
          <div className="flex gap-x-4">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name 
              <sup className="text-pink-200">*</sup></p>
              <input required type='text' name='firstName' value={formData.firstName} placeholder='Enter first name' onChange={handleChange} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"/>
            </label>
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name 
              <sup className="text-pink-200">*</sup></p>
              <input required type='text' name='lastName' value={formData.lastName} placeholder='Enter last name' onChange={handleChange} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"/>
            </label>
          </div>

          
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address
            <sup className="text-pink-200">*</sup></p>
            <input required type='text' name='email' value={formData.email} placeholder='Enter your email' onChange={handleChange} style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full border border-transparent focus:border-transparent rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"/>
          </label>

          <div className="flex gap-x-4">
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password
              <sup className="text-pink-200">*</sup></p>
              <input type={showPassword? "text" : "password"} required name='password' placeholder='Enter password' value={formData.password} onChange={handleChange} style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"/>
              <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
              </span>
            </label>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password<sup>*</sup></p>
              <input type={showConfirmPassword? "text" : "password"} required name='confirmPassword' placeholder='Confirm passowrd' value={formData.confirmPassword} onChange={handleChange} style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"/>
              <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
              </span>
            </label>
          </div>

          <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900">
          Create Account
          </button>
        </form>
    </div>
  )
}

export default SignupForm