import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='w-11/12 max-w-maxContent flex flex-col items-center mt-5'>
        <div className='text-4xl font-semibold text-center'>
            Unlock the <HighLightText text ={"Power of Code"} />
        </div>
        <p className='text-center text-richblack-300 text-[16px] mt-3'>Learn to build anything you can imagine</p>

        <div className='hidden lg:flex flex-row items-center justify-between gap-5 bg-richblack-800 border-b border-richblack-300 rounded-full mt-10 px-1 py-1 '>
            {
                tabsName.map((element, index) => {
                    return (
                        <div key={index}
                        className={`text-[16px] ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200 hover:bg-richblue-900 hover:text-richblack-5"} rounded-full transition-all duration-100 cursor-pointer  px-7 py-2`} onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                } )
            }
        </div>

        <div className='lg:h-[150px]'></div>

        <div className='flex flex-wrap md:flex-row flex-col gap-8 items-center mx-auto md:justify-center lg:justify-between w-full mt-8 lg:mb-0 mb-8 lg:-mt-36'>
            {
                courses.map((course, index) => {
                    return (
                        <CourseCard key={index} course={course} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore