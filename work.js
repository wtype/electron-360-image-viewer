const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webglviewer').appendChild(renderer.domElement);
const image = null;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000000
);

camera.position.set(0, 0, 0);

camera.lookAt(10, 0, 0);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.target.set(
  camera.position.x + 0.1,
  camera.position.y,
  camera.position.z
);

controls.rotateSpeed = -0.4;
controls.enableDamping = true;
controls.dampingFactor = 0.2;

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

const createMesh = image => {
  if (image === null) {
    scene.remove(image);
    return;
  }

  const loader = new THREE.TextureLoader();

  loader.load(image, texture => {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const geometry = new THREE.SphereBufferGeometry(3, 32, 32);
    geometry.scale(-1, 1, 1);
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);
    renderer.render(scene, camera);
  });

  renderer.render(scene, camera);
};

createMesh(image);
animate();

const instruction = document.getElementById('instruction');

const resized = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

document.addEventListener('dragover', e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

document.addEventListener('dragenter', e => {
  document.body.style.opacity = 0.5;
});

document.addEventListener('dragleave', e => {
  document.body.style.opacity = 1;
});

document.addEventListener('drop', e => {
  e.preventDefault();
  createMesh(e.dataTransfer.files[0].path);
  document.body.style.opacity = 1;
  instruction.style.display = 'none';
});

window.addEventListener('resize', resized, false);
