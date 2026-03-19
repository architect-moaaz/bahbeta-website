import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function GoogleMapsBahrain() {
  const [phase, setPhase] = useState('space');
  const [mapLoaded, setMapLoaded] = useState(false);
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

  // Using embedded Google Maps with satellite view
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115829.95280330891!2d50.49446255000001!3d26.1922224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af722776a62d%3A0x8b6738a6070f60c2!2sManama%2C%20Bahrain!5e1!3m2!1sen!2s!4v1673000000000!5m2!1sen!2s";

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
        {/* Volumetric clouds */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: phase === 'atmosphere' ? 0.8 : phase === 'stratosphere' ? 0.6 : 0.2,
          }}
          transition={{ duration: 2 }}
        >
          {[...Array(15)].map((_, i) => (
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

      {/* Google Maps Satellite Container */}
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
              case 'satellite': return 0.7;
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
          rotateX: phase === 'focus' ? 0 : 30,
        }}
        transition={{ 
          duration: 4, 
          ease: [0.25, 0.8, 0.25, 1],
        }}
      >
        {/* Google Maps Frame */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            className="relative overflow-hidden rounded-lg border-4 border-gray-800"
            style={{
              width: '800px',
              height: '600px',
              boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
              transform: 'perspective(1200px) rotateX(10deg)',
            }}
            animate={{
              rotateY: phase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 60,
              repeat: phase === 'focus' ? Infinity : 0,
              ease: "linear"
            }}
          >
            {/* Real Google Maps Embed */}
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="absolute inset-0"
            />

            {/* Satellite HUD Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: phase === 'satellite' || phase === 'focus' ? 1 : 0,
              }}
              transition={{ duration: 1, delay: 1 }}
            >
              {/* Top HUD */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="bg-black/80 text-green-400 text-xs font-mono p-2 rounded border border-green-400/50">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    SATELLITE ACTIVE
                  </div>
                  <div>LAT: 26.2235°N</div>
                  <div>LON: 50.5876°E</div>
                  <div>ALT: 705km</div>
                  <div>ZOOM: 11</div>
                </div>

                <div className="bg-black/80 text-blue-400 text-xs font-mono p-2 rounded border border-blue-400/50">
                  <div>GOOGLE EARTH</div>
                  <div>LANDSAT 9</div>
                  <div>30m/pixel</div>
                  <div className="text-green-400">LIVE</div>
                </div>
              </div>

              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-8 h-0.5 bg-red-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-0.5 h-8 bg-red-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-16 h-16 border-2 border-red-500 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="bg-black/80 text-yellow-400 text-xs font-mono p-2 rounded border border-yellow-400/50">
                  <div>TARGET: MANAMA</div>
                  <div>COUNTRY: BAHRAIN</div>
                  <div>REGION: GULF</div>
                </div>

                <div className="bg-black/80 text-cyan-400 text-xs font-mono p-2 rounded border border-cyan-400/50">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-ping"></div>
                    SCANNING...
                  </div>
                  <div>ISLANDS: 33</div>
                  <div>AREA: 780 km²</div>
                </div>
              </div>

              {/* Scan lines */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0, 0.3, 0],
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
            </motion.div>

            {/* Loading overlay */}
            {!mapLoaded && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-green-400 font-mono text-lg">
                  <div className="animate-pulse">ACQUIRING SATELLITE SIGNAL...</div>
                  <div className="flex items-center justify-center mt-4">
                    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Realistic water reflections around the map */}
          <motion.div
            className="absolute -inset-20"
            style={{
              background: 'radial-gradient(ellipse 120% 60% at 50% 100%, rgba(30,64,175,0.6) 0%, rgba(30,64,175,0.3) 40%, transparent 80%)',
              borderRadius: '50%',
              transform: 'rotateX(85deg) translateZ(-60px)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Atmospheric lighting effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: phase === 'focus' 
            ? 'radial-gradient(circle at 40% 20%, rgba(255,223,0,0.08) 0%, rgba(255,140,0,0.04) 30%, transparent 60%)'
            : 'transparent'
        }}
        transition={{ duration: 3 }}
      />

      {/* Film grain for cinematic feel */}
      <motion.div
        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.02, 0.08, 0.02],
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