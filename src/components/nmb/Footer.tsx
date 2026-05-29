import { contact } from "@/content/nmb";
import { BRAND_LOGO_WORDMARK_URL } from "@/lib/brand";

export function Footer() {
  const hasAddress = contact.address.trim() && contact.address !== "Endereço a definir";

  return (
    <footer className="relative border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div>
              <img
                src={BRAND_LOGO_WORDMARK_URL}
                alt="Logo do Núcleo Márcia Baldi"
                className="h-auto w-[min(100%,14rem)] object-contain"
              />
            </div>
            <p className="mt-5 text-background/70 text-sm max-w-sm">
              Oratória, grupos de estudo, redação e preparação acadêmica.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={contact.instagram} target="_blank" rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-xs hover:bg-white/10 transition-colors">
                Instagram {contact.instagramHandle}
              </a>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-background/50 text-xs uppercase tracking-[0.18em]">WhatsApp</p>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="mt-1 block hover:text-brand-green transition-colors">
                {contact.phone}
              </a>
              <p className="mt-4 text-background/50 text-xs uppercase tracking-[0.18em]">E-mail</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 block break-words hover:text-brand-green transition-colors"
              >
                {contact.email}
              </a>
            </div>
            <div>
              {hasAddress && (
                <>
                  <p className="text-background/50 text-xs uppercase tracking-[0.18em]">Endereço</p>
                  <p className="mt-1">{contact.address}</p>
                </>
              )}
              <p className="mt-4 text-background/50 text-xs uppercase tracking-[0.18em]">Atendimento</p>
              <p className="mt-1">{contact.hours}</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-3xl leading-tight text-background/90">
              Educação, comunicação e autonomia.
            </p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Núcleo Márcia Baldi. Todos os direitos reservados.</p>
          <p>desenvolvido por Marte</p>
        </div>
      </div>
    </footer>
  );
}
