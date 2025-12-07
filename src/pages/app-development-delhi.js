import SEOHead from '../components/SEOHead';
import GeoLandingPage from '../components/GeoLandingPage';

export default function AppDevelopmentDelhi() {
  const content = {
    hero: "Professional app development in Delhi. Build web and mobile apps in 20 days with RAGSPRO. iOS, Android, and Progressive Web Apps for Delhi startups.",
    
    description: `
      <h2>App Development Agency in Delhi - Web & Mobile Apps</h2>
      
      <p>RAGSPRO is Delhi's leading <strong>app development agency</strong> for startups. We build web apps, mobile apps (iOS & Android), and Progressive Web Apps that help Delhi founders launch and scale their businesses.</p>
      
      <h3>App Development Services in Delhi</h3>
      
      <p>We offer comprehensive app development services:</p>
      
      <ul>
        <li><strong>Web Application Development:</strong> Scalable web apps with Next.js, React</li>
        <li><strong>Mobile App Development:</strong> Native iOS and Android apps</li>
        <li><strong>Progressive Web Apps:</strong> App-like experience on web</li>
        <li><strong>Cross-Platform Apps:</strong> React Native for iOS & Android</li>
        <li><strong>API Development:</strong> RESTful APIs for app backends</li>
        <li><strong>App Maintenance:</strong> Ongoing support and updates</li>
      </ul>
      
      <h3>Technologies We Use</h3>
      
      <p>We use modern technologies for app development:</p>
      
      <ul>
        <li><strong>Web Apps:</strong> Next.js, React, Vue.js, Tailwind CSS</li>
        <li><strong>Mobile Apps:</strong> React Native, Swift (iOS), Kotlin (Android)</li>
        <li><strong>Backend:</strong> Node.js, Python, PostgreSQL, MongoDB</li>
        <li><strong>Cloud:</strong> AWS, Google Cloud, Vercel, Netlify</li>
        <li><strong>Real-time:</strong> WebSockets, Firebase for live features</li>
      </ul>
      
      <h3>App Development Pricing in Delhi</h3>
      
      <p>Our app development pricing in Delhi:</p>
      
      <ul>
        <li><strong>Web Apps:</strong> ₹85,000 - ₹2,00,000</li>
        <li><strong>Mobile Apps:</strong> ₹1,50,000 - ₹3,00,000</li>
        <li><strong>Cross-Platform:</strong> ₹1,20,000 - ₹2,50,000</li>
        <li><strong>PWAs:</strong> ₹75,000 - ₹1,50,000</li>
      </ul>
      
      <h3>Why Delhi Startups Choose RAGSPRO</h3>
      
      <ul>
        <li>🚀 <strong>Fast Development:</strong> Launch apps in 20 days</li>
        <li>📱 <strong>Multi-Platform:</strong> Web, iOS, Android support</li>
        <li>💰 <strong>Transparent Pricing:</strong> No hidden costs</li>
        <li>🎨 <strong>Modern Design:</strong> Beautiful, intuitive interfaces</li>
        <li>⚡ <strong>Performance:</strong> Fast, responsive apps</li>
        <li>🔒 <strong>Secure:</strong> Enterprise-grade security</li>
      </ul>
      
      <h3>App Development Process</h3>
      
      <p>Our proven 20-day process:</p>
      
      <ul>
        <li><strong>Days 1-3:</strong> Discovery, planning, and wireframes</li>
        <li><strong>Days 4-7:</strong> UI/UX design and prototyping</li>
        <li><strong>Days 8-16:</strong> Development and feature implementation</li>
        <li><strong>Days 17-18:</strong> Testing and quality assurance</li>
        <li><strong>Days 19-20:</strong> Deployment and launch</li>
      </ul>
      
      <h3>Industries We Serve</h3>
      
      <p>We've built apps for Delhi startups in:</p>
      
      <ul>
        <li>E-commerce & Retail</li>
        <li>HealthTech & Fitness</li>
        <li>EdTech & E-learning</li>
        <li>FinTech & Payments</li>
        <li>Food & Delivery</li>
        <li>Social & Community</li>
        <li>B2B & Enterprise</li>
      </ul>
      
      <h3>Get Started Today</h3>
      
      <p>Ready to build your app in Delhi? Schedule a free consultation with RAGSPRO. We'll discuss your app idea, recommend the best technology stack, and create a custom development roadmap.</p>
      
      <p><strong>Contact:</strong> +918700048490 | ragsproai@gmail.com</p>
    `,
    
    benefits: [
      {
        icon: '📱',
        title: 'Multi-Platform',
        description: 'Web, iOS, and Android apps from one agency.'
      },
      {
        icon: '⚡',
        title: 'Fast Performance',
        description: 'Optimized apps that load in under 2 seconds.'
      },
      {
        icon: '🎨',
        title: 'Modern Design',
        description: 'Beautiful interfaces that users love.'
      }
    ]
  };

  const mapCoordinates = { lat: 28.7041, lng: 77.1025, zoom: 12 };

  const faqs = [
    {
      question: "How much does app development cost in Delhi?",
      answer: "App development in Delhi with RAGSPRO costs ₹85K-₹3L depending on platform and features. Web apps start at ₹85K, mobile apps at ₹1.5L."
    },
    {
      question: "Do you build both iOS and Android apps?",
      answer: "Yes! We build native iOS and Android apps, as well as cross-platform apps using React Native that work on both platforms."
    },
    {
      question: "How long does app development take?",
      answer: "We can build and launch apps in 20 days for MVPs. Complex apps may take 30-45 days depending on features."
    }
  ];

  return (
    <>
      <SEOHead
        title="App Development Agency in Delhi | RAGSPRO | Web & Mobile Apps"
        description="Professional app development in Delhi. Web apps, iOS, Android. Launch in 20 days. Pricing ₹85K-₹3L. 50+ successful apps built."
        keywords="app development Delhi, mobile app Delhi, web app Delhi, iOS development Delhi, Android development Delhi"
        url="https://ragspro.com/app-development-delhi"
      />
      
      <GeoLandingPage
        location="Delhi"
        service="App Development"
        content={content}
        mapCoordinates={mapCoordinates}
        faqs={faqs}
      />
    </>
  );
}
