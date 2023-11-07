import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName, setIsOpen}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    
        <NavLink to={link.path}
        onClick={() => setIsOpen(false)}
        className={`relative h-fit`}
        >
          <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
          </span>

          <div className={`flex items-center px-8 py-2 gap-x-2 text-richblack-300 transition-all duration-200 font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-100" : "bg-opacity-0"}`}>
            <Icon className="text-lg"></Icon>
            <span className='text-sm'>{link.name}</span>
          </div>
        </NavLink>

  )
}

export default SidebarLink