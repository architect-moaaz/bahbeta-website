import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float, 
  Sphere,
  Box,
  Cylinder,
  Plane,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';

// Bahrain Financial Harbour - Left spiraling tower
function BahrainFinancialHarbour({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main spiraling tower structure - exactly as in image */}
      {[...Array(25)].map((_, i) => (
        <Box 
          key={i}
          args={[1.2, 0.4, 1.2]} 
          position={[Math.sin(i * 0.15) * 0.1, i * 0.35, 0]}
          rotation={[0, i * 0.08, 0]}
        >
          <meshStandardMaterial 
            color="#E8F0F8" 
            transparent 
            opacity={0.95}
            roughness={0.1}
            metalness={0.4}
          />
        </Box>
      ))}
      {/* Horizontal glass lines */}
      {[...Array(20)].map((_, i) => (
        <Box 
          key={i}
          args={[1.25, 0.05, 1.25]} 
          position={[Math.sin(i * 0.15) * 0.1, i * 0.4, 0]}
          rotation={[0, i * 0.08, 0]}
        >
          <meshBasicMaterial color="#B8D4E8" transparent opacity={0.7} />
        </Box>
      ))}
    </group>
  );
}

// Curved triangular tower - second from left
function CurvedTriangleTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Curved triangular structure with twist - exact match to image */}
      {[...Array(18)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.4, 0]} rotation={[0, i * 0.05, 0]}>
          <cylinderGeometry args={[0.8 - i * 0.02, 0.9 - i * 0.02, 0.35, 3]} />
          <meshStandardMaterial 
            color="#D8E8F0" 
            transparent 
            opacity={0.9}
            roughness={0.15}
            metalness={0.3}
          />
        </mesh>
      ))}
      {/* Glass panel lines */}
      {[...Array(15)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.45, 0]} rotation={[0, i * 0.05, 0]}>
          <ringGeometry args={[0.82 - i * 0.02, 0.85 - i * 0.02, 3]} />
          <meshBasicMaterial color="#B0D0E8" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// White rectangular towers - matching exact image proportions
function WhiteTower({ position, height = 4, width = 0.8 }: { position: [number, number, number], height?: number, width?: number }) {
  return (
    <group position={position}>
      {/* Main tower body - clean white like in image */}
      <Box args={[width, height, width]}>
        <meshStandardMaterial color="#F8F8F8" roughness={0.05} metalness={0.1} />
      </Box>
      {/* Subtle glass lines matching image */}
      {[...Array(Math.floor(height * 4))].map((_, i) => (
        <Box
          key={i}
          args={[width + 0.01, 0.02, width + 0.01]}
          position={[0, -height/2 + (i + 0.5) * 0.25, 0]}
        >
          <meshBasicMaterial color="#E8E8E8" transparent opacity={0.5} />
        </Box>
      ))}
      {/* Vertical lines */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          args={[0.02, height, 0.02]}
          position={[
            -width/2 + (i + 0.5) * (width/4),
            0,
            width/2 + 0.01
          ]}
        >
          <meshBasicMaterial color="#E0E0E0" transparent opacity={0.4} />
        </Box>
      ))}
    </group>
  );
}

// Central twisted/angled tower - exact match to image
function AngledTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main angled structure - matches the Y-shaped tower in image */}
      <mesh rotation={[0, 0, 0.1]}>
        <boxGeometry args={[1.2, 5, 0.3]} />
        <meshStandardMaterial color="#F0F8FF" roughness={0.1} metalness={0.2} />
      </mesh>
      <mesh rotation={[0, 0, -0.1]} position={[0.3, 0, 0]}>
        <boxGeometry args={[1.2, 5, 0.3]} />
        <meshStandardMaterial color="#F0F8FF" roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Glass panels with blue tint */}
      <mesh rotation={[0, 0, 0.1]}>
        <boxGeometry args={[1.18, 4.9, 0.28]} />
        <meshStandardMaterial color="#B8D4E8" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[0, 0, -0.1]} position={[0.3, 0, 0]}>
        <boxGeometry args={[1.18, 4.9, 0.28]} />
        <meshStandardMaterial color="#B8D4E8" transparent opacity={0.8} />
      </mesh>
      {/* Horizontal divider lines */}
      {[...Array(12)].map((_, i) => (
        <group key={i}>
          <Box
            args={[1.25, 0.03, 0.32]}
            position={[0, -2.5 + i * 0.42, 0]}
            rotation={[0, 0, 0.1]}
          >
            <meshBasicMaterial color="#D0D0D0" />
          </Box>
          <Box
            args={[1.25, 0.03, 0.32]}
            position={[0.3, -2.5 + i * 0.42, 0]}
            rotation={[0, 0, -0.1]}
          >
            <meshBasicMaterial color="#D0D0D0" />
          </Box>
        </group>
      ))}
    </group>
  );
}

function RoundTower({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={0.7} rotationIntensity={0.03} floatIntensity={0.02}>
      <group position={position}>
        {/* Cylindrical tower */}
        <Cylinder args={[0.5, 0.5, 3.5, 16]}>
          <meshStandardMaterial color="#F0F8FF" roughness={0.2} metalness={0.4} />
        </Cylinder>
        {/* Glass panels */}
        <Cylinder args={[0.48, 0.48, 3.4, 16]}>
          <meshStandardMaterial color="#D0E8F0" transparent opacity={0.7} />
        </Cylinder>
        {/* Horizontal rings */}
        {[...Array(7)].map((_, i) => (
          <mesh key={i} position={[0, -1.5 + i * 0.5, 0]}>
            <torusGeometry args={[0.52, 0.02, 8, 16]} />
            <meshBasicMaterial color="#B8D4E8" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Mosque({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={0.4} rotationIntensity={0.01} floatIntensity={0.01}>
      <group position={position}>
        {/* Main mosque building */}
        <Box args={[1.2, 0.8, 1.2]}>
          <meshStandardMaterial color="#F8F8F8" roughness={0.3} />
        </Box>
        {/* Central dome */}
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#E0E8F0" roughness={0.2} />
        </mesh>
        {/* Minarets */}
        <Cylinder args={[0.08, 0.08, 1.5, 8]} position={[-0.5, 0.3, -0.5]}>
          <meshStandardMaterial color="#F0F0F0" />
        </Cylinder>
        <Cylinder args={[0.08, 0.08, 1.5, 8]} position={[0.5, 0.3, -0.5]}>
          <meshStandardMaterial color="#F0F0F0" />
        </Cylinder>
        {/* Minaret domes */}
        <mesh position={[-0.5, 1.1, -0.5]}>
          <sphereGeometry args={[0.12, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#E0E8F0" />
        </mesh>
        <mesh position={[0.5, 1.1, -0.5]}>
          <sphereGeometry args={[0.12, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#E0E8F0" />
        </mesh>
        {/* Arches */}
        {[...Array(3)].map((_, i) => (
          <Box key={i} args={[0.2, 0.3, 0.02]} position={[-0.4 + i * 0.4, 0, 0.61]}>
            <meshStandardMaterial color="#D8D8D8" />
          </Box>
        ))}
      </group>
    </Float>
  );
}

function PyramidTower({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.02}>
      <group position={position}>
        {/* Pyramid structure */}
        <mesh>
          <coneGeometry args={[0.8, 4, 4]} />
          <meshStandardMaterial color="#E8F4F8" roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Glass panels */}
        <mesh>
          <coneGeometry args={[0.78, 3.9, 4]} />
          <meshStandardMaterial color="#C8E0F0" transparent opacity={0.8} />
        </mesh>
        {/* Edge lines */}
        {[...Array(4)].map((_, i) => (
          <mesh key={i} rotation={[0, i * Math.PI / 2, 0]}>
            <planeGeometry args={[0.05, 4]} />
            <meshBasicMaterial color="#A0C8E0" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function BahrainWTC({ position }: { position: [number, number, number] }) {
  const turbineRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (turbineRef.current) {
      turbineRef.current.rotation.z += 0.05;
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.02} floatIntensity={0.03}>
      <group position={position}>
        {/* Twin towers */}
        <Box args={[0.4, 4.5, 0.4]} position={[-0.3, 0, 0]}>
          <meshStandardMaterial color="#E8F4F8" roughness={0.1} metalness={0.5} />
        </Box>
        <Box args={[0.4, 4.5, 0.4]} position={[0.3, 0, 0]}>
          <meshStandardMaterial color="#E8F4F8" roughness={0.1} metalness={0.5} />
        </Box>
        {/* Connecting bridges */}
        <Box args={[0.6, 0.1, 0.3]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#D0E8F0" />
        </Box>
        <Box args={[0.6, 0.1, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#D0E8F0" />
        </Box>
        <Box args={[0.6, 0.1, 0.3]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#D0E8F0" />
        </Box>
        {/* Wind turbines */}
        <group ref={turbineRef} position={[0, 1, 0]}>
          <Cylinder args={[0.05, 0.05, 0.3, 8]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
          </Cylinder>
          <Box args={[0.02, 0.8, 0.02]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
          </Box>
          <Box args={[0.02, 0.8, 0.02]} position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 3]}>
            <meshStandardMaterial color="#FFFFFF" />
          </Box>
          <Box args={[0.02, 0.8, 0.02]} position={[0, -0.4, 0]} rotation={[0, 0, -Math.PI / 3]}>
            <meshStandardMaterial color="#FFFFFF" />
          </Box>
        </group>
      </group>
    </Float>
  );
}

function SkylineClouds() {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, index) => {
        cloud.position.x = ((state.clock.elapsedTime * 0.05 + index * 3) % 25) - 12.5;
        cloud.position.y = 4 + Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.2;
      });
    }
  });

  const CloudShape = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
      <Sphere args={[0.5]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[0.3]} position={[0.4, 0, 0]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[0.35]} position={[-0.3, 0.1, 0]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[0.25]} position={[0.2, 0.2, 0]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </Sphere>
    </group>
  );

  return (
    <group ref={cloudsRef}>
      <CloudShape position={[-10, 5, -8]} />
      <CloudShape position={[-5, 4.5, -6]} />
      <CloudShape position={[8, 5.2, -7]} />
      <CloudShape position={[12, 4.8, -9]} />
      <CloudShape position={[0, 6, -10]} />
    </group>
  );
}

function AirplaneWithTrail() {
  const airplaneRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (airplaneRef.current) {
      const time = state.clock.elapsedTime * 0.3;
      airplaneRef.current.position.x = Math.sin(time) * 8;
      airplaneRef.current.position.y = 3 + Math.cos(time * 0.5) * 0.5;
      airplaneRef.current.position.z = Math.cos(time) * 2;
      airplaneRef.current.rotation.y = time + Math.PI / 2;
    }
  });

  return (
    <group ref={airplaneRef}>
      {/* Airplane body */}
      <Box args={[0.8, 0.1, 0.1]}>
        <meshBasicMaterial color="#FFFFFF" />
      </Box>
      {/* Wings */}
      <Box args={[0.1, 0.4, 0.05]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFFFFF" />
      </Box>
      {/* Tail */}
      <Box args={[0.1, 0.2, 0.05]} position={[-0.35, 0.1, 0]}>
        <meshBasicMaterial color="#FFFFFF" />
      </Box>
      {/* Contrail */}
      {[...Array(12)].map((_, i) => (
        <Box 
          key={i}
          args={[0.08, 0.02, 0.02]} 
          position={[-0.6 - i * 0.15, 0, 0]}
        >
          <meshBasicMaterial 
            color="#FFFFFF" 
            transparent 
            opacity={0.8 - i * 0.06}
          />
        </Box>
      ))}
    </group>
  );
}

function BahrainSkylineScene({ currentSection }: { currentSection: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const cameraPositions = [
      { x: 0, y: 2, z: 15 },    // Overview
      { x: -8, y: 1, z: 12 },   // Left side
      { x: 8, y: 1, z: 12 },    // Right side
      { x: 0, y: 6, z: 18 },    // Aerial view
    ];
    
    const target = cameraPositions[currentSection] || cameraPositions[0];
    
    camera.position.lerp(
      new THREE.Vector3(target.x, target.y, target.z),
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 15]} />
      
      {/* Enhanced lighting for glass and metal */}
      <ambientLight intensity={0.3} color="#F0F8FF" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#FFFFFF"
        castShadow
      />
      <directionalLight 
        position={[-10, 5, 5]} 
        intensity={0.4} 
        color="#E8F4F8"
      />
      <pointLight position={[0, 10, 10]} intensity={0.3} color="#B8D4E8" />
      
      {/* Ground plane */}
      <Plane args={[40, 40]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <meshStandardMaterial 
          color="#F8F8F8" 
          transparent 
          opacity={0.9}
          roughness={0.1}
          metalness={0.1}
        />
      </Plane>

      {/* Exact Bahrain Skyline - Left to Right as in image */}
      <BahrainFinancialHarbour position={[-9, 0, 0]} />
      <CurvedTriangleTower position={[-7, -0.5, 0]} />
      <WhiteTower position={[-5, -1, 0]} height={3.5} width={0.7} />
      <WhiteTower position={[-4, -0.8, 0]} height={4.2} width={0.8} />
      <AngledTower position={[-2, 0, 0]} />
      <WhiteTower position={[0, -0.5, 0]} height={3.8} width={0.6} />
      <WhiteTower position={[1, -0.3, 0]} height={4.5} width={0.7} />
      <BahrainWTC position={[2.5, 0, 0]} />
      <WhiteTower position={[4, -1, 0]} height={3.2} width={0.6} />
      <WhiteTower position={[5, -0.8, 0]} height={2.8} width={0.5} />
      <Mosque position={[6.5, -2, 0]} />
      <WhiteTower position={[8, -0.5, 0]} height={3} width={0.6} />
      <PyramidTower position={[9.5, 0, 0]} />
      
      {/* Background buildings - matching image depth */}
      <WhiteTower position={[-6, -2, -3]} height={2.5} width={0.5} />
      <WhiteTower position={[-2, -2, -3]} height={3} width={0.6} />
      <WhiteTower position={[2, -2, -3]} height={2.8} width={0.5} />
      <WhiteTower position={[6, -2, -3]} height={2.3} width={0.4} />

      {/* Animated elements */}
      <SkylineClouds />
      <AirplaneWithTrail />
      
      {/* Atmospheric fog */}
      <fog attach="fog" args={['#F0F8FF', 15, 35]} />
    </>
  );
}

export function BahrainSkylineImmersive() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
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

  const sections = [
    {
      title: "Bahrain Skyline",
      subtitle: "Modern Architecture",
      description: "Experience the iconic skyline of Bahrain in immersive 3D"
    },
    {
      title: "Urban Innovation",
      subtitle: "Smart City Solutions",
      description: "Discover cutting-edge technology integrated into modern architecture"
    },
    {
      title: "Cultural Heritage",
      subtitle: "Traditional Meets Modern",
      description: "Where Islamic architecture harmonizes with contemporary design"
    },
    {
      title: "Future Vision",
      subtitle: "Sustainable Development",
      description: "Leading the way in eco-friendly urban planning"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 overflow-hidden">
      {/* Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-gray-400 border-t-gray-700 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-light text-gray-700">Loading Bahrain Skyline</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Skyline Canvas */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas shadows>
            <BahrainSkylineScene currentSection={currentSection} />
          </Canvas>
        </Suspense>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="fixed top-0 w-full z-40 backdrop-blur-sm bg-white/80 border-b border-gray-300"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">BahBeta</h1>
                <p className="text-xs text-gray-500">Bahrain Experience</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Architecture', 'Innovation', 'Heritage', 'Future'].map((item) => (
                <motion.a
                  key={item}
                  href={`#section-${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-gray-900 font-light transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-light hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <motion.section
          key={index}
          className="relative min-h-screen flex items-center justify-center"
          style={{ y: textY }}
          id={`section-${index}`}
        >
          <div className="text-center max-w-4xl mx-auto px-6 z-10">
            <motion.h1
              className="text-6xl md:text-8xl font-light mb-6 leading-tight text-gray-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {section.title}
            </motion.h1>
            
            <motion.h2
              className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {section.subtitle}
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {section.description}
            </motion.p>

            {index === 0 && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-light hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Skyline
                </motion.button>
                <motion.button
                  className="px-8 py-3 border border-gray-400 text-gray-700 rounded-full font-light hover:border-gray-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}