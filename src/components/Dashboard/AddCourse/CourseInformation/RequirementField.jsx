import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name,label,register,errors,setValue,getValues,placeholder,}) => {
  
  const [requirement,setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const {editCourse, course} = useSelector((state) => state.course);

  const handleAddRequirement = () => {
    if(requirement){
        setRequirementList([...requirementList, requirement]);
        setRequirement(""); 
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index,1);
    setRequirementList(updatedRequirementList);
  }

  useEffect(()=> {
    if(editCourse){
        setRequirementList(course?.instructions);
    }
    register(name, {
        required : true,
        validate : (value) => value.length > 0
    })
  },[]);

  useEffect(()=> {
    setValue(name, requirementList);
  }, [requirementList]);

  return (
    <div>
        <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">{label}<sup className='text-pink-200'>*</sup></p>
            <input type='text' name={name} placeholder=     {placeholder}
                value={requirement} onChange={(e) => setRequirement(e.target.value)} style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-transparent focus:border-transparent outline-none rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
            <button type='button' onClick={handleAddRequirement} className=' py-1 mt-1 mr-2 font-semibold text-yellow-50 text-lg'>
                Add
            </button>
            
        </label>

        {
            requirementList.length > 0 && (
                <ul className='mt-2'>
                    {
                        requirementList.map((requirement,index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <span className=' text-richblack-5'>{requirement}</span>
                                <button type='button' onClick={() => handleRemoveRequirement(index)} className=' text-richblack-400 text-xs underline' >
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className="-mt-1 text-[12px] text-yellow-100">{label} are required</span>
            )
        }
    </div>
  )
}

export default RequirementField