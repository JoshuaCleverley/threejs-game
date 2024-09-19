import * as THREE from 'three';

export default class Terrain extends THREE.Mesh {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.material = new THREE.MeshStandardMaterial({ color: 0x50a000 });
        this.rotation.x = -Math.PI / 2;
        this.updateGeometry();
    }

    updateGeometry() {
        this.geometry.dispose();
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
    }
}