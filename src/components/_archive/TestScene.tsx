import { Canvas } from '@react-three/fiber';

export function TestScene() {
  return (
    <div className="absolute inset-0 bg-red-500 z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
      </Canvas>
      <div className="absolute top-4 left-4 text-white z-10">
        Test Scene is Working!
      </div>
    </div>
  );
}