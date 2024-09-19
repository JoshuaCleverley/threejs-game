import * as THREE from 'three';
import { DEG2RAD } from 'three/src/math/MathUtils';

export function createCamera() {
    // Button constants
    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;

    // Camera rotation settings
    const ROTATION_SENSITIVITY = 0.5;
    const MAX_ANGLE = 90;
    const MIN_ANGLE = 0;

    // Camera zoom settings
    const ZOOM_SENSITIVITY = 0.25;
    const MAX_RADIUS = 10;
    const MIN_RADIUS = 2;

    // Other camera settings
    const FOV = 75;
    const NEAR_CLIPPING_PLANE = 0.1;
    const FAR_CLIPPING_PLANE = 1000;
    
    // Default camera values
    let cameraOrigin = new THREE.Vector3(0, 0, 0);
    let cameraRadius = 4;
    let cameraAzimuth = 0;
    let cameraElevation = 30;

    // Mouse state
    let isButtonsDown = [false, false, false]
    let prevMouseX = 0;
    let prevMouseY = 0;

    let attachedMesh = null;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR_CLIPPING_PLANE, FAR_CLIPPING_PLANE);
    updateCameraPosition();

    function tick() {
        if (attachedMesh) cameraOrigin = attachedMesh.position;
        console.log(cameraOrigin);
        updateCameraPosition();
    }

    function attach(mesh) {
        attachedMesh = mesh;
    }

    // Functions to handle button down state
    function onMouseDown(event) {
        isButtonsDown[event.button] = true;
    }

    function onMouseUp(event) {
        isButtonsDown[event.button] = false;
    }

    function onMouseMove(event) {
        if (isButtonsDown[MIDDLE_MOUSE_BUTTON]) {
            // Rotate camera when middle mouse button pressed and mouse moved
            let deltaX = event.clientX - prevMouseX;
            let deltaY = event.clientY - prevMouseY;

            cameraAzimuth -= deltaX * ROTATION_SENSITIVITY;
            cameraElevation += deltaY * ROTATION_SENSITIVITY;
            cameraElevation = Math.min(MAX_ANGLE, Math.max(MIN_ANGLE, cameraElevation));

            updateCameraPosition();
        }

        // Update previous mouse position every time the mouse is moved
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }

    function onScroll(event) {
        // Change camera radius on mouse scroll wheel
        cameraRadius += Math.sign(event.deltaY) * ZOOM_SENSITIVITY;
        cameraRadius = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, cameraRadius));

        updateCameraPosition();
    }

    function updateCameraPosition() {
        // Calculate new position for the camera relative to its origin
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.add(cameraOrigin);

        // Look at the origin, and update camera transform
        camera.lookAt(cameraOrigin);
        camera.updateMatrix();
    }

    return { 
        camera,
        tick,
        attach,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onScroll,
    }
}