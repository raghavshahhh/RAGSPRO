'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ReviewSubmissionBox from './ReviewSubmissionBox'

const testimonials = [
  {
    quote: "My business was struggling to get online presence, RAGSPRO's team really helped me establish digital presence and started generating leads consistently.",
    author: "Rajesh Kumar",
    role: "Founder of Digital Solutions (50K+ followers)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    quote: "While building my startup, I worked with RAGSPRO's team to build my web application. They delivered super fast, saved me thousands in development costs.",
    author: "Priya Sharma",
    role: "CEO of TechStart India",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    quote: "RAGSPRO has been an incredible long-term partner for us. When we were considering starting our mobile app, we ultimately chose RAGSPRO for their unbeatable turnaround times and competitive pricing.",
    author: "Amit Singh",
    role: "CEO of StartupHub",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    quote: "RAGSPRO's team has been a game-changer—helped me deliver 3+ UI/UX projects, sharpen my product management skills, and land amazing tech roles.",
    author: "Sneha Patel",
    role: "Product Manager at TechCorp",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    quote: "In just one week, RAGSPRO's team automated our business processes—eliminating manual work and dramatically boosting efficiency. Highly recommend for business automation!",
    author: "Vikram Mehta",
    role: "CEO of Business Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    quote: "RAGSPRO delivered an exceptional e-commerce platform for my business. Their attention to detail and quick turnaround time exceeded my expectations. Highly professional team!",
    author: "Ananya Gupta",
    role: "Founder of StyleHub",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5
  }
]



export default function TestimonialsSection() {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `
      }} />
    <section id="testimonials" className="pt-0 pb-4 md:py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 -mt-6 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="-mb-6 md:mb-12 ml-0 md:ml-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black">Hear from what the<br />founders have to say.</h2>
        </motion.div>

        {/* Mobile: Horizontal Slider */}
        <div className="md:hidden overflow-hidden mt-2">
          <div 
            className="flex gap-4"
            style={{
              animation: 'scroll 25s linear infinite',
              animationPlayState: 'running'
            }}
            onTouchStart={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onTouchEnd={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-xl shadow-lg min-w-[280px] max-w-[280px] flex-shrink-0"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-3 italic text-sm">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                  <div>
                    <h4 className="font-semibold text-black text-sm">{testimonial.author}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Normal Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 ml-0 md:ml-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                  width="48"
                  height="48"
                />
                <div>
                  <h4 className="font-semibold text-black">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Centered Write a Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <a
            href="#write-review"
            onClick={(e) => {
              e.preventDefault()
              // Scroll to bottom and trigger the floating review button
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
              setTimeout(() => {
                const reviewButton = document.querySelector('[aria-label="Write a review"]')
                if (reviewButton) reviewButton.click()
              }, 500)
            }}
            className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer inline-block"
          >
            Write a Review
          </a>
        </motion.div>
      </div>

      {/* Review Submission Box - Always rendered for floating button */}
      <ReviewSubmissionBox />
    </section>
    </>
  )
}
