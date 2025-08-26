import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import Macbook from "./Macbook";
import useGsap from "../lib/use-gsap";
import useLaptopStore from "../store/laptopStore";
import useCursor from "../lib/use-cursor";

export default function ObjectRender({ orbit, ...props }) {
  const macbookGroup = useRef();
  const { camera } = useThree();
  const { laptop, activeLaptop } = useLaptopStore();
  const { pointerOver, pointerOut } = useCursor();
  const { moveLookAt, moveRotation } = useGsap();

  const [powerOn, setPowerOn] = useState(false);
  let timer;

  // 맥북 클릭 시 화면으로 줌인
  const zoomToScreen = () => {
    if (!orbit?.current) {
      console.warn("OrbitControls ref not ready");
      return;
    }

    const position = camera.position;
    const target = orbit.current.target;

    const screenCenter = new THREE.Vector3(0, 9.6, -14);
    const distance = 15; // 화면과 카메라 사이 여유 거리
    const flyPosition = new THREE.Vector3(0, 9.6, 2 + distance); // Z 위치에 distance 더함

    moveLookAt(position, flyPosition, target, screenCenter, false, 2, orbit);
  };

  // 맥북 클릭 이벤트
  const zoom = e => {
    e.stopPropagation();
    if (e.eventObject.name !== "macbook-group") return;

    if (!laptop) {
      setPowerOn(true);
      activeLaptop(true);
      zoomToScreen();
    }
  };

  // 맥북 외부 클릭 → 원래 위치로 돌아가기
  const missed = () => {
    if (!laptop) return; // 맥북이 켜져있지 않으면 무시
    if (timer) return;
    if (!orbit?.current) return;

    const position = camera.position;
    const target = orbit.current.target;

    // 원래 카메라 위치와 타겟 (Canvas 초기값)
    const originalPosition = new THREE.Vector3(0, 0, 40);
    const originalTarget = new THREE.Vector3(0, 0, 0);

    moveLookAt(position, originalPosition, target, originalTarget, true, 2, orbit);

    timer = setTimeout(() => activeLaptop(false), 2000); // 맥북 off
    setPowerOn(false);
  };

  // 마우스 포인터 따라 맥북 회전
  useFrame(state => {
    const macbook = macbookGroup.current;
    if (!macbook) return;

    if (!laptop) {
      moveRotation(macbook.rotation, state.pointer);
    }
  });

  return (
    <group>
      <group
        name="macbook-group"
        ref={macbookGroup}
        {...props}
        rotation={[0.335, 0, 0]}
        position={[0, -5, 0]}
        onPointerDown={zoom}
        onPointerMissed={missed}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
      >
        <Macbook powerOn={powerOn} />
      </group>
    </group>
  );
}
