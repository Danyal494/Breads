import { OrbitControls, Sphere } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { color } from 'three/examples/jsm/nodes/Nodes.js'
import { pointInner, pointOuter } from './utils'

const TCanvas = () => {
  return (
    <div className='relative'>
      <Canvas 
      camera={{position:[10,-7.5,-7.5] , fov:35}}
      
      className='bg-[#101010]' style={{height:"100vh"}}>
<OrbitControls maxDistance={20} minDistance={10}/>
<directionalLight/>
<pointLight position={[-30,0,-30]} power={10.0}/>
<PointCircle/>
      </Canvas>
      <h1 className="absolute top-[50%] left-[50%] GG rounded-xl text-blue-200  p-4 -translate-x-[50%] -translate-y-[50%]  font-medium text-2xl md:text-5xl pointer-events-none">
        Danyal Khan
      </h1>

    </div>
  )
}

const PointCircle =() =>{
  const ref =useRef()

  useFrame(({ clock})=>{
    ref.current.rotation.z = clock.getElapsedTime() *0.05  })
  return(

    <group ref={ref}>
{/* <Sphere position={[0,0,1]} args={[0.1,10,10]}>
  <meshStandardMaterial color="purple" roughness={0.5}
  emissive="purple" emissiveIntensity={0.5}  />
</Sphere>
<Sphere position={[1.5,1.5,1.5]} args={[0.1,10,10]}>
  <meshStandardMaterial color="orange" roughness={0.5}
  emissive="orange" emissiveIntensity={0.5}  />
</Sphere> */}

{pointInner.map(point=> <Point key={point.idx}  position={point.position} color={point.color} />)}
{pointOuter.map(point=> <Point key={point.idx}  position={point.position} color={point.color} />)}

  </group>
)
}

const Point = (({position, color})=>{
  return(
    <Sphere position={position} args={[0.1,10,10]}>
      <meshStandardMaterial
      emissive={color}
      emissiveIntensity={0.5}
      roughness={0}
      color={color}/>
    </Sphere>
  )
})

export default TCanvas