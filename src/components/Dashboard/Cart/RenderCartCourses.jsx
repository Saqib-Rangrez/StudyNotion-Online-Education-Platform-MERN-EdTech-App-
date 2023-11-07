import React from 'react'
import { useSelector } from 'react-redux'
import CartCourseCard from './CartCourseCard';

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);

  return (
    <div className="w-full  xl:flex-1 flex-col grid grid-rows-1 cart md:grid-rows-1 ">
        {
            cart.map((course,index) => (
                <CartCourseCard course={course} key={index} index={index}/>
            ))
        }
    </div>
  )
}

export default RenderCartCourses