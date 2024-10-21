# Player Rig
## Built In
The player rig is pre-configured and ready to go in dlux boilerplates. You don't need to do anything to make it work.
## Install
If you are starting from scratch and would like to build the player rig, you will need:
* Controls in A-Frame Extras by Don McCurdy ([GitHub Source](https://github.com/donmccurdy/aframe-extras/tree/master/src/controls))
* Pathfinding in A-Frame Extras by Don McCurdy ([GitHub Source](https://github.com/donmccurdy/aframe-extras/tree/master/src/pathfinding))
* A-Frame Teleport Controls by Fernando Serrano ([GitHub Source](https://github.com/fernandojsg/aframe-teleport-controls))
* A-Frame AABB Collider by Kevin Ngo ([GitHub Source](https://github.com/supermedium/superframe/tree/master/components/aabb-collider))
* Super Hands by Will Murphy ([GitHub Source](https://github.com/wmurphyrd/aframe-super-hands-component))
* Networked A-Frame by Hayden Lee ([GitHub Source](https://github.com/networked-aframe/networked-aframe))
```html
<html>
<head>
<script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.js"></script>
<script src="https://rawgit.com/fernandojsg/aframe-teleport-controls/master/dist/aframe-teleport-controls.min.js"></script>
<script src="https://unpkg.com/aframe-aabb-collider-component@^2.2.1/dist/aframe-aabb-collider-component.min.js"></script>
<script src="https://rawgit.com/wmurphyrd/aframe-super-hands-component/master/dist/super-hands.min.js"></script>
<script src="https://unpkg.com/networked-aframe@^0.6.0/dist/networked-aframe.min.js"></script>
</head>
```
## Setup
You can think of the player as a body that moves throughout the world and has a camera for a head.

1. Use `movement-controls`, a Collection of locomotion controls, which can switch between input devices as they become active. Automatically includes the following components:
    * keyboard-controls: WASD + arrow controls for movement, and more.
    * touch-controls: Touch screen (or Cardboard button) to move forward.
    * gamepad-controls: Gamepad-based rotation and movement.
    * trackpad-controls: Trackpad-based movement.
```html
<body>
<a-scene>
  <a-entity id="player"
      position="0 0 0"
      movement-controls="constrainToNavMesh: true">
    <a-entity camera id="head"
        position="0 1.6 0"
        look-controls="pointerLockEnabled: true">
      <a-cursor nav-pointer
          raycaster="objects: [nav-mesh]">
      </a-cursor>
    </a-entity>
  </a-entity>
</a-scene>
</body>
</html>
```
2. Create a floor for the player using `nav-mesh`, covered in detail here: [Navmesh](https://github.com/dluxio/dluxio/wiki/Navmesh)
```html
<a-scene>
  <a-entity gltf-model="navmesh.gltf" nav-mesh></a-entity>
  ...
```
3. Add controller support for Oculus Rift, HTC Vive, and Gear VR with `laser-controls` and `teleport-controls`
```html
<body>
<a-scene>
  <a-entity gltf-model="navmesh.gltf" nav-mesh></a-entity>

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
      teleport-controls="button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];"></a-entity>
    <a-entity laser-controls="hand: right;"
      teleport-controls="button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];" ></a-entity>
  </a-entity>
</a-scene>
</body>
</html>
```
* Include the script for `nav-pointer` in the page head
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
4. Add AABB Collider to the player to collide (in this case the class `.box`)
```html
<a-entity id="player"
          movement-controls="constrainToNavMesh: true"
          position="7 0 -18"
          aabb-collider="objects: .box"
          networked="template:#player-template;attachTemplateToLocal:true;">
```
5. Add Super Hands to the controls to grab (in this case primitives `a-box`)
```html
<a-entity laser-controls="hand: left;"
          sphere-collider="objects: a-box" super-hands
          teleport-controls="button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];">
</a-entity>
<a-entity laser-controls="hand: right;"
          sphere-collider="objects: a-box" super-hands
          teleport-controls="button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];" >
</a-entity>
```
6. Add Networked A-Frame Templates
* Templates are defined in `<a-assets>`
```html
<a-assets>

<!-- Templates -->

  <!-- Player -->
  <template id="player-template">
    <a-entity>
      <a-entity class="nametag" look-at="#player" text="value: Hello World; align:center;" position="0 2.5 0" rotation="0 180 0" scale="8 8 8">
      </a-entity>
    </a-entity>
  </template>

  <!-- Head -->
  <template id="head-template">
    <a-entity class="avatar" networked-audio-source>
      <a-sphere class="head"
          color="#ffffff"
          scale="0.45 0.5 0.4">
      </a-sphere>
      <a-entity class="face"
          position="0 0.05 0">
        <a-sphere class="eye"
            color="#efefef"
            position="0.16 0.1 -0.35"
            scale="0.12 0.12 0.12">
          <a-sphere class="pupil"
              color="#000"
              position="0 0 -1"
              scale="0.2 0.2 0.2">
          </a-sphere>
        </a-sphere>
        <a-sphere class="eye"
            color="#efefef"
            position="-0.16 0.1 -0.35"
            scale="0.12 0.12 0.12">
          <a-sphere class="pupil"
              color="#000"
              position="0 0 -1"
              scale="0.2 0.2 0.2">
          </a-sphere>
        </a-sphere>
      </a-entity>
    </a-entity>
  </template>

  <!-- Hand -->
  <template id="hand-template">
    <a-entity>
      <a-box scale="0.1 0.1 0.1"></a-box>
    </a-entity>
  </template>
        
</a-assets>  
```
* declare templates on the player rig
```html
<a-entity id="player"
          movement-controls="constrainToNavMesh: true"
          position="7 0 -18"
          networked="template:#player-template;attachTemplateToLocal:true;">
  <a-entity camera id="head"
            position="0 1.6 0"
            look-controls="pointerLockEnabled: true"
            networked="template:#head-template;attachTemplateToLocal:false;">
```
