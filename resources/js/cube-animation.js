import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.module.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('webgl-output').appendChild(renderer.domElement);

// Initialize transition trigger flag
window.transitionTriggered = false;

// Create a larger cube
const geometry = new THREE.BoxGeometry(2, 2, 2);  // Increase size to ensure it can fill the screen
const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.5
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add edges to make the cube borders visible
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
scene.add(line);

camera.position.z = 5;  // Start further back to see the cube initially

// Function to update cube rotation and camera zoom based on scroll
function updateCubeAndCamera() {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollRatio = scrollY / maxScroll;

    cube.rotation.x = scrollRatio * Math.PI * 2;  // Complete two full rotations
    cube.rotation.y = scrollRatio * Math.PI * 2;

    line.rotation.x = cube.rotation.x;
    line.rotation.y = cube.rotation.y;

    camera.position.z = 5 * (1 - scrollRatio);  // Zoom in as the user scrolls down
    if (camera.position.z < 1) camera.position.z = 1;  // Ensure camera doesn't go too close

    renderer.render(scene, camera);

    // Check if the end of the scroll has been reached
    if (scrollRatio >= 1.0 && !window.transitionTriggered) {
        initiateTransition();
    }
}

function initiateTransition() {
    if (!window.transitionTriggered) {
        window.transitionTriggered = true; // Ensure the transition only triggers once

        // Fade out effect
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '0';

        // Redirect after the fade-out completes
        setTimeout(() => {
            window.location.href = 'start.html'; // Ensure this matches the correct path
        }, 500); // Match the duration of the opacity transition
    }
}

// Listen to scroll events
window.addEventListener('scroll', updateCubeAndCamera);

// Initial render
updateCubeAndCamera();
