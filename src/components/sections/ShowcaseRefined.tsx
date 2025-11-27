import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

const showcaseItems = [
  {
    title: "Financial Dashboard",
    category: "Analytics",
    description: "Real-time market data visualization",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Task Manager Pro",
    category: "Productivity",
    description: "Team collaboration platform",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "E-commerce Hub",
    category: "Marketplace",
    description: "Multi-vendor shopping experience",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    title: "Health Tracker",
    category: "Wellness",
    description: "Personal fitness monitoring",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Learning Portal",
    category: "Education",
    description: "Interactive course platform",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Event Manager",
    category: "Events",
    description: "Ticketing and scheduling system",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
];

function ShowcaseTile({ item, index }: { item: typeof showcaseItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [borderProgress, setBorderProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const column = index % 2;

  // Alternating reveal: scale-up for col A, clip-reveal for col B
  const revealVariants = shouldReduceMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, delay: index * 0.08 } }
  } : column === 0 ? {
    initial: { opacity: 0, scale: 0.96 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: index * 0.08, ease: [0.18, 0.9, 0.2, 1] }
    }
  } : {
    initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    animate: {
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 0.6, delay: index * 0.08, ease: [0.18, 0.9, 0.2, 1] }
    }
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    if (!shouldReduceMotion) {
      // Animate border from 0 to 100%
      const duration = 600;
      const frames = 30;
      const increment = 100 / frames;
      let progress = 0;

      const timer = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
          setBorderProgress(100);
          clearInterval(timer);
        } else {
          setBorderProgress(progress);
        }
      }, duration / frames);
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setBorderProgress(0);
  };

  return (
    <motion.div
      variants={revealVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative group cursor-pointer"
    >
      <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden glass-surface">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%">
            <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
        </div>

        {/* Animated Border on Hover */}
        {isHovered && !shouldReduceMotion && (
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
            <rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="14"
              fill="none"
              stroke="rgba(45, 106, 227, 0.5)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={1000 - (borderProgress * 10)}
              style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
            />
          </svg>
        )}

        {/* Glass Overlay */}
        <motion.div
          className="absolute inset-0 glass-surface-strong m-4 rounded-xl flex flex-col justify-end p-6"
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full glass-surface-subtle text-[#2D6AE3]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                {item.category}
              </span>
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="w-5 h-5 text-[#2D6AE3]" strokeWidth={2} />
              </motion.div>
            </div>
            
            <h3 style={{ fontSize: "1.5rem", lineHeight: "1.3", color: "#0F172A" }}>
              {item.title}
            </h3>
            
            <p style={{ color: "#475569", fontSize: "0.9375rem" }}>
              {item.description}
            </p>
            
            <p className="caption mt-2">Deployed in days, extensible in weeks.</p>
          </div>
        </motion.div>

        {/* Refractive Highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)"
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export function ShowcaseRefined() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F8FA] via-[#F0F5F9] to-[#F5F8FA]" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full glass-surface-subtle mb-6">
            <span className="text-[#2D6AE3] uppercase tracking-wider" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
              Portfolio
            </span>
          </div>
          <h2 className="mb-6">Recent builds</h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: "#334155" }}>
            Interactive demos and production applications we've crafted for clients and internal products.
          </p>
        </motion.div>

        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          {showcaseItems.map((item, index) => (
            <div key={item.title} className="snap-center shrink-0 w-[85vw] md:w-auto">
              <ShowcaseTile item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
