import { useGLTF, Html } from "@react-three/drei";

const SCREEN_KEY = "FxYJZRjJWVjYwLV";
const TRACKPAD_KEY = "AUMLEhzRIkXUmsX";

const getGeometryMesh = nodes => {
  const modelKeys = Object.keys(nodes);
  const standardKeys = modelKeys.filter(key => key !== SCREEN_KEY && key !== TRACKPAD_KEY);

  const getModel = key => {
    const node = nodes[key];
    if (!node || !node.geometry) return null;
    return { geometry: node.geometry, material: node.material };
  };

  const standard = standardKeys.map(getModel).filter(m => m);
  const screen = getModel(SCREEN_KEY);
  const trackpad = getModel(TRACKPAD_KEY);

  return { standard, screen, trackpad };
};

export default function Macbook({ powerOn }) {
  const { nodes, materials } = useGLTF("/models/glb/macbook.glb");
  const { standard, screen, trackpad } = getGeometryMesh(nodes);

  return (
    <>
      {standard.map(mesh => (
        <mesh
          key={mesh.geometry.id}
          geometry={mesh.geometry}
          material={mesh.material}
          castShadow
          receiveShadow
        />
      ))}

      {screen && (
        <mesh
          geometry={screen.geometry}
          material={materials["FXtoXdXSZfIeavz"]}
          castShadow
          receiveShadow
        >
          {powerOn && (
            <Html
              rotation={[-0.33, 0, 0]}
              position={[0, 9.6, -14.168]}
              distanceFactor={10}
              transform
            >
              <iframe
                src={`${window.location.origin}/screen`}
                width={1200}
                height={800}
                className="border-none"
              />
            </Html>
          )}
        </mesh>
      )}

      {trackpad && (
        <mesh geometry={trackpad.geometry} material={trackpad.material} castShadow receiveShadow />
      )}
    </>
  );
}
