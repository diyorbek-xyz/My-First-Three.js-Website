import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// note: renderer

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById("second").appendChild(renderer.domElement);

// note: scene
const scene = new THREE.Scene();

// note: camera
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 1;

// note: loader
const loader = new GLTFLoader();

// note: lights
const ambientLight = new THREE.AmbientLight(0xffffff, 100);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 100);
light.position.set(0, 1, 0);
light.castShadow = true;
scene.add(light);

// note: Set up shadow properties for the light
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

let iphone;
const scale = 10;

loader.load(
	"./models/iphone.glb",
	(gltf) => {
		iphone = gltf.scene;
		iphone.traverse((node) => {
			if (node.isMesh) {
				node.castShadow = true;
			}
		});
		iphone.position.y = -0.5;
		iphone.position.x = 1.5;
		iphone.rotation.y = 2.3;

		iphone.scale.set(scale, scale, scale);

		scene.add(iphone);
	},
	undefined,
	(err) => {
		console.log(err);
	}
);

window.addEventListener("mousemove", (e) => {
	iphone.rotation.y = e.clientX * 0.01;
});

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
