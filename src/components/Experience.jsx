/* eslint-disable react/no-unknown-property */
import { Center, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture } from "@react-three/drei"
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"

const PortalMaterial = shaderMaterial(
    {
        uTime:0,
        uColorStart: new THREE.Color('#535353'),
        uColorEnd: new THREE.Color('#ededed')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({PortalMaterial: PortalMaterial})

const Experience = () => {
    const {nodes} = useGLTF('./portal.glb')
    const bakedTexture = useTexture('./baked.jpg')
    bakedTexture.flipY=false

    const portalMaterialRef = useRef()    

    useFrame((state,delta)=>{
        portalMaterialRef.current.uTime += delta
    })

  return (
    <>
       
        <color args={['#030202']} attach={'background'}/>
        <OrbitControls makeDefault/>
        <Center>
             <mesh geometry={nodes.baked.geometry}>
                 <meshBasicMaterial map={bakedTexture} />
             </mesh>
            <mesh 
                geometry={nodes.poleLightA.geometry}  
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color={'#f7f9ee'}/>
            </mesh>
            <mesh 
                geometry={nodes.poleLightB.geometry}  
                position={nodes.poleLightB.position}
            >
                 <meshBasicMaterial color={'#f7f9ee'}/>
            </mesh>
            <mesh
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                <portalMaterial ref={portalMaterialRef} />
            </mesh>

            <Sparkles
                size={6}
                scale={[5,3,4]}
                position-y={1}
                speed={0.2}
                count={40}
            />
        </Center>
    </>
  )
}

export default Experience