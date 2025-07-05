import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedBahrain() {
  const [animationPhase, setAnimationPhase] = useState('clouds');

  useEffect(() => {
    // Start zoom animation after component mounts
    const timer1 = setTimeout(() => setAnimationPhase('zooming'), 500);
    const timer2 = setTimeout(() => setAnimationPhase('focused'), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky background with clouds */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: animationPhase === 'clouds' 
            ? 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 30%, #B0E0E6 60%, #E0F6FF 100%)'
            : 'linear-gradient(to bottom, #4682B4 0%, #5F9EA0 50%, #006994 100%)'
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Animated clouds */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              width: `${60 + i * 20}px`,
              height: `${30 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${5 + i * 8}%`,
            }}
            animate={{
              x: animationPhase === 'clouds' ? [0, 20, 0] : [0, 200],
              opacity: animationPhase === 'focused' ? 0 : 0.7,
              scale: animationPhase === 'focused' ? 0 : 1,
            }}
            transition={{
              duration: animationPhase === 'clouds' ? 4 : 2,
              repeat: animationPhase === 'clouds' ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Bahrain Islands Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.1, y: 200 }}
        animate={{
          scale: animationPhase === 'clouds' ? 0.1 : animationPhase === 'zooming' ? 0.5 : 1,
          y: animationPhase === 'clouds' ? 200 : animationPhase === 'zooming' ? 100 : 0,
        }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        {/* Main Bahrain Island */}
        <motion.div
          className="relative"
          animate={{
            rotateY: animationPhase === 'focused' ? [0, 360] : 0,
          }}
          transition={{
            duration: 8,
            repeat: animationPhase === 'focused' ? Infinity : 0,
            ease: "linear"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Island */}
          <div
            className="bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl relative"
            style={{
              width: '200px',
              height: '80px',
              borderRadius: '20px 40px 30px 15px',
              transform: 'rotateX(10deg)',
              boxShadow: '0 20px 40px rgba(0, 100, 200, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Island details */}
            <div className="absolute top-2 left-4 w-3 h-3 bg-cyan-300 rounded-full opacity-80" />
            <div className="absolute top-4 right-6 w-2 h-2 bg-cyan-400 rounded-full opacity-70" />
            <div className="absolute bottom-3 left-8 w-4 h-2 bg-cyan-200 rounded opacity-60" />
          </div>

          {/* Smaller Islands */}
          <div
            className="absolute bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
            style={{
              width: '40px',
              height: '20px',
              borderRadius: '8px 15px 10px 5px',
              top: '-10px',
              right: '-20px',
              transform: 'rotateX(10deg) rotateZ(15deg)',
              boxShadow: '0 10px 20px rgba(0, 100, 200, 0.2)',
            }}
          />

          <div
            className="absolute bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
            style={{
              width: '25px',
              height: '15px',
              borderRadius: '6px 10px 8px 4px',
              bottom: '-8px',
              left: '-15px',
              transform: 'rotateX(10deg) rotateZ(-10deg)',
              boxShadow: '0 8px 16px rgba(0, 100, 200, 0.2)',
            }}
          />

          {/* Water ripples effect */}
          <motion.div
            className="absolute -inset-8 border-2 border-cyan-200 rounded-full opacity-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Ocean/water effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '60%',
          background: 'linear-gradient(to bottom, rgba(0, 105, 148, 0.3) 0%, rgba(0, 105, 148, 0.8) 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'focused' ? 1 : 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {/* Animated water waves */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-30"
            style={{
              height: '2px',
              width: '100%',
              top: `${20 + i * 15}%`,
            }}
            animate={{
              x: [-100, 100],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}