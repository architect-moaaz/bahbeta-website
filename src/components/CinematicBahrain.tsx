import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function CinematicBahrain() {
  const [animationPhase, setAnimationPhase] = useState('sky');
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const skyY = useTransform(scrollY, [0, 1000], [0, -200]);
  const cloudsY = useTransform(scrollY, [0, 1000], [0, -150]);
  const landY = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    const sequence = [
      { phase: 'sky', delay: 0 },
      { phase: 'descent', delay: 1000 },
      { phase: 'reveal', delay: 3500 },
      { phase: 'focus', delay: 5000 }
    ];

    const timers = sequence.map(({ phase, delay }) =>
      setTimeout(() => setAnimationPhase(phase), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic Sky Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: skyY,
          background: animationPhase === 'sky' || animationPhase === 'descent'
            ? 'linear-gradient(180deg, #1e3c72 0%, #2a5298 25%, #87ceeb 50%, #b8d4f0 75%, #e6f3ff 100%)'
            : 'linear-gradient(180deg, #0f4c75 0%, #3282b8 30%, #0f4c75 60%, #1e3c72 100%)'
        }}
        animate={{
          scale: animationPhase === 'sky' ? 1.2 : animationPhase === 'descent' ? 1.1 : 1,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Realistic Cloud Layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y: cloudsY }}
      >
        {/* Upper cloud layer */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: animationPhase === 'sky' ? 0.9 : animationPhase === 'descent' ? 0.6 : 0.2,
            scale: animationPhase === 'sky' ? 1 : 1.3,
          }}
          transition={{ duration: 3 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`upper-${i}`}
              className="absolute"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 60%)',
                width: `${120 + Math.random() * 200}px`,
                height: `${60 + Math.random() * 80}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                borderRadius: '50%',
                filter: 'blur(1px)',
              }}
              animate={{
                x: [0, -50 - Math.random() * 100],
                opacity: [0.8, 0.3, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>

        {/* Lower cloud layer */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: animationPhase === 'descent' ? 0.7 : animationPhase === 'reveal' ? 0.3 : 0,
            y: animationPhase === 'descent' ? 0 : -100,
          }}
          transition={{ duration: 2, delay: 1 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`lower-${i}`}
              className="absolute"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
                width: `${200 + Math.random() * 300}px`,
                height: `${100 + Math.random() * 120}px`,
                left: `${Math.random() * 100}%`,
                top: `${40 + Math.random() * 40}%`,
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
              animate={{
                x: [0, -100 - Math.random() * 150],
                scale: [1, 1.2, 0.8],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Cinematic Bahrain Landscape */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: landY }}
        initial={{ scale: 0.1, opacity: 0, y: 300 }}
        animate={{
          scale: animationPhase === 'sky' ? 0.1 : 
                 animationPhase === 'descent' ? 0.3 : 
                 animationPhase === 'reveal' ? 0.8 : 1,
          opacity: animationPhase === 'sky' ? 0 : 
                   animationPhase === 'descent' ? 0.4 : 1,
          y: animationPhase === 'sky' ? 300 : 
             animationPhase === 'descent' ? 150 : 0,
          rotateX: animationPhase === 'focus' ? [0, -2, 0] : 0,
        }}
        transition={{ 
          duration: 3, 
          ease: [0.25, 0.8, 0.25, 1],
          rotateX: { duration: 6, repeat: Infinity }
        }}
      >
        {/* Main Bahrain Island - Realistic Shape */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Main Island with realistic topography */}
          <motion.div
            className="relative"
            style={{
              width: '280px',
              height: '120px',
              background: 'linear-gradient(135deg, #2d5016 0%, #4a7c23 20%, #8fbc8f 40%, #f4e4bc 60%, #e6daa6 80%, #d2b48c 100%)',
              borderRadius: '45% 55% 65% 35% / 25% 75% 25% 75%',
              position: 'relative',
              filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
              transform: 'perspective(500px) rotateX(15deg)',
            }}
            animate={{
              rotateY: animationPhase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 20,
              repeat: animationPhase === 'focus' ? Infinity : 0,
              ease: "linear"
            }}
          >
            {/* Topographical details */}
            <div className="absolute inset-0 overflow-hidden rounded-[45%_55%_65%_35%_/_25%_75%_25%_75%]">
              {/* Urban areas */}
              <div className="absolute top-6 left-8 w-12 h-8 bg-gray-400 rounded opacity-80" />
              <div className="absolute top-4 right-12 w-8 h-6 bg-gray-500 rounded opacity-70" />
              <div className="absolute bottom-8 left-16 w-10 h-6 bg-gray-300 rounded opacity-75" />
              
              {/* Green areas */}
              <div className="absolute top-8 left-20 w-6 h-4 bg-green-600 rounded-full opacity-60" />
              <div className="absolute bottom-6 right-8 w-8 h-5 bg-green-500 rounded-full opacity-65" />
              
              {/* Coastal features */}
              <div className="absolute top-0 left-4 w-16 h-3 bg-blue-200 rounded-full opacity-50" />
              <div className="absolute bottom-0 right-6 w-12 h-2 bg-blue-300 rounded-full opacity-45" />
            </div>

            {/* Elevation highlights */}
            <div 
              className="absolute inset-0 rounded-[45%_55%_65%_35%_/_25%_75%_25%_75%]"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.3) 0%, transparent 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.2) 100%)',
              }}
            />
          </motion.div>

          {/* Muharraq Island */}
          <motion.div
            className="absolute"
            style={{
              width: '60px',
              height: '35px',
              background: 'linear-gradient(125deg, #3d5a27 0%, #6b8e3d 50%, #8fbc8f 100%)',
              borderRadius: '60% 40% 70% 30% / 40% 60% 40% 60%',
              top: '-15px',
              right: '-25px',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
              transform: 'perspective(300px) rotateX(12deg) rotateZ(8deg)',
            }}
            animate={{
              rotateY: animationPhase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 20,
              repeat: animationPhase === 'focus' ? Infinity : 0,
              ease: "linear",
              delay: 2
            }}
          >
            <div className="absolute top-2 left-3 w-3 h-2 bg-gray-400 rounded opacity-70" />
            <div className="absolute bottom-1 right-2 w-2 h-1 bg-blue-200 rounded opacity-60" />
          </motion.div>

          {/* Sitra Island */}
          <motion.div
            className="absolute"
            style={{
              width: '40px',
              height: '25px',
              background: 'linear-gradient(115deg, #4a5d31 0%, #7a9b4a 70%, #a0c968 100%)',
              borderRadius: '70% 30% 50% 50% / 30% 70% 30% 70%',
              bottom: '-12px',
              left: '-18px',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
              transform: 'perspective(300px) rotateX(10deg) rotateZ(-5deg)',
            }}
            animate={{
              rotateY: animationPhase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 20,
              repeat: animationPhase === 'focus' ? Infinity : 0,
              ease: "linear",
              delay: 4
            }}
          >
            <div className="absolute top-1 right-2 w-2 h-1 bg-gray-300 rounded opacity-60" />
          </motion.div>

          {/* Realistic water surface with reflections */}
          <motion.div
            className="absolute -inset-16"
            style={{
              background: 'radial-gradient(ellipse 120% 50% at 50% 100%, rgba(0,105,148,0.8) 0%, rgba(0,105,148,0.4) 40%, transparent 80%)',
              borderRadius: '50%',
              transform: 'rotateX(85deg) translateZ(-20px)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Water ripples */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-200 rounded-full"
              style={{
                width: `${100 + i * 40}px`,
                height: `${50 + i * 20}px`,
                left: '50%',
                top: '50%',
                marginLeft: `${-50 - i * 20}px`,
                marginTop: `${-25 - i * 10}px`,
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cinematic atmospheric effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: animationPhase === 'focus' 
            ? 'radial-gradient(circle at 50% 30%, rgba(255,223,0,0.1) 0%, transparent 50%)'
            : 'transparent'
        }}
        transition={{ duration: 2 }}
      />

      {/* Depth fog layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.3) 100%)',
        }}
        animate={{
          opacity: animationPhase === 'reveal' || animationPhase === 'focus' ? 1 : 0,
        }}
        transition={{ duration: 2, delay: 1 }}
      />
    </div>
  );
}