interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full glass-surface-subtle">
          <span className="text-[#2D6AE3] uppercase tracking-wider" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
            {eyebrow}
          </span>
        </div>
      )}
      <h2>{title}</h2>
      {subtitle && (
        <p className="body-large" style={{ color: "#334155" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}