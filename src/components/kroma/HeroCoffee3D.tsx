import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- procedural textures ---------- */
function makeCremaTexture() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const cx = size / 2;
  // base radial gradient: dark espresso edge -> caramel -> pale centre
  const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  g.addColorStop(0, "#d9a066");
  g.addColorStop(0.35, "#c0803f");
  g.addColorStop(0.7, "#8a4f22");
  g.addColorStop(0.92, "#4a2410");
  g.addColorStop(1, "#2a140a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  // organic swirl strokes
  ctx.globalCompositeOperation = "soft-light";
  for (let i = 0; i < 260; i++) {
    const r = Math.random() * cx * 0.85;
    const a0 = Math.random() * Math.PI * 2;
    const len = 0.4 + Math.random() * 1.6;
    ctx.beginPath();
    for (let s = 0; s <= 24; s++) {
      const a = a0 + (s / 24) * len;
      const rr = r + Math.sin(a * 3 + i) * 6 + (s / 24) * 10;
      const x = cx + Math.cos(a) * rr;
      const y = cx + Math.sin(a) * rr;
      s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    const light = Math.random() > 0.5;
    ctx.strokeStyle = light ? `rgba(255,230,190,${0.15 + Math.random() * 0.25})` : `rgba(60,25,8,${0.15 + Math.random() * 0.25})`;
    ctx.lineWidth = 1 + Math.random() * 4;
    ctx.stroke();
  }
  // micro bubbles
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < 900; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * cx * 0.95;
    ctx.fillStyle = `rgba(255,240,215,${Math.random() * 0.18})`;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * r, cx + Math.sin(a) * r, Math.random() * 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeSteamTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,0.55)");
  g.addColorStop(0.4, "rgba(255,255,255,0.18)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/* ---------- steam ---------- */
const STEAM_COUNT = 26;
function Steam() {
  const tex = useMemo(() => makeSteamTexture(), []);
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  const seeds = useMemo(
    () => Array.from({ length: STEAM_COUNT }, (_, i) => ({ t: i / STEAM_COUNT, x: (Math.random() - 0.5) * 0.6, z: (Math.random() - 0.5) * 0.6, w: Math.random() * Math.PI * 2, s: 0.8 + Math.random() * 0.6 })),
    [],
  );
  useEffect(() => () => tex.dispose(), [tex]);
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    seeds.forEach((sd, i) => {
      sd.t += dt * 0.22 * sd.s;
      if (sd.t > 1) {
        sd.t = 0;
        sd.x = (Math.random() - 0.5) * 0.6;
        sd.z = (Math.random() - 0.5) * 0.6;
      }
      const sp = refs.current[i];
      if (!sp) return;
      const p = sd.t;
      sp.position.set(sd.x + Math.sin(time * 0.8 + sd.w + p * 4) * 0.25 * p, 1.3 + p * 2.2, sd.z + Math.cos(time * 0.6 + sd.w) * 0.15 * p);
      const sc = 0.35 + p * 1.1;
      sp.scale.set(sc, sc, sc);
      (sp.material as THREE.SpriteMaterial).opacity = Math.sin(p * Math.PI) * 0.22;
    });
  });
  return (
    <group>
      {seeds.map((_, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)}>
          <spriteMaterial map={tex} transparent depthWrite={false} opacity={0} color="#f5e6d3" />
        </sprite>
      ))}
    </group>
  );
}

/* ---------- cup ---------- */
function Cup() {
  const group = useRef<THREE.Group>(null);
  const crema = useMemo(() => makeCremaTexture(), []);
  useEffect(() => () => crema.dispose(), [crema]);

  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(0.58, 0));
    pts.push(new THREE.Vector2(0.66, 0.02));
    pts.push(new THREE.Vector2(0.7, 0.07));
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      pts.push(new THREE.Vector2(0.72 + Math.pow(t, 1.8) * 0.32, 0.1 + t * 1.24));
    }
    // rounded lip
    pts.push(new THREE.Vector2(1.045, 1.355));
    pts.push(new THREE.Vector2(1.03, 1.37));
    pts.push(new THREE.Vector2(1.0, 1.36));
    for (let i = 16; i >= 0; i--) {
      const t = i / 16;
      pts.push(new THREE.Vector2(0.66 + Math.pow(t, 1.8) * 0.33, 0.18 + t * 1.16));
    }
    pts.push(new THREE.Vector2(0, 0.18));
    return pts;
  }, []);

  const handleCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.95, 1.1, 0),
        new THREE.Vector3(1.38, 1.12, 0),
        new THREE.Vector3(1.5, 0.8, 0),
        new THREE.Vector3(1.32, 0.45, 0),
        new THREE.Vector3(0.82, 0.32, 0),
      ]),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-4 * dt);
    g.rotation.y += dt * 0.25;
    g.rotation.x += (state.pointer.y * 0.35 - g.rotation.x) * k;
    g.rotation.z += (-state.pointer.x * 0.25 - g.rotation.z) * k;
  });

  const ceramic = (
    <meshPhysicalMaterial color="#14100e" roughness={0.12} metalness={0} clearcoat={1} clearcoatRoughness={0.04} sheen={0.4} sheenColor="#5a3a22" reflectivity={0.6} side={THREE.DoubleSide} envMapIntensity={1.4} />
  );

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 128]} />
        {ceramic}
      </mesh>
      {/* gold rim highlight */}
      <mesh position={[0, 1.366, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.022, 0.014, 16, 128]} />
        <meshPhysicalMaterial color="#f2b350" metalness={1} roughness={0.18} clearcoat={1} envMapIntensity={2} />
      </mesh>
      {/* espresso body with depth */}
      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.965, 0.9, 0.12, 96, 1, true]} />
        <meshPhysicalMaterial color="#1a0b04" roughness={0.2} clearcoat={1} side={THREE.BackSide} />
      </mesh>
      {/* crema surface */}
      <mesh position={[0, 1.245, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[0.975, 96]} />
        <meshPhysicalMaterial map={crema} bumpMap={crema} bumpScale={0.6} roughness={0.42} clearcoat={0.6} clearcoatRoughness={0.3} sheen={0.6} sheenColor="#ffd7a0" />
      </mesh>
      {/* handle */}
      <mesh castShadow>
        <tubeGeometry args={[handleCurve, 64, 0.075, 20, false]} />
        {ceramic}
      </mesh>
      {/* saucer */}
      <mesh position={[0, -0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.65, 1.2, 0.09, 128]} />
        <meshPhysicalMaterial color="#1b1513" roughness={0.14} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1.3} />
      </mesh>
      <mesh position={[0, -0.003, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.64, 0.012, 12, 128]} />
        <meshStandardMaterial color="#f2b350" metalness={1} roughness={0.22} />
      </mesh>
      <Steam />
    </group>
  );
}

function Bean({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  return (
    <Float speed={speed * 1.6} rotationIntensity={2} floatIntensity={1.4}>
      <group position={position} scale={scale}>
        <mesh scale={[0.18, 0.12, 0.24]} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial color="#3b2416" roughness={0.35} clearcoat={0.5} clearcoatRoughness={0.4} />
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
      <ambientLight intensity={0.25} color="#ffe2c0" />
      <spotLight position={[4, 6, 3]} angle={0.45} penumbra={1} intensity={70} color="#ffcf8a" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.0005} />
      <pointLight position={[-4, 1.5, -2]} intensity={10} color="#d97706" />
      <pointLight position={[0, 3, -4]} intensity={14} color="#ffb870" />
      <Cup />
      <Bean position={[-2.1, 1.2, 0.2]} scale={1.2} />
      <Bean position={[2.2, 1.6, -0.6]} speed={0.8} />
      <Bean position={[-1.6, -0.4, 1]} scale={0.9} speed={1.2} />
      <Bean position={[1.9, -0.2, 0.9]} scale={1.1} speed={0.9} />
      <Bean position={[0.4, 2.3, -1]} scale={0.8} />
      <ContactShadows position={[0, -0.7, 0]} opacity={0.75} scale={9} blur={3} far={3.5} resolution={512} color="#000" />
      <Environment resolution={256}>
        <Lightformer intensity={3} color="#ffe2b8" position={[0, 5, -2]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={4} color="#fff3e0" position={[3, 2, 3]} rotation-y={-Math.PI / 4} scale={[1.2, 4, 1]} />
        <Lightformer intensity={1.4} color="#d97706" position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
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
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.8, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
    >
      <Scene />
    </Canvas>
  );
}
