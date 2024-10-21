# Add Asset
Assets are what your scene is built out of. They can take many forms, and we're going to cover the basics of using them on dlux.

The asset manager is a robust system for loading your assets without slowing the rest of the page during load.

Define each asset item within the assets tags. Crossorigin anonymous is helpful to prevent CORS errors. Give your item an id so you can reference it in your scene.

```html
<a-scene>

  <a-assets>
    <a-asset-item id=“myAsset” src=“url.goes.here” crossorigin=“anonymous”></a-asset-item>
  </a-assets>

  <a-entity id=“myEntity” scr=“#myAsset”></a-entity>

</a-scene>
```
Learn about individual assets and geometries they can be applied to in the following pages.

