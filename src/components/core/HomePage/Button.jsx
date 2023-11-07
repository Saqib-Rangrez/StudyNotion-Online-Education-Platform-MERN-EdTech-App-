import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto} >
        <div className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblue-800 text-white"}
        hover:scale-95 hover:shadow-none transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]`}>
            {children}
        </div>
    </Link>
  )
}

export default Button