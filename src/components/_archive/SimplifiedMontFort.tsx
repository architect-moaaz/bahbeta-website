import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  Sphere,
  Box,
  Cylinder,
  Torus,
  MeshDistortMaterial,
  Stars
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
        {/* BahBeta text representation */}
        <mesh position={[-0.8, -0.2, 0.2]}>
          <boxGeometry args={[1.6, 0.4, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </Float>
  );
}

function ServiceSphere({ position, color, scale = 1 }: { 
  position: [number, number, number], 
  color: string, 
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
      
      {/* Service indicator */}
      <mesh position={[position[0], position[1], position[2] + 1.2]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500; // Reduced for better performance
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    
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
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  );
}

function CameraController({ section }: { section: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const targetPositions = [
      { x: 0, y: 0, z: 10 }, // Hero
      { x: -3, y: 2, z: 8 },  // Services
      { x: 3, y: -2, z: 6 },  // About
      { x: 0, y: 3, z: 12 },  // Contact
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

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading 3D Experience...</p>
      </div>
    </div>
  );
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
      <pointLight position={[10, -10, 5]} color="#10B981" intensity={0.3} />
      
      {/* Environment */}
      <Stars radius={50} depth={30} count={500} factor={3} />
      <fog attach="fog" args={['#0F172A', 15, 40]} />
      
      {/* 3D Elements */}
      <FloatingLogo position={[0, 2, 0]} rotation={[0, 0, 0]} />
      
      {/* Service Spheres */}
      <ServiceSphere position={[-3, -1, 2]} color="#3B82F6" />
      <ServiceSphere position={[3, -1, 2]} color="#10B981" />
      <ServiceSphere position={[-3, -4, -2]} color="#8B5CF6" />
      <ServiceSphere position={[3, -4, -2]} color="#F59E0B" />
      <ServiceSphere position={[0, -7, 0]} color="#EF4444" />
      <ServiceSphere position={[0, -10, -3]} color="#06B6D4" />
      
      {/* Particle Field */}
      <ParticleField />
      
      {/* Floating Geometric Elements */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Torus position={[-6, 3, -5]} args={[0.8, 0.3, 16, 32]}>
          <meshStandardMaterial color="#3B82F6" wireframe />
        </Torus>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Cylinder position={[6, -3, -3]} args={[0.4, 0.4, 1.5, 8]}>
          <meshStandardMaterial color="#10B981" transparent opacity={0.8} />
        </Cylinder>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <Box position={[0, 0, -8]} args={[1, 1, 1]}>
          <meshStandardMaterial color="#8B5CF6" wireframe />
        </Box>
      </Float>
    </>
  );
}

export function SimplifiedMontFort() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
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
      {/* Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold"
                >
                  B
                </motion.div>
                
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  BahBeta
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="text-lg text-blue-200"
                >
                  Loading 3D Experience
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas shadows>
            <Scene3D currentSection={currentSection} />
          </Canvas>
        </Suspense>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                B
              </div>
              <div>
                <h1 className="text-xl font-bold">BahBeta</h1>
                <p className="text-xs text-blue-300">3D Experience</p>
              </div>
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {['Experience', 'Services', 'Innovation', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#section-${index}`}
                  className="text-white/80 hover:text-white font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
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
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter
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
          <motion.h1
            className="text-6xl lg:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #06B6D4, #10B981)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Immersive
            <br />
            Technology
          </motion.h1>
          
          <motion.p
            className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 3.5 }}
          >
            Experience the future of business technology with BahBeta's cutting-edge solutions.
            <br />
            Where innovation meets excellence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 4 }}
          >
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-semibold shadow-2xl"
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
              className="px-10 py-4 border-2 border-white/30 backdrop-blur-sm rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                y: -5
              }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
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
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
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
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden h-full">
                  <motion.div
                    className="text-4xl mb-6 inline-block"
                    whileHover={{ scale: 1.2, rotateZ: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-white">
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
            className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
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
            Step into the future of business technology with BahBeta
          </motion.p>

          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xl font-bold shadow-2xl"
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
            Start Your Journey
          </motion.button>
        </div>
      </section>
    </div>
  );
}