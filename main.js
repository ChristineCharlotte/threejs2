import * as THREE from 'three';

document.querySelector('#app').innerHTML = `
<canvas class="three"></canvas>
`;

console.log(THREE)


// Canvas
const canvas = document.querySelector('.three');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const group = new THREE.Group()

// cube1
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1), 
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube1.position.set(0, -3, 1)
cube1.scale.set(1.2, 0.5, 2)
cube1.rotation.reorder('YXZ')
cube1.rotation.y = Math.PI *0.25

// cube2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);

cube2.position.set(0, 3, 2);
cube2.scale.set(3, 0.5, 3);
cube2.rotation.reorder('YXZ');
cube2.rotation.y = Math.PI * 0.25;

// cube3
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "pink" })
);

cube3.position.set(-5, 0, 1);
cube3.scale.set(1.2, 5, 2);
cube3.rotation.reorder('YXZ');
cube3.rotation.y = Math.PI * 0.25;

group.add(cube1, cube2, cube3)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera & Axis helper
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(-2, 1, 8)

// camera.lookAt(new THREE.Vector3(2, -1, 1))

const axesHelper = new THREE.AxesHelper(1)
scene.add(camera, group, axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);