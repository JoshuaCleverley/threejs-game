import * as THREE from 'three';
import { createCamera } from '@/camera'

export function createScene(renderer) {
    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = createCamera();

    // Create a test cube
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    camera.attach(cube);

    function initialize() {
        scene.clear();
        scene.add(cube);
        
        setupLights();
    }

    // Lights
    function setupLights() {
        const lights = [
            new THREE.AmbientLight(0xffffff, 0.2),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
        ];

        lights[1].position.set(0, 1, 0);
        lights[1].position.set(1, 1, 0);
        lights[1].position.set(0, 1, 1);

        scene.add(...lights);
    }

    function tick() {
        cube.position.x += 0.1;
        
        camera.tick();
    }

    function draw() {
        // Render the frame
        renderer.render(scene, camera.camera);
    }

    function start() {
        // Starts the animation loop, running draw every frame
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        // Stops the animation loop
        renderer.setAnimationLoop(null);
    }

    // Handle events
    function onMouseDown(event) {
        camera.onMouseDown(event);
    }

    function onMouseUp(event) {
        camera.onMouseUp(event);
    }

    function onMouseMove(event) {
        camera.onMouseMove(event);
    }

    function onScroll(event) {
        camera.onScroll(event);
    }

    return {
        initialize,
        tick,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onScroll,
    }
}