import gsap from "gsap";
import * as THREE from "three";

const useGsap = () => {
  const moveLookAt = (position, fly, target, lookAt, isOut, duration = 2, orbit) => {
    gsap.to(position, {
      duration,
      x: fly.x,
      y: fly.y,
      z: fly.z,
      ease: isOut ? "power3.out" : "power3.inOut",
      onUpdate: () => {}, // 필요시 projectionMatrix 업데이트
    });

    gsap.to(target, {
      duration,
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
      ease: isOut ? "power3.out" : "power3.inOut",
      onUpdate: () => orbit?.current?.update(), // OrbitControls 동기화
    });
  };

  const moveRotation = (rotation, pointer, useY) => {
    gsap.to(rotation, {
      duration: 2,
      x: useY ? pointer.y : 0.35,
      y: -pointer.x / 5,
      z: 0,
      ease: "power3.out",
    });
  };

  return { moveLookAt, moveRotation };
};

export default useGsap;
