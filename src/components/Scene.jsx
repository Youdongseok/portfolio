import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import ObjectRender from "./ObjectRender";

export default function Scene() {
  const orbit = useRef();

  return (
    <Canvas
      style={{ width: "100%", height: "100vh" }}
      camera={{ position: [0, 0, 40], fov: 50 }} // z 값을 20 → 40으로 증가
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <OrbitControls
        ref={orbit}
        enableRotate={false} // 회전 비활성화
        enableZoom={true} // 확대/축소 활성화
        enablePan={false} // 패닝 비활성화
      />

      <ObjectRender orbit={orbit} />
    </Canvas>
  );
}
