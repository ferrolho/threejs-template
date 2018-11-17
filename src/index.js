const Detector = require('./three.js/Detector')
if (!Detector.webgl) Detector.addGetWebGLMessage()

const Gamepad = require('./gamepad.js/gamepad.js')
const gamepad = new Gamepad()

const Stats = require('stats.js')
const stats = new Stats()
stats.dom.id = 'statsjs'
document.body.appendChild(stats.dom)

const THREE = require('three')
require('./three.js/controls/OrbitControls')(THREE)
require('./three.js/loaders/FBXLoader')(THREE)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
$('#threejs-container').append(renderer.domElement)

const cameraTarget = new THREE.Vector3(0, 1, 0)

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 0, 100);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01)

// Orbit Controls
const orbitControls = new THREE.OrbitControls(camera, renderer.domElement)
orbitControls.target = cameraTarget
orbitControls.enableKeys = false
orbitControls.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, PAN: THREE.MOUSE.MIDDLE, ZOOM: THREE.MOUSE.RIGHT }
orbitControls.screenSpacePanning = true
orbitControls.zoomSpeed = 0.8

camera.position.set(10, 10, 10)
camera.lookAt(cameraTarget)
orbitControls.update()

$(document).ready(function () {
    init()
    animate()
})

function init() {
    // Axes Helper
    const axis = new THREE.AxesHelper(1)
    scene.add(axis)

    // Grid Helper
    const grid = new THREE.GridHelper(4)
    grid.material.color.setHex(0x000000)
    grid.material.opacity = 0.2
    grid.material.transparent = true
    scene.add(grid)


    // Lights

    let light = new THREE.HemisphereLight(0xffffff, 0x444444)

    let sun = new THREE.DirectionalLight(0xffffff);
    sun.position.set(0, 20, 10)
    sun.castShadow = true;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.radius = 0.2;

    scene.add(light)
    scene.add(sun)

    scene.add(new THREE.CameraHelper(sun.shadow.camera));


    // Ground

    var mesh = new THREE.Mesh(new THREE.CircleBufferGeometry(100, 20), new THREE.MeshPhongMaterial({ color: 0x608038 }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
}

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshLambertMaterial({ color: 0xaf00af, transparent: true, opacity: 0.8 })
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 1.5, 0)
cube.castShadow = true;
scene.add(cube)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    stats.update()
}

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65: // A
            break
        case 68: // D
            break
        case 83: // S
            break
        case 87: // W
            break
        default:
            console.log('Pressed key code: ' + event.keyCode)
            break
    }
})


/**
 * Gamepad-related stuff.
 */

/*
 * Connection / Disconnection
 */

gamepad.on('connect', e => {
    console.log(`Controller ${e.index} connected!`)
})

gamepad.on('disconnect', e => {
    console.log(`Controller ${e.index} disconnected!`)
})

/*
 * Stick movements
 */

gamepad.on('hold', 'stick_axis_left', e => {
    cube.position.x += e.value[0] * 0.1
    cube.position.z += e.value[1] * 0.1
})

gamepad.on('hold', 'stick_axis_right', e => {
    orbitControls.rotateLeft(e.value[0] * 0.05)
    orbitControls.rotateUp(e.value[1] * 0.03)
    orbitControls.update()
})
