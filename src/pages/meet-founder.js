import { motion } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import RaghavAvatar from '../components/RaghavAvatar'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiMapPin, FiAward, FiCode, FiUsers, FiTrendingUp } from 'react-icons/fi'

export default function MeetFounder() {
  const achievements = [
    {
      icon: <FiCode size={24} />,
      title: "Multiple Projects Delivered",
      description: "Successfully delivered AI products including LAW-AI and GLOW"
    },
    {
      icon: <FiUsers size={24} />,
      title: "Growing Client Base",
      description: "Building relationships with clients across India"
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: "Revenue-Focused Solutions",
      description: "Specializing in profitable AI products and automation"
    },
    {
      icon: <FiAward size={24} />,
      title: "BCA Graduate (2022-2025)",
      description: "Computer Applications from Maharshi Dayanand University"
    }
  ]

  const skills = [
    "Full-Stack Development", "AI & Machine Learning", "SaaS Development", 
    "Python Automation", "React & Next.js", "UI/UX Design",
    "Business Intelligence", "Legal Tech", "E-commerce Solutions"
  ]

  const projects = [
    {
      name: "LAW-AI",
      url: "lawai.ragspro.com",
      description: "SaaS Legal Automation Platform - Automating legal workflows with AI"
    },
    {
      name: "GLOW",
      url: "glow.ragspro.com", 
      description: "AI Photo Enhancement Tool - Transform photos with AI technology"
    },
    {
      name: "RAGS AI Assistant",
      url: "#",
      description: "Voice-controlled AI assistant with Mac & iPhone integration"
    }
  ]

  return (
    <>
      <SEOHead 
        title="Meet Raghav Shah - Founder of RAGSPRO | AI Developer & Full-Stack Expert"
        description="Meet Raghav Shah (Bhupender Pratap), founder of RAGSPRO AI Agency. BCA graduate, Full-Stack Developer, AI enthusiast. Creator of LAW-AI, GLOW, and RAGS AI Assistant. Delhi-based developer specializing in profitable AI products."
        keywords="Raghav Shah, Bhupender Pratap, RAGSPRO founder, AI developer Delhi, Full-Stack Developer, LAW-AI creator, GLOW AI, RAGS AI Assistant, BCA graduate, Python developer, SaaS builder, Legal Tech, AI automation"
        url="https://ragspro.com/meet-founder"
      />
      
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="glass-card p-8 rounded-2xl">
                  <div className="mx-auto mb-6 flex justify-center">
                    <RaghavAvatar
                      size="lg"
                      variant="circle-accent"
                      priority={true}
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Raghav Shah</h1>
                    <p className="text-accent font-medium mb-2">(Bhupender Pratap)</p>
                    <p className="text-gray-400">Founder & CEO, RAGSPRO</p>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Meet the <span className="text-gradient">Founder</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    Full-Stack Developer | AI & Cyber Intelligence Enthusiast | SaaS Builder
                  </p>
                </div>

                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    <strong className="text-white">Raghav Shah (Bhupender Pratap)</strong> is a BCA graduate from Maharshi Dayanand University, Rohtak, 
                    with expertise in AI, SaaS, web development, and cyber intelligence.
                  </p>
                  <p>
                    Experienced in Python full-stack development, automation, and generative AI tools. 
                    Built successful projects like <strong className="text-accent">LAW-AI</strong> (SaaS Legal Automation), 
                    <strong className="text-accent"> GLOW</strong> (AI Photo Enhancement), and 
                    <strong className="text-accent"> RAGS AI Assistant</strong>.
                  </p>
                  <p>
                    Quick learner with strong problem-solving skills, specializing in creating profitable 
                    AI products that generate ₹50K+ monthly recurring revenue for businesses.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center text-gray-400">
                    <FiMail className="text-accent mr-2" size={16} />
                    <span>ragsproai@gmail.com</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <span className="text-accent mr-2">📱</span>
                    <span>+91-8826073013</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiMapPin className="text-accent mr-2" size={16} />
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-white mb-4">Achievements & Milestones</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl text-center"
                >
                  <div className="text-accent mb-4 flex justify-center">
                    {achievement.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-white mb-4">Skills & Expertise</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Specialized in cutting-edge technologies and frameworks for building scalable AI products
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-white mb-4">Featured Projects</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Successful AI products and SaaS platforms built by Raghav Shah
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h4 className="text-xl font-semibold text-white mb-2">{project.name}</h4>
                  <p className="text-accent text-sm mb-3">{project.url}</p>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Connect with Raghav</h3>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://github.com/raghavshahhh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-accent transition-all"
                  aria-label="Visit Raghav Shah's GitHub profile"
                >
                  <FiGithub size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/raghavshahhh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-accent transition-all"
                  aria-label="Connect with Raghav Shah on LinkedIn"
                >
                  <FiLinkedin size={24} />
                </a>
                <a 
                  href="https://x.com/ragsproai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-accent transition-all"
                  aria-label="Follow Raghav Shah on Twitter"
                >
                  <FiTwitter size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/ragsproai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-accent transition-all"
                  aria-label="Follow Raghav Shah on Instagram"
                >
                  <FiInstagram size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}