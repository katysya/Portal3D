import {useRef, useMemo, useEffect} from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export default function Bunny({hovered, ...props}) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/Bunny.gltf');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const anim = hovered? "Yes" : "Idle";
    actions[anim].reset().fadeIn(0.5).play();

    return () => actions[anim].fadeOut(0.5);
  }, [hovered, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Bunny" geometry={nodes.Bunny.geometry} material={materials.Atlas} skeleton={nodes.Bunny.skeleton} />
          <skinnedMesh name="Carrot" geometry={nodes.Carrot.geometry} material={materials.Atlas} skeleton={nodes.Carrot.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Bunny.gltf');
