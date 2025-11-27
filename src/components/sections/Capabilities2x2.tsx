import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@components/common/SectionHeader";
import { Cloud, BarChart3, Layers, Workflow } from "lucide-react";
import { useState } from "react";

const capabilities = [
  {
    icon: Layers,
    title: "SaaS Platforms & MVPs",
    benefit: "Ship credible V1s fast. Design-to-dev in one loop.",
    stat: "Avg. MVP: 2–4 weeks",
    quadrant: "Q1",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Analytics",
    benefit: "Operational clarity from day one. Charts that tell the 'so what'.",
    stat: "Built for insight",
    quadrant: "Q2",
  },
  {
    icon: Workflow,
    title: "Automation & APIs",
    benefit: "Glue systems. Remove toil. Own your throughput.",
    stat: "Integration-ready",
    quadrant: "Q3",
  },
  {
    icon: Cloud,
    title: "Cloud & Integration",
    benefit: "Secure. Observable. Scale without ceremony.",
    stat: "99.9% uptime",
    quadrant: "Q4",
  },
];

function CapabilityCard({ capability, index }: { capability: typeof capabilities[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [iconOrbit, setIconOrbit] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Unique reveal per quadrant
  const getRevealVariants = () => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.3, delay: index * 0.1 } }
      };
    }

    switch (capability.quadrant) {
      case "Q1": // Slide from left
        return {
          initial: { opacity: 0, x: -24 },
          animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.42, delay: index * 0.12, ease: [0.18, 0.9, 0.2, 1] }
          }
        };
      case "Q2": // Scale + blur
        return {
          initial: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
          animate: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.42, delay: index * 0.12, ease: [0.18, 0.9, 0.2, 1] }
          }
        };
      case "Q3": // Clip-reveal (mask expand)
        return {
          initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          animate: {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            transition: { duration: 0.8, delay: index * 0.12, ease: [0.18, 0.9, 0.2, 1] }
          }
        };
      case "Q4": // Elevation pop + icon tilt
        return {
          initial: { opacity: 0, scale: 0.94 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.42, delay: index * 0.12, ease: [0.18, 0.9, 0.2, 1] }
          }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.42, delay: index * 0.12 } }
        };
    }
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    if (!shouldReduceMotion) {
      // Trigger icon orbit
      setIconOrbit(1);
      setTimeout(() => setIconOrbit(0), 1200);
    }
  };

  return (
    <motion.div
      variants={getRevealVariants()}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setIsHovered(false)}
      className="relative h-full"
    >
      <motion.div
        className="glass-surface rounded-xl p-8 h-full flex flex-col space-y-6 cursor-pointer"
        animate={{
          background: isHovered ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.65)",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
          boxShadow: isHovered
            ? "0 20px 40px -8px rgba(28, 42, 66, 0.08), 0 8px 16px -4px rgba(28, 42, 66, 0.04)"
            : "0 4px 12px -2px rgba(28, 42, 66, 0.04), 0 2px 6px -2px rgba(28, 42, 66, 0.02)",
        }}
        transition={{ duration: 0.22 }}
      >
        {/* Icon with micro-orbit */}
        <motion.div
          className="w-12 h-12 rounded-lg glass-surface-subtle flex items-center justify-center"
          animate={{
            x: iconOrbit ? [0, 3, 6, 3, 0, -3, -6, -3, 0] : 0,
            y: iconOrbit ? [0, -3, 0, 3, 0, 3, 0, -3, 0] : 0,
            rotate: capability.quadrant === "Q4" && isHovered ? [0, 15, 0] : 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <capability.icon className="w-6 h-6 text-[#2D6AE3]" strokeWidth={1.5} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3 style={{ fontSize: "1.25rem", lineHeight: "1.4" }}>
            {capability.title}
          </h3>

          <p style={{ color: "#475569", fontSize: "0.9375rem", lineHeight: 1.6 }}>
            {capability.benefit}
          </p>
        </div>

        {/* Footer */}
        <div className="space-y-3 pt-4 border-t border-white/20">
          <p className="caption">{capability.stat}</p>
          
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-[#2D6AE3] hover:gap-3 transition-all duration-200"
            style={{ fontSize: "0.9375rem", fontWeight: 500 }}
          >
            How we deliver
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Capabilities2x2() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F8FA] via-[#EBFAFF] to-[#F5F8FA] opacity-60" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow="Capabilities"
            title="What we deliver"
            subtitle="End-to-end software craftsmanship, from concept to scale."
            centered
            className="mb-16"
          />
        </motion.div>

        {/* 2×2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
