'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GtaMap from '@/components/GtaMap';

export default function Home() {
  return (
    <main className="w-full h-screen bg-[#0a0a0a] relative">
      <Canvas
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <GtaMap />
        </Suspense>
      </Canvas>

      {/* Loading indicator overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-white font-mono pointer-events-none">
        <div className="bg-black/50 px-4 py-2 rounded">
          Loading 3D Map Assets...
        </div>
      </div>
    </main>
  );
}
