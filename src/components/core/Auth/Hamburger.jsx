import React, { useRef } from 'react'
import useDropdown from '../../../hooks/useDropdown';
import Hamburger_Icon from 'hamburger-react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavbarLinks } from "../../../data/navbar-links";
import Spinner from '../../common/Spinner';
import CatalogSubLink from './CatalogSubLink';

const Hamburger = ({subLinks, matchRoute, loading}) => {

    const {isOpen, toggleDropDown, dropDownRef , setIsOpen} = useDropdown();
    const {token} = useSelector((state) => state.auth);
    

    return (
    <div ref={dropDownRef} onClick={toggleDropDown} className='cursor-pointer group md:hidden visible'>
        
        <Hamburger_Icon  rounded size={24} color="#DBDDEA" toggled={isOpen} toggle={toggleDropDown} />

        <div className={`bg-richblack-700 absolute flex flex-col gap-y-5 px-4 pb-6 z-[100] top-14 right-0 w-[200px] h-fit 
        shadow-[inset_-12px_-8px_40px_#46464620] shadow-richblack-800 transition-all duration-200 
        ${isOpen ? "translate-x-0" : "hidden" } ${!token && "pt-4"} `}>
            <div className='flex justify-between w-full mx-auto'>
                
                {token === null && (
                    <Link to="/login">
                    <button className="border border-richblack-700 bg-richblack-800 px-3 py-[8px] text-richblack-100 rounded-md">
                        Log In
                    </button>
                    </Link>
                )}

                {token === null && (
                    <Link to="/signup">
                    <button className="border border-richblack-700 bg-richblack-800 px-3 py-[8px] text-richblack-100 rounded-md">
                        Sign Up
                    </button>
                    </Link>
                )}           
            </div>
            {/* *************SubLinks************** */}
            <nav>
                <ul className=" w-full flex flex-col items-center gap-y-6 text-richblack-25">
                    {NavbarLinks.map((link, index) => (
                    <li key={index} className='w-full text-center'>
                        {link?.title === "Catalog" ? (
                        <CatalogSubLink  link={link} matchRoute={matchRoute} subLinks={subLinks} loading={loading} setIsOpen={setIsOpen} />
                        ) 
                        : (
                        <Link to={link?.path} className='hover:bg-richblack-900 w-full'>
                            <p
                            className={`${
                                matchRoute(link?.path)
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            } w-full `}
                            >
                            {link.title}
                            </p>
                        </Link>
                        )}
                    </li>
                    ))}
                </ul>
            </nav>     
        </div>
    </div>
  )
}

export default Hamburger