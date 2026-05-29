import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { environmentGallery, preVestibularHighlight } from "@/content/nmb";

export function LearningEnvironmentSection() {
  return (
    <section id="ambiente" className="relative py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-green">Ambiente</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
            Um ambiente pensado para <span className="font-display text-brand-purple">foco</span>,
            evolução e <span className="font-display text-brand-green">confiança</span>.
          </h2>
          <p className="mt-6 text-lg text-ink-muted text-pretty">
            O Núcleo Márcia Baldi valoriza um processo de aprendizagem mais leve, organizado e
            eficiente, criando um espaço em que o aluno se sente acompanhado e estimulado a evoluir.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["foco", "rotina", "clareza", "constância", "acolhimento"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-sm text-ink-muted">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-purple/30 bg-gradient-to-r from-brand-purple-soft/45 to-brand-green-soft/45 p-5 shadow-card">
            <span className="inline-flex items-center rounded-full border border-brand-purple/30 bg-background/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-purple-deep">
              {preVestibularHighlight.badge}
            </span>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{preVestibularHighlight.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{preVestibularHighlight.desc}</p>
          </div>
        </motion.div>

        <div className="relative rounded-[2rem] border border-border bg-gradient-to-br from-brand-green-soft/60 via-background to-brand-purple-soft/60 p-5 shadow-3d">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {environmentGallery.map((item) => (
                <CarouselItem key={item.src}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-background/80">
                    <img
                      src={item.src}
                      alt={item.alt}
                                  loading="auto"
                      className="h-[420px] w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 top-1/2 h-10 w-10 -translate-y-1/2 border-border bg-background/90" />
            <CarouselNext className="right-3 top-1/2 h-10 w-10 -translate-y-1/2 border-border bg-background/90" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

