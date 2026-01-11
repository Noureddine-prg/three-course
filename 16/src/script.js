import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { time } from "three/tsl";

// 1 unit is 1 meter

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial()
);

floor.rotation.x = Math.PI * -0.5;
scene.add(floor);

const houseGroup = new THREE.Group();
scene.add(houseGroup);

// Walls
const walls = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3, 10),
  new THREE.MeshStandardMaterial()
);

walls.position.y = 5;

houseGroup.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4, 10, 8, 1),
  new THREE.MeshStandardMaterial()
);

roof.position.y = 15;

houseGroup.add(roof);

const roofIndent = new THREE.Mesh(
  new THREE.BoxGeometry(2, 4, 2),
  new THREE.MeshStandardMaterial({ color: 0x552200 })
);
roofIndent.position.z = 3;
roofIndent.position.y = 12.01;

houseGroup.add(roofIndent);

const windmillBladePoles = {
  rotationSpeed: 0.5,
  positionY: 12,
  positionZ: 4.25,
};

const windmillBladePole1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 10, 0.5),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);

windmillBladePole1.position.y = windmillBladePoles.positionY;
windmillBladePole1.position.z = windmillBladePoles.positionZ;

windmillBladePole1.rotation.z = Math.PI / 4;

const windmillBladePole2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 10, 0.5),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);

windmillBladePole2.position.y = windmillBladePoles.positionY;
windmillBladePole2.position.z = windmillBladePoles.positionZ;

windmillBladePole2.rotation.z = -Math.PI / 4;

houseGroup.add(windmillBladePole1, windmillBladePole2);
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 10;
camera.position.y = 20;
camera.position.z = 25;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
