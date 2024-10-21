# Images for dlux posts
Posting through dlux includes both traditional 16x9 rectangular images for all front ends, and 360 equirectangular images for portal preview images in VR on dlux.

## Capture Images
1. 16x9 Images can be captured inside an A-Frame scene by pressing `ctl-alt-s`
2. 360 Images can be captured inside an A-Frame scene by pressing `ctl-alt-shift-s`

## Upload Images
1. Drag and drop your images onto the IPFS uploader

If you want your images to appear in the scene, whether traditional or 360, select the "Add to scene" checkbox. This will create either a box (traditional) or sphere (360) geometry with src set to your uploaded item so it appears in your scene.

The engine prefers images in power of 2 resolution.

This means the resolution should be 2,4,8,16,32,64,128,256,512,1024,2048,etc...

Note the original resolution of your image and append it or a ratio of it to the file name.

Ex. image.jpg is 1000x600px, rename to image_1.6.jpg

Scale your image using Photoshop or something similar.

Ex. scale image_1.6.jpg to 1024x512px
