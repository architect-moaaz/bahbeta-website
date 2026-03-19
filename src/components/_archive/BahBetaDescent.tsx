import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BahBetaDescent() {
  const [altitude, setAltitude] = useState(15000);
  const [phase, setPhase] = useState('descent');
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
    // Cinematic descent sequence targeting BahBeta location
    const descentInterval = setInterval(() => {
      setAltitude(prev => {
        if (prev <= 1000) {
          clearInterval(descentInterval);
          setPhase('arrived');
          setTimeout(() => setShowOrb(true), 2000);
          return 1000;
        }
        return prev - 200; // Descent speed
      });
    }, 120);

    return () => clearInterval(descentInterval);
  }, []);

  // BahBeta coordinates: 26.219424, 50.5691576
  const BAHBETA_LAT = 26.219424;
  const BAHBETA_LNG = 50.5691576;

  // Calculate zoom and scale based on altitude
  const getViewScale = () => {
    const progress = (15000 - altitude) / 14000; // 0 to 1
    return 0.08 + (progress * 0.92); // Scale from 0.08 to 1
  };

  const getMapZoom = () => {
    if (altitude >= 12000) return 8;   // Bahrain region overview
    if (altitude >= 10000) return 9;   // Bahrain archipelago
    if (altitude >= 8000) return 10;   // Main islands
    if (altitude >= 6000) return 11;   // Northern Bahrain region
    if (altitude >= 4000) return 12;   // Manama area
    if (altitude >= 3000) return 13;   // BahBeta district
    if (altitude >= 2000) return 14;   // Neighborhood level
    if (altitude >= 1500) return 15;   // Street level
    return 16; // Building level (1000ft)
  };

  const getCloudOpacity = () => {
    if (altitude >= 10000) return 0.9;
    if (altitude >= 7000) return 0.7;
    if (altitude >= 4000) return 0.5;
    if (altitude >= 2000) return 0.3;
    return 0;
  };

  // Dynamic map centering for smooth transition to BahBeta
  const getMapCenter = () => {
    let lat = BAHBETA_LAT;
    let lng = BAHBETA_LNG;
    
    // At high altitudes, show wider Bahrain context
    if (altitude >= 10000) {
      lat = 26.1; // Bahrain center
      lng = 50.55;
    } else if (altitude >= 6000) {
      lat = 26.2; // Northern Bahrain
      lng = 50.57;
    } else if (altitude >= 3000) {
      lat = 26.215; // Approaching BahBeta area
      lng = 50.568;
    }
    
    return { lat, lng };
  };

  // Google Maps embed URL targeting BahBeta
  const getMapUrl = () => {
    const zoom = getMapZoom();
    const center = getMapCenter();
    const scale = Math.max(500, 10000000 / Math.pow(2, zoom));
    
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${scale}!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af664a9e37bf%3A0xc486688e6e7a8b61!2sBahBeta!5e1!3m2!1sen!2s!4v1673000000000!5m2!1sen!2s`;
  };

  const getCurrentLocation = () => {
    if (altitude >= 12000) return 'BAHRAIN OVERVIEW';
    if (altitude >= 8000) return 'MAIN ISLANDS';
    if (altitude >= 6000) return 'NORTHERN REGION';
    if (altitude >= 4000) return 'MANAMA DISTRICT';
    if (altitude >= 3000) return 'BAHBETA AREA';
    if (altitude >= 2000) return 'BAHBETA VICINITY';
    if (altitude >= 1500) return 'BAHBETA BUILDING';
    return 'BAHBETA ROOFTOP';
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {/* Dynamic sky gradient based on altitude */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: altitude >= 10000 
            ? 'linear-gradient(180deg, #001122 0%, #003366 25%, #0066aa 50%, #0099dd 75%, #66ccff 100%)'
            : altitude >= 7000
            ? 'linear-gradient(180deg, #0c4a6e 0%, #0284c7 25%, #0ea5e9 50%, #38bdf8 75%, #93c5fd 100%)'
            : altitude >= 4000
            ? 'linear-gradient(180deg, #164e63 0%, #0891b2 30%, #06b6d4 60%, #67e8f9 100%)'
            : altitude >= 2000
            ? 'linear-gradient(180deg, #1e40af 0%, #3b82f6 30%, #60a5fa 60%, #93c5fd 100%)'
            : 'linear-gradient(180deg, #1e3a8a 0%, #3730a3 30%, #4338ca 60%, #6366f1 100%)'
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Volumetric cloud system */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: getCloudOpacity() }}
        transition={{ duration: 1.5 }}
      >
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              background: `radial-gradient(ellipse, rgba(255,255,255,${0.4 + Math.random() * 0.6}) 0%, rgba(255,255,255,${0.2 + Math.random() * 0.3}) 40%, transparent 100%)`,
              width: `${200 + Math.random() * 500}px`,
              height: `${80 + Math.random() * 150}px`,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              borderRadius: '50%',
              filter: `blur(${2 + Math.random() * 4}px)`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
            animate={{
              x: [-150, 250],
              scale: [0.8, 1.4, 0.9],
              rotateZ: [0, 25, -20],
            }}
            transition={{
              duration: 18 + Math.random() * 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </motion.div>

      {/* Full-screen Google Maps targeting BahBeta */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: getViewScale(),
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative w-full h-full">
          <iframe
            src={getMapUrl()}
            width="100%"
            height="100%"
            style={{ 
              border: 0,
              filter: phase === 'arrived' ? 'grayscale(100%) contrast(1.3) brightness(0.9)' : 'none',
              transition: 'filter 2.5s ease-in-out'
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Advanced HUD overlay */}
          <motion.div
            className="absolute top-6 left-6 bg-black/85 text-green-400 font-mono text-lg p-5 rounded-lg border border-green-400/60 backdrop-blur-sm"
            animate={{
              opacity: phase === 'descent' ? 1 : 0,
            }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-green-300">TARGETING BAHBETA</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>ALTITUDE:</span>
                <span className="text-cyan-300 font-bold">{altitude.toLocaleString()} ft</span>
              </div>
              <div className="flex justify-between">
                <span>VELOCITY:</span>
                <span className="text-yellow-300">{altitude > 1000 ? '180' : '0'} mph</span>
              </div>
              <div className="flex justify-between">
                <span>TARGET:</span>
                <span className="text-red-300">26.219424°N, 50.569°E</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-blue-300">{getCurrentLocation()}</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className={altitude > 1000 ? "text-orange-300" : "text-green-300"}>
                  {altitude > 1000 ? 'DESCENDING' : 'TARGET ACQUIRED'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Precision targeting system */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              opacity: phase === 'descent' ? 0.8 : 0,
            }}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              {/* Primary crosshair */}
              <div className="w-20 h-0.5 bg-red-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
              <div className="w-0.5 h-20 bg-red-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
              
              {/* Targeting rings */}
              <motion.div
                className="w-40 h-40 border-2 border-red-500 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-60 h-60 border border-red-400 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
              <div className="w-80 h-80 border border-red-300 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
              
              {/* Range indicators */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-0.5 bg-red-400"
                    style={{
                      transform: `rotate(${i * 45}deg) translateX(${30 + (i % 2) * 10}px)`,
                    }}
                  />
                ))}
              </div>

              {/* BahBeta target label */}
              <motion.div
                className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-red-500/20 text-red-300 px-3 py-1 rounded border border-red-500/50 text-sm font-mono"
                animate={{
                  opacity: altitude <= 3000 ? 1 : 0,
                }}
                transition={{ duration: 1 }}
              >
                BAHBETA TARGET LOCKED
              </motion.div>
            </div>
          </motion.div>

          {/* Dynamic scan lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: phase === 'descent' ? [0, 0.3, 0] : 0,
            }}
            transition={{
              duration: 2.5,
              repeat: phase === 'descent' ? Infinity : 0,
              ease: "linear"
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,0,0.15) 3px, rgba(0,255,0,0.15) 5px)',
              }}
            />
          </motion.div>

          {/* Arrival sequence */}
          <AnimatePresence>
            {phase === 'arrived' && !showOrb && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              >
                <div className="bg-black/95 text-white font-mono text-center p-10 rounded-xl border border-green-400/50 shadow-2xl">
                  <div className="text-3xl mb-4 text-green-400">TARGET ACQUIRED</div>
                  <div className="text-xl mb-2">BAHBETA HEADQUARTERS</div>
                  <div className="text-lg text-cyan-300 mb-4">1,000 ft ABOVE TARGET</div>
                  <div className="text-sm text-gray-300">Coordinates: 26.219424°N, 50.5691576°E</div>
                  <div className="mt-6 text-lg text-yellow-300">Initializing BahBeta Portal...</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced BahBeta Orb */}
          <AnimatePresence>
            {showOrb && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 100, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 3, 
                  ease: [0.25, 0.8, 0.25, 1],
                  scale: { type: "spring", stiffness: 150, damping: 15 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.button
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    window.open('https://www.google.com/maps/place/BahBeta/@26.219424,50.5665827,1002m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e49af664a9e37bf:0xc486688e6e7a8b61!8m2!3d26.219424!4d50.5691576!16s%2Fg%2F11w27m4q3x', '_blank');
                  }}
                >
                  <div className="relative">
                    {/* Main orb with premium gradient */}
                    <motion.div
                      className="w-56 h-56 rounded-full relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #06b6d4 50%, #0891b2 75%, #0c4a6e 100%)',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 60px rgba(59, 130, 246, 0.6), 0 0 120px rgba(6, 182, 212, 0.4)',
                          '0 0 80px rgba(59, 130, 246, 0.8), 0 0 160px rgba(6, 182, 212, 0.6)',
                          '0 0 60px rgba(59, 130, 246, 0.6), 0 0 120px rgba(6, 182, 212, 0.4)',
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {/* Inner reflective surface */}
                      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
                      <div className="absolute inset-6 rounded-full bg-gradient-to-tl from-cyan-300/30 to-transparent"></div>
                      
                      {/* Rotating energy rings */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-3 border-white/60"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-2 rounded-full border-2 border-cyan-300/50"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* BahBeta logo text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-white font-black text-3xl tracking-widest text-center leading-tight"
                          style={{
                            textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(6,182,212,0.6)',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          BahBeta
                        </motion.div>
                      </div>
                      
                      {/* Dynamic particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            left: `${25 + Math.random() * 50}%`,
                            top: `${25 + Math.random() * 50}%`,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: [0, (Math.random() - 0.5) * 40],
                            y: [0, (Math.random() - 0.5) * 40],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Outer energy field */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400/40"
                      animate={{ 
                        scale: [1, 2.5, 1], 
                        opacity: [0.8, 0, 0.8] 
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-cyan-300/30"
                      animate={{ 
                        scale: [1, 3, 1], 
                        opacity: [0.6, 0, 0.6] 
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    />

                    {/* Click instruction */}
                    <motion.div
                      className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-lg font-mono"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to Visit BahBeta
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Cinematic film grain */}
      <motion.div
        className="absolute inset-0 opacity-8 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.04, 0.12, 0.04],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
        }}
      />
    </div>
  );
}