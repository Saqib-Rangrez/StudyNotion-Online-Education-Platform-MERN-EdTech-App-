import React from 'react'
import HighLightText from '../components/core/HomePage/HighLightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'

const AboutUs = () => {
  return (
    <div className='text-richblack-25 flex items-center flex-col'>
        {/* Section 1 */}
        <section className=' bg-richblack-700 w-full'>
            <div className='relative flex flex-col items-center max-w-maxContent w-11/12 mx-auto'>
                <header className='w-[90%] md:w-[70%] flex py-20 flex-col text-4xl font-semibold text-richblack-5 justify-center items-center'>
                <h1 className='text-center'>Driving Innovation in Online Education for a
                <HighLightText text={"Brighter Future"} /></h1>
                    
                    <p className='mx-auto mt-3 text-center leading-6 text-[17px] font-medium text-richblack-300 lg:w-[95%]'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                <div className="h-[70px] lg:h-[190px]"></div>
                <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                    <img src={BannerImage1} alt='img' loading='lazy'/>
                    <img src={BannerImage2} alt='img' loading='lazy'/>
                    <img src={BannerImage3} alt='img' loading='lazy'/>
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section className="border-b border-richblack-700 w-full ">
        <div className="h-[150px] "></div>
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                <Quote />
            </div>
        </section>

        {/* Section 3 */}
        <section className='w-full'>
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
                {/* Founding Story */}
                <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                {/* Founding story left box */}
                    <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                        <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Founding Story</h1>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* Founding story Right box */}
                    <div className='w-[95%] lg:w-[40%] flex justify-self-end'>
                        <img src={FoundingStory} alt='img' loading='lazy' className="shadow-[0_0_20px_0] shadow-[#FC6767] w-full" />
                    </div>
                </div>

                {/* Vision and Mission */}
                <div className="flex flex-col items-center mb-4 lg:mb-0 lg:mt-[-5rem] lg:gap-10 lg:flex-row justify-between">
                     {/* Vision and Mission left box*/}
                    <div className="my-12 lg:my-24 flex lg:w-[40%] flex-col gap-10">
                        <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                        Our Vision
                        </h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    {/* Vision and Mission Right Box */}
                    <div className="my-12 lg:my-24 flex lg:w-[40%] flex-col gap-10">
                        <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                        Our Mission
                        </h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Secton 4 */}
        <StatsComponent />

        {/* Section 5 */}
        <section className='w-11/12 max-w-maxContent my-16'>
            <LearningGrid />
        </section>

        {/* Section 6 */}
        <section className='w-11/12 max-w-maxContent my-12'>
            <ContactFormSection />
        </section>

        <section className='relative mx-auto mb-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <h1 className="text-center w-fit text-3xl lg:text-4xl font-semibold mt-8">
                Reviews from other learners
            </h1>            {

            /* <ReviewSlider /> */}
            <ReviewSlider/>
        </section>

        <Footer />
    </div>
  )
}

export default AboutUs