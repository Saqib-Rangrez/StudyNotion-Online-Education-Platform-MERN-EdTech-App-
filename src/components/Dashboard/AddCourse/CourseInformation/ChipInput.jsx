import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {MdClose} from "react-icons/md"
import { useSelector } from 'react-redux';

const ChipInput = ({
    name, label, placeholder, register, setValue, errors, getValues
}) => {

    const {course, editCourse} = useSelector((state) => state.course);
    const [tagList, setTagList] = useState([]);

    const handleAddTag = (event) => {

    if (event.key === "Enter" || event.key === ",") {
        event.preventDefault()
        const tag = event.target.value.trim()
        if (tag && !tagList.includes(tag)) {
          const newChips = [...tagList, tag]
          setTagList(newChips)
          event.target.value = ""
        }
      }
    }

    const handleRemoveTag = (index) => {
        const updatedTagList = [...tagList];
        updatedTagList.splice(index, 1);
        setTagList(updatedTagList);
    }

    useEffect(()=> {
        if(editCourse) {
            setTagList(course?.tags);
        }
        register(name, 
            {
                required : true, 
                validate : (value) => value.length > 0
            })
    }, []);

    useEffect(() => {
        setValue(name, tagList);
    }, [tagList]);

  return (
    <div>
        {
            tagList.length > 0 && (
                <div className='flex gap-1 flex-wrap -ml-2'>
                    {
                        tagList.map((tag, index) => (
                        <p key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                            <span>{tag}</span>
                            <button
                                type="button"
                                className="ml-2 focus:outline-none"
                                onClick={() => handleRemoveTag(index)}
                            >
                                <MdClose className="text-sm" />
                            </button>
                        </p>
                        ))
                    }
                </div>
            )
        }

        <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">{label}<sup className='text-pink-200'>*</sup></p>
            <input type='text' name={name} placeholder={placeholder}  onKeyDown={handleAddTag} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-yellow-25">{label} is required</span>
                )
            }
        </label>
    </div>
  )
}

export default ChipInput