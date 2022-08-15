import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas });

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, canvas.clientWidth / canvas.clientHeight, 0.01, 3000);
camera.position.z = 24;
camera.position.y = 5;
camera.position.x = 5;

var hlight = new THREE.AmbientLight(0xffffff);
scene.add(hlight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, -2, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

var directionalLight2 = new THREE.DirectionalLight(0xffffff);
directionalLight2.position.set(0, 500, 0);
directionalLight2.castShadow = true;
scene.add(directionalLight2);

var directionalLight3 = new THREE.DirectionalLight(0xffffff);
directionalLight3.position.set(0, 0, 500);
directionalLight3.castShadow = true;
scene.add(directionalLight3);

var directionalLight4 = new THREE.DirectionalLight(0xffffff, .5);
directionalLight4.position.set(500, 0, 0);
directionalLight4.castShadow = true;
scene.add(directionalLight4);

var directionalLight4 = new THREE.DirectionalLight(0xffffff, .5);
directionalLight4.position.set(-500, 0, 0);
directionalLight4.castShadow = true;
scene.add(directionalLight4);

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log(url, itemsLoaded, itemsTotal);
}
manager.onLoad = function () {
  console.log('loaded all resources')
}

const loader = new GLTFLoader(manager);
loader.load('einstein.gltf', function (gltf) {
  let object = gltf.scene.children[0];
  object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material.color.setRGB(.240, .233, .216);
      child.material.emissive.setRGB(.240, .233, .216);
      child.material.emissiveIntensity = .75;
      child.material.shininess = .1;
    }
    object.scale.set(2, 2, 2);
  });
  let geometry = object.geometry;
  geometry.center();
  scene.add(object);
});

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;
controls.maxPolarAngle = Math.PI / 1.5;
controls.minPolarAngle = Math.PI / 4;

controls.addEventListener('start', function () {
  if (controls.autoRotate) {
    controls.autoRotate = false;
  }
  setTimeout(() => {
    controls.autoRotate = true;
  }, 1000);
});

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

requestAnimationFrame(function animate() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  controls.update()
  requestAnimationFrame(animate);
})

renderer.setPixelRatio(window.devicePixelRatio);