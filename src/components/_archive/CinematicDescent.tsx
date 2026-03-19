import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CinematicDescent() {
  const [altitude, setAltitude] = useState(10000);
  const [phase, setPhase] = useState('descent');
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
    // Cinematic descent sequence
    const descentInterval = setInterval(() => {
      setAltitude(prev => {
        if (prev <= 1000) {
          clearInterval(descentInterval);
          setPhase('arrived');
          setTimeout(() => setShowOrb(true), 2000);
          return 1000;
        }
        return prev - 150; // Descent speed
      });
    }, 100);

    return () => clearInterval(descentInterval);
  }, []);

  // Calculate zoom and scale based on altitude - from Earth view to Bahrain
  const getViewScale = () => {
    const progress = (10000 - altitude) / 9000; // 0 to 1
    return 0.05 + (progress * 0.95); // Scale from 0.05 to 1 (Earth to street level)
  };

  const getMapZoom = () => {
    if (altitude >= 9000) return 2;   // Earth/Continental view
    if (altitude >= 8000) return 4;   // Middle East region
    if (altitude >= 7000) return 6;   // Arabian Peninsula
    if (altitude >= 6000) return 8;   // Persian Gulf region
    if (altitude >= 5000) return 10;  // Gulf states
    if (altitude >= 4000) return 11;  // Bahrain region
    if (altitude >= 3000) return 12;  // Bahrain archipelago
    if (altitude >= 2000) return 13;  // Main islands detailed
    if (altitude >= 1500) return 14;  // City level detail
    return 15; // Street level (1000ft)
  };

  const getCloudOpacity = () => {
    if (altitude >= 8000) return 0.8;
    if (altitude >= 5000) return 0.6;
    if (altitude >= 3000) return 0.4;
    if (altitude >= 1500) return 0.2;
    return 0;
  };

  // Google Maps embed URL with dynamic zoom - from Earth to Bahrain
  const getMapUrl = () => {
    const zoom = getMapZoom();
    
    // Dynamic center coordinates based on altitude for smooth transition to Bahrain
    let lat = 26.2235305; // Manama, Bahrain
    let lng = 50.5875935;
    
    // At high altitudes, start with a wider Earth view centered on Middle East
    if (altitude >= 8000) {
      lat = 25.0; // Middle East region center
      lng = 50.0;
    } else if (altitude >= 6000) {
      lat = 25.5; // Gulf region
      lng = 50.3;
    }
    
    // Calculate scale for proper zoom progression
    const scale = Math.max(1000, 50000000 / Math.pow(2, zoom));
    
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${scale}!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af722776a62d%3A0x8b6738a6070f60c2!2sManama%2C%20Bahrain!5e1!3m2!1sen!2s!4v1673000000000!5m2!1sen!2s`;
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {/* Sky gradient based on altitude */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: altitude >= 8000 
            ? 'linear-gradient(180deg, #000428 0%, #004e92 25%, #009ffd 50%, #00d2ff 75%, #7dd3fc 100%)'
            : altitude >= 5000
            ? 'linear-gradient(180deg, #0c4a6e 0%, #0284c7 25%, #0ea5e9 50%, #38bdf8 75%, #93c5fd 100%)'
            : altitude >= 3000
            ? 'linear-gradient(180deg, #164e63 0%, #0891b2 30%, #06b6d4 60%, #67e8f9 100%)'
            : 'linear-gradient(180deg, #1e40af 0%, #3b82f6 30%, #60a5fa 60%, #93c5fd 100%)'
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Cloud layers that fade as we descend */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: getCloudOpacity() }}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              background: `radial-gradient(ellipse, rgba(255,255,255,${0.3 + Math.random() * 0.5}) 0%, rgba(255,255,255,${0.1 + Math.random() * 0.3}) 40%, transparent 100%)`,
              width: `${300 + Math.random() * 600}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              borderRadius: '50%',
              filter: `blur(${3 + Math.random() * 5}px)`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
            animate={{
              x: [-200, 200],
              scale: [0.8, 1.3, 0.8],
              rotateZ: [0, 20, -15],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </motion.div>

      {/* Main map container - full screen */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: getViewScale(),
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Full-screen Google Maps */}
        <div className="relative w-full h-full">
          <iframe
            src={getMapUrl()}
            width="100%"
            height="100%"
            style={{ 
              border: 0,
              filter: phase === 'arrived' ? 'grayscale(100%) contrast(1.2)' : 'none',
              transition: 'filter 2s ease-in-out'
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Altitude and speed overlay */}
          <motion.div
            className="absolute top-8 left-8 bg-black/80 text-green-400 font-mono text-lg p-4 rounded border border-green-400/50"
            animate={{
              opacity: phase === 'descent' ? 1 : 0,
            }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              DESCENT ACTIVE
            </div>
            <div className="space-y-1">
              <div>ALTITUDE: {altitude.toLocaleString()} ft</div>
              <div>SPEED: {altitude > 1000 ? '150' : '0'} mph</div>
              <div>TARGET: MANAMA, BAHRAIN</div>
              <div>VIEW: {
                altitude >= 9000 ? 'EARTH' :
                altitude >= 8000 ? 'MIDDLE EAST' :
                altitude >= 7000 ? 'ARABIAN PENINSULA' :
                altitude >= 6000 ? 'PERSIAN GULF' :
                altitude >= 5000 ? 'GULF STATES' :
                altitude >= 3000 ? 'BAHRAIN REGION' :
                altitude >= 2000 ? 'ARCHIPELAGO' :
                'STREET LEVEL'
              }</div>
              <div>STATUS: {altitude > 1000 ? 'DESCENDING' : 'ARRIVED'}</div>
            </div>
          </motion.div>

          {/* Crosshair overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              opacity: phase === 'descent' ? 0.7 : 0,
            }}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              {/* Main crosshair */}
              <div className="w-16 h-0.5 bg-red-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-0.5 h-16 bg-red-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Targeting circles */}
              <div className="w-32 h-32 border-2 border-red-500 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
              <div className="w-48 h-48 border border-red-300 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
              
              {/* Distance markers */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-0.5 bg-red-400"
                    style={{
                      transform: `rotate(${i * 90}deg) translateX(${24 + i * 8}px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scan lines for cinematic effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: phase === 'descent' ? [0, 0.2, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: phase === 'descent' ? Infinity : 0,
              ease: "linear"
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,255,0,0.1) 4px, rgba(0,255,0,0.1) 6px)',
              }}
            />
          </motion.div>

          {/* Arrival notification */}
          <AnimatePresence>
            {phase === 'arrived' && !showOrb && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50"
              >
                <div className="bg-black/90 text-white font-mono text-2xl p-8 rounded border border-white/30 text-center">
                  <div className="mb-4">ALTITUDE: 1,000 ft</div>
                  <div className="text-green-400">DESTINATION REACHED</div>
                  <div className="mt-4 text-lg">Initializing BahBeta...</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BahBeta Orb */}
          <AnimatePresence>
            {showOrb && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 2, 
                  ease: [0.25, 0.8, 0.25, 1],
                  scale: { type: "spring", stiffness: 200, damping: 20 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.button
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Handle orb click - could navigate or trigger next phase
                    console.log('BahBeta orb clicked!');
                  }}
                >
                  {/* Orb container */}
                  <div className="relative">
                    {/* Main orb */}
                    <motion.div
                      className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-600 shadow-2xl relative overflow-hidden"
                      animate={{
                        boxShadow: [
                          '0 0 50px rgba(59, 130, 246, 0.5)',
                          '0 0 80px rgba(59, 130, 246, 0.8)',
                          '0 0 50px rgba(59, 130, 246, 0.5)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Inner glow */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                      
                      {/* Animated rings */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/50"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border border-cyan-300"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      
                      {/* BahBeta text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-white font-bold text-2xl tracking-wider text-center"
                          animate={{
                            textShadow: [
                              '0 0 10px rgba(255,255,255,0.5)',
                              '0 0 20px rgba(255,255,255,0.8)',
                              '0 0 10px rgba(255,255,255,0.5)',
                            ]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          BahBeta
                        </motion.div>
                      </div>
                      
                      {/* Sparkle effects */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Outer pulse rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-cyan-300/20"
                      animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </div>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grayscale overlay for arrived phase */}
          <motion.div
            className="absolute inset-0 bg-black/20 pointer-events-none"
            animate={{
              opacity: phase === 'arrived' ? 1 : 0,
            }}
            transition={{ duration: 2 }}
          />
        </div>
      </motion.div>

      {/* Film grain overlay */}
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
        }}
      />
    </div>
  );
}