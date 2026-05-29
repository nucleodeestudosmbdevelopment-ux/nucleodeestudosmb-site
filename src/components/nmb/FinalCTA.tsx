import { motion } from "framer-motion";
import { Scene } from "./three/Scene";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { useReducedMotion3D } from "@/hooks/useReducedMotion3D";
import { useIsMobile } from "@/hooks/use-mobile";
import { contact } from "@/content/nmb";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box3, MathUtils, type Group, Vector3 } from "three";

const NOTEBOOK_MODEL_URL = "/models/notebook.glb";
const PENCIL_MODEL_URL = "/models/pencil.glb";
const BACKPACK_MODEL_URL = "/models/backpack.glb";

function FloatingSchoolModel({
  modelUrl,
  targetSize,
  baseRotation,
  basePosition,
  motionOffset,
  reduced,
}: {
  modelUrl: string;
  targetSize: number;
  baseRotation: [number, number, number];
  basePosition: [number, number, number];
  motionOffset: number;
  reduced: boolean;
}) {
  const { scene } = useGLTF(modelUrl);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const normalizedScale = useMemo(() => {
    const bounds = new Box3().setFromObject(clonedScene);
    const size = bounds.getSize(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    if (!maxDimension || Number.isNaN(maxDimension)) {
      return 1;
    }

    return targetSize / maxDimension;
  }, [clonedScene, targetSize]);
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const bob = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.72 + motionOffset) * 0.12;
    const sway = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.46 + motionOffset) * 0.14;

    group.position.x = MathUtils.damp(group.position.x, basePosition[0] + sway, 3.8, delta);
    group.position.y = MathUtils.damp(group.position.y, basePosition[1] + bob, 3.8, delta);
    group.position.z = MathUtils.damp(group.position.z, basePosition[2], 3.8, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, baseRotation[0] + sway * 0.08, 3.6, delta);
    group.rotation.y = MathUtils.damp(group.rotation.y, baseRotation[1] + sway * 0.16, 3.6, delta);
    group.rotation.z = MathUtils.damp(group.rotation.z, baseRotation[2] + bob * 0.08, 3.6, delta);
  });

  return (
    <group ref={groupRef} scale={normalizedScale} rotation={baseRotation} position={basePosition}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

function SchoolCluster({ reduced, isMobile }: { reduced: boolean; isMobile: boolean }) {
  return (
    <>
      <FloatingSchoolModel
        modelUrl={NOTEBOOK_MODEL_URL}
        reduced={reduced}
        targetSize={1.9}
        baseRotation={[0.18, -0.52, -0.26]}
        basePosition={[-3.55, -2.28, -1.6]}
        motionOffset={0}
      />
      <FloatingSchoolModel
        modelUrl={PENCIL_MODEL_URL}
        reduced={reduced}
        targetSize={2.65}
        baseRotation={[0.02, 1.18, 0.22]}
        basePosition={isMobile ? [0.2, 3.1, -1.95] : [0.2, 2.42, -1.95]}
        motionOffset={1.8}
      />
      <FloatingSchoolModel
        modelUrl={BACKPACK_MODEL_URL}
        reduced={reduced}
        targetSize={1.75}
        baseRotation={[0.06, -0.42, -0.04]}
        basePosition={[3.4, -2.16, -1.68]}
        motionOffset={3.2}
      />
    </>
  );
}

export function FinalCTA() {
  const reduced = useReducedMotion3D();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="contato" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        {mounted && (
          <Scene className="absolute inset-0" camera={{ position: [0, -0.02, 11.1], fov: 35 }}>
            <SchoolCluster reduced={reduced} isMobile={isMobile} />
          </Scene>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,var(--background)_82%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }} transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-medium leading-[1.05] text-balance">
          Vamos construir uma jornada de estudos mais{" "}
          <span className="font-display text-brand-green">clara</span>, leve e{" "}
          <span className="font-display text-brand-purple">eficiente</span>?
        </h2>
        <p className="mt-6 text-lg text-ink-muted text-pretty">
          Entre em contato para conhecer o Núcleo Márcia Baldi e entender como o acompanhamento pode
          ajudar no desenvolvimento do aluno.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={contact.whatsapp} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-medium hover:-translate-y-0.5 transition-transform shadow-3d"
          >
            Falar pelo WhatsApp →
          </a>
          <a
            href={contact.instagram} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-7 py-4 text-sm font-medium hover:bg-muted transition-colors"
          >
            Ver Instagram
          </a>
        </div>
      </motion.div>
    </section>
  );
}

