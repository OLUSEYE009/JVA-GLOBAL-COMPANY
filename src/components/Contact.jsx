import React from 'react'

const Contact = () => {

  return (
    <div className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden' id='contact'>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">Contact <span className="underline underline-offset-4 decoration-1 under font-light">Us</span></h1>
        <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">Get in touch with our team of well trained engineers and real estate guru's</p>

        <form method="post" action="https://app.proforms.top/f/pr75625e7" className='max-w-2xl mx-auto text-gray-600 pt-8'>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 text-left">Your Name:
                    <input type="text" placeholder='Your Name' name='name' required  className='w-full border rounded border-slate-900 py-3 px-4 mt-2'/>
                </div>
                <div className="w-full md:w-1/2 text-left md:pl-4">Email Address:
                    <input type="email" placeholder='Email Address:' name='email' required  className='w-full border rounded border-slate-900 py-3 px-4 mt-2'/>
                </div>
            </div>
            <div className="my-6 text-left">
                Message
                <textarea name="Message" className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none" placeholder='Message' required></textarea>
            </div>
            <button className=' bg-gray-700 text-white py-2 px-12 mb-10 rounded'>Send Message</button>
        </form>

    </div>
  )
}

export default Contact