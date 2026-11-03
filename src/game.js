// src/game.js
import * as THREE from "three";
import { Clock } from "three";

export class Game {
  /**
   * @param {object} params
   * @param {THREE.WebGLRenderer} params.renderer
   * @param {THREE.PerspectiveCamera} params.camera
   * @param {THREE.Scene} params.scene
   * @param {object} params.physicsWorld - { world, ballBody }
   */
  constructor({ renderer, camera, scene, physicsWorld }) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.world = physicsWorld.world;
    this.ballBody = physicsWorld.ballBody;
    this.clock = new Clock();
    this.isRunning = false;

    // Simple visual for the ball
    const ballGeo = new THREE.SphereGeometry(0.12, 32, 32);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.ballMesh = new THREE.Mesh(ballGeo, ballMat);
    this.scene.add(this.ballMesh);
  }

  start() {
    this.isRunning = true;
    this._animate();
  }

  stop() {
    this.isRunning = false;
  }

  _animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this._animate());
    const delta = this.clock.getDelta();
    this._updatePhysics(delta);
    this.renderer.render(this.scene, this.camera);
  }

  _updatePhysics(delta) {
    // Step the physics world
    this.world.step(1 / 60, delta, 3);
    // Sync ball visual with physics body
    const p = this.ballBody.position;
    this.ballMesh.position.set(p.x, p.y, p.z);
  }
}
