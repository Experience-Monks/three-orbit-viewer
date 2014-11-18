# three-orbit-viewer

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Quick harness for viewing a mesh with orbit viewer.

## Usage

[![NPM](https://nodei.co/npm/three-orbit-viewer.png)](https://nodei.co/npm/three-orbit-viewer/)

#### `createViewer(THREE)([options])`

This module exports a function which accepts the THREE instance, and returns a new function which creates the orbit viewer with the specified options. 

#### Versioning

Because of ThreeJS's versioning, the safest choice is to use `--save-exact` when installing this module (no tilde or caret). The minor version should line up with major ThreeJS releases, e.g. `0.69.0` => `r69`. Please submit a PR or issue if you notice any issues going forward. 

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/three-orbit-viewer/blob/master/LICENSE.md) for details.