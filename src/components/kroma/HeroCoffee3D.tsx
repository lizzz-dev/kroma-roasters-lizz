import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, ContactShadows } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Cup() {
  const group = useRef<THREE.Group>(null);
  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    // outer wall then inner wall (lathe profile)
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(0.62, 0));
    pts.push(new THREE.Vector2(0.7, 0.06));
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(new THREE.Vector2(0.72 + t * t * 0.34, 0.08 + t * 1.25));
    }
    pts.push(new THREE.Vector2(1.04, 1.36));
    for (let i = 12; i >= 0; i--) {
      const t = i / 12;
      pts.push(new THREE.Vector2(0.66 + t * t * 0.32, 0.16 + t * 1.18));
    }
    pts.push(new THREE.Vector2(0, 0.16));
    return pts;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-4 * dt);
    g.rotation.y += dt * 0.25;
    g.rotation.x += (state.pointer.y * 0.35 - g.rotation.x) * k;
    g.rotation.z += (-state.pointer.x * 0.25 - g.rotation.z) * k;
  });

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <mesh castShadow>
        <latheGeometry args={[profile, 96]} />
        <meshPhysicalMaterial color="#1a1614" roughness={0.35} clearcoat={1} clearcoatRoughness={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* gold rim */}
      <mesh position={[0, 1.36, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.02, 0.025, 16, 96]} />
        <meshStandardMaterial color="#f59e0b" metalness={1} roughness={0.25} />
      </mesh>
      {/* crema */}
      <mesh position={[0, 1.22, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.95, 64]} />
        <meshStandardMaterial color="#b9773a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.225, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.25, 0.55, 64]} />
        <meshStandardMaterial color="#e8c08a" roughness={0.7} transparent opacity={0.7} />
      </mesh>
      {/* handle */}
      <mesh position={[0.98, 0.72, 0]} rotation-z={-0.15}>
        <torusGeometry args={[0.32, 0.07, 16, 48, Math.PI * 1.3]} />
        <meshPhysicalMaterial color="#1a1614" roughness={0.35} clearcoat={1} />
      </mesh>
      {/* saucer */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.25, 0.1, 96]} />
        <meshPhysicalMaterial color="#231d1a" roughness={0.4} clearcoat={0.8} />
      </mesh>
    </group>
  );
}

function Bean({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  return (
    <Float speed={speed * 1.6} rotationIntensity={2} floatIntensity={1.4}>
      <group position={position} scale={scale}>
        <mesh scale={[0.18, 0.12, 0.24]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#3b2416" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.115, 0]} scale={[0.02, 0.01, 0.2]}>
          <boxGeometry />
          <meshStandardMaterial color="#120a06" />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight position={[4, 6, 3]} angle={0.4} penumbra={1} intensity={60} color="#ffcf8a" castShadow />
      <pointLight position={[-4, 1, -2]} intensity={8} color="#d97706" />
      <Cup />
      <Bean position={[-2.1, 1.2, 0.2]} scale={1.2} />
      <Bean position={[2.2, 1.6, -0.6]} speed={0.8} />
      <Bean position={[-1.6, -0.4, 1]} scale={0.9} speed={1.2} />
      <Bean position={[1.9, -0.2, 0.9]} scale={1.1} speed={0.9} />
      <Bean position={[0.4, 2.3, -1]} scale={0.8} />
      <ContactShadows position={[0, -0.72, 0]} opacity={0.6} scale={8} blur={2.6} far={3} color="#000" />
      <Environment resolution={256}>
        <Lightformer intensity={2.5} color="#ffd9a0" position={[0, 5, -2]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.2} color="#d97706" position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer intensity={0.8} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
      </Environment>
    </>
  );
}

export default function HeroCoffee3D({ embedUrl }: { embedUrl?: string | undefined }) {
  const [embedFailed, setEmbedFailed] = useState(false);
  if (embedUrl && !embedFailed) {
    return (
      <iframe
        src={embedUrl}
        title="KROMA 3D coffee"
        className="h-full w-full border-0"
        onError={() => setEmbedFailed(true)}
        allow="autoplay; fullscreen"
      />
    );
  }
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.6, 5.4], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  );
}
