import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, MeshPortalMaterial, RoundedBox, Text, CameraControls, useCursor } from "@react-three/drei";
import * as THREE from 'three';

import { ModelCard } from '@/entities/Model/ui';
import { Fish, Bunny, Frog } from '@/shared/ui';

const SectionPortal = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);
  
  useCursor(hovered);

  useEffect(() => {
    if(active) {
      const targetPosition = new THREE.Vector3();

      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true,);
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true,);
    }

  }, [active, scene]); 

  return (
    <>
    <ambientLight intensity={0.5}/>
    <Environment preset="sunset"/>
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6}/>
      <ModelCard texture={'textures/anime_art_style_a_water_based_pokemon.jpg'} name={'Fish King'} color={'#000a52'} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
      <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish King"}/>
      </ModelCard>
      <ModelCard texture={'textures/anime_art_style_cactus_forest.jpg'} name={'Bunny'} color={'#2d2d2d'} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered} position-x={-2.5} rotation-y={Math.PI / 8}>
      <Bunny scale={0.6} position-y={-1} hovered={hovered === "Bunny"}/>
      </ModelCard>
      <ModelCard texture={'textures/anime_art_style_lava_world.jpg'} name={'Frog'} color={'#915e00'} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered} position-x={2.5} rotation-y={-Math.PI / 6}>
      <Frog scale={0.6} position-y={-1} hovered={hovered === "Frog"}/>
      </ModelCard>
    </>
  );
};

export default SectionPortal;