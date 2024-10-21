# 3D Models

## glTF ([Source](https://aframe.io/docs/0.8.0/components/gltf-model.html))
A-Frame recommends glTF
glTF is the rising star of 3D asset distribution viewing. In comparison to the older OBJ format, which supports only vertices, normals, texture coordinates, and basic materials, glTF provides a more powerful set of features. In addition to all of the above, glTF offers:

* Hierarchical objects
* Scene information (light sources, cameras)
* Skeletal structure and animation
* More robust materials and shaders

## Models can be created or downloaded in glTF:

* [Sketchup Make 2017](https://www.sketchup.com/download/make) + [glTF Exporter](https://extensions.sketchup.com/en/content/gltf-exporter) is free and great for architecture
* [Blender 2.8 (beta)](https://www.blender.org/2-8/) is a free, open-source, professional 3D modeling program with glTF export
* [Blender 2.79](https://www.blender.org/download/) + [glTF Exporter](https://github.com/KhronosGroup/glTF-Blender-IO) if you're not on 2.8 (beta)
* [Sketchfab](https://sketchfab.com/models?features=downloadable&sort_by=-likeCount) has thousands of free MIT license models auto-converted to glTF
* [Google Poly](https://poly.google.com/) also has some free downloadable models in glTF

If the model you want isn't available in glTF, try this converter: [https://blackthread.io/gltf-converter/](https://blackthread.io/gltf-converter/)

## glTF Overview:
Your model should be under 3MB, and can include textures in power of 2 (1024x512). Animations are supported with `animation-mixer`.

### 1. Export or download your model as a glTF 2.0:
  * unpacked `.glTF .bin .png .jpg`
  * embedded `.glTF`
  * binary `.glb`
### 2. Click `Add 3D Model` in the dlux Builder
  - [ ] Convert png to jpg (beta)
  - [ ] KHR Unlit option (see below)
  - [X] Pin to IPFS for 6 months (100MB limit)
### 3. Drag and drop your files
  - Open the logs if you want to see progress and confirmation of your asset being converted to a binary glTF (if not already in `.glb` format)
  - Once your asset is uploaded to IPFS, it will be inserted into A-Frame's asset manager, and placed in your scene at the origin
  - Your window will refresh with the updated changes

Now you can use the inspector to place your model where you'd like and save the changes back to your scene.

### PBR (Lit)
![PBR-Lit](https://scontent-lax3-1.xx.fbcdn.net/v/t39.2365-6/27690086_157873904869333_67238627846914048_n.png?_nc_cat=110&_nc_ht=scontent-lax3-1.xx&oh=6e7a2e0413ee23833ec9f6f99ddd07fa&oe=5CFE4E48)
### KHR (Unlit)
![KHR-Unlit](https://scontent-lax3-1.xx.fbcdn.net/v/t39.2365-6/27808880_160036251321013_5488252211764920320_n.png?_nc_cat=100&_nc_ht=scontent-lax3-1.xx&oh=9d43e8c7188062e15d058077d88bd400&oe=5CEF2708)
3. Drag and drop your file(s)

## Manually tinkering with glTF and OBJ
If you're not using our drag and drop uploader, you may want to better understand inside the files

##### glTF contains these files
-------------
* `.gltf` (model and material information)
* `.bin` (geometry and animation)
* `.jpg`, `.png` (textures)

##### OBJ contains these files
-------------
* `.obj` (model information)
* `.mtl` (material information)
* `.jpg`, `.png` (textures)

`.gltf`, `.obj`, and `.mtl` are all text files that can be created in Glitch by clicking the button `+ New File`, while `.bin`, `.jpg`, and `.png` must be uploaded to `assets` or somewhere. Note anything in your `assets` folder won't be uploaded to IPFS, it will instead be served from Glitch CDN.

### ← assets

Drag in `assets` you'd like to use, such as glTF `.bin` files, `.jpg` or `.png` texture photos, music `.mp3` files, and whatever else is needed to build your scene.

#### Steps for glTF `.bin` and texture `.jpg` or `.png` files
-------------
#### 1. Upload all `.bin`, `.jpg`, and `.png` files to `assets`
* Drag and drop the files into the `assets` folder in the left sidebar
* Copy the URL of each file
#### 2. Paste URL(s) into model containers
glTF:
* Open `yourmodel.gltf` with a word processor and search for "uri"
* Update `"uri": "model.bin"` with the correct URL copied from `assets`
* Update all instances of `"uri": "texture.jpg"` with the correct URL(s) copied from `assets`

MTL:
* Open `yourmodel.mtl` with a word processor and search for "map"
* Update all instances of `map_Kd texture.jpg` with the correct URL(s) copied from `assets`

### ← New Files
Click the `+ New File` button  in the left sidepanel 
##### Create corresponding files on Glitch
-------------
* `yourmodel.gltf` (if using glTF)
* `yourmodel.obj` (if using OBJ)
* `yourmodel.mtl` (if using OBJ)

1. Open the `.gltf`, or `.obj` and `.mtl` files you downloaded, or created. They can be viewed with any word processor on your desktop
2. Copy the contents of each file
3. Paste into the corresponding new file on Glitch

### ← index.html
Now that you have either:
* an updated `.gltf` pointing to the `.bin` and any `.jpg` or `.png` textures in `assets`
* an `.obj`  and updated `.mtl` pointing to any `.jpg` or `.png` textures in `assets`

you can set it up in `index.html`

#### Add Animation

Animation mixer does not work for OBJs.

```html
<a-entity gltf-model="#object" animation-mixer></a-entity>
```
If your model wasn't exported with animation, you can still animate it using A-Frame. This works for both OBJ and glTF:
```html
<a-obj-model src="#heart-obj" 
             mtl="#heart-mtl" 
             rotation="0 -135 0" 
             scale=".1 .1 .1" >
      <!-- Add A-Frame animation -->
      <a-animation attribute="rotation"
                   dur="10000"
                   fill="forwards"
                   to="0 360 0"
                   repeat="indefinite"></a-animation></a-obj-model>
```
Learn more about A-Frame animation: [https://aframe.io/docs/0.8.0/core/animations.html](https://aframe.io/docs/0.8.0/core/animations.html)
A-Frame recommends glTF, and supports the following:
* glTF `.gltf` or `.glb` https://aframe.io/docs/0.8.0/components/gltf-model.html
* Object `.obj` https://aframe.io/docs/0.8.0/components/obj-model.html
* Collada `.dae` https://aframe.io/docs/0.8.0/components/collada-model.html

A-Frame Extras includes additional THREE.js loaders which you may try to varying success:
* Filmbox `.fbx`  https://github.com/donmccurdy/aframe-extras/tree/master/src/loaders

Convert your glTF to glb here: https://glb-packer.glitch.me

View your model here: https://sandbox.babylonjs.com/

OBJ
-------------
Objects can use .MTL to define their material, including texture files. They may also use A-Frame's `material` component.

>Example 1
```html
 <a-assets>
    <a-asset-item id="window-obj" src="url..."></a-asset-item>
    <a-asset-item id="window-mtl" src="url..."></a-asset-item>
 </a-assets>

 <a-obj-model src="#window-obj" mtl="#window-mtl" material="transparent: true"></a-obj-model>
```
>Example 2
```html
 <a-assets>
    <a-asset-item id="tree" src="url..."></a-asset-item>
 </a-assets>

 <a-entity obj-model="obj:#tree" material="shader: flat; color: green; visible: false"></a-obj-model>
```
glTF ([GitHub Source](https://github.com/KhronosGroup/glTF-Sample-Models))
-------------
glTF contains a .bin for geometry and animation data. glTFs and can use texture files, but cannot use A-Frame's `material` property.

Learn more about using glTF with A-Frame: [https://aframe.io/docs/0.8.0/components/gltf-model.html](https://aframe.io/docs/0.8.0/components/gltf-model.html)

Textures
-------------
Texture files for both OBJ and glTF should be .jpg or .png with a resolution power of 2. This means the following are okay: 
* 1024x1024
* 1024x2048
* 512x512
* 2048x512
* 2x2 pairs tend to be most optimal.

Animation

https://github.com/donmccurdy/aframe-extras/tree/master/src/loaders#animation



[glTF loader example](https://threejs.org/examples/#webgl_loader_gltf)

