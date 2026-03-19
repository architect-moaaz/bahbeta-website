import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export function BahBetaWebsite() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Website & Mobile App Development",
      description: "Custom Mobile & Web Apps That Move Your Business Forward",
      icon: "📱",
      color: "from-blue-500 to-cyan-500",
      features: ["Cross-Platform Expertise", "User-Centric Design", "Fast, Agile Delivery", "Secure & Scalable Architecture"]
    },
    {
      title: "POS & Payment Gateway",
      description: "Smart POS & Secure Payment Gateway Solutions",
      icon: "💳",
      color: "from-purple-500 to-pink-500",
      features: ["Accept All Card Schemes", "Real-time Tracking", "24/7 Support", "PCI-DSS Compliant"]
    },
    {
      title: "NFC Business Cards",
      description: "Modern Networking, Redefined by BahBeta",
      icon: "🔗",
      color: "from-green-500 to-emerald-500",
      features: ["Premium Metal & PVC", "One Tap Connection", "Fully Customizable", "Eco-Friendly"]
    },
    {
      title: "Cybersecurity Advisory",
      description: "Guiding You to a Safer Digital Future",
      icon: "🛡️",
      color: "from-red-500 to-orange-500",
      features: ["Licensed Partners", "Compliance Guidance", "End-to-End Oversight", "Unbiased Recommendations"]
    },
    {
      title: "ERP, CRM & Cloud Services",
      description: "Empowering Your Digital Growth",
      icon: "☁️",
      color: "from-indigo-500 to-blue-500",
      features: ["AWS, Oracle, Microsoft", "Managed Services", "Global Technology", "Local Support"]
    },
    {
      title: "AI, ML, AR & VR Development",
      description: "Next-Gen Technologies for Future-Ready Businesses",
      icon: "🤖",
      color: "from-yellow-500 to-orange-500",
      features: ["AI Solutions", "Machine Learning", "Augmented Reality", "Virtual Reality"]
    }
  ];

  const testimonials = [
    {
      company: "Leading Retail Bank",
      type: "Premium Metal NFC Cards",
      text: "The metal NFC business cards are not just sleek and premium, they're also functional and future-forward. A perfect representation of who we are.",
      author: "Head of Corporate Communications",
      rating: 5
    },
    {
      company: "Restaurant Chain",
      type: "Point-of-Sale Solutions",
      text: "What impressed us most? Their late-night support — even when we had an issue at 2:45 AM, they were there. This is the kind of partner every business needs.",
      author: "Founder & CEO",
      rating: 5
    },
    {
      company: "Tier-2 Bank",
      type: "Core Banking Advisory",
      text: "Bahbeta played a vital role in advising our team during the early stages of our core banking transformation. A trusted extension of our technology team.",
      author: "Chief Technology Officer",
      rating: 5
    }
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-black text-white">
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <div className="w-32 h-32 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin" />
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-cyan-400"
              >
                BahBeta
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Animated particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.5, 1, 1.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center z-10"
        style={{ scale, opacity }}
      >
        <div className="text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* 3D Logo Effect */}
            <motion.h1
              className="text-8xl md:text-9xl font-black tracking-wider mb-8 relative"
              style={{
                background: 'linear-gradient(45deg, #00f5ff, #ff00ff, #00ff00, #ffff00)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <motion.span
                style={{ rotateX }}
                className="inline-block"
              >
                BahBeta
              </motion.span>
              {/* 3D shadow effect */}
              <div className="absolute inset-0 text-8xl md:text-9xl font-black tracking-wider text-gray-800 -z-10 transform translate-x-2 translate-y-2 blur-sm">
                BahBeta
              </div>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-4xl font-light text-cyan-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Empowering Digital Excellence<br />
              <span className="text-xl text-gray-400">Technology Solutions That Transform Businesses</span>
            </motion.p>

            {/* Floating CTA Buttons */}
            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Services
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-cyan-400 rounded-full text-xl font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.1, rotateZ: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full relative">
            <motion.div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyan-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-6xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  z: 50
                }}
              >
                {/* 3D Card Container */}
                <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    animate={{
                      background: [
                        `linear-gradient(45deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`,
                        `linear-gradient(90deg, ${service.color.split(' ')[3]}, ${service.color.split(' ')[1]})`,
                        `linear-gradient(45deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Icon with 3D effect */}
                  <motion.div
                    className="text-6xl mb-6 relative z-10"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateZ: 360,
                      textShadow: "0 0 20px rgba(0,245,255,0.8)"
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-white relative z-10">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 relative z-10">
                    {service.description}
                  </p>

                  <ul className="space-y-2 relative z-10">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center text-sm text-cyan-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Holographic border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(0,245,255,0.3), transparent)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-6xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative group perspective-1000"
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2,
                  type: "spring" 
                }}
                viewport={{ once: true }}
                whileHover={{ rotateY: 10, scale: 1.05 }}
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
                  {/* Floating stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <motion.span
                        key={starIndex}
                        className="text-yellow-400 text-xl"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: starIndex * 0.2 
                        }}
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold text-cyan-400">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.company}</p>
                    <p className="text-xs text-purple-400 mt-1">{testimonial.type}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Ready to Transform?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            Let's discuss how BahBeta can elevate your business to the next level
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              <div className="text-4xl mb-4">📧</div>
              <p className="text-cyan-400">support@bahbeta.com</p>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1, rotateZ: -5 }}
            >
              <div className="text-4xl mb-4">📱</div>
              <p className="text-cyan-400">+973 33283222</p>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              <div className="text-4xl mb-4">📍</div>
              <p className="text-cyan-400">Manama, Bahrain</p>
            </motion.div>
          </motion.div>

          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            whileHover={{ 
              scale: 1.1, 
              rotateZ: [0, 5, -5, 0],
              boxShadow: "0 0 50px rgba(168, 85, 247, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Start Your Journey
          </motion.button>
        </div>
      </section>
    </div>
  );
}