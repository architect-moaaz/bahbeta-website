import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function RealisticBahrain() {
  const [phase, setPhase] = useState('atmosphere');
  const { scrollY } = useScroll();
  
  // Advanced parallax layers
  const atmosphereY = useTransform(scrollY, [0, 2000], [0, -400]);
  const cloudsY = useTransform(scrollY, [0, 2000], [0, -300]);
  const landY = useTransform(scrollY, [0, 2000], [0, 200]);

  useEffect(() => {
    const cinematicSequence = [
      { phase: 'atmosphere', delay: 0 },
      { phase: 'stratosphere', delay: 2000 },
      { phase: 'troposphere', delay: 4000 },
      { phase: 'approach', delay: 6000 },
      { phase: 'reveal', delay: 8000 },
      { phase: 'focus', delay: 10000 }
    ];

    const timers = cinematicSequence.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ultra-realistic sky atmosphere */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: atmosphereY,
          background: (() => {
            switch(phase) {
              case 'atmosphere':
                return 'radial-gradient(ellipse at center, #000428 0%, #004e92 40%, #009ffd 70%, #00d2ff 100%)';
              case 'stratosphere':
                return 'linear-gradient(180deg, #0c4a6e 0%, #0284c7 25%, #0ea5e9 50%, #38bdf8 75%, #7dd3fc 100%)';
              case 'troposphere':
                return 'linear-gradient(180deg, #164e63 0%, #0891b2 30%, #06b6d4 60%, #67e8f9 100%)';
              case 'approach':
                return 'linear-gradient(180deg, #0f766e 0%, #14b8a6 40%, #5eead4 80%, #a7f3d0 100%)';
              default:
                return 'linear-gradient(180deg, #1e40af 0%, #3b82f6 30%, #60a5fa 60%, #93c5fd 100%)';
            }
          })()
        }}
        animate={{
          scale: phase === 'atmosphere' ? 1.5 : phase === 'stratosphere' ? 1.3 : 1,
        }}
        transition={{ duration: 3, ease: [0.25, 0.8, 0.25, 1] }}
      />

      {/* Volumetric cloud system */}
      <motion.div
        className="absolute inset-0"
        style={{ y: cloudsY }}
      >
        {/* High altitude cirrus clouds */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: phase === 'atmosphere' ? 0.8 : phase === 'stratosphere' ? 0.6 : 0.2,
          }}
          transition={{ duration: 2 }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`cirrus-${i}`}
              className="absolute"
              style={{
                background: `radial-gradient(ellipse ${120 + i * 20}px ${40 + i * 10}px, rgba(255,255,255,${0.3 + Math.random() * 0.4}) 0%, rgba(255,255,255,${0.1 + Math.random() * 0.2}) 40%, transparent 100%)`,
                width: `${200 + Math.random() * 400}px`,
                height: `${60 + Math.random() * 120}px`,
                left: `${Math.random() * 120 - 10}%`,
                top: `${Math.random() * 50}%`,
                borderRadius: '50%',
                filter: `blur(${1 + Math.random() * 2}px)`,
                transform: `rotate(${Math.random() * 45}deg)`,
              }}
              animate={{
                x: [-100, 150],
                opacity: [0.6, 0.3, 0],
                scale: [1, 1.2, 0.8],
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

        {/* Mid-altitude cumulus clouds */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: phase === 'troposphere' ? 0.9 : phase === 'approach' ? 0.5 : 0.1,
            y: phase === 'troposphere' ? 0 : phase === 'approach' ? -50 : -100,
          }}
          transition={{ duration: 3, delay: 1 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`cumulus-${i}`}
              className="absolute"
              style={{
                background: `radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 30%, rgba(240,248,255,0.2) 60%, transparent 100%)`,
                width: `${300 + Math.random() * 500}px`,
                height: `${150 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${30 + Math.random() * 40}%`,
                borderRadius: `${40 + Math.random() * 20}% ${60 + Math.random() * 20}% ${50 + Math.random() * 20}% ${70 + Math.random() * 20}%`,
                filter: `blur(${2 + Math.random() * 3}px)`,
                transform: `rotate(${Math.random() * 30}deg)`,
              }}
              animate={{
                x: [-150, 200],
                scale: [0.8, 1.3, 1],
                rotateZ: [0, 15, -10],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Realistic Bahrain Archipelago */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: landY }}
        initial={{ scale: 0.05, opacity: 0, y: 500, rotateX: 60 }}
        animate={{
          scale: (() => {
            switch(phase) {
              case 'atmosphere': return 0.05;
              case 'stratosphere': return 0.1;
              case 'troposphere': return 0.2;
              case 'approach': return 0.5;
              case 'reveal': return 0.8;
              case 'focus': return 1;
              default: return 1;
            }
          })(),
          opacity: phase === 'atmosphere' ? 0 : phase === 'stratosphere' ? 0.3 : 1,
          y: (() => {
            switch(phase) {
              case 'atmosphere': return 500;
              case 'stratosphere': return 300;
              case 'troposphere': return 150;
              case 'approach': return 50;
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
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Persian Gulf Waters */}
          <motion.div
            className="absolute"
            style={{
              width: '800px',
              height: '600px',
              background: 'radial-gradient(ellipse, rgba(0,105,148,0.9) 0%, rgba(0,105,148,0.7) 40%, rgba(0,105,148,0.4) 80%, transparent 100%)',
              borderRadius: '50%',
              left: '-250px',
              top: '-150px',
              transform: 'rotateX(75deg) translateZ(-30px)',
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main Bahrain Island - Satellite accurate shape */}
          <motion.div
            className="relative"
            style={{
              width: '320px',
              height: '180px',
              background: `
                linear-gradient(135deg, 
                  #8B4513 0%,     /* Desert brown */
                  #DEB887 15%,    /* Sandy areas */
                  #F4A460 25%,    /* Coastal sand */
                  #228B22 35%,    /* Agricultural areas */
                  #32CD32 40%,    /* Green spaces */
                  #708090 50%,    /* Urban areas */
                  #A9A9A9 60%,    /* Industrial zones */
                  #4682B4 70%,    /* Water features */
                  #F4A460 80%,    /* Eastern coast */
                  #DEB887 90%,    /* Desert return */
                  #8B4513 100%    /* Southern tip */
                )
              `,
              clipPath: 'polygon(15% 10%, 45% 5%, 70% 8%, 85% 15%, 95% 25%, 98% 40%, 95% 55%, 90% 70%, 85% 80%, 75% 88%, 60% 92%, 40% 90%, 25% 85%, 15% 75%, 8% 60%, 5% 45%, 8% 30%, 12% 20%)',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
              transform: 'perspective(800px) rotateX(25deg) rotateY(-5deg)',
              position: 'relative',
            }}
            animate={{
              rotateY: phase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 30,
              repeat: phase === 'focus' ? Infinity : 0,
              ease: "linear"
            }}
          >
            {/* Realistic topographical features */}
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inherit' }}>
              {/* Manama (Capital) */}
              <div className="absolute top-8 left-16 w-16 h-12 bg-gray-600 opacity-90 rounded-sm" />
              <div className="absolute top-6 left-18 w-8 h-6 bg-gray-400 opacity-80 rounded-sm" />
              
              {/* Muharraq area connection */}
              <div className="absolute top-4 right-8 w-12 h-4 bg-gray-500 opacity-75 rounded-sm" />
              
              {/* Riffa (Central) */}
              <div className="absolute top-16 left-20 w-10 h-8 bg-orange-200 opacity-70 rounded-sm" />
              
              {/* Industrial areas (Alba, Askar) */}              
              <div className="absolute bottom-12 left-8 w-20 h-8 bg-gray-700 opacity-85 rounded-sm" />
              <div className="absolute bottom-8 left-12 w-12 h-6 bg-red-300 opacity-60 rounded-sm" />
              
              {/* Agricultural areas */}
              <div className="absolute top-12 left-8 w-8 h-6 bg-green-500 opacity-70 rounded-full" />
              <div className="absolute bottom-16 right-12 w-10 h-6 bg-green-400 opacity-65 rounded-full" />
              <div className="absolute top-10 right-16 w-6 h-4 bg-green-600 opacity-60 rounded-full" />
              
              {/* Coastal features and causeways */}
              <div className="absolute top-0 left-8 w-20 h-2 bg-blue-300 opacity-70 rounded-full" />
              <div className="absolute top-2 right-4 w-16 h-2 bg-blue-200 opacity-65 rounded-full" />
              <div className="absolute bottom-0 left-16 w-18 h-2 bg-blue-400 opacity-75 rounded-full" />
              
              {/* King Fahd Causeway connection point */}
              <div className="absolute bottom-8 right-2 w-3 h-8 bg-gray-300 opacity-80" />
            </div>

            {/* Elevation and lighting effects */}
            <div 
              className="absolute inset-0"
              style={{
                clipPath: 'inherit',
                background: `
                  linear-gradient(145deg, 
                    rgba(255,255,255,0.4) 0%, 
                    transparent 25%, 
                    rgba(0,0,0,0.1) 50%, 
                    rgba(0,0,0,0.3) 75%, 
                    rgba(0,0,0,0.4) 100%
                  )
                `,
              }}
            />
          </motion.div>

          {/* Muharraq Island */}
          <motion.div
            className="absolute"
            style={{
              width: '80px',
              height: '50px',
              background: 'linear-gradient(125deg, #8B4513 0%, #DEB887 30%, #708090 60%, #A9A9A9 100%)',
              clipPath: 'polygon(20% 15%, 60% 10%, 85% 20%, 95% 40%, 90% 65%, 75% 80%, 45% 85%, 20% 75%, 10% 50%, 15% 30%)',
              top: '-20px',
              right: '-35px',
              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))',
              transform: 'perspective(600px) rotateX(20deg) rotateZ(8deg)',
            }}
            animate={{
              rotateY: phase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 30,
              repeat: phase === 'focus' ? Infinity : 0,
              ease: "linear",
              delay: 3
            }}
          >
            {/* Bahrain International Airport */}
            <div className="absolute top-2 left-4 w-8 h-3 bg-gray-200 opacity-90 rounded-sm" />
            <div className="absolute top-3 left-5 w-6 h-1 bg-white opacity-80" />
            
            {/* Muharraq city */}
            <div className="absolute bottom-3 right-3 w-6 h-4 bg-orange-300 opacity-75 rounded-sm" />
          </motion.div>

          {/* Sitra Island */}
          <motion.div
            className="absolute"
            style={{
              width: '60px',
              height: '35px',
              background: 'linear-gradient(115deg, #2F4F2F 0%, #228B22 40%, #708090 70%, #A9A9A9 100%)',
              clipPath: 'polygon(25% 20%, 70% 15%, 90% 35%, 85% 65%, 65% 80%, 35% 85%, 15% 65%, 20% 40%)',
              bottom: '-18px',
              left: '-25px',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.3))',
              transform: 'perspective(400px) rotateX(15deg) rotateZ(-8deg)',
            }}
            animate={{
              rotateY: phase === 'focus' ? [0, 360] : 0,
            }}
            transition={{
              duration: 30,
              repeat: phase === 'focus' ? Infinity : 0,
              ease: "linear",
              delay: 6
            }}
          >
            {/* BAPCO refinery */}
            <div className="absolute top-1 right-2 w-4 h-3 bg-red-400 opacity-70 rounded-sm" />
            <div className="absolute top-2 right-3 w-1 h-2 bg-orange-400 opacity-90" />
          </motion.div>

          {/* Hawar Islands (distant) */}
          <motion.div
            className="absolute"
            style={{
              width: '25px',
              height: '15px',
              background: 'linear-gradient(90deg, #8B4513 0%, #DEB887 100%)',
              clipPath: 'polygon(30% 25%, 70% 20%, 85% 50%, 70% 75%, 30% 80%, 15% 50%)',
              bottom: '40px',
              right: '60px',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
              transform: 'perspective(300px) rotateX(10deg) scale(0.7)',
              opacity: 0.8,
            }}
          />

          {/* Realistic water reflection system */}
          <motion.div
            className="absolute -inset-20"
            style={{
              background: `
                radial-gradient(ellipse 140% 60% at 50% 100%, 
                  rgba(0,105,148,0.8) 0%, 
                  rgba(0,105,148,0.5) 30%, 
                  rgba(30,144,255,0.3) 60%, 
                  transparent 100%
                )
              `,
              borderRadius: '50%',
              transform: 'rotateX(85deg) translateZ(-40px)',
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Dynamic water ripples */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-100 rounded-full"
              style={{
                width: `${120 + i * 60}px`,
                height: `${60 + i * 30}px`,
                left: '50%',
                top: '50%',
                marginLeft: `${-60 - i * 30}px`,
                marginTop: `${-30 - i * 15}px`,
                opacity: 0.4,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cinematic atmospheric lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: phase === 'focus' 
            ? 'radial-gradient(circle at 40% 20%, rgba(255,223,0,0.15) 0%, rgba(255,140,0,0.08) 30%, transparent 60%)'
            : phase === 'reveal'
            ? 'radial-gradient(circle at 50% 30%, rgba(135,206,235,0.1) 0%, transparent 50%)'
            : 'transparent'
        }}
        transition={{ duration: 3 }}
      />

      {/* Depth of field effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.2) 100%)',
        }}
        animate={{
          opacity: phase === 'reveal' || phase === 'focus' ? 1 : 0,
        }}
        transition={{ duration: 3, delay: 2 }}
      />

      {/* Film grain overlay for cinematic feel */}
      <motion.div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}