import * as THREE from 'three';
import { createScene } from '@/scene'

export function createGame() {
    // Game settings
    const TICK_RATE = 2;

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add event listeners so that user inputs can be handled
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup',   onMouseUp,   false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('wheel',     onScroll,    false);


    // Create and start a scene
    const scene = createScene(renderer);
    scene.initialize();
    scene.start();

    // Handle the regular tick updates of the game
    (function tick() {
        setTimeout(() => {
            scene.tick();
            tick();
        }, 1000 * (1 / TICK_RATE));
    })();
      

    // Handle events
    function onMouseDown(event) {
        scene.onMouseDown(event);
    }

    function onMouseUp(event) {
        scene.onMouseUp(event);
    }

    function onMouseMove(event) {
        scene.onMouseMove(event);
    }

    function onScroll(event) {
        //tick();
        scene.onScroll(event);
    }
}