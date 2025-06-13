// ContactUs.jsx
import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50">
      {/* Header Section */}
      <header className="relative py-16 bg-green-700 text-center">
        <div className="absolute top-4 left-4 w-16 h-16 bg-orange-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-8 right-8 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-green-100 max-w-2xl mx-auto text-lg">
            Have questions about our fresh juices or seasonal fruit bowls? We'd love to hear from you!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Send us a message</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition duration-300 shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:w-1/2">
            {/* Contact Info */}
            <div className="bg-orange-50 rounded-2xl p-6 md:p-8 mb-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Contact Information</h2>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">(+251) 909-1122-33</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">juiceplusaddis@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">Around Ras Hotel &amp; Beherawi Theater, Addis Ababa, Ethiopia<br />Near Friendship Business Center</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-orange-200">
                <h3 className="font-bold text-green-800 mb-3">Opening Hours</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex justify-between">
                    <span>Monday</span>
                    <span>7:00 AM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tuesday</span>
                    <span>7:00 AM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wednesday</span>
                    <span>7:00 AM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Thursday</span>
                    <span>7:00 AM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday</span>
                    <span>7:00 AM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>8:00 AM – 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>9:00 AM – 6:00 PM</span>
                  </li>
                </ul>
              </div>
              {/* Google Review Button */}
              <div className="mt-6 flex justify-center">
                <a
                  href="https://www.google.com/maps/place/Juice+plus/@9.0145523,38.7528771,17z/data=!4m7!3m6!1s0x164b857086e54947:0x24085036fb887d21!8m2!3d9.0145523!4d38.7550658!9m1!1b1?entry=ttu&review=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 font-semibold py-2 px-6 rounded-lg shadow hover:from-yellow-500 hover:to-orange-500 transition duration-300"
                >
                  Leave a Google Review
                </a>
              </div>
            </div>
            
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4086.2085779396316!2d38.75287711579468!3d9.01455229409557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857086e54947%3A0x24085036fb887d21!2sJuice%20plus!5e1!3m2!1sen!2set!4v1749424657159!5m2!1sen!2set"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80 border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      {/* Fruit Elements */}
      <div className="hidden md:block fixed -bottom-20 -right-20 w-60 h-60 bg-yellow-300 rounded-full opacity-20"></div>
      <div className="hidden md:block fixed top-1/3 -left-10 w-40 h-40 bg-orange-400 rounded-full opacity-20"></div>
    </div>
  );
};

export default ContactUs;