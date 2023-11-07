import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import UpdateProfileInfo from './UpdateProfileInfo'
import ChnagePassword from './ChnagePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='flex flex-col gap-8'>
        <h1 className='text-3xl font-semibold text-richblack-5'>Edit Profile</h1>
        {/* Profile picture */}
        <ChangeProfilePicture />

        {/* Profile Information */}
        <UpdateProfileInfo />

        {/* Change Password */}
        <ChnagePassword />

        {/* Delete Account */}
        <DeleteAccount />
    </div>
  )
}

export default Settings