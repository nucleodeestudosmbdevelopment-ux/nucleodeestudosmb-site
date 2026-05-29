import { motion } from "framer-motion";
import { marciaCredentials, marciaHighlights, marciaProfile } from "@/content/nmb";

export function MarciaSection() {
  return (
    <section id="marcia" className="relative bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-black/6 bg-[linear-gradient(135deg,oklch(0.985_0.008_95)_0%,oklch(0.955_0.04_295/0.28)_50%,oklch(0.95_0.05_152/0.22)_100%)] px-6 py-20 shadow-card md:px-10 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,oklch(0.7_0.18_152/0.16)_0%,transparent_34%),radial-gradient(circle_at_86%_18%,oklch(0.58_0.2_295/0.14)_0%,transparent_36%)]" />
          <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="relative">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/88 p-3 shadow-3d backdrop-blur">
                  <div className="overflow-hidden rounded-[1.7rem]">
                    <img
                      src={marciaProfile.image}
                      alt={marciaProfile.imageAlt}
                      className="h-[460px] w-full object-cover object-center sm:h-[540px]"
                      loading="auto"
                    />
                  </div>
                  <div className="mt-4 rounded-[1.5rem] border border-black/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(242,247,242,0.98)_100%)] px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-green">
                      Fundadora
                    </p>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-2xl font-semibold text-foreground">Márcia Baldi</p>
                      <span className="inline-flex w-fit rounded-full border border-brand-purple/20 bg-brand-purple-soft/55 px-3 py-1 text-xs font-medium text-brand-purple-deep">
                        Núcleo Márcia Baldi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-brand-purple">
                  {marciaProfile.badge}
                </span>
                <h2 className="mt-4 text-4xl font-medium leading-[1.05] text-balance md:text-5xl">
                  {marciaProfile.title}
                </h2>
                <div className="mt-6 space-y-4 text-lg text-ink-muted">
                  {marciaProfile.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {marciaCredentials.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-card backdrop-blur"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-green">
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-tight text-foreground">
                      {item.value}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {marciaHighlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.14 + index * 0.08 }}
                    className="rounded-[1.75rem] border border-brand-purple/18 bg-foreground/80 p-5 text-background shadow-[0_22px_44px_-30px_rgba(17,24,39,0.32)]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-green">
                      Destaque
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-background/70">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
