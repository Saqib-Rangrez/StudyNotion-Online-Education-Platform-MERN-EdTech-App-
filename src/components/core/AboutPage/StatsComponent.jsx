import React from 'react'

const stats = [
    {
        count : "5k",
        label : "Active Students"
    },
    {
        count : "10+",
        label : "Mentors"
    },
    {
        count : "200+",
        label : "Courses"
    },
    {
        count : "50+",
        label : "Awards"
    }
];

const StatsComponent = () => {
  return (
    <section className='w-full bg-richblack-700'>
        <div className='mx-auto lg:max-w-[70%] w-11/12 py-6 md:py-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 place-items-center'>
                {
                    stats.map((stat, index) => (
                        <div key={index} className='text-center p-4'>
                            <h1 className='text-richblack-5 text-2xl md:text-3xl font-bold'>{stat.count}</h1>
                            <h2 className='text-richblack-400 sm:text-sm'>{stat.label}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent