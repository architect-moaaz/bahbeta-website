import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function SatelliteBahrain() {
  const [phase, setPhase] = useState('space');
  const { scrollY } = useScroll();
  
  // Advanced parallax layers
  const spaceY = useTransform(scrollY, [0, 2000], [0, -400]);
  const cloudsY = useTransform(scrollY, [0, 2000], [0, -300]);
  const mapY = useTransform(scrollY, [0, 2000], [0, 200]);

  useEffect(() => {
    const cinematicSequence = [
      { phase: 'space', delay: 0 },
      { phase: 'atmosphere', delay: 2000 },
      { phase: 'stratosphere', delay: 4000 },
      { phase: 'approach', delay: 6000 },
      { phase: 'satellite', delay: 8000 },
      { phase: 'focus', delay: 10000 }
    ];

    const timers = cinematicSequence.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Google Maps static API URLs for different zoom levels
  const getMapUrl = (zoom: number, maptype: 'satellite' | 'hybrid' = 'satellite') => {
    const center = '26.2235305,50.5875935'; // Manama, Bahrain coordinates
    const size = '800x600';
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // You'll need to replace this
    
    // For demo purposes, using a placeholder satellite image
    // In production, you'd use: https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&maptype=${maptype}&key=${apiKey}
    return `https://picsum.photos/800/600?random=${zoom}`; // Placeholder
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Space to atmosphere gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: spaceY,
          background: (() => {
            switch(phase) {
              case 'space':
                return 'radial-gradient(ellipse at center, #000000 0%, #001122 40%, #002244 70%, #003366 100%)';
              case 'atmosphere':
                return 'linear-gradient(180deg, #000428 0%, #004e92 25%, #009ffd 50%, #00d2ff 75%, #7dd3fc 100%)';
              case 'stratosphere':
                return 'linear-gradient(180deg, #0c4a6e 0%, #0284c7 25%, #0ea5e9 50%, #38bdf8 75%, #93c5fd 100%)';
              case 'approach':
                return 'linear-gradient(180deg, #164e63 0%, #0891b2 30%, #06b6d4 60%, #67e8f9 100%)';
              default:
                return 'linear-gradient(180deg, #1e40af 0%, #3b82f6 30%, #60a5fa 60%, #93c5fd 100%)';
            }
          })()
        }}
        animate={{
          scale: phase === 'space' ? 1.5 : phase === 'atmosphere' ? 1.3 : 1,
        }}
        transition={{ duration: 3, ease: [0.25, 0.8, 0.25, 1] }}
      />

      {/* Stars field for space phase */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: phase === 'space' ? 1 : 0,
        }}
        transition={{ duration: 2 }}
      >
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Cloud layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y: cloudsY }}
      >
        {/* High altitude clouds */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: phase === 'atmosphere' ? 0.8 : phase === 'stratosphere' ? 0.6 : 0.2,
          }}
          transition={{ duration: 2 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute"
              style={{
                background: `radial-gradient(ellipse, rgba(255,255,255,${0.4 + Math.random() * 0.4}) 0%, rgba(255,255,255,${0.1 + Math.random() * 0.2}) 40%, transparent 100%)`,
                width: `${200 + Math.random() * 400}px`,
                height: `${80 + Math.random() * 120}px`,
                left: `${Math.random() * 120 - 10}%`,
                top: `${Math.random() * 60}%`,
                borderRadius: '50%',
                filter: `blur(${2 + Math.random() * 3}px)`,
                transform: `rotate(${Math.random() * 45}deg)`,
              }}
              animate={{
                x: [-100, 200],
                opacity: [0.6, 0.3, 0],
                scale: [1, 1.3, 0.8],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 8,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Satellite Map Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: mapY }}
        initial={{ scale: 0.001, opacity: 0, y: 1000, rotateX: 90 }}
        animate={{
          scale: (() => {
            switch(phase) {
              case 'space': return 0.001;
              case 'atmosphere': return 0.01;
              case 'stratosphere': return 0.05;
              case 'approach': return 0.2;
              case 'satellite': return 0.6;
              case 'focus': return 1;
              default: return 1;
            }
          })(),
          opacity: phase === 'space' ? 0 : phase === 'atmosphere' ? 0.3 : 1,
          y: (() => {
            switch(phase) {
              case 'space': return 1000;
              case 'atmosphere': return 500;
              case 'stratosphere': return 250;
              case 'approach': return 100;
              default: return 0;
            }
          })(),
          rotateX: phase === 'focus' ? 0 : 45,
        }}
        transition={{ 
          duration: 4, 
          ease: [0.25, 0.8, 0.25, 1],
        }}
      >
        {/* Map frame with realistic satellite styling */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Main satellite map */}
          <motion.div
            className="relative overflow-hidden rounded-lg"
            style={{
              width: '600px',
              height: '450px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
              transform: 'perspective(1000px) rotateX(15deg)',
            }}
            animate={{
              rotateY: phase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 40,
              repeat: phase === 'focus' ? Infinity : 0,
              ease: "linear"
            }}
          >
            {/* Satellite image with multiple zoom levels */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
                    <!-- Persian Gulf Water -->
                    <rect width="600" height="450" fill="#1e40af"/>
                    
                    <!-- Main Bahrain Island -->
                    <path d="M 150 180 
                             Q 200 160, 280 170
                             Q 350 175, 400 190
                             Q 430 210, 440 240
                             Q 435 270, 420 290
                             Q 400 310, 370 320
                             Q 330 325, 280 320
                             Q 230 315, 180 300
                             Q 140 280, 130 250
                             Q 135 220, 150 180 Z" 
                          fill="#8B7355" stroke="#6B5B47" stroke-width="2"/>
                    
                    <!-- Muharraq Island -->
                    <ellipse cx="420" cy="160" rx="40" ry="25" fill="#9B8365" stroke="#7B6B55" stroke-width="1"/>
                    
                    <!-- Sitra Island -->
                    <ellipse cx="120" cy="280" rx="30" ry="20" fill="#7B6855" stroke="#6B5B47" stroke-width="1"/>
                    
                    <!-- Hawar Islands (distant) -->
                    <circle cx="500" cy="320" r="8" fill="#8B7355" opacity="0.8"/>
                    <circle cx="515" cy="325" r="6" fill="#8B7355" opacity="0.7"/>
                    <circle cx="495" cy="335" r="5" fill="#8B7355" opacity="0.6"/>
                    
                    <!-- Urban areas (Manama) -->
                    <rect x="220" y="200" width="40" height="30" fill="#C0C0C0" opacity="0.8"/>
                    <rect x="240" y="190" width="25" height="20" fill="#D3D3D3" opacity="0.7"/>
                    
                    <!-- Roads network -->
                    <line x1="180" y1="220" x2="380" y2="210" stroke="#696969" stroke-width="2" opacity="0.6"/>
                    <line x1="250" y1="180" x2="420" y2="160" stroke="#696969" stroke-width="1.5" opacity="0.5"/>
                    <line x1="200" y1="260" x2="350" y2="250" stroke="#696969" stroke-width="1.5" opacity="0.5"/>
                    
                    <!-- Airport runway -->
                    <rect x="405" y="155" width="20" height="3" fill="#A9A9A9"/>
                    <rect x="407" y="163" width="16" height="2" fill="#DCDCDC"/>
                    
                    <!-- Industrial areas -->
                    <rect x="180" y="290" width="30" height="20" fill="#8B4513" opacity="0.7"/>
                    <rect x="320" y="280" width="25" height="15" fill="#CD853F" opacity="0.6"/>
                    
                    <!-- Green areas -->
                    <circle cx="280" cy="240" r="12" fill="#228B22" opacity="0.6"/>
                    <circle cx="350" cy="220" r="8" fill="#32CD32" opacity="0.5"/>
                    <circle cx="200" cy="250" r="10" fill="#228B22" opacity="0.6"/>
                    
                    <!-- Causeway connection -->
                    <line x1="400" y1="280" x2="450" y2="285" stroke="#708090" stroke-width="3" opacity="0.8"/>
                  </svg>
                `)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              animate={{
                scale: phase === 'satellite' ? [1.2, 1] : phase === 'focus' ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: phase === 'focus' ? 8 : 2,
                repeat: phase === 'focus' ? Infinity : 0,
                ease: "easeInOut"
              }}
            />

            {/* Realistic satellite overlay effects */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255,255,255,0.1) 0%, 
                    transparent 30%, 
                    rgba(0,0,0,0.1) 70%, 
                    rgba(0,0,0,0.2) 100%
                  )
                `,
              }}
            />

            {/* Satellite data overlay */}
            <motion.div
              className="absolute top-4 left-4 text-white text-xs font-mono bg-black/50 p-2 rounded"
              animate={{
                opacity: phase === 'satellite' || phase === 'focus' ? 1 : 0,
              }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div>SAT: LANDSAT-9</div>
              <div>COORD: 26.22°N 50.58°E</div>
              <div>ALT: 705km</div>
              <div>RES: 30m/pixel</div>
            </motion.div>

            {/* Location markers */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: phase === 'focus' ? 1 : 0,
              }}
              transition={{ duration: 1, delay: 2 }}
            >
              {/* Manama marker */}
              <div className="absolute top-[44%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="text-white text-xs font-semibold mt-1 whitespace-nowrap bg-black/70 px-2 py-1 rounded">
                  Manama
                </div>
              </div>

              {/* Muharraq marker */}
              <div className="absolute top-[35%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="text-white text-xs mt-1 whitespace-nowrap bg-black/70 px-1 py-0.5 rounded">
                  Muharraq
                </div>
              </div>

              {/* Airport marker */}
              <div className="absolute top-[35%] left-[68%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="text-white text-xs mt-1 whitespace-nowrap bg-black/70 px-1 py-0.5 rounded text-center">
                  ✈️ BIA
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Realistic water reflections */}
          <motion.div
            className="absolute -inset-20"
            style={{
              background: 'radial-gradient(ellipse 120% 60% at 50% 100%, rgba(30,64,175,0.8) 0%, rgba(30,64,175,0.4) 40%, transparent 80%)',
              borderRadius: '50%',
              transform: 'rotateX(85deg) translateZ(-50px)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Satellite scan lines effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: phase === 'satellite' || phase === 'focus' ? [0, 0.3, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Atmospheric lighting effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: phase === 'focus' 
            ? 'radial-gradient(circle at 40% 20%, rgba(255,223,0,0.1) 0%, rgba(255,140,0,0.05) 30%, transparent 60%)'
            : 'transparent'
        }}
        transition={{ duration: 3 }}
      />

      {/* Film grain for cinematic feel */}
      <motion.div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* CSS keyframes for stars twinkling */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}