import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

  const {total, totalItems} = useSelector((state) => state.cart);


  return (
    <div className='w-full'>
        <p className='text-richblack-200 mb-2 font-semibold'>Home / Dashboard / <span className='text-yellow-50'>Cart</span></p>
        <h1 className="mb-8 text-4xl font-semibold text-richblack-5">Cart</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400"> {totalItems} Courses in Cart </p>

        {
          total > 0 ? 
          (
            <div className="mt-8 w-full flex flex-col-reverse items-center xl:items-start xl:gap-x-10 gap-y-6 xl:flex-row">
              <RenderCartCourses />
              <RenderTotalAmount />
            </div>
          ) 
          : (<p lassName="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p>)
        }
    </div>
  )
}

export default Cart