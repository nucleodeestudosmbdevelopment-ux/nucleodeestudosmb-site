import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/content/nmb";
import { BRAND_LOGO_ICON_URL } from "@/lib/brand";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#nucleo", label: "O Núcleo" },
  { href: "#jornada", label: "Jornada" },
  { href: "#professores", label: "Professores" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-[60] px-4 pt-4"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <a
          href="#top"
          className={`flex shrink-0 items-center gap-3 rounded-full border px-3.5 py-2.5 backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "border-black/6 bg-white/90 shadow-card"
              : "border-white/40 bg-white/55"
          }`}
        >
          <img
            src={BRAND_LOGO_ICON_URL}
            alt="Logo do Núcleo Márcia Baldi"
            className="h-10 w-10 shrink-0 rounded-[0.9rem] object-contain shadow-[0_10px_20px_-12px_rgba(0,0,0,0.45)]"
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.24em] text-ink-muted/70">Núcleo</span>
            <span className="text-sm font-semibold text-foreground">Márcia Baldi</span>
          </span>
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <div
            className={`relative flex items-center rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-500 ${
              scrolled
                ? "border-black/6 bg-white/88 shadow-card"
                : "border-white/35 bg-white/45"
            }`}
          >
            <nav className="relative z-10 flex items-center gap-1 text-sm text-foreground/70">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-4 py-2 font-medium transition-all duration-200 hover:bg-black/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-soft transition-all duration-300 hover:-translate-y-0.5"
        >
          <span aria-hidden className="h-2 w-2 rotate-45 bg-brand-green" />
          WhatsApp
        </a>
      </div>
    </motion.header>
  );
}
