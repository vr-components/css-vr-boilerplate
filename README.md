# CSS VR 

Thin abstraction on top of VR CSS APIs that let you focus on setting up your scene.

The library provides:

1. Camera, viewport and world origin setup
2. VR Devices detection and fullscreen setup.
3. Mouse camera lookup when so you can create VR content without having a headset.
4. Head orientation tracking if an HMD is available.

How to use it:

No time for reading? Just look at the [example](https://vr-components.github.io/css-vr-boilerplate/examples/index.html)

Steps:

0. Import the [cssvr.js](https://vr-components.github.io/css-vr-boilerplate/dist/cssvr.js) and [cssvr.css](https://vr-components.github.io/css-vr-boilerplate/dist/cssvr.js) files in your site.
1. Create a div element with id "scene"
2. Setup your elements with a class "vr" and use regular 3d transforms to position them in space.

```html
<div id="scene">
  <div class="vr button left">WebVR</div>
  <div class="vr button middle">WebVR</div>
  <div class="vr button right">WebVR</div>
</div>
```

3. It should just work. You should be able to look around with your mouse or headset. If not, please find issues.

## Needs work

Three.js is a dependency just for the Math functions. I postpone a more nimble solution until the library proves its value.

