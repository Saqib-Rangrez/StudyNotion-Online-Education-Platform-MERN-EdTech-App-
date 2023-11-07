import React from 'react'
import useDropdown from '../../../hooks/useDropdown';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';
import { IoIosArrowDropdownCircle } from "react-icons/io";

const CatalogSubLink = ({subLinks, loading, matchRoute, link, setIsOpen}) => {

    const {isOpen, toggleDropDown, dropDownRef } = useDropdown();

  return (
    <div ref={dropDownRef} onClick={(e) => { e.stopPropagation(); toggleDropDown()}}>
        <div  className={`group relative flex cursor-pointer justify-center items-center gap-1 ${
                                matchRoute("/catalog/:catalogName")
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}>
                            <IoIosArrowDropdownCircle />
                            <p className='text-center'>{link?.title}</p>
                            

                            <div className={`${isOpen ? "visible opacity-100 " :"invisible"} min-w-[250px] absolute left-[50%] top-[50%] translate-x-[-75%] translate-y-[6%] flex flex-col gap-1 
                                            justify-center items-center rounded-md bg-white p-2 text-richblack-900 opacity-0 transition-all duration-200 
                                            lg:w-[250px] z-10 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_4px] shadow-blue-200`}>
                            <div className="absolute left-[49%] translate-x-[50%] top-0 translate-y-[-30%] h-10 w-8 rotate-45 rounded-sm bg-white -z-10"></div>
                            {
                                loading ? (
                                <div className="min-h-[370px] grid place-items-center "><Spinner /></div>
                            ) : subLinks && subLinks.length ? (
                                <>
                                {/* ?.filter((subLink) => subLink?.courses?.length > 0) */}
                                {subLinks?.map((subLink, i) => (
                                    <div key={i} onClick={() => setIsOpen(false)} className="w-full rounded-lg bg-transparent py-3 md:pl-3 hover:bg-richblack-50">
                                        <Link
                                            to={`/catalog/${subLink.name
                                            .split(" ")
                                            .join("-")
                                            .toLowerCase()}`}
                                            className='w-full'
                                        >
                                            <p className="ring-richblack-900 items-center">{subLink.name}</p>
                                        </Link>
                                    </div>
                                    ))}
                                </>
                                ) : (
                                <p className="text-center font-semibold min-h-[370px] grid place-items-center">No Courses Found<br/>Please reload</p>
                                )
                            }
                            </div>
        </div>
    </div>
  )
}

export default CatalogSubLink