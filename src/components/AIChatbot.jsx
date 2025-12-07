import { useState, useRef, useEffect } from 'react'

export default function AIChatbot({ onClose, onQualified }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm RAGS AI, your startup consultant. I'll help you understand if we're a good fit for your project. What's your name?"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState('name')
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    ideaValidated: ''
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content }])
  }

  const askNextQuestion = (step, data) => {
    setIsTyping(true)
    setTimeout(() => {
      let question = ''
      
      switch(step) {
        case 'email':
          question = `Great to meet you, ${data.name}! What's your email address?`
          break
        case 'phone':
          question = "Perfect! And your phone number?"
          break
        case 'projectType':
          question = "Awesome! Now, what do you want to build? (e.g., SaaS app, Mobile app, E-commerce, AI product)"
          break
        case 'budget':
          question = "Got it! What's your budget range?\n\n1. Under ₹85K\n2. ₹85K - ₹1.5L\n3. ₹1.5L - ₹3L\n4. ₹3L+"
          break
        case 'timeline':
          question = "When do you need it?\n\n1. 1-2 weeks (Rush)\n2. 3-4 weeks (Standard)\n3. 1-2 months\n4. 3+ months"
          break
        case 'ideaValidated':
          question = "Have you validated your idea?\n\n1. Yes, I have paying customers\n2. Yes, I have users/waitlist\n3. No, but I've done research\n4. No, it's just an idea"
          break
        case 'qualify':
          // Qualification logic
          const qualification = qualifyLead(data)
          if (qualification.qualified) {
            question = `Perfect! Based on what you've told me:\n\n✅ Project: ${data.projectType}\n✅ Budget: ${data.budget}\n✅ Timeline: ${data.timeline}\n\nYou're a great fit for RAGSPRO! ${qualification.message}\n\nWould you like to book a free 15-minute consultation?`
          } else {
            question = `Thanks for sharing! Based on your budget and timeline, ${qualification.message}\n\nI can share some helpful resources to get you started. Would you like that?`
          }
          break
        default:
          question = "Let's get started!"
      }
      
      addMessage('assistant', question)
      setIsTyping(false)
    }, 1000)
  }

  const qualifyLead = (data) => {
    let score = 0
    
    // Budget scoring
    if (data.budget.includes('3L+')) score += 50
    else if (data.budget.includes('1.5L-3L')) score += 40
    else if (data.budget.includes('85K-1.5L')) score += 30
    else score += 10
    
    // Timeline scoring
    if (data.timeline.includes('1-2 weeks')) score += 25
    else if (data.timeline.includes('3-4 weeks')) score += 20
    else if (data.timeline.includes('1-2 months')) score += 15
    else score += 5
    
    // Idea validation scoring
    if (data.ideaValidated.includes('paying customers')) score += 25
    else if (data.ideaValidated.includes('users')) score += 15
    else if (data.ideaValidated.includes('research')) score += 10
    else score += 5
    
    if (score >= 70) {
      return {
        qualified: true,
        tier: 'high',
        message: "We can definitely help you launch in 20 days!"
      }
    } else if (score >= 50) {
      return {
        qualified: true,
        tier: 'medium',
        message: "We can work together to bring your idea to life!"
      }
    } else if (score >= 30) {
      return {
        qualified: true,
        tier: 'low',
        message: "Let's discuss how we can help within your budget!"
      }
    } else {
      return {
        qualified: false,
        tier: 'not-qualified',
        message: "we recommend starting with some research and planning first."
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    addMessage('user', input)
    
    // Process input based on current step
    const newLeadData = { ...leadData }
    
    switch(currentStep) {
      case 'name':
        newLeadData.name = input
        setLeadData(newLeadData)
        setCurrentStep('email')
        askNextQuestion('email', newLeadData)
        break
      case 'email':
        newLeadData.email = input
        setLeadData(newLeadData)
        setCurrentStep('phone')
        askNextQuestion('phone', newLeadData)
        break
      case 'phone':
        newLeadData.phone = input
        setLeadData(newLeadData)
        setCurrentStep('projectType')
        askNextQuestion('projectType', newLeadData)
        break
      case 'projectType':
        newLeadData.projectType = input
        setLeadData(newLeadData)
        setCurrentStep('budget')
        askNextQuestion('budget', newLeadData)
        break
      case 'budget':
        // Map number to budget range
        const budgetMap = {
          '1': 'Under ₹85K',
          '2': '₹85K - ₹1.5L',
          '3': '₹1.5L - ₹3L',
          '4': '₹3L+'
        }
        newLeadData.budget = budgetMap[input] || input
        setLeadData(newLeadData)
        setCurrentStep('timeline')
        askNextQuestion('timeline', newLeadData)
        break
      case 'timeline':
        // Map number to timeline
        const timelineMap = {
          '1': '1-2 weeks',
          '2': '3-4 weeks',
          '3': '1-2 months',
          '4': '3+ months'
        }
        newLeadData.timeline = timelineMap[input] || input
        setLeadData(newLeadData)
        setCurrentStep('ideaValidated')
        askNextQuestion('ideaValidated', newLeadData)
        break
      case 'ideaValidated':
        // Map number to validation status
        const validationMap = {
          '1': 'Yes, paying customers',
          '2': 'Yes, users/waitlist',
          '3': 'No, but research done',
          '4': 'Just an idea'
        }
        newLeadData.ideaValidated = validationMap[input] || input
        setLeadData(newLeadData)
        setCurrentStep('qualify')
        askNextQuestion('qualify', newLeadData)
        break
      case 'qualify':
        // Handle yes/no for booking
        if (input.toLowerCase().includes('yes') || input.toLowerCase().includes('book')) {
          const qualification = qualifyLead(leadData)
          if (onQualified) {
            onQualified({ ...leadData, qualification })
          }
        } else {
          addMessage('assistant', "No problem! Feel free to reach out anytime. You can also check out our blog for helpful resources: ragspro.com/blog")
        }
        break
    }
    
    setInput('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">R</span>
            </div>
            <div>
              <h3 className="font-bold">RAGS AI</h3>
              <p className="text-xs text-gray-300">Startup Consultant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-gray-200'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-black border border-gray-200 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-black"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
