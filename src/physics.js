// src/physics.js
import * as CANNON from "cannon-es";

export function initPhysics() {
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.solver.iterations = 10;

  // Ground plane (static)
  const groundBody = new CANNON.Body({ mass: 0 });
  const groundShape = new CANNON.Plane();
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(groundBody);

  // Volleyball (dynamic sphere)
  const radius = 0.12; // realistic volleyball radius ~12cm
  const ballBody = new CANNON.Body({ mass: 0.27, shape: new CANNON.Sphere(radius), material: new CANNON.Material("ball") });
  ballBody.position.set(0, 5, 0);
  world.addBody(ballBody);

  return { world, ballBody };
}
