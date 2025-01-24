import * as THREE from 'three';


document.addEventListener("DOMContentLoaded", () => {
    // console.log("🟢 Renderer: DOM fully loaded");
    
    if (window.electronAPI) {
        // console.log("✅ Renderer: `window.electronAPI` is available");
        window.electronAPI.test();  // This will trigger the log in the main process
    } else {
        // console.error("❌ Renderer: `window.electronAPI` is NOT available.");
    }
});


const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff0d0 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// console.log("🟢 Renderer: DOM fully loaded");
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
