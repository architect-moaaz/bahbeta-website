import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Service definitions
const services = [
  {
    title: "Mobile & Web Development",
    subtitle: "Cross-Platform Excellence",
    description: "Custom mobile and web applications tailored to your business goals. From iOS and Android to responsive web apps, we create seamless experiences across all devices.",
    features: ["Cross-Platform Development", "User-Centric Design", "Agile Delivery", "Scalable Architecture"]
  },
  {
    title: "POS & Payment Solutions",
    subtitle: "Accept Payments with Ease",
    description: "Smart POS systems and secure payment gateways supporting all major card schemes. Perfect for retail, restaurants, and online businesses across Bahrain.",
    features: ["All Card Schemes Supported", "Real-time Tracking", "24/7 Support", "PCI-DSS Compliant"]
  },
  {
    title: "NFC Business Cards",
    subtitle: "Modern Networking Redefined",
    description: "Premium Metal and PVC NFC cards that share your digital profile with just a tap. Eco-friendly, customizable, and perfect for making lasting impressions.",
    features: ["One Tap Connection", "Fully Customizable", "Eco-Friendly", "Real-time Updates"]
  },
  {
    title: "Cybersecurity Advisory",
    subtitle: "Guiding Your Digital Security",
    description: "Expert cybersecurity consulting and management through licensed partners. We simplify security decisions while ensuring compliance and protection.",
    features: ["Licensed Partners", "Compliance Guidance", "Risk Assessment", "Incident Response"]
  },
  {
    title: "ERP, CRM & Cloud Services",
    subtitle: "Digital Transformation Simplified",
    description: "Strategic partnerships with AWS, Oracle, and Microsoft to deliver the right ERP, CRM, and cloud solutions with ongoing managed services.",
    features: ["Vendor-neutral Advice", "Implementation Oversight", "24/7 Monitoring", "Global Standards"]
  },
  {
    title: "AI, ML, AR & VR Development",
    subtitle: "Next-Gen Technologies",
    description: "Harness AI, Machine Learning, Augmented Reality, and Virtual Reality to solve real-world challenges and unlock new growth opportunities.",
    features: ["Custom AI Solutions", "Immersive Experiences", "Industry-Specific", "Future-Ready"]
  }
];

export function DirectImageDisplay() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('privacy');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const containerRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    setShowContactForm(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const testimonials = [
    {
      icon: "🏦",
      service: "Premium Metal NFC Cards",
      company: "Leading Retail Bank",
      testimonial: "Our executives wanted something that reflected the sophistication of our brand — and Bahbeta delivered exactly that. The metal NFC business cards are not just sleek and premium, they're also functional and future-forward. A perfect representation of who we are. Exceptional service from design to delivery!",
      author: "Head of Corporate Communications",
      organization: "Bahrain-based Retail Bank"
    },
    {
      icon: "🔧",
      service: "PVC NFC Cards",
      company: "Tyres & Oil Market Leader",
      testimonial: "For our nationwide team across garages and service points, we needed smart, durable, and affordable business cards. Bahbeta's PVC NFC cards were the ideal solution. They're easy to update, help our staff connect with customers instantly, and look great. Highly recommended for industrial brands like ours!",
      author: "Chief Executive Officer",
      organization: "Leading Tyres & Oil Company in Bahrain"
    },
    {
      icon: "💳",
      service: "Point-of-Sale Solutions",
      company: "Restaurant Chain Owner",
      testimonial: "Bahbeta's POS system completely transformed how we handle in-store payments. What impressed us most? Their late-night support — even when we had an issue at 2:45 AM, they were there. This is the kind of partner every business needs — reliable, responsive, and always one step ahead.",
      author: "Founder & CEO",
      organization: "Local Restaurant Group, Bahrain"
    },
    {
      icon: "🏛",
      service: "Core Banking Advisory",
      company: "Digital Transformation for a Bank",
      testimonial: "Bahbeta played a vital role in advising our team during the early stages of our core banking transformation. From mapping requirements to facilitating communication with international vendors, their support was strategic, efficient, and rooted in local market insight. A trusted extension of our technology team.",
      author: "Chief Technology Officer",
      organization: "Tier-2 Bank in Bahrain"
    },
    {
      icon: "💼",
      service: "Card & Acquiring Negotiation",
      company: "Strategic Setup Support",
      testimonial: "We engaged Bahbeta during a crucial phase of negotiating our card issuance and acquiring processing partnerships. Their understanding of both local and regional players made all the difference. They helped us secure the right deal, at the right time, with the right partners — seamlessly.",
      author: "Group Head of Cards",
      organization: "Regional Banking Institution"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Logo Component
  function LogoImage() {
    try {
      const texture = useLoader(THREE.TextureLoader, '/bb_mini.png');
      return (
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      );
    } catch (error) {
      // Fallback to text if image fails
      return (
        <Text
          position={[0, 0, 0]}
          fontSize={1}
          color="#0084FF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#FFFFFF"
        >
          BahBeta
        </Text>
      );
    }
  }







  // Contained Scrolling Theater Component
  function ContainedScrollingTheater() {
    const { camera } = useThree();
    const scrollRef = useRef(0);
    
    useEffect(() => {
      const scrollElement = document.getElementById('theater-scroll');
      if (!scrollElement) return;
      
      const handleScroll = () => {
        const scrollTop = scrollElement.scrollTop;
        const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
        scrollRef.current = scrollTop / scrollHeight;
      };
      
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }, []);
    
    useFrame(() => {
      const scroll = scrollRef.current;
      
      // Subtle camera animation based on scroll
      camera.position.z = 8 + scroll * 2;
      camera.position.y = scroll * 0.5;
      camera.lookAt(0, 0, 0);
    });
    
    return (
      <>
        {/* Minimal lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        {/* Subtle background particles */}
        <Stars radius={100} depth={50} count={1000} factor={1} saturation={0} fade speed={0.5} />
      </>
    );
  }



  const heroContent = {
    title: "Technology That Moves Your Business Forward",
    subtitle: "Custom Solutions. Global Standards. Local Expertise.",
    description: "From mobile apps to AI-powered solutions, from secure payment gateways to smart NFC cards — BahBeta transforms your digital vision into reality.",
    stats: [
      { number: "500+", label: "Projects Delivered" },
      { number: "99.9%", label: "Uptime Guarantee" },
      { number: "24/7", label: "Expert Support" },
      { number: "10+", label: "Years Experience" }
    ]
  };


  return (
    <>
      {/* Mobile optimization styles */}
      <style>{`
        /* Prevent zoom on inputs */
        input, select, textarea {
          font-size: 16px !important;
        }
        
        /* Improve touch targets */
        button, a {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Smooth scrolling for all devices */
        html {
          scroll-behavior: smooth;
        }
        
        /* Optimize for mobile viewport */
        @media (max-width: 768px) {
          .text-3xl { font-size: 1.875rem; }
          .text-4xl { font-size: 2.25rem; }
          .text-5xl { font-size: 3rem; }
          .text-6xl { font-size: 3.75rem; }
        }
        
        /* Scroll margin for fixed header */
        section[id] {
          scroll-margin-top: 80px;
        }
        
        /* Mobile specific scroll margin */
        @media (max-width: 768px) {
          section[id] {
            scroll-margin-top: 60px;
          }
        }
      `}</style>
      
      <div ref={containerRef} className="relative bg-black text-white overflow-hidden touch-manipulation">
        {/* Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full mx-auto mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-light text-gray-300 tracking-wide"
              >
                Loading BahBeta
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bahrain Skyline Image - Using the actual image directly */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/bahrain-skyline.png" 
          alt="Bahrain Skyline"
          className="w-full h-full object-cover object-center opacity-20"
        />
        {/* Very subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
      </div>

      {/* Apple-style Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center">
              {/* Apple-style Logo */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <svg 
                  viewBox="0 0 400 100" 
                  className="h-6 sm:h-7 w-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="75"
                    fill="#0084FF"
                    fontSize="80"
                    fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
                    fontWeight="500"
                    letterSpacing="-0.03em"
                  >
                    bahbeta
                  </text>
                </svg>
              </motion.div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {['Overview', 'Innovation', 'Solutions', 'Contact', 'Privacy'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(`section-${item.toLowerCase()}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-white/90 hover:text-white font-normal text-sm tracking-wide transition-all duration-300"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Desktop Get Started Button */}
            <motion.button
              onClick={() => setShowContactForm(true)}
              className="hidden md:block px-5 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            >
              Get Started
            </motion.button>

            {/* Mobile hamburger button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
              >
                <div className="px-4 py-6 space-y-4">
                  {['Overview', 'Innovation', 'Solutions', 'Contact', 'Privacy'].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        const element = document.getElementById(`section-${item.toLowerCase()}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="block w-full text-left text-white/90 hover:text-white font-normal text-lg py-3 transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => {
                      setShowContactForm(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mt-4 px-6 py-3 bg-white text-black rounded-full font-medium text-base hover:bg-gray-100 transition-all duration-300"
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section id="section-overview" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-14 sm:pt-16">
        <div className="text-center max-w-7xl mx-auto z-10">
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-thin mb-6 sm:mb-8 leading-tight text-white tracking-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              {heroContent.title}
            </motion.h1>
            
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 sm:mb-8 font-light tracking-wide px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
            >
              {heroContent.subtitle}
            </motion.h2>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto font-light px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.6 }}
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-20 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
            >
              <motion.button
                onClick={() => setShowContactForm(true)}
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-black rounded-full font-medium text-base sm:text-lg hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('section-solutions');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 border border-white/30 text-white rounded-full font-medium text-base sm:text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            {heroContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.2 + index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 font-light tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Solutions - Contained Scrolling 3D Experience */}
      <motion.section id="section-solutions" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Contained Scrolling Theater */}
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 relative">
            {/* Fixed 3D Theater Background */}
            <div className="absolute inset-0">
              <Suspense fallback={
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-light text-white mb-8">BahBeta</div>
                    <div className="text-white">Loading 3D Experience...</div>
                  </div>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                  <ContainedScrollingTheater />
                </Canvas>
              </Suspense>
            </div>

            {/* Scrollable Content Overlay */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-none" id="theater-scroll">
              {/* What We Do Section */}
              <div className="h-full flex items-center justify-center">
                <motion.div
                  className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">What We Do</h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-light mb-2">
                    Comprehensive technology services designed to accelerate your business growth
                  </p>
                  <p className="text-sm sm:text-base text-gray-500 font-light mb-8 sm:mb-12">
                    Scroll to explore our solutions
                  </p>
                  <motion.div 
                    className="inline-block"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>

              {/* Individual Service Sections */}
              {services.map((service, index) => (
                <div key={index} className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-12">
                  <motion.div
                    className="max-w-2xl mx-auto w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20 text-center">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 text-white">
                        {service.title}
                      </h3>
                      <h4 className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6 font-light">
                        {service.subtitle}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 leading-relaxed font-light max-w-xl mx-auto">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-w-lg mx-auto">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center text-xs sm:text-sm text-gray-300 justify-center sm:justify-start"
                          >
                            <div className="w-1 h-1 bg-white rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* End Section */}
              <div className="h-full flex items-center justify-center">
                <motion.div
                  className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 sm:mb-8">Ready to Transform?</h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-12 font-light">
                    Let's build something extraordinary together
                  </p>
                  <motion.button
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full text-base sm:text-lg font-medium hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowContactForm(true)}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Carousel Section */}
      <motion.section id="section-innovation" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">What Our Clients Say</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-light max-w-3xl mx-auto px-4">
              Trusted by Industry Leaders Across Bahrain
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-3 sm:mt-4 max-w-4xl mx-auto leading-relaxed px-4">
              At BahBeta, we take pride in building long-term relationships grounded in trust, performance, and results. Here's what some of our valued clients have to say:
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
                >
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 mx-auto max-w-4xl">
                    <div className="text-center">
                      <div className="mb-8">
                        <h4 className="text-2xl font-medium text-white mb-2">
                          {testimonials[currentTestimonial].service}
                        </h4>
                        <p className="text-lg text-gray-400">
                          {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                      
                      <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light italic max-w-3xl mx-auto">
                        "{testimonials[currentTestimonial].testimonial}"
                      </blockquote>
                      
                      <div className="border-t border-white/20 pt-6">
                        <p className="text-white font-medium text-lg">
                          — {testimonials[currentTestimonial].author}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {testimonials[currentTestimonial].organization}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">50+</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 font-light">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">15+</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 font-light">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">500+</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 font-light">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 font-light">Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section id="section-contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-12 font-light leading-relaxed">
              Let's discuss how BahBeta can help you achieve your technology goals with precision and excellence.
            </p>
            
            <motion.div
              className="flex justify-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => setShowContactForm(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-medium text-base sm:text-lg hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Consultation
              </motion.button>
            </motion.div>

            <div className="text-gray-400 space-y-2 font-light">
              <p>Office #2211, Bldg #747, Road #1124, Block #311</p>
              <p>Manama, Kingdom of Bahrain</p>
              <p className="mt-4">+973 33283222 | support@bahbeta.com</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* We Care For You Section - Privacy & Cookies */}
      <motion.section id="section-privacy" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              We Care For You
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-light">
              Your privacy and trust are important to us. Learn how we protect and respect your data.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Tab Navigation - Fixed at top */}
            <div className="flex space-x-4 p-8 sm:p-12 pb-4 border-b border-white/20 bg-white/5 backdrop-blur-sm">
              <motion.button
                onClick={() => setActiveTab('privacy')}
                className={`pb-4 px-2 text-lg font-light transition-colors ${
                  activeTab === 'privacy' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Privacy Policy
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('cookies')}
                className={`pb-4 px-2 text-lg font-light transition-colors ${
                  activeTab === 'cookies' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cookies Policy
              </motion.button>
            </div>

            {/* Scrollable Tab Content */}
            <div className="h-[400px] sm:h-[500px] lg:h-[600px] overflow-y-auto p-8 sm:p-12 pt-8 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
              <AnimatePresence mode="wait">
              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="prose prose-invert max-w-none"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Information We Collect</h3>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-300 leading-relaxed mb-6">
                        We collect information you provide directly to us through our contact forms, consultation requests, and communication with our team.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <span className="text-white font-medium">Contact Information</span>
                          <p className="text-gray-400 mt-2">Name, email address, phone number</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <span className="text-white font-medium">Business Information</span>
                          <p className="text-gray-400 mt-2">Company details, project requirements</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">How We Use Your Information</h3>
                    <div className="space-y-3">
                      {[
                        { title: "Consultation Services", desc: "Respond to your inquiries and provide expert guidance" },
                        { title: "Solution Delivery", desc: "Deliver the technology solutions you request" },
                        { title: "Service Improvement", desc: "Enhance our services and user experience" },
                        { title: "Updates & Communication", desc: "Send relevant updates with your consent" },
                        { title: "Legal Compliance", desc: "Comply with legal obligations and protect our rights" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                          whileHover={{ scale: 1.01, x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h4 className="text-white font-medium mb-2">{item.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Data Protection</h3>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-300 leading-relaxed mb-6">
                        We implement cutting-edge security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                          <span className="text-white font-medium">Encryption</span>
                          <p className="text-gray-400 mt-2">End-to-end data encryption</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                          <span className="text-white font-medium">Access Control</span>
                          <p className="text-gray-400 mt-2">Limited to authorized personnel</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                          <span className="text-white font-medium">Monitoring</span>
                          <p className="text-gray-400 mt-2">24/7 security monitoring</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Your Rights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Access", desc: "View your personal information" },
                        { title: "Update", desc: "Modify your data anytime" },
                        { title: "Delete", desc: "Request data removal" },
                        { title: "Portability", desc: "Export your data" }
                      ].map((right, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h4 className="text-white font-medium mb-2">{right.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{right.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Contact Information</h3>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Questions about your privacy? We're here to help and ensure your data is handled with the utmost care.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <p className="text-white font-medium mb-2">BahBeta Technology Solutions</p>
                          <p className="text-gray-300 text-sm">Office #2211, Bldg #747, Road #1124, Block #311</p>
                          <p className="text-gray-300 text-sm">Manama, Kingdom of Bahrain</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <div className="mb-3">
                            <span className="text-white font-medium">Email:</span>
                            <p className="text-gray-300 text-sm">support@bahbeta.com</p>
                          </div>
                          <div>
                            <span className="text-white font-medium">Phone:</span>
                            <p className="text-gray-300 text-sm">+973 33283222</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 inline-block">
                      <p className="text-gray-400 text-sm font-light">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'cookies' && (
                <motion.div
                  key="cookies"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="prose prose-invert max-w-none"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">What Are Cookies?</h3>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Cookies are small text files stored on your device when you visit our website. Think of them as helpful digital notes that remember your preferences and enhance your browsing experience.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                          <span className="text-white font-medium">Storage</span>
                          <p className="text-gray-400 mt-2">Tiny files on your device</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                          <span className="text-white font-medium">Performance</span>
                          <p className="text-gray-400 mt-2">Faster website loading</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                          <span className="text-white font-medium">Personalization</span>
                          <p className="text-gray-400 mt-2">Customized experience</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Types of Cookies We Use</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { 
                          title: "Essential Cookies", 
                          desc: "Core website functionality",
                          detail: "Enable basic features like page navigation and secure area access"
                        },
                        { 
                          title: "Analytics Cookies", 
                          desc: "Website usage insights",
                          detail: "Help us understand visitor behavior to improve our services"
                        },
                        { 
                          title: "Performance Cookies", 
                          desc: "Speed optimization",
                          detail: "Track page visits to optimize website performance"
                        },
                        { 
                          title: "Functionality Cookies", 
                          desc: "Enhanced features",
                          detail: "Remember your choices for a personalized experience"
                        }
                      ].map((cookie, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="mb-3">
                            <h4 className="text-white font-medium text-lg mb-2">{cookie.title}</h4>
                            <p className="text-gray-300 text-sm font-medium">{cookie.desc}</p>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">{cookie.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Managing Your Cookie Preferences</h3>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-300 leading-relaxed mb-6">
                        You're in complete control of your cookie preferences. Customize your experience by managing your browser settings.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { browser: "Chrome", path: "Settings → Privacy → Site settings → Cookies" },
                          { browser: "Firefox", path: "Options → Privacy → Cookies and Site Data" },
                          { browser: "Safari", path: "Preferences → Privacy → Cookies" },
                          { browser: "Edge", path: "Settings → Site permissions → Cookies" }
                        ].map((browser, index) => (
                          <motion.div
                            key={index}
                            className="bg-white/5 p-4 rounded-lg border border-white/10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="mb-2">
                              <span className="text-white font-medium">{browser.browser}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{browser.path}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Cookie Retention</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                        whileHover={{ scale: 1.01, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mb-4">
                          <h4 className="text-white font-medium text-lg mb-2">Session Cookies</h4>
                          <p className="text-gray-300 text-sm font-medium">Temporary & Secure</p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Automatically deleted when you close your browser. These ensure your session remains secure and don't persist on your device.
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                        whileHover={{ scale: 1.01, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mb-4">
                          <h4 className="text-white font-medium text-lg mb-2">Persistent Cookies</h4>
                          <p className="text-gray-300 text-sm font-medium">Long-term Preferences</p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Remain on your device for a set period to remember your preferences. You can delete them anytime through browser settings.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Contact Information</h3>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Have questions about cookies or need assistance with your preferences? Our team is here to help you navigate your digital experience with confidence.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <div className="mb-3">
                            <span className="text-white font-medium">BahBeta Technology Solutions</span>
                          </div>
                          <p className="text-gray-400 text-sm">Office #2211, Bldg #747, Road #1124, Block #311</p>
                          <p className="text-gray-400 text-sm">Manama, Kingdom of Bahrain</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <div className="mb-3">
                            <span className="text-white font-medium">Email:</span>
                            <p className="text-gray-300 text-sm">support@bahbeta.com</p>
                          </div>
                          <div>
                            <span className="text-white font-medium">Phone:</span>
                            <p className="text-gray-300 text-sm">+973 33283222</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 inline-block">
                      <p className="text-gray-400 text-sm font-light">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-light text-white">Schedule Consultation</h3>
                <motion.button
                  onClick={() => setShowContactForm(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                      placeholder="+973 XXXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service of Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all duration-300"
                  >
                    <option value="" className="bg-gray-900">Select a service</option>
                    <option value="mobile-web" className="bg-gray-900">Mobile & Web Development</option>
                    <option value="pos-payment" className="bg-gray-900">POS & Payment Solutions</option>
                    <option value="nfc-cards" className="bg-gray-900">NFC Business Cards</option>
                    <option value="cybersecurity" className="bg-gray-900">Cybersecurity Advisory</option>
                    <option value="erp-crm" className="bg-gray-900">ERP, CRM & Cloud Services</option>
                    <option value="ai-ml" className="bg-gray-900">AI, ML, AR & VR Development</option>
                    <option value="consultation" className="bg-gray-900">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project requirements, timeline, and goals..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg hover:bg-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Inquiry
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-8 py-4 border border-white/30 text-white rounded-xl font-medium text-lg hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </>
  );
}