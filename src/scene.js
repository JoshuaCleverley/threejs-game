import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Terrain } from '@/terrain';

export function createScene(renderer, stats, gui) {
    // Create scene and camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    const controls = new OrbitControls( camera, renderer.domElement );

    let terrain = new Terrain(10, 10);

    const terrainFolder = gui.addFolder("Terrain");
    terrainFolder.add(terrain, 'width', 1, 20, 1).name('width');
    terrainFolder.add(terrain, 'height', 1, 20, 1).name('height');
    terrainFolder.addColor(terrain.material, 'color');
    terrainFolder.onChange(() => {
        terrain.updateGeometry();
    });

    camera.position.set( 0, 10, 10 );
    controls.update();

    function initialize() {
        scene.clear();
        scene.add(terrain);
        
        setupLights();
    }

    // Lights
    function setupLights() {
        const ambient = new THREE.AmbientLight();
        ambient.intensity = 0.5;

        const sun = new THREE.DirectionalLight();
        sun.position.set(1,2,3)

        scene.add(ambient, sun);
    }

    function tick() {
    }

    function draw() {
        // Render the frame
        stats?.update();
        controls.update();
        renderer.render(scene, camera);
    }

    function start() {
        // Starts the animation loop, running draw every frame
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        // Stops the animation loop
        renderer.setAnimationLoop(null);
    }

    function handleResize(event) {
      camera.aspect = window.innerWidth / window.innerHeight;
       camera.updateProjectionMatrix();
    }

    return {
        initialize,
        tick,
        start,
        stop,
        handleResize,
    }
}