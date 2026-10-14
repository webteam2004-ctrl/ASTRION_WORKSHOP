import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================================
   PARTICLE FIELD — Ambient floating particles
   Reacts to scroll progress and mouse position
   ============================================================ */

export default function ParticleField({ count = 800, progress = 0, mouse = { x: 0, y: 0 } }) {
    const meshRef = useRef();

    const { positions, velocities, sizes, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const cyanColor = new THREE.Color('#00e5ff');
        const violetColor = new THREE.Color('#7c4dff');
        const whiteColor = new THREE.Color('#e0e8ff');

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Distribute in a sphere
            const radius = 8 + Math.random() * 25;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

            sizes[i] = Math.random() * 3 + 0.5;

            // Random color selection
            const colorChoice = Math.random();
            const color = colorChoice < 0.5 ? cyanColor : colorChoice < 0.8 ? violetColor : whiteColor;
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, velocities, sizes, colors };
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        const geo = meshRef.current.geometry;
        const pos = geo.attributes.position.array;

        // As progress increases, particles converge toward center
        const convergeFactor = progress * 0.02;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Base movement
            pos[i3] += velocities[i3] + Math.sin(t * 0.5 + i) * 0.003;
            pos[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.3 + i) * 0.003;
            pos[i3 + 2] += velocities[i3 + 2] + Math.sin(t * 0.4 + i * 0.5) * 0.003;

            // Pull toward center based on progress
            pos[i3] -= pos[i3] * convergeFactor;
            pos[i3 + 1] -= pos[i3 + 1] * convergeFactor;
            pos[i3 + 2] -= pos[i3 + 2] * convergeFactor;

            // Mouse influence
            pos[i3] += mouse.x * 0.001;
            pos[i3 + 1] += mouse.y * 0.001;
        }

        geo.attributes.position.needsUpdate = true;

        // Rotate entire field slowly
        meshRef.current.rotation.y = t * 0.02;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
