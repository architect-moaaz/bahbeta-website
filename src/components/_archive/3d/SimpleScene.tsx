import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { SimpleBahrainMap } from './SimpleBahrainMap';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';

function CameraAnimation() {
  const { camera } = useThree();
  const initialAnimation = useRef(true);
  
  useEffect(() => {
    // Set initial camera position high above
    camera.position.set(0, 50, 30);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    if (initialAnimation.current) {
      // Zoom in animation
      const targetY = 8;
      const targetZ = 15;
      
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);
      
      // Check if animation is complete
      if (Math.abs(camera.position.y - targetY) < 0.5 && Math.abs(camera.position.z - targetZ) < 0.5) {
        initialAnimation.current = false;
      }
      
      camera.lookAt(0, 2, 0);
    }
  });

  return null;
}

export function SimpleScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        shadows 
        camera={{ fov: 45 }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #4682B4)' }}
      >
        <Suspense fallback={null}>
          <CameraAnimation />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            target={[0, 2, 0]}
          />
          
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 20, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Bahrain Islands */}
          <SimpleBahrainMap />
          
          <Environment preset="sunset" />
          
          {/* Ocean */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial 
              color="#006994"
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}