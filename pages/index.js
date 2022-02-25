import { useEffect } from 'react';
import * as THREE from 'three';

export default function Home() {

  useEffect(() => {
    let value = 0;
    console.log('Use Effect Ran!')
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

    const renderer = new THREE.WebGLRenderer({
      canvas:document.querySelector('#cvas')
    })

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.render( scene, camera );
    camera.position.setZ(30);
    
    const geometery = new THREE.BoxGeometry( 10, 10, 10)
    const material = new THREE.MeshBasicMaterial( { color: 0xffaaff, wireframe: false } );
    const torus = new THREE.Mesh(geometery, material)
    
    document.addEventListener('mousemove', () => {
      torus.rotateX(value+=0.001);
      torus.rotateY(value+=0.001);
    })

    scene.add(torus);
    renderer.render( scene, camera ); 

    function animate() {
      requestAnimationFrame( animate )
      renderer.render(scene, camera)
      renderer.setSize( window.innerWidth, window.innerHeight )
    }
    animate()
  }, [])

  return (<>

    <canvas id="cvas"></canvas>

  </>)
}
