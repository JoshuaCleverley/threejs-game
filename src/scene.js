import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Terrain from '@/terrain';

export default class Scene extends THREE.Scene {
    constructor(renderer, stats, gui) {
        super();

        this.renderer = renderer;
        this.stats = stats;
        this.gui = gui;

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.terrain = new Terrain(10, 10);

        this.camera.position.set( 0, 10, 10 );
        this.controls.update();
    }

    initialize() {
        this.clear();
        this.add(this.terrain);
        
        this.setupLights();
        this.setupGui();
    }

    setupGui() {
        const terrainFolder = this.gui.addFolder("Terrain");
        terrainFolder.add(this.terrain, 'width', 1, 20, 1).name('width');
        terrainFolder.add(this.terrain, 'height', 1, 20, 1).name('height');
        terrainFolder.addColor(this.terrain.material, 'color');
        terrainFolder.onChange(() => {
            this.terrain.updateGeometry();
        });
    }

    // Lights
    setupLights() {
        const ambient = new THREE.AmbientLight();
        ambient.intensity = 0.5;

        const sun = new THREE.DirectionalLight();
        sun.position.set(1,2,3)

        this.add(ambient, sun);
    }

    tick() {
    }

    draw(scene) {
        // Render the frame
        scene.stats.update();
        scene.controls.update();
        scene.renderer.render(scene, scene.camera);
    }

    start() {
        // Starts the animation loop, running draw every frame
        this.renderer.setAnimationLoop(() => {
            this.draw(this);
        });
    }

    stop() {
        // Stops the animation loop
        this.renderer.setAnimationLoop(null);
    }

    handleResize(event) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}