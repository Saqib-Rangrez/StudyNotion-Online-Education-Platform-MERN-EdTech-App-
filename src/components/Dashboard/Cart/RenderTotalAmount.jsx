import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { buyCourse } from '../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
  
  const {total, cart} = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id );
    buyCourse(token, courses, user, navigate, dispatch);
  }

  return (
    <div  className="lg:min-w-[280px]  w-full xl:w-[20%] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>

      <IconBtn
        text={"Buy Now"}
        onClick={handleBuyCourse}
        customClasses={"xl:w-full md:w-[60%] md:w-[80%] sm:w-[90%] w-full  mx-auto justify-center"}
      />
    </div>
  )
}

export default RenderTotalAmount