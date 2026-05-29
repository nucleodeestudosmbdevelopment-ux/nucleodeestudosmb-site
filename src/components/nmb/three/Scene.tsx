import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
};

export function Scene({ children, className, camera }: Props) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: camera?.position ?? [0, 0, 6], fov: camera?.fov ?? 45 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#8350d3" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
