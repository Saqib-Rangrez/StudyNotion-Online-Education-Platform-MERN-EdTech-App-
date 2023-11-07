
import React from 'react'
import {FooterLink2} from "../../data/footer-links"
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];


const Footer = () => {
  return (
    <div className='bg-richblack-800 w-full'>
    <div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center mx-auto text-richblack-400 leading-6 '>
      {/* Upper Section */}
      <div className='flex lg:flex-row flex-col gap-10 lg:gap-0 justify-between items-center lg:items-start w-full border-b border-richblack-700 py-10 px-4 '>
      
      {/* Left section */}

        <div className='flex flex-row flex-wrap gap-8 lg:gap-0 justify-between items-start lg:max-w-[550px]  md:pr-5 md:w-[70%] lg:w-1/2'>
          <div className='flex flex-col gap-3'>
            <div>
              <img src={Logo} loading='lazy' alt='StudyNotion' className='w-[130px]'/>
            </div>
            <h2 className='font-semibold text-richblack-50'>Company</h2>
            <div className='flex flex-col gap-3 mt-1 mb-1 text-[14px]'>
              <Link to={"/about"}>
                <p className={`cursor-pointer hover:text-richblack-50 transition-all duration-200`}>About</p>
              </Link>
              <Link to={"/careers"}>
                <p className={`cursor-pointer hover:text-richblack-50 transition-all duration-200`}>Careers</p>
              </Link>
              <Link to={"affiliates"}>
                <p className={`cursor-pointer hover:text-richblack-50 transition-all duration-200`}>Affiliates</p>
              </Link>
            </div>
            <div className='flex flex-row gap-3 text-[18px]'>
              <FaFacebook className={`cursor-pointer hover:text-richblue-200 transition-all duration-200`}/>
              <FaGoogle className={`cursor-pointer hover:text-[#F4B400] transition-all duration-200`}/>
              <FaTwitter className={`cursor-pointer hover:text-[#0000FF] transition-all duration-200`}/>
              <FaYoutube className={`cursor-pointer hover:text-[#FF0000] transition-all duration-200`}/>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-3'>
              <h2 className='text-richblack-50 font-semibold'>Resources</h2>
              <div className='flex flex-col gap-3 text-[14px]'>
                {
                  Resources.map((element,index) => {
                    return (
                      <div key={index} className={`cursor-pointer hover:text-richblack-50 transition-all duration-200`}>
                        <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                          <p>{element}</p>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <h2 className='text-richblack-50 font-semibold'>Support</h2>
              <div className={`cursor-pointer hover:text-richblack-50 transition-all duration-200 text-[14px]`}>
                      <Link to={"/help-center"}>
                        <p>Help Center</p>
                      </Link>
                    </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-3'>
              <h2 className='text-richblack-50 font-semibold'>Plans</h2>
              <div className='flex flex-col gap-3 text-[14px]'>
                {
                  Plans.map((element,index) => {
                  return (
                    <div key={index} className={`cursor-pointer hover:text-richblack-50 transition-all duration-200`}>
                      <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                        <p>{element}</p>
                      </Link>
                    </div>
                  )
                })
                }
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <h2 className='text-richblack-50 font-semibold'>Community</h2>
              <div className='flex flex-col gap-3 text-[14px]'>
                {
                  Community.map((element,index) => {
                  return (
                    <div key={index} className={`cursor-pointer hover:text-richblack-50 transition-all duration-200`}>
                      <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                        <p>{element}</p>
                      </Link>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </div>
        </div>
      
      {/* Right section */}
      <div className='flex flex-row flex-wrap justify-between items-start lg:max-w-[650px] gap-4 lg:gap-0 md:pl-5 lg:pl-10 md:w-[70%] lg:w-1/2 lg:border-l border-richblack-700'>
        {
          FooterLink2.map((section, index) => {
            return (
              <div key={index} className='flex flex-col gap-3'>
                <h2 className='text-richblack-50 font-semibold'>{section.title}</h2>
                <div className='flex flex-col gap-3 text-[14px]'>
                  {
                    section.links.map((element,index) => {
                      return (
                        <div key={index} className={`cursor-pointer hover:text-richblack-50 transition-all duration-200`}>
                          <Link to={element.link}>{element.title}</Link>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      
      </div>

      {/* Lower Section */}
      <div className='flex md:flex-row flex-col items-center gap-2 lg:gap-0 justify-between w-full mx-auto py-12 px-2'>
          <div className='flex flex-row gap-2 text-[14px]'>
            {
              BottomFooter.map((element, index) => {
                return (
                  <div key={index}>
                    <div className={`${BottomFooter.length - 1 === index ? "" : "border-r border-richblack-700"} cursor-pointer hover:text-richblack-50 transition-all duration-200 px-3`}>
                      <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                       {element}
                      </Link>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className='text-center'>
            Studynotion <span className='text-richblack-100'>©</span> 2023 | All rights reserved.
          </div>
      </div>

    </div>
    </div>
  )
}

export default Footer