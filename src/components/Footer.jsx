import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // Simulate subscription process
      setIsSubscribed(true)
      setEmail('')
      // Reset subscription status after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

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
                    <a href="#Header" className='hover:text-white transition-colors duration-300'>HOME</a>
                    <a href="#About"  className='hover:text-white transition-colors duration-300'>ABOUT</a>
                    <a href="#contact"  className='hover:text-white transition-colors duration-300'>CONTACT</a>
                    <a href="#"  className='hover:text-white transition-colors duration-300'>PRIVACY POLICY</a>
                    <a href="#"  className='hover:text-white transition-colors duration-300'>FAQ</a>
                </ul>
            </div>
            <div className="w-full md:w-1/3">
                <h3 className="text-white text-lg font-bold mb-4">Stay Ahead in Real Estate</h3>
                <p className="text-gray-400 mb-4 max-w-80">
                  Join our exclusive community and be the first to receive:
                </p>
                <ul className="text-gray-400 mb-4 text-sm space-y-1">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    Weekly market insights & trends
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    Exclusive property listings
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    Investment opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    Expert tips & guides
                  </li>
                </ul>
                
                {isSubscribed ? (
                  <div className="bg-green-500 text-white p-3 rounded-lg text-center transition-all duration-300">
                    🎉 Welcome aboard! Check your email for confirmation.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder='Enter your email address' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 flex-1' 
                      required
                    />
                    <button 
                      type='submit'
                      className='py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap'
                    >
                      Subscribe Now
                    </button>
                  </form>
                )}
                
                <p className="text-gray-500 text-xs mt-3">
                  No spam ever. Unsubscribe anytime with one click.
                </p>
            </div>
        </div>
        <div className="border-t border-gray-700 py-4 mt-10 text-center text-gray-500">
            Copyright 2025 © JVA Global(Website Powered By <a target="_blank" href='https://oluseye009.github.io/Oluseye.github.io' className='hover:text-white transition-colors duration-300'><abbr title='Click Me'>Oluseye</abbr></a>). All Right Reserved <br />
        </div>
    </div>
  )
}

export default Footer