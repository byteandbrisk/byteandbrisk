import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function BackgroundOrbs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#F0F4F8]" />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(120%) brightness(100%)'
        }}
      />

      {/* Orb 1 - Top Left (Electric Blue) */}
      <motion.div
        className="absolute -top-[10%] -left-[5%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[90px] opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(45, 106, 227, 0.8) 0%, rgba(45, 106, 227, 0) 70%)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2 - Bottom Right (Deep Iris) */}
      <motion.div
        className="absolute -bottom-[10%] -right-[5%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[90px] opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(123, 97, 255, 0.7) 0%, rgba(123, 97, 255, 0) 70%)",
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Orb 3 - Center Floating (Neon Mint) */}
      <motion.div
        className="absolute top-[20%] left-[30%] w-[35vw] h-[35vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(28, 214, 160, 0.6) 0%, rgba(28, 214, 160, 0) 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
}

