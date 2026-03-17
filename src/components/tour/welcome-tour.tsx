"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useTourStore } from "@/stores/use-tour-store";
import { tourSteps, type TourPlacement } from "@/config/tour-steps";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOOLTIP_WIDTH = 380;
const MODAL_WIDTH = 440;
const GAP = 16;
const VIEWPORT_MARGIN = 16;
const DEFAULT_PADDING = 8;
const SWIPE_THRESHOLD = 50;

function computeTooltipPosition(
  targetRect: DOMRect | null,
  placement: TourPlacement,
  tooltipHeight: number,
  padding: number
): { top: number; left: number } {
  if (typeof window === "undefined") return { top: 0, left: 0 };

  if (!targetRect || placement === "center") {
    return {
      top: window.innerHeight / 2 - tooltipHeight / 2,
      left: window.innerWidth / 2 - TOOLTIP_WIDTH / 2,
    };
  }

  let top: number;
  let left: number;

  switch (placement) {
    case "bottom":
      top = targetRect.bottom + padding + GAP;
      left = targetRect.left + targetRect.width / 2 - TOOLTIP_WIDTH / 2;
      break;
    case "top":
      top = targetRect.top - padding - GAP - tooltipHeight;
      left = targetRect.left + targetRect.width / 2 - TOOLTIP_WIDTH / 2;
      break;
    case "right":
      top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
      left = targetRect.right + padding + GAP;
      break;
    case "left":
      top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
      left = targetRect.left - padding - GAP - TOOLTIP_WIDTH;
      break;
    default:
      top = window.innerHeight / 2 - tooltipHeight / 2;
      left = window.innerWidth / 2 - TOOLTIP_WIDTH / 2;
  }

  top = Math.max(VIEWPORT_MARGIN, Math.min(top, window.innerHeight - tooltipHeight - VIEWPORT_MARGIN));
  left = Math.max(VIEWPORT_MARGIN, Math.min(left, window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_MARGIN));

  return { top, left };
}

// --- Confetti burst for completion step ---
function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#d4943a", "#facc15", "#fb923c", "#f472b6", "#a78bfa", "#34d399", "#60a5fa", "#38bdf8"];
    const particles: {
      x: number; y: number; vx: number; vy: number;
      w: number; h: number; color: string; rotation: number;
      rotationSpeed: number; opacity: number; gravity: number;
    }[] = [];

    // Create particles from center
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 40;
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80 + (Math.random() - 0.5) * 0.5;
      const speed = 4 + Math.random() * 8;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        w: 4 + Math.random() * 6,
        h: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        opacity: 1,
        gravity: 0.12 + Math.random() * 0.06,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        if (p.opacity <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10002 }}
    />
  );
}

export function WelcomeTour() {
  const { isActive, currentStep, nextStep, prevStep, skipTour, completeTour, goToStep } =
    useTourStore();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipHeight, setTooltipHeight] = useState(280);
  const [contentKey, setContentKey] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Touch swipe tracking
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const step = tourSteps[currentStep] ?? tourSteps[0];
  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;
  const isCentered = step.placement === "center" || !step.targetSelector;
  const padding = step.spotlightPadding ?? DEFAULT_PADDING;
  const progressPercent = ((currentStep + 1) / tourSteps.length) * 100;

  // Fade in/out
  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  // Trigger content fade on step change
  useEffect(() => {
    setContentKey((k) => k + 1);
  }, [currentStep]);

  // Scroll target into view + measure
  const updateRect = useCallback(() => {
    if (!isActive) return;
    if (!step.targetSelector) {
      setTargetRect(null);
      return;
    }
    const el = document.querySelector(step.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      const isOffScreen = rect.top > window.innerHeight || rect.bottom < 0;
      if (isOffScreen) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          setTargetRect(el.getBoundingClientRect());
        }, 350);
      } else {
        setTargetRect(rect);
      }
    } else {
      setTargetRect(null);
    }
  }, [isActive, step.targetSelector]);

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [updateRect]);

  // Measure tooltip height for positioning
  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
    }
  }, [currentStep, isActive]);

  // Scroll lock
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  // Focus trap
  useEffect(() => {
    if (!isActive || !overlayRef.current) return;
    const handleFocus = (e: FocusEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        const firstBtn = overlayRef.current.querySelector("button");
        firstBtn?.focus();
      }
    };
    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [isActive]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "Enter":
          e.preventDefault();
          if (isLastStep) completeTour();
          else nextStep();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (currentStep > 0) prevStep();
          break;
        case "Escape":
          e.preventDefault();
          skipTour();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, currentStep, isLastStep, completeTour, nextStep, prevStep, skipTour]);

  // Touch swipe gestures
  useEffect(() => {
    if (!isActive) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Only count horizontal swipes (more horizontal than vertical)
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) {
        // Swipe left → next
        if (isLastStep) completeTour();
        else nextStep();
      } else {
        // Swipe right → prev
        if (currentStep > 0) prevStep();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isActive, currentStep, isLastStep, completeTour, nextStep, prevStep]);

  const tooltipPos = useMemo(
    () => computeTooltipPosition(targetRect, step.placement, tooltipHeight, padding),
    [targetRect, step.placement, tooltipHeight, padding]
  );

  if (!mounted || !isActive) return null;

  const StepIcon = step.icon;

  // Screen reader live announcement
  const LiveAnnouncement = (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      Step {currentStep + 1} of {tourSteps.length}: {step.title}. {step.description}
    </div>
  );

  // Progress bar
  const ProgressBar = (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-[var(--muted-foreground)]">
          {currentStep + 1} of {tourSteps.length}
        </span>
        <span className="text-[10px] font-medium text-[var(--muted-foreground)]">
          {Math.round(progressPercent)}%
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-[var(--muted)]" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={tourSteps.length}>
        <div
          className="h-1 rounded-full bg-[var(--accent)] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );

  // Keyboard hint
  const KeyboardHint = (
    <p className="text-[10px] text-[var(--muted-foreground)]/50 text-center mt-3">
      Use <kbd className="px-1 py-0.5 rounded bg-[var(--muted)] text-[9px] font-mono">&larr;</kbd>{" "}
      <kbd className="px-1 py-0.5 rounded bg-[var(--muted)] text-[9px] font-mono">&rarr;</kbd> keys
      {" "}&bull;{" "}
      <kbd className="px-1 py-0.5 rounded bg-[var(--muted)] text-[9px] font-mono">Esc</kbd> to skip
      {" "}&bull; swipe on mobile
    </p>
  );

  // Centered modal for welcome/completion steps
  if (isCentered) {
    return createPortal(
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={step.title}
        className={cn(
          "fixed inset-0 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ zIndex: 9999 }}
      >
        {LiveAnnouncement}
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Confetti on completion step */}
        {step.id === "completion" && <ConfettiBurst />}

        {/* Modal card */}
        <div
          key={contentKey}
          className="fixed rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl text-center animate-tour-fade-in"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: MODAL_WIDTH,
            maxWidth: "calc(100vw - 32px)",
            zIndex: 10000,
          }}
        >
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full mx-auto mb-4",
              step.id === "completion" && "animate-tour-bounce"
            )}
            style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
          >
            <StepIcon className="h-8 w-8 text-[var(--accent)]" />
          </div>

          <h2 className="text-xl font-bold mb-2">{step.title}</h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
            {step.description}
          </p>

          {ProgressBar}

          {step.id === "welcome" ? (
            <div className="flex flex-col gap-2">
              <Button variant="default" onClick={nextStep} className="w-full" autoFocus>
                Start Tour
              </Button>
              <Button
                variant="ghost"
                onClick={skipTour}
                className="w-full text-[var(--muted-foreground)]"
              >
                Skip, I&apos;ll explore on my own
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="default" onClick={completeTour} className="w-full" autoFocus>
                Get Started
              </Button>
              <Button
                variant="ghost"
                onClick={prevStep}
                className="w-full text-[var(--muted-foreground)]"
              >
                Back
              </Button>
            </div>
          )}

          {KeyboardHint}
        </div>
      </div>,
      document.body
    );
  }

  // Spotlight mode for targeted steps
  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={step.title}
      className={cn(
        "fixed inset-0 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ zIndex: 9999 }}
    >
      {LiveAnnouncement}
      {/* Click catcher backdrop */}
      <div className="absolute inset-0" />

      {/* Spotlight cutout */}
      {targetRect && (
        <>
          <div
            className="fixed rounded-lg pointer-events-none"
            style={{
              top: targetRect.top - padding,
              left: targetRect.left - padding,
              width: targetRect.width + padding * 2,
              height: targetRect.height + padding * 2,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
              transition: "all 300ms ease-in-out",
              zIndex: 9999,
            }}
          />
          {/* Animated gold ring with pulse */}
          <div
            className="fixed rounded-lg pointer-events-none animate-tour-ring-pulse"
            style={{
              top: targetRect.top - padding - 2,
              left: targetRect.left - padding - 2,
              width: targetRect.width + (padding + 2) * 2,
              height: targetRect.height + (padding + 2) * 2,
              border: "2px solid var(--accent)",
              transition: "top 300ms ease-in-out, left 300ms ease-in-out, width 300ms ease-in-out, height 300ms ease-in-out",
              zIndex: 10000,
            }}
          />
        </>
      )}

      {/* Fallback backdrop when no target found */}
      {!targetRect && <div className="absolute inset-0 bg-black/75" />}

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        key={contentKey}
        className="fixed rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl animate-tour-fade-in"
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
          width: TOOLTIP_WIDTH,
          maxWidth: "calc(100vw - 32px)",
          zIndex: 10001,
        }}
      >
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
          >
            <StepIcon className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              Step {currentStep + 1} of {tourSteps.length}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
          {step.description}
        </p>

        {/* Progress bar */}
        {ProgressBar}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={skipTour}
            className="text-[var(--muted-foreground)]"
          >
            Skip tour
          </Button>
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                Back
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={isLastStep ? completeTour : nextStep}
              autoFocus
            >
              {isLastStep ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>

        {KeyboardHint}
      </div>
    </div>,
    document.body
  );
}
