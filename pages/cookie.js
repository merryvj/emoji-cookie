import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import useSpline from "@splinetool/r3f-spline";
import { OrbitControls, Html } from "@react-three/drei";

import { useSpring, animated } from "@react-spring/three";

import useLongPress from "../hooks/use-long-press";

const Cookie = ({ isGenerated, fortuneText, handleClick }) => {
 
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/500ILyH2a9EYOBkR/scene.splinecode"
  );

  const ref = useRef();
  const {progress, handlers} = useLongPress({onPress: handleClick});

  const springLeft = useSpring({ position: [0, 0, isGenerated ? 1.5 : progress * 2] });
  const springRight = useSpring({ position: [0, 0, isGenerated ? -1.5 : -progress * 2] });
  const fortuneSpring = useSpring({
    scale: isGenerated ? 0.5 : progress / 2,
    position: [-0.95, isGenerated ? 1.75 : 1, 0],
    rotation: [0, 0, isGenerated ? - Math.PI / 6 : 0]});


  const [springs, api] = useSpring(
    () => ({
      scale: 5,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      config: (key) => {
        switch (key) {
          case "scale":
            return {
              mass: 10,
              friction: 20,
            };
          case "position":
            return { mass: 1, friction: 100 };
          default:
            return {};
        }
      },
    }),
    []
  );

  const handlePointerEnter = () => {
    if (!isGenerated) {
      api.start({
        scale: 5.5,
      });
    }
    
  };

  const handlePointerLeave = () => {
    api.start({
      scale: 5,
    });
  };

  

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    //ref.current.rotation.y = t;
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 4,
      0.15 + Math.sin(t / 2) / 8
    );
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 8;
  });


  return (
    <>
      

      <group
        ref={ref}
        dispose={null}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...handlers}
      >
        <animated.mesh
          name="Fortune"
          geometry={nodes.Fortune.geometry}
          material={materials.Fortune}
          castShadow
          receiveShadow
          position={fortuneSpring.position}
          scale={fortuneSpring.scale}
          rotation={fortuneSpring.rotation}
        >
          <Html as="div" transform rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              <p style={{ width: "100%", textAlign: "center" }}>{fortuneText}</p>
            </div>
          </Html>
        </animated.mesh>
        <group
          name="Cookie"

        >
          <animated.mesh
          name="CookieLeft"
          geometry={nodes.CookieLeft.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={springLeft.position}
          scale={springs.scale}
          rotation={[0, 0, 0]}
        />
        <animated.mesh
          name="CookieRight"
          geometry={nodes.CookieRight.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={springRight.position}
          scale={springs.scale}
          rotation={[0, 0, 0]}
        />
        </group>
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-1000}
          shadow-camera-right={1000}
          shadow-camera-top={1000}
          shadow-camera-bottom={-1000}
          position={[10, 10, -7.5]}
        />

        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.1}
          color="#eaeaea"
        />
      </group>
    </>
  );
};

const Scene = ({ isGenerated, fortuneText, handleClick }) => {
  return (
    <div id="canvas-container" style={{ height: "100%", width: "100%" }}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <Cookie
          isGenerated={isGenerated}
          fortuneText={fortuneText}
          handleClick={handleClick}
        ></Cookie>

        {/* {isGenerated && <Fortune/>} */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
export default Scene;
