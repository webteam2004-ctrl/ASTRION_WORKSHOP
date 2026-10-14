import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================================
   GRID PLANE — Technical grid for depth & environment feel
   ============================================================ */

export default function GridPlane({ progress = 0 }) {
    const gridRef = useRef();

    const gridMaterial = useMemo(() => new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uColor: { value: new THREE.Color('#00e5ff') },
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform vec3 uColor;
      varying vec2 vUv;

      void main() {
        vec2 grid = abs(fract(vUv * 40.0 - 0.5) - 0.5) / fwidth(vUv * 40.0);
        float line = min(grid.x, grid.y);
        float gridLine = 1.0 - min(line, 1.0);

        // Fade based on distance from center
        float dist = length(vUv - 0.5);
        float fade = smoothstep(0.5, 0.1, dist);

        float alpha = gridLine * fade * 0.12 * (0.5 + uProgress * 0.5);

        // Pulse
        alpha *= 0.7 + 0.3 * sin(uTime * 0.5 + dist * 4.0);

        gl_FragColor = vec4(uColor, alpha);
      }
    `,
        side: THREE.DoubleSide,
    }), []);

    useFrame((state) => {
        if (gridRef.current) {
            gridMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
            gridMaterial.uniforms.uProgress.value = progress;
        }
    });

    return (
        <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[80, 80, 1, 1]} />
            <primitive object={gridMaterial} attach="material" />
        </mesh>
    );
}
