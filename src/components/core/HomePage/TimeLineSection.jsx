import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo : Logo1,
        Heading : "Leadership",
        Description : "Fully committed to success of company"
    },
    {
        Logo : Logo2,
        Heading : "Responsibility",
        Description : "Students will always be our top priority"
    },
    {
        Logo : Logo3,
        Heading : "Flexibility",
        Description : "The ability to switch is an important skills"
    },
    {
        Logo : Logo4,
        Heading : "Solve the problem",
        Description : "FCode your way to a solution"
    }
]

const TimeLineSection = () => {
  return (
    <div>
        <div className='flex flex-col lg:flex-row items-center mb-20 gap-24'>
            {/* Section-1 */}
            <div className='flex flex-col lg:w-[45%] gap-16 lg:gap-3'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div key={index}  className='flex flex-col items-start gap-3'>
                                <div className='flex flex-row gap-6 lg:gap-3'>
                                    <div className='w-[52px] h-[52px] bg-white flex items-center rounded-full justify-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                    <img src={element.Logo} />
                                    </div>
                                    <div>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                    </div>
                                </div>
                                <div
                                className={`hidden ${timeline.length - 1 === index ? "hidden" : "lg:block"}  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                                ></div>
                            </div> 
                        )
                    })
                }
            </div>

            {/* Section-2 */}
            <div className='relative shadow-blue-200 shadow-[10px_-5px_50px_-5px] w-fit h-fit'>
            <img src={timelineImage} alt='timeLineImage' className='rounded-sm object-cover h-[300px] md:h-[450px] lg:h-fit shadow-[20px_20px_rgba(255,255,255)] '/>

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-8 lg:py-10 left-[51%] translate-x-[-50%]  translate-y-[-50%] rounded-sm'>
                <div className='flex flex-row gap2 md:gap-5 items-center md:border-r border-caribbeangreen-300 px-10 md:px-14'>
                    <p className='text-2xl md:text-3xl font-bold w-[2.5rem] sm:w-[3rem] lg:w-[4rem]'>10</p>
                    <p className='text-caribbeangreen-300 text-xs md:text-sm w-[2.5rem] sm:w-[3rem] lg:w-[4rem]'>Years of Experience</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-5 items-center px-10 md:px-14 '>
                    <p className='text-2xl md:text-3xl font-bold w-[2.5rem] sm:w-[3rem] lg:w-[4rem]'>250</p>
                    <p className='text-caribbeangreen-300 text-xs md:text-sm w-[2.5rem] sm:w-[3rem] lg:w-[4rem]'>Types of courses</p>
                </div>
            </div>

            </div>

        </div>
    </div>
  )
}

export default TimeLineSection