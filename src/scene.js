import * as THREE from 'three';
import { createCamera } from '@/camera'

export function createScene(renderer, stats, gui) {
    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = createCamera();

    // Create a test cube
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    //camera.attach(cube);

    const folder = gui.addFolder("Cube");
    folder.add(cube.position, 'x', -2, 2, 0.1).name('x');
    folder.add(cube.position, 'y', -2, 2, 0.1).name('y');
    folder.add(cube.position, 'z', -2, 2, 0.1).name('z');
    folder.addColor(cube.material, 'color');

    function initialize() {
        scene.clear();
        scene.add(cube);
        
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
        camera.tick();
    }

    function draw() {
        // Render the frame
        stats?.update();
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

    function handleResize(event) {
        camera.camera.aspect = window.innerWidth / window.innerHeight;
        camera.camera.updateProjectionMatrix();
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
        handleResize,
    }
}