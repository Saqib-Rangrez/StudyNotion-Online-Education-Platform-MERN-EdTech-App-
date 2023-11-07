import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col items-center gap-4'>
        <h1 className='text-richblack-5 text-4xl font-bold'>Get in Touch</h1>
        <p className='text-richblack-200'>We'd love to here for you, Please fill out this form.</p>
        <div className='mt-5'>
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection