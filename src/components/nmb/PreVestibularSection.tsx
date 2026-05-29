import { motion } from "framer-motion";
import { preVestibularFeatures } from "@/content/nmb";
import { contact } from "@/content/nmb";

export function PreVestibularSection() {
  return (
    <section id="prevestibular" className="relative bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-foreground px-6 py-24 text-background shadow-[0_36px_90px_-48px_rgba(17,24,39,0.42)] md:px-16 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.68_0.16_152/0.22),transparent_48%),radial-gradient(ellipse_at_bottom_right,oklch(0.58_0.2_295/0.2),transparent_48%)]" />
          <div className="absolute left-[4%] top-[12%] h-48 w-48 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="absolute right-[6%] bottom-[10%] h-56 w-56 rounded-full bg-brand-purple/12 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                Pré-vestibular · Medicina
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl font-medium leading-[1.05] text-balance text-background">
                Referência em aprovações{" "}
                <span className="font-display text-brand-green">para Medicina</span> e{" "}
                vestibulares concorridos.
              </h2>
              <p className="mt-5 text-lg text-background/70 text-pretty">
                Acompanhamento próximo, metodologia estruturada e foco total no que os vestibulares
                mais exigentes cobram — redação, interpretação e raciocínio.
              </p>
            </motion.div>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {preVestibularFeatures.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 transition-colors"
                >
                  <span className="text-2xl text-brand-green">{f.icon}</span>
                  <h3 className="mt-4 font-semibold text-background leading-tight">{f.label}</h3>
                  <p className="mt-2 text-sm text-background/60 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-foreground hover:-translate-y-0.5 transition-transform shadow-[0_12px_28px_-16px_oklch(0.74_0.18_152/0.6)]"
              >
                Quero me preparar para Medicina
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
