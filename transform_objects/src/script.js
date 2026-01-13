import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

//Positioning
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = -2;
mesh.position.set(0.7, -0.6, -2);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 5;
mesh.scale.set(2, 0.5, 5);

//Rotation
//to avoid gimbal lock and maintain axes order
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI * -0.25; // pi is half rotation
mesh.rotation.y = Math.PI; // pi is half rotation

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//camera.lookAt(mesh.position);

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = Math.PI * 0.25;

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);

group.add(cube1, cube2, cube3);
cube2.position.x = -1.5;
cube3.position.x = 1.5;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
