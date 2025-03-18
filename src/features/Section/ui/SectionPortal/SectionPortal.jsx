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
  
  const modelsData = [
    {
      name: "Fish King",
      texture: "textures/anime_art_style_a_water_based_pokemon.jpg",
      color: "#000a52",
      ModelComponent: Fish,
      position: [-0, 0, 0],
      rotation: [0, 0, 0],
    },
    {
      name: "Bunny",
      texture: "textures/anime_art_style_cactus_forest.jpg",
      color: "#2d2d2d",
      ModelComponent: Bunny,
      position: [-2.5, 0, 0],
      rotation: [0, Math.PI / 8, 0],
    },
    {
      name: "Frog",
      texture: "textures/anime_art_style_lava_world.jpg",
      color: "#915e00",
      ModelComponent: Frog,
      position: [2.5, 0, 0],
      rotation: [0, -Math.PI / 6, 0],
    },
  ];

  return (
    <>
    <ambientLight intensity={0.5}/>
    <Environment preset="sunset"/>
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6}/>
      {modelsData.map(({ name, texture, color, ModelComponent, position, rotation }) => (
      <ModelCard
        key={name}
        texture={texture}
        name={name}
        color={color}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
        position-x={position[0]}
        position-y={position[1]}
        position-z={position[2]}
        rotation-x={rotation[0]}
        rotation-y={rotation[1]}
        rotation-z={rotation[2]}
      >
        {ModelComponent && <ModelComponent scale={0.6} position-y={-1} hovered={hovered === name} />}
      </ModelCard>
    ))}
    </>
  );
};

export default SectionPortal;