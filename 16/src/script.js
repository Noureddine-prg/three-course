import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { trunc } from "three/tsl";

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

// Textures
const textureLoader = new THREE.TextureLoader();

// Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg"
);
const floorARMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg"
);

const floorNormalTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg"
);

const floorDisplacementTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg"
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorColorTexture.repeat.set(40, 40);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floorARMTexture.repeat.set(40, 40);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(40, 40);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(40, 40);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// Scene Floor Geometry
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);

// Windmill tower group
const windmillTowerGroup = new THREE.Group();
scene.add(windmillTowerGroup);

floor.rotation.x = Math.PI * -0.5;
scene.add(floor);

// Walls
const wallColorTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg"
);
const wallARMTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg"
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

wallColorTexture.repeat.set(4, 4);
wallColorTexture.wrapS = THREE.RepeatWrapping;
wallColorTexture.wrapT = THREE.RepeatWrapping;

wallARMTexture.repeat.set(4, 4);
wallARMTexture.wrapS = THREE.RepeatWrapping;
wallARMTexture.wrapT = THREE.RepeatWrapping;

wallNormalTexture.repeat.set(4, 4);
wallNormalTexture.wrapS = THREE.RepeatWrapping;
wallNormalTexture.wrapT = THREE.RepeatWrapping;

const walls = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3, 10),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);

walls.position.y = 5;

windmillTowerGroup.add(walls);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 3),
  new THREE.MeshStandardMaterial({ color: 0x654321 })
);

door.position.z = 3.01;
door.position.y = 1;

windmillTowerGroup.add(door);

// Roof

const roofColorTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg"
);
const roofARMTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg"
);
const roofNormalTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg"
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(4, 4);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.wrapT = THREE.RepeatWrapping;

roofARMTexture.repeat.set(4, 4);
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapT = THREE.RepeatWrapping;

roofNormalTexture.repeat.set(4, 4);
roofNormalTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapT = THREE.RepeatWrapping;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4, 10, 8, 1),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);

roof.position.y = 15;

windmillTowerGroup.add(roof);

// roof - indent
const roofIndent = new THREE.Mesh(
  new THREE.BoxGeometry(2, 4, 2),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
roofIndent.position.z = 3;
roofIndent.position.y = 12.01;

windmillTowerGroup.add(roofIndent);

// Windmill Blade Poles and blade

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
const armOffset = 2.75;
const poleY = 0;
const poleZ = 0.5;

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

// Bushes
const bushGeomtry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeomtry, bushMaterial);
bush1.scale.setScalar(0.5);
bush1.position.set(1.4, 0.1, 3);

const bush2 = new THREE.Mesh(bushGeomtry, bushMaterial);
bush2.scale.setScalar(0.75);
bush2.position.set(2, 0.1, 3);

const bush3 = new THREE.Mesh(bushGeomtry, bushMaterial);
bush3.scale.setScalar(0.6);
bush3.position.set(2, 0.1, 3.5);

const bush4 = new THREE.Mesh(bushGeomtry, bushMaterial);
bush4.scale.setScalar(0.4);
bush4.position.set(-1.4, 0.1, 3);

const bush5 = new THREE.Mesh(bushGeomtry, bushMaterial);
bush5.scale.setScalar(0.55);
bush5.position.set(-2, 0.1, 3);

const bush6 = new THREE.Mesh(bushGeomtry, bushMaterial);
bush6.scale.setScalar(0.6);
bush6.position.set(-2, 0.1, 2.5);

scene.add(bush1, bush2, bush3, bush4, bush5, bush6);

// Trees
const createTree = (x, z, trunkHeight, trunkRadius) => {
  const tree = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight),
    new THREE.MeshStandardMaterial({ color: 0x8b4513 })
  );

  trunk.position.y = trunkHeight / 2;

  const foliage = new THREE.Mesh(
    new THREE.ConeGeometry(trunkRadius * 4, trunkHeight * 1.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x228b22 })
  );

  foliage.position.y = trunkHeight + (trunkHeight * 1.5) / 2 - 0.5;

  tree.add(trunk, foliage);
  tree.position.set(x, 0, z);
  return tree;
};

// Path trees
const pathTrees = [];
const pathStartZ = 5;
const pathEndZ = 19;
const pathSpacing = 2.5;
const pathSideOffset = 3.5;

for (let z = pathStartZ; z <= pathEndZ; z += pathSpacing) {
  const xJitter = (Math.random() - 0.5) * 0.5;
  const zJitter = (Math.random() - 0.5) * 0.5;
  const heightVariation = 2.5 + Math.random() * 1.5;
  const radiusVariation = 0.2 + Math.random() * 0.1;

  // Left side
  pathTrees.push(
    createTree(
      -pathSideOffset + xJitter,
      z + zJitter,
      heightVariation,
      radiusVariation
    )
  );
  // Right side
  pathTrees.push(
    createTree(
      pathSideOffset + xJitter,
      z + zJitter,
      heightVariation,
      radiusVariation
    )
  );
}

// Scattered trees around the platform (avoiding path and windmill)
const scatteredTrees = [];
const scatteredPositions = [
  // Back area (behind windmill)
  { x: -8, z: -12 },
  { x: -12, z: -8 },
  { x: -15, z: -14 },
  { x: 10, z: -10 },
  { x: 14, z: -6 },
  { x: 8, z: -16 },
  { x: -5, z: -18 },
  { x: 3, z: -14 },
  { x: -10, z: -4 },

  // Left side (away from path)
  { x: -10, z: 8 },
  { x: -14, z: 12 },
  { x: -12, z: 4 },
  { x: -16, z: 16 },
  { x: -8, z: 18 },
  { x: -18, z: 8 },

  // Right side (away from path)
  { x: 10, z: 6 },
  { x: 14, z: 10 },
  { x: 12, z: 16 },
  { x: 16, z: 4 },
  { x: 18, z: 14 },
  { x: 8, z: 12 },

  // Far corners
  { x: -17, z: -17 },
  { x: 17, z: -17 },
  { x: -17, z: 17 },
  { x: 17, z: 17 },
  { x: -14, z: -10 },
  { x: 15, z: -12 },
];

for (const pos of scatteredPositions) {
  const heightVariation = 2 + Math.random() * 2.5;
  const radiusVariation = 0.18 + Math.random() * 0.15;
  scatteredTrees.push(
    createTree(pos.x, pos.z, heightVariation, radiusVariation)
  );
}

pathTrees.forEach((tree) => scene.add(tree));
scatteredTrees.forEach((tree) => scene.add(tree));

// graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial();

const graves = new THREE.Group();

for (let i = 0; i < 150; i++) {
  //position
  const angle = Math.random() * Math.PI * 2;
  const radius = 7 + Math.random() * 13;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.5;
  grave.position.z = z;
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

scene.add(graves);

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
