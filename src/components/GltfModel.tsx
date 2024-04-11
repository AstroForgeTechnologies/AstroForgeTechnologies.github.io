import { useRef, useState } from "react";
import { useLoader, useFrame, type Vector3 } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";
import { Html, useProgress } from "@react-three/drei";

export interface Props {
  modelPath: string;
  scale?: number;
  position?: Vector3;
}

const GltfModel = ({ modelPath, scale = 40, position = [0, 0, 0] }: Props) => {
  const ref = useRef<Mesh>();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);

  useFrame((_, delta) => {
    ref.current?.rotateY(delta);
  });

  const { progress } = useProgress();

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      />
      <Html center>{progress}% Loaded...</Html>
    </>
  );
};

export default GltfModel;
