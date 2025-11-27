import { ReactNode } from "react";

interface IconCircleProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconCircle({
  children,
  size = "md",
  className = "",
}: IconCircleProps) {
  const sizeStyles = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };
  
  return (
    <div
      className={`${sizeStyles[size]} rounded-full glass-surface flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
