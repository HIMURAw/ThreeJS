'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useGLTF, useTexture, MapControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Blip from './Blip';

export default function GtaMap() {
    // Load the 3D GTA 5 map model
    const { scene } = useGLTF('/scene.gltf');

    // Load the GTA 5 atlas texture
    const gtaTexture = useTexture('/map-atlas.jpg');

    const meshRef = useRef<THREE.Mesh>(null);

    // Apply the texture to all meshes in the scene
    useEffect(() => {
        if (scene && gtaTexture) {
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;

                    // Create a new material with the GTA texture
                    mesh.material = new THREE.MeshStandardMaterial({
                        map: gtaTexture,
                        roughness: 0.8,
                        metalness: 0.2,
                        side: THREE.DoubleSide,
                    });

                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                }
            });
        }
    }, [scene, gtaTexture]);

    // Markers positioned at key GTA V locations
    const blips = useMemo(() => [
        { position: [0, 10, 0] as [number, number, number], label: 'Los Santos', color: '#00ff00' },
        { position: [-60, 15, -80] as [number, number, number], label: 'Vinewood Hills', color: '#ffea00' },
        { position: [80, 10, 100] as [number, number, number], label: 'Los Santos Port', color: '#00bfff' },
        { position: [-120, 30, -140] as [number, number, number], label: 'Mount Chiliad', color: '#ffffff' },
    ], []);

    return (
        <>
            {/* Camera positioned to see the 3D city */}
            <PerspectiveCamera makeDefault position={[200, 150, 200]} fov={60} />
            <MapControls
                maxPolarAngle={Math.PI / 2.1}
                enableDamping={true}
                dampingFactor={0.05}
                minDistance={20}
                maxDistance={1000}
                target={[0, 0, 0]}
            />

            {/* Lighting for 3D models */}
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[200, 300, 100]}
                intensity={2}
                castShadow
                shadow-mapSize={[4096, 4096]}
                shadow-camera-left={-500}
                shadow-camera-right={500}
                shadow-camera-top={500}
                shadow-camera-bottom={-500}
            />

            {/* Hemisphere light for realistic outdoor lighting */}
            <hemisphereLight args={['#87CEEB', '#654321', 0.6]} />

            <Environment preset="sunset" />

            {/* The 3D GTA 5 Map Model with Texture */}
            <primitive
                object={scene}
                scale={1}
                position={[0, 0, 0]}
            />

            {/* Markers - Adjusted for 3D buildings */}
            {blips.map((blip, i) => (
                <Blip key={i} {...blip} />
            ))}
        </>
    );
}

// Preload the GLTF model for faster loading
useGLTF.preload('/scene.gltf');
