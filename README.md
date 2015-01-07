# three-orbit-viewer

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Quick harness to create a runnable demo for ThreeJS scenes. For a complete demo, see [three-gl-state-example](https://github.com/mattdesl/three-gl-state-example).

```js
var createOrbitViewer = require('three-orbit-viewer')(THREE)

var app = createOrbitViewer({
    clearColor: 0x000000,
    clearAlpha: 1.0,
    fov: 65,
    position: new THREE.Vector3(1, 1, -2)
})

var geo = new THREE.BoxGeometry(1,1,1)
var mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff })
var box = new THREE.Mesh(geo, mat)
app.scene.add(box)

app.on('tick', function(dt) {
    //.. handle pre-render updates    
})
```

## Usage

[![NPM](https://nodei.co/npm/three-orbit-viewer.png)](https://nodei.co/npm/three-orbit-viewer/)

#### `viewer = createViewer(THREE)([options])`

This module exports a function which accepts the THREE instance, and returns a new function which creates the orbit viewer with the specified options. 

- `fov` field of view, defaults to 50
- `near` the near z depth for the camera, defaults to 0.1
- `far` the far z depth for the camera, defaults to 1000
- `clearColor` the THREE.Color or hex code, default black
- `clearAlpha` the alpha, default 0
- `position` THREE.Vector3 for the initial camera position, defaults to [1, 1, -2]
- `target` THREE.Vector3 for the initial orbit controller's target
- other options that could be passed into [canvas-app](https://www.npmjs.org/package/canvas-app)

#### `viewer.on('tick')`

Listens for tick events before render, dispatched with `dt` as the first and only parameter. Alternatively, you can use `on('render')` for events called after the renderer has finished.

#### `viewer.on('resize')`

Listens for resize events, dispatched with `width, height` as parameters. Camera aspect, renderer viewport, and canvas retina scaling is already taken into account.

#### `viewer.renderer`

Instance of THREE.WebGLRenderer

#### `viewer.scene`

Instance of THREE.Scene

#### `viewer.camera`

Instance of THREE.PerspectiveCamera

#### `viewer.controller`

Instance of [three-orbit-controller](https://www.npmjs.org/package/three-orbit-controller).

#### `viewer.engine`

Instance of [canvas-app](https://www.npmjs.org/package/canvas-app) which you can call `stop()` and `start()` on, or access for current width/height/fps/etc.

## Running the Demo

To build and run the demo, git clone this repo then:

```sh
cd three-orbit-viewer
npm install
npm test
```

And open `localhost:9966` in your browser.

## Versioning

This uses an unusual versioning system to better support ThreeJS's (lack of) versioning. The major version of this repo will line up with ThreeJS releases (`69.0.0` => `r69`). The minor will be reserved for any new features, and patch for bug fixes and documentation/readme updates. In some rare cases, a minor feature may introduce a breaking change; so it's generally safest to use tilde or `save-exact` for this module.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/three-orbit-viewer/blob/master/LICENSE.md) for details.