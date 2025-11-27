import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "info" | "success" | "muted";
  className?: string;
}

export function Badge({
  children,
  variant = "info",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    info: "bg-[rgba(45,106,227,0.12)] text-[#2D6AE3]",
    success: "bg-[rgba(28,214,160,0.12)] text-[#1CD6A0]",
    muted: "bg-[rgba(255,255,255,0.12)] text-[#94A3B8]",
  };
  
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full ${variantStyles[variant]} ${className}`}
      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
    >
      {children}
    </span>
  );
}