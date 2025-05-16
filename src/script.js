import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

// note: renderer

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById("scene").appendChild(renderer.domElement);

// note: scene
const scene = new THREE.Scene();

// note: camera
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 9 - (window.scrollY * 0.016).toFixed(3);
camera.position.y = 0.35;

// note: loader
const loader = new GLTFLoader();

// note: lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);

const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(0, 2, 0);
light.castShadow = true;
const light1 = new THREE.DirectionalLight(0xffffff, 0.2);
light1.position.set(-2, 0, 0);
light1.castShadow = true;
const light2 = new THREE.DirectionalLight(0xffffff, 0.2);
light2.position.set(2, 0, 0);
light2.castShadow = true;
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(0, -2, 0);
light3.castShadow = true;

// note: Set up shadow properties for the light
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

// note: mixer
let mixer;
let mixer2;

// note: meshes
let airpod;
const airpodScale = 0.2;
let airpod2;
const airpod2Scale = 0.2;

// note: set mixer and airpod
loader.load(
	"./models/airPods.glb",
	function (gltf) {
		airpod = gltf.scene;
		airpod.traverse((node) => {
			if (node.isMesh) {
				node.castShadow = true;
			}
		});
		airpod.scale.set(airpodScale, airpodScale, airpodScale);
		scene.add(airpod);
		mixer = new THREE.AnimationMixer(airpod);
		mixer.clipAction(gltf.animations[0]).play();
	},
	undefined,
	undefined
);
loader.load(
	"./models/airPods.glb",
	function (gltf) {
		airpod2 = gltf.scene;
		airpod2.traverse((node) => {
			if (node.isMesh) {
				node.castShadow = true;
			}
		});
		airpod2.scale.set(-airpod2Scale, airpod2Scale, airpod2Scale);
		scene.add(airpod2);
		mixer2 = new THREE.AnimationMixer(airpod2);
		mixer2.clipAction(gltf.animations[0]).play();
	},
	undefined,
	undefined
);

// Note: Animation
const reRender3D = () => {
	requestAnimationFrame(reRender3D);
	renderer.render(scene, camera);
};
reRender3D();

// Note: Responsive
window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

window.addEventListener("scroll", () => {
	if (airpod) {
		camera.position.z = 9 - (window.scrollY * 0.016).toFixed(3);
		if (window.scrollY < 900) {
			if (window.scrollY < 450) {
				mixer?.setTime((window.scrollY * 0.005).toFixed(3));
				mixer2?.setTime((window.scrollY * 0.005).toFixed(3));
				airpod.position.x = (window.scrollY * 0.000225).toFixed(3) * -1;
				airpod2.position.x = (window.scrollY * 0.000225).toFixed(3);
			}
		}
		renderer.render(scene, camera);
	}
});

scene.add(ambientLight);
scene.add(light);
scene.add(light1);
scene.add(light2);
scene.add(light3);
