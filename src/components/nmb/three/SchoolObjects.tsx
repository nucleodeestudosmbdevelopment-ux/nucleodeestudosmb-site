import { Float, RoundedBox } from "@react-three/drei";
import type { ReactNode } from "react";

// Brand colors used in 3D materials
const GREEN = "#02b05a";
const GREEN_DEEP = "#017a3e";
const PURPLE = "#8350d3";
const PURPLE_DEEP = "#5a32a3";
const CREAM = "#fbf9f3";
const INK = "#1d2433";

type ObjProps = {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
};

function Wrap({
  children,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  speed = 1.2,
  rotIntensity = 0.6,
  floatIntensity = 0.8,
}: ObjProps & {
  children: ReactNode;
  speed?: number;
  rotIntensity?: number;
  floatIntensity?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={rotIntensity} floatIntensity={floatIntensity}>
      <group position={position} scale={scale} rotation={rotation}>
        {children}
      </group>
    </Float>
  );
}

export function Book(props: ObjProps) {
  return (
    <Wrap {...props}>
      {/* cover */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.22, 1]} />
        <meshStandardMaterial color={GREEN} roughness={0.45} metalness={0.05} />
      </mesh>
      {/* spine accent */}
      <mesh position={[-0.7, 0, 0]}>
        <boxGeometry args={[0.05, 0.24, 1.02]} />
        <meshStandardMaterial color={GREEN_DEEP} />
      </mesh>
      {/* pages */}
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[1.35, 0.16, 0.95]} />
        <meshStandardMaterial color={CREAM} />
      </mesh>
    </Wrap>
  );
}

export function OpenBook(props: ObjProps) {
  return (
    <Wrap {...props} speed={0.9} floatIntensity={0.55} rotIntensity={0.35}>
      <group>
        <RoundedBox args={[0.12, 0.12, 1.42]} radius={0.03} smoothness={4} position={[0, -0.04, 0]}>
          <meshStandardMaterial color={PURPLE_DEEP} roughness={0.56} metalness={0.08} />
        </RoundedBox>

        <group position={[-0.52, 0, 0]} rotation={[0, 0.05, -0.34]}>
          <RoundedBox args={[1.06, 0.055, 1.42]} radius={0.045} smoothness={5} castShadow receiveShadow>
            <meshStandardMaterial color={GREEN} roughness={0.42} metalness={0.08} />
          </RoundedBox>
          <RoundedBox args={[0.92, 0.03, 1.26]} radius={0.02} smoothness={4} position={[0.06, 0.04, 0]}>
            <meshStandardMaterial color={CREAM} roughness={0.94} metalness={0.01} />
          </RoundedBox>
          {Array.from({ length: 4 }).map((_, i) => (
            <RoundedBox
              key={`left-line-${i}`}
              args={[0.54, 0.004, 0.02]}
              radius={0.004}
              smoothness={3}
              position={[0.12, 0.059, -0.34 + i * 0.22]}
            >
              <meshStandardMaterial color="#d8d0c6" roughness={0.96} metalness={0.01} />
            </RoundedBox>
          ))}
        </group>

        <group position={[0.52, 0, 0]} rotation={[0, -0.05, 0.34]}>
          <RoundedBox args={[1.06, 0.055, 1.42]} radius={0.045} smoothness={5} castShadow receiveShadow>
            <meshStandardMaterial color={PURPLE} roughness={0.42} metalness={0.08} />
          </RoundedBox>
          <RoundedBox args={[0.92, 0.03, 1.26]} radius={0.02} smoothness={4} position={[-0.06, 0.04, 0]}>
            <meshStandardMaterial color={CREAM} roughness={0.94} metalness={0.01} />
          </RoundedBox>
          {Array.from({ length: 4 }).map((_, i) => (
            <RoundedBox
              key={`right-line-${i}`}
              args={[0.54, 0.004, 0.02]}
              radius={0.004}
              smoothness={3}
              position={[-0.12, 0.059, -0.34 + i * 0.22]}
            >
              <meshStandardMaterial color="#d8d0c6" roughness={0.96} metalness={0.01} />
            </RoundedBox>
          ))}
        </group>

        <RoundedBox args={[0.03, 0.06, 1.2]} radius={0.01} smoothness={3} position={[0, 0.025, 0]}>
          <meshStandardMaterial color="#ede4d8" roughness={0.96} metalness={0.01} />
        </RoundedBox>

        <RoundedBox args={[0.055, 0.008, 0.42]} radius={0.008} smoothness={3} position={[0.09, -0.012, 0.43]} rotation={[0, 0, 0.04]}>
          <meshStandardMaterial color={GREEN_DEEP} roughness={0.5} metalness={0.03} />
        </RoundedBox>
      </group>
    </Wrap>
  );
}

export function Notebook(props: ObjProps) {
  return (
    <Wrap {...props}>
      <mesh>
        <boxGeometry args={[1.1, 0.16, 1.5]} />
        <meshStandardMaterial color={PURPLE} roughness={0.5} />
      </mesh>
      {/* spiral */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.55, 0.1, -0.65 + i * 0.18]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.018, 8, 16]} />
          <meshStandardMaterial color="#d9d9d9" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* label */}
      <mesh position={[0.15, 0.085, 0]}>
        <boxGeometry args={[0.5, 0.005, 0.3]} />
        <meshStandardMaterial color={CREAM} />
      </mesh>
    </Wrap>
  );
}

export function Pencil(props: ObjProps) {
  return (
    <Wrap {...props} rotIntensity={1.4}>
      {/* body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 1.4, 16]} />
        <meshStandardMaterial color={GREEN} />
      </mesh>
      {/* tip cone */}
      <mesh position={[0.78, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.08, 0.18, 16]} />
        <meshStandardMaterial color={CREAM} />
      </mesh>
      <mesh position={[0.88, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.025, 0.06, 16]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      {/* eraser */}
      <mesh position={[-0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.085, 0.085, 0.16, 16]} />
        <meshStandardMaterial color={PURPLE} />
      </mesh>
    </Wrap>
  );
}

export function Microphone(props: ObjProps) {
  return (
    <Wrap {...props}>
      {/* head */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color={INK} roughness={0.4} metalness={0.5} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.4, 16]} />
        <meshStandardMaterial color={PURPLE_DEEP} />
      </mesh>
      {/* base */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
        <meshStandardMaterial color={PURPLE} />
      </mesh>
    </Wrap>
  );
}

export function PaperPlane(props: ObjProps) {
  return (
    <Wrap {...props} floatIntensity={1.4} rotIntensity={1}>
      <mesh rotation={[0, 0, 0]}>
        <coneGeometry args={[0.45, 1, 4]} />
        <meshStandardMaterial color={CREAM} side={2} />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.9, 0.5]} />
        <meshStandardMaterial color={PURPLE_DEEP} />
      </mesh>
    </Wrap>
  );
}

export function EssaySheet(props: ObjProps) {
  return (
    <Wrap {...props} floatIntensity={1.1}>
      <mesh>
        <boxGeometry args={[1, 0.02, 1.35]} />
        <meshStandardMaterial color={CREAM} />
      </mesh>
      {/* lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0.012, -0.5 + i * 0.18]}>
          <boxGeometry args={[0.8, 0.002, 0.015]} />
          <meshStandardMaterial color={GREEN_DEEP} />
        </mesh>
      ))}
    </Wrap>
  );
}

export function Blob({ color = GREEN, ...props }: ObjProps & { color?: string }) {
  return (
    <Wrap {...props} speed={0.6} floatIntensity={1.1} rotIntensity={0.9}>
      <mesh>
        <dodecahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.3} />
      </mesh>
    </Wrap>
  );
}

export function PrismShard({ color = PURPLE, ...props }: ObjProps & { color?: string }) {
  return (
    <Wrap {...props} speed={0.8} floatIntensity={0.9} rotIntensity={1.1}>
      <mesh>
        <cylinderGeometry args={[0.24, 0.44, 1.2, 6]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.45} />
      </mesh>
    </Wrap>
  );
}

export function Monolith({ color = INK, ...props }: ObjProps & { color?: string }) {
  return (
    <Wrap {...props} speed={0.5} floatIntensity={0.45} rotIntensity={0.25}>
      <mesh>
        <boxGeometry args={[0.38, 1.35, 0.38]} />
        <meshStandardMaterial color={color} roughness={0.22} metalness={0.58} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={CREAM} roughness={0.45} metalness={0.12} />
      </mesh>
    </Wrap>
  );
}

export function Star(props: ObjProps) {
  return (
    <Wrap {...props}>
      <mesh>
        <tetrahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial color={PURPLE} roughness={0.3} />
      </mesh>
    </Wrap>
  );
}

export function SpeechBubble(props: ObjProps & { color?: string }) {
  const color = props.color ?? GREEN;
  return (
    <Wrap {...props}>
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[-0.2, -0.35, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.12, 0.25, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Wrap>
  );
}

export const Brand = { GREEN, GREEN_DEEP, PURPLE, PURPLE_DEEP, CREAM, INK };
