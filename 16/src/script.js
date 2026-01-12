import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

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

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial()
);

// Windmill tower group
const windmillTowerGroup = new THREE.Group();
scene.add(windmillTowerGroup);

floor.rotation.x = Math.PI * -0.5;
scene.add(floor);

// Walls
const walls = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3, 10),
  new THREE.MeshStandardMaterial()
);

walls.position.y = 5;

windmillTowerGroup.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4, 10, 8, 1),
  new THREE.MeshStandardMaterial()
);

roof.position.y = 15;

windmillTowerGroup.add(roof);

// roof - indent
const roofIndent = new THREE.Mesh(
  new THREE.BoxGeometry(2, 4, 2),
  new THREE.MeshStandardMaterial()
);
roofIndent.position.z = 3;
roofIndent.position.y = 12.01;

windmillTowerGroup.add(roofIndent);

// Windmill Blade Poles

const bladeGroup = new THREE.Group();
bladeGroup.position.y = 12;
bladeGroup.position.z = 4.25;
windmillTowerGroup.add(bladeGroup);

const windmillBladePoles = {
  rotationSpeed: 0.5,
  positionY: 12,
  positionZ: 4.25,
  color: 0x000000,
};

const windMillBlade = {
  width: 1.5,
  height: 5.5,
  rows: 11,
  cols: 11,
};

const windmillBladePole1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 10, 0.5),
  new THREE.MeshStandardMaterial({ color: windmillBladePoles.color })
);
windmillBladePole1.rotation.z = Math.PI / 4;

const windmillBladePole2 = windmillBladePole1.clone();
windmillBladePole2.rotation.z = -Math.PI / 4;

bladeGroup.add(windmillBladePole1, windmillBladePole2);

//Windmill blades
const createLatice = (width, height, rows, cols, material) => {
  const latticeGroup = new THREE.Group();

  // Horizontal Bars - from bottom edge to top edge
  for (let i = 0; i <= rows; i++) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.05, 0.05),
      material
    );
    slat.position.y = (i / rows) * height - height / 2;
    latticeGroup.add(slat);
  }

  // Vertical Bars - from left edge to right edge
  for (let i = 0; i <= cols; i++) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, height, 0.05),
      material
    );
    slat.position.x = (i / cols) * width - width / 2;
    latticeGroup.add(slat);
  }

  return latticeGroup;
};

const latticeMaterial = new THREE.MeshStandardMaterial({
  color: 0x8b4513,
});

// Position settings (relative to bladeGroup center)
const armOffset = 2.75; // distance from center along the arm
const poleY = 0; // relative to group
const poleZ = 0.5; // slightly in front of poles

// For 45 degree rotation
const cos45 = Math.cos(Math.PI / 4);
const sin45 = Math.sin(Math.PI / 4);

const perpOffset = 0.35; // perpendicular to arm direction

// Lattice for upper-right arm (pole1)
const lattice1 = createLatice(
  windMillBlade.width,
  windMillBlade.height,
  windMillBlade.rows,
  windMillBlade.cols,
  latticeMaterial
);
lattice1.rotation.z = -Math.PI / 4;
lattice1.position.set(
  armOffset * cos45 + perpOffset * sin45,
  poleY + armOffset * sin45,
  poleZ
);

// Lattice for lower-left arm (pole1)
const lattice2 = createLatice(
  windMillBlade.width,
  windMillBlade.height,
  windMillBlade.rows,
  windMillBlade.cols,
  latticeMaterial
);
lattice2.rotation.z = -Math.PI / 4;
lattice2.position.set(
  -armOffset * cos45 + perpOffset * sin45,
  poleY - armOffset * sin45,
  poleZ
);

// Lattice for upper-left arm (pole2)
const lattice3 = createLatice(
  windMillBlade.width,
  windMillBlade.height,
  windMillBlade.rows,
  windMillBlade.cols,
  latticeMaterial
);
lattice3.rotation.z = Math.PI / 4;
lattice3.position.set(
  -armOffset * cos45 - perpOffset * sin45,
  poleY + armOffset * sin45,
  poleZ
);

// Lattice for lower-right arm (pole2)
const lattice4 = createLatice(
  windMillBlade.width,
  windMillBlade.height,
  windMillBlade.rows,
  windMillBlade.cols,
  latticeMaterial
);
lattice4.rotation.z = Math.PI / 4;
lattice4.position.set(
  armOffset * cos45 - perpOffset * sin45,
  poleY - armOffset * sin45,
  poleZ
);

bladeGroup.add(lattice1, lattice2, lattice3, lattice4);

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
  const deltaTime = timer.getDelta();

  // Update windmill blade rotation
  bladeGroup.rotation.z += windmillBladePoles.rotationSpeed * deltaTime * 2;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
