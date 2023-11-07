import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, FreeMode} from "swiper/modules"
import "swiper/css/free-mode"
import 'swiper/css';
import 'swiper/css/pagination';
import { Scrollbar } from 'swiper/modules';
import ReactStars from "react-rating-stars-component"
import { ratingsEndpoints } from '../../services/apis';
import { apiConnector } from '../../services/apiConnector';
import { FaStar } from 'react-icons/fa';

const {REVIEWS_DETAILS_API} = ratingsEndpoints;

const ReviewSlider = () => {

  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector("GET", REVIEWS_DETAILS_API);
      // console.log("Reviews response", response);
      if(response.data.success){
        setReviews(response.data.data)
      }
      // console.log("Reviews", reviews)
    }

    fetchAllReviews();
  }, [])
  

  return (
    <div className='w-full'> 
        <div className=' text-white max-w-maxContent'>
          <Swiper
            slidesPerView={1}
            breakpoints={{
            500: {
                width: 500,
                slidesPerView: 2,
            },
            
            1000: {
                width: 1000,
                slidesPerView: 3,
              },
            1200: {
                width: 1200,
                slidesPerView: 4,
              },
            }}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            modules={[Pagination, FreeMode, Autoplay]}
            autoplay={{
              delay:1000
            }}
          >
            {
              reviews.map((data, index) => (
                <SwiperSlide key={index}>
                  <div className='flex flex-col gap-2 bg-richblack-700 p-3 rounded h-[250px] max-w-[370px]  '>
                    {/* *******Pic and Name*********** */}
                    <div className='flex gap-x-2 items-center h-[20%] mt-2 '>
                      <div className=' rounded-full w-16 border border-richblack-500'>
                      <img src={data?.user?.image ? data?.user?.image : `https//:api.dicebear.com/5.x/initials/svg?seed=${data?.user?.firstName} ${data?.user?.lastName}`}
                      alt='profile-pic' className='w-14 aspect-square object-cover rounded-full'
                      />
                      </div>
                      <div className='flex flex-col'>
                        <p className='text-start text-base text-richblack-25'>{data?.user?.firstName} {data?.user?.lastName}</p>
                        <p className='text-xs text-richblack-200'>{data?.user?.email}</p>
                      </div>
                    </div>

                    {/* **********Ratings********* */}
                    <div className='h-[60%] flex flex-col mt-4 gap-y-1 items-start px-2'>
                      <p className='text-richblack-50 text-start text-[16px]'>{data?.course?.courseName}</p>
                      <p className='text-start text-sm text-richblack-200'>
                        {
                          data?.review.split(" ").slice(0,truncateWords).join(" ")
                        }
                      </p>
                    </div>

                    {/* ************Stars************ */}
                    <div className='h-[20%] flex gap-x-2 items-center mx-2 justify-start pb-3'>
                      <span className='text-yellow-50 mt-[2px] '>{data?.rating}</span>
                      <ReactStars count={5} edit={false} 
                      activeColor={"#ffd700"} size={24} value={data.rating} 
                      emptyIcon={<FaStar/>}
                      fullIcon={<FaStar/>}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider