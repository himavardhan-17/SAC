import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);
  const leftLogoControls: AnimationControls = useAnimation(); // SAC logo (from left)
  const rightLogoControls: AnimationControls = useAnimation(); // Vardhaman logo (from right)

  useEffect(() => {
    const animateLogos = async () => {
      await Promise.all([
        leftLogoControls.start({
          x: ["-100vw", "0vw", "30vw"],
          rotate: [0, 360],
          transition: { duration: 3, ease: "easeInOut" },
        }),
        rightLogoControls.start({
          x: ["100vw", "0vw", "-30vw"],
          rotate: [0, -360],
          transition: { duration: 3, ease: "easeInOut" },
        }),
      ]);

      setShowText(true);

      // Call onComplete after total 5 seconds from start (3s + 2s text)
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    };

    animateLogos();
  }, [leftLogoControls, rightLogoControls, onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background glow rings */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500 rounded-full opacity-30 blur-[180px] top-0 -left-40 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full opacity-30 blur-[160px] bottom-0 -right-32 animate-pulse" />

      {/* Logos */}
      <div className="flex items-center justify-center gap-20 z-10 mb-10">
        {/* SAC Logo (Left) */}
        <motion.img
          src="/logos/sac-Preloader.png"
          alt="SAC Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
          animate={leftLogoControls}
          initial={{ x: "-100vw", rotate: 0 }}
        />

        {/* Vardhaman Logo (Right) */}
        <motion.img
          src="/logos/vce-Preloader.png"
          alt="Vardhaman Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
          animate={rightLogoControls}
          initial={{ x: "100vw", rotate: 0 }}
        />
      </div>

      {/* SAC Title with Typewriter */}
      {showText && (
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-widest z-10"
          style={{
            textShadow:
              "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typewriter
            words={["SAC"]}
            loop={1}
            cursor
            cursorStyle="l"
            typeSpeed={120}
            deleteSpeed={0}
            delaySpeed={200}
          />
        </motion.h1>
      )}

      {/* Tagline */}
      {showText && (
        <div className="mt-4 text-center z-10">
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-slate-300 italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Student Affairs Cell
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-slate-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Vardhaman College of Engineering
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default Preloader;
