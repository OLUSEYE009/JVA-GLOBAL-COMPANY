import React, { useState } from 'react'

const Contact = () => {
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    Message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)

    // Simulate form submission process
    try {
      // Here you would typically send the data to your form endpoint
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      // Show success message
      setShowSuccess(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        Message: ''
      })
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden' id='contact'>
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">Contact <span className="underline underline-offset-4 decoration-1 under font-light">Us</span></h1>
      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">Get in touch with our team of well trained engineers and real estate guru's</p>

      {/* Contact Links */}
      <div className="flex justify-center items-center gap-6 mb-8">
        <a href="tel:+2348064181968" className='text-white hover:text-gray-400 px-4 bg-gray-700 py-2 rounded-lg transition-colors duration-300'>Call Me</a>
        <a href="mailto:jamesvictor495@gmail.com" className='text-white hover:text-gray-400 bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300'>Mail Me</a>
      </div>

      <form onSubmit={handleSubmit} method="post" action="https://app.proforms.top/f/pr75625e7" className='max-w-2xl mx-auto text-gray-600 pt-8'>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">Your Name:
            <input 
              type="text" 
              placeholder='Your Name' 
              name='name' 
              value={formData.name}
              onChange={handleInputChange}
              required  
              className='w-full border rounded border-slate-900 py-3 px-4 mt-2'
            />
          </div>
          <div className="w-full md:w-1/2 text-left md:pl-4">Email Address:
            <input 
              type="email" 
              placeholder='Email Address:' 
              name='email' 
              value={formData.email}
              onChange={handleInputChange}
              required  
              className='w-full border rounded border-slate-900 py-3 px-4 mt-2'
            />
          </div>
        </div>
        <div className="my-6 text-left">
          Message
          <textarea 
            name="Message" 
            value={formData.Message}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none" 
            placeholder='Message' 
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          disabled={isSending}
          className='bg-gray-700 text-white py-2 px-12 mb-10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300'
        >
          {isSending ? (
            <span className="flex items-center justify-center">
              Sending
              <span className="ml-1 animate-pulse">...</span>
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for reaching out! We've received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact