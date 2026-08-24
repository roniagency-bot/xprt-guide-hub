import * as React from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Eyebrow } from "@/components/site/Section";
import completedHouse from "@/assets/homeowners-house-completed.png";

// Used on the English homeowners page only (personal.homeowners-insurance.tsx).
// Not used on the Spanish route.
//
// Frame sequence extracted from the approved homeowners-house-scroll.mp4
// clip (exploded at frame 1 -> fully assembled at the last frame), drawn to
// a <canvas> and advanced directly by scroll position. This avoids relying
// on HTMLVideoElement.currentTime scrubbing, which was not rendering
// visibly in real-world browser testing.
const FRAME_COUNT = 76;
const FRAME_BASE_PATH = "/frames/homeowners-house-scroll";
const frameSrc = (index: number) =>
  `${FRAME_BASE_PATH}/frame-${String(index + 1).padStart(4, "0")}.jpg`;

// A coarse, evenly-spread subset of frames loaded first so the animation can
// start responding to scroll almost immediately, instead of waiting on all
// 76 images. The remaining frames stream in afterward in the background and
// simply sharpen the motion in place as they arrive.
const PRIORITY_STRIDE = 6;
function buildPriorityIndices(count: number, stride: number) {
  const indices = new Set<number>();
  for (let i = 0; i < count; i += stride) indices.add(i);
  indices.add(0); // fully exploded
  indices.add(count - 1); // fully assembled (matches the resting/poster state)
  return Array.from(indices).sort((a, b) => a - b);
}

// Scroll distance (in viewport heights) the pinned animation plays across.
// This is what controls how "forgiving" normal mouse-wheel/trackpad
// scrolling feels: too short, and a single fast scroll gesture jumps past
// most of the house transition. Desktop is longer than mobile, where
// screens are shorter and scrolling feels excessive sooner.
const PIN_HEIGHT_VH_DESKTOP = 400;
const PIN_HEIGHT_VH_MOBILE = 200;

// Matches the project's existing `md:` breakpoint (Tailwind default, 768px).
const MOBILE_QUERY = "(max-width: 767px)";

// Optional, opt-in text overlays tied to the same scroll progress that
// drives the frame sequence. Entirely additive: when no `progressCallouts`
// prop is passed (the real homeowners page doesn't pass one), none of this
// renders and nothing about the animation/scroll behavior changes.
export type ScrollCallout = {
  key: string;
  // Strictly increasing progress values (0-1) the opacity ramps through.
  // A 2-point range is a one-way fade in; a 4-point range fades in, holds,
  // then fades back out - so a callout can recede as scrolling continues.
  range: [number, number] | [number, number, number, number];
  label: string;
  caption?: string;
  // Large, centered closing-statement styling instead of the small
  // architectural-annotation style used for the thematic callouts.
  emphasis?: boolean;
  // Anchor point for the annotation's dot, as a percentage of the sticky
  // container's width/height. Given separately for desktop ("cover" fit,
  // cropped horizontally) and mobile ("contain" fit, letterboxed
  // vertically) since the two fits show a different window of the source
  // frame. This is a rough visual reference toward the relevant part of the
  // house at that point in the sequence, not a precise/technical
  // measurement of any specific pipe, wire, or structural element. Only
  // used by the non-emphasis (thematic) callout style; defaults to the
  // center of the frame if omitted.
  anchor?: {
    desktop: { x: number; y: number };
    mobile: { x: number; y: number };
  };
  // Which side the leader line and label extend toward from the anchor
  // dot. Defaults to "right" when omitted.
  side?: "left" | "right";
};

function ProgressCallout({
  scrollYProgress,
  callout,
}: {
  scrollYProgress: MotionValue<number>;
  callout: ScrollCallout;
}) {
  const outputRange = callout.range.length === 2 ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(scrollYProgress, callout.range, outputRange);

  if (callout.emphasis) {
    return (
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
      >
        <p className="font-display text-3xl font-semibold uppercase tracking-[0.15em] text-primary-foreground md:text-5xl">
          {callout.label}
        </p>
      </motion.div>
    );
  }

  // Architectural/engineering-style annotation: a small dot marking the
  // anchor point on the house, a thin leader line, and a compact label -
  // no background card. Positioning is pure CSS (custom properties consumed
  // by Tailwind arbitrary-value classes), so it stays responsive across the
  // existing `md:` breakpoint without any JS-measured geometry.
  const desktopAnchor = callout.anchor?.desktop ?? { x: 50, y: 50 };
  const mobileAnchor = callout.anchor?.mobile ?? { x: 50, y: 50 };
  const isRight = callout.side !== "left";
  const positionStyle = {
    opacity,
    "--mx": `${mobileAnchor.x}%`,
    "--my": `${mobileAnchor.y}%`,
    "--dx": `${desktopAnchor.x}%`,
    "--dy": `${desktopAnchor.y}%`,
  } as unknown as React.CSSProperties;

  return (
    <motion.div
      style={positionStyle}
      className="pointer-events-none absolute left-[var(--mx)] top-[var(--my)] z-10 md:left-[var(--dx)] md:top-[var(--dy)]"
    >
      <div className="relative">
        {/* Anchor dot, centered exactly on the anchor point. Slightly larger
            and more visible than the original pass, still a small mark. */}
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-[2.5px] ring-ink md:h-3 md:w-3" />

        {/* Leader line + label, extending toward `side` and vertically
            centered on the dot. */}
        <div
          className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-2.5 md:gap-3 ${
            isRight ? "left-2 flex-row" : "right-2 flex-row-reverse"
          }`}
        >
          <span className="h-0.5 w-8 bg-gold md:w-12" aria-hidden="true" />
          <div
            className={
              isRight
                ? "max-w-[42vw] text-left md:max-w-none"
                : "max-w-[42vw] text-right md:max-w-none"
            }
          >
            {/* The system name is the dominant element - large and bold,
                the way a floor-plan callout leads with the room name. */}
            <p
              className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-[0.08em] text-gold md:text-[28px]"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
            >
              {callout.label}
            </p>
            {callout.caption && (
              <p
                className="mt-1 text-sm text-primary-foreground/90 md:text-base"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
              >
                {callout.caption}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Scroll-scrubbed hero animation for the homeowners page (frame-sequence /
 * canvas version).
 *
 * Scrolling down moves forward through the pinned section, which maps to
 * the house coming apart (exploded). Scrolling up reverses it, reassembling
 * the house. Frames stream in progressively (see PRIORITY_STRIDE above) and
 * are drawn to a canvas sized to preserve the source aspect ratio - full
 * "cover" crop on desktop, letterboxed "contain" on mobile so the house is
 * never aggressively cropped on narrow screens.
 *
 * `progressCallouts` is optional and additive - see ScrollCallout above.
 */
export function HouseScrollAnimationFrames({
  progressCallouts,
}: {
  progressCallouts?: ScrollCallout[];
} = {}) {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imagesRef = React.useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const loadedRef = React.useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const framesReadyRef = React.useRef(false);
  const currentIndexRef = React.useRef(FRAME_COUNT - 1);

  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [framesReady, setFramesReady] = React.useState(false);
  const [framesFailed, setFramesFailed] = React.useState(false);

  // Respect prefers-reduced-motion, same pattern as <Reveal />.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  // Track the mobile breakpoint so we can shorten the scroll track and
  // switch the canvas from "cover" to "contain" fitting.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  const drawFrame = React.useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Draw the exact frame if it's loaded; otherwise the nearest one that
      // is, so scrubbing never shows a blank canvas while the rest of the
      // sequence streams in.
      let nearest = -1;
      if (loadedRef.current[index]) {
        nearest = index;
      } else {
        for (let offset = 1; offset < FRAME_COUNT && nearest === -1; offset++) {
          const lo = index - offset;
          const hi = index + offset;
          if (lo >= 0 && loadedRef.current[lo]) nearest = lo;
          else if (hi < FRAME_COUNT && loadedRef.current[hi]) nearest = hi;
        }
      }
      if (nearest === -1) return;

      const img = imagesRef.current[nearest];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      if (cssWidth === 0 || cssHeight === 0) return;
      const pixelWidth = Math.round(cssWidth * dpr);
      const pixelHeight = Math.round(cssHeight * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      // Desktop: object-fit "cover" (fills the frame, crops overflow) for a
      // full-bleed cinematic look. Mobile: object-fit "contain" (fits the
      // whole image inside the frame, letterboxed) so the house is always
      // fully visible rather than zoomed/cropped on a narrow screen.
      const scale = isMobile
        ? Math.min(pixelWidth / img.naturalWidth, pixelHeight / img.naturalHeight)
        : Math.max(pixelWidth / img.naturalWidth, pixelHeight / img.naturalHeight);
      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;
      const offsetX = (pixelWidth - drawWidth) / 2;
      const offsetY = (pixelHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, pixelWidth, pixelHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [isMobile],
  );

  // Keep a ref to the latest drawFrame so the (rarely re-run) loading effect
  // below can always call the current version without needing to restart
  // in-flight image loads whenever `isMobile` toggles.
  const drawFrameRef = React.useRef(drawFrame);
  React.useEffect(() => {
    drawFrameRef.current = drawFrame;
    // isMobile (and therefore the fit mode) may have changed - repaint the
    // current frame immediately rather than waiting for the next scroll tick.
    if (framesReadyRef.current) drawFrame(currentIndexRef.current);
  }, [drawFrame]);

  // Load frames progressively: a coarse, evenly-spread priority set first
  // (enough to scrub anywhere in the sequence immediately, if roughly), then
  // every remaining frame in the background to fill in the detail. The
  // static completed-house <img> stays visible the whole time frames aren't
  // ready yet.
  React.useEffect(() => {
    // Guard directly against matchMedia (not just the `reducedMotion` state)
    // so a reduced-motion visitor's very first render - before the state
    // effect above has had a chance to flip it to true - never kicks off
    // frame downloads it's about to throw away.
    if (reducedMotion) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let cancelled = false;
    imagesRef.current = new Array(FRAME_COUNT).fill(null);
    loadedRef.current = new Array(FRAME_COUNT).fill(false);
    framesReadyRef.current = false;

    const priorityIndices = buildPriorityIndices(FRAME_COUNT, PRIORITY_STRIDE);
    const prioritySet = new Set(priorityIndices);
    let prioritySettled = 0;
    let totalSettled = 0;
    let totalFailed = 0;

    const maybeFlipReady = () => {
      if (framesReadyRef.current || cancelled) return;
      if (prioritySettled < priorityIndices.length) return;
      const anyPriorityLoaded = priorityIndices.some((i) => loadedRef.current[i]);
      if (!anyPriorityLoaded) return; // wait for the all-failed path below instead
      framesReadyRef.current = true;
      setFramesReady(true);
    };

    const loadOne = (index: number) => {
      const img = new Image();
      img.decoding = "async";
      const isPriority = prioritySet.has(index);

      const onSettle = (failed: boolean) => {
        if (cancelled) return;
        totalSettled += 1;
        if (failed) totalFailed += 1;
        else {
          loadedRef.current[index] = true;
          imagesRef.current[index] = img;
        }
        if (isPriority) prioritySettled += 1;
        maybeFlipReady();
        if (framesReadyRef.current) drawFrameRef.current(currentIndexRef.current);
        if (totalSettled === FRAME_COUNT && totalFailed === FRAME_COUNT) {
          setFramesFailed(true);
        }
      };

      img.onload = () => onSettle(false);
      img.onerror = () => onSettle(true);
      img.src = frameSrc(index);
    };

    priorityIndices.forEach(loadOne);
    for (let i = 0; i < FRAME_COUNT; i++) {
      if (!prioritySet.has(i)) loadOne(i);
    }

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // progress 0 (top of pinned track)    -> fully assembled (last frame)
  // progress 1 (bottom of pinned track) -> fully exploded  (first frame)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reducedMotion || !framesReadyRef.current) return;
    const progress = Math.min(1, Math.max(0, latest));
    const index = Math.round((1 - progress) * (FRAME_COUNT - 1));
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      drawFrame(index);
    }
  });

  // Draw the first (fully assembled) frame as soon as frames are ready, and
  // redraw the current frame on resize so the crop stays correct.
  React.useEffect(() => {
    if (!framesReady) return;
    currentIndexRef.current = FRAME_COUNT - 1;
    drawFrame(FRAME_COUNT - 1);
    const onResize = () => drawFrame(currentIndexRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [framesReady, drawFrame]);

  const showCanvas = !reducedMotion && !framesFailed;
  const pinHeightVh = isMobile ? PIN_HEIGHT_VH_MOBILE : PIN_HEIGHT_VH_DESKTOP;
  const fallbackObjectFit = isMobile ? "contain" : "cover";

  return (
    <section
      aria-label="Scroll to see your XPRT home's construction, layer by layer"
      className="relative bg-ink"
    >
      <div className="container-prose pt-16 md:pt-20">
        <Eyebrow className="text-gold">How it's built</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl leading-tight text-primary-foreground md:text-5xl">
          Scroll to see what goes into protecting your home.
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-base text-primary-foreground/70 md:text-lg">
          {reducedMotion
            ? "A custom XPRT-built home, from the frame up."
            : "Keep scrolling and the frame comes apart. Scroll back up and it reassembles."}
        </p>
      </div>

      {showCanvas && (
        <div ref={trackRef} className="relative mt-10" style={{ height: `${pinHeightVh}vh` }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
            {!framesReady && (
              <img
                src={completedHouse}
                alt="A custom XPRT-built home, fully finished."
                className="absolute inset-0 h-full w-full"
                style={{ objectFit: fallbackObjectFit }}
              />
            )}
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              style={{ opacity: framesReady ? 1 : 0 }}
            />
            {progressCallouts?.map((callout) => (
              <ProgressCallout
                key={callout.key}
                scrollYProgress={scrollYProgress}
                callout={callout}
              />
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
              <span className="rounded-full bg-ink/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/80 backdrop-blur">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      )}

      {(reducedMotion || framesFailed) && (
        <div className="relative mt-10 aspect-[16/9] w-full md:aspect-[21/9]">
          <img
            src={completedHouse}
            alt="A custom XPRT-built home, fully finished."
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </section>
  );
}
