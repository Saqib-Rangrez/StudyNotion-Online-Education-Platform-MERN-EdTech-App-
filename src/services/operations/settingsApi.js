import toast from "react-hot-toast"
import {settingsEndpoints} from "../apis"
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

export const updateDisplayPicture = (token,formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try{
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              });
            // console.log(response);
            if(!response?.data?.success){
                throw new Error(response?.data?.message)
            }
            dispatch(setUser(response?.data?.user));
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            toast.dismiss(toastId);
            toast.success("Display Picture Uploaded Successfully")
        }catch(error) {
            // console.log(error);
            toast.dismiss(toastId);
            toast.error(error.message);
        }
    }
}

export function updateProfile (token, formData) {
    return async (dispatch) =>  {
        const toastId = toast.loading("Updating profile...")
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`
            });
            if(!response?.data?.success) {
                throw new Error("Something went wrong");
            }
            // console.log(response)
            dispatch(setUser(response?.data?.user));
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            toast.dismiss(toastId);
            toast.success("Profile Updated Successfully")
        }catch(error){
            toast.dismiss(toastId);
            toast.error("Something went wrong")
            // console.log(error.message);
        }
    }
}

export function changePassword (token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Changing Password...");
        try{
            const response = await apiConnector("PUT", CHANGE_PASSWORD_API, formData, {
                Authorization : `Bearer ${token}`
            });
            if(!response?.data?.success) {
                // console.log(response);
                throw new Error("Something went wrong");
            }
            toast.dismiss(toastId);
            toast.success("Password Updated Successfully")
        }catch(error){
            // console.log(error);
            toast.dismiss(toastId);
            toast.error("Something went wrong")
        }
    }
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        // console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        // console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }