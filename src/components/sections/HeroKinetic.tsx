import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@components/common/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroKinetic() {
  const shouldReduceMotion = useReducedMotion();
  const [showContent, setShowContent] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax springs for chips
  const springConfig = { mass: 1, stiffness: 280, damping: 26 };
  const parallaxX = useSpring(useTransform(mouseX, [-500, 500], [-8, 8]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-500, 500], [-8, 8]), springConfig);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  // Ignite Sweep - one-shot radial glow
  const igniteSweepVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 2, 3],
      opacity: [0, 0.3, 0],
      transition: { duration: 0.9, ease: [0.18, 0.9, 0.2, 1] }
    }
  };

  // Building fast - Kinetic rotation
  const buildingFastVariants = shouldReduceMotion ? {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, delay: 0.2 }
    }
  } : {
    initial: { opacity: 0, rotateZ: 0 },
    animate: {
      opacity: 1,
      rotateZ: [0, 90, 0, -8, 0],
      transition: {
        duration: 0.42,
        delay: 0.3,
        times: [0, 0.3, 0.5, 0.85, 1],
        ease: [0.18, 0.9, 0.2, 1]
      }
    }
  };

  // Thinking deep - Gravity drop
  const thinkingDeepVariants = shouldReduceMotion ? {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, delay: 0.4 }
    }
  } : {
    initial: { opacity: 0, y: -48 },
    animate: {
      opacity: 1,
      y: [-48, 0, 6, 0],
      transition: {
        duration: 0.6,
        delay: 0.6,
        times: [0, 0.6, 0.85, 1],
        ease: [0.18, 0.9, 0.2, 1]
      }
    }
  };

  // Positioning statement
  const positioningVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 1.0, ease: [0.18, 0.9, 0.2, 1] }
    }
  };

  // CTA group with blur
  const ctaGroupVariants = {
    initial: { opacity: 0, scale: 0.96, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.35, delay: 1.2, ease: [0.18, 0.9, 0.2, 1] }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-radiance" />

      {/* Hero Panel - Elevation 2 */}
      <div className="container-custom relative z-10 py-20">
        <motion.div
          className="glass-surface-strong rounded-3xl p-8 md:p-12 lg:p-16 max-w-6xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Ignite Sweep - One-shot radial glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(45, 106, 227, 0.15) 0%, transparent 70%)",
              transform: "translate(-50%, -50%)"
            }}
            variants={igniteSweepVariants}
            initial="initial"
            animate={showContent ? "animate" : "initial"}
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Logo Lockup */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl glass-surface flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#2D6AE3]" strokeWidth={2} />
                </div>
                <span className="text-2xl" style={{ fontWeight: 700, color: "#0F172A" }}>
                  Byte&Brisk
                </span>
              </motion.div>

              {/* Kinetic Headlines */}
              <div className="space-y-2">
                {/* Line 1: Building fast. - Rotation */}
                <motion.h1
                  variants={buildingFastVariants}
                  initial="initial"
                  animate={showContent ? "animate" : "initial"}
                  style={{ transformOrigin: "left center" }}
                >
                  Building fast.
                </motion.h1>

                {/* Line 2: Thinking deep. - Gravity drop */}
                <motion.h1
                  variants={thinkingDeepVariants}
                  initial="initial"
                  animate={showContent ? "animate" : "initial"}
                >
                  Thinking deep.
                </motion.h1>
              </div>

              {/* Positioning Statement */}
              <motion.div
                variants={positioningVariants}
                initial="initial"
                animate={showContent ? "animate" : "initial"}
              >
                <p className="body-large" style={{ color: "#334155" }}>
                  We craft modern software with precision and momentum — from MVPs to scalable products.
                </p>
              </motion.div>

              {/* CTAs with blur effect */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={ctaGroupVariants}
                initial="initial"
                animate={showContent ? "animate" : "initial"}
              >
                <Button variant="primary" size="lg">
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
                </Button>
                <Button variant="secondary" size="lg">
                  Talk to Us
                </Button>
              </motion.div>
            </div>

            {/* Right: Ambient Field with Glass Chips */}
            <div className="hidden lg:flex items-center justify-center relative h-96">
              {/* Ring Gradient - Subtle */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: "radial-gradient(circle, rgba(45, 106, 227, 0.08) 0%, transparent 60%)"
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Glass Chip 1 - Slow orbit with parallax */}
              <motion.div
                className="absolute w-24 h-24 rounded-xl glass-surface flex items-center justify-center"
                style={{
                  x: parallaxX,
                  y: parallaxY,
                }}
                animate={{
                  x: [0, 40, 0, -40, 0],
                  y: [0, -30, -40, -30, 0],
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 14,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D6AE3]/20 to-[#1CD6A0]/20" />
              </motion.div>

              {/* Glass Chip 2 */}
              <motion.div
                className="absolute w-20 h-20 rounded-lg glass-surface flex items-center justify-center"
                style={{
                  x: useTransform(parallaxX, (x) => x * 0.6),
                  y: useTransform(parallaxY, (y) => y * 0.6),
                  right: 60,
                  top: 80,
                }}
                animate={{
                  x: [0, -30, 0, 30, 0],
                  y: [0, 40, 50, 40, 0],
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B61FF]/20 to-[#1CD6A0]/20" />
              </motion.div>

              {/* Glass Chip 3 */}
              <motion.div
                className="absolute w-16 h-16 rounded-full glass-surface-subtle"
                style={{
                  x: useTransform(parallaxX, (x) => x * -0.5),
                  y: useTransform(parallaxY, (y) => y * -0.5),
                  left: 80,
                  bottom: 100,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 18,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Ring Gradient - Teal */}
              <motion.div
                className="absolute w-64 h-64 rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, rgba(28, 214, 160, 0.12) 20%, transparent 70%)",
                  bottom: 40,
                  right: 60,
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full glass-surface flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-2 rounded-full bg-[#2D6AE3]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

