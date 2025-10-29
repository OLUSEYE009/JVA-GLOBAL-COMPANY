import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden' id='Footer'>
        <div className="flex flex-col container mx-auto md:flex-row justify-between items-start">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
                <img src={assets.logos_dark} className='w-28 h-auto md:w-16 sm:w-14' alt="" />
                <h2 className='text-white text-lg font-bold mb-4'>Disclaimer</h2>
                <p className='text-gray-400 mt-4'>This website is a project carried out in collaboration with the real
                brand, with full support from the brand owners. All content currently displayed is based on placeholder and dummy data. Final content will be updated upon project's completion.</p>
            </div>
            <div className="w-full md:w-1/5 mb-8 md:mb-0">
                <h3 className="text-white text-lg font-bold mb-4">Company</h3>
                <ul className='flex flex-col gap-2 text-gray-400'>
                    <a href="#Header" className='hover:text-white'>HOME</a>
                    <a href="#About"  className='hover:text-white'>ABOUT</a>
                    <a href="#contact"  className='hover:text-white'>CONTACT</a>
                    <a href="#"  className='hover:text-white'>PRIVACY POLICY</a>
                    <a href="#"  className='hover:text-white'>FAQ</a>
                </ul>
            </div>
            <div className="">
                <h3 className="text-white text-lg font-bold mb-4">Subscribe to our newsletter</h3>
                <p className="text-gray-400 mb-4 max-w-80">The latest news in real estate,articles, and resources, sent to your inbox weekly</p>
                <div className="flex gap-4">
                    <input type="email" placeholder='Your email address' className='p-2 rounded bg-gray-800 text-gray-400 border-gray-700 focus:outline-none w-full md:w-auto' />
                    <button className='py-2 px-4 rounded bg-blue-500 text-white'>Subscribe</button>
                </div>
            </div>
        </div>
        <div className="border-t border-gray-700 py-4 mt-10 text-center text-gray-500">
            Copyright 2025 © JVA Global(Website Powered By <a href='#' className='hover:text-white'><abbr title='Click Me'>Oluseye</abbr></a>). All Right Reserved <br />
            <a href="tel:+2348064181968" className='text-white hover:text-gray-400 px-4'>Call Me</a>
            <a href="mailto:jamesvictor495@gmail.com" className='text-white hover:text-gray-400'>Mail Me</a>
        </div>
    </div>
  )
}

export default Footer