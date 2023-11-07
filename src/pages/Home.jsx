import React from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa";
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {

  return (
    <div>

        {/* Section-1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center justify-between text-white  max-w-maxContent'>

            {/* Become a Instructor Button */}
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-7 py-[5px] group-hover:bg-richblack-900
                    '>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            {/* Heading */}
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighLightText text={'Coding SKills'} />
            </div>
            
            {/* Sub Heading */}
            <div className='mt-4 mb-4 w-[80%] text-center text-lg leading-[24px] font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-row gap-7 mt-8 mb-5'>
                <CTAButton active={true} linkto={'/signup'}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={'/login'}>
                    Book a Demo
                </CTAButton>

            </div>
            
            {/* Video file */}
            <div className='shadow-[10px_-5px_50px_-5px] shadow-blue-200 mx-3 my-8'>
                <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
                <source src={Banner} type='video/mp4' />
                </video>
            </div>

            {/* Code section-1 */}
            <div className='-mb-14'>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={<div className='text-4xl font-semibold'>
                        Unlock your <HighLightText text={"coding potential "} />with our online courses.
                    </div>}
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={{btnText: "Try it Yourself",
                    linkto : "/signup",
                    active : true}}
                    ctabtn2={{btnText: "Learn More",
                    linkto : "/login",
                    active : false}}

                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>


            {/* Code Section-2 */}
            <div>
                <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={<div className='text-4xl font-semibold'>
                            Start <HighLightText text={"coding in seconds"} />
                        </div>}
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={{btnText: "Continue Lesson",
                        linkto : "/signup",
                        active : true}}
                        ctabtn2={{btnText: "Learn More",
                        linkto : "/signup",
                        active : false}}

                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        codeColor={"text-white"}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
            </div>

            <ExploreMore />
            
        </div>

        {/* Section-2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px] lg:h-[350px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col gap-5 mx-auto justify-center h-full items-center'>
                    <div className='lg:mb-4 lg:h-14 lg:mt-20'></div>
                    <div className='flex lg:flex-row gap-8 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex text-center items-center gap-2'>
                                <p>Explore Full Catalog</p>
                                <FaArrowRight />
                                </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"login"}>
                            <div>
                             Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>  
            </div>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center mx-auto justify-between gap-7'>
                <div className='mb-10  flex flex-col justify-between gap-7 mt-20 lg:flex-row lg:gap-0'>
                    <div className='text-4xl font-semibold lg:w-[45%]'>
                    Get the skills you need for a <HighLightText text={"job that is in demand."}></HighLightText>
                    </div>

                    <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                        <p className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                            Learn More
                            </div>
                        </CTAButton>
                    </div>

                </div>

                <TimeLineSection />

                <LearningLanguageSection />
            </div>           

        </div>

        {/* Section-3 */}

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            {/* Become a instructor section */}
            <InstructorSection />

            {/* Reviws from Other Learner */}
            <h1 className="text-center w-fit text-3xl lg:text-4xl font-semibold mt-8">
            Reviews from other learners
            </h1>
            <ReviewSlider />
        </div>

        {/* Footer */}
        <Footer />

    </div>
  )
}

export default Home;