var createApp = require('canvas-app')
var createControls = require('three-orbit-controls')
var domready = require('domready')
var Emitter = require('events/')
var xtend = require('xtend')
var number = require('as-number')

module.exports = function(THREE) {
    var OrbitControls = createControls(THREE)
    return function(opt) {
        opt = opt||{}

        var emitter = new Emitter()

        var setup = function(gl, width, height) {
            emitter.renderer = new THREE.WebGLRenderer({
                canvas: gl.canvas
            })

            var clearColor = 0x000000
            if (opt.clearColor || typeof opt.clearColor === 'number')
                clearColor = opt.clearColor

            var clearAlpha = opt.clearAlpha||0
            emitter.renderer.setClearColor(clearColor, clearAlpha)

            var fov = number(opt.fov, 50)
            emitter.scene = new THREE.Scene()
            emitter.camera = new THREE.PerspectiveCamera(fov, width/height, 1, 1000)
            
            var position = opt.position || new THREE.Vector3(1, 1, -2)
            var target = opt.target || new THREE.Vector3()

            emitter.camera.position.copy(position)
            emitter.camera.lookAt(target)

            emitter.controls = new OrbitControls(emitter.camera)
            emitter.controls.target.copy(target)
        }

        var render = function(gl, width, height, dt) {
            emitter.emit('tick', dt)
            emitter.renderer.render(emitter.scene, emitter.camera)
        }

        var resize = function(width, height) {
            if (!emitter.renderer)
                return

            emitter.renderer.setViewport(0, 0, width, height)
            emitter.camera.aspect = width/height
            emitter.camera.updateProjectionMatrix()

            emitter.emit('resize', width, height)
        }

        var engine = createApp(render, xtend(opt, { 
            context: 'webgl',
            onResize: resize
        }))
        emitter.engine = engine
        
        document.body.appendChild(engine.canvas)
        document.body.style.margin = "0"
        document.body.style.overflow = "hidden"
        
        setup(engine.context, engine.width, engine.height)
        engine.start()

        return emitter
    }
}