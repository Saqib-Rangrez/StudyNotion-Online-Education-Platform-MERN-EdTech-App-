import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course, Height}) => {
    
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);
    
  return (
    <div className=''>
        <Link to={`/courses/${course._id}`}>
            <div className='flex flex-col gap-y-4 py-4'>
                <img 
                    src={course?.thumbnail}
                    alt='Course Thumbnail'
                    loading='lazy'
                    className={` sm:max-h-[300px] sm:min-h-[300px] sm:h-[300px] h-[200px] min-h-[200px] max-h-[200px] w-full rounded-lg object-cover`}
                />
                <div className='flex flex-col gap-y-2'>
                    <p className=' text-richblack-25 text-left'>{course?.courseName}</p>
                    <p className='text-sm text-richblack-500 text-left'>{course?.instructor?.firstName} {course?.instructor.lastName}</p>
                    <div className='flex flex-col sm:flex-row gap-y-1 gap-x-1 sm:items-center'>
                        <div className='flex flex-row gap-x-1 items-center'>
                            <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                        </div>
                        <span className='text-richblack-500 text-sm'>{`${course?.ratingAndReviews.length} Ratings`} </span>
                    </div>
                    <p className='text-richblack-25 text-left'>₹ {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card