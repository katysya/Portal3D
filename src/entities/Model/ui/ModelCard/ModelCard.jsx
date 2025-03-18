import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { Environment, MeshPortalMaterial, RoundedBox, useTexture, Text } from "@react-three/drei";
import * as THREE from 'three';

const ModelCard = ({children, texture, name, color, active, setActive, hovered, setHovered, ...props}) => {
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

export default ModelCard;