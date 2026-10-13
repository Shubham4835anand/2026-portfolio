"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Generate sharp + soft circular glow texture for stars
function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.2, "rgba(224, 242, 254, 0.95)");
  grad.addColorStop(0.5, "rgba(56, 189, 248, 0.4)");
  grad.addColorStop(0.8, "rgba(37, 99, 235, 0.1)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

// Moving 3D Deep Space Starfield with cursor parallax
function MovingStarfield() {
  const groupRef = useRef<THREE.Group>(null!);
  const starsRef = useRef<THREE.Points>(null!);
  const texture = useMemo(() => createStarTexture(), []);
  const { pointer } = useThree();

  const count = 2400;

  // Star data: positions, colors, speeds, sizes
  const { positions, colors, speeds, initialPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const initPos = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#ffffff"), // Pure white
      new THREE.Color("#e0f2fe"), // Crisp ice blue
      new THREE.Color("#38bdf8"), // Electric cyan
      new THREE.Color("#818cf8"), // Soft indigo
      new THREE.Color("#fef08a"), // Warm gold star
      new THREE.Color("#c084fc"), // Subtle violet
    ];

    for (let i = 0; i < count; i++) {
      // Disperse stars in a wide 3D frustum
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 45;
      const z = -60 + Math.random() * 70; // Depth from -60 to +10

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Varied speed for rich parallax depth
      spd[i] = 0.04 + Math.random() * 0.08;

      // Color distribution
      const color =
        Math.random() > 0.3
          ? palette[0] // mostly white/ice blue
          : palette[Math.floor(Math.random() * palette.length)];

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return {
      positions: pos,
      colors: col,
      speeds: spd,
      initialPositions: initPos,
    };
  }, []);

  // Smooth cursor tracking target
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Move stars continuously forward along Z axis
    if (starsRef.current) {
      const posAttr = starsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        // Forward movement
        array[idx + 2] += speeds[i] * (delta * 60);

        // When star passes the camera viewport (z > 12), reset it to far distance (z = -60)
        if (array[idx + 2] > 12) {
          array[idx + 2] = -60;
          array[idx] = (Math.random() - 0.5) * 60;
          array[idx + 1] = (Math.random() - 0.5) * 45;
        }

        // Subtle gentle cosmic shimmer
        array[idx] += Math.sin(t * 0.4 + i) * 0.002;
        array[idx + 1] += Math.cos(t * 0.3 + i) * 0.002;
      }
      posAttr.needsUpdate = true;
    }

    // 2. Cursor dynamic parallax & perspective tilt
    if (groupRef.current) {
      targetRot.current.x = pointer.y * 0.35;
      targetRot.current.y = -pointer.x * 0.45;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRot.current.x,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRot.current.y,
        0.05
      );

      // Slow organic cosmic drift
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.24}
          vertexColors
          map={texture}
          transparent
          opacity={0.88}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Shooting Stars / Meteors that streak across the sky
function ShootingStars() {
  const lineCount = 4;
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { data, linePositions } = useMemo(() => {
    const arr = new Float32Array(lineCount * 6);
    const d = Array.from({ length: lineCount }, () => ({
      active: false,
      x: 0,
      y: 0,
      z: -10,
      vx: 0,
      vy: 0,
      vz: 0,
      timer: Math.random() * 3,
    }));
    return { data: d, linePositions: arr };
  }, []);

  useFrame((_, delta) => {
    if (!linesRef.current) return;
    const posAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < lineCount; i++) {
      const star = data[i];
      star.timer -= delta;

      if (star.timer <= 0) {
        if (!star.active) {
          // Spawn shooting star
          star.active = true;
          star.x = (Math.random() - 0.5) * 35;
          star.y = 8 + Math.random() * 12;
          star.z = -15 + Math.random() * 10;
          star.vx = (Math.random() - 0.5) * 18 - 8;
          star.vy = -16 - Math.random() * 8;
          star.vz = 4 + Math.random() * 6;
          star.timer = 0.8 + Math.random() * 0.4;
        } else {
          // Deactivate and reset timer
          star.active = false;
          star.timer = 2 + Math.random() * 5;
        }
      }

      const idx = i * 6;
      if (star.active) {
        star.x += star.vx * delta;
        star.y += star.vy * delta;
        star.z += star.vz * delta;

        // Head of shooting star
        arr[idx] = star.x;
        arr[idx + 1] = star.y;
        arr[idx + 2] = star.z;

        // Tail of shooting star
        const tailLength = 1.4;
        arr[idx + 3] = star.x - star.vx * (tailLength * 0.05);
        arr[idx + 4] = star.y - star.vy * (tailLength * 0.05);
        arr[idx + 5] = star.z - star.vz * (tailLength * 0.05);
      } else {
        // Hide offscreen
        arr[idx] = arr[idx + 1] = arr[idx + 2] = arr[idx + 3] = arr[idx + 4] = arr[idx + 5] = -9999;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        linewidth={2}
      />
    </lineSegments>
  );
}

// Subtle Ambient Cosmic Nebula Glow that shifts with cursor
function CosmicNebula() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      pointer.x * 4,
      0.03
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      pointer.y * 3,
      0.03
    );
    meshRef.current.rotation.z = t * 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -35]}>
      <planeGeometry args={[60, 45]} />
      <meshBasicMaterial
        color="#0c1d3d"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="scene-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <CosmicNebula />
        <MovingStarfield />
        <ShootingStars />
      </Canvas>
    </div>
  );
}
