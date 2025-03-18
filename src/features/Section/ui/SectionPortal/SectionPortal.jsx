import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshPortalMaterial, RoundedBox, useTexture, Text, CameraControls, useCursor } from "@react-three/drei";
import * as THREE from 'three';
import Fish from '@/shared/ui/models/Fish/Fish';
import Bunny from '@/shared/ui/models/Bunny/Bunny';
import Frog from '@/shared/ui/models/Frog/Frog';
import { easing } from 'maath';

const SectionPortal = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

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
      <MonsterStage texture={'textures/anime_art_style_a_water_based_pokemon.jpg'} name={'Fish King'} color={'#000a52'} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
      <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish King"}/>
      </MonsterStage>
      <MonsterStage texture={'textures/anime_art_style_cactus_forest.jpg'} name={'Bunny'} color={'#2d2d2d'} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered} position-x={-2.5} rotation-y={Math.PI / 8}>
      <Bunny scale={0.6} position-y={-1} hovered={hovered === "Bunny"}/>
      </MonsterStage>
      <MonsterStage texture={'textures/anime_art_style_lava_world.jpg'} name={'Frog'} color={'#915e00'} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered} position-x={2.5} rotation-y={-Math.PI / 6}>
      <Frog scale={0.6} position-y={-1} hovered={hovered === "Frog"}/>
      </MonsterStage>
    </>
  );
};

export default SectionPortal


const MonsterStage = ({children, texture, name, color, active, setActive, hovered, setHovered, ...props}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;

    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return(
    <group {...props}>
      <Text font="fonts/Caprasimo-Regular.ttf" fontSize={0.3} position={[0, -1.3, 0.051]} anchorY={'bottom'}>
      {name}
      <meshBasicMaterial color={color} toneMapped={false}/>
      </Text> 
      <RoundedBox name={name} args={[2, 3, 0.1]} onDoubleClick={() => setActive(active === name? null : name)} onPointerEnter={() => setHovered(name)} onPointerLeave={() => setHovered(null)}>
        <planeGeometry args={[2, 3]} />
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
        <ambientLight intensity={1}/>
        <Environment preset="sunset"/>
        {children}
        <mesh>
        <sphereGeometry args={[5, 64, 64]}/>
        <meshStandardMaterial map={map} side={THREE.BackSide}/>
      </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}
