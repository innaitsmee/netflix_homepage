import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function getPoint() {
  var u = Math.random();
  var v = Math.random();
  var theta = u * 2.0 * Math.PI;
  var phi = Math.acos(2.0 * v - 1.0);
  var r = Math.cbrt(Math.random());
  var sinTheta = Math.sin(theta);
  var cosTheta = Math.cos(theta);
  var sinPhi = Math.sin(phi);
  var cosPhi = Math.cos(phi);
  var x = r * sinPhi * cosTheta;
  var y = r * sinPhi * sinTheta;
  var z = r * cosPhi;
  return { x: x, y: y, z: z };
}

class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 0); //1 => 0

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    );

    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;
    this.pointer = new THREE.Vector2();

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    this.setupPointer();
    this.setupColorChange();
    this.setupCameraMove();
  }

  setupCameraMove() {
    window.addEventListener("mousemove", () => {
      this.changeCameraPosition(...this.pointer, this.plane.position);
    });
  }

  setupColorChange() {
    window.addEventListener("mousemove", () => {
      this.setColor(...this.pointer);
    });
  }

  setupPointer() {
    window.addEventListener("mousemove", this.setCoordinates.bind(this));
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  changeCameraPosition(x, y, z) {
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.lookAt(z);
  }

  setColor(x, y, z = 0.5) {
    this.material.color.setRGB(x, y, z);
  }

  setCoordinates(e) {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.texture = new THREE.TextureLoader().load("/images/texture.webp");

    this.material = new THREE.PointsMaterial({
      size: 0.01,
      sizeAttenuation: true,
      alphaTest: 0.5,
      transparent: true,
      map: this.texture,
    });

    this.geometry = new THREE.BufferGeometry();
    let vertices = [];

    for (let i = 0; i < 10000; i++) {
      let p = getPoint();

      vertices.push(4 * p.x, 4 * p.y, 4 * p.z);
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    this.plane = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  render() {
    this.time += 0.05;

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

export let sketch = new Sketch({
  dom: document.getElementById("wrapper"),
});
