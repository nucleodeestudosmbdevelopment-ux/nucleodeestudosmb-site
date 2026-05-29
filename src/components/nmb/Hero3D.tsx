import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { contact, navigationLinks } from "@/content/nmb";
import { BRAND_LOGO_ICON_URL } from "@/lib/brand";

const SCROLL_START_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
  "Spacebar",
]);

function TrajectoryLines() {
  const paths = [
    "M -40 430 C 240 360, 420 260, 740 210 C 960 176, 1180 124, 1480 52",
    "M -60 520 C 200 468, 390 380, 700 328 C 920 292, 1130 238, 1460 176",
    "M 120 600 C 350 520, 560 430, 860 390 C 1060 360, 1240 310, 1460 250",
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-35 pointer-events-none"
      viewBox="0 0 1440 700"
      preserveAspectRatio="none"
      aria-hidden
    >
      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke={index % 2 === 0 ? "var(--brand-green)" : "var(--brand-purple)"}
          strokeOpacity={0.12}
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeDasharray="12 16"
          animate={{ strokeDashoffset: [0, -140] }}
          transition={{ duration: 10 + index * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}

function OrganicBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1700&q=80')",
          opacity: 0.1,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.985_0.008_95/0.88)_0%,oklch(0.985_0.008_95/0.72)_32%,oklch(0.975_0.012_95/0.92)_100%),radial-gradient(circle_at_22%_24%,oklch(0.82_0.12_152/0.18)_0%,transparent_40%),radial-gradient(circle_at_78%_30%,oklch(0.78_0.16_295/0.12)_0%,transparent_42%)]" />
      <div className="absolute left-[10%] top-[14%] h-56 w-56 rounded-full bg-brand-green/12 blur-3xl" />
      <div className="absolute right-[8%] top-[18%] h-64 w-64 rounded-full bg-brand-purple/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </div>
  );
}

export function Hero3D() {
  const [overlayFading, setOverlayFading] = useState(false);
  const [started, setStarted] = useState(false);
  const preHeroShownRef = useRef(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const tx = useTransform(sx, (v) => v * 12);
  const ty = useTransform(sy, (v) => v * 8);

  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type === "reload") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setStarted(false);
      setOverlayFading(false);
      preHeroShownRef.current = false;
    }
  }, []);

  const updateSpotlight = useCallback((clientX: number, clientY: number) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
      updateSpotlight(e.clientX, e.clientY);
    };

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) updateSpotlight(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [mx, my, updateSpotlight]);

  const startIntro = useCallback((openHeaderMenu = false) => {
    if (preHeroShownRef.current) return;

    preHeroShownRef.current = true;
    setOverlayFading(true);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setStarted(true);
      if (openHeaderMenu) {
        globalThis.dispatchEvent(new CustomEvent("nmb:open-header-menu"));
      }
    }, 240);
  }, []);

  useEffect(() => {
    if (started) {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleStartIntro = (event?: Event) => {
      if (
        event?.target instanceof Element &&
        event.target.closest("[data-curtain-menu-interactive]")
      ) {
        return;
      }

      startIntro();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (SCROLL_START_KEYS.has(event.key)) startIntro();
    };

    const passive = { passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", handleStartIntro, passive);
    window.addEventListener("touchstart", handleStartIntro, passive);
    window.addEventListener("scroll", handleStartIntro, passive);
    window.addEventListener("keydown", onKeyDown);
    fallbackTimerRef.current = setTimeout(() => startIntro(), 4500);

    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleStartIntro);
      window.removeEventListener("touchstart", handleStartIntro);
      window.removeEventListener("scroll", handleStartIntro);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [started, startIntro]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.985 0.008 95) 0%, oklch(0.978 0.012 95) 58%, oklch(0.955 0.03 295 / 0.22) 100%)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: 10 }}
        initial={false}
        animate={{ opacity: started ? 1 : 0.94, scale: started ? 1 : 1.025 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <OrganicBackdrop />

        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none"
          style={
            {
              zIndex: 1,
              background:
                "radial-gradient(circle 420px at var(--spot-x, 50%) var(--spot-y, 50%), oklch(1 0 0 / 0.28) 0%, transparent 68%)",
            } as React.CSSProperties
          }
        />

        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
          <TrajectoryLines />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background:
              "linear-gradient(180deg, oklch(1 0 0 / 0.14) 0%, transparent 16%, transparent 82%, oklch(0.95 0.02 250 / 0.18) 100%)",
          }}
        />

        <div
          className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 sm:pb-24 sm:pt-40 md:pb-32 md:pt-48"
          style={{ zIndex: 10 }}
        >
          <motion.div
            style={{ x: tx, y: ty }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 20 }}
            transition={{ duration: 0.62, ease: "easeOut", delay: started ? 0.22 : 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/6 bg-white/82 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-ink-muted shadow-[0_16px_30px_-24px_rgba(0,0,0,0.22)] backdrop-blur">
              <span aria-hidden className="h-2 w-2 rotate-45 bg-brand-green" />
              Núcleo de Ensino
            </div>
            <h1 className="mt-6 text-balance text-[clamp(2rem,8.2vw,2.85rem)] font-medium leading-[1.14] text-foreground sm:text-4xl sm:leading-[1.12] md:text-6xl md:leading-[1.08] lg:text-7xl">
              Educação, comunicação <br className="hidden sm:block" /> e{" "}
              <span className="font-display text-brand-green sm:inline-block">autonomia</span> para
              alunos que{" "}
              <span className="font-display text-brand-purple sm:inline-block">
                querem ir mais longe
              </span>
              .
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-ink-muted/90 sm:text-lg">
              Um núcleo de ensino com foco em pré-vestibular e redação, com aprovações em Medicina e
              vestibulares concorridos, para quem busca acompanhamento próximo, método e resultado
              real.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-transform hover:-translate-y-[-2px] shadow-3d"
              >
                Falar pelo WhatsApp
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-7 py-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Conhecer o Núcleo
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 70 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 15% 25%, oklch(0.74 0.22 152 / 0.18) 0%, transparent 45%), radial-gradient(ellipse at 85% 15%, oklch(0.65 0.26 295 / 0.16) 0%, transparent 42%), radial-gradient(ellipse at 50% 90%, oklch(0.70 0.20 152 / 0.10) 0%, transparent 40%), linear-gradient(135deg, oklch(0.18 0.06 280) 0%, oklch(0.13 0.03 250) 50%, oklch(0.15 0.05 200) 100%)",
            opacity: overlayFading ? 0 : 1,
            transition: "opacity 0.64s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.08)_0%,transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_18%,transparent_82%,rgba(0,0,0,0.24)_100%)]"
          style={{
            opacity: overlayFading ? 0 : 1,
            transition: "opacity 0.64s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: overlayFading ? 0 : 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ zIndex: 80 }}
        >
          <div
            className="pointer-events-auto absolute inset-x-0 top-0 px-4 pt-4"
            data-curtain-menu-interactive
          >
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <a
                href="#top"
                className="flex shrink-0 items-center gap-3 rounded-full border border-white/18 bg-white/10 px-3.5 py-2.5 backdrop-blur-xl shadow-[0_16px_40px_-26px_rgba(0,0,0,0.55)]"
              >
                <img
                  src={BRAND_LOGO_ICON_URL}
                  alt="Logo do Núcleo Márcia Baldi"
                  className="h-10 w-10 shrink-0 rounded-[0.9rem] object-contain shadow-[0_10px_20px_-12px_rgba(0,0,0,0.45)]"
                />
                <span className="hidden sm:flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/50">
                    Núcleo
                  </span>
                  <span className="text-sm font-semibold text-white/92">Márcia Baldi</span>
                </span>
              </a>

              <div className="hidden flex-1 justify-center md:flex">
                <div className="relative flex items-center rounded-full border border-white/14 bg-white/[0.07] px-2 py-2 backdrop-blur-xl shadow-[0_16px_44px_-28px_rgba(0,0,0,0.58)]">
                  <nav className="relative z-10 flex items-center gap-1 text-sm text-white/80">
                    {navigationLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="rounded-full px-4 py-2 font-medium transition-all duration-200 hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="ml-auto md:hidden">
                <button
                  type="button"
                  aria-label="Abrir menu"
                  onClick={(event) => {
                    event.stopPropagation();
                    startIntro(true);
                  }}
                  data-curtain-menu-interactive
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white/90 backdrop-blur-xl"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="hidden shrink-0 items-center gap-2 rounded-full border border-white/18 bg-white/92 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:bg-white md:inline-flex"
              >
                <span aria-hidden className="h-2 w-2 rotate-45 bg-brand-green" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 text-center">
            <img
              src={BRAND_LOGO_ICON_URL}
              alt="Ícone do Núcleo Márcia Baldi"
              className="h-auto w-[min(34vw,12rem)] rounded-[2rem] object-contain drop-shadow-[0_22px_50px_rgba(0,0,0,0.42)]"
            />
            <div className="space-y-1">
              <p className="text-[clamp(1.25rem,3.2vw,2.6rem)] font-semibold tracking-[-0.03em] text-white/68">
                Núcleo de Estudos
              </p>
              <p className="text-[clamp(2.8rem,8vw,6.8rem)] font-black leading-[0.9] tracking-[-0.05em] text-[#7FD72D] drop-shadow-[0_18px_40px_rgba(0,0,0,0.38)]">
                Márcia Baldi
              </p>
            </div>
          </div>

          <motion.div
            animate={overlayFading ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={overlayFading ? {} : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 flex w-[min(90vw,20rem)] -translate-x-1/2 flex-col items-center gap-2 px-4 text-center"
          >
            <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50">
              role ou aguarde para começar
            </span>
            <motion.span
              animate={overlayFading ? {} : { y: [0, 7, 0] }}
              transition={
                overlayFading ? {} : { duration: 1.7, repeat: Infinity, ease: "easeInOut" }
              }
              className="text-lg text-white/40"
              aria-hidden
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          zIndex: 50,
          height: "6rem",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
