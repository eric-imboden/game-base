// Import the required modules from BabylonJS
import { 
    Engine, Scene, Vector3, SceneLoader, UniversalCamera, MeshBuilder, 
    StandardMaterial, Color3, HemisphericLight 
} from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import { Inspector } from "@babylonjs/inspector";
import BabylonScene from "../assets/models/base.glb";  // needed by file-loader

// Define the path to the BabylonScene
let BabylonScenePath = "/assets/models/";

// Get the canvas element
const canvas = document.getElementById("renderCanvas");

// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true); 

const createScene = function () {
    // Create a new scene
    const scene = new Scene(engine);

    // Create a Universal Camera and set its position
    const camera = new UniversalCamera("UniversalCamera", new Vector3(3, 10, 3), scene);
    camera.speed = 0.6; // Set the camera speed
    camera.angularSensibility = 1500; // Set the camera rotation speed
    camera.inertia = 0.5; // Set the camera stop smoothness
    camera.checkCollisions = true; // Enable collision for camera
    camera.collisionRadius = new Vector3(0.5, 0.5, 0.5); // Set the collision radius for the camera
    camera.stepHeight = 1.0; // Enable the camera to climb steps
    camera.setTarget(Vector3.Zero()); // Set initial camera target
    camera.applyGravity = true; // Apply gravity to the camera
    camera.ellipsoid = new Vector3(0.5, 1.7, 0.5); // Set the ellipsoid for the camera
    camera.ellipsoidOffset = new Vector3(0.5, 1, 0.5); // Set the ellipsoid offset for the camera
    camera.attachControl(canvas, true); // Attach the camera controls to the canvas
    scene.activeCamera = camera; // Make this the active camera

    var floorBaked;
    var cubeBaked;

    // Import mesh and enable collision for specific meshes
    SceneLoader.ImportMesh("", BabylonScenePath, "base.glb", scene, function (meshes) {
        floorBaked = scene.getMeshByName("Floor_Baked");
        cubeBaked = scene.getMeshByName("Cube_Baked");
    
        if(floorBaked) {
            floorBaked.checkCollisions = true; // Enable collision for the floorBaked
        } else {
            console.error("Floor_Baked object not found");
        }
    
        if(cubeBaked) {
            cubeBaked.checkCollisions = true; // Enable collision for the cubeBaked
        } else {
            console.error("Cube_Baked object not found");
        }
    });


    // Set gravity for the scene
    const framesPerSecond = 60;
    const gravity = -9.81;
    scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);

    return scene;
};

// Call the createScene function to create a new scene
const scene = createScene();

// Show the inspector
Inspector.Show(scene, {
    embedMode: true,
});

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events and resize the engine accordingly
window.addEventListener("resize", function () {
    engine.resize();
});
