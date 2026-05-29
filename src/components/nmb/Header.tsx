import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuOpen((open) => !open);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOpenHeaderMenu = () => {
      if (window.innerWidth < 768) {
        setMenuOpen(true);
      }
    };

    globalThis.addEventListener("nmb:open-header-menu", onOpenHeaderMenu);
    return () => globalThis.removeEventListener("nmb:open-header-menu", onOpenHeaderMenu);
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

        <div className="relative z-[60] ml-auto md:hidden">
          <button
            type="button"
            onClick={handleMenuToggle}
            style={{ touchAction: "manipulation" }}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl ${
              scrolled
                ? "border-black/8 bg-white/92 text-foreground shadow-card"
                : "border-white/35 bg-white/55 text-foreground"
            }`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {menuOpen &&
          createPortal(
            <>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-[55] md:hidden"
              />
              <div className="fixed right-4 top-[5.25rem] z-[60] w-[min(88vw,21rem)] md:hidden">
                <div className="flex flex-col items-end gap-2">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full border border-black/8 bg-white/90 px-4 py-2.5 text-[15px] font-medium text-foreground shadow-card backdrop-blur-xl"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 font-semibold text-background shadow-soft"
                  >
                    <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-brand-green" />
                    {" "}
                    Falar pelo WhatsApp
                  </a>
                </div>
              </div>
            </>,
            document.body
          )}

        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-soft transition-all duration-300 hover:-translate-y-0.5 md:inline-flex"
        >
          <span aria-hidden className="h-2 w-2 rotate-45 bg-brand-green" />
          {" "}
          WhatsApp
        </a>
      </div>
    </motion.header>
  );
}
