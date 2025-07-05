import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
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
  Plane,
  MeshDistortMaterial,
  Stars,
  Cloud,
  Sky
} from '@react-three/drei';
import * as THREE from 'three';

// Bahrain Island Terrain Component
function BahrainTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create Bahrain archipelago shape
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 15, 100, 75);
    const positions = geo.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Create main Bahrain island shape
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      let height = 0;
      
      // Main island (larger)
      if (distanceFromCenter < 8) {
        height = Math.max(0, 0.8 - distanceFromCenter * 0.1) + 
                Math.sin(x * 0.5) * 0.2 + 
                Math.cos(y * 0.3) * 0.15;
      }
      
      // Muharraq island (northeast)
      const muharraqDist = Math.sqrt((x - 3) * (x - 3) + (y - 4) * (y - 4));
      if (muharraqDist < 2.5) {
        height = Math.max(height, 0.5 - muharraqDist * 0.2);
      }
      
      // Sitra island (southeast)
      const sitraDist = Math.sqrt((x - 2) * (x - 2) + (y + 3) * (y + 3));
      if (sitraDist < 1.5) {
        height = Math.max(height, 0.4 - sitraDist * 0.3);
      }
      
      // Small northern islands
      const northIslandDist = Math.sqrt((x - 1) * (x - 1) + (y - 6) * (y - 6));
      if (northIslandDist < 1) {
        height = Math.max(height, 0.3 - northIslandDist * 0.3);
      }
      
      positions[i + 2] = height;
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -5, -10]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="#D4A574"
        roughness={0.8}
        metalness={0.1}
        wireframe={false}
      />
    </mesh>
  );
}

// Arabian Gulf Water with animated waves
function ArabianGulfWater() {
  const waterRef = useRef<THREE.Mesh>(null);
  
  // Create animated water geometry
  const waterGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 50, 50, 50); // Reduced complexity for better performance
    return geo;
  }, []);
  
  useFrame((state) => {
    if (waterRef.current) {
      const geometry = waterRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      
      // Animate wave positions
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const waveHeight = Math.sin(x * 0.1 + state.clock.elapsedTime * 2) * 0.05 +
                          Math.cos(y * 0.1 + state.clock.elapsedTime * 1.5) * 0.03;
        positions[i + 2] = waveHeight;
      }
      
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      
      // Animate water material
      const material = waterRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh
      ref={waterRef}
      geometry={waterGeometry}
      position={[0, -5.5, -10]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial
        color="#006B96"
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

// Realistic Manama Skyline with iconic buildings
function RealisticManamaSkyline() {
  return (
    <group>
      {/* Bahrain World Trade Center - Iconic twin towers with wind turbines */}
      <BahrainWorldTradeCenter />
      
      {/* Bahrain Financial Harbour */}
      <BahrainFinancialHarbour />
      
      {/* Four Seasons Hotel Bahrain Bay */}
      <FourSeasonsHotel />
      
      {/* United Tower */}
      <UnitedTower />
      
      {/* Bahrain Bay towers */}
      <BahrainBayTowers />
      
      {/* Downtown Manama buildings */}
      <DowntownBuildings />
    </group>
  );
}

// Bahrain World Trade Center - Most iconic building
function BahrainWorldTradeCenter() {
  const tower1Ref = useRef<THREE.Group>(null);
  const tower2Ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (tower1Ref.current && tower2Ref.current) {
      // Subtle swaying animation
      const sway = Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
      tower1Ref.current.rotation.z = sway;
      tower2Ref.current.rotation.z = -sway;
    }
  });

  return (
    <group position={[2.4, -3, -8]}>
      {/* Tower 1 */}
      <group ref={tower1Ref}>
        <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.05}>
          {/* Main tower structure */}
          <Box position={[-0.4, 2, 0]} args={[0.6, 4, 0.4]}>
            <meshStandardMaterial 
              color="#E8E8E8" 
              roughness={0.2} 
              metalness={0.8}
              emissive="#4A90E2"
              emissiveIntensity={0.1}
            />
          </Box>
          
          {/* Curved sections */}
          <Cylinder position={[-0.4, 1, 0]} args={[0.3, 0.3, 0.5]} rotation={[0, 0, Math.PI / 6]}>
            <meshStandardMaterial color="#B8C5D6" roughness={0.3} metalness={0.7} />
          </Cylinder>
          <Cylinder position={[-0.4, 3, 0]} args={[0.3, 0.3, 0.5]} rotation={[0, 0, -Math.PI / 6]}>
            <meshStandardMaterial color="#B8C5D6" roughness={0.3} metalness={0.7} />
          </Cylinder>
        </Float>
      </group>

      {/* Tower 2 */}
      <group ref={tower2Ref}>
        <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.05}>
          <Box position={[0.4, 2, 0]} args={[0.6, 4, 0.4]}>
            <meshStandardMaterial 
              color="#E8E8E8" 
              roughness={0.2} 
              metalness={0.8}
              emissive="#4A90E2"
              emissiveIntensity={0.1}
            />
          </Box>
          
          {/* Curved sections */}
          <Cylinder position={[0.4, 1, 0]} args={[0.3, 0.3, 0.5]} rotation={[0, 0, -Math.PI / 6]}>
            <meshStandardMaterial color="#B8C5D6" roughness={0.3} metalness={0.7} />
          </Cylinder>
          <Cylinder position={[0.4, 3, 0]} args={[0.3, 0.3, 0.5]} rotation={[0, 0, Math.PI / 6]}>
            <meshStandardMaterial color="#B8C5D6" roughness={0.3} metalness={0.7} />
          </Cylinder>
        </Float>
      </group>

      {/* Wind turbines (simplified representation) */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <Cylinder position={[0, 4.2, 0]} args={[0.05, 0.05, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Cylinder>
        {/* Turbine blades */}
        {[0, 120, 240].map((angle, index) => (
          <Box 
            key={index}
            position={[
              Math.sin((angle * Math.PI) / 180) * 0.15,
              4.2,
              Math.cos((angle * Math.PI) / 180) * 0.15
            ]} 
            args={[0.3, 0.02, 0.05]}
            rotation={[0, (angle * Math.PI) / 180, 0]}
          >
            <meshStandardMaterial color="#FFFFFF" />
          </Box>
        ))}
      </Float>
    </group>
  );
}

// Bahrain Financial Harbour
function BahrainFinancialHarbour() {
  return (
    <group position={[1.4, -3.5, -7]}>
      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.08}>
        {/* East Tower */}
        <Box position={[-0.3, 1.5, 0]} args={[0.5, 3, 0.4]}>
          <meshStandardMaterial 
            color="#B8C5D6" 
            roughness={0.1} 
            metalness={0.9}
            emissive="#5D9CEC"
            emissiveIntensity={0.05}
          />
        </Box>
        
        {/* West Tower */}
        <Box position={[0.3, 1.5, 0]} args={[0.5, 3, 0.4]}>
          <meshStandardMaterial 
            color="#B8C5D6" 
            roughness={0.1} 
            metalness={0.9}
            emissive="#5D9CEC"
            emissiveIntensity={0.05}
          />
        </Box>
        
        {/* Connecting bridge */}
        <Box position={[0, 2.8, 0]} args={[0.8, 0.2, 0.3]}>
          <meshStandardMaterial color="#DCDCDC" roughness={0.3} metalness={0.6} />
        </Box>
        
        {/* Base structure */}
        <Box position={[0, 0, 0]} args={[1, 0.8, 0.8]}>
          <meshStandardMaterial color="#A0A0A0" roughness={0.4} metalness={0.5} />
        </Box>
      </Float>
    </group>
  );
}

// Four Seasons Hotel Bahrain Bay
function FourSeasonsHotel() {
  return (
    <Float speed={0.3} rotationIntensity={0.03} floatIntensity={0.06}>
      <group position={[3.5, -3, -7.5]}>
        {/* Main hotel structure */}
        <Box position={[0, 1.75, 0]} args={[0.8, 3.5, 0.6]}>
          <meshStandardMaterial 
            color="#F5F5DC" 
            roughness={0.2} 
            metalness={0.3}
            emissive="#FFD700"
            emissiveIntensity={0.03}
          />
        </Box>
        
        {/* Hotel crown/top feature */}
        <Cylinder position={[0, 3.7, 0]} args={[0.3, 0.4, 0.4]}>
          <meshStandardMaterial color="#DAA520" roughness={0.1} metalness={0.8} />
        </Cylinder>
        
        {/* Bay-facing windows (glass effect) */}
        <Box position={[0, 1.75, 0.31]} args={[0.7, 3.2, 0.02]}>
          <meshStandardMaterial 
            color="#87CEEB" 
            transparent 
            opacity={0.3} 
            roughness={0.1} 
            metalness={0.9}
          />
        </Box>
      </group>
    </Float>
  );
}

// United Tower
function UnitedTower() {
  return (
    <Float speed={0.35} rotationIntensity={0.04} floatIntensity={0.07}>
      <group position={[0.8, -3.8, -6.5]}>
        <Box position={[0, 1.25, 0]} args={[0.4, 2.5, 0.3]}>
          <meshStandardMaterial 
            color="#C0C0C0" 
            roughness={0.3} 
            metalness={0.7}
            emissive="#4169E1"
            emissiveIntensity={0.02}
          />
        </Box>
        
        {/* Tower top */}
        <Cylinder position={[0, 2.6, 0]} args={[0.15, 0.2, 0.3]}>
          <meshStandardMaterial color="#B0B0B0" roughness={0.2} metalness={0.8} />
        </Cylinder>
      </group>
    </Float>
  );
}

// Bahrain Bay Towers
function BahrainBayTowers() {
  const towers = [
    { pos: [4.2, -3.8, -6.8], height: 2.2, color: "#D3D3D3" },
    { pos: [4.8, -3.9, -6.5], height: 1.8, color: "#E5E5E5" },
    { pos: [5.2, -4, -7.2], height: 1.5, color: "#DCDCDC" },
  ];

  return (
    <group>
      {towers.map((tower, index) => (
        <Float key={index} speed={0.2 + index * 0.1} rotationIntensity={0.02} floatIntensity={0.04}>
          <Box
            position={tower.pos as [number, number, number]}
            args={[0.3, tower.height, 0.25]}
          >
            <meshStandardMaterial 
              color={tower.color} 
              roughness={0.3} 
              metalness={0.6}
              emissive="#6495ED"
              emissiveIntensity={0.02}
            />
          </Box>
          
          {/* Rooftop details */}
          <Box
            position={[tower.pos[0], tower.pos[1] + tower.height / 2 + 0.1, tower.pos[2]]}
            args={[0.35, 0.1, 0.3]}
          >
            <meshStandardMaterial color="#A0A0A0" roughness={0.4} metalness={0.5} />
          </Box>
        </Float>
      ))}
    </group>
  );
}

// Downtown Manama Buildings
function DowntownBuildings() {
  const buildings = [
    { pos: [0.5, -4, -6.5], size: [0.25, 2, 0.2], color: "#C9C9C9" },
    { pos: [1.2, -4, -6.8], size: [0.3, 2.5, 0.25], color: "#DCDCDC" },
    { pos: [5.5, -4.1, -6.2], size: [0.2, 1.6, 0.18], color: "#E5E5E5" },
    { pos: [6, -4.2, -6.8], size: [0.25, 1.4, 0.2], color: "#D3D3D3" },
    { pos: [0.2, -4.2, -6], size: [0.18, 1.5, 0.15], color: "#BEBEBE" },
    { pos: [6.2, -4.3, -7.5], size: [0.22, 1.2, 0.18], color: "#C8C8C8" },
  ];

  return (
    <group>
      {buildings.map((building, index) => (
        <Float key={index} speed={0.1 + index * 0.05} rotationIntensity={0.01} floatIntensity={0.02}>
          <Box
            position={building.pos as [number, number, number]}
            args={building.size as [number, number, number]}
          >
            <meshStandardMaterial 
              color={building.color} 
              roughness={0.4} 
              metalness={0.4}
              emissive="#87CEEB"
              emissiveIntensity={0.01}
            />
          </Box>
          
          {/* Simple window pattern */}
          <Box
            position={[
              building.pos[0], 
              building.pos[1], 
              building.pos[2] + building.size[2] / 2 + 0.01
            ]}
            args={[building.size[0] * 0.8, building.size[1] * 0.9, 0.01]}
          >
            <meshStandardMaterial 
              color="#4682B4" 
              transparent 
              opacity={0.3} 
              roughness={0.1} 
              metalness={0.9}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

// Desert Dunes
function DesertDunes() {
  const duneRef = useRef<THREE.Group>(null);
  
  const dunes = useMemo(() => {
    const duneData = [];
    for (let i = 0; i < 15; i++) {
      duneData.push({
        position: [
          (Math.random() - 0.5) * 40,
          -6 + Math.random() * 0.5,
          -15 - Math.random() * 20
        ],
        scale: [
          1 + Math.random() * 2,
          0.3 + Math.random() * 0.7,
          1 + Math.random() * 2
        ],
        rotation: [0, Math.random() * Math.PI, 0]
      });
    }
    return duneData;
  }, []);

  useFrame((state) => {
    if (duneRef.current) {
      duneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.01;
    }
  });

  return (
    <group ref={duneRef}>
      {dunes.map((dune, index) => (
        <mesh
          key={index}
          position={dune.position as [number, number, number]}
          scale={dune.scale as [number, number, number]}
          rotation={dune.rotation as [number, number, number]}
        >
          <sphereGeometry args={[2, 16, 8]} />
          <meshStandardMaterial color="#F4D03F" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Bahrain Fort (Qal'at al-Bahrain)
function BahrainFort() {
  return (
    <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.1}>
      <group position={[5, -4.5, -5]}>
        {/* Main fort structure */}
        <Box args={[1.5, 0.8, 1.5]}>
          <meshStandardMaterial color="#B8860B" roughness={0.8} />
        </Box>
        
        {/* Fort towers */}
        <Cylinder args={[0.3, 0.3, 1.2]} position={[-0.6, 0.2, -0.6]}>
          <meshStandardMaterial color="#CD853F" roughness={0.8} />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 1.2]} position={[0.6, 0.2, -0.6]}>
          <meshStandardMaterial color="#CD853F" roughness={0.8} />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 1.2]} position={[0, 0.2, 0.6]}>
          <meshStandardMaterial color="#CD853F" roughness={0.8} />
        </Cylinder>
      </group>
    </Float>
  );
}

// Tree of Life (Shajarat-al-Hayat)
function TreeOfLife() {
  const treeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={treeRef} position={[-8, -4, -10]}>
        {/* Tree trunk */}
        <Cylinder args={[0.2, 0.3, 3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </Cylinder>
        
        {/* Tree crown */}
        <Sphere args={[1.5]} position={[0, 3.5, 0]}>
          <meshStandardMaterial color="#228B22" roughness={0.7} />
        </Sphere>
        
        {/* Mystical glow */}
        <Sphere args={[2]} position={[0, 3.5, 0]}>
          <meshStandardMaterial 
            color="#90EE90" 
            transparent 
            opacity={0.2}
            emissive="#32CD32"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </group>
    </Float>
  );
}

// King Fahd Causeway - connecting Bahrain to Saudi Arabia
function KingFahdCauseway() {
  const causalwayRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (causalwayRef.current) {
      // Subtle movement suggesting traffic
      causalwayRef.current.position.y = -5.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <group ref={causalwayRef} position={[8, -5.2, -15]}>
      {/* Main causeway bridge sections */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={0.1 + i * 0.02} rotationIntensity={0.01} floatIntensity={0.02}>
          <Box 
            position={[i * 1.5, 0.2, 0]} 
            args={[1.2, 0.3, 2]}
          >
            <meshStandardMaterial 
              color="#D3D3D3" 
              roughness={0.3} 
              metalness={0.4}
            />
          </Box>
          
          {/* Bridge supports */}
          <Cylinder 
            position={[i * 1.5, -0.5, -0.8]} 
            args={[0.1, 0.1, 1]}
          >
            <meshStandardMaterial color="#A0A0A0" roughness={0.6} />
          </Cylinder>
          <Cylinder 
            position={[i * 1.5, -0.5, 0.8]} 
            args={[0.1, 0.1, 1]}
          >
            <meshStandardMaterial color="#A0A0A0" roughness={0.6} />
          </Cylinder>
        </Float>
      ))}
      
      {/* Cable-stayed bridge main towers */}
      <Float speed={0.2} rotationIntensity={0.02} floatIntensity={0.05}>
        <Cylinder position={[4, 2, 0]} args={[0.2, 0.2, 4]}>
          <meshStandardMaterial 
            color="#FFFFFF" 
            roughness={0.2} 
            metalness={0.8}
            emissive="#E6E6FA"
            emissiveIntensity={0.1}
          />
        </Cylinder>
        
        {/* Bridge cables (simplified) */}
        {[-1.5, -0.5, 0.5, 1.5].map((offset, index) => (
          <Box
            key={index}
            position={[4 + offset, 1, 0]}
            args={[Math.abs(offset) + 0.5, 0.02, 0.02]}
            rotation={[0, 0, offset > 0 ? -0.3 : 0.3]}
          >
            <meshStandardMaterial color="#C0C0C0" />
          </Box>
        ))}
      </Float>
    </group>
  );
}

// BahBeta Services integrated with landscape
function BahBetaServiceNodes() {
  const services = [
    { name: "Apps", pos: [2, -2, -6], color: "#3B82F6", icon: "📱" },
    { name: "Payments", pos: [4, -2.5, -7], color: "#10B981", icon: "💳" },
    { name: "NFC", pos: [1, -2, -8], color: "#8B5CF6", icon: "🔗" },
    { name: "Security", pos: [3, -1.5, -5], color: "#EF4444", icon: "🛡️" },
    { name: "Cloud", pos: [0, -2.5, -7], color: "#06B6D4", icon: "☁️" },
    { name: "AI/VR", pos: [5, -2, -6], color: "#F59E0B", icon: "🤖" },
  ];

  return (
    <group>
      {services.map((service, index) => (
        <Float key={index} speed={2 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Sphere
            position={service.pos as [number, number, number]}
            args={[0.4, 16, 16]}
          >
            <MeshDistortMaterial
              color={service.color}
              distort={0.3}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              emissive={service.color}
              emissiveIntensity={0.2}
            />
          </Sphere>
          
          {/* Service label */}
          <mesh position={[service.pos[0], service.pos[1] + 0.8, service.pos[2]]}>
            <planeGeometry args={[1, 0.3]} />
            <meshBasicMaterial color="white" transparent opacity={0.9} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Arabian Atmosphere Effects
function ArabianAtmosphere() {
  return (
    <group>
      {/* Sand particles in the air */}
      {[...Array(100)].map((_, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh
            position={[
              (Math.random() - 0.5) * 50,
              -2 + Math.random() * 8,
              -30 + Math.random() * 40
            ]}
          >
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial color="#F4D03F" transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
      
      {/* Distant mountains */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (i - 4) * 8,
            -4,
            -40
          ]}
        >
          <coneGeometry args={[2 + Math.random() * 2, 3 + Math.random() * 2, 8]} />
          <meshStandardMaterial color="#CD853F" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Camera Controller for Bahrain tour
function BahrainCameraController({ section }: { section: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const cameraPositions = [
      { x: 0, y: 2, z: 15 },    // Overview of Bahrain
      { x: -5, y: 0, z: 5 },    // Close to Tree of Life
      { x: 3, y: 1, z: 2 },     // Manama skyline view
      { x: 6, y: 0, z: 0 },     // Bahrain Fort view
      { x: 0, y: 5, z: 20 },    // Final overview
    ];
    
    const target = cameraPositions[section] || cameraPositions[0];
    
    camera.position.lerp(
      new THREE.Vector3(target.x, target.y, target.z),
      0.02
    );
    
    // Look at different landmarks based on section
    const lookAtTargets = [
      new THREE.Vector3(0, -3, -8),    // Bahrain islands
      new THREE.Vector3(-8, -4, -10),  // Tree of Life
      new THREE.Vector3(2, -2, -7),    // Manama skyline
      new THREE.Vector3(5, -4, -5),    // Bahrain Fort
      new THREE.Vector3(0, -3, -8),    // Final overview
    ];
    
    camera.lookAt(lookAtTargets[section] || lookAtTargets[0]);
  });

  return null;
}

function BahrainScene({ currentSection }: { currentSection: number }) {
  return (
    <>
      <BahrainCameraController section={currentSection} />
      <PerspectiveCamera makeDefault position={[0, 2, 15]} />
      
      {/* Lighting setup for Middle Eastern ambiance */}
      <ambientLight intensity={0.3} color="#FFF8DC" />
      <directionalLight 
        position={[20, 20, 10]} 
        intensity={1.2} 
        color="#FFE4B5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#F4A460" />
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#DEB887" />
      
      {/* Sky with Middle Eastern sunset colors */}
      <Sky
        distance={450000}
        sunPosition={[0.5, 0.1, -0.3]}
        inclination={0.49}
        azimuth={0.25}
      />
      
      {/* Stars for night effect */}
      <Stars radius={300} depth={60} count={1000} factor={6} saturation={0.8} />
      
      {/* Bahrain landscape components */}
      <ArabianGulfWater />
      <BahrainTerrain />
      <RealisticManamaSkyline />
      <DesertDunes />
      <BahrainFort />
      <TreeOfLife />
      <KingFahdCauseway />
      <BahBetaServiceNodes />
      <ArabianAtmosphere />
      
      {/* Fog for atmospheric depth */}
      <fog attach="fog" args={['#F5DEB3', 10, 80]} />
    </>
  );
}

function LoadingSequence() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-900 via-orange-800 to-red-900 text-white">
      <div className="text-center">
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-red-600 rounded-2xl flex items-center justify-center text-3xl"
        >
          🏛️
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Exploring Bahrain</h2>
        <p className="text-amber-200">Loading the Kingdom's digital landscape...</p>
        <div className="mt-4 w-64 h-1 bg-amber-700 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}

export function BahrainLandscapeExperience() {
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
      setCurrentSection(Math.min(section, 4));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      title: "Welcome to Bahrain",
      subtitle: "Kingdom of Digital Innovation",
      description: "Discover BahBeta's technology solutions in the heart of the Arabian Gulf"
    },
    {
      title: "Tree of Life",
      subtitle: "400 Years of Resilience",
      description: "Like this legendary tree, BahBeta's solutions stand the test of time"
    },
    {
      title: "Manama Skyline",
      subtitle: "Modern Financial Hub",
      description: "Powering Bahrain's digital transformation with cutting-edge technology"
    },
    {
      title: "Bahrain Fort",
      subtitle: "Heritage Meets Innovation",
      description: "Building tomorrow's solutions on foundations of trust and tradition"
    },
    {
      title: "Digital Archipelago",
      subtitle: "Connected Islands, Connected Solutions",
      description: "Join us in shaping Bahrain's technological future"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-amber-50 to-orange-100 text-gray-900 overflow-hidden">
      {/* Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50"
          >
            <LoadingSequence />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Bahrain Landscape Canvas */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<LoadingSequence />}>
          <Canvas shadows>
            <BahrainScene currentSection={currentSection} />
          </Canvas>
        </Suspense>
      </div>

      {/* Navigation with Arabian design */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-b border-yellow-600/30"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold">
                B
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-900">BahBeta</h1>
                <p className="text-xs text-orange-700">Kingdom of Bahrain</p>
              </div>
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {['Journey', 'Heritage', 'Innovation', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#section-${index}`}
                  className="text-amber-800 hover:text-amber-900 font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full font-medium"
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
          style={{ y: textY, scale: scaleTransform }}
          id={`section-${index}`}
        >
          <div className="text-center max-w-4xl mx-auto px-6 z-10 relative">
            <motion.h1
              className="text-6xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(45deg, #B45309, #DC2626, #F59E0B, #EAB308)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {section.title}
            </motion.h1>
            
            <motion.h2
              className="text-2xl lg:text-3xl text-amber-700 mb-8 font-light"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {section.subtitle}
            </motion.h2>
            
            <motion.p
              className="text-xl text-amber-800 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              {section.description}
            </motion.p>

            {index === 0 && (
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.3 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="px-10 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-full text-lg font-semibold shadow-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 25px 50px rgba(251, 146, 60, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Begin Journey
                </motion.button>
                <motion.button
                  className="px-10 py-4 border-2 border-amber-600 text-amber-800 rounded-full text-lg font-semibold hover:bg-amber-50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            )}

            {index === 4 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                viewport={{ once: true }}
              >
                {[
                  { icon: "📧", title: "Email", value: "info@bahbeta.com" },
                  { icon: "📱", title: "Phone", value: "+973 3328 3222" },
                  { icon: "🏛️", title: "Office", value: "Manama, Bahrain" }
                ].map((contact, contactIndex) => (
                  <motion.div
                    key={contactIndex}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-200"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-3xl mb-3">{contact.icon}</div>
                    <h3 className="font-semibold text-amber-900 mb-2">{contact.title}</h3>
                    <p className="text-amber-700">{contact.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}