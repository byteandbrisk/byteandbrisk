import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  variant?: "neutral" | "highlight" | "cta";
  className?: string;
  hoverable?: boolean;
}

export function GlassCard({
  children,
  variant = "neutral",
  className = "",
  hoverable = true,
}: GlassCardProps) {
  const variantStyles = {
    neutral: "glass-surface",
    highlight: "glass-surface-strong",
    cta: "glass-surface border-2",
  };
  
  const hoverAnimation = hoverable ? {
    whileHover: { 
      y: -2,
      boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)",
      background: "rgba(255, 255, 255, 0.18)",
    },
    transition: { duration: 0.18 }
  } : {};
  
  return (
    <motion.div
      className={`${variantStyles[variant]} rounded-xl p-8 ${className}`}
      {...hoverAnimation}
    >
      {children}
    </motion.div>
  );
}
