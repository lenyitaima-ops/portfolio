import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html } from '@react-three/drei'
import './ModelViewer.css'

const MODEL_PATH = '/assets/works/fashion/Perfume/model/model.gltf'

// ---- Manual tweak knobs ----
const FIT_SIZE = 3.2            // target size of the model's largest dimension
const POSITION = [0, 0, 3]      // manual offset after centering [x, y, z]
const CAMERA_POSITION = [0, 0, 6]
// ----------------------------

function Model() {
  const { scene } = useGLTF(MODEL_PATH)

  const { object, center, scale } = useMemo(() => {
    const cloned = scene.clone(true)

    cloned.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = new THREE.MeshStandardMaterial({
          color: '#a8c5ef',
          transparent: true,
          opacity: 0.55,
          roughness: 0.18,
          metalness: 0.1,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      }
    })

    const box = new THREE.Box3().setFromObject(cloned)
    const c = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return { object: cloned, center: c, scale: FIT_SIZE / maxDim }
  }, [scene])

  return (
    <group scale={scale} position={POSITION}>
      <primitive object={object} position={[-center.x, -center.y, -center.z]} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)

const ModelViewer = () => {
  return (
    <div className="model-viewer">
      <Canvas
        camera={{ position: CAMERA_POSITION, fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.4} groundColor="#b0a890" />
        <directionalLight position={[5, 6, 5]} intensity={1.6} />
        <directionalLight position={[-5, -2, -4]} intensity={0.3} />
        <Suspense fallback={<Html center className="model-loading">Loading model…</Html>}>
          <Model />
        </Suspense>
        <OrbitControls makeDefault enablePan={false} target={[0, 0, 0]} />
      </Canvas>
    </div>
  )
}

export default ModelViewer
