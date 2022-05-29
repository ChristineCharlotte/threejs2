import * as THREE from 'three';
import gsap from 'gsap';

document.querySelector('#app').innerHTML = `
<canvas class="three"></canvas>
`;

// Canvas
const canvas = document.querySelector('.three');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const group = new THREE.Group();
const ice_cream = new THREE.Group();

// ice_cream.rotateOnAxis(new THREE.Vector3(1, 1, 1), Math.PI);

// cube1
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'red' })
);

cube1.position.set(0, -3, 0);
cube1.scale.set(2.5, 0.2, 3);
cube1.rotation.reorder('YXZ');
cube1.rotation.y = Math.PI * 0.25;

// cube2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'orange' })
);

cube2.position.set(0, 3, 0);
cube2.scale.set(10, 0.2, 150);
cube2.rotation.reorder('YXZ');
cube2.rotation.y = Math.PI * 0.25;

// cube3
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'pink' })
);

cube3.position.set(-2, -1, -2);
cube3.scale.set(6, 8, 0.8);
cube3.rotation.reorder('YXZ');
cube3.rotation.y = Math.PI * 0.25;

// cube5
const cube5 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.02, 0.02, 6, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);

cube5.position.set(0, 0, 0.1);

// ball
const ball = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.32),
  new THREE.MeshBasicMaterial({ color: 'white' })
);

ball.position.set(0, 0, 0);

// cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.2, 1.2, 36),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
cone.position.set(-0.8, 0, 0);
cone.rotation.z = Math.PI * 0.5;

group.add(cube1, cube2, cube3, cube5);
ice_cream.add(ball, cone);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera & Axis helper
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(-1, 1, 12);

// camera.lookAt(new THREE.Vector3(2, -1, 1))

const axesHelper = new THREE.AxesHelper(1);
scene.add(camera, group, ice_cream);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

gsap.to(camera.position, { duration: 3, delay: 1, x: 0, z: 6 });
gsap.to(camera.position, { duration: 3, delay: 6, x: -1, z: 12 });

// Animations
const tick = () => {
  // time
  let elapsedTime = clock.getElapsedTime();

  if (ice_cream.position.y >= 2.65) {
    flag = -1;
  } else if (ice_cream.position.y <= -2.65) {
    flag = 1;
  }

  ice_cream.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01 * (1 / 4) * Math.PI);

  ice_cream.position.y +=
    ((0.02 - 0.0001 * (3 - Math.abs(ice_cream.position.y))) ^ 1.5) *
    flag *
    0.03;

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
let flag = 1;
tick();