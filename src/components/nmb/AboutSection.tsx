import { motion } from "framer-motion";
import { aboutCards } from "@/content/nmb";

const icons: Record<string, string> = {
  "Aprendizagem com propósito": "✦",
  "Acompanhamento próximo": "◐",
  "Desenvolvimento de autonomia": "✷",
  "Comunicação clara": "❝",
  "Evolução acadêmica": "↗",
};

export function AboutSection() {
  return (
    <section id="sobre" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} transition={{ duration: 0.7 }}
            className="md:col-span-7"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-brand-green">Sobre o núcleo</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              Um espaço de <span className="font-display text-brand-purple">desenvolvimento</span> para
              além do conteúdo.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5 space-y-5 text-ink-muted text-lg"
          >
            <p>
              O Núcleo Márcia Baldi acompanha alunos em sua jornada de aprendizagem, ajudando no
              desenvolvimento da rotina, da autonomia, da comunicação, da escrita e da confiança nos
              estudos.
            </p>
            <p>
              O foco não está apenas em ensinar matérias, mas em formar estudantes mais seguros,
              organizados e preparados para seus objetivos acadêmicos.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {aboutCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl border border-border bg-surface-elevated p-6 shadow-card hover:-translate-y-1 hover:shadow-3d transition-all"
            >
              <div className="text-2xl text-brand-green group-hover:text-brand-purple transition-colors">
                {icons[c.title] ?? "✦"}
              </div>
              <h3 className="mt-5 font-semibold text-foreground leading-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

