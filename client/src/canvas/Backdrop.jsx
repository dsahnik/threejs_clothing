/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from "react";
import { easing } from "maath";
import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      position={[0, 0, -0.14]}
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.9}
      scale={10}
      rotation={[Math.PI /2, 0, 0]}
      // mapSize={100}
      // size={100}
      // radius={100}
      
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.75}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={2.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
