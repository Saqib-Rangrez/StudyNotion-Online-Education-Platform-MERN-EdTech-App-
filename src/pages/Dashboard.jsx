import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import {Outlet} from "react-router-dom"
import SideBar from '../components/Dashboard/SideBar';
import DashboardSideBar from '../components/core/Auth/DashboardSideBar';

const Dashboard = () => {

    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner />
            </div>
        )
    }
    
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] '>
        <SideBar mobile={false}/>
        <DashboardSideBar />
        <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10 '>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard


