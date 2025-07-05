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
  Stars,
  Cloud
} from '@react-three/drei';
import * as THREE from 'three';

// Line-Art Style Building Components
function MinimalistBuilding({ 
  position, 
  width, 
  height, 
  depth, 
  type = 'normal',
  windows = true,
  hasStripes = false,
  hasPattern = false 
}: { 
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  type?: 'normal' | 'triangular' | 'dome' | 'tower';
  windows?: boolean;
  hasStripes?: boolean;
  hasPattern?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const buildingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Line-art inspired materials
  const fillMaterial = new THREE.MeshBasicMaterial({
    color: hovered ? "#F8F8F8" : "#FFFFFF",
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide
  });

  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: "#2C2C2C",
    transparent: true,
    opacity: 1,
    wireframe: false,
    side: THREE.FrontSide
  });

  const BuildingShape = () => {
    switch (type) {
      case 'triangular':
        return (
          <>
            {/* Fill */}
            <mesh>
              <coneGeometry args={[width / 2, height, 8]} />
              <primitive object={fillMaterial} />
            </mesh>
            {/* Outline */}
            <mesh>
              <coneGeometry args={[width / 2 + 0.01, height + 0.01, 8]} />
              <meshBasicMaterial color="#2C2C2C" wireframe transparent opacity={0.9} />
            </mesh>
            {/* Horizontal stripes for detail */}
            {hasStripes && [...Array(Math.floor(height))].map((_, i) => (
              <mesh key={i} position={[0, -height/2 + (i + 0.5) * (height / Math.floor(height)), 0]}>
                <ringGeometry args={[0, width/2 * (1 - i * 0.1/height), 8]} />
                <meshBasicMaterial color="#E5E5E5" transparent opacity={0.3} />
              </mesh>
            ))}
          </>
        );
      case 'dome':
        return (
          <>
            {/* Fill */}
            <mesh>
              <sphereGeometry args={[width / 2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <primitive object={fillMaterial} />
            </mesh>
            {/* Outline */}
            <mesh>
              <sphereGeometry args={[width / 2 + 0.01, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshBasicMaterial color="#2C2C2C" wireframe transparent opacity={0.9} />
            </mesh>
          </>
        );
      case 'tower':
        return (
          <>
            {/* Fill */}
            <mesh>
              <cylinderGeometry args={[width / 3, width / 2, height, 8]} />
              <primitive object={fillMaterial} />
            </mesh>
            {/* Outline */}
            <mesh>
              <cylinderGeometry args={[width / 3 + 0.01, width / 2 + 0.01, height + 0.01, 8]} />
              <meshBasicMaterial color="#2C2C2C" wireframe transparent opacity={0.9} />
            </mesh>
          </>
        );
      default:
        return (
          <>
            {/* Fill */}
            <Box args={[width, height, depth]}>
              <primitive object={fillMaterial} />
            </Box>
            {/* Outline */}
            <Box args={[width + 0.02, height + 0.02, depth + 0.02]}>
              <meshBasicMaterial color="#2C2C2C" wireframe transparent opacity={0.9} />
            </Box>
            {/* Horizontal stripes pattern */}
            {hasStripes && [...Array(Math.floor(height * 2))].map((_, i) => (
              <Box
                key={i}
                args={[width * 0.9, 0.05, depth * 0.9]}
                position={[0, -height/2 + (i + 0.5) * 0.3, 0]}
              >
                <meshBasicMaterial color="#E8E8E8" transparent opacity={0.4} />
              </Box>
            ))}
            {/* Diagonal pattern */}
            {hasPattern && [...Array(Math.floor(width * 3))].map((_, i) => (
              <Box
                key={i}
                args={[0.03, height * 0.9, depth * 0.9]}
                position={[-width/2 + (i + 0.5) * 0.25, 0, 0]}
              >
                <meshBasicMaterial color="#EEEEEE" transparent opacity={0.3} />
              </Box>
            ))}
          </>
        );
    }
  };

  return (
    <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.1}>
      <group 
        ref={buildingRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <BuildingShape />

        {/* Line-art style windows */}
        {windows && type === 'normal' && (
          <group>
            {[...Array(Math.floor(height * 1.5))].map((_, floor) => (
              <group key={floor}>
                {[...Array(Math.floor(width * 2.5))].map((_, window) => (
                  <group key={window}>
                    {/* Window frame outline */}
                    <Box
                      position={[
                        -width / 2 + (window + 0.5) * 0.25,
                        -height / 2 + (floor + 0.5) * 0.4,
                        depth / 2 + 0.02
                      ]}
                      args={[0.12, 0.15, 0.01]}
                    >
                      <meshBasicMaterial color="#2C2C2C" />
                    </Box>
                    {/* Window fill */}
                    <Box
                      position={[
                        -width / 2 + (window + 0.5) * 0.25,
                        -height / 2 + (floor + 0.5) * 0.4,
                        depth / 2 + 0.01
                      ]}
                      args={[0.1, 0.13, 0.005]}
                    >
                      <meshBasicMaterial 
                        color={hovered ? "#B8D4F0" : "#F0F8FF"} 
                        transparent
                        opacity={0.7}
                      />
                    </Box>
                    {/* Window cross lines */}
                    <Box
                      position={[
                        -width / 2 + (window + 0.5) * 0.25,
                        -height / 2 + (floor + 0.5) * 0.4,
                        depth / 2 + 0.015
                      ]}
                      args={[0.005, 0.13, 0.005]}
                    >
                      <meshBasicMaterial color="#2C2C2C" />
                    </Box>
                    <Box
                      position={[
                        -width / 2 + (window + 0.5) * 0.25,
                        -height / 2 + (floor + 0.5) * 0.4,
                        depth / 2 + 0.015
                      ]}
                      args={[0.1, 0.005, 0.005]}
                    >
                      <meshBasicMaterial color="#2C2C2C" />
                    </Box>
                  </group>
                ))}
              </group>
            ))}
          </group>
        )}

        {/* Architectural details based on image style */}
        {type === 'normal' && (
          <>
            {/* Rooftop elements */}
            <Box args={[width * 0.8, 0.1, depth * 0.8]} position={[0, height/2 + 0.05, 0]}>
              <meshBasicMaterial color="#DDDDDD" />
            </Box>
            <Box args={[width * 0.8 + 0.02, 0.12, depth * 0.8 + 0.02]} position={[0, height/2 + 0.05, 0]}>
              <meshBasicMaterial color="#2C2C2C" wireframe />
            </Box>
            
            {/* Base element */}
            <Box args={[width * 1.1, 0.15, depth * 1.1]} position={[0, -height/2 - 0.075, 0]}>
              <meshBasicMaterial color="#F5F5F5" />
            </Box>
            <Box args={[width * 1.1 + 0.02, 0.17, depth * 1.1 + 0.02]} position={[0, -height/2 - 0.075, 0]}>
              <meshBasicMaterial color="#2C2C2C" wireframe />
            </Box>
          </>
        )}
      </group>
    </Float>
  );
}

// Animated Airplane
function MinimalistAirplane({ path, speed = 1 }: { path: THREE.Vector3[]; speed?: number }) {
  const airplaneRef = useRef<THREE.Group>(null);
  const [currentPoint, setCurrentPoint] = useState(0);

  useFrame((state) => {
    if (airplaneRef.current && path.length > 1) {
      const progress = (state.clock.elapsedTime * speed * 0.1) % 1;
      const pointIndex = Math.floor(progress * (path.length - 1));
      const nextIndex = (pointIndex + 1) % path.length;
      const localProgress = (progress * (path.length - 1)) % 1;

      const currentPos = path[pointIndex];
      const nextPos = path[nextIndex];
      
      airplaneRef.current.position.lerpVectors(currentPos, nextPos, localProgress);
      
      // Make airplane look forward
      const direction = new THREE.Vector3().subVectors(nextPos, currentPos).normalize();
      airplaneRef.current.lookAt(
        airplaneRef.current.position.x + direction.x,
        airplaneRef.current.position.y + direction.y,
        airplaneRef.current.position.z + direction.z
      );
    }
  });

  return (
    <group ref={airplaneRef}>
      {/* Airplane body - line art style */}
      <Box args={[0.6, 0.08, 0.08]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFFFFF" />
      </Box>
      <Box args={[0.62, 0.1, 0.1]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#2C2C2C" wireframe />
      </Box>
      
      {/* Wings - minimal style */}
      <Box args={[0.08, 0.3, 0.03]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFFFFF" />
      </Box>
      <Box args={[0.1, 0.32, 0.05]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#2C2C2C" wireframe />
      </Box>
      
      {/* Tail */}
      <Box args={[0.08, 0.15, 0.03]} position={[-0.25, 0.08, 0]}>
        <meshBasicMaterial color="#FFFFFF" />
      </Box>
      <Box args={[0.1, 0.17, 0.05]} position={[-0.25, 0.08, 0]}>
        <meshBasicMaterial color="#2C2C2C" wireframe />
      </Box>

      {/* Contrail - dotted line effect */}
      {[...Array(8)].map((_, i) => (
        <Box 
          key={i}
          args={[0.08, 0.02, 0.02]} 
          position={[-0.8 - i * 0.12, 0, 0]}
        >
          <meshBasicMaterial 
            color="#D0D0D0" 
            transparent 
            opacity={0.8 - i * 0.1}
          />
        </Box>
      ))}
    </group>
  );
}

// Flying Birds - Line Art Style
function FlyingBirds() {
  const birdsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (birdsRef.current) {
      birdsRef.current.children.forEach((bird, index) => {
        bird.position.x = -15 + (state.clock.elapsedTime * 0.5 + index * 2) % 30;
        bird.position.y = 3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.5;
        bird.rotation.z = Math.sin(state.clock.elapsedTime * 4 + index) * 0.1;
      });
    }
  });

  return (
    <group ref={birdsRef}>
      {[...Array(6)].map((_, i) => (
        <group key={i}>
          {/* Bird body - line art style */}
          <Box args={[0.08, 0.015, 0.015]}>
            <meshBasicMaterial color="#FFFFFF" />
          </Box>
          <Box args={[0.1, 0.02, 0.02]}>
            <meshBasicMaterial color="#2C2C2C" wireframe />
          </Box>
          
          {/* Bird wings - V-shaped line art */}
          <Box args={[0.015, 0.06, 0.015]} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial color="#FFFFFF" />
          </Box>
          <Box args={[0.02, 0.08, 0.02]} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial color="#2C2C2C" wireframe />
          </Box>
          
          <Box args={[0.015, 0.06, 0.015]} rotation={[0, 0, -Math.PI / 4]}>
            <meshBasicMaterial color="#FFFFFF" />
          </Box>
          <Box args={[0.02, 0.08, 0.02]} rotation={[0, 0, -Math.PI / 4]}>
            <meshBasicMaterial color="#2C2C2C" wireframe />
          </Box>
        </group>
      ))}
    </group>
  );
}

// Minimalist Clouds - Line Art Style
function MinimalistClouds() {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, index) => {
        cloud.position.x = ((state.clock.elapsedTime * 0.1 + index * 5) % 20) - 10;
        cloud.position.y = 4 + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.3;
      });
    }
  });

  const CloudShape = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
      {/* Cloud fill - white with high opacity */}
      <Sphere args={[0.4]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95} />
      </Sphere>
      <Sphere args={[0.3]} position={[0.3, 0, 0]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95} />
      </Sphere>
      <Sphere args={[0.35]} position={[-0.2, 0.1, 0]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95} />
      </Sphere>
      
      {/* Cloud outline - dark line art style */}
      <group>
        <Sphere args={[0.41]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#2C2C2C" wireframe transparent opacity={0.8} />
        </Sphere>
        <Sphere args={[0.31]} position={[0.3, 0, 0]}>
          <meshBasicMaterial color="#2C2C2C" wireframe transparent opacity={0.8} />
        </Sphere>
        <Sphere args={[0.36]} position={[-0.2, 0.1, 0]}>
          <meshBasicMaterial color="#2C2C2C" wireframe transparent opacity={0.8} />
        </Sphere>
      </group>

      {/* Inner cloud details for line art effect */}
      <group>
        <Sphere args={[0.2]} position={[0.1, 0, 0]}>
          <meshBasicMaterial color="#F5F5F5" transparent opacity={0.6} />
        </Sphere>
        <Sphere args={[0.15]} position={[-0.1, 0.05, 0]}>
          <meshBasicMaterial color="#F5F5F5" transparent opacity={0.6} />
        </Sphere>
        <Sphere args={[0.18]} position={[0.2, -0.05, 0]}>
          <meshBasicMaterial color="#F5F5F5" transparent opacity={0.6} />
        </Sphere>
      </group>
    </group>
  );

  return (
    <group ref={cloudsRef}>
      <CloudShape position={[-8, 4, -5]} />
      <CloudShape position={[-3, 5, -3]} />
      <CloudShape position={[5, 4.5, -4]} />
      <CloudShape position={[10, 5.5, -6]} />
    </group>
  );
}

// Main Skyline Scene
function MinimalistSkylineScene({ currentSection }: { currentSection: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const cameraPositions = [
      { x: 0, y: 2, z: 12 },    // Overview
      { x: -5, y: 1, z: 8 },    // Left side
      { x: 5, y: 1, z: 8 },     // Right side
      { x: 0, y: 4, z: 15 },    // Aerial view
    ];
    
    const target = cameraPositions[currentSection] || cameraPositions[0];
    
    camera.position.lerp(
      new THREE.Vector3(target.x, target.y, target.z),
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  // Airplane flight path
  const airplanePath = [
    new THREE.Vector3(-12, 3, 2),
    new THREE.Vector3(-6, 3.5, 1),
    new THREE.Vector3(0, 4, 0),
    new THREE.Vector3(6, 3.5, -1),
    new THREE.Vector3(12, 3, -2),
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 12]} />
      
      {/* Lighting for minimalist aesthetic */}
      <ambientLight intensity={0.6} color="#FFFFFF" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#FFFFFF"
        castShadow
      />
      
      {/* Ground plane */}
      <Plane args={[30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <meshStandardMaterial 
          color="#F0F0F0" 
          transparent 
          opacity={0.8}
        />
      </Plane>

      {/* Skyline Buildings - inspired by your image */}
      {/* Left side buildings */}
      <MinimalistBuilding position={[-8, -1, 0]} width={1} height={3} depth={1} type="tower" />
      <MinimalistBuilding position={[-6.5, -0.5, 0]} width={1.2} height={4} depth={1.2} type="triangular" />
      <MinimalistBuilding position={[-5, -1.5, 0]} width={0.8} height={2} depth={0.8} />
      
      {/* Center buildings */}
      <MinimalistBuilding position={[-3, 0, 0]} width={1.5} height={5} depth={1.2} />
      <MinimalistBuilding position={[-1, -0.5, 0]} width={2} height={4} depth={1.5} type="dome" />
      <MinimalistBuilding position={[1, 0.5, 0]} width={1.8} height={6} depth={1.3} />
      <MinimalistBuilding position={[3, -1, 0]} width={1.2} height={3} depth={1} />
      
      {/* Right side buildings */}
      <MinimalistBuilding position={[5, 0, 0]} width={1.5} height={5} depth={1.2} />
      <MinimalistBuilding position={[6.5, -0.5, 0]} width={1} height={4} depth={1} type="triangular" />
      <MinimalistBuilding position={[8, -1, 0]} width={1.3} height={3.5} depth={1.1} />
      
      {/* Background buildings */}
      <MinimalistBuilding position={[-4, -2, -3]} width={0.8} height={2.5} depth={0.8} />
      <MinimalistBuilding position={[0, -1.5, -2]} width={1.2} height={3.5} depth={1} />
      <MinimalistBuilding position={[4, -2, -3]} width={0.9} height={2.8} depth={0.9} />

      {/* Animated elements */}
      <MinimalistClouds />
      <FlyingBirds />
      <MinimalistAirplane path={airplanePath} speed={1.5} />
      
      {/* Additional flying elements */}
      <MinimalistAirplane 
        path={[
          new THREE.Vector3(12, 2.5, 3),
          new THREE.Vector3(6, 3, 2),
          new THREE.Vector3(0, 3.5, 1),
          new THREE.Vector3(-6, 3, 0),
          new THREE.Vector3(-12, 2.5, -1),
        ]} 
        speed={0.8} 
      />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#F5F5F5', 8, 25]} />
    </>
  );
}

export function MinimalistSkylineExperience() {
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
      title: "Clean Innovation",
      subtitle: "Minimalist Design Philosophy",
      description: "Where simplicity meets sophistication in digital solutions"
    },
    {
      title: "Structured Growth",
      subtitle: "Building Digital Foundations",
      description: "Creating robust architectures for lasting business success"
    },
    {
      title: "Connected Solutions",
      subtitle: "Seamless Integration",
      description: "Linking every aspect of your business ecosystem"
    },
    {
      title: "Future Vision",
      subtitle: "Tomorrow's Technology Today",
      description: "Pioneering the next generation of business solutions"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-gray-50 to-white text-gray-900 overflow-hidden">
      {/* Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-light text-gray-600">Building Experience</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Skyline Canvas */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas shadows>
            <MinimalistSkylineScene currentSection={currentSection} />
          </Canvas>
        </Suspense>
      </div>

      {/* Minimalist Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="fixed top-0 w-full z-40 backdrop-blur-sm bg-white/80 border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">BahBeta</h1>
                <p className="text-xs text-gray-500">Minimalist Solutions</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Design', 'Build', 'Connect', 'Innovate'].map((item) => (
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
              className="px-6 py-2 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
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
              className="text-6xl md:text-8xl font-light mb-6 leading-tight text-gray-900"
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
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Solutions
                </motion.button>
                <motion.button
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-light hover:border-gray-400 transition-colors"
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