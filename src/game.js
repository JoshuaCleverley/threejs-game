import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import GUI from 'lil-gui';
import { createScene } from '@/scene'

export function createGame() {
    // Game settings
    const GAME_SETTINGS = {
        tick_rate: 2,
    }

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add stats
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // Add gui
    const gui = new GUI();
    let game_settings_folder = gui.addFolder("Game Settings");
    game_settings_folder.add(GAME_SETTINGS, "tick_rate", 0.1, 20, 0.1).name("Tick Rate");

    // Add event listeners so that user inputs can be handled
    window.addEventListener('mousedown', onMouseDown,  false);
    window.addEventListener('mouseup',   onMouseUp,    false);
    window.addEventListener('mousemove', onMouseMove,  false);
    window.addEventListener('wheel',     onScroll,     false);
    window.addEventListener('resize',    handleResize, false);

    // Create and start a scene
    const scene = createScene(renderer, stats, gui);
    scene.initialize();
    scene.start();

    // Handle the regular tick updates of the game
    (function tick() {
        setTimeout(() => {
            scene.tick();
            tick();
        }, 1000 * (1 / GAME_SETTINGS.tick_rate));
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
        scene.onScroll(event);
    }

    function handleResize(event) {
        scene.handleResize(event);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}