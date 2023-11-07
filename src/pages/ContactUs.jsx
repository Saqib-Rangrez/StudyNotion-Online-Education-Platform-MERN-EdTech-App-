import React from 'react'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import {TiMessages, TiWorld} from "react-icons/ti"
import {MdOutlineCall} from "react-icons/md"
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const ContactUs = () => {
  return (
    <div className='flex flex-col w-full'>
        <div className='w-11/12 max-w-maxContent flex flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-between mx-auto mt-[5rem] text-richblack-5'>
            {/* Address */}
            <section className='w-full lg:w-[40%]'>
                <div className='bg-richblack-800 w-full lg:w-[95%] p-8 flex flex-col gap-10 rounded-lg'>
                    <div className='flex flex-col '>
                        <div className='flex gap-2 items-center'>
                            <TiMessages fontSize={24} fill='#AFB2BF'/>
                            <h1 className='text-xl font-bold'>Chat on us</h1>   
                        </div>
                        <p className='text-richblack-200 text-sm'>Our friendly team is here to help.</p>
                        <p className='text-richblack-200 text-sm'>info@studynotion.com</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex gap-2 items-center'>
                            <TiWorld fontSize={24} fill='#AFB2BF'/>
                            <h1 className='text-xl font-bold'>Visit us</h1>
                        </div>
                        <p className='text-richblack-200 text-sm'>Come and say hello at our office HQ.</p>
                        <p className='text-richblack-200 text-sm'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex gap-2 items-center'>
                            <MdOutlineCall fontSize={24} fill='#AFB2BF'/>
                            <h1 className='text-xl font-bold'>Call us</h1>
                        </div>
                        <p className='text-richblack-200 text-sm'>Mon - Fri From 8am to 5pm.</p>
                        <p className='text-richblack-200 text-sm'>+123 456 7869</p>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className='w-full lg:w-[55%] border border-richblack-600 flex justify-center rounded-lg'>
                <div className='flex flex-col w-[90%] lg:w-[95%] py-12 px-4 lg:px-8 gap-4'>
                    <h1 className='text-4xl font-bold w-[80%]'>
                        Got a Idea? We've got the skills. Let's team up
                    </h1>
                    <p className='text-richblack-200 mb-4'>
                    Tell us more about yourself and what you're got in mind.
                    </p>
                    
                    <ContactUsForm />
                   
                </div>
            </section>
        </div>

        <div className='w-11/12 max-w-maxContent flex flex-col justify-between mx-auto my-[5rem] text-richblack-5'>
            <h1 className='text-3xl md:text-4xl text-center mx-auto font-bold mb-10'>Review from other learners</h1>
            <ReviewSlider/>
        </div>

        <Footer />
    </div>
  )
}

export default ContactUs