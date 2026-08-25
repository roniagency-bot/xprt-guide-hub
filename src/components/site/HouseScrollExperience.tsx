import * as React from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import completedHouse from "@/assets/homeowners-house-completed.png";

// Cinematic, chapter-based scroll "opener" for the homeowners experience -
// the front door of the English Homeowners Insurance page
// (personal.homeowners-insurance.tsx). A full-screen, chapter-based scroll
// sequence using the approved 76-frame house sequence and the same
// frame-sequence canvas technique originally proven in
// HouseScrollAnimationFrames.tsx (progressive JPG loading, cover/contain
// fit, reduced-motion handling). HouseScrollAnimationFrames.tsx is no
// longer referenced from the homeowners page (this component replaced it
// as the page's hero) but is left in place, untouched, in case it's still
// useful elsewhere.
//
// This component also temporarily hides the site's sticky header while its
// pinned track is actively being scrolled through (see the effect inside
// HouseScrollExperience() below), so the house - including the roof, near
// the top of frame - never disappears behind the site navigation. The
// header is restored the instant the visitor is above or below the pinned
// range. This is done by toggling the header element's own inline style
// from inside this component; SiteHeader.tsx itself is not modified.
const FRAME_COUNT = 76;
const FRAME_BASE_PATH = "/frames/homeowners-house-scroll";
const frameSrc = (index: number) =>
  `${FRAME_BASE_PATH}/frame-${String(index + 1).padStart(4, "0")}.jpg`;

const PRIORITY_STRIDE = 6;
function buildPriorityIndices(count: number, stride: number) {
  const indices = new Set<number>();
  for (let i = 0; i < count; i += stride) indices.add(i);
  indices.add(0);
  indices.add(count - 1);
  return Array.from(indices).sort((a, b) => a - b);
}

// Total scroll distance (in viewport heights) across the whole pinned
// sequence. Generous by design, and split unevenly across chapters below -
// this is not "76 frames spread evenly over one scroll range." See the
// pacing block for how it's actually divided.
const PIN_HEIGHT_VH_DESKTOP = 1530;
const PIN_HEIGHT_VH_MOBILE = 765;

const MOBILE_QUERY = "(max-width: 767px)";

// ---------------------------------------------------------------------------
// Chapter pacing
// ---------------------------------------------------------------------------
// The 76-frame sequence is treated as alternating "animate" and "hold"
// beats, not one continuous ramp: an animate beat moves the house
// frame-by-frame toward the next reveal, a hold beat freezes the frame
// completely so that beat's text has real, deliberate time on screen no
// matter how fast someone scrolls with a normal mouse wheel or trackpad.
//
// SHARES are relative weights (not fractions) for how much of the total
// pinned scroll track each beat gets - increase a number to give that beat
// more scroll distance without having to recompute every other boundary by
// hand. "explodedHold" (the fully-exploded dwell) and the two finale beats
// are intentionally the longest.
const SHARES = {
  openHold: 90, // "Your home is more than four walls" - completed house, hold
  roofAnimate: 70, // roof begins separating
  roofHold: 110, // ROOF annotation holds on screen
  plumbingAnimate: 70,
  plumbingHold: 110, // PLUMBING annotation holds
  electricalAnimate: 70,
  electricalHold: 110, // ELECTRICAL annotation holds
  structureAnimate: 70,
  structureHold: 110, // STRUCTURE annotation holds
  explodedHold: 200, // "One home. Many risks." - the longest hold
  reassemblyAnimate: 180, // slow cinematic reassembly, no text over it
  completeHold: 120, // fully reassembled house, a quiet beat before the finale
  finaleHeadlineHold: 90, // "Protect the whole picture."
  finaleCtaHold: 130, // same headline + the "keep exploring" cue
};
const TOTAL_SHARES = Object.values(SHARES).reduce((sum, n) => sum + n, 0);

let cumulativeShare = 0;
function shareBoundary(key: keyof typeof SHARES): number {
  cumulativeShare += SHARES[key];
  return cumulativeShare / TOTAL_SHARES;
}

const OPEN_HOLD_END = shareBoundary("openHold");
const ROOF_ANIMATE_END = shareBoundary("roofAnimate");
const ROOF_HOLD_END = shareBoundary("roofHold");
const PLUMBING_ANIMATE_END = shareBoundary("plumbingAnimate");
const PLUMBING_HOLD_END = shareBoundary("plumbingHold");
const ELECTRICAL_ANIMATE_END = shareBoundary("electricalAnimate");
const ELECTRICAL_HOLD_END = shareBoundary("electricalHold");
const STRUCTURE_ANIMATE_END = shareBoundary("structureAnimate");
const STRUCTURE_HOLD_END = shareBoundary("structureHold");
const EXPLODED_HOLD_END = shareBoundary("explodedHold");
const REASSEMBLY_ANIMATE_END = shareBoundary("reassemblyAnimate");
const COMPLETE_HOLD_END = shareBoundary("completeHold");
const FINALE_HEADLINE_HOLD_END = shareBoundary("finaleHeadlineHold");
const FINALE_CTA_HOLD_END = shareBoundary("finaleCtaHold"); // === 1

// Frame "explosion" progress (0 = fully assembled, 1 = fully exploded) at
// each boundary above. Two equal values back-to-back (e.g. ROOF_ANIMATE_END
// and ROOF_HOLD_END both at 0.25) is what makes a beat a hold - the canvas
// simply has nothing new to draw until the next differing value.
const FRAME_CURVE_INPUT = [
  0,
  OPEN_HOLD_END,
  ROOF_ANIMATE_END,
  ROOF_HOLD_END,
  PLUMBING_ANIMATE_END,
  PLUMBING_HOLD_END,
  ELECTRICAL_ANIMATE_END,
  ELECTRICAL_HOLD_END,
  STRUCTURE_ANIMATE_END,
  STRUCTURE_HOLD_END,
  EXPLODED_HOLD_END,
  REASSEMBLY_ANIMATE_END,
  COMPLETE_HOLD_END,
  FINALE_HEADLINE_HOLD_END,
  FINALE_CTA_HOLD_END,
];
const FRAME_CURVE_OUTPUT = [0, 0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1, 1, 1, 0, 0, 0, 0];

// ---------------------------------------------------------------------------
// Movement sound (opt-in, off by default - see HouseScrollExperience below)
// ---------------------------------------------------------------------------
// A short mechanical/architectural sound effect, trimmed (silence removed
// only, nothing re-edited) from the original Higgsfield-generated clip's own
// audio track - no new assets generated. It is only ever allowed to play
// during "movement", reusing the exact same animate/hold boundaries as the
// frame curve above, so audio gating can never drift out of sync with what
// the house is actually doing on screen.
const MOVEMENT_SOUND_SRC = "/audio/house-movement.mp3";

type MovementSegment = { start: number; end: number; moving: boolean };
const MOVEMENT_SEGMENTS: MovementSegment[] = [
  { start: 0, end: OPEN_HOLD_END, moving: false },
  { start: OPEN_HOLD_END, end: ROOF_ANIMATE_END, moving: true },
  { start: ROOF_ANIMATE_END, end: ROOF_HOLD_END, moving: false },
  { start: ROOF_HOLD_END, end: PLUMBING_ANIMATE_END, moving: true },
  { start: PLUMBING_ANIMATE_END, end: PLUMBING_HOLD_END, moving: false },
  { start: PLUMBING_HOLD_END, end: ELECTRICAL_ANIMATE_END, moving: true },
  { start: ELECTRICAL_ANIMATE_END, end: ELECTRICAL_HOLD_END, moving: false },
  { start: ELECTRICAL_HOLD_END, end: STRUCTURE_ANIMATE_END, moving: true },
  { start: STRUCTURE_ANIMATE_END, end: STRUCTURE_HOLD_END, moving: false },
  { start: STRUCTURE_HOLD_END, end: EXPLODED_HOLD_END, moving: false },
  { start: EXPLODED_HOLD_END, end: REASSEMBLY_ANIMATE_END, moving: true },
  { start: REASSEMBLY_ANIMATE_END, end: 1, moving: false },
];
function isMovingAt(p: number): boolean {
  for (const seg of MOVEMENT_SEGMENTS) {
    if (p >= seg.start && p < seg.end) return seg.moving;
  }
  return false;
}

type MomentChapter = {
  kind: "moment";
  key: string;
  start: number;
  eyebrow?: string;
  headline: string;
  subhead?: string;
  // Renders `subhead` as a bigger, gold, more prominent cue rather than
  // ordinary body copy - used for the finale's "keep exploring" line.
  ctaHint?: boolean;
};

type AnnotationChapter = {
  kind: "annotation";
  key: string;
  start: number;
  label: string;
  caption: string;
  question: string;
  // Anchor id on the real homeowners page (e.g. "not-covered") that the
  // question line links to - see the mapping notes above CHAPTERS.
  destinationHash: string;
  anchor: { desktop: { x: number; y: number }; mobile: { x: number; y: number } };
  side: "left" | "right";
};

// A silent beat - nothing rendered. Used for the reassembly + "fully
// reassembled" stretch, so the house reassembling is the whole moment and
// no text competes with it.
type BlankChapter = {
  kind: "blank";
  key: string;
  start: number;
};

type Chapter = MomentChapter | AnnotationChapter | BlankChapter;

// Each chapter is "active" from its own `start` up to the next chapter's
// `start` (the list is in scroll order) - a discrete state, not a
// continuous opacity curve. Visibility is driven by plain React state (see
// `activeChapterKey` below) with a CSS opacity transition doing the
// crossfade; this is deliberately simpler than tying every overlay's
// opacity directly to a scroll-linked motion value; with this many
// simultaneously-mounted overlays sharing one scroll source, that approach
// was unreliable in testing (elements intermittently stopped tracking
// scroll position). Discrete active-chapter state + CSS transition is far
// more predictable, still gives a smooth crossfade, and doesn't touch the
// canvas frame-drawing logic below, which uses the scroll-linked motion
// value directly and works correctly.
//
// Anchor points are the same ones already visually verified against the
// actual exploded frames during the earlier architectural-annotation pass -
// rough visual references toward the relevant part of the house, not a
// precise/technical claim about any specific pipe, wire, or structural
// element.
//
// destinationHash mapping - the closest EXISTING section on the real
// /personal/homeowners-insurance page for each question (no new content or
// sections were added anywhere to make these matches):
//   roof       -> "state-guides"  (the Nevada/Colorado guide section calls
//                 out roof age/material as the single most common review
//                 point for NV, and roof endorsements for CO - the page's
//                 only roof-specific education content)
//   plumbing   -> "not-covered"   (the "What's NOT covered" section's
//                 "Sewer / drain backup" and "Mold" cards directly answer
//                 "what water damage is actually covered" - the strongest
//                 match of the four)
//   electrical -> "not-covered"   (the page has no electrical-specific
//                 content anywhere; "not-covered" is the closest general
//                 home-condition/eligibility education block, so this
//                 shares its destination with "plumbing" rather than
//                 inventing a dedicated electrical section)
//   structure  -> "calculator"    (the Dwelling Calculator section's own
//                 heading is literally "How much dwelling coverage do you
//                 actually need?" - an exact match)
const CHAPTERS: Chapter[] = [
  {
    kind: "moment",
    key: "opening",
    start: 0,
    headline: "YOUR HOME IS MORE THAN FOUR WALLS.",
    subhead: "Scroll to see what you're really protecting.",
  },
  {
    kind: "annotation",
    key: "roof",
    start: OPEN_HOLD_END,
    label: "Roof",
    caption: "Age. Material. Condition.",
    question: "Why does my roof matter?",
    destinationHash: "state-guides",
    anchor: { desktop: { x: 33.6, y: 20 }, mobile: { x: 37.0, y: 42.26 } },
    side: "right",
  },
  {
    kind: "annotation",
    key: "plumbing",
    start: ROOF_HOLD_END,
    label: "Plumbing",
    caption: "One small leak can become a very big loss.",
    question: "What water damage is actually covered?",
    destinationHash: "not-covered",
    anchor: { desktop: { x: 55.1, y: 32.2 }, mobile: { x: 54.05, y: 45.41 } },
    side: "left",
  },
  {
    kind: "annotation",
    key: "electrical",
    start: PLUMBING_HOLD_END,
    label: "Electrical",
    caption: "What's behind the walls matters too.",
    question: "Why does my electrical system matter?",
    destinationHash: "not-covered",
    anchor: { desktop: { x: 30.5, y: 37.8 }, mobile: { x: 34.55, y: 46.85 } },
    side: "right",
  },
  {
    kind: "annotation",
    key: "structure",
    start: ELECTRICAL_HOLD_END,
    label: "Structure",
    caption: "This is the part you're actually rebuilding.",
    question: "How much dwelling coverage do I need?",
    destinationHash: "calculator",
    anchor: { desktop: { x: 43.75, y: 71.1 }, mobile: { x: 45.05, y: 55.44 } },
    side: "right",
  },
  {
    kind: "moment",
    key: "exploded",
    start: STRUCTURE_HOLD_END,
    headline: "ONE HOME. MANY RISKS.",
    subhead: "Home insurance makes more sense when you understand what you're protecting.",
  },
  {
    kind: "blank",
    key: "reassembling",
    start: EXPLODED_HOLD_END,
  },
  {
    kind: "moment",
    key: "finale-headline",
    start: COMPLETE_HOLD_END,
    headline: "PROTECT THE WHOLE PICTURE.",
  },
  {
    kind: "moment",
    key: "finale-cta",
    start: FINALE_HEADLINE_HOLD_END,
    headline: "PROTECT THE WHOLE PICTURE.",
    subhead: "Continue Exploring Homeowners Insurance ↓",
    ctaHint: true,
  },
];

function chapterKeyForProgress(p: number): string {
  let key = CHAPTERS[0].key;
  for (const chapter of CHAPTERS) {
    if (p >= chapter.start) key = chapter.key;
    else break;
  }
  return key;
}

function ChapterMoment({ active, chapter }: { active: boolean; chapter: MomentChapter }) {
  return (
    <div
      aria-hidden={active ? undefined : true}
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 text-center transition-opacity duration-700 ease-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {chapter.eyebrow && (
        <span
          className="text-xs font-semibold uppercase tracking-[0.35em] text-gold md:text-sm"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
        >
          {chapter.eyebrow}
        </span>
      )}
      <p
        className="max-w-4xl text-balance font-display text-3xl font-semibold uppercase tracking-[0.08em] text-primary-foreground md:text-5xl lg:text-6xl"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
      >
        {chapter.headline}
      </p>
      {chapter.subhead && (
        <p
          className={
            chapter.ctaHint
              ? "text-pretty text-lg font-semibold uppercase tracking-[0.12em] text-gold md:text-2xl"
              : "max-w-xl text-pretty text-base text-primary-foreground/85 md:text-xl"
          }
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
        >
          {chapter.subhead}
        </p>
      )}
    </div>
  );
}

function ChapterAnnotation({ active, chapter }: { active: boolean; chapter: AnnotationChapter }) {
  const isRight = chapter.side !== "left";
  const positionStyle = {
    "--mx": `${chapter.anchor.mobile.x}%`,
    "--my": `${chapter.anchor.mobile.y}%`,
    "--dx": `${chapter.anchor.desktop.x}%`,
    "--dy": `${chapter.anchor.desktop.y}%`,
  } as unknown as React.CSSProperties;

  return (
    <div
      style={positionStyle}
      aria-hidden={active ? undefined : true}
      className={`pointer-events-none absolute left-[var(--mx)] top-[var(--my)] z-10 transition-opacity duration-700 ease-out md:left-[var(--dx)] md:top-[var(--dy)] ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        {/* Anchor dot on the house. */}
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-[2.5px] ring-ink md:h-3 md:w-3" />

        {/* Leader line + label, extending toward `side`, vertically centered
            on the dot. */}
        <div
          className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-2.5 md:gap-3 ${
            isRight ? "left-2 flex-row" : "right-2 flex-row-reverse"
          }`}
        >
          <span className="h-0.5 w-8 bg-gold md:w-12" aria-hidden="true" />
          <div
            className={
              isRight
                ? "max-w-[46vw] text-left md:max-w-none"
                : "max-w-[46vw] text-right md:max-w-none"
            }
          >
            <p
              className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-[0.08em] text-gold md:text-[28px]"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
            >
              {chapter.label}
            </p>
            <p
              className="mt-1 text-sm text-primary-foreground/90 md:text-base"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
            >
              {chapter.caption}
            </p>
            {/* Real link to the closest matching section on the actual
                homeowners page (see the mapping notes above CHAPTERS) -
                same visual styling as before, now backed by a genuine,
                keyboard-reachable destination. tabIndex is pulled out of
                the tab order while inactive so an invisible, off-screen
                chapter can't still be tabbed to. */}
            <Link
              to="/personal/homeowners-insurance"
              hash={chapter.destinationHash}
              tabIndex={active ? 0 : -1}
              className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold underline decoration-gold/50 underline-offset-4 md:text-base ${
                active ? "pointer-events-auto cursor-pointer" : ""
              } ${isRight ? "" : "flex-row-reverse"}`}
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
            >
              {chapter.question}
              <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Cinematic, full-screen, chapter-based scroll opener for the homeowners
 * experience. Reuses the same frame-sequence canvas technique as
 * HouseScrollAnimationFrames.tsx (that file is untouched, just no longer
 * referenced from the homeowners page).
 */
export function HouseScrollExperience() {
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

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  // Hide the site's sticky header while the pinned track is actively being
  // scrolled through, and restore it the moment the visitor is above the
  // experience (hasn't reached it yet) or below it (has released into the
  // continuation / rest of the site). Without this, the header - which is
  // also sticky to the top of the viewport with its own stacking context -
  // sits directly over the top of the house, and the roof disappears
  // behind it almost immediately. This only ever touches the header
  // element's own inline `display` style, and always restores it on
  // unmount; SiteHeader.tsx itself is untouched.
  //
  // IMPORTANT - do not "simplify" the measurement below: on this route the
  // pinned track is the very first element after the header, so once the
  // header is hidden it stops taking up space and the track's own natural
  // top position shifts up to meet the viewport top. If we measured
  // getBoundingClientRect() while the header is still hidden from a
  // previous tick, rect.top collapses to ~0 for any scroll position,
  // permanently satisfying "inPinnedRange" and locking the header hidden
  // forever (it could then only ever be released by scrolling past the far
  // end of the track, never by scrolling back up to the top). To avoid
  // that self-referential feedback loop, we briefly restore the header's
  // normal display immediately before measuring, so every measurement is
  // taken against the page's true layout rather than our own prior
  // decision. This read-then-write happens synchronously within a single
  // rAF callback, so nothing is ever painted in the intermediate state.
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const header = document.querySelector("header");
    if (!header) return;
    const el = header as HTMLElement;
    let ticking = false;

    const update = () => {
      ticking = false;
      const track = trackRef.current;
      if (!track) return;
      const wasHidden = el.style.display === "none";
      if (wasHidden) el.style.display = ""; // avoid measuring against our own hidden state
      const rect = track.getBoundingClientRect();
      const inPinnedRange = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      el.style.display = inPinnedRange ? "none" : "";
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.display = "";
    };
  }, []);

  const drawFrame = React.useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

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

  const drawFrameRef = React.useRef(drawFrame);
  React.useEffect(() => {
    drawFrameRef.current = drawFrame;
    if (framesReadyRef.current) drawFrame(currentIndexRef.current);
  }, [drawFrame]);

  React.useEffect(() => {
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
      if (!anyPriorityLoaded) return;
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

  // Derived "explosion" progress: alternates holds (flat) and animates
  // (ramps) across the chapter pacing defined above.
  const frameProgress = useTransform(scrollYProgress, FRAME_CURVE_INPUT, FRAME_CURVE_OUTPUT);

  useMotionValueEvent(frameProgress, "change", (latest) => {
    if (reducedMotion || !framesReadyRef.current) return;
    const progress = Math.min(1, Math.max(0, latest));
    const index = Math.round((1 - progress) * (FRAME_COUNT - 1));
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      drawFrame(index);
    }
  });

  // Which chapter is current, driven by discrete scroll-progress buckets
  // (see chapterKeyForProgress above) rather than a continuous per-overlay
  // opacity transform - see the comment on CHAPTERS for why.
  const [activeChapterKey, setActiveChapterKey] = React.useState(CHAPTERS[0].key);
  const activeChapterKeyRef = React.useRef(activeChapterKey);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const key = chapterKeyForProgress(Math.min(1, Math.max(0, latest)));
    if (key !== activeChapterKeyRef.current) {
      activeChapterKeyRef.current = key;
      setActiveChapterKey(key);
    }
  });

  // ---------------------------------------------------------------------
  // Sound: off by default, and only ever started by a direct tap on the
  // Sound On/Off control (see handleSoundToggle) - never by scrolling
  // alone. Once on, a single shared <audio> element is faded in during
  // "moving" segments and faded out (then paused, never hard-cut) during
  // holds, so backward or rapid scrolling can only ever retrigger or fade
  // the one clip - it can't stack or overlap copies of itself.
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const soundEnabledRef = React.useRef(false);
  const audioElRef = React.useRef<HTMLAudioElement | null>(null);
  const wasMovingRef = React.useRef(false);
  const targetVolumeRef = React.useRef(0);
  const currentVolumeRef = React.useRef(0);
  const volumeRafRef = React.useRef<number | null>(null);
  const lastTriggerAtRef = React.useRef(0);

  const ensureAudioEl = React.useCallback(() => {
    if (audioElRef.current) return audioElRef.current;
    if (typeof Audio === "undefined") return null;
    const el = new Audio(MOVEMENT_SOUND_SRC);
    el.preload = "none";
    el.volume = 0;
    audioElRef.current = el;
    return el;
  }, []);

  const stepVolume = React.useCallback(() => {
    volumeRafRef.current = null;
    const el = audioElRef.current;
    if (!el) return;
    const target = targetVolumeRef.current;
    const next = currentVolumeRef.current + (target - currentVolumeRef.current) * 0.18;
    const settled = Math.abs(target - next) < 0.01;
    currentVolumeRef.current = settled ? target : next;
    el.volume = Math.min(1, Math.max(0, currentVolumeRef.current));
    if (settled && target === 0) {
      if (!el.paused) el.pause();
      return;
    }
    if (!settled) {
      volumeRafRef.current = window.requestAnimationFrame(stepVolume);
    }
  }, []);

  const scheduleVolumeStep = React.useCallback(() => {
    if (volumeRafRef.current == null) {
      volumeRafRef.current = window.requestAnimationFrame(stepVolume);
    }
  }, [stepVolume]);

  // Side effects (starting/priming/fading the audio element) deliberately
  // live in this plain function body, not inside setSoundEnabled's updater -
  // React (in development, under StrictMode) can invoke a functional state
  // updater twice to check that it's pure, which would have called play()
  // twice for one click. soundEnabledRef is the actual source of truth for
  // "on or off" here; setSoundEnabled just drives the button's label/icon.
  const handleSoundToggle = React.useCallback(() => {
    const next = !soundEnabledRef.current;
    soundEnabledRef.current = next;
    setSoundEnabled(next);

    const el = ensureAudioEl();
    if (next && el) {
      // This click is a real user gesture - use it to either start the
      // sound immediately (if the house happens to be mid-movement right
      // now) or silently "prime" the element so a later, scroll-triggered
      // play() call is allowed to work on mobile browsers.
      const progressNow = Math.min(1, Math.max(0, scrollYProgress.get()));
      const movingNow = isMovingAt(progressNow);
      wasMovingRef.current = movingNow;
      if (movingNow) {
        try {
          el.currentTime = 0;
        } catch {
          // ignore - metadata may not be loaded yet
        }
        targetVolumeRef.current = 0.55;
        lastTriggerAtRef.current =
          typeof performance !== "undefined" ? performance.now() : Date.now();
        el.play().catch(() => {});
        scheduleVolumeStep();
      } else {
        el.volume = 0;
        el.play()
          .then(() => el.pause())
          .catch(() => {});
      }
    } else if (!next) {
      targetVolumeRef.current = 0;
      scheduleVolumeStep();
    }
  }, [ensureAudioEl, scheduleVolumeStep, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!soundEnabledRef.current) return;
    const progress = Math.min(1, Math.max(0, latest));
    const moving = isMovingAt(progress);
    if (moving === wasMovingRef.current) return;
    wasMovingRef.current = moving;

    const el = audioElRef.current;
    if (!el) return;

    if (moving) {
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      if (now - lastTriggerAtRef.current < 150) return; // guard against boundary jitter
      lastTriggerAtRef.current = now;
      try {
        el.currentTime = 0;
      } catch {
        // ignore
      }
      targetVolumeRef.current = 0.55;
      el.play().catch(() => {});
    } else {
      targetVolumeRef.current = 0;
    }
    scheduleVolumeStep();
  });

  React.useEffect(() => {
    return () => {
      if (volumeRafRef.current != null) window.cancelAnimationFrame(volumeRafRef.current);
      const el = audioElRef.current;
      if (el) {
        el.pause();
        el.src = "";
      }
    };
  }, []);

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
      aria-label="Scroll through your XPRT home, from complete to exploded and back"
      className="relative bg-ink"
    >
      {showCanvas && (
        <div ref={trackRef} className="relative" style={{ height: `${pinHeightVh}vh` }}>
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

            {/* Sound On/Off - off by default, always available while the
                cinematic sequence is on screen, never tied to a chapter's
                fade so it doesn't flicker in and out with the story. */}
            <button
              type="button"
              onClick={handleSoundToggle}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/60 text-primary-foreground/80 backdrop-blur transition hover:bg-ink/80 hover:text-primary-foreground md:right-6 md:top-6"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            {CHAPTERS.map((chapter) => {
              if (chapter.kind === "blank") return null;
              const active = chapter.key === activeChapterKey;
              return chapter.kind === "moment" ? (
                <ChapterMoment key={chapter.key} active={active} chapter={chapter} />
              ) : (
                <ChapterAnnotation key={chapter.key} active={active} chapter={chapter} />
              );
            })}

            {/* Subtle scroll cue, visible only during the opening chapter -
                minimal chrome, not a persistent overlay throughout. */}
            <div
              aria-hidden={activeChapterKey === "opening" ? undefined : true}
              className={`pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 transition-opacity duration-700 ease-out ${
                activeChapterKey === "opening" ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="rounded-full bg-ink/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/80 backdrop-blur">
                Scroll to begin
              </span>
            </div>
          </div>
        </div>
      )}

      {(reducedMotion || framesFailed) && (
        <div className="relative flex aspect-[16/9] w-full flex-col items-center justify-center gap-6 px-6 text-center md:aspect-[21/9]">
          <img
            src={completedHouse}
            alt="A custom XPRT-built home, fully finished."
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <p className="max-w-2xl text-balance font-display text-3xl font-semibold uppercase tracking-[0.08em] text-primary-foreground md:text-5xl">
              YOUR HOME IS MORE THAN FOUR WALLS.
            </p>
            <p className="max-w-xl text-pretty text-base text-primary-foreground/85 md:text-lg">
              Roof, plumbing, electrical, and structure - every part of a custom XPRT-built home,
              and every part worth understanding before you need to file a claim.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Below-the-fold continuation, in normal document flow (not pinned) - the
 * natural transition from the cinematic opener into the rest of the
 * Homeowners Insurance page content. Carries the same quote / lead-gen
 * buttons that used to live in the page's static hero (now replaced by the
 * opener above), so that call to action isn't lost in the swap.
 */
export function HouseScrollExperienceContinuation() {
  return (
    <div className="bg-ink px-6 pb-24 pt-4 text-center">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
        <span className="h-px w-16 bg-gold/60" aria-hidden="true" />
        <p className="text-pretty text-lg text-primary-foreground/85 md:text-xl">
          Here's what a homeowners policy actually needs to cover - and where the gaps usually hide.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <GhlFormButton
            form="personal_quote"
            size="lg"
            className="btn-gold-shimmer bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold"
          >
            Get a Homeowners Quote
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </GhlFormButton>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link to="/book">Book a Free Coverage Review</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
