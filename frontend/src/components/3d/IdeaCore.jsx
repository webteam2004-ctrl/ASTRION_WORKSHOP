import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================================
   INNOVATION CORE — Background Atmospheric 3D Object
   Subdued scale and emissive intensity so it creates depth
   without obstructing foreground text and cards.
   ============================================================ */

export default function InnovationCore({ progress = 0, mouse = { x: 0, y: 0 }, activeTheme = null }) {
    const groupRef = useRef();
    const coreRef = useRef();
    const ringRef1 = useRef();
    const ringRef2 = useRef();
    const ringRef3 = useRef();
    const solarPanelsRef = useRef();
    const evRingRef = useRef();
    const fundingGatewayRef = useRef();
    const growthLatticeRef = useRef();
    const productNodesRef = useRef();
    const ecosystemRef = useRef();

    // Central Core Material - Softened, non-glaring cyan
    const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00e5ff'),
        emissive: new THREE.Color('#0099b8'),
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: 0.85,
    }), []);

    // Outer crystalline wireframe shell
    const outerShellMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#7c4dff'),
        emissive: new THREE.Color('#582eb8'),
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.9,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
    }), []);

    // Holographic energy rings - restrained opacity
    const ringMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00e5ff'),
        emissive: new THREE.Color('#00a3cc'),
        emissiveIntensity: 0.6,
        roughness: 0.4,
        metalness: 0.8,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
    }), []);

    // Solar lattice material
    const solarMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00e5ff'),
        emissive: new THREE.Color('#0088aa'),
        emissiveIntensity: 0.6,
        roughness: 0.4,
        metalness: 0.7,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
    }), []);

    // EV energy stream ring
    const evMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00e676'),
        emissive: new THREE.Color('#00a854'),
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: 0.4,
    }), []);

    // Funding Gateway material
    const fundingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00e676'),
        emissive: new THREE.Color('#00994d'),
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
    }), []);

    // Growth Lattice material
    const growthMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffb300'),
        emissive: new THREE.Color('#cc8800'),
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.45,
    }), []);

    // Product creation material
    const productMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#8e62ff'),
        emissive: new THREE.Color('#643bc8'),
        emissiveIntensity: 0.7,
        roughness: 0.4,
        metalness: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
    }), []);

    // Ecosystem nodes positions (8 nodes)
    const ecosystemNodes = useMemo(() => {
        const nodes = [];
        const count = 8;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 2.6; // Smaller radius to avoid edge crowding
            nodes.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle * 2) * 0.5,
                z: Math.sin(angle) * radius,
                scale: 0.12 + (i % 3) * 0.03,
            });
        }
        return nodes;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.09 + mouse.x * 0.2;
            groupRef.current.rotation.x = Math.sin(t * 0.06) * 0.08 + mouse.y * 0.15;
        }

        // Controlled Core scale: kept between 0.45 and 0.95
        const coreScale = 0.45 + progress * 0.5;
        if (coreRef.current) {
            coreRef.current.scale.setScalar(coreScale);
            const pulse = Math.sin(t * 1.8) * 0.15;
            coreRef.current.material.emissiveIntensity = 0.75 + pulse;
        }

        // Rings rotation & restrained opacity
        if (ringRef1.current) {
            ringRef1.current.rotation.x = t * 0.25;
            ringRef1.current.rotation.z = t * 0.1;
            ringRef1.current.scale.setScalar(0.7 + progress * 0.8);
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.y = t * 0.2;
            ringRef2.current.rotation.x = Math.PI / 3;
            ringRef2.current.scale.setScalar(0.85 + progress * 0.9);
        }
        if (ringRef3.current) {
            ringRef3.current.rotation.z = -t * 0.16;
            ringRef3.current.rotation.y = Math.PI / 4;
            ringRef3.current.scale.setScalar(1.0 + progress * 1.0);
        }

        // Thematic elements
        if (solarPanelsRef.current) {
            solarPanelsRef.current.rotation.y = -t * 0.15;
            solarPanelsRef.current.visible = activeTheme === 'solar-ev' || (progress > 0.15 && progress < 0.45);
        }

        if (evRingRef.current) {
            evRingRef.current.rotation.z = t * 0.5;
            evRingRef.current.visible = activeTheme === 'solar-ev' || (progress > 0.2 && progress < 0.45);
        }

        if (fundingGatewayRef.current) {
            fundingGatewayRef.current.rotation.y = t * 0.25;
            fundingGatewayRef.current.visible = activeTheme === 'funding' || activeTheme === 'funding-approval' || (progress > 0.4 && progress < 0.65);
        }

        if (growthLatticeRef.current) {
            growthLatticeRef.current.rotation.y = -t * 0.18;
            growthLatticeRef.current.visible = activeTheme === 'growth' || activeTheme === 'business-growth' || (progress > 0.5 && progress < 0.75);
        }

        if (productNodesRef.current) {
            productNodesRef.current.rotation.x = t * 0.2;
            productNodesRef.current.visible = activeTheme === 'product' || activeTheme === 'product-creation' || (progress > 0.65 && progress < 0.85);
        }

        if (ecosystemRef.current) {
            const ecoProgress = Math.max(0, (progress - 0.4) * 1.4);
            ecosystemRef.current.rotation.y = t * 0.05;
            ecosystemRef.current.scale.setScalar(Math.min(1.1, 0.4 + ecoProgress * 0.6));
            ecosystemRef.current.visible = progress > 0.35;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.2, -1]}>
            {/* Central Innovation Core (slightly down & back to stay clear of headers) */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[0.85, 2]} />
                <primitive object={coreMaterial} attach="material" />
            </mesh>

            {/* Geometric Outer Crystalline Cage */}
            <mesh>
                <dodecahedronGeometry args={[1.2, 0]} />
                <primitive object={outerShellMat} attach="material" />
            </mesh>

            {/* Orbiting Tech Rings */}
            <mesh ref={ringRef1}>
                <torusGeometry args={[1.5, 0.015, 16, 70]} />
                <primitive object={ringMaterial} attach="material" />
            </mesh>
            <mesh ref={ringRef2}>
                <torusGeometry args={[1.9, 0.012, 16, 70]} />
                <primitive object={ringMaterial.clone()} attach="material" />
            </mesh>
            <mesh ref={ringRef3}>
                <torusGeometry args={[2.3, 0.01, 16, 70]} />
                <primitive object={ringMaterial.clone()} attach="material" />
            </mesh>

            {/* Stage 3: Abstract Solar Structure */}
            <group ref={solarPanelsRef}>
                {[0, 1, 2, 3].map((idx) => {
                    const angle = (idx / 4) * Math.PI * 2;
                    return (
                        <group
                            key={`solar-${idx}`}
                            position={[Math.cos(angle) * 2.2, (idx % 2 === 0 ? 0.4 : -0.4), Math.sin(angle) * 2.2]}
                            rotation={[0.3, angle, 0]}
                        >
                            <mesh>
                                <boxGeometry args={[0.65, 0.03, 0.38]} />
                                <primitive object={solarMaterial} attach="material" />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* EV Mobility Energy Ring */}
            <mesh ref={evRingRef}>
                <torusGeometry args={[2.5, 0.015, 16, 90]} />
                <primitive object={evMaterial} attach="material" />
            </mesh>

            {/* Funding Gateway */}
            <group ref={fundingGatewayRef}>
                <mesh>
                    <cylinderGeometry args={[1.7, 1.7, 0.05, 32, 1, true]} />
                    <primitive object={fundingMaterial} attach="material" />
                </mesh>
            </group>

            {/* Growth Lattice */}
            <group ref={growthLatticeRef}>
                {[0, 1].map((i) => (
                    <mesh key={`growth-${i}`} rotation={[0, (i * Math.PI) / 3, 0]}>
                        <torusGeometry args={[2.0 + i * 0.3, 0.012, 16, 50]} />
                        <primitive object={growthMaterial} attach="material" />
                    </mesh>
                ))}
            </group>

            {/* Product Creation Nodes */}
            <group ref={productNodesRef}>
                {[0, 1, 2, 3].map((i) => {
                    const ang = (i / 4) * Math.PI * 2;
                    return (
                        <mesh key={`prod-${i}`} position={[Math.cos(ang) * 2.0, Math.sin(ang) * 2.0, 0]}>
                            <boxGeometry args={[0.2, 0.2, 0.2]} />
                            <primitive object={productMaterial} attach="material" />
                        </mesh>
                    );
                })}
            </group>

            {/* Unified Venture Ecosystem Nodes */}
            <group ref={ecosystemRef}>
                {ecosystemNodes.map((node, i) => (
                    <group key={`eco-${i}`} position={[node.x, node.y, node.z]}>
                        <mesh>
                            <octahedronGeometry args={[node.scale, 0]} />
                            <meshStandardMaterial
                                color={i % 2 === 0 ? '#00e5ff' : '#8e62ff'}
                                emissive={i % 2 === 0 ? '#00e5ff' : '#8e62ff'}
                                emissiveIntensity={0.8}
                                roughness={0.3}
                            />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Subdued Ambient Point Lights to prevent viewport glare */}
            <pointLight color="#00e5ff" intensity={1.4 + progress * 2.0} distance={14} decay={2} />
            <pointLight color="#7c4dff" intensity={1.0 + progress * 1.5} distance={12} decay={2} position={[2, 1, -2]} />
        </group>
    );
}
