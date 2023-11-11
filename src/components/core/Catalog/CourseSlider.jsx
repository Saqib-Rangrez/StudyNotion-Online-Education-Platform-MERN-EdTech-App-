import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation} from "swiper/modules"

import "swiper/css/free-mode"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';
import { Scrollbar } from 'swiper/modules';
import Course_Card from './Course_Card';

const CourseSlider = ({Courses}) => {
    // console.log(Courses);
  return (
    <>
        {
            Courses.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                    type: 'progressbar',
                    }}
                    navigation={true} 
                    modules={[Pagination,Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        650 : {
                            width : 650,
                            slidesPerView : 2
                        },
                        1024 :  {
                            width : 1024,
                            slidesPerView:3
                        } 
                    }}
                >
                    {
                        Courses?.map((course, index) => (
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) 
            : (
                <p>No Course Found</p>
            )
        }
    </>
  )
}

export default CourseSlider