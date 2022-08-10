import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas });
/* renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); */

// init scene and camera
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

/* var light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,300,500);
scene.add(light);

var light2 = new THREE.PointLight(0xc4c4c4,10);
light2.position.set(500,100,0);
scene.add(light2);

var light3 = new THREE.PointLight(0xc4c4c4,10);
light3.position.set(0,100,-500);
scene.add(light3);

var light4 = new THREE.PointLight(0xc4c4c4,10);
light4.position.set(-500,300,500);
scene.add(light4);
 */

// Add your shapes here
let loader = new OBJLoader();
loader.load('bust_Einstein.obj', function (object) {
  /* object.position.set(.59, -1.75, 0); */
  object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material.color.setRGB(.240, .233, .216);
      child.material.emissive.setRGB(.240, .233, .216);
      child.material.shininess = 2;
    }
    object.scale.set(2, 2, 2);
  });
  let geometry = object.children[0].geometry;
  geometry.center();
  scene.add(object);
});


// Controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Grid & Axes Helper
/* const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper); */

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

// render
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