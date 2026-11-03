import { initScene } from "./scene.js";
import { initPhysics } from "./physics.js";
import { Game } from "./game.js";

// Create renderer, camera, scene
const { renderer, camera, scene } = initScene();

// Initialise physics world
const physicsWorld = initPhysics();

// Start the game loop
const game = new Game({ renderer, camera, scene, physicsWorld });

game.start();
