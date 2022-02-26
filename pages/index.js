import { useEffect } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import picture from '../public/galax.jpg';

export default function Home() {

  useEffect(() => {
    let value = 0;
    let currentX = 0
    let currentY = 0
    let aimX = 0
    let aimY = 0
    let speed = 0.02
    let canvas = document.querySelector('#cvas');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    const ambience = new THREE.AmbientLight(0xffffff , 0.8)
    scene.add(ambience)

    const renderer = new THREE.WebGLRenderer({
      canvas:canvas
    })

    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.render( scene, camera );
    camera.position.setZ(30);
    
    const geometery = new THREE.BoxGeometry( 10, 10, 10)
    const textured = new THREE.TextureLoader().load('/galax.jpg');
    const material = new THREE.MeshBasicMaterial( { color: 0xffaaff, map: textured } );
    const torus = new THREE.Mesh(geometery, material)

    document.addEventListener('mousemove', (event) => {

      aimX = event.pageX / 640
      aimY = event.pageY / 480
      
    })

    scene.add(torus);
    renderer.render( scene, camera ); 

    function addStar(){

      const geo = new THREE.SphereGeometry(0.25, 24, 24);
      const mat = new THREE.MeshStandardMaterial( { color: 0xffffff } );
      const star = new THREE.Mesh(geo, mat)
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

      star.position.set(x, y, z);
      scene.add(star);

    }

    const controls = new OrbitControls(camera, renderer.domElement)

    Array(100).fill().forEach(addStar)

    function animate() {
      renderer.render(scene, camera)
      
      currentX += (aimX - currentX) * speed;
      currentY += (aimY - currentY) * speed;
      
      torus.rotation.set(currentY, currentX, 0)

      renderer.render( scene, camera )

      requestAnimationFrame( animate )
    }
    animate()

    window.addEventListener('resize', () => {
  
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    
    })

  }, [])

  
  return (<>

    <canvas id="cvas"></canvas>

  </>)
}
