import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from './HighLightText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "./Button"

const InstructorSection = () => {
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-20 items-center'>
            {/* left */}
            <div className='lg:w-[50%]  shadow-blue-200 shadow-[10px_-5px_50px_-5px]'>
                <img src={Instructor} alt='Instructor' className='shadow-[-20px_-20px_rgba(255,255,255)] '/>
            </div>

            {/* right */}
            <div className='lg:w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold'>
                Become an <br/> <HighLightText text={"Instructor"} />
            </div>
            <p className='text-[18px] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            
            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        <p>Start Teaching Today</p>
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
            
            </div>
        </div>
    </div>
  )
}

export default InstructorSection