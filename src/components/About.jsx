import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2'>About <span className='underline underline-offset-4 decoration-1 under font-light'>JVA</span></h1>
        <p className='text-gray-500 max-w-80 text-center mb-8'>Passionate About properties, Dedicated to your vision. Rebuilding Homes| Finding Properties</p>
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
            <img src={assets.brand_img} className="w-full sm:w-1/2 max-w-lg" />
            <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
                <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
                    <div className="">
                        <p className="text-4xl font-medium text-gray-800">10+</p>
                        <p>Years of Diligent in our Work</p>
                    </div>
                    <div>
                        <p className="text-4xl font-medium text-gray-800">15+</p>
                        <p>Projects completed</p>
                    </div>
                    <div>
                        <p className="text-4xl font-medium text-gray-800">20+</p>
                        <p>Mn. sq. Ft. Deliveredk</p>
                    </div>
                    <div>
                        <p className="text-4xl font-medium text-gray-800">25+</p>
                        <p>Ongoing Projects</p>
                    </div>
                </div>
                <p className="my-10 max-w-lg">Jva Global is a forward-thinking construction company commited to delivering quality, durability and innovation across every project. From residential buildings to large scale infrastructure, we bring experience, precision and professionalism to every detail. Our team is passionate about creating spaces that stand the test of time</p>
                <button className='bg-blue-600 text-white px-8 py-2 rounded'>Learn More</button>
            </div>
        </div>
    </div>
  )
}

export default About