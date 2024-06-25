# Setup an Environment
Environment is a powerful component that allows you to quickly build out landscape and atmosphere for your scene. You do not have to use it, but is an easy way to get started and comes included in dlux!
## Presets
![A-Frame Environments](https://github.com/feiss/aframe-environment-component/raw/master/assets/aframeenvironment.gif?raw=true)

## Customization

In a dlux A-Frame scene:

1. Open the inspector by pressing `ctl-alt-i`
2. Select the "env" entity in the left side-bar

![Select a-entity env](https://ipfs.io/ipfs/QmPLH8q7Vvjjo7vD5KEcfGSAUefHaVc9MYfF27fsQCfJ9W)

3. Start with a preset you like, and customize it in right side-bar
4. When you're happy with it, click the `Save` button in the left side-bar

![Environment Customization Options](https://ipfs.io/ipfs/QmW87mm7nTvQTydty1zK7gsikRX1kdzevt3Gu2sN2FBfDb)

* `active` turns the entire component on or off
* `dressing` changes the shape of the dressing objects (trees, pyramids, etc). You can further customize the amount, color, scale, and variance.
* `flatShading` changes the rendered appearance
* `fog` adds atmosphere
* `grid` appears on the floor and can be helpful for layout and design, choose any color.
* `ground` changes the way the geometry of the ground in the distance. Customize the color and texture style to change how the ground is rendered.
* `horizonColor` adjusts the color of the horizon, and the position and type of light can be customized
 floor appearance, colors, sky type, and lighting.
* `preset` fills all values with those defined by the preset
* `skyColor` adjusts the color of the sky, it's type can be set to color, gradient, or atmosphere.

## Working with the code
You can work with the code directly in Glitch.

### Built In
Environment is built in to dlux boiler plates, select a preset and modify this line:
```html
<a-entity id="env" environment="preset: forest"></a-entity>
``` 

### Install
Install A-Frame Environment Component by Diego Goberna ([GitHub Source](https://github.com/feiss/aframe-environment-component))
```html
<head>

<script src="https://rawgit.com/feiss/aframe-environment-component/master/dist/aframe-environment-component.min.js"></script>

</head>
```
### Setup
Change the environment to any of the predefined ones
```html
<a-scene>

<a-entity id="env" environment="preset: forest"></a-entity>

</a-scene>
```