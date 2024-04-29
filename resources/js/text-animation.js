// Import the THREE library
import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the font loader and create the text
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const geometry = new THREE.TextGeometry('Hello, Portfolio!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const text = new THREE.Mesh(geometry, material);
    geometry.center();  // Center the text geometry

    scene.add(text);
});

camera.position.z = 500;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
