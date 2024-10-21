# AR Marker

## Install 

Install `AR.js` by Jerome Etienne ([GitHub Source](https://github.com/jeromeetienne/AR.js))

```html
<!doctype HTML>
<html>
<script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js"></script>
  <body style="margin : 0px; overflow: hidden;">
    <a-scene embedded arjs>
  	<a-marker preset="dlux">
            <a-box position="0 0.5 0" material="color: black;"></a-box>
  	</a-marker>
  	<a-entity camera></a-entity>
    </a-scene>
  </body>
</html>
```

To use barcodes for AR experiences
```html
<a-scene embedded arjs="fuse: false; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
```
```html
<a-marker type="barcode" value="35">
  <a-box position='0 0.5 0' material='color: black;'></a-box>
</a-marker>
```

Here is a [list of all 64 barcodes](https://github.com/artoolkit/artoolkit5/tree/master/doc/patterns/Matrix%20code%203x3%20(72dpi)) in .png
