import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Spinner from "./Spinner";
import Hamburger from "../core/Auth/Hamburger";


const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(res?.data?.data);
    } catch (error) {
      // console.log("Could not fetch Categories.", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center bg-richblack-800 border-b-[1px] border-b-richblack-700 ">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="Logo" loading="lazy" width={160} height={42} />
        </Link>
        
        

        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link?.title === "Catalog" ? (
                  <div className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}>
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div className="invisible min-w-[250px] absolute left-[50%] top-[50%] translate-x-[-51%] translate-y-[6%] flex flex-col gap-1 justify-center rounded-md bg-white p-2 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[250px] z-10 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_4px] shadow-blue-200">
                      <div className="absolute left-[49%] translate-x-[50%] top-0 translate-y-[-30%] h-10 w-8 rotate-45 rounded-sm bg-white -z-10"></div>
                      {
                        loading ? (
                        <div className="min-h-[370px] grid place-items-center"><Spinner /></div>
                       ) : subLinks && subLinks.length ? (
                        <>
                        {/* ?.filter((subLink) => subLink?.courses?.length > 0) */}
                          {subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-3 pl-3 hover:bg-richblack-50"
                                key={i}
                              >
                                <p className="ring-richblack-900">{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                        ) : (
                          <p className="text-center font-semibold min-h-[370px] grid place-items-center">No Courses Found<br/>Please reload</p>
                        )
                      }
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className="flex gap-x-3 items-center">
          {token && user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart fill="#AFB2BF" fontSize={26} />
              {totalItems > 0 && (
                <span
                  className="absolute bg-richblack-500  text-center text-xs text-yellow-5 w-5 h-5 flex 
                        justify-center items-center animate-bounce rounded-full top-[-15%] right-[-10%] "
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="hidden md:block border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="hidden md:block border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
          <Hamburger loading={loading} subLinks={subLinks} matchRoute={matchRoute} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
