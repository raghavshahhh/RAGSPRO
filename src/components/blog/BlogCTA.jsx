/**
 * BlogCTA Component
 * 
 * Call-to-action component for blog posts
 * Converts readers into qualified leads
 */

import { motion } from 'framer-motion';

export default function BlogCTA({ position = 'after-intro', variant = 'default' }) {
  const handleCTAClick = () => {
    const event = new CustomEvent('openQuoteForm');
    window.dispatchEvent(event);
  };

  if (variant === 'minimal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="my-8 p-6 bg-gray-50 rounded-xl border-l-4 border-black"
      >
        <p className="text-lg font-semibold text-black mb-3">
          Building an MVP?
        </p>
        <p className="text-gray-600 mb-4">
          Get your 15-minute launch roadmap consultation
        </p>
        <button
          onClick={handleCTAClick}
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all text-sm"
        >
          Schedule Free Consultation
        </button>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="my-12 p-8 bg-gradient-to-br from-black to-gray-800 rounded-2xl text-white shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
          <div>
            <p className="font-bold text-lg">Ready to Launch Your MVP?</p>
            <p className="text-sm text-gray-300">Join 50+ successful founders</p>
          </div>
        </div>
        
        <p className="text-gray-200 mb-6">
          Get your custom MVP roadmap and start building in 20 days. No obligations, no sales pressure - just expert advice from founders who've been there.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCTAClick}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
          >
            Get Your MVP Roadmap
          </button>
          
          <a
            href="https://wa.me/918700048490?text=Hi, I'm interested in MVP development"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 p-8 bg-black text-white rounded-2xl shadow-xl"
    >
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold mb-3">
          Ready to Build Your MVP?
        </h3>
        <p className="text-gray-300 mb-6">
          Get your custom MVP roadmap and launch in 20 days. Schedule a free consultation with RAGSPRO - no obligations, just expert advice.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCTAClick}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
          >
            Schedule Free Consultation
          </button>
          
          <a
            href="tel:+918700048490"
            className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all"
          >
            Call: +91-8700048490
          </a>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          ✓ 50+ successful MVP launches  ✓ Transparent pricing ₹85K-₹3L  ✓ 20-day delivery
        </p>
      </div>
    </motion.div>
  );
}
