import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import countrycode from "../../../data/countrycode.json"
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { updateProfile } from '../../../services/operations/settingsApi';

const UpdateProfileInfo = () => {
    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm();

    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)

    async function formSubmitAction (data) {
        // console.log("Logging data", data);
        setLoading(true);
        try {
            dispatch(updateProfile(token, data))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
        setLoading(false);
    }
    
    // console.log("User gender : ", user?.additionalDetails?.gender , "Type of it :",typeof(user?.additionalDetails?.gender))

  return (
    <form onSubmit={handleSubmit(formSubmitAction)}>  
        <div className='bg-richblack-800 rounded-lg border border-richblack-700 lg:py-8 lg:px-12 md:py-6 md:px-8 px-4 py-4 flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-richblack-5'>Profile Information</h2>
            <div className='flex justify-between'>
                <label className='w-[49%] flex flex-col'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name</p>
                    <input type='text' name="firstName" placeholder='Enter first name' defaultValue={user?.firstName} {...register("firstName", {required : {
                        value : true,
                        message : "Please enter your first na,e"
                    }})} 
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">{errors.firstName.message}</span>
                        )
                    }
                </label>
                <label className='w-[49%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name</p>
                    <input type='text' name="lastName" placeholder='Enter last name' defaultValue={user?.lastName} {...register("lastName", {required : {
                        value : true,
                        message : "Please enter your last name"
                    }})} 
                        style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {
                        errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">{errors.lastName.message}</span>
                        )
                    }
                </label>
            </div>
            <div className='flex justify-between'>
                {/* *************Date of Birth************** */}
                <label className='w-[47%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Date of Birth</p>
                    <input type='date' name='dateOfBirth' defaultValue={user?.additionalDetails?.dateOfBirth} {...register("dateOfBirth", {required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  } 
                    })} 
                        style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {
                        errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">{errors.dateOfBirth.message}</span>
                        )
                    }
                </label>
                {/* ***********Gender***************** */}
                <label className='w-[51%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Gender</p>
                    <div  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full border border-transparent focus:border-transparent flex justify-between px-2 sm:px-3 md:px-4 outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5">
                        <label className='flex gap-1 md:gap-2 items-center flex-row-reverse cursor-pointer'>
                            <p>Male</p>
                            <input type='radio' name='gender' value={"Male"} defaultChecked={user?.additionalDetails?.gender === "Male"} {...register("gender", {
                            required : {
                                value : true,
                                message : "Select your gender"
                            },
                            valueAsNumber : {
                                value : false
                            } 
                            })} 
                            className={`w-3 h-3 checked:bg-yellow-50 text-yellow-50 border-none focus:ring-yellow-50 focus:ring-1`}
                            />
                            
                        </label>
                        <label className='flex gap-1 md:gap-2 items-center flex-row-reverse cursor-pointer'>
                            <p>Female</p>
                            <input type='radio' name='gender' value={"Female"} defaultChecked={user?.additionalDetails?.gender === "Female"} {...register("gender", {
                            required : {
                                value : true,
                                message : "Select your gender"
                            },
                            valueAsNumber : {
                                value : false
                            } 
                            })} 
                            className={`w-3 h-3 checked:bg-yellow-50 text-yellow-50 border-none  focus:ring-yellow-50 focus:ring-1`}
                            />
                        </label>
                        <label className='hidden lg:flex gap-2 items-center flex-row-reverse cursor-pointer'>
                            <p>Transgender</p>
                            <input type='radio' name='gender' value={"Transgender"} defaultChecked={user?.additionalDetails?.gender === "Transgender"} {...register("gender", {
                            required : {
                                value : true,
                                message : "Select your gender"
                            },
                            valueAsNumber : {
                                value : false
                            } 
                            })} 
                            className={`w-3 h-3 checked:bg-yellow-50 text-yellow-50 border-none focus:ring-yellow-50 focus:ring-1`}
                            />
                        </label>
                        <label className='hidden lg:flex gap-2 items-center flex-row-reverse cursor-pointer'>
                            <p>Other</p>
                            <input type='radio' name='gender' value={"Other"} defaultChecked={user?.additionalDetails?.gender === "Other"} {...register("gender", {
                            required : {
                                value : true,
                                message : "Select your gender"
                            },
                            valueAsNumber : {
                                value : false
                            } 
                            })} 
                            className={`w-3 h-3 checked:bg-richblack-800 text-richblack-800 border-none focus:ring-richblack-800 focus:ring-1`}
                            />
                        </label>
                    </div>
                    {
                        errors.gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">{errors.gender.message}</span>
                        )
                    }
                </label>
            </div>
            <div className='flex justify-between'>
                <label className='w-[49%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Contact Number</p>
                    <div className='flex gap-x-2 items-center'>
                        {/* <select style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[80px] overflow-x-hidden border border-transparent focus:border-transparent h-full outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 overflow-hidden">
                            {
                                countrycode.map((element, index) => (
                                    <option key={index}>{element.code}  {" "}- {element.country}</option>
                                )) 
                            }
                        </select> */}
                        <input type='text' placeholder='Enter contact number' defaultValue={user?.additionalDetails?.contactNumber} name='contactNumber' {...register("contactNumber", {required : {
                            value : true,
                            message : "Please enter your contact number"
                        }, maxLength : {
                            value : 12,
                            message : "Invalid contact number"
                        }, minLength : {
                            value : 10,
                            message : "Invalid contact number"
                        }})} 
                        style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full outline-none border border-transparent focus:border-transparent rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                        />
                    </div>
                    {
                        errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100"> {errors.contactNumber.message} </span>
                        )
                    }
                </label>
                <label className='w-[49%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">About</p>
                    <input type='text' name='about' defaultValue={user?.additionalDetails?.about} {...register("about", {required : {
                        value : true,
                        message : "Enter something about yourself"
                    }})} 
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {
                        errors.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">{errors.about.message}</span>
                        )
                    }
                </label>
            </div>
        </div>

        <div className='flex justify-end items-center mt-6 gap-x-4'>
            <button onClick={() => {navigate("/dashboard/my-profile")} } className='bg-richblack-700 py-2 px-5 rounded-md text-richblack-5 text-center'>Cancel</button>
            {
                loading ? (<IconBtn text={"Saving..."} />) : (<IconBtn text={"Save"} type={"submit"} />)
            }
        </div>
    </form>
  )
}

export default UpdateProfileInfo