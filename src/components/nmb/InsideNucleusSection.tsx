import { motion } from "framer-motion";
import { pillars } from "@/content/nmb";

export function InsideNucleusSection() {
  return (
    <section id="nucleo" className="relative bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-black/6 bg-[linear-gradient(180deg,oklch(0.985_0.008_95)_0%,oklch(0.97_0.02_95)_100%)] px-6 py-28 text-foreground shadow-card md:px-10 md:py-36">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.76_0.14_295/0.16),transparent_60%)]" />
          <div className="absolute left-[6%] top-[10%] h-44 w-44 rounded-full bg-brand-green/8 blur-3xl" />
          <div className="absolute right-[8%] bottom-[14%] h-52 w-52 rounded-full bg-brand-purple/8 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-green">O Núcleo por dentro</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                O Núcleo Márcia Baldi <span className="font-display text-brand-green">por dentro</span>
              </h2>
              <p className="mt-5 text-lg text-ink-muted">
                Uma estrutura pensada para acompanhar o aluno de forma próxima, estratégica e humana.
              </p>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }} transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-[oklch(0.26_0.05_295)] p-7 text-white shadow-[0_24px_44px_-30px_rgba(41,22,76,0.58)] transition-all hover:-translate-y-1 hover:bg-[oklch(0.28_0.055_295)]"
                >
                  <div className="relative mb-6 h-36 -mx-7 -mt-7 overflow-hidden bg-[oklch(0.22_0.04_295)]">
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.04_295/0.82)] via-[oklch(0.22_0.04_295/0.1)] to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/18 via-transparent to-brand-green/16" />
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-semibold text-brand-green">0{i + 1}</span>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/72">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

