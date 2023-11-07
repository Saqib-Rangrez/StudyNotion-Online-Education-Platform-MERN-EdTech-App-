import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../services/operations/settingsApi';

const ChnagePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm();

    function submitFormAction (data) {
        setLoading(true);
        try {
            dispatch(changePassword(token, data)).then(() => setLoading(false));
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(submitFormAction)}>
        <div className='bg-richblack-800 rounded-lg border border-richblack-700 py-6 px-4 md:py-6 md:px-8 lg:py-8 lg:px-12 flex flex-col gap-4 md:gap-6'>
            <h2 className='text-2xl font-semibold text-richblack-5'>Change Password</h2>

            <div className='flex justify-between '>
                <label className='w-[49%] relative'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Current Password
                    <sup className="text-pink-200">*</sup>
                </p>
                    <input type={showCurrentPassword ? "text" : "password"} name='oldPassword' placeholder='Enter current password' {...register("oldPassword", {required:{value:true, message:"Please enter the current password"}})} 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"/>
                    <span onClick={() => {setShowCurrentPassword((prev) => !prev)}} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showCurrentPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                    {
                        errors.oldPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">Current password is required</span>
                        )
                    }
                </label>
                <label className='w-[49%] relative'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input type={showNewPassword ? "text" : "password"} name='newPassword' placeholder='Enter new password' {...register("newPassword", {required:{value:true, message:"Please enter the new password"}})} 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"/>
                    <span onClick={() => {setShowNewPassword((prev) => !prev)}} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showNewPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                    {
                        errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">New password is required</span>
                        )
                    }
                </label>
            </div>
        </div>
        <div className='flex justify-end items-center gap-x-3 mt-6'>
                <button onClick={() => navigate("/dashboard/my-profile")} className='bg-richblack-700 text-richblack-5 px-5 py-2 rounded-md text-center'>Cancel</button>
                {
                    loading === true
                    ? <IconBtn text={"Updating..."} /> 
                    : <IconBtn text={"Update"} type={"submit"} />
                }
        </div>
    </form>
  )
}

export default ChnagePassword