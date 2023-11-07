import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProfile } from "../../../services/operations/settingsApi"
import ConfirmationModal from "../../common/ConfirmationModal"
import { useState } from "react"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-lg border-[1px] border-pink-700 bg-pink-900 py-6 px-4 md:py-8 md:px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-full md:w-4/5 lg:w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button 
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={() => setConfirmationModal({
                    text1 : "Are You Sure?",
                    text2 : "You will have no longer access to your account.",
                    btn1Text : "Delete Account",
                    btn2Text : "Cancel",
                    btn1Handler : () => dispatch(deleteProfile(token, navigate)),
                    btn2Handler : () => setConfirmationModal(null) })}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
      {
        confirmationModal ? <ConfirmationModal modalData={confirmationModal} /> : null
      }
    </>
  )
}