import SEOHead from '../components/SEOHead';
import GeoLandingPage from '../components/GeoLandingPage';

export default function AIAutomationDelhi() {
  const content = {
    hero: "Transform your Delhi startup with AI automation. RAGSPRO integrates cutting-edge AI into your MVP in 20 days. ChatGPT, custom ML models, and intelligent workflows.",
    
    description: `
      <h2>AI Automation Services for Startups in Delhi</h2>
      
      <p>RAGSPRO is Delhi's leading <strong>AI automation agency</strong> for startups. We help founders integrate ChatGPT, custom ML models, and intelligent automation into their MVPs. Based in Delhi, we understand the unique needs of Indian startups looking to leverage AI for competitive advantage.</p>
      
      <h3>AI Automation Services We Offer</h3>
      
      <ul>
        <li><strong>ChatGPT Integration:</strong> Add conversational AI to your product</li>
        <li><strong>Custom ML Models:</strong> Build AI models for your specific use case</li>
        <li><strong>Business Process Automation:</strong> Automate repetitive tasks with AI</li>
        <li><strong>AI-Powered Analytics:</strong> Get insights from your data with ML</li>
        <li><strong>Intelligent Chatbots:</strong> 24/7 customer support with AI</li>
        <li><strong>Document Processing:</strong> Extract data from documents with AI</li>
      </ul>
      
      <h3>Why Choose RAGSPRO for AI Automation in Delhi?</h3>
      
      <p>We've helped Delhi startups save 120+ hours through AI automation. Our expertise in OpenAI, Anthropic, and custom ML models means we can build AI solutions that actually work for your business.</p>
      
      <h3>AI Automation Pricing</h3>
      
      <p>AI automation projects start at <strong>₹85,000</strong> and scale based on complexity. We offer transparent pricing and can integrate AI into existing products or build new AI-powered MVPs from scratch.</p>
      
      <h3>Technologies We Use</h3>
      
      <ul>
        <li>OpenAI (ChatGPT, GPT-4, DALL-E)</li>
        <li>Anthropic (Claude)</li>
        <li>Custom ML models (TensorFlow, PyTorch)</li>
        <li>LangChain for AI workflows</li>
        <li>Vector databases (Pinecone, Weaviate)</li>
      </ul>
      
      <h3>Success Stories</h3>
      
      <p>We've built AI-powered features for Delhi startups that have:</p>
      
      <ul>
        <li>Saved 120+ hours through automation</li>
        <li>Improved customer response time by 90%</li>
        <li>Increased conversion rates by 40%</li>
        <li>Reduced operational costs by 60%</li>
      </ul>
      
      <h3>Get Started with AI Automation</h3>
      
      <p>Ready to add AI to your startup? Schedule a free AI consultation with RAGSPRO in Delhi. We'll assess your needs and create a custom AI automation roadmap.</p>
      
      <p><strong>Contact:</strong> +918700048490 | ragsproai@gmail.com</p>
    `,
    
    benefits: [
      {
        icon: '🤖',
        title: 'AI Expertise',
        description: 'Deep expertise in OpenAI, Anthropic, and custom ML models.'
      },
      {
        icon: '⚡',
        title: 'Fast Integration',
        description: 'Add AI to your product in days, not months.'
      },
      {
        icon: '💰',
        title: 'Cost Savings',
        description: 'Automate tasks and reduce operational costs by 60%.'
      }
    ]
  };

  const mapCoordinates = { lat: 28.7041, lng: 77.1025, zoom: 12 };

  const faqs = [
    {
      question: "How much does AI automation cost in Delhi?",
      answer: "AI automation projects with RAGSPRO start at ₹85,000 and scale based on complexity. We offer transparent pricing and flexible payment plans."
    },
    {
      question: "Can you integrate ChatGPT into my existing product?",
      answer: "Yes! We can integrate ChatGPT, GPT-4, and other AI models into existing products or build new AI-powered MVPs from scratch."
    }
  ];

  return (
    <>
      <SEOHead
        title="AI Automation Services in Delhi | RAGSPRO | ChatGPT Integration"
        description="Leading AI automation agency in Delhi. Integrate ChatGPT, custom ML models, and intelligent workflows. Save 120+ hours. Pricing from ₹85K."
        keywords="AI automation Delhi, ChatGPT integration Delhi, ML services Delhi, AI agency Delhi, business automation Delhi"
        url="https://ragspro.com/ai-automation-delhi"
      />
      
      <GeoLandingPage
        location="Delhi"
        service="AI Automation"
        content={content}
        mapCoordinates={mapCoordinates}
        faqs={faqs}
      />
    </>
  );
}
