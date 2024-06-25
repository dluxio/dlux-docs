### Use
At this time, dlux does not use `aframe-physics-system` by Don McCurdy ([GitHub Source](https://github.com/donmccurdy/aframe-physics-system)) by default.

To create collisions with the ground, floor, and walls, we recommend a nav mesh to restrict player movement.

A nav mesh is an invisible floor that the player is allowed to move on. For example, if you do not want a player to walk through a wall, there should be a gap in the nav mesh so they are not permitted to move there.

This approach has better performance, and allows the use of glTF files with shapes more complex than primitive geometries, meaning your ground can be varied terrain, not just flat. Interaction with static and dynamic objects can be achieved with AABB Collider and SuperHands.

If you need physics, keep reading.

To use the physics system, you must attach body components to the entities you want to participate in the physics system:
* `static-body` for the ground, floor, and walls
* `dynamic-body` for anything that's moveable
* `kinematic-body` for the camera rig (not required)

Each body requires a shape
Ideally, we would use a model for our world, which would have varied terrain in a glTF format as we do with `nav-mesh`. Set its body type to static and its shape to mesh. 
```html
<!-- World -->
<a-entity gltf-model="navmesh.gltf"
          static-body="shape: mesh"
          nav-mesh></a-entity
```
Unfortunately, "shape: mesh" is depreciated, and does not work with the `kinematic-body`. Therefore, complex shapes are not supported, only simple geometries, like ramps, boxes, and spheres, where shape typically doesn't need to be defined, and the default is auto.

The big drawback to using the physics system is you can't have varied terrain for the floor because shape: mesh is depreciated. If your scene has a flat floor and you want to use physics, here's how:

### Install
You will need:
* A-Frame
* A-Frame Extras
* A-Frame Physics System
* A-Frame Teleport Controls
```html
<head>
<script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
<script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.js"></script>
<script src="https://cdn.rawgit.com/donmccurdy/aframe-physics-system/v3.3.0/dist/aframe-physics-system.min.js"></script>
<script src="https://rawgit.com/fernandojsg/aframe-teleport-controls/master/dist/aframe-teleport-controls.min.js"></script>
</head>
```
Add a `static-body` floor (primitives only)
```html
<a plane id="floor" static-body height="20" width="20"></plane>
```
Add a `kinematic-body` camera rig