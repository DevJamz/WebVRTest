/// <reference path='babylon.d.ts' />

// Get our canvas
const canvas = document.getElementById('renderCanvas');

// Create a BabylonJS Engine
const engine = new BABYLON.Engine(canvas, true);


function createScene() {
    // Create Scene
    const scene = new BABYLON.Scene(engine);

    // Create Camera
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, .5, -5), scene);
    camera.attachControl(canvas);
    // Create Light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Materials
    const groundMat = new BABYLON.Texture("../assets/materials/grass_mat.jpg", scene);
    // Create Box
    const box = BABYLON.MeshBuilder.CreateBox('box', {
        size: 1
    }, scene);

    // Create A Sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
        segments: 32,
        diameter: 2,
    }, scene);
    sphere.position = new BABYLON.Vector3(3, 0, 0);

    // Create the Environment
   const environment = scene.createDefaultEnvironment({
        createSkybox: false,
        skyboxSize: 1000,
        skyboxColor: BABYLON.Color3.Teal(),
        createGround: true,
        groundSize: 1,
        groundTexture: groundMat,
        enableGroundShadow: true,
        groundYBias: 0

    });

    
    // Enable VR
    const vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera: false});
    vrHelper.enableTeleportation({floorMeshes: [environment.ground]});

    return  scene;
}




// Create Our Scene
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});