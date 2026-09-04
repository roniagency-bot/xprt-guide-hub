import * as React from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import xprtLogo from "@/assets/xprt-logo.png";
import posterImage from "@/assets/homeowners-flythrough-poster.jpg";

// Cinematic "drone flythrough" opener for the Homeowners Insurance pages.
//
// A 300-frame image sequence (one continuous FPV-style glide: front lawn ->
// front door -> living room -> kitchen -> primary bedroom -> backyard ->
// pull-back reveal of the whole home) is scrubbed by scroll while the section
// is pinned. Built with the same pieces as HouseScrollExperience.tsx:
// framer-motion useScroll on a tall track with a sticky viewport, a
// devicePixelRatio-aware <canvas> drawn with cover-fit, progressive frame
// loading, a static poster for prefers-reduced-motion / load failure, and
// the same "hide the sticky site header while pinned" behaviour (the header
// element's inline display is toggled here and always restored on unmount;
// SiteHeader.tsx is not modified).
//
// Frames live in /public/frames/homeowners-flythrough/{desktop,mobile}/ as
// frame-0001.webp ... frame-0300.webp (desktop 1920w, mobile 960w).

const FRAME_COUNT = 300;
const FRAME_BASE_PATH = "/frames/homeowners-flythrough";
const frameSrc = (index: number, mobile: boolean) =>
  `${FRAME_BASE_PATH}/${mobile ? "mobile" : "desktop"}/frame-${String(index + 1).padStart(4, "0")}.webp`;

// Scroll distance the pinned flythrough occupies (in viewport heights).
const PIN_HEIGHT_VH_DESKTOP = 600;
const PIN_HEIGHT_VH_MOBILE = 450;
const MOBILE_QUERY = "(max-width: 767px)";

// First frames requested before anything is drawn, then a coarse pass
// (every Nth frame) so any scroll position has something close by, then
// everything else fills in.
const EAGER_FRAMES = 30;
const COARSE_STRIDE = 10;

export type FlythroughCopy = {
  eyebrow: string;
  headline: string;
  subline: string;
  scrollCue: string;
  ariaLabel: string;
  posterAlt: string;
  captions: {
    entry: [string, string];
    living: [string, string];
    kitchen: [string, string];
    bedroom: [string, string];
    backyard: [string, string];
    final: [string, string];
  };
};

export const FLYTHROUGH_COPY_EN: FlythroughCopy = {
  eyebrow: "XPRT Insurance · Homeowners",
  headline: "Your home is more than four walls.",
  subline: "Scroll to see what you're really protecting.",
  scrollCue: "Scroll to begin",
  ariaLabel:
    "Scroll-driven flythrough of a home, from the front lawn through every room and back out",
  posterAlt: "A mountain-modern home at sunset with warm light in every window.",
  captions: {
    entry: ["The front door", "Where everyone comes home."],
    living: ["The living room", "Where your life happens."],
    kitchen: ["The kitchen", "Where every day begins."],
    bedroom: ["The bedroom", "Where your kids sleep at night."],
    backyard: ["The backyard", "Where summers live."],
    final: ["All of it", "Protected. Properly."],
  },
};

export const FLYTHROUGH_COPY_ES: FlythroughCopy = {
  eyebrow: "XPRT Insurance · Seguro de casa",
  headline: "Tu hogar es más que cuatro paredes.",
  subline: "Desliza para ver lo que realmente estás protegiendo.",
  scrollCue: "Desliza para comenzar",
  ariaLabel:
    "Recorrido de una casa controlado por el scroll, desde el jardín, por cada habitación y de regreso",
  posterAlt: "Una casa moderna de montaña al atardecer con luz cálida en cada ventana.",
  captions: {
    entry: ["La entrada", "Donde todos vuelven a casa."],
    living: ["La sala", "Donde pasa tu vida."],
    kitchen: ["La cocina", "Donde empieza cada día."],
    bedroom: ["La recámara", "Donde tus hijos duermen cada noche."],
    backyard: ["El patio", "Donde viven los veranos."],
    final: ["Todo esto", "Protegido. Como debe ser."],
  },
};

// Caption windows as fractions of the pinned scroll (six ~equal clips).
type CaptionKey = keyof FlythroughCopy["captions"];
const CAPTION_WINDOWS: { key: CaptionKey; from: number; to: number; center?: boolean }[] = [
  { key: "entry", from: 0.09, to: 0.19 },
  { key: "living", from: 0.27, to: 0.4 },
  { key: "kitchen", from: 0.44, to: 0.55 },
  { key: "bedroom", from: 0.6, to: 0.71 },
  { key: "backyard", from: 0.76, to: 0.86 },
  { key: "final", from: 0.91, to: 1.01, center: true }, // stays until release
];
const HEADLINE_FADE_END = 0.05;

export function HomeFlythroughExperience({ copy = FLYTHROUGH_COPY_EN }: { copy?: FlythroughCopy }) {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imagesRef = React.useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const loadingRef = React.useRef<Set<number>>(new Set());
  const currentIndexRef = React.useRef(0);
  const drawnIndexRef = React.useRef(-1);
  const framesReadyRef = React.useRef(false);

  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [framesReady, setFramesReady] = React.useState(false);
  const [framesFailed, setFramesFailed] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

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

  // Hide the sticky site header while the pinned track fills the viewport.
  // See the long note in HouseScrollExperience.tsx for why the header is
  // un-hidden immediately before measuring (it avoids a feedback loop where
  // the hidden header shifts the track's own position).
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
      if (el.style.display === "none") el.style.display = "";
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

  // Nearest loaded frame to `index` so scrubbing never paints black.
  const nearestLoaded = React.useCallback((index: number) => {
    const imgs = imagesRef.current;
    if (imgs[index]) return imgs[index];
    for (let d = 1; d < FRAME_COUNT; d++) {
      const lo = index - d;
      const hi = index + d;
      if (lo >= 0 && imgs[lo]) return imgs[lo];
      if (hi < FRAME_COUNT && imgs[hi]) return imgs[hi];
    }
    return null;
  }, []);

  const drawFrame = React.useCallback(
    (index: number, force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!force && drawnIndexRef.current === index) return;
      const img = nearestLoaded(index);
      if (!img) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const pxW = Math.round(cssW * dpr);
      const pxH = Math.round(cssH * dpr);
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW;
        canvas.height = pxH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cssW - dw) / 2, (cssH - dh) / 2, dw, dh);
      drawnIndexRef.current = index;
    },
    [nearestLoaded],
  );
  const drawFrameRef = React.useRef(drawFrame);
  React.useEffect(() => {
    drawFrameRef.current = drawFrame;
  }, [drawFrame]);

  // Progressive loading. Re-runs if the device class flips (desktop <-> mobile).
  const loadFrameRef = React.useRef<(i: number) => Promise<void>>(() => Promise.resolve());
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) return;
    let cancelled = false;
    imagesRef.current = new Array(FRAME_COUNT).fill(null);
    loadingRef.current = new Set();
    drawnIndexRef.current = -1;
    framesReadyRef.current = false;
    let failed = 0;
    let settled = 0;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (i < 0 || i >= FRAME_COUNT || imagesRef.current[i] || loadingRef.current.has(i)) {
          resolve();
          return;
        }
        loadingRef.current.add(i);
        const img = new Image();
        img.decoding = "async";
        const done = (ok: boolean) => {
          loadingRef.current.delete(i);
          if (cancelled) return resolve();
          settled += 1;
          if (ok) {
            imagesRef.current[i] = img;
            if (!framesReadyRef.current && i === 0) {
              framesReadyRef.current = true;
              setFramesReady(true);
            }
            if (i === currentIndexRef.current || drawnIndexRef.current === -1) {
              drawFrameRef.current(currentIndexRef.current, true);
            }
          } else {
            failed += 1;
            if (settled === FRAME_COUNT && failed === FRAME_COUNT) setFramesFailed(true);
          }
          resolve();
        };
        img.onload = () => done(true);
        img.onerror = () => done(false);
        img.src = frameSrc(i, isMobile);
      });
    loadFrameRef.current = load;

    (async () => {
      await load(0);
      const eager: Promise<void>[] = [];
      for (let i = 1; i < Math.min(EAGER_FRAMES, FRAME_COUNT); i++) eager.push(load(i));
      await Promise.all(eager);
      const coarse: Promise<void>[] = [];
      for (let i = EAGER_FRAMES; i < FRAME_COUNT; i += COARSE_STRIDE) coarse.push(load(i));
      await Promise.all(coarse);
      const queue: number[] = [];
      for (let i = EAGER_FRAMES; i < FRAME_COUNT; i++) if (!imagesRef.current[i]) queue.push(i);
      while (queue.length && !cancelled) {
        const c = currentIndexRef.current;
        queue.sort((a, b) => Math.abs(a - c) - Math.abs(b - c));
        await Promise.all(queue.splice(0, 6).map(load));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion, isMobile]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const p = Math.min(1, Math.max(0, latest));
    setProgress(p);
    if (reducedMotion) return;
    const index = Math.round(p * (FRAME_COUNT - 1));
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      // look-ahead in both directions so fast scrolling has frames ready
      for (let k = 1; k <= 8; k++) {
        void loadFrameRef.current(index + k);
        void loadFrameRef.current(index - k);
      }
      drawFrame(index);
    }
  });

  React.useEffect(() => {
    if (!framesReady) return;
    drawFrame(currentIndexRef.current, true);
    const onResize = () => drawFrame(currentIndexRef.current, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [framesReady, drawFrame]);

  const showCanvas = !reducedMotion && !framesFailed;
  const pinHeightVh = isMobile ? PIN_HEIGHT_VH_MOBILE : PIN_HEIGHT_VH_DESKTOP;
  const headlineOpacity = Math.max(0, 1 - progress / HEADLINE_FADE_END);

  return (
    <section aria-label={copy.ariaLabel} className="relative bg-ink">
      {showCanvas && (
        <div ref={trackRef} className="relative" style={{ height: `${pinHeightVh}vh` }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
            {/* Poster (frame 1) shown until the first frame is decoded */}
            <img
              src={posterImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ opacity: framesReady ? 0 : 1 }}
            />
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

            {/* Navy vignette so type stays readable over bright frames */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in oklab, var(--ink) 55%, transparent), transparent 30%, transparent 62%, color-mix(in oklab, var(--ink) 72%, transparent))",
              }}
            />

            {/* Logo, top-left, visible for the whole pinned sequence (the site
                header is hidden while pinned, so this keeps the brand on screen). */}
            <div className="pointer-events-none absolute left-5 top-4 z-20 md:left-8 md:top-6">
              <img
                src={xprtLogo}
                alt="XPRT Insurance – A Roni Rivers Agency"
                className="h-14 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:h-20"
              />
            </div>

            {/* Opening headline - fades over the first 5% of the scroll */}
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              style={{
                opacity: headlineOpacity,
                transform: `translateY(${-30 * (1 - headlineOpacity)}px)`,
              }}
              aria-hidden={headlineOpacity === 0 ? true : undefined}
            >
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.38em] text-gold">
                {copy.eyebrow}
              </p>
              <h2 className="max-w-[18ch] text-balance font-display text-3xl font-medium uppercase leading-[1.08] tracking-[0.14em] text-primary-foreground drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
                {copy.headline}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-sm tracking-[0.06em] text-primary-foreground/90 drop-shadow md:text-lg">
                {copy.subline}
              </p>
            </div>

            {/* Room captions, tied to scroll progress */}
            {CAPTION_WINDOWS.map(({ key, from, to, center }) => {
              const [k, t] = copy.captions[key];
              const fade = Math.min(0.04, (to - from) / 3);
              let o = 0;
              if (progress >= from && progress <= to) {
                if (progress < from + fade) o = (progress - from) / fade;
                else if (progress > to - fade) o = (to - progress) / fade;
                else o = 1;
              }
              o = Math.max(0, Math.min(1, o));
              const y = (1 - o) * 18;
              return (
                <div
                  key={key}
                  aria-hidden={o === 0 ? true : undefined}
                  className={
                    center
                      ? "pointer-events-none absolute left-1/2 top-1/2 w-[min(640px,84vw)] -translate-x-1/2 -translate-y-1/2 text-center"
                      : "pointer-events-none absolute bottom-[clamp(90px,16vh,160px)] left-[clamp(20px,6vw,90px)] max-w-[min(620px,80vw)] md:bottom-[clamp(60px,12vh,130px)]"
                  }
                  style={{
                    opacity: o,
                    transform: center
                      ? `translate(-50%, calc(-50% + ${y}px))`
                      : `translateY(${y}px)`,
                  }}
                >
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.36em] text-gold">
                    {k}
                  </p>
                  <p className="font-display text-3xl leading-[1.05] text-primary-foreground drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] sm:text-4xl lg:text-5xl">
                    {t}
                  </p>
                </div>
              );
            })}

            {/* Scroll cue, visible only at the start */}
            <div
              aria-hidden={headlineOpacity === 0 ? true : undefined}
              className="pointer-events-none absolute inset-x-0 bottom-9 flex justify-center"
              style={{ opacity: headlineOpacity }}
            >
              <span className="rounded-full border border-primary-foreground/40 bg-ink/40 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-primary-foreground/90 backdrop-blur">
                {copy.scrollCue}
              </span>
            </div>
          </div>
        </div>
      )}

      {(reducedMotion || framesFailed) && (
        <div className="relative flex aspect-[16/9] w-full flex-col items-center justify-center gap-6 px-6 text-center md:aspect-[21/9]">
          <img
            src={posterImage}
            alt={copy.posterAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <p className="max-w-2xl text-balance font-display text-3xl font-medium uppercase tracking-[0.1em] text-primary-foreground md:text-5xl">
              {copy.headline}
            </p>
            <p className="max-w-xl text-pretty text-base text-primary-foreground/85 md:text-lg">
              {copy.subline}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
