import React, { useState } from 'react'
import {sidebarLinks} from "../../data/dashboard-links"
import {logout} from "../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../common/Spinner'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../common/ConfirmationModal'

const SideBar = ({mobile, isOpen,setIsOpen=null}) => {
    const {user, loading:profileLoading} = useSelector((state) => state.profile);
    const {loading : authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <Spinner/>
            </div>
        )
    }

  return (
    <>
        <div className={` ${mobile && isOpen ? "flex md:hidden absolute left-0 top-0 transition-all duration-400 z-[150] translate-x-0 " : mobile && !isOpen ? "flex md:hidden absolute left-0 top-0 transition-all duration-400 z-[150] -translate-x-96" 
        : "hidden md:flex"} 
            h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10`}>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} setIsOpen={setIsOpen} />
                        )
                    })
                }
            </div>

            <div className='mx-auto mt-6 h-[1px] w-10/12 bg-richblack-600'></div>
            
            <div className='flex flex-col mt-6'>
                <SidebarLink 
                    link={{name:"Settings", path:"/dashboard/settings"}}
                    iconName={"VscSettingsGear"} setIsOpen={setIsOpen}
                />

                <button onClick={() => {
                    setConfirmationModal({
                    text1 : "Are You Sure?",
                    text2 : "You will be logged out of your account.",
                    btn1Text : "Logout",
                    btn2Text : "Cancel",
                    btn1Handler : () => dispatch(logout(navigate)),
                    btn2Handler : () => setConfirmationModal(null)
                });
                }}
                className='text-sm font-medium z-[200] text-richblack-300 flex items-center px-8 py-2 gap-x-2'
                >
                    <div className='flex flex-row items-center gap-x-2'>
                        <VscSignOut className='text-lg' />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {
            confirmationModal ? <ConfirmationModal modalData={confirmationModal} /> : null
        }
    </>
  )
}

export default SideBar