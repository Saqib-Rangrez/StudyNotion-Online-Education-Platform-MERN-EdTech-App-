import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import {toast} from "react-hot-toast"
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors, isSubmitSuccessful}} = useForm();
        
        const submitContactForm = async (data) => {
            // console.log("Logging data", data);
            const toastId = toast.loading("Sending Message...")
            try{
                setLoading(true);
                const response = await apiConnector('POST', contactusEndpoint.CONTACT_US_API, data);
                // console.log("Logging response", response);
                toast.dismiss(toastId);
                toast.success("Message Sent Successfully"); 
            }catch(error){
                // console.log("Error", error.message);
                toast.dismiss(toastId);
                toast.error(error.message);
            }
        }

        useEffect ( () => {
            if(isSubmitSuccessful) {
                reset({
                    firstname : "",
                    lastname : "",
                    email : "",
                    message : "",
                    pohoneNo : "",
                    countryCode : ""
                })
            }
        }, [ reset, isSubmitSuccessful ]);


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-6 max-w-maxContentTab'>
            <div className='flex gap-4 w-full justify-between'>
            {/* First Name */}
                <label className='w-[50%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name<span className='text-pink-200'>*</span></p>
                    <input  
                    type='text'
                    name='firstname'
                    placeholder='Enter first name'
                    {...register("firstname", {required:true})}
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {
                    errors.firstname && (
                        <span>
                            Please enter first your name
                        </span>
                    )
                }
                </label>

                
                {/* Last Name */}
                <label className='w-[50%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name</p>
                    <input  
                    type='text'
                    name='lastname'
                    placeholder='Enter last name'
                    {...register("lastname")}
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                    className="w-full outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                </label>
            </div>
            {/* Email */}
            <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<span className='text-pink-200'>*</span></p>
                    <input  
                    type='email'
                    name='email'
                    placeholder='Enter email address'
                    {...register("email", {required:true})}
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email
                        </span>
                    )
                }
                </label>
                
                {/* Country Code and Phone Number */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='phonenumber'>
                        Phone Number
                    </label>
                    <div className='flex flex-row gap-7 '>
                    {/* Dropdown */}
                        <div>
                            <select
                                name='countryCode'
                                id='countryCode'
                                placeholder='+91'
                                {...register("countryCode", {required:true})}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[65px] h-full outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 overflow-hidden"
                            >
                                {
                                    CountryCode.map((element, index) => (
                                        <option key={index}>
                                            {element.code} {" "} - {element.country}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    {/* Phone Number */}
                        <div className='w-full'>
                            <input type='text' name='phoneNo' placeholder='12345 67890' {...register("phoneNo", {
                                required:{value: true, message: "Please Enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength : {value:8, message:"Invalid Phone Number"}
                                })} 
                            style={{
                            boxShadow: "inset 0px -1px 0px rgba (255, 255, 255, 0.18)",
                            }}
                            className="w-full outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            />
                        </div>
                        
                    </div>
                    {
                        errors.phoneNo && (
                            <span className='text-white'>
                            {errors.phoneNo.message}
                            </span>
                        )
                    }
                </div>

                {/* Message */}
                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Message<span className='text-pink-200'>*</span></p>
                    <textarea 
                        name='message'
                        cols={30}
                        rows={7}
                        placeholder='Enter your message here'
                        {...register("message", {required:true})}
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {
                        errors.message && (
                            <span>
                                Please enter first your message
                            </span>
                        )
                    }
                </label>

                <button type='submit' style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }} className=" rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-semibold text-richblack-900 hover:scale-95 transition-all duration-200">
                    Send Message
                </button>
        </div>
    </form>
  )
}

export default ContactUsForm