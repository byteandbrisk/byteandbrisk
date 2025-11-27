import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@components/common/SectionHeader";
import { Badge } from "@components/common/Badge";
import { TrendingUp, ShoppingBag, Rocket, ExternalLink } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Stock market dashboard with live data streams",
    outcome: "Deployed in days, extensible in weeks",
    badge: "SaaS",
    category: "Financial Technology",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace Engine",
    description: "Multi-vendor e-commerce platform template",
    outcome: "From concept to MVP in 3 weeks",
    badge: "Platform",
    category: "E-commerce",
  },
  {
    icon: Rocket,
    title: "Launch Accelerator",
    description: "Component library and landing page system",
    outcome: "Reusable, scalable, production-ready",
    badge: "Toolkit",
    category: "Developer Tools",
  },
];

function TrackRecordTile({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Cascade reveal with glow pulse
  const cascadeVariants = shouldReduceMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, delay: index * 0.09 } }
  } : {
    initial: { opacity: 0, scale: 0.98 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, delay: index * 0.09, ease: [0.18, 0.9, 0.2, 1] }
    }
  };

  const handleAnimationComplete = () => {
    if (!shouldReduceMotion) {
      setShowGlow(true);
      setTimeout(() => setShowGlow(false), 600);
    }
  };

  return (
    <motion.div
      variants={cascadeVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      onAnimationComplete={handleAnimationComplete}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {/* Glow Ring Pulse - one-time on reveal */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.95, 1.05, 1.1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            boxShadow: "0 0 24px rgba(45, 106, 227, 0.4)",
          }}
        />
      )}

      <motion.div
        className="glass-surface h-full space-y-6 cursor-pointer relative overflow-hidden"
        animate={{
          borderRadius: isHovered ? "20px" : "12px",
          background: isHovered ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.14)",
        }}
        transition={{ duration: 0.22 }}
        style={{ padding: "2rem" }}
      >
        {/* Category Chip - slides in on hover */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ x: 60, opacity: 0 }}
          animate={{
            x: isHovered ? 0 : 60,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.18, 0.9, 0.2, 1] }}
        >
          <span className="px-3 py-1 rounded-full glass-surface-subtle text-[#2D6AE3] text-xs">
            {project.category}
          </span>
        </motion.div>

        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-xl glass-surface-subtle flex items-center justify-center">
            <project.icon className="w-7 h-7 text-[#1CD6A0]" strokeWidth={1.5} />
          </div>
          <Badge variant="success">{project.badge}</Badge>
        </div>

        <div className="space-y-3">
          <h3 style={{ fontSize: "1.25rem", lineHeight: "1.4" }}>
            {project.title}
          </h3>
          <p style={{ color: "#475569", fontSize: "0.9375rem" }}>
            {project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/20">
          <p className="caption italic">{project.outcome}</p>
        </div>

        {/* External link with micro-bounce on hover */}
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 text-[#2D6AE3] text-sm font-medium"
          animate={{
            y: isHovered ? [0, -6, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          View Project
          <ExternalLink className="w-4 h-4" strokeWidth={2} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function TrackRecord() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow="Track Record"
            title="What we've shipped"
            subtitle="Real products, real results, ready to scale."
            centered
            className="mb-16"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <TrackRecordTile key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
