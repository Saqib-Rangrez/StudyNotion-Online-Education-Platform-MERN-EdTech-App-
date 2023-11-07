import React from 'react'
import { useSelector } from 'react-redux';
import {FaCheck} from "react-icons/fa"
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishForm from './PublishCourse/PublishForm';

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id:1,
            title : "Course Information"
        },
        {
            id:2,
            title : "Course Builder"
        },
        {
            id:3,
            title : "Publish Course"
        },
    ];


  return (
    <>
        <div className='relative mb-2 flex w-full justify-center'>
        {
            steps.map((item,index) => (
            <React.Fragment key={item.id}>
                <div
                className="flex flex-col items-center "
                
                >
                    <button
                    className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                    step === item.id
                        ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"
                    } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
                    >
                    {step > item.id ? (
                    <FaCheck className="font-bold text-richblack-900" />
                    ) : (
                    item.id
                    )}
                    </button>
                </div>

                {item.id !== steps.length && (
                <>
                    <div 
                    className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id  ? "border-yellow-50" : "border-richblack-500"
                    } `}
                    ></div>
                </>
                )}
            </React.Fragment>              
            ))
        }
        </div>
        <div className='mb-16 select-none flex justify-between'>
            {
                steps.map((item,index) => (
                    <div key={index} className='flex min-w-[100px] sm:min-w-[123px] justify-center items-center gap-y-2'>
                        <p className={`${index === 3 && "items-end"} text-richblack-500 text-sm sm:text-base sm:text-center`}>{item.title}</p>
                    </div>
                ))
            }
        </div>
        {
            step === 1 && <CourseInformationForm />
        }
        {
            step === 2 && <CourseBuilderForm />
        }
        {
            step === 3 && <PublishForm />
        }
    </>
  )
}

export default RenderSteps