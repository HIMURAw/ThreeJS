'use client';

import { Html } from '@react-three/drei';
import { useState } from 'react';

interface BlipProps {
    position: [number, number, number];
    label: string;
    color?: string;
}

export default function Blip({ position, label, color = '#ff3333' }: BlipProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                    color={hovered ? '#ffffff' : color}
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* 3D Label */}
            <Html distanceFactor={40} position={[0, 2, 0]}>
                <div className={`
          px-2 py-1 rounded bg-black/80 text-white text-xs whitespace-nowrap
          border border-white/20 transition-opacity duration-200
          ${hovered ? 'opacity-100' : 'opacity-0'}
        `}>
                    {label}
                </div>
            </Html>

            {/* Ground shadow/circle */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
                <circleGeometry args={[1.5, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
        </group>
    );
}
