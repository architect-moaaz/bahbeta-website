import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export function StateOfTheArtBusiness() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const businessMetrics = [
    { label: "Client Satisfaction", value: "99.7%", icon: "⭐", color: "from-green-500 to-emerald-600" },
    { label: "Project Success Rate", value: "98.5%", icon: "🎯", color: "from-blue-500 to-cyan-600" },
    { label: "Average ROI", value: "340%", icon: "📈", color: "from-purple-500 to-indigo-600" },
    { label: "Global Partners", value: "50+", icon: "🌍", color: "from-orange-500 to-red-600" }
  ];

  const services = [
    {
      category: "Digital Transformation",
      title: "App Development Excellence",
      description: "Enterprise-grade mobile and web applications built with cutting-edge technology stacks.",
      features: ["React Native & Flutter", "Cloud-Native Architecture", "AI/ML Integration", "Advanced Security"],
      icon: "📱",
      gradient: "from-blue-600 via-blue-700 to-indigo-800",
      stats: { projects: "150+", satisfaction: "99%", timeline: "2-6 months" }
    },
    {
      category: "Financial Technology",
      title: "Payment Solutions",
      description: "Comprehensive payment processing systems supporting all major financial institutions.",
      features: ["Multi-Currency Support", "Real-time Analytics", "Fraud Detection", "Regulatory Compliance"],
      icon: "💳",
      gradient: "from-emerald-600 via-green-700 to-teal-800",
      stats: { transactions: "1M+", uptime: "99.9%", integration: "< 48 hours" }
    },
    {
      category: "Smart Networking",
      title: "NFC Business Solutions",
      description: "Next-generation networking tools that revolutionize professional connections.",
      features: ["Premium Materials", "Custom Branding", "Analytics Dashboard", "CRM Integration"],
      icon: "🔗",
      gradient: "from-purple-600 via-violet-700 to-fuchsia-800",
      stats: { cards: "10K+", connections: "500K+", satisfaction: "96%" }
    },
    {
      category: "Security & Compliance",
      title: "Cybersecurity Advisory",
      description: "Comprehensive security strategies through certified partner networks.",
      features: ["Risk Assessment", "Compliance Auditing", "Incident Response", "24/7 Monitoring"],
      icon: "🛡️",
      gradient: "from-red-600 via-rose-700 to-pink-800",
      stats: { assessments: "500+", compliance: "100%", response: "< 15 min" }
    },
    {
      category: "Enterprise Solutions",
      title: "ERP & Cloud Services",
      description: "Scalable enterprise solutions powered by leading global technology partners.",
      features: ["AWS/Azure/Oracle", "Custom Integration", "Managed Services", "Global Support"],
      icon: "☁️",
      gradient: "from-cyan-600 via-sky-700 to-blue-800",
      stats: { implementations: "200+", efficiency: "+250%", support: "24/7" }
    },
    {
      category: "Emerging Technologies",
      title: "AI & Immersive Tech",
      description: "Future-ready solutions leveraging artificial intelligence and immersive experiences.",
      features: ["Machine Learning", "Computer Vision", "AR/VR Development", "Predictive Analytics"],
      icon: "🤖",
      gradient: "from-orange-600 via-amber-700 to-yellow-800",
      stats: { models: "50+", accuracy: "94%", industries: "15+" }
    }
  ];

  const executiveTestimonials = [
    {
      quote: "BahBeta's strategic approach to our digital transformation exceeded all expectations. Their team delivered a solution that not only met our immediate needs but positioned us for future growth.",
      author: "Mohammed Al-Rashid",
      title: "Chief Executive Officer",
      company: "Gulf Financial Group",
      service: "ERP Implementation",
      image: "👨‍💼",
      metrics: { roi: "+180%", efficiency: "+65%", timeline: "6 months" }
    },
    {
      quote: "The level of professionalism and technical expertise demonstrated by BahBeta is unparalleled. They transformed our payment infrastructure with zero downtime.",
      author: "Sarah Al-Mahmood",
      title: "Chief Technology Officer",
      company: "Bahrain Commercial Bank",
      service: "Payment Gateway Integration",
      image: "👩‍💼",
      metrics: { transactions: "2M+", uptime: "99.99%", integration: "3 weeks" }
    },
    {
      quote: "Working with BahBeta was a game-changer for our retail operations. Their POS solution streamlined our processes and provided invaluable business insights.",
      author: "Ahmed Al-Khalifa",
      title: "Operations Director",
      company: "Gulf Retail Enterprises",
      service: "POS System Implementation",
      image: "👨‍💼",
      metrics: { efficiency: "+85%", sales: "+120%", deployment: "2 weeks" }
    }
  ];

  const clientLogos = [
    { name: "Gulf Bank", logo: "🏦" },
    { name: "Bahrain Bay", logo: "🏢" },
    { name: "Al-Rashid Group", logo: "🏛️" },
    { name: "Gulf Air", logo: "✈️" },
    { name: "Batelco", logo: "📡" },
    { name: "ALBA", logo: "🏭" }
  ];

  return (
    <div ref={containerRef} className="relative bg-slate-50 text-gray-900 overflow-hidden">
      {/* Premium Loading Animation */}
      <AnimatePresence>
        {isLoaded === false && (
          <motion.div
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative mb-8"
              >
                <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 w-20 h-20 border-4 border-cyan-300 border-b-transparent rounded-full animate-spin animate-reverse" />
              </motion.div>
              <motion.h2
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold text-white mb-2"
              >
                BahBeta
              </motion.h2>
              <p className="text-blue-200">Loading Enterprise Experience...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Executive Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-white/90 border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold">
                B
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BahBeta</h1>
                <p className="text-xs text-gray-500">Enterprise Solutions</p>
              </div>
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {['Solutions', 'Services', 'Case Studies', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                  whileHover={{ y: -1 }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Premium Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 30, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* Geometric Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🏆 Award-Winning Technology Partner
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl lg:text-8xl font-bold mb-8 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Enterprise
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Transforming businesses across the Kingdom of Bahrain with cutting-edge technology solutions, 
            strategic partnerships, and unparalleled expertise.
          </motion.p>

          {/* Business Metrics */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {businessMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setActiveMetric(index)}
              >
                <div className={`text-2xl mb-2 ${activeMetric === index ? 'animate-bounce' : ''}`}>
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Consultation
            </motion.button>
            <motion.button
              className="px-10 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Case Studies
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Showcase */}
      <section className="py-32 bg-white relative" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology services designed for modern enterprises
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    animate={hoveredService === index ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 2, repeat: hoveredService === index ? Infinity : 0 }}
                  />

                  {/* Service Category */}
                  <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
                    {service.category}
                  </div>

                  {/* Service Icon */}
                  <motion.div
                    className="text-4xl mb-6 inline-block"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                      {service.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Service Stats */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {Object.entries(service.stats).map(([key, value], statIndex) => (
                        <div key={statIndex}>
                          <div className="text-lg font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More */}
                  <motion.div
                    className="mt-6 text-center"
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Testimonials */}
      <section className="py-32 bg-gradient-to-br from-slate-50 to-blue-50" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Executive Testimonials
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by C-suite executives across the Gulf region
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {executiveTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Quote Mark */}
                <div className="text-6xl text-blue-200 font-serif absolute top-4 right-6 opacity-50">
                  "
                </div>

                {/* Executive Image */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl text-white mb-6">
                  {testimonial.image}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-gray-800 mb-6 leading-relaxed font-medium relative z-10">
                  {testimonial.quote}
                </blockquote>

                {/* Executive Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="mb-4">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-blue-600 font-medium">{testimonial.title}</p>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>

                  {/* Project Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 rounded-xl p-4">
                    {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex}>
                        <div className="text-sm font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Clients */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-600">
              Partnering with the most respected organizations in Bahrain
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 transition-colors text-2xl">
                  {client.logo}
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {client.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden" id="contact">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Ready to Transform?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Let's discuss how BahBeta can accelerate your digital transformation journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: "📧", title: "Email", value: "enterprise@bahbeta.com", subtitle: "Get a response within 2 hours" },
              { icon: "📱", title: "Direct Line", value: "+973 3328 3222", subtitle: "Speak directly with our team" },
              { icon: "🏢", title: "Office", value: "Manama Financial District", subtitle: "Schedule an in-person meeting" }
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                <p className="text-blue-200 text-lg mb-2">{contact.value}</p>
                <p className="text-blue-300 text-sm">{contact.subtitle}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-12 py-4 bg-white text-blue-900 font-bold rounded-full text-lg hover:bg-blue-50 transition-colors shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Executive Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <div>
                <h3 className="text-2xl font-bold">BahBeta</h3>
                <p className="text-blue-300 text-sm">Enterprise Technology Solutions</p>
              </div>
            </motion.div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Empowering businesses across the Kingdom of Bahrain with cutting-edge technology solutions, 
              strategic consulting, and world-class support.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
              © 2025 BahBeta. All rights reserved. | Licensed in the Kingdom of Bahrain
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}