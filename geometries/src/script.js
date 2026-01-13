import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object

const geometry = new THREE.SphereGeometry();
const count = 20;

const positionsArray = new Float32Array(count * 3 * 3); // 50 triangles, each with 3 vertices, each vertex has 3 coordinates (x, y, z)
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random();
}

const positionsAttibute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttibute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Geometries are the shapes that make up the 3D models in Three.js. They can be simple
// shapes like spheres, cubes, and cylinders, or more complex shapes like custom meshes.
// Materials are used to define the appearance of the geometries, such as color, texture,
// and shading. Together, geometries and materials create the visual elements of a 3D scene
// in Three.js.
