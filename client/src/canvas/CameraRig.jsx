/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from "react";
import { useRef,useState } from "react";
import { useFrame } from '@react-three/fiber';
import { easing } from "maath";
import { useSnapshot } from "valtio";
import * as THREE from 'three'; 

import state from "../store";

const CameraRig = ({ children }) => {
      const [group,setGroup] = useState(new THREE.Group())
//   const group = useRef();
//   useRef(() => {
//       group.current = new THREE.Group(); 
//       console.log('grop',group)
//     }, []);
  const snap = useSnapshot(state);
  let count=0;

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    //set initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    //set model CAmera position
    easing.damp3(state.camera.position, targetPosition, 0.24, delta);

    if(count===0)
    {
      console.log(group);
      count++;
    }

    //set model rotation smothing function
    if (group) {
      easing.dampE(
        group.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group>{children}</group>;
};

export default CameraRig;
