import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import InnovationCore from './IdeaCore';
import ParticleField from './ParticleField';
import GridPlane from './GridPlane';
import ConnectionLines from './ConnectionLines';

/* ============================================================
   CAMERA RIG — Manages smooth camera choreography based on scroll & active focus
   Supports Day 1 & Day 2 spatial focal shifts
   ============================================================ */

function CameraRig({ progress, mouse, targetFocus, reducedMotion }) {
    const { camera } = useThree();

    useFrame(() => {
        if (reducedMotion) {
            camera.position.set(0, 1.5, 9);
            camera.lookAt(0, 0, 0);
            return;
        }

        // Camera position interpolates with scroll progress
        let targetX = mouse.x * 1.2;
        let targetY = 1.8 - progress * 1.5;
        let targetZ = 11.5 - progress * 5.5;

        // Thematic camera focal adjustments for Day 1 & Day 2 sessions
        if (targetFocus === 'solar-ev') {
            targetX += 1.2;
            targetY = 0.5;
            targetZ = 7.5;
        } else if (targetFocus === 'ceremony') {
            targetY = 2.0;
            targetZ = 8.0;
        } else if (targetFocus === 'entrepreneurship') {
            targetX -= 1.0;
            targetY = -0.5;
            targetZ = 7.0;
        } else if (targetFocus === 'funding-approval' || targetFocus === 'funding') {
            targetX += 0.8;
            targetY = 0.8;
            targetZ = 6.8;
        } else if (targetFocus === 'business-growth' || targetFocus === 'growth') {
            targetX -= 1.2;
            targetY = 0.6;
            targetZ = 7.2;
        } else if (targetFocus === 'product-creation' || targetFocus === 'product') {
            targetX += 0.9;
            targetY = -0.6;
            targetZ = 6.9;
        } else if (targetFocus === 'business-exposure') {
            targetX -= 0.7;
            targetY = 1.2;
            targetZ = 7.8;
        }

        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (targetY - camera.position.y) * 0.04;
        camera.position.z += (targetZ - camera.position.z) * 0.04;

        camera.lookAt(0, 0, 0);
    });

    return null;
}

/* ============================================================
   VOLUMETRIC ATMOSPHERE FOG
   ============================================================ */

function SceneFog() {
    const { scene } = useThree();
    useEffect(() => {
        scene.fog = new THREE.FogExp2('#020409', 0.022);
    }, [scene]);
    return null;
}

/* ============================================================
   SCENE 3D — Main WebGL Canvas with WebGL fallback
   ============================================================ */

export default function Scene3D({ progress = 0, targetFocus = null }) {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [reducedMotion, setReducedMotion] = useState(false);
    const [webglSupported, setWebglSupported] = useState(true);

    useEffect(() => {
        // Detect reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);
        const listener = (e) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', listener);

        // Detect WebGL capability
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) setWebglSupported(false);
        } catch (e) {
            setWebglSupported(false);
        }

        const handleMouseMove = (e) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: -(e.clientY / window.innerHeight - 0.5) * 2,
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            mediaQuery.removeEventListener('change', listener);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // WebGL Fallback container
    if (!webglSupported) {
        return (
            <div className="canvas-container canvas-fallback" aria-hidden="true">
                <div className="fallback-glow" />
            </div>
        );
    }

    return (
        <div className="canvas-container canvas-container--interactive" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 2, 11.5], fov: 58, near: 0.1, far: 80 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.5]}
            >
                <Suspense fallback={null}>
                    <SceneFog />
                    <CameraRig
                        progress={progress}
                        mouse={mouse}
                        targetFocus={targetFocus}
                        reducedMotion={reducedMotion}
                    />

                    {/* Volumetric Studio Lights */}
                    <ambientLight intensity={0.2} color="#4a6fa5" />
                    <directionalLight
                        position={[8, 12, 6]}
                        intensity={0.4}
                        color="#00e5ff"
                    />
                    <directionalLight
                        position={[-7, -4, -4]}
                        intensity={0.25}
                        color="#7c4dff"
                    />

                    {/* Central Evolving Innovation Core */}
                    <InnovationCore
                        progress={progress}
                        mouse={mouse}
                        activeTheme={targetFocus}
                    />

                    {/* Ambient Particle Field (responsive count) */}
                    <ParticleField
                        count={typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 550}
                        progress={progress}
                        mouse={mouse}
                    />

                    {/* Horizon Grid Plane */}
                    <GridPlane progress={progress} />

                    {/* Dynamic Connection Network */}
                    <ConnectionLines progress={progress} nodeCount={14} />
                </Suspense>
            </Canvas>
        </div>
    );
}
