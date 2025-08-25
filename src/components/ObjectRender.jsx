import { forwardRef, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import Macbook from "./Macbook";
import useGsap from "../lib/use-gsap";
import useLaptopStore from "../store/laptopStore";
import useCursor from "../lib/use-cursor";

const ObjectRender = forwardRef((props, orbit) => {
  const macbookGroup = useRef();
  const { camera } = useThree();
  const { laptop, activeLaptop } = useLaptopStore();
  const { pointerOver, pointerOut } = useCursor();
  const { moveLookAt, moveRotation } = useGsap();
  const control = orbit;

  const [powerOn, setPowerOn] = useState(false);
  let timer;

  // 클릭 시 화면으로 줌인
  const zoomToScreen = () => {
    const position = camera.position;
    const target = control.current.target;

    const screenCenter = new THREE.Vector3(0, 9.6, -14);
    const flyPosition = new THREE.Vector3(0, 9.6, 2); // 화면 앞

    moveLookAt(position, flyPosition, target, screenCenter, false, 2, control);
  };

  const zoom = e => {
    e.stopPropagation();
    if (e.eventObject.name !== "macbook-group") return;

    if (!laptop) {
      setPowerOn(true);
      activeLaptop(true);
      zoomToScreen();
    }
  };

  const missed = () => {
    if (laptop) {
      if (timer) return;
      const position = camera.position;
      const fly = new THREE.Vector3(0, 0, 20);
      const target = control.current.target;
      const lookAt = new THREE.Vector3(0, 0, 0);
      moveLookAt(position, fly, target, lookAt, true, 2, control);
      timer = setTimeout(() => activeLaptop(false), 2000);
      setPowerOn(false);
    }
  };

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
});

export default ObjectRender;
