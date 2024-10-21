# Controls
## Introduction
#### `Controls` in A-Frame Extras by Don McCurdy ([GitHub Source](https://github.com/donmccurdy/aframe-extras/tree/master/src/controls))
Allows us to declare `custom-controls`
```html
<script>
AFRAME.registerComponent('custom-controls', {
  isVelocityActive: function () {
    return Math.random() < 0.25;
  },
  getPositionDelta: function () {
    return new THREE.Vector3(1, 0, 0);
  }
});
</script>
```
Listen for the Oculus Touch X button
```javascript
AFRAME.registerComponent('x-button-listener', {
  init: function () {
    var el = this.el;
    el.addEventListener('xbuttondown', function (evt) {
      el.setAttribute('visible', !el.getAttribute('visible'));
    });
  }
});
```
Then attach the component to the entity
```html
<a-entity oculus-touch-controls x-button-listener></a-entity>
```
#### `gamepad-controls` ([GitHub Source](https://github.com/donmccurdy/aframe-extras/blob/master/src/controls/gamepad-controls.js))
Includes a rotate function
```javascript
updateRotation: function (dt) {
    if (!this.isRotationActive()) return;

    const data = this.data;
    const yaw = this.yaw;
    const pitch = this.pitch;
    const lookControls = data.camera.components['look-controls'];
    const hasLookControls = lookControls && lookControls.pitchObject && lookControls.yawObject;

    // Sync with look-controls pitch/yaw if available.
    if (hasLookControls) {
      pitch.rotation.copy(lookControls.pitchObject.rotation);
      yaw.rotation.copy(lookControls.yawObject.rotation);
    }

    const lookVector = this.getJoystick(1);

    if (Math.abs(lookVector.x) <= JOYSTICK_EPS) lookVector.x = 0;
    if (Math.abs(lookVector.y) <= JOYSTICK_EPS) lookVector.y = 0;

    lookVector.multiplyScalar(data.rotationSensitivity * dt / 1000);
    yaw.rotation.y -= lookVector.x;
    pitch.rotation.x -= lookVector.y;
    pitch.rotation.x = Math.max(- Math.PI / 2, Math.min(Math.PI / 2, pitch.rotation.x));
    data.camera.object3D.rotation.set(pitch.rotation.x, yaw.rotation.y, 0);

    // Sync with look-controls pitch/yaw if available.
    if (hasLookControls) {
      lookControls.pitchObject.rotation.copy(pitch.rotation);
      lookControls.yawObject.rotation.copy(yaw.rotation);
    }
  },
```
#### `keyboard-controls` ([GitHub Source](https://github.com/donmccurdy/aframe-extras/blob/master/src/controls/keyboard-controls.js))
Declares keypress values
```javascript
getVelocityDelta: function () {
    const data = this.data,
        keys = this.getKeys();

    this.dVelocity.set(0, 0, 0);
    if (data.enabled) {
      if (keys.KeyW || keys.ArrowUp)    { this.dVelocity.z -= 1; }
      if (keys.KeyA || keys.ArrowLeft)  { this.dVelocity.x -= 1; }
      if (keys.KeyS || keys.ArrowDown)  { this.dVelocity.z += 1; }
      if (keys.KeyD || keys.ArrowRight) { this.dVelocity.x += 1; }
    }

    return this.dVelocity.clone();
  },
```
#### A-Frame Touch Rotation Controls by Allan Weir ([GitHub Source](https://github.com/allofusdev/aframe-touch-rotation-controls/blob/master/dist/aframe-touch-rotation-controls.js))
Extends `Controls` to add `touch-rotation-controls`
```javascript
AFRAME.registerComponent('touch-rotation-controls', {
	/**
	 * Touch Rotation controls.
	 *
	 * Based on: https://github.com/aframevr/aframe/pull/1056
	 */
	  schema: {
	    enabled: { default: true },
	    sensitivity: { default: 1 / 25 }
	  },

	  init: function () {
	    this.touchDown = false;
	    this.lookVector = new THREE.Vector2();
	    this.bindMethods();
	  },

	  play: function () {
	    this.addEventListeners();
	  },

	  pause: function () {
	    this.removeEventListeners();
	    this.lookVector.set(0, 0);
	  },

	  remove: function () {
	    this.pause();
	  },

	  bindMethods: function () {
	    this.onTouchStart = this.onTouchStart.bind(this);
	    this.onTouchMove = this.onTouchMove.bind(this);

	    this.onTouchEnd = this.onTouchEnd.bind(this);
	    this.onTouchCancel = this.onTouchCancel.bind(this);
	  },

	  addEventListeners: function () {
	    var sceneEl = this.el.sceneEl;
	    var canvasEl = sceneEl.canvas;

	    if (!canvasEl) {
	      sceneEl.addEventListener('render-target-loaded', this.addEventListeners.bind(this));
	      return;
	    }

	    canvasEl.addEventListener('touchstart', this.onTouchStart, false);
	    canvasEl.addEventListener('touchmove', this.onTouchMove, false);
	    canvasEl.addEventListener('touchend', this.onTouchEnd, false);
	    canvasEl.addEventListener('touchcancel', this.onTouchCancel, false);
	  },

	  removeEventListeners: function () {
	    var canvasEl = this.el.sceneEl && this.el.sceneEl.canvas;
	    if (canvasEl) {
	      canvasEl.removeEventListener('touchstart', this.onTouchStart, false);
	      canvasEl.removeEventListener('touchmove', this.onTouchMove, false);
	      canvasEl.removeEventListener('touchend', this.onTouchEnd, false);
	      canvasEl.removeEventListener('touchcancel', this.onTouchCancel, false);
	    }
	  },

	  isRotationActive: function () {
	    return this.data.enabled && this.touchDown;
	  },

	  /**
	   * Returns the sum the touch movement since last call.
	   */
	  getRotationDelta: function () {
	    var dRotation = this.lookVector.clone().multiplyScalar(this.data.sensitivity);
	    this.lookVector.set(0, 0);
	    return dRotation;
	  },

	  onTouchMove: function (event) {
	    if (!this.data.enabled || !this.touchDown) {
	      return;
	    }

		var touch = event.touches[0];
		var movementX = touch.screenX - this.previousTouchX;
		var movementY = touch.screenY - this.previousTouchY;
		this.lookVector.x += movementX;
		this.lookVector.y += movementY;

		this.previousTouchX = touch.screenX;
		this.previousTouchY = touch.screenY;
	  },

	  onTouchStart: function (event) {
	    this.touchDown = true;
	    this.previousTouchX = event.touches[0].x;
		this.previousTouchY = event.touches[0].y;
	  },

	  onTouchEnd: function () {
		this.touchDown = false;
	  },

	  onTouchCancel: function () {
	    this.touchDown = false;
	  }

	});
```