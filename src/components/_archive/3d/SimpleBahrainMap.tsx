import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export function SimpleBahrainMap() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 2, 0]} castShadow receiveShadow>
      {/* Simple box representing Bahrain for testing */}
      <boxGeometry args={[4, 0.5, 2]} />
      <meshStandardMaterial 
        color="#1a73e8"
        metalness={0.6}
        roughness={0.2}
        emissive="#0066ff"
        emissiveIntensity={0.3}
      />
      
      {/* Add some smaller islands */}
      <mesh position={[2, 0.3, 0.5]}>
        <boxGeometry args={[0.8, 0.3, 0.5]} />
        <meshStandardMaterial 
          color="#1a73e8"
          metalness={0.6}
          roughness={0.2}
          emissive="#0066ff"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh position={[-1.5, 0.2, -0.8]}>
        <boxGeometry args={[0.6, 0.2, 0.4]} />
        <meshStandardMaterial 
          color="#1a73e8"
          metalness={0.6}
          roughness={0.2}
          emissive="#0066ff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </mesh>
  );
}