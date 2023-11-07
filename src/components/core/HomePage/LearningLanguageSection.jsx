import React from 'react'
import HighLightText from './HighLightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_woth_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-5 mb-32'>
        <div className='flex flex-col gap-2 items-center'>
            <div className='text-3xl md:text-4xl font-semibold text-center'>
                Your swiss knife for <HighLightText text={"learning any language"}/>
            </div>

            <div className='text-center mx-auto text-richblack-600 text-base font-medium w-[95%] md:w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-col lg:flex-row items-center justify-center -mt-5 '>
                <img src={know_your_progress} alt='KnowYourProgress' className='object-contain lg:mt-0 mt-8 lg:-mb-0 -mb-24 lg:-mr-32' 
                />
                <img src={compare_woth_others} alt='CompareWothOthers' className='object-contain'
                />
                <img src={plan_your_lesson} alt='PlanYourLesson' className='object-contain -mt-32 lg:-mt-0 lg:-ml-36'
                />
            </div>

            <div className='w-fit mx-auto -mt-2'>
                <CTAButton active={true} linkto={"/signup"} >Learn More</CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection