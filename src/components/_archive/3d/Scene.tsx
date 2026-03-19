import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Cloud, Clouds, Stars } from '@react-three/drei';
import { BahrainMap } from './BahrainMap';
import { SimpleBahrainMap } from './SimpleBahrainMap';
import { Suspense, useRef, useEffect } from 'react';
import { PerspectiveCamera, Fog } from 'three';
import * as THREE from 'three';

function CameraAnimation() {
  const { camera, gl } = useThree();
  const initialAnimation = useRef(true);
  
  useEffect(() => {
    // Set initial camera position high above in the clouds
    camera.position.set(0, 100, 50);
    camera.lookAt(0, 0, 0);
    
    // Add fog for cloud effect
    gl.setClearColor('#87CEEB', 1); // Sky blue background
  }, [camera, gl]);

  useFrame((state) => {
    if (initialAnimation.current) {
      // Zoom in animation from clouds
      const targetY = 15;
      const targetZ = 25;
      
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
      
      // Check if animation is complete
      if (Math.abs(camera.position.y - targetY) < 0.1 && Math.abs(camera.position.z - targetZ) < 0.1) {
        initialAnimation.current = false;
      }
      
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        shadows 
        camera={{ fov: 45 }}
        gl={{ alpha: false }}
      >
        <fog attach="fog" args={['#87CEEB', 50, 200]} />
        <Suspense fallback={null}>
          <CameraAnimation />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4}
            target={[0, 0, 0]}
          />
          
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[20, 30, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.1}
            shadow-camera-far={100}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, 20, -10]} intensity={0.5} color="#0066ff" />
          
          {/* Clouds layer */}
          <Clouds material={THREE.MeshBasicMaterial}>
            <Cloud 
              segments={40} 
              bounds={[10, 2, 2]} 
              volume={10} 
              color="white"
              fade={100}
              position={[0, 40, 0]}
              speed={0.4}
              opacity={0.6}
            />
            <Cloud 
              segments={30} 
              bounds={[10, 2, 2]} 
              volume={10} 
              color="white"
              fade={100}
              position={[-5, 35, -5]}
              speed={0.3}
              opacity={0.5}
            />
            <Cloud 
              segments={35} 
              bounds={[10, 2, 2]} 
              volume={10} 
              color="white"
              fade={100}
              position={[5, 45, 5]}
              speed={0.5}
              opacity={0.7}
            />
          </Clouds>
          
          {/* Stars in the background */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          
          {/* Main Bahrain Map */}
          <group position={[0, 0, 0]}>
            <SimpleBahrainMap />
          </group>
          
          <Environment preset="sunset" />
          
          {/* Ocean/Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial 
              color="#006994"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}