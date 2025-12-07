import { FaGithub, FaYoutube, FaLinkedin, FaCode, FaRocket } from 'react-icons/fa'

export default function AuthoritySection() {
  const githubProjects = [
    {
      name: "Lead Generator",
      description: "Automated lead generation system for businesses",
      stars: "⭐ Featured",
      link: "https://github.com/raghavshahhh/lead-genrater"
    },
    {
      name: "RAGS-AI",
      description: "AI-powered automation and intelligence platform",
      stars: "⭐ Featured",
      link: "https://github.com/raghavshahhh/RAGS-AI"
    },
    {
      name: "Lawai",
      description: "AI legal assistant for document automation",
      stars: "⭐ Featured",
      link: "https://github.com/raghavshahhh/lawai"
    }
  ]

  const socialProof = [
    {
      platform: "GitHub",
      icon: FaGithub,
      stat: "50+ Projects",
      description: "Building MVPs publicly",
      link: "https://github.com/raghavshahhh"
    },
    {
      platform: "YouTube",
      icon: FaYoutube,
      stat: "Tech Tutorials",
      description: "Startup development guides",
      link: "https://www.youtube.com/@raghavshahh"
    },
    {
      platform: "LinkedIn",
      icon: FaLinkedin,
      stat: "5K+ Followers",
      description: "Sharing startup insights",
      link: "https://linkedin.com/in/raghavshahhh"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Building MVPs Publicly
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just build for clients. We build in public, share our process, and contribute to the startup community.
          </p>
        </div>

        {/* Social Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {socialProof.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.platform}</h3>
                  <p className="text-gray-600 text-sm">{item.stat}</p>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </a>
          ))}
        </div>

        {/* Featured GitHub Projects */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <FaCode className="text-3xl" />
            <h3 className="text-2xl font-bold">Featured Work on GitHub</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {githubProjects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-lg">{project.name}</h4>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {project.stars}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* 20-Day Build Showcase */}
        <div className="mt-16 bg-black text-white p-8 md:p-12 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <FaRocket className="text-5xl mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4 text-white">
              Documented 20-Day Builds
            </h3>
            <p className="text-xl text-white mb-8">
              Watch us build complete MVPs from scratch in 20 days. Full transparency, real timelines, actual code.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/blog/20-day-startup-launch-case-study"
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Read Case Study
              </a>
              <a
                href="https://www.youtube.com/@raghavshahh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
