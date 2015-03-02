var ease = require('eases/expo-in-out')
var domready = require('domready')
var THREE = require('three')

domready(run)
function run() {
    var OrbitViewer = require('../')(THREE)
    var app = OrbitViewer({
        clearColor: 0x000000,
        clearAlpha: 1.0,
        fov: 65,
        position: new THREE.Vector3(1, 1, -2),
        contextAttributes: {
            antialias: false,
            alpha: false
        }
    })

    app.renderer.shadowMapEnabled = true
    app.renderer.shadowMapType = THREE.PCFSoftShadowMap

    var dir = new THREE.DirectionalLight(0xcfcfcf, 1)
    dir.shadowMapWidth = dir.shadowMapHeight = 2048
    dir.shadowCameraNear = 1
    dir.castShadow = true
    dir.shadowDarkness = 0.1
    dir.shadowCameraFar = 1000
    dir.position.set(2, 4, 0)
    app.scene.add(dir)
    
    var geo = new THREE.BoxGeometry(1,1,1)
    var mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
    var box = new THREE.Mesh(geo, mat)
    box.castShadow = true
    app.scene.add(box)

    var time = 0
    app.on('tick', function(dt) {
        time += dt/1000 
        box.rotation.y = ease(Math.sin(time)/2+0.5) * Math.PI
    })
}