# Navmesh
## What & Why
As the player moves around the world, we must define where the player may and may not go. The best way to achieve high performance is by defining a navmesh.

> A navigation mesh, or navmesh, is an abstract data structure used in artificial intelligence applications to aid agents in pathfinding through complicated spaces. This approach has been known since at least the mid-1980s in robotics, where it has been called a meadow map, and was popularized in video game AI in 2000. [_Wikipedia_](https://en.wikipedia.org/wiki/Navigation_mesh)

A navmesh is a simplified version of the floor, and can be used for collision detection with teleportation controls, as well as constraining movement controls.

### Built into dlux
Navmesh comes built into dlux boilerplates, and should be updated as the scene changes. Once you build your scene, create a navmesh, then reference it in the scene by linking to it in this line of code:
```html
<a-entity gltf-model="navmesh.gltf" nav-mesh></a-entity>
```

# How to Create a Navmesh
> In the easiest case, a nav mesh can just be a simple mesh covering parts of the scene where characters are allowed to travel. Stairs become ramps, and obstacles are holes in the mesh. [_Don McCurdy_](https://medium.com/@donmccurdy/creating-a-nav-mesh-for-a-webvr-scene-b3fdb6bed918)

There are many different ways to create the glTF for your navmesh. Here are some of the workflows we have had success with.
## Navigation Mesh A-Frame Inspector Plugin ([GitHub Source](https://github.com/donmccurdy/aframe-inspector-plugin-recast))
Don McCurdy's plugin for the A-Frame Inspector allows creating of a navigation mesh from an existing A-Frame scene 

![A-Frame Inspector Plugin Recast](https://user-images.githubusercontent.com/1848368/40598442-a2d92fac-61fc-11e8-9dfe-4de1c56ee6e6.gif)

> [Kitchen v2](https://poly.google.com/view/dC70BOz1Ju-) by Jerad Bitner, on Google Poly.

1. Create your scene
2. Use [this](https://github.com/donmccurdy/aframe-inspector-plugin-recast) plugin to create and test a navigation mesh
* Add this to your scene head:
```html
<script src="https://recast-api.donmccurdy.com/aframe-inspector-plugin-recast.js"></script>
```
* Add `inspector-plugin-recast` to your `<a-scene>` tag:
```html
<a-scene inspector-plugin-recast> ...
```
* Press **Ctl-Alt-I** to access the inspector
* Click `Build` to see the mesh
* Adjust parameters and click `Build` until desired mesh is achieved
3. Export the navigation mesh as a glTF file
4. Load the final navigation mesh into your scene as a normal model
```html
<a-entity gltf-model="navmesh.gltf" nav-mesh></a-entity>
```
## In Tinkercad
1. Create your scene
2. Create a **_seperate_** floor model for your scene. It will be invisible later
* Draw planes (flat, angled, etc) to represent where players can walk
* Leave gaps for walls and areas the player can't go
* Then group all planes into one model
3. Isolate and export only the floor model as OBJ
4. Convert the OBJ to glTF with [Cesium](http://52.4.31.236/convertmodel.html)
5. Load the final navigation mesh into your scene as a normal model
```html
<a-entity gltf-model="navmesh.gltf" nav-mesh></a-entity>
```
## In Blender
See Don McCurdy's post here: [https://medium.com/@donmccurdy/creating-a-nav-mesh-for-a-webvr-scene-b3fdb6bed918](https://medium.com/@donmccurdy/creating-a-nav-mesh-for-a-webvr-scene-b3fdb6bed918)
## Using A-Frame Primitives
You can make a navigation mesh in A-Frame using a primitive, but only one navmesh is supported in a scene. This works fine for a big flat floor, but being limited to one primitive doesn't work for building varied terrain, which instead requires one of the other methods of generating a glTF to use for the navmesh.
```html
<a-scene renderer="gammaOutput: true" background="color: lightblue;">

  <!-- CAMERA -->
  <a-entity id="rig" movement-controls="constrainToNavMesh: true;">
    <a-entity camera look-controls="pointerLockEnabled: true;" position="0 1.6 0"></a-entity>
  </a-entity>
  
  <!-- STAGE -->
  <a-entity scale="0.5 1 1">
    <a-entity geometry="primitive: plane; height: 10; width: 10;"
              material="color: indigo; side: double;"
              rotation="-90 0 0"
              nav-mesh></a-entity>
  </a-entity>

</a-scene>
```

# How to Test a Navmesh
Go to [https://gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com) and drop in your glTF file.

Click on the Performance disclosure triangle to view performance stats. Your navmesh.gltf should achieve 60 fps or higher for smooth performance.

# How to Use a Navmesh
Now that you have created a navmesh for your scene, you must reference it in your scene.

### Built in to dlux
If you're working from a dlux boilerplate, this is as simple as linking to it in the line
```html
<a-entity gltf-model="navmesh.gltf" nav-mesh></a-entity>
```
### Start from scratch
If you're not, here are some step-by-step instructions to get navmesh working in A-Frame.

We will be using:
* Pathfinding in A-Frame Extras by Don McCurdy ([GitHub Source](https://github.com/donmccurdy/aframe-extras/tree/master/src/pathfinding))
* Controls in A-Frame Extras by Don McCurdy ([GitHub Source](https://github.com/donmccurdy/aframe-extras/tree/master/src/controls))
* A-Frame Teleport Controls by Fernando Serrano ([GitHub Source](https://github.com/fernandojsg/aframe-teleport-controls))

```html
<html>
<head>

<script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.js"></script>
<script src="https://rawgit.com/fernandojsg/aframe-teleport-controls/master/dist/aframe-teleport-controls.min.js"></script>

</head>
```
Define the navmesh in your scene
```html
<body>
  <a-scene>
    <a-entity gltf-model="navmesh.gltf" nav-mesh></a-entity>
```
Your player should be set up as a camera rig, with the head being your camera, and look something like this:
```html
<a-entity id="player"
     position="0 0 0"
     movement-controls="constrainToNavMesh: true">
   <a-entity camera id="head"
     position="0 1.6 0"
     look-controls="pointerLockEnabled: true">
      <a-cursor nav-pointer
           raycaster="objects: [nav-mesh]"></a-cursor>
   </a-entity>
   <a-entity laser-controls="hand: left;"
        teleport-controls="button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];">
   </a-entity>
   <a-entity laser-controls="hand: right;"
         teleport-controls="button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];" >
   </a-entity>
</a-entity>
</a-scene>
</body>
</html>
```
Finally, you need to add a bit of script for `nav-pointer`. This is already done in dlux.js, and can be added to an existing file, or inline:
```html
<head>
...
<script>
AFRAME.registerComponent('nav-pointer', {
  init: function () {
    const el = this.el;
    // On click, send the NPC to the target location.
    el.addEventListener('click', (e) => {
      const ctrlEl = el.sceneEl.querySelector('[nav-agent]');
      ctrlEl.setAttribute('nav-agent', {
        active: true,
        destination: e.detail.intersection.point
      });
    });
    // When hovering on the nav mesh, show a green cursor.
    el.addEventListener('mouseenter', () => {
      el.setAttribute('material', {color: 'green'});
    });
    el.addEventListener('mouseleave', () => {
      el.setAttribute('material', {color: 'crimson'})
    });
 
    // Refresh the raycaster after models load.
    el.sceneEl.addEventListener('object3dset', () => {
      this.el.components.raycaster.refreshObjects();
    });
  }
});
</script>
</head>
```
[Remix this example on Glitch](https://right-volcano.glitch.me)
