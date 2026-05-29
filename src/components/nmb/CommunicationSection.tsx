import { motion } from "framer-motion";
import { floatingWords } from "@/content/nmb";
import { Scene } from "./three/Scene";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { useReducedMotion3D } from "@/hooks/useReducedMotion3D";
import { useEffect, useMemo, useRef, useState } from "react";
import { MathUtils, type Group } from "three";

const POLY_BOOK_MODEL_URL = "/models/open-book.glb";

const wordPositions = [
  { left: "14%", top: "18%", align: "left" },
  { left: "64%", top: "17%", align: "right" },
  { left: "7%", top: "45%", align: "left" },
  { left: "72%", top: "45%", align: "right" },
  { left: "17%", top: "73%", align: "left" },
  { left: "61%", top: "74%", align: "right" },
] as const;

function PolyPizzaOpenBook({ reduced }: { reduced: boolean }) {
  const { scene } = useGLTF(POLY_BOOK_MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetRotationX = reduced ? -0.18 : -0.18 - state.pointer.y * 0.22;
    const targetRotationY = reduced ? -0.62 : -0.62 + state.pointer.x * 0.55;
    const targetRotationZ = reduced ? 0 : state.pointer.x * -0.08;
    const targetPositionX = reduced ? 0 : state.pointer.x * 0.16;
    const targetPositionY = reduced ? -0.68 : -0.68 + state.pointer.y * 0.12;

    group.rotation.x = MathUtils.damp(group.rotation.x, targetRotationX, 4.6, delta);
    group.rotation.y = MathUtils.damp(group.rotation.y, targetRotationY, 4.6, delta);
    group.rotation.z = MathUtils.damp(group.rotation.z, targetRotationZ, 4.6, delta);
    group.position.x = MathUtils.damp(group.position.x, targetPositionX, 4.2, delta);
    group.position.y = MathUtils.damp(group.position.y, targetPositionY, 4.2, delta);
  });

  return (
    <Center>
      <group ref={groupRef} scale={2.1} rotation={[-0.18, -0.62, 0]} position={[0, -0.68, 0]}>
        <primitive object={clonedScene} />
      </group>
    </Center>
  );
}

export function CommunicationSection() {
  const reduced = useReducedMotion3D();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="comunicacao" className="relative bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-foreground px-6 py-28 text-background shadow-[0_36px_90px_-48px_rgba(17,24,39,0.42)] md:px-10 md:py-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,oklch(0.68_0.16_152/0.16)_0%,transparent_36%),radial-gradient(circle_at_82%_30%,oklch(0.58_0.2_295/0.18)_0%,transparent_42%)]" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div className="order-2 relative h-[440px] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] md:order-1">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_58%)]" />
              <div className="pointer-events-none absolute inset-x-14 bottom-10 h-8 rounded-full bg-black/22 blur-2xl" />
              {!mounted ? (
                <div className="absolute inset-0 grid place-items-center text-7xl text-white/35">✦</div>
              ) : (
                <Scene className="absolute inset-0" camera={{ position: [0, -0.18, 6.3], fov: 34 }}>
                  <PolyPizzaOpenBook reduced={reduced} />
                </Scene>
              )}
              <div className="absolute inset-0 pointer-events-none hidden sm:block">
                {floatingWords.map((w, i) => {
                  const position = wordPositions[i];

                  return (
                    <motion.span
                      key={w}
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      animate={{ y: [0, i % 2 === 0 ? -6 : -3, 0] }}
                      style={{
                        position: "absolute",
                        left: position?.left ?? "50%",
                        top: position?.top ?? "50%",
                        transform: position?.align === "right" ? "translateX(-100%)" : undefined,
                      }}
                      className={`max-w-[42vw] rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] text-white/96 backdrop-blur-sm sm:max-w-none sm:border-white/10 sm:bg-white/[0.05] sm:px-3 sm:py-1.5 sm:text-sm sm:font-medium sm:tracking-[0.08em] sm:text-white/78 md:text-base ${position?.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {w}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }} transition={{ duration: 0.7 }}
              className="order-1 md:order-2"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-brand-green">Comunicação · Escrita · Expressão</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                <span className="font-display text-brand-green">Clareza</span> para pensar, escrever e{" "}
                <span className="font-display text-brand-purple">se comunicar</span>.
              </h2>
              <p className="mt-6 text-lg text-background/70 text-pretty">
                O desenvolvimento do aluno passa também pela forma como ele organiza ideias, se expressa,
                escreve e apresenta seus argumentos. Por isso, comunicação, redação e oratória fazem parte
                da formação proposta pelo núcleo.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

