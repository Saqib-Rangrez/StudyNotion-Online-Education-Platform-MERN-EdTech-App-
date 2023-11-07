import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import {BsClockHistory} from 'react-icons/bs';
import { sendOtp, signUp } from '../services/operations/authAPI';

const VerifyEmail = () => {
   
    const {signupData, loading} = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect ( () => {
        if(!signupData) {
            navigate('/signup')
        }
    },[]);

    function handleOnSubmit (e) {
        e.preventDefault();
        const {accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            } = signupData;
        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,otp,navigate));
    }

  return (
    <div className='text-white flex justify-center items-center min-h-[80vh]'>
        {
            loading ? (<Spinner/>) : (
                <div className=' w-[450px] p-4 flex flex-col gap-2'>
                    <h1 className='text-3xl text-richblack-25 font-bold'>Verify Email</h1>
                    <p className='text-richblack-100 text-[20px] leading-6 mt-2'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col'>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            containerStyle="otp-container"
                            inputStyle="otp-input"
                            renderInput={(props) => <input {...props} placeholder='-' style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="sm:w-[60px] sm:h-[60px] w-[50px] h-[50px] outline-none rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-center" />}
                        />
                        <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-semibold text-richblack-900">Verify Email</button>
                    </form>
                    <div className='flex justify-between w-full'>
                        <Link to="/signup" >
                        <div className='flex gap-2 items-center'>
                            <BiArrowBack />
                            <p>Back to signup</p>
                        </div>
                        </Link>
                        <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} className='flex gap-2 items-center'>
                            <BsClockHistory fill='#7A98A6' />
                            <p className='text-blue-100'>Resend it</p>
                        </button>
                    </div>
                </div>
                
            )
        }
    </div>
  )
}

export default VerifyEmail