import { UniversalCamera, Vector3, ActionManager, ExecuteCodeAction } from '@babylonjs/core';

function mapKeysToControls(camera, forwardKey, backwardKey, leftKey, rightKey) {
    // Create ActionManager for the camera if it doesn't exist
    camera.actionManager = camera.actionManager || new ActionManager(camera.getScene());

    // Set up key down event handlers
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyDownTrigger,
            parameter: forwardKey
        },
        function () { camera.cameraDirection.y += 1; }
    ));
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyDownTrigger,
            parameter: backwardKey
        },
        function () { camera.cameraDirection.y -= 1; }
    ));
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyDownTrigger,
            parameter: leftKey
        },
        function () { camera.cameraDirection.x -= 1; }
    ));
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyDownTrigger,
            parameter: rightKey
        },
        function () { camera.cameraDirection.x += 1; }
    ));

    // Set up key up event handlers
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyUpTrigger,
            parameter: forwardKey
        },
        function () { camera.cameraDirection.y -= 1; }
    ));
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyUpTrigger,
            parameter: backwardKey
        },
        function () { camera.cameraDirection.y += 1; }
    ));
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyUpTrigger,
            parameter: leftKey
        },
        function () { camera.cameraDirection.x += 1; }
    ));
    camera.actionManager.registerAction(new ExecuteCodeAction(
        {
            trigger: ActionManager.OnKeyUpTrigger,
            parameter: rightKey
        },
        function () { camera.cameraDirection.x -= 1; }
    ));
}

export function toggleFlyMode(camera) {
    camera.applyGravity = !camera.applyGravity; // Toggle gravity
    if (camera.applyGravity) { // If gravity is enabled
        scene.gravity = new Vector3(0, -9.8, 0); // Set the gravity to be -9.8 units per second squared in the Y direction
    } else { // If gravity is not enabled
        scene.gravity = new Vector3(0, 0, 0); // No gravity
        mapKeysToControls(camera, "e", "q", "9", "7"); // Add controls for up (E or 9) and down (Q or 7)
    }
}


export function createCamera(scene, canvas) {
    const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1.6, -10), scene);
    camera.attachControl(canvas, true);
    camera.speed = 0.1;
    camera.stepHeight = 0.5;
    camera.angularSensibility = 1000;
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new Vector3(.5, 2, .5);
    camera.ellipsoidOffset = new Vector3(0, 1, 0);

    mapKeysToControls(camera, "w", "s", "a", "d");

    // Set the gravity to be -9.8 units per second squared in the Y direction
    scene.gravity = new Vector3(0, -9.8, 0);
    return camera;
}
