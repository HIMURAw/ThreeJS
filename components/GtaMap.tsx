'use client';

import { useRef, useMemo } from 'react';
import { useTexture, MapControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Blip from './Blip';

export default function GtaMap() {
    // Load the GTA 5 map texture from public folder
    // Make sure the file exists as /public/map-atlas.jpg
    const mapTexture = useTexture('/map-atlas.jpg');
    const heightMap = mapTexture; // Use the same texture for height displacement

    const meshRef = useRef<THREE.Mesh>(null);

    // Markers positioned at key GTA V locations
    const blips = useMemo(() => [
        { position: [0, 3, 0] as [number, number, number], label: 'Los Santos', color: '#00ff00' },
        { position: [-60, 3, -80] as [number, number, number], label: 'Vinewood Hills', color: '#ffea00' },
        { position: [80, 3, 100] as [number, number, number], label: 'Los Santos Port', color: '#00bfff' },
        { position: [-120, 3, -140] as [number, number, number], label: 'Mount Chiliad', color: '#ffffff' },
    ], []);

    return (
        <>
            {/* Camera positioned at an angle for better view */}
            <PerspectiveCamera makeDefault position={[100, 200, 100]} fov={60} />
            <MapControls
                maxPolarAngle={Math.PI / 2.1}
                enableDamping={true}
                dampingFactor={0.05}
                minDistance={50}
                maxDistance={800}
                target={[0, 0, 0]}
            />

            <ambientLight intensity={0.7} />
            <directionalLight
                position={[100, 200, 50]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            <Environment preset="sunset" />

            {/* The Map Surface - Flat with high-quality texture */}
            <mesh
                ref={meshRef}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[400, 400, 2, 2]} />
                <meshStandardMaterial
                    map={mapTexture}
                    roughness={0.9}
                    metalness={0}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Markers - Adjusted for better visibility */}
            {blips.map((blip, i) => (
                <Blip key={i} {...blip} />
            ))}
        </>
    );
}
