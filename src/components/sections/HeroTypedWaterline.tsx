import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@components/common/Button";

// ============================================
// TYPES & INTERFACES
// ============================================

interface HeroTypedWaterlineProps {
  titleTop?: string;
  titleBottom?: string;
  subhead?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  enableAmbientChips?: boolean;
  enableWaterline?: boolean;
  motionVariant?: "full" | "reduced" | "off";
  timingOverrides?: Partial<MotionTimings>;
  className?: string;
  "data-testid"?: string;
}

interface MotionTimings {
  wordDelayFast: number;
  wordDelayDeep: number;
  subheadRiseDuration: number;
  ctaPulseDuration: number;
}

// ============================================
// TYPEWRITER EFFECT COMPONENT
// ============================================

interface TypewriterEffectProps {
  text: string;
  isActive: boolean;
  isDone: boolean;
  onComplete: () => void;
  tempo: "fast" | "deep";
  shouldReduceMotion: boolean;
  hideCursorOnComplete?: boolean;
}

function TypewriterEffect({ 
  text, 
  isActive,
  isDone, 
  onComplete, 
  tempo, 
  shouldReduceMotion,
  hideCursorOnComplete = true 
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState(isDone || shouldReduceMotion ? text : "");
  const [showCaret, setShowCaret] = useState(false);

  // Speed settings (ms per char)
  const baseDelay = tempo === "fast" ? 40 : 70; 
  const randomVariance = 30; 

  useEffect(() => {
    if (isDone) {
      setDisplayedText(text);
      setShowCaret(false);
      return;
    }

    if (!isActive) {
      setDisplayedText("");
      setShowCaret(false);
      return;
    }

    if (shouldReduceMotion) {
      setDisplayedText(text);
      onComplete();
      return;
    }

    setShowCaret(true);
    setDisplayedText("");
    
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      // Prevent execution if we're already done
      if (currentIndex > text.length) return;

      if (currentIndex === text.length) {
        // Typing complete
        // Signal completion immediately to hand off control to parent
        onComplete();
        // Increment one more time to ensure we don't re-enter this block
        currentIndex++;
        return;
      }

      const nextChar = text[currentIndex];
      setDisplayedText((prev) => prev + nextChar);
      currentIndex++;
      
      let delay = baseDelay + Math.random() * randomVariance;
      if (nextChar === '.' || nextChar === ',') {
        delay += 150;
      }

      timeoutId = setTimeout(typeNextChar, delay);
    };

    timeoutId = setTimeout(typeNextChar, 100);

    return () => clearTimeout(timeoutId);
  }, [isActive, isDone, text, baseDelay, shouldReduceMotion, onComplete, hideCursorOnComplete]);

  return (
    <span className="inline-grid" aria-hidden="true">
      {/* Ghost text to reserve full width/height immediately (prevents layout shift) */}
      <span className="col-start-1 row-start-1 opacity-0 pointer-events-none whitespace-pre-wrap">
        {text}
        {/* Spacer for caret width to prevent jump when caret appears */}
        <span className="inline-block w-[3px] ml-1" />
      </span>
      
      {/* Actual animated text overlay */}
      <span className="col-start-1 row-start-1 whitespace-pre-wrap">
        {displayedText}
        <motion.span
          animate={showCaret ? { opacity: [1, 0] } : { opacity: 0 }}
          transition={showCaret ? { duration: 0.8, repeat: Infinity, ease: "linear" } : { duration: 0 }}
          className="inline-block w-[3px] h-[1em] bg-[#2D6AE3] ml-1"
          style={{ verticalAlign: "text-bottom" }}
        />
      </span>
    </span>
  );
}

// ============================================
// WATERLINE SUBHEAD COMPONENT
// ============================================

interface WaterlineSubheadProps {
  text: string;
  isActive: boolean;
  onComplete: () => void;
  shouldReduceMotion: boolean;
  enableWaterline: boolean;
}

function WaterlineSubhead({ text, isActive, onComplete, shouldReduceMotion, enableWaterline }: WaterlineSubheadProps) {
  const [animationState, setAnimationState] = useState<"hidden" | "rising" | "settled" | "floating">("hidden");

  useEffect(() => {
    if (!isActive) return;

    if (shouldReduceMotion) {
      setAnimationState("settled");
      onComplete();
      return;
    }

    setAnimationState("rising");
    
    const riseTimer = setTimeout(() => {
      setAnimationState("settled");
      setTimeout(() => {
        setAnimationState("floating");
        onComplete();
      }, 300);
    }, 420);

    return () => clearTimeout(riseTimer);
  }, [isActive, onComplete, shouldReduceMotion]);

  const getAnimationProps = () => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.12 },
      };
    }

    switch (animationState) {
      case "hidden":
        return {
          initial: { opacity: 0, y: 24, filter: "blur(4px)" },
          animate: { opacity: 0, y: 24, filter: "blur(4px)" },
        };
      case "rising":
        return {
          animate: { 
            opacity: 1, 
            y: 0, 
            filter: enableWaterline ? ["blur(4px)", "blur(2px)", "blur(0px)"] : "blur(0px)"
          },
          transition: { 
            duration: 0.42, 
            ease: [0.22, 1, 0.36, 1],
          },
        };
      case "settled":
      case "floating":
        return {
          animate: { 
            opacity: 1, 
            y: animationState === "floating" ? [0, -1, 0] : 0,
            filter: "blur(0px)"
          },
          transition: animationState === "floating" ? {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          } : { duration: 0.2 },
        };
      default:
        return {};
    }
  };

  return (
    <motion.p
      {...getAnimationProps()}
      className="body-large text-[#475569] max-w-2xl relative"
      style={{ willChange: animationState === "rising" ? "transform, opacity, filter" : "auto" }}
    >
      {/* Waterline refraction effect overlay */}
      {enableWaterline && animationState === "rising" && !shouldReduceMotion && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.08, 0],
            backgroundImage: [
              "linear-gradient(90deg, transparent 0%, rgba(45, 106, 227, 0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 30%, rgba(45, 106, 227, 0.15) 50%, transparent 70%)",
              "linear-gradient(90deg, transparent 0%, rgba(45, 106, 227, 0.1) 50%, transparent 100%)",
            ],
          }}
          transition={{ duration: 0.28 }}
          style={{
            backgroundSize: "200% 100%",
            backgroundPosition: "center",
          }}
        />
      )}
      {text}
    </motion.p>
  );
}

// ============================================
// WATERLINE BAND COMPONENT
// ============================================

function WaterlineBand({ showSheen }: { showSheen: boolean }) {
  return (
    <div 
      className="absolute left-0 right-0 pointer-events-none overflow-hidden"
      style={{ 
        height: "var(--glass-hero-waterline-band-height)",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {/* Subtle horizontal band */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(45, 106, 227, 0.03), transparent)",
        }}
      />
      
      {/* Sheen sweep */}
      {showSheen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%)",
            width: "50%",
          }}
        />
      )}
    </div>
  );
}

// ============================================
// AMBIENT CHIPS COMPONENT
// ============================================

function AmbientChips() {
  const shouldReduceMotion = useReducedMotion();

  const chips = [
    { x: "10%", y: "15%", size: 48, delay: 0 },
    { x: "85%", y: "25%", size: 32, delay: 1.2 },
    { x: "15%", y: "75%", size: 40, delay: 2.4 },
    { x: "88%", y: "70%", size: 36, delay: 1.8 },
  ];

  if (shouldReduceMotion) {
    return (
      <>
        {chips.map((chip, i) => (
          <div
            key={i}
            className="absolute rounded-lg glass-surface-subtle"
            style={{
              left: chip.x,
              top: chip.y,
              width: chip.size,
              height: chip.size,
              boxShadow: "var(--glass-hero-chip-shadow)",
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {chips.map((chip, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg glass-surface-subtle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.6, 0.6],
            scale: [0.8, 1, 1],
            x: [0, Math.sin(i) * 20, 0],
            y: [0, Math.cos(i) * 15, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: chip.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: chip.x,
            top: chip.y,
            width: chip.size,
            height: chip.size,
            boxShadow: "var(--glass-hero-chip-shadow)",
          }}
        />
      ))}
    </>
  );
}

// ============================================
// MAIN HERO COMPONENT
// ============================================

export function HeroTypedWaterline({
  titleTop = "Building fast.",
  titleBottom = "Thinking deep.",
  subhead = "We craft modern software with precision and momentum — from MVPs to scalable products.",
  primaryCta = { label: "Explore Our Work", href: "#work" },
  secondaryCta = { label: "Talk to Us", href: "#contact" },
  enableAmbientChips = true,
  enableWaterline = true,
  motionVariant = "full",
  timingOverrides,
  className = "",
  "data-testid": dataTestId = "hero-typed-waterline",
}: HeroTypedWaterlineProps) {
  const shouldReduceMotion = useReducedMotion() || motionVariant === "reduced" || motionVariant === "off";
  const [line1Complete, setLine1Complete] = useState(false);
  const [line2Active, setLine2Active] = useState(false);
  const [line2Complete, setLine2Complete] = useState(false);
  const [subheadActive, setSubheadActive] = useState(false);
  const [subheadComplete, setSubheadComplete] = useState(false);
  const [showSheen, setShowSheen] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);


  // Initialize animation sequence
  useEffect(() => {
    if (motionVariant === "off") return;

    if (shouldReduceMotion) {
      setLine1Complete(true);
      setLine2Active(true);
      setLine2Complete(true);
      setSubheadActive(true);
      setSubheadComplete(true);
      setCtaActive(true);
      return;
    }

    // Start line 1 after brief delay
    const startTimer = setTimeout(() => {
      // Line 1 starts immediately (handled by component)
    }, 120);

    return () => clearTimeout(startTimer);
  }, [shouldReduceMotion, motionVariant]);

  const handleLine1Complete = useCallback(() => {
    // Mark line 1 as fully complete (hides cursor via isDone prop)
    setLine1Complete(true);
    
    // Add a beat of silence before starting line 2
    setTimeout(() => setLine2Active(true), 400);
  }, []);

  const handleLine2Complete = useCallback(() => {
    setLine2Complete(true);
    // Start subhead while line 2 is still completing
    setTimeout(() => setSubheadActive(true), 100);
  }, []);

  const handleSubheadComplete = useCallback(() => {
    setSubheadComplete(true);
    setShowSheen(true);
    setTimeout(() => setCtaActive(true), 200);
  }, []);

  return (
    <section
      className={`relative min-h-[85vh] flex items-center justify-center overflow-hidden ${className}`}
      data-testid={dataTestId}
      role="region"
      aria-label="Hero section"
    >
      {/* Ambient chips */}
      {enableAmbientChips && (
        <div className="absolute inset-0 pointer-events-none">
          <AmbientChips />
        </div>
      )}

      {/* Main hero panel */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.18, 0.9, 0.2, 1] }}
        className="relative z-10 w-full"
      >
        <div className="container-custom">
          <div className="glass-surface rounded-2xl px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 relative">
            {/* Waterline band positioned in the middle */}
            {enableWaterline && <WaterlineBand showSheen={showSheen} />}

            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Brand mark - static */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2D6AE3] to-[#1CD6A0]" />
                <span className="text-lg font-semibold text-[#0F172A]">Byte&Brisk</span>
              </motion.div>

              {/* Headline with typed effect */}
              <div className="space-y-2">
                <h1 className="display text-[#0F172A] min-h-[2.2em]">
                  <div className="leading-tight">
                    <TypewriterEffect
                      text={titleTop}
                      isActive={true}
                      isDone={line1Complete}
                      onComplete={handleLine1Complete}
                      tempo="fast"
                      shouldReduceMotion={shouldReduceMotion}
                      hideCursorOnComplete={true}
                    />
                  </div>
                  <div className="leading-tight">
                    <TypewriterEffect
                      text={titleBottom}
                      isActive={line2Active}
                      isDone={line2Complete}
                      onComplete={handleLine2Complete}
                      tempo="deep"
                      shouldReduceMotion={shouldReduceMotion}
                      hideCursorOnComplete={true}
                    />
                  </div>
                </h1>
              </div>

              {/* Subhead with waterline effect */}
              <div className="relative flex justify-center min-h-[4em]">
                <WaterlineSubhead
                  text={subhead}
                  isActive={subheadActive}
                  onComplete={handleSubheadComplete}
                  shouldReduceMotion={shouldReduceMotion}
                  enableWaterline={enableWaterline}
                />
              </div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={
                  ctaActive
                    ? shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : {
                          opacity: 1,
                          y: 0,
                          scale: [1, 1.02, 1],
                        }
                    : { opacity: 0, y: 8 }
                }
                transition={{
                  opacity: { duration: shouldReduceMotion ? 0.12 : 0.3 },
                  y: { duration: shouldReduceMotion ? 0.12 : 0.3 },
                  scale: shouldReduceMotion ? {} : {
                    duration: 0.28,
                    times: [0, 0.4, 1],
                    ease: "easeOut",
                  },
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Button
                  href={primaryCta.href}
                  variant="primary"
                  size="lg"
                  aria-label={primaryCta.label}
                >
                  {primaryCta.label}
                </Button>
                <Button
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  aria-label={secondaryCta.label}
                >
                  {secondaryCta.label}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}



