var ease = require('eases/expo-in-out')
var domready = require('domready')
var THREE = require('three')

domready(run)
function run() {
    var OrbitViewer = require('../')(THREE)
    var app = OrbitViewer({
        clearColor: 'rgb(50, 50, 50)',
        clearAlpha: 1.0,
        fov: 65,
        position: new THREE.Vector3(1, 1, -2),
        contextAttributes: {
            antialias: false,
            alpha: false
        }
    })

    app.scene.add(new THREE.AmbientLight('rgb(30, 30, 35)'))

    var dir = new THREE.DirectionalLight(0xcfcfcf, 1)
    dir.position.set(20, 40, -15)
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