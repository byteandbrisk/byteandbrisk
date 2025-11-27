import { motion, useReducedMotion, useInView } from "motion/react";
import { SectionHeader } from "@components/common/SectionHeader";
import { Search, Palette, Code, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Discover",
    description: "Scope clarity. Risks mapped.",
    outcome: "Output: one-page tech brief",
    tooltip: "Avg. discovery: 48h",
  },
  {
    number: 2,
    icon: Palette,
    title: "Design",
    description: "Prototypes that de-risk, not decorate.",
    outcome: "Usability or it doesn't ship",
    tooltip: "Avg. design: 3-5 days",
  },
  {
    number: 3,
    icon: Code,
    title: "Build",
    description: "Tight loops. Measurable increments.",
    outcome: "Merge to main weekly",
    tooltip: "Avg. sprint: 1-2 weeks",
  },
  {
    number: 4,
    icon: Zap,
    title: "Scale",
    description: "Observability and SLOs baked in.",
    outcome: "Less heroics, more headroom",
    tooltip: "Ongoing optimization",
  },
];

function StepCard({ step, index, isPulsing, isReached, onPulseComplete }: { 
  step: typeof steps[0]; 
  index: number;
  isPulsing: boolean;
  isReached: boolean;
  onPulseComplete: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Count up animation
  useEffect(() => {
    if (isPulsing) {
      const duration = 300;
      const frames = 10;
      const increment = step.number / frames;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= step.number) {
          setDisplayNumber(step.number);
          clearInterval(timer);
          onPulseComplete();
        } else {
          setDisplayNumber(Math.floor(current));
        }
      }, duration / frames);

      return () => clearInterval(timer);
    }
  }, [isPulsing, step.number, onPulseComplete]);

  const contentVariants = shouldReduceMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, delay: index * 0.1 } }
  } : {
    initial: { opacity: 0, x: 8 },
    animate: {
      opacity: isReached ? 1 : 0.4,
      x: isReached ? 0 : 8,
      transition: { duration: 0.25, ease: [0.18, 0.9, 0.2, 1] }
    }
  };

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="glass-surface rounded-xl p-6 space-y-4 h-full"
        animate={{
          background: isReached || isHovered 
            ? "rgba(255, 255, 255, 0.18)" 
            : "rgba(255, 255, 255, 0.14)",
          borderColor: isReached || isHovered
            ? "rgba(255, 255, 255, 0.38)"
            : "rgba(255, 255, 255, 0.28)",
        }}
        transition={{ duration: 0.22 }}
      >
        {/* Step Badge with counter */}
        <div className="flex items-start justify-between">
          <motion.div
            className="flex items-center gap-3"
            animate={{ scale: isPulsing ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D6AE3]/10 to-[#1CD6A0]/10 flex items-center justify-center">
              <step.icon className="w-5 h-5 text-[#2D6AE3]" strokeWidth={1.5} />
            </div>
            <div
              className="text-[#94A3B8] tabular-nums"
              style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}
            >
              {String(displayNumber).padStart(2, '0')}
            </div>
          </motion.div>

          {/* Tooltip on hover */}
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : -4,
              scale: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.2 }}
            className="glass-surface-subtle px-3 py-1 rounded-full"
          >
            <span className="text-xs text-[#2D6AE3]">{step.tooltip}</span>
          </motion.div>
        </div>

        {/* Content with mask reveal */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate={isReached ? "animate" : "initial"}
          className="space-y-2"
        >
          <h3 style={{ fontSize: "1.25rem", lineHeight: "1.4" }}>
            {step.title}
          </h3>
          <p style={{ color: "#475569", fontSize: "0.9375rem", lineHeight: 1.6 }}>
            {step.description}
          </p>
          <p className="caption italic pt-2">{step.outcome}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ProcessTimeline() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-40%" });
  const [activeStep, setActiveStep] = useState(-1);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && activeStep === -1) {
      setActiveStep(0);
    }
  }, [isInView, activeStep]);

  const handlePulseComplete = (stepIndex: number) => {
    if (stepIndex < steps.length - 1) {
      setTimeout(() => setActiveStep(stepIndex + 1), 200);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow="Our Approach"
            title="How we work"
            subtitle="A proven process that balances speed with quality."
            centered
            className="mb-20"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block relative">
            {/* Rail - Gradient connecting line */}
            <div className="absolute top-12 left-0 right-0 h-1 overflow-hidden rounded-full">
              <div className="w-full h-full bg-gradient-to-r from-[#2D6AE3]/10 via-[#1CD6A0]/10 to-[#2D6AE3]/10" />
              
              {/* Animated pulse traveling the rail */}
              {!shouldReduceMotion && activeStep >= 0 && activeStep < steps.length && (
                <motion.div
                  className="absolute top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-[#2D6AE3]/40 to-transparent"
                  initial={{ left: `${(activeStep / steps.length) * 100}%` }}
                  animate={{ left: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.18, 0.9, 0.2, 1] }}
                />
              )}
            </div>

            {/* Rail nodes */}
            <div className="absolute top-12 left-0 right-0 flex justify-between px-6">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 rounded-full -mt-1"
                  animate={{
                    background: activeStep >= index
                      ? "linear-gradient(135deg, #2D6AE3, #1CD6A0)"
                      : "rgba(148, 163, 184, 0.3)",
                    boxShadow: activeStep === index && !shouldReduceMotion
                      ? "0 0 16px rgba(45, 106, 227, 0.6)"
                      : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Step Cards */}
            <div className="grid grid-cols-4 gap-6 pt-20">
              {steps.map((step, index) => (
                <StepCard
                  key={step.title}
                  step={step}
                  index={index}
                  isPulsing={activeStep === index}
                  isReached={activeStep >= index}
                  onPulseComplete={() => handlePulseComplete(index)}
                />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-12"
              >
                {/* Vertical Rail */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-1 bg-gradient-to-b from-[#2D6AE3]/20 to-[#1CD6A0]/20 rounded-full" />
                )}

                {/* Rail Node */}
                <motion.div
                  className="absolute left-3.5 top-6 w-5 h-5 rounded-full"
                  initial={{ scale: 0.8, opacity: 0.3 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  style={{
                    background: "linear-gradient(135deg, #2D6AE3, #1CD6A0)",
                    boxShadow: "0 0 12px rgba(45, 106, 227, 0.4)",
                  }}
                />

                <StepCard
                  step={step}
                  index={index}
                  isPulsing={activeStep === index}
                  isReached={activeStep >= index}
                  onPulseComplete={() => handlePulseComplete(index)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
