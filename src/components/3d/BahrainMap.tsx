import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Shape, ExtrudeGeometry, Mesh, DoubleSide } from 'three';
import { bahrainOutline } from '../../data/bahrainMap';

export function BahrainMap() {
  const meshRef = useRef<Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new Shape();
    const coordinates = bahrainOutline.features[0].geometry.coordinates[0];
    
    // Convert lat/lng to local coordinates with larger scale
    const scale = 200;
    const centerLng = 50.5577;
    const centerLat = 26.0667;
    
    coordinates.forEach((coord, index) => {
      const x = (coord[0] - centerLng) * scale;
      const y = (coord[1] - centerLat) * scale;
      
      if (index === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    });
    
    shape.closePath();
    
    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };
    
    return new ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      castShadow 
      receiveShadow
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial 
        color="#1a73e8"
        metalness={0.6}
        roughness={0.2}
        emissive="#0066ff"
        emissiveIntensity={0.3}
        side={DoubleSide}
      />
    </mesh>
  );
}