/**
 * GeoLandingPage Component
 * 
 * Reusable template for geographic SEO landing pages
 * Includes: Hero, Content, Map, Testimonials, CTAs, Schema
 */

import { motion } from 'framer-motion';
import ServiceSchema from './schema/ServiceSchema';
import FAQSchema from './schema/FAQSchema';

export default function GeoLandingPage({ 
  location, 
  service, 
  content, 
  mapCoordinates,
  faqs,
  testimonials = []
}) {
  const whatsappLink = "https://wa.me/918700048490?text=Hi, I'm interested in " + service + " in " + location;
  
  return (
    <>
      {/* Schema Markup */}
      <ServiceSchema location={location} service={service} />
      {faqs && <FAQSchema faqs={faqs} />}
      
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {service} in {location}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl">
                {content.hero}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const event = new CustomEvent('openQuoteForm');
                    window.dispatchEvent(event);
                  }}
                  className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all"
                >
                  Get Your MVP Roadmap
                </button>
                
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
                  </svg>
                  WhatsApp Us
                </a>
                
                <a
                  href="tel:+918700048490"
                  className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-all"
                >
                  Call: +91-8700048490
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content.description }} />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        {content.benefits && content.benefits.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Why Choose RAGSPRO in {location}?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {content.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="text-4xl mb-4">{benefit.icon || '✓'}</div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Google Maps */}
        {mapCoordinates && (
          <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Find Us in {location}
              </h2>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${mapCoordinates.zoom || 14}!2d${mapCoordinates.lng}!3d${mapCoordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1234567890`}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                What {location} Founders Say
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 px-6 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Launch Your MVP in {location}?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Get your custom MVP roadmap and start building in 20 days
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  const event = new CustomEvent('openQuoteForm');
                  window.dispatchEvent(event);
                }}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Schedule Free Consultation
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
