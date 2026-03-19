import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function GoogleMapsZoom() {
  const [zoomLevel, setZoomLevel] = useState(6); // Start from country level
  const [phase, setPhase] = useState('zooming');
  const [showOrb, setShowOrb] = useState(false);

  // BahBeta coordinates: 26.219424, 50.5691576
  const BAHBETA_LAT = 26.219424;
  const BAHBETA_LNG = 50.5691576;

  useEffect(() => {
    // Google Maps style automatic zoom progression
    const zoomSequence = [
      { zoom: 6, duration: 2000 },   // Country level - Bahrain visible
      { zoom: 8, duration: 1800 },   // Regional level - Gulf region
      { zoom: 10, duration: 1600 },  // State level - Bahrain archipelago
      { zoom: 12, duration: 1400 },  // City level - Manama region
      { zoom: 14, duration: 1200 },  // District level - BahBeta area
      { zoom: 16, duration: 1000 },  // Neighborhood level
      { zoom: 18, duration: 800 },   // Street level
      { zoom: 20, duration: 600 }    // Building level - BahBeta precision
    ];

    let currentStep = 0;
    
    const executeZoomSequence = () => {
      if (currentStep < zoomSequence.length) {
        const step = zoomSequence[currentStep];
        
        setTimeout(() => {
          setZoomLevel(step.zoom);
          currentStep++;
          executeZoomSequence();
        }, currentStep === 0 ? 1000 : zoomSequence[currentStep - 1]?.duration || 1000);
      } else {
        // Zoom complete
        setTimeout(() => {
          setPhase('arrived');
          setTimeout(() => setShowOrb(true), 1500);
        }, 1000);
      }
    };

    executeZoomSequence();
  }, []);

  // Dynamic center coordinates - smooth transition to BahBeta as zoom increases
  const getMapCenter = () => {
    // Start from wider Gulf region view and smoothly move to BahBeta
    if (zoomLevel <= 8) {
      return { lat: 26.0, lng: 50.5 }; // Gulf region center
    } else if (zoomLevel <= 10) {
      return { lat: 26.1, lng: 50.55 }; // Bahrain center
    } else if (zoomLevel <= 12) {
      return { lat: 26.15, lng: 50.56 }; // Northern Bahrain
    } else if (zoomLevel <= 14) {
      return { lat: 26.2, lng: 50.565 }; // Manama area
    } else if (zoomLevel <= 16) {
      return { lat: 26.21, lng: 50.568 }; // BahBeta district
    } else {
      return { lat: BAHBETA_LAT, lng: BAHBETA_LNG }; // Exact BahBeta location
    }
  };

  // Google Maps embed URL with exact zoom levels
  const getMapUrl = () => {
    const center = getMapCenter();
    
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d${getScaleForZoom(zoomLevel)}!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1673000000000!5m2!1sen!2s`;
  };

  // Calculate proper scale for each zoom level (Google Maps style)
  const getScaleForZoom = (zoom: number) => {
    const baseScale = 40075016.686; // Earth's circumference in meters
    return Math.round(baseScale / Math.pow(2, zoom));
  };

  const getViewDescription = () => {
    if (zoomLevel <= 6) return 'GULF REGION';
    if (zoomLevel <= 8) return 'BAHRAIN COUNTRY';
    if (zoomLevel <= 10) return 'ARCHIPELAGO VIEW';
    if (zoomLevel <= 12) return 'MANAMA REGION';
    if (zoomLevel <= 14) return 'BAHBETA DISTRICT';
    if (zoomLevel <= 16) return 'NEIGHBORHOOD';
    if (zoomLevel <= 18) return 'STREET LEVEL';
    return 'BUILDING DETAIL';
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-slate-50">
      {/* Full-screen Google Maps with automatic zoom */}
      <div className="relative w-full h-full">
        <motion.iframe
          key={`${zoomLevel}-${getMapCenter().lat}-${getMapCenter().lng}`}
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{ 
            border: 0,
            filter: phase === 'arrived' ? 'grayscale(100%) contrast(1.1) brightness(0.9)' : 'none',
            transition: 'filter 2s ease-in-out'
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Google Maps style zoom indicator */}
        <motion.div
          className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 font-sans"
          animate={{
            opacity: phase === 'zooming' ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Zoom Level {zoomLevel}</div>
              <div className="text-xs text-gray-600">{getViewDescription()}</div>
            </div>
          </div>
          
          {/* Zoom scale indicator */}
          <div className="mt-3 flex items-center space-x-2">
            <div className="text-xs text-gray-500">Scale:</div>
            <div className="flex-1 bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-blue-500 h-1 rounded-full"
                animate={{ width: `${((zoomLevel - 6) / 14) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-gray-500">{Math.round(getScaleForZoom(zoomLevel) / 1000)}km</div>
          </div>
        </motion.div>

        {/* Google Maps style location pin that appears when zoomed in */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            opacity: zoomLevel >= 14 ? 1 : 0,
            scale: zoomLevel >= 16 ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Google Maps style pin */}
            <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            
            {/* Pin shadow */}
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/30 rounded-full blur-sm"></div>
            
            {/* BahBeta label */}
            <motion.div
              className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 whitespace-nowrap"
              animate={{
                opacity: zoomLevel >= 16 ? 1 : 0,
                y: zoomLevel >= 16 ? 0 : 10,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-sm font-semibold text-gray-900">BahBeta</div>
              <div className="text-xs text-gray-600">Technology Company</div>
              
              {/* Speech bubble arrow */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Google Maps style controls (non-functional, just visual) */}
        <div className="absolute top-8 right-8 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 border-b border-gray-200">
            <span className="text-xl text-gray-600">+</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
            <span className="text-xl text-gray-600">−</span>
          </button>
        </div>

        {/* Google Maps style satellite/map toggle */}
        <div className="absolute bottom-8 left-8 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50">Satellite</div>
        </div>

        {/* Arrival notification */}
        <AnimatePresence>
          {phase === 'arrived' && !showOrb && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 text-center p-8 max-w-md mx-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Found!</h2>
                <p className="text-gray-600 mb-4">Successfully zoomed to BahBeta headquarters</p>
                <div className="text-sm text-gray-500 mb-6">
                  <div>26.219424°N, 50.5691576°E</div>
                  <div>Zoom Level: 20 (Building Detail)</div>
                </div>
                <div className="text-lg text-blue-600 font-medium">Loading BahBeta Portal...</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium BahBeta Orb with Google Maps styling */}
        <AnimatePresence>
          {showOrb && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 2, 
                ease: [0.25, 0.8, 0.25, 1],
                scale: { type: "spring", stiffness: 100, damping: 20 }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.button
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  window.open('https://www.google.com/maps/place/BahBeta/@26.219424,50.5665827,1002m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e49af664a9e37bf:0xc486688e6e7a8b61!8m2!3d26.219424!4d50.5691576!16s%2Fg%2F11w27m4q3x', '_blank');
                }}
              >
                <div className="relative">
                  {/* Main orb with Google-inspired design */}
                  <motion.div
                    className="w-72 h-72 rounded-full relative overflow-hidden bg-white shadow-2xl border-8 border-white"
                    style={{
                      background: 'linear-gradient(135deg, #4285f4 0%, #34a853 25%, #fbbc05 50%, #ea4335 75%, #4285f4 100%)',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 100px rgba(66, 133, 244, 0.7), 0 0 200px rgba(52, 168, 83, 0.5)',
                        '0 0 120px rgba(66, 133, 244, 0.9), 0 0 240px rgba(52, 168, 83, 0.7)',
                        '0 0 100px rgba(66, 133, 244, 0.7), 0 0 200px rgba(52, 168, 83, 0.5)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {/* Google-style inner elements */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/60 via-white/20 to-transparent"></div>
                    <div className="absolute inset-8 rounded-full bg-gradient-to-tl from-blue-200/50 to-transparent"></div>
                    
                    {/* Rotating Google-colored rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4"
                      style={{ borderColor: '#4285f4' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-4 rounded-full border-2"
                      style={{ borderColor: '#34a853' }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* BahBeta logo with Google-style typography */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white font-bold text-4xl text-center"
                        style={{
                          textShadow: '0 0 40px rgba(255,255,255,0.9), 0 0 80px rgba(66,133,244,0.7)',
                          fontFamily: '"Google Sans", "Segoe UI", system-ui, sans-serif'
                        }}
                        animate={{
                          scale: [1, 1.06, 1],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="leading-tight">
                          <div style={{ color: '#4285f4' }}>Bah</div>
                          <div style={{ color: '#34a853' }}>Beta</div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Google-colored particles */}
                    {[...Array(20)].map((_, i) => {
                      const colors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];
                      return (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: colors[i % 4],
                            left: `${15 + Math.random() * 70}%`,
                            top: `${15 + Math.random() * 70}%`,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                          }}
                        />
                      );
                    })}
                  </motion.div>

                  {/* Outer Google-style energy rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-3 border-blue-500/40"
                    animate={{ 
                      scale: [1, 3, 1], 
                      opacity: [0.7, 0, 0.7] 
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-500/30"
                    animate={{ 
                      scale: [1, 3.8, 1], 
                      opacity: [0.5, 0, 0.5] 
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
                  />

                  {/* Click instruction */}
                  <motion.div
                    className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center"
                    animate={{ 
                      opacity: [0.8, 1, 0.8],
                      y: [0, -8, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-3">
                      <div className="text-lg font-semibold text-gray-900">Visit BahBeta</div>
                      <div className="text-sm text-gray-600">View on Google Maps</div>
                    </div>
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