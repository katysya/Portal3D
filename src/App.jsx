import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from "@react-three/fiber";

import { SectionPortal } from './features/Section';

import './app/styles/global.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
    <SectionPortal />
    </Canvas>
  </StrictMode>,
)