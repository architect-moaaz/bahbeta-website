import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SmoothZoomToBahBeta() {
  const [zoomLevel, setZoomLevel] = useState(0);
  const [phase, setPhase] = useState('overview');
  const [showOrb, setShowOrb] = useState(false);

  // BahBeta coordinates: 26.219424, 50.5691576
  const BAHBETA_LAT = 26.219424;
  const BAHBETA_LNG = 50.5691576;

  useEffect(() => {
    // Smooth zoom progression
    const zoomInterval = setInterval(() => {
      setZoomLevel(prev => {
        if (prev >= 100) {
          clearInterval(zoomInterval);
          setPhase('arrived');
          setTimeout(() => setShowOrb(true), 1500);
          return 100;
        }
        return prev + 1.2; // Smooth zoom speed
      });
    }, 80);

    return () => clearInterval(zoomInterval);
  }, []);

  // Calculate map zoom based on progress
  const getMapZoom = () => {
    if (zoomLevel <= 10) return 9;   // Bahrain overview
    if (zoomLevel <= 20) return 10;  // Archipelago
    if (zoomLevel <= 30) return 11;  // Main islands
    if (zoomLevel <= 40) return 12;  // Northern region
    if (zoomLevel <= 50) return 13;  // Manama area
    if (zoomLevel <= 60) return 14;  // BahBeta district
    if (zoomLevel <= 70) return 15;  // Neighborhood
    if (zoomLevel <= 80) return 16;  // Street level
    if (zoomLevel <= 90) return 17;  // Building level
    return 18; // Maximum detail
  };

  // Smooth coordinate transition from Bahrain center to BahBeta
  const getMapCenter = () => {
    const progress = zoomLevel / 100;
    
    // Start coordinates (Bahrain center)
    const startLat = 26.1;
    const startLng = 50.55;
    
    // End coordinates (BahBeta)
    const endLat = BAHBETA_LAT;
    const endLng = BAHBETA_LNG;
    
    // Smooth interpolation
    const lat = startLat + (endLat - startLat) * progress;
    const lng = startLng + (endLng - startLng) * progress;
    
    return { lat, lng };
  };

  // Google Maps embed URL with smooth transitions
  const getMapUrl = () => {
    const zoom = getMapZoom();
    const center = getMapCenter();
    const scale = Math.max(200, 20000000 / Math.pow(2, zoom));
    
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${scale}!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af664a9e37bf%3A0xc486688e6e7a8b61!2sBahBeta!5e1!3m2!1sen!2s!4v1673000000000!5m2!1sen!2s`;
  };

  const getCurrentView = () => {
    if (zoomLevel <= 15) return 'BAHRAIN OVERVIEW';
    if (zoomLevel <= 25) return 'ARCHIPELAGO';
    if (zoomLevel <= 35) return 'MAIN ISLANDS';
    if (zoomLevel <= 45) return 'NORTHERN REGION';
    if (zoomLevel <= 55) return 'MANAMA AREA';
    if (zoomLevel <= 65) return 'BAHBETA DISTRICT';
    if (zoomLevel <= 75) return 'NEIGHBORHOOD';
    if (zoomLevel <= 85) return 'STREET LEVEL';
    if (zoomLevel <= 95) return 'BUILDING DETAIL';
    return 'BAHBETA TARGET';
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
      {/* Full-screen Google Maps with smooth zoom */}
      <div className="relative w-full h-full">
        <motion.iframe
          key={getMapUrl()} // Force re-render for smooth transitions
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{ 
            border: 0,
            filter: phase === 'arrived' ? 'grayscale(100%) contrast(1.2) brightness(0.85)' : 'none',
            transition: 'filter 2s ease-in-out'
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Elegant zoom progress indicator */}
        <motion.div
          className="absolute top-8 right-8 bg-black/80 text-white font-mono p-4 rounded-xl border border-white/20 backdrop-blur-md"
          animate={{
            opacity: phase === 'overview' ? 1 : 0,
          }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-blue-300 text-lg">ZOOMING TO BAHBETA</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>PROGRESS:</span>
              <span className="text-cyan-300 font-bold">{Math.round(zoomLevel)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>VIEW:</span>
              <span className="text-green-300">{getCurrentView()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>TARGET:</span>
              <span className="text-yellow-300">26.219°N, 50.569°E</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-cyan-300 h-2 rounded-full"
                animate={{ width: `${zoomLevel}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Smooth targeting overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{
            opacity: phase === 'overview' && zoomLevel > 30 ? 0.6 : 0,
          }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            {/* Animated crosshair that appears as we zoom in */}
            <motion.div
              className="w-12 h-0.5 bg-red-400 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                width: zoomLevel > 50 ? '60px' : '48px',
                opacity: zoomLevel > 30 ? 1 : 0 
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="w-0.5 h-12 bg-red-400 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                height: zoomLevel > 50 ? '60px' : '48px',
                opacity: zoomLevel > 30 ? 1 : 0 
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Targeting circle that shrinks as we zoom */}
            <motion.div
              className="border-2 border-red-400 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                width: `${Math.max(60, 200 - zoomLevel * 1.5)}px`,
                height: `${Math.max(60, 200 - zoomLevel * 1.5)}px`,
                opacity: zoomLevel > 30 ? 0.6 : 0
              }}
              transition={{ duration: 0.3 }}
            />

            {/* BahBeta target label */}
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-bold"
              animate={{
                opacity: zoomLevel > 60 ? 1 : 0,
                y: zoomLevel > 60 ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
            >
              🎯 BAHBETA TARGET
            </motion.div>
          </div>
        </motion.div>

        {/* Arrival notification */}
        <AnimatePresence>
          {phase === 'arrived' && !showOrb && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white text-center p-8 rounded-2xl border border-slate-600 shadow-2xl">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯
                </motion.div>
                <div className="text-2xl font-bold text-blue-400 mb-2">TARGET REACHED</div>
                <div className="text-xl mb-4">BahBeta Headquarters</div>
                <div className="text-sm text-gray-300 mb-2">26.219424°N, 50.5691576°E</div>
                <div className="text-lg text-cyan-300">Initializing BahBeta Portal...</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium BahBeta Orb */}
        <AnimatePresence>
          {showOrb && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 2.5, 
                ease: [0.25, 0.8, 0.25, 1],
                scale: { type: "spring", stiffness: 120, damping: 20 }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.button
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://www.google.com/maps/place/BahBeta/@26.219424,50.5665827,1002m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e49af664a9e37bf:0xc486688e6e7a8b61!8m2!3d26.219424!4d50.5691576!16s%2Fg%2F11w27m4q3x', '_blank');
                }}
              >
                <div className="relative">
                  {/* Main orb with premium design */}
                  <motion.div
                    className="w-64 h-64 rounded-full relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 20%, #06b6d4 40%, #0891b2 60%, #0c4a6e 80%, #1e3a8a 100%)',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 80px rgba(59, 130, 246, 0.8), 0 0 160px rgba(6, 182, 212, 0.6), 0 0 240px rgba(30, 64, 175, 0.4)',
                        '0 0 100px rgba(59, 130, 246, 1), 0 0 200px rgba(6, 182, 212, 0.8), 0 0 300px rgba(30, 64, 175, 0.6)',
                        '0 0 80px rgba(59, 130, 246, 0.8), 0 0 160px rgba(6, 182, 212, 0.6), 0 0 240px rgba(30, 64, 175, 0.4)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {/* Reflective layers */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/50 via-white/20 to-transparent"></div>
                    <div className="absolute inset-8 rounded-full bg-gradient-to-tl from-cyan-200/40 to-transparent"></div>
                    <div className="absolute inset-12 rounded-full bg-gradient-to-br from-blue-300/30 to-transparent"></div>
                    
                    {/* Rotating energy rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-white/70"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-3 rounded-full border-2 border-cyan-300/60"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-6 rounded-full border border-blue-200/50"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* BahBeta text with enhanced styling */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white font-black text-4xl tracking-widest text-center"
                        style={{
                          textShadow: '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(6,182,212,0.8), 0 0 90px rgba(59,130,246,0.6)',
                          fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif'
                        }}
                        animate={{
                          scale: [1, 1.08, 1],
                          textShadow: [
                            '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(6,182,212,0.8)',
                            '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(6,182,212,1)',
                            '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(6,182,212,0.8)',
                          ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        BahBeta
                      </motion.div>
                    </div>
                    
                    {/* Enhanced particle system */}
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-white rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 2, 0],
                          x: [0, (Math.random() - 0.5) * 80],
                          y: [0, (Math.random() - 0.5) * 80],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: Math.random() * 3,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Multiple outer energy fields */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                    animate={{ 
                      scale: [1, 2.8, 1], 
                      opacity: [0.8, 0, 0.8] 
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-300/40"
                    animate={{ 
                      scale: [1, 3.5, 1], 
                      opacity: [0.6, 0, 0.6] 
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/30"
                    animate={{ 
                      scale: [1, 4.2, 1], 
                      opacity: [0.4, 0, 0.4] 
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                  />

                  {/* Click instruction with animation */}
                  <motion.div
                    className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold text-center"
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div>Click to Visit BahBeta</div>
                    <div className="text-sm text-gray-300 mt-1">Google Maps Location</div>
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}