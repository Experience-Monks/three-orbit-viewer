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

    var geo = new THREE.BoxGeometry(1,1,1)
    var mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff })
    var box = new THREE.Mesh(geo, mat)
    app.scene.add(box)

    var time = 0
    app.on('tick', function(dt) {
        time += dt/1000 
        box.rotation.y = ease(Math.sin(time)/2+0.5) * Math.PI
    })
}