import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  Text3D,
  Sphere,
  Box,
  Cylinder,
  Torus,
  MeshDistortMaterial,
  Cloud,
  Stars,
  Trail
} from '@react-three/drei';
import * as THREE from 'three';

// 3D Scene Components
function FloatingLogo({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} rotation={rotation}>
        <Box ref={meshRef} args={[2, 2, 0.3]} position={[0, 0, 0]}>
          <MeshDistortMaterial 
            color="#3B82F6" 
            distort={0.1} 
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Box>
        {/* Simple 3D text alternative */}
        <mesh position={[-0.8, -0.2, 0.2]}>
          <boxGeometry args={[1.6, 0.4, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </Float>
  );
}

function ServiceSphere({ position, color, icon, scale = 1 }: { 
  position: [number, number, number], 
  color: string, 
  icon: string,
  scale?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.scale.setScalar(
        scale + (hovered ? 0.2 : 0) + Math.sin(state.clock.elapsedTime * 2) * 0.05
      );
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere
        ref={meshRef}
        position={position}
        args={[1, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial 
          color={color} 
          distort={0.2} 
          speed={3}
          roughness={0.2}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Sphere>
      
      {/* Icon overlay - simplified */}
      <mesh position={[position[0], position[1], position[2] + 1.2]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#3B82F6" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    
    colors[i * 3] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.8;
    colors[i * 3 + 2] = 1;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0005;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} />
    </points>
  );
}

function CameraController({ section }: { section: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const targetPositions = [
      { x: 0, y: 0, z: 10 }, // Hero
      { x: -5, y: 2, z: 8 },  // Services
      { x: 5, y: -2, z: 6 },  // About
      { x: 0, y: 5, z: 12 },  // Contact
    ];
    
    const target = targetPositions[section] || targetPositions[0];
    
    camera.position.lerp(
      new THREE.Vector3(target.x, target.y, target.z),
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene3D({ currentSection }: { currentSection: number }) {
  return (
    <>
      <CameraController section={currentSection} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#3B82F6" intensity={0.5} />
      
      {/* Environment */}
      <Stars radius={100} depth={50} count={1000} factor={4} />
      <fog attach="fog" args={['#0F172A', 20, 60]} />
      
      {/* 3D Elements */}
      <FloatingLogo position={[0, 2, 0]} rotation={[0, 0, 0]} />
      
      {/* Service Spheres */}
      <ServiceSphere position={[-4, -1, 2]} color="#3B82F6" icon="📱" />
      <ServiceSphere position={[4, -1, 2]} color="#10B981" icon="💳" />
      <ServiceSphere position={[-4, -4, -2]} color="#8B5CF6" icon="🔗" />
      <ServiceSphere position={[4, -4, -2]} color="#F59E0B" icon="🛡️" />
      <ServiceSphere position={[0, -7, 0]} color="#EF4444" icon="☁️" />
      <ServiceSphere position={[0, -10, -3]} color="#06B6D4" icon="🤖" />
      
      {/* Particle Field */}
      <ParticleField />
      
      {/* Floating Geometric Elements */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Torus position={[-8, 3, -5]} args={[1, 0.3, 16, 32]}>
          <meshStandardMaterial color="#3B82F6" wireframe />
        </Torus>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Cylinder position={[8, -3, -3]} args={[0.5, 0.5, 2, 8]}>
          <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
        </Cylinder>
      </Float>
    </>
  );
}

export function MontFortInspiredBahBeta() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrolled / windowHeight);
      setCurrentSection(Math.min(section, 3));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "App Development",
      description: "Next-generation mobile and web applications with immersive user experiences",
      features: ["Cross-Platform Solutions", "AI Integration", "Real-time Analytics"],
      icon: "📱",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Payment Systems",
      description: "Advanced payment processing with secure, scalable infrastructure",
      features: ["Multi-Currency Support", "Fraud Detection", "Real-time Processing"],
      icon: "💳",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Smart Networking",
      description: "Revolutionary NFC business cards with digital integration",
      features: ["Premium Materials", "Analytics Dashboard", "CRM Integration"],
      icon: "🔗",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Cybersecurity",
      description: "Enterprise-grade security solutions and advisory services",
      features: ["Risk Assessment", "Compliance Auditing", "24/7 Monitoring"],
      icon: "🛡️",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure with global technology partnerships",
      features: ["AWS/Azure/Oracle", "Managed Services", "Global Support"],
      icon: "☁️",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "AI & Future Tech",
      description: "Cutting-edge AI, ML, AR, and VR solutions for tomorrow's challenges",
      features: ["Machine Learning", "Computer Vision", "Immersive Experiences"],
      icon: "🤖",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-slate-900 text-white overflow-hidden">
      {/* Cinematic Loading Sequence */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 180],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-4xl font-bold"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  B
                </motion.div>
                
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  BahBeta
                </motion.h1>
                
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-xl text-blue-200"
                >
                  Initializing Immersive Experience
                </motion.p>
                
                <motion.div
                  className="mt-8 w-64 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: 256 }}
                  transition={{ duration: 2.5, delay: 0.5 }}
                >
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene3D currentSection={currentSection} />
          </Suspense>
        </Canvas>
      </div>

      {/* Cinematic Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              style={{
                transform: `translate3d(${mousePosition.x * 2}px, ${mousePosition.y * 2}px, 0)`
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold transform-gpu">
                B
              </div>
              <div>
                <h1 className="text-xl font-bold">BahBeta</h1>
                <p className="text-xs text-blue-300">Immersive Technology</p>
              </div>
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {['Experience', 'Services', 'Innovation', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#section-${index}`}
                  className="text-white/80 hover:text-white font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
                  style={{
                    transform: `translate3d(${mousePosition.x * 1}px, ${mousePosition.y * 0.5}px, 0)`
                  }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter Experience
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center"
        style={{ y: textY, scale: scaleTransform }}
        id="section-0"
      >
        <div className="text-center max-w-6xl mx-auto px-6 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 4 }}
            className="mb-8"
          >
            <span className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
              🚀 Next-Generation Technology Solutions
            </span>
          </motion.div>

          <motion.h1
            className="text-7xl lg:text-9xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 4.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #06B6D4, #10B981)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: `translate3d(${mousePosition.x * 5}px, ${mousePosition.y * 3}px, 0)`,
            }}
          >
            Immersive
            <br />
            Excellence
          </motion.h1>
          
          <motion.p
            className="text-2xl lg:text-3xl text-blue-200 mb-12 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 5 }}
            style={{
              transform: `translate3d(${mousePosition.x * 2}px, ${mousePosition.y * 1}px, 0)`
            }}
          >
            Where cutting-edge technology meets innovative business solutions.
            <br />
            Experience the future of digital transformation.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 5.5 }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Solutions
            </motion.button>
            <motion.button
              className="px-12 py-4 border-2 border-white/30 backdrop-blur-sm rounded-full text-xl font-semibold hover:bg-white/10 transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                borderColor: 'rgba(255, 255, 255, 0.6)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Floating UI Elements */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            transform: `translate3d(-50%, ${mousePosition.y * 5}px, 0)`
          }}
        >
          <div className="w-8 h-16 border-2 border-white/40 rounded-full relative backdrop-blur-sm">
            <motion.div
              className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-white/60 rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-center mt-4 text-white/60 text-sm">Scroll to explore</p>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section className="relative py-32 z-10" id="section-1">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Our Solutions
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Six dimensions of technological excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  z: 50
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden h-full">
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    animate={{
                      background: [
                        `linear-gradient(45deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`,
                        `linear-gradient(90deg, ${service.color.split(' ')[3]}, ${service.color.split(' ')[1]})`,
                        `linear-gradient(45deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Service icon */}
                  <motion.div
                    className="text-5xl mb-6 inline-block"
                    whileHover={{ 
                      scale: 1.3, 
                      rotateZ: 360,
                      textShadow: "0 0 20px rgba(255,255,255,0.8)"
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    {service.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center text-sm text-blue-200"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Holographic border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
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
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 z-10" id="section-3">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Ready to Transform?
          </motion.h2>

          <motion.p
            className="text-xl text-blue-200 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            Step into the future of business technology
          </motion.p>

          <motion.button
            className="px-16 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-2xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl"
            whileHover={{ 
              scale: 1.1, 
              y: -10,
              boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Enter the Experience
          </motion.button>
        </div>
      </section>
    </div>
  );
}