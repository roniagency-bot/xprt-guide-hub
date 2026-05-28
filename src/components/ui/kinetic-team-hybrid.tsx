"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Phone, Mail, ArrowUpRight, Minus, Plus } from "lucide-react";
import { TEAM, initialsOf, type TeamMember } from "@/data/team";

/**
 * Kinetic team section — adapted from 21st.dev "kinetic-team-hybrid".
 * - Themed to XPRT tokens (ink surface, gold accent, primary-foreground text).
 * - Replaces next/image with plain <img> + monogram fallback.
 * - Adds direct phone + email rendered inside the row + floating preview card.
 */
export function TeamSection({ members = TEAM }: { members?: TeamMember[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  const active = members.find((m) => m.id === activeId);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full cursor-default bg-ink px-6 py-24 text-primary-foreground md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              <span className="inline-block h-px w-8 bg-gold" />
              The team
            </p>
            <h2 className="font-display text-4xl font-light tracking-tighter text-primary-foreground sm:text-5xl md:text-7xl">
              Meet the <span className="text-gold">XPRTs</span>
            </h2>
          </div>
          <div className="mx-8 hidden h-px flex-1 bg-primary-foreground/15 md:block" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/50">
            Nevada · Colorado
          </p>
        </motion.header>

        <div className="flex flex-col">
          {members.map((member, index) => (
            <TeamRow
              key={member.id}
              data={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP: floating preview card follows cursor */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-64 w-80 overflow-hidden rounded-xl border border-primary-foreground/10 bg-card text-card-foreground shadow-2xl"
              >
                {active.photo ? (
                  <img
                    src={active.photo}
                    alt={active.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Monogram name={active.name} className="h-full w-full text-6xl" />
                )}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/85 to-transparent p-4">
                  <p className="font-display text-lg text-white">{active.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-gold">
                    {active.location}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Row ---------- */

function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: TeamMember;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        backgroundColor: isActive && isMobile ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : data.id)}
      className={`group relative border-t border-primary-foreground/10 transition-colors duration-500 last:border-b ${
        isMobile ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="relative z-10 flex flex-col py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <div className="flex items-baseline gap-6 pl-4 transition-transform duration-500 group-hover:translate-x-3 md:gap-10 md:pl-0">
          <span className="font-mono text-xs text-primary-foreground/40">{data.id}</span>
          <div>
            <h3 className="font-display text-2xl font-medium tracking-tight text-primary-foreground/60 transition-colors duration-300 group-hover:text-primary-foreground md:text-5xl">
              {data.name}
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-primary-foreground/40 transition-colors group-hover:text-gold md:hidden">
              {data.role}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between pl-12 pr-4 md:mt-0 md:justify-end md:gap-10 md:pl-0 md:pr-0">
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/50 transition-colors group-hover:text-gold md:inline">
            {data.role}
          </span>

          <div className="block text-primary-foreground/60 md:hidden">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          <motion.div
            animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
            className="hidden text-gold md:block"
          >
            <ArrowUpRight size={26} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* Expanded contact panel — inline on mobile, slides on desktop hover */}
      <AnimatePresence>
        {((isMobile && isActive) || (!isMobile && isActive)) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 px-4 pb-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6 md:px-0 md:pb-10">
              <div className="hidden h-20 w-20 overflow-hidden rounded-full border border-primary-foreground/10 sm:block md:h-24 md:w-24">
                {data.photo ? (
                  <img src={data.photo} alt={data.name} className="h-full w-full object-cover" />
                ) : (
                  <Monogram name={data.name} className="h-full w-full text-2xl" />
                )}
              </div>
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-primary-foreground/70 md:text-base">
                  {data.specialty}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  {data.phone ? (
                    <a
                      href={`tel:${data.phone}`}
                      className="inline-flex items-center gap-2 text-gold hover:underline"
                    >
                      <Phone size={14} />
                      {data.phoneDisplay || data.phone}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-primary-foreground/40">
                      <Phone size={14} />
                      Direct line coming soon
                    </span>
                  )}
                  {data.email ? (
                    <a
                      href={`mailto:${data.email}`}
                      className="inline-flex items-center gap-2 text-gold hover:underline"
                    >
                      <Mail size={14} />
                      {data.email}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-primary-foreground/40">
                      <Mail size={14} />
                      Direct email coming soon
                    </span>
                  )}
                  <span className="text-xs uppercase tracking-widest text-primary-foreground/40">
                    {data.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Monogram({ name, className = "" }: { name: string; className?: string }) {
  const initials = initialsOf(name);
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-gold/30 to-primary-foreground/5 font-display font-light tracking-tight text-gold ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default TeamSection;
