import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../services/operations/settingsApi';


const ChangeProfilePicture = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const refInput = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function handleChange (e) {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setPreviewSource(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
    }

    function handleUpload () {
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            // console.log(formData);
            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false);
            })
        }catch(error) {
            // console.log(error);
        }
        // setLoading(false);
    }

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
    }, [imageFile]);

  return (
    <div className='text-richblack-5 border border-richblack-700 flex flex-row items-center gap-x-2 sm:gap-4 bg-richblack-800 md:px-8 md:py-6 px-2 py-4 rounded-lg mt-4'>

        <img src={previewSource || user?.image} alt={user?.firstName} className='aspect-square object-cover w-[70px] md:w-[100px] rounded-full' />
        <div className='flex flex-col gap-2'>
            <p>Change Profile Picture</p>
            <div className='flex flex-row gap-3'>
            <input type='file' ref={refInput} accept='image/*' className='hidden' onChange={handleChange}>
            </input>
            <button onClick={() => {refInput.current.click()}} className='bg-richblack-700 text-richblack-100 font-semibold px-2 sm:px-5 py-2 rounded-md'>
                    Select
            </button>
            {
                loading ? 
                (<IconBtn text={"Uploading..."} customClasses={"px-3 sm:px-5"} />) 
                : 
                (<IconBtn 
                text={"Upload"} onClick={handleUpload} customClasses={"px-3 sm:px-5"}
            >
                <FiUpload />
            </IconBtn>)
            }
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture