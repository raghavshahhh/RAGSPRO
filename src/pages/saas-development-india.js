import SEOHead from '../components/SEOHead';
import GeoLandingPage from '../components/GeoLandingPage';

export default function SaaSDevelopmentIndia() {
  const content = {
    hero: "Build your SaaS product in India with RAGSPRO. Launch revenue-ready SaaS MVPs in 20 days. Subscription billing, user management, and growth analytics included.",
    
    description: `
      <h2>SaaS Development Agency in India - Launch Your SaaS in 20 Days</h2>
      
      <p>RAGSPRO is India's premier <strong>SaaS development agency</strong>, specializing in helping founders build and launch subscription-based products. We've helped 50+ Indian startups build SaaS MVPs that generate recurring revenue.</p>
      
      <h3>Complete SaaS Development Services</h3>
      
      <p>We build full-featured SaaS products with everything you need:</p>
      
      <ul>
        <li><strong>User Authentication:</strong> Secure login with email, Google, and social auth</li>
        <li><strong>Subscription Billing:</strong> Razorpay, Stripe integration with recurring payments</li>
        <li><strong>User Dashboard:</strong> Intuitive admin and user dashboards</li>
        <li><strong>Multi-tenancy:</strong> Support multiple organizations/workspaces</li>
        <li><strong>API Development:</strong> RESTful APIs for integrations</li>
        <li><strong>Analytics:</strong> Track user behavior and revenue metrics</li>
        <li><strong>Email Automation:</strong> Onboarding, notifications, and marketing emails</li>
      </ul>
      
      <h3>SaaS Tech Stack We Use</h3>
      
      <p>We use proven technologies for scalable SaaS products:</p>
      
      <ul>
        <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS for modern UI</li>
        <li><strong>Backend:</strong> Node.js, Python, PostgreSQL for reliability</li>
        <li><strong>Payments:</strong> Razorpay, Stripe for Indian and global payments</li>
        <li><strong>Auth:</strong> NextAuth, Firebase Auth for secure authentication</li>
        <li><strong>Hosting:</strong> Vercel, AWS for 99.9% uptime</li>
        <li><strong>Analytics:</strong> Mixpanel, PostHog for user insights</li>
      </ul>
      
      <h3>SaaS Development Pricing in India</h3>
      
      <p>Our SaaS development packages range from <strong>₹1,50,000 to ₹3,00,000</strong> depending on features and complexity. This includes:</p>
      
      <ul>
        <li>✓ Complete SaaS MVP development</li>
        <li>✓ Subscription billing integration</li>
        <li>✓ User authentication & management</li>
        <li>✓ Admin dashboard</li>
        <li>✓ Email automation setup</li>
        <li>✓ Analytics integration</li>
        <li>✓ 30 days post-launch support</li>
      </ul>
      
      <h3>SaaS Success Stories</h3>
      
      <p>We've helped Indian SaaS startups achieve:</p>
      
      <ul>
        <li>Glow: $12k/month recurring revenue, 4.2% conversion</li>
        <li>LawAI: 300+ paying subscribers in 30 days</li>
        <li>HimShakti: 120+ hours saved through automation</li>
      </ul>
      
      <h3>Why Choose RAGSPRO for SaaS Development?</h3>
      
      <ul>
        <li>🚀 <strong>20-Day Launch:</strong> Get your SaaS to market fast</li>
        <li>💰 <strong>Revenue-Focused:</strong> Built for subscription revenue</li>
        <li>🔒 <strong>Secure:</strong> Enterprise-grade security from day one</li>
        <li>📊 <strong>Analytics:</strong> Track MRR, churn, and user metrics</li>
        <li>🇮🇳 <strong>India Payments:</strong> Razorpay integration for Indian users</li>
        <li>⚡ <strong>Scalable:</strong> Built to handle growth</li>
      </ul>
      
      <h3>SaaS Features We Build</h3>
      
      <p>Common SaaS features we implement:</p>
      
      <ul>
        <li>User onboarding flows</li>
        <li>Freemium and trial periods</li>
        <li>Usage-based billing</li>
        <li>Team collaboration features</li>
        <li>Role-based access control</li>
        <li>API rate limiting</li>
        <li>Webhook integrations</li>
        <li>Export/import functionality</li>
      </ul>
      
      <h3>Get Started with Your SaaS</h3>
      
      <p>Ready to build your SaaS product? Schedule a free consultation with RAGSPRO. We'll review your SaaS idea, discuss monetization strategy, and create a custom development roadmap.</p>
      
      <p><strong>Contact:</strong> +918826073013 | ragsproai@gmail.com</p>
    `,
    
    benefits: [
      {
        icon: '💳',
        title: 'Subscription Billing',
        description: 'Razorpay & Stripe integration with recurring payments.'
      },
      {
        icon: '📊',
        title: 'Revenue Analytics',
        description: 'Track MRR, churn, LTV, and other SaaS metrics.'
      },
      {
        icon: '🔒',
        title: 'Enterprise Security',
        description: 'Secure authentication and data encryption.'
      }
    ]
  };

  const mapCoordinates = { lat: 20.5937, lng: 78.9629, zoom: 5 };

  const faqs = [
    {
      question: "How much does SaaS development cost in India?",
      answer: "SaaS development with RAGSPRO costs between ₹1,50,000 to ₹3,00,000 depending on features. This includes subscription billing, user management, and analytics."
    },
    {
      question: "Do you integrate Razorpay for Indian payments?",
      answer: "Yes! We integrate Razorpay for Indian payments and Stripe for international payments. We handle subscription billing, invoicing, and payment webhooks."
    },
    {
      question: "Can you build a freemium SaaS model?",
      answer: "Absolutely! We can implement freemium models, trial periods, usage-based billing, and tiered pricing for your SaaS product."
    }
  ];

  return (
    <>
      <SEOHead
        title="SaaS Development Agency in India | RAGSPRO | Launch in 20 Days"
        description="Build your SaaS product in India. Subscription billing, user management, analytics. Launch in 20 days. Pricing ₹1.5L-₹3L. Razorpay & Stripe integration."
        keywords="SaaS development India, SaaS agency India, subscription app India, SaaS builder India, recurring revenue app India"
        url="https://ragspro.com/saas-development-india"
      />
      
      <GeoLandingPage
        location="India"
        service="SaaS Development"
        content={content}
        mapCoordinates={mapCoordinates}
        faqs={faqs}
      />
    </>
  );
}
