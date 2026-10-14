import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================================
   CONNECTION LINES — Animated lines connecting nodes
   Represents business connections and idea networks
   ============================================================ */

export default function ConnectionLines({ progress = 0, nodeCount = 12 }) {
    const groupRef = useRef();

    const nodes = useMemo(() => {
        const arr = [];
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            const radius = 3 + Math.random() * 4;
            arr.push({
                position: new THREE.Vector3(
                    Math.cos(angle) * radius,
                    (Math.random() - 0.5) * 4,
                    Math.sin(angle) * radius
                ),
                phase: Math.random() * Math.PI * 2,
                speed: 0.2 + Math.random() * 0.3,
            });
        }
        return arr;
    }, [nodeCount]);

    const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
        color: new THREE.Color('#00e5ff'),
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
    }), []);

    const nodeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00e5ff'),
        emissive: new THREE.Color('#00e5ff'),
        emissiveIntensity: 2,
        transparent: true,
    }), []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.05;

        // Update node opacity based on progress
        const visibleProgress = Math.max(0, (progress - 0.2) * 1.25);
        groupRef.current.children.forEach((child) => {
            if (child.material) {
                child.material.opacity = visibleProgress * (child.material === lineMaterial ? 0.15 : 0.8);
            }
        });
    });

    const lines = useMemo(() => {
        const lineGeometries = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position);
                if (dist < 6) {
                    const points = [nodes[i].position, nodes[j].position];
                    const geo = new THREE.BufferGeometry().setFromPoints(points);
                    lineGeometries.push(geo);
                }
            }
        }
        return lineGeometries;
    }, [nodes]);

    return (
        <group ref={groupRef}>
            {/* Connection lines */}
            {lines.map((geo, i) => (
                <line key={`line-${i}`} geometry={geo}>
                    <primitive object={lineMaterial.clone()} attach="material" />
                </line>
            ))}

            {/* Node spheres */}
            {nodes.map((node, i) => (
                <mesh key={`node-${i}`} position={node.position}>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <primitive object={nodeMaterial.clone()} attach="material" />
                </mesh>
            ))}
        </group>
    );
}
