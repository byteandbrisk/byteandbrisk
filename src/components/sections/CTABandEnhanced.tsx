import { motion, useReducedMotion, useInView } from "motion/react";
import { Button } from "@components/common/Button";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

function CountUpMetric({ 
  value, 
  suffix = "", 
  label 
}: { 
  value: string; 
  suffix?: string; 
  label: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("00");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      // Parse the value (e.g., "48" from "48h", "100" from "100%")
      const numericPart = value.match(/\d+/)?.[0] || "0";
      const target = parseInt(numericPart);
      const duration = 1200;
      const frames = 30;
      const increment = target / frames;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayValue(value.replace(/\d+/, target.toString()));
          clearInterval(timer);
        } else {
          setDisplayValue(value.replace(/\d+/, Math.floor(current).toString()));
        }
      }, duration / frames);

      return () => clearInterval(timer);
    } else if (isInView && shouldReduceMotion) {
      setDisplayValue(value);
    }
  }, [isInView, value, shouldReduceMotion]);

  return (
    <div ref={ref}>
      <motion.div
        className="text-3xl mb-2"
        style={{ fontWeight: 700 }}
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <span className="text-[#2D6AE3]">
          {displayValue}{suffix}
        </span>
      </motion.div>
      <p className="caption">{label}</p>
    </div>
  );
}

export function CTABandEnhanced() {
  const shouldReduceMotion = useReducedMotion();
  const slabRef = useRef(null);
  const isInView = useInView(slabRef, { once: true });
  const [highlightSweep, setHighlightSweep] = useState(false);

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      setTimeout(() => setHighlightSweep(true), 200);
    }
  }, [isInView, shouldReduceMotion]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient Particles Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EBFAFF] via-[#F5F8FA] to-[#F0F9FF]" />
        {!shouldReduceMotion && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#2D6AE3]/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={slabRef}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div 
            className="glass-surface-strong rounded-3xl p-12 md:p-16 lg:p-20 text-center max-w-4xl mx-auto relative overflow-hidden"
            style={{
              boxShadow: "0 24px 64px -12px rgba(28, 42, 66, 0.12), 0 8px 24px -4px rgba(28, 42, 66, 0.04)"
            }}
          >
            {/* One-shot Highlight Sweep */}
            {highlightSweep && !shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: [0.18, 0.9, 0.2, 1] }}
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)",
                }}
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-10 relative z-10"
            >
              {/* Badge */}
              <div className="inline-flex items-center justify-center px-5 py-2 rounded-full glass-surface-subtle border border-[#2D6AE3]/10">
                <span className="text-[#2D6AE3] uppercase tracking-wider" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                  Let's Build Together
                </span>
              </div>

              {/* Headline */}
              <h2 className="max-w-2xl mx-auto display-small">
                Let's build something brilliant.
              </h2>

              {/* Subcopy */}
              <p className="body-large max-w-xl mx-auto text-slate-600">
                Ready to transform your idea into a scalable product? We're here to help you ship fast and think deep.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 pb-6">
                <Button variant="primary" size="lg">
                  Start a Conversation
                  <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
                </Button>
                <Button variant="secondary" size="lg">
                  View Our Work
                </Button>
              </div>

              {/* Trust Indicators with Count-Up */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-200/60 max-w-2xl mx-auto">
                <CountUpMetric
                  value="48"
                  suffix="h"
                  label="Initial response time"
                />
                <CountUpMetric
                  value="2-4"
                  suffix="wk"
                  label="MVP delivery average"
                />
                <CountUpMetric
                  value="100"
                  suffix="%"
                  label="Client satisfaction"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
