import { Text } from '@react-three/drei';

const Title = () => {
  return (
    <Text
      position={[0, 2.4, 0]}
      fontSize={0.7}
      color="black"
      fontWeight={600}
      anchorX="center"
      anchorY="middle"
    >
      Portal 3D
    </Text>
  );
};

export default Title;
