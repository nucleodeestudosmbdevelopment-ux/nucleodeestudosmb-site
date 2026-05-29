import { motion } from "framer-motion";
import { testimonials } from "@/content/nmb";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-purple">Resultados</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
            Evolução percebida na rotina, na{" "}
            <span className="font-display text-brand-green">confiança</span> e nos estudos.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-3xl border border-border bg-surface-elevated p-7 shadow-card hover:shadow-3d hover:-translate-y-1 transition-all"
            >
              <span aria-hidden className="font-display text-7xl text-brand-green/30 leading-none absolute top-3 left-5">“</span>
              <blockquote className="relative text-lg text-foreground text-pretty">
                {t.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-gradient-brand" />
                <span className="text-sm text-ink-muted">{t.author}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

