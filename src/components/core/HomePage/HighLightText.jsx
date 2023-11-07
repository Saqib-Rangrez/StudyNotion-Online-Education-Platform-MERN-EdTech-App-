import React from 'react'

const HighLightText = (props) => {
  return (
    
    <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold'>
        {" "} {props.text}
    </span>
  )
}

export default HighLightText;