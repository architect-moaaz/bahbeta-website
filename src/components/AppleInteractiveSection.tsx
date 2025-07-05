import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function AppleInteractiveSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const features = [
    {
      title: "Local Expertise",
      description: "Deep understanding of Bahrain's business landscape and regulatory environment.",
      icon: "🏛️",
      details: "Over 5 years serving the Kingdom of Bahrain with localized solutions."
    },
    {
      title: "Global Standards",
      description: "International best practices combined with cutting-edge technology solutions.",
      icon: "🌍",
      details: "Partnerships with AWS, Oracle, Microsoft, and other global technology leaders."
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance ensuring your business never stops running.",
      icon: "🕐",
      details: "Dedicated support team available at any hour, including emergency response."
    },
    {
      title: "Scalable Growth",
      description: "Solutions that evolve with your business from startup to enterprise.",
      icon: "📈",
      details: "Future-proof architecture designed to handle growth and expansion."
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          style={{ opacity }}
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Why Choose
            <br />
            <span className="text-blue-600">BahBeta</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The perfect blend of local expertise and global technology standards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Feature List */}
          <motion.div 
            className="space-y-6"
            style={{ y }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-white shadow-xl scale-105' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ scale: activeFeature === index ? 1.05 : 1.02 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="text-3xl"
                    animate={{ 
                      scale: activeFeature === index ? 1.2 : 1,
                      rotate: activeFeature === index ? 360 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={
                        activeFeature === index
                          ? { height: 'auto', opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-500">{feature.details}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Visual Display */}
          <motion.div
            className="relative"
            style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          >
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 h-96 flex items-center justify-center overflow-hidden">
              {/* Animated background elements */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Dynamic content based on active feature */}
              <motion.div
                key={activeFeature}
                className="text-center text-white z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {features[activeFeature].icon}
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-blue-100 text-lg">
                  {features[activeFeature].description}
                </p>
              </motion.div>

              {/* Floating elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white/30 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}