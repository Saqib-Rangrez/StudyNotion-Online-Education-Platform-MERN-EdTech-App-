import React from 'react'
import HighLightText from '../HomePage/HighLightText';
import CTAButton from ".././HomePage/Button";
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className='mt-6 grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>

    {
      LearningGridArray.map((card, index) => (
        <div key={index} className={`${index === 0 && "lg:col-span-2 bg-transparent"} lg:h-[300px]
        ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"} 
        ${card.order === 3 && "lg:col-start-2"}`}>
        {
          card.order < 0 ? (
            <div className='lg:w-[90%] flex flex-col py-4 gap-3'>
              <div className='text-4xl font-semibold'>
                {card.heading}
                <HighLightText text={card.highlightText} />
              </div>
              <p className='font-medium'>{card.description}</p>
              <div className='w-fit'>
              <CTAButton active={true} link={card.BtnLink}>
                Learn More
              </CTAButton>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-3 px-10 py-8'>
              <h1 className='text-richblack-5 text-lg'>{card.heading}</h1>
              <p className='text-richblack-200'>{card.description}</p>
            </div>
          )
        }
        </div>
      ))
    }
        
    </div>
  )
}

export default LearningGrid