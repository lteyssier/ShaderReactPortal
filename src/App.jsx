import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/Experience'
import { Environment } from '@react-three/drei'

function App() {

  return (
    <>
      <Canvas
        flat
        camera={
          {
            fov:45,
            near:0.1,
            far:200,
            position:[3,1,6]
          }
        }
      >
        <Environment preset='forest'/>
          <Experience/>
      </Canvas>
    </>
  )
}

export default App
