import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { AppleInteractiveSection } from './AppleInteractiveSection';

export function AppleBahBetaWebsite() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "App Development",
      subtitle: "Mobile & Web Applications",
      description: "Custom solutions that move your business forward with precision and creativity.",
      image: "📱",
      features: ["Cross-Platform", "User-Centric Design", "Agile Delivery", "Scalable Architecture"],
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Payment Solutions",
      subtitle: "POS & Gateway Systems",
      description: "Smart payment processing with comprehensive support for all major card schemes.",
      image: "💳",
      features: ["All Card Schemes", "Real-time Analytics", "24/7 Support", "PCI Compliant"],
      color: "from-green-600 to-emerald-700"
    },
    {
      title: "Smart Networking",
      subtitle: "NFC Business Cards",
      description: "Modern networking redefined with premium metal and PVC options.",
      image: "🔗",
      features: ["Premium Materials", "Instant Connection", "Fully Customizable", "Eco-Friendly"],
      color: "from-purple-600 to-indigo-700"
    },
    {
      title: "Cybersecurity",
      subtitle: "Advisory & Management",
      description: "Comprehensive security guidance through trusted, licensed partners.",
      image: "🛡️",
      features: ["Licensed Partners", "Compliance Ready", "End-to-End Support", "Unbiased Consulting"],
      color: "from-red-600 to-pink-700"
    },
    {
      title: "Cloud Services",
      subtitle: "ERP, CRM & Infrastructure",
      description: "Enterprise solutions powered by AWS, Oracle, and Microsoft partnerships.",
      image: "☁️",
      features: ["Global Partnerships", "Managed Services", "Local Support", "Scalable Solutions"],
      color: "from-cyan-600 to-blue-700"
    },
    {
      title: "Future Tech",
      subtitle: "AI, ML, AR & VR",
      description: "Next-generation technologies for forward-thinking businesses.",
      image: "🤖",
      features: ["AI Solutions", "Machine Learning", "Immersive Experiences", "Custom Development"],
      color: "from-orange-600 to-red-700"
    }
  ];

  const testimonials = [
    {
      quote: "The metal NFC business cards perfectly represent our brand's sophistication and innovation.",
      author: "Head of Corporate Communications",
      company: "Leading Retail Bank",
      service: "Premium NFC Cards"
    },
    {
      quote: "Exceptional support, even at 2:45 AM. This is the partnership standard every business needs.",
      author: "Founder & CEO",
      company: "Restaurant Chain",
      service: "POS Solutions"
    },
    {
      quote: "A trusted extension of our technology team during our core banking transformation.",
      author: "Chief Technology Officer", 
      company: "Tier-2 Bank",
      service: "Banking Advisory"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white text-gray-900 overflow-hidden">
      {/* Apple-style Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-semibold tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              BahBeta
            </motion.div>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              {['Services', 'Solutions', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Apple Style */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center pt-20"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <div className="text-center max-w-5xl mx-auto px-6">
          <motion.h1
            className="apple-text-large md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-8"
            style={{ letterSpacing: '-0.022em' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Empowering Digital
            <br />
            <span className="text-blue-600">Excellence</span>
          </motion.h1>
          
          <motion.p
            className="apple-text-body md:text-2xl font-light text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Technology solutions that transform businesses across Bahrain and beyond.
            Building tomorrow's digital infrastructure today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.button
              className="apple-button px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.button>
            <motion.button
              className="apple-button px-8 py-4 border border-gray-300 text-gray-900 font-medium rounded-full hover:border-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        {/* Apple-style scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Services Section - Apple Grid Style */}
      <section className="py-24 bg-gray-50" id="services">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive technology solutions designed for modern businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Service Icon */}
                <motion.div
                  className="text-4xl mb-6 flex justify-center"
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl">
                    {service.image}
                  </div>
                </motion.div>

                <h3 className="text-2xl font-semibold mb-2 text-center">
                  {service.title}
                </h3>
                
                <p className="text-blue-600 font-medium text-center mb-4">
                  {service.subtitle}
                </p>

                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
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

                {/* Learn More Link */}
                <motion.div
                  className="mt-6 text-center"
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                    Learn more →
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Apple Style */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              What our clients say about working with BahBeta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-3xl p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  {[...Array(5)].map((_, starIndex) => (
                    <motion.span
                      key={starIndex}
                      className="text-yellow-400 text-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: starIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                <blockquote className="text-lg text-gray-800 mb-6 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </blockquote>

                <div className="border-t border-gray-200 pt-6">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  <p className="text-blue-600 text-xs mt-1 font-medium">{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <AppleInteractiveSection />

      {/* Apple-style Feature Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.h2
                className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Built for
                <br />
                <span className="text-blue-400">Bahrain</span>
              </motion.h2>
              
              <motion.p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Deep local expertise combined with global technology partnerships. 
                We understand the unique needs of businesses in the Kingdom of Bahrain.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-3xl font-bold text-blue-400 mb-2">24/7</h3>
                  <p className="text-gray-400">Local Support</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-400 mb-2">100+</h3>
                  <p className="text-gray-400">Satisfied Clients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-400 mb-2">5★</h3>
                  <p className="text-gray-400">Client Rating</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-400 mb-2">99%</h3>
                  <p className="text-gray-400">Uptime SLA</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-2xl font-semibold mb-2">Office Location</h3>
                <p className="text-blue-100">
                  Building #747, Road #1124<br />
                  Block #311, Manama<br />
                  Kingdom of Bahrain
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Apple Style */}
      <section className="py-24 bg-white" id="contact">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss how BahBeta can transform your business
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "📧", label: "Email", value: "support@bahbeta.com" },
              { icon: "📱", label: "Phone", value: "+973 33283222" },
              { icon: "💬", label: "Sales", value: "dilshad@bahbeta.com" }
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {contact.icon}
                </div>
                <h3 className="font-semibold mb-2">{contact.label}</h3>
                <p className="text-blue-600">{contact.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="px-12 py-4 bg-blue-600 text-white font-medium rounded-full text-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Start Your Project
          </motion.button>
        </div>
      </section>

      {/* Footer - Apple Style */}
      <footer className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <motion.div
              className="text-2xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              BahBeta
            </motion.div>
            <p className="text-gray-600 mb-8">
              Empowering Digital Excellence in Bahrain
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Cookies Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}