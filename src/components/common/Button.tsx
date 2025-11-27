import { motion } from "motion/react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer font-medium";
  
  const sizeStyles = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3",
    lg: "px-10 py-4",
  };
  
  const variantStyles = {
    primary: "glass-surface-strong hover:shadow-[0_14px_48px_rgba(16,24,40,0.22)] hover:-translate-y-0.5",
    secondary: "glass-surface hover:shadow-[0_14px_48px_rgba(16,24,40,0.22)] hover:-translate-y-0.5 border-2",
    tertiary: "hover:bg-[rgba(255,255,255,0.14)] px-4",
  };
  
  return (
    <motion.button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.16 }}
    >
      {children}
    </motion.button>
  );
}