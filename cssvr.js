 /* globals define */
 (function(define){'use strict';define(function(require,exports,module){

    var vrDevices = {};
    var viewport = document.querySelector('.viewport');
    var scene = document.querySelector('.scene');
    var world = document.querySelector('.world');
    var camera = document.querySelector('.camera');
    var fullscreen = false;
    var fullscreenButton = document.createElement('button');
    fullscreenButton.classList.add('fullscreen-button');
    fullscreenButton.innerHTML =  'Fullscreen';
    document.body.appendChild(fullscreenButton);

    function start() {
      var requestFullScreen = scene.mozRequestFullScreen || scene.webkitRequestFullscreen;
      var fsButton = document.querySelector('.fullscreen-button');

      fsButton.addEventListener('click', function() {
        requestFullScreen.call(scene, { vrDisplay: vrDevices.headset });
      })

      window.addEventListener('resize', function(e) {
        console.log('window Height = viewport Height', window.innerHeight == viewport.offsetHeight)
      })
    }

    if (navigator.getVRDevices) {
      navigator.getVRDevices().then(function(devices) {
        vrDevices.headset = devices[0];
        vrDevices.position = devices[1];
        start();
      });
    } else { start(); }

    function updateCamera() {
      var transform;
      if (fullscreen) {
        transform = 'translate3d(-50%, -50%, 0px)';
      } else {
       transform = projectionTransform;
      }
      updateElement(camera, {
        rotX: rotY,
        rotY: rotX,
        z: -500
      });
      viewport.style.transform = transform;
      window.requestAnimationFrame(updateCamera);
    }

    // function updateCamera() {
    //   viewport.style.transform = projectionTransform;
    //   window.requestAnimationFrame(updateCamera);
    // }

    document.addEventListener("webkitfullscreenchange", onfullscreenchange);
    document.addEventListener("mozfullscreenchange",    onfullscreenchange);
    document.addEventListener("fullscreenchange",       onfullscreenchange);

    function onfullscreenchange() {
      if ( !document.mozFullScreenElement && !document.webkitFullScreenElement ) {
        viewport.classList.remove('fullscreen');
        fullscreen = false;
        return;
      }
      fullscreen = true;
      window.requestAnimationFrame(updateCamera);
      viewport.classList.add('fullscreen');
    }

    var perspectiveMatrix = function(fov, aspect, nearz, farz) {
      var matrix = new THREE.Matrix4();
      var range = Math.tan(fov * 0.5) * nearz;

      matrix.elements[0] = (2 * nearz) / ((range * aspect) - (-range * aspect));
      matrix.elements[1] = 0;
      matrix.elements[2] = 0;
      matrix.elements[3] = 0;
      matrix.elements[4] = 0;
      matrix.elements[5] = (2 * nearz) / (2 * range);
      matrix.elements[6] = 0;
      matrix.elements[7] = 0;
      matrix.elements[8] = 0;
      matrix.elements[9] = 0;
      matrix.elements[10] = -(farz + nearz) / (farz - nearz);
      matrix.elements[11] = -1;
      matrix.elements[12] = 0;
      matrix.elements[13] = 0;
      matrix.elements[14] = -(2 * farz * nearz) / (farz - nearz);
      matrix.elements[15] = 0;
      return matrix.transpose();
    };

    var getCSSMatrix = function (matrix) {
      var elements = matrix.elements;

      return 'matrix3d(' +
        epsilon( elements[ 0 ] ) + ',' +
        epsilon( elements[ 1 ] ) + ',' +
        epsilon( elements[ 2 ] ) + ',' +
        epsilon( elements[ 3 ] ) + ',' +
        epsilon( elements[ 4 ] ) + ',' +
        epsilon( elements[ 5 ] ) + ',' +
        epsilon( elements[ 6 ] ) + ',' +
        epsilon( elements[ 7 ] ) + ',' +
        epsilon( elements[ 8 ] ) + ',' +
        epsilon( elements[ 9 ] ) + ',' +
        epsilon( elements[ 10 ] ) + ',' +
        epsilon( elements[ 11 ] ) + ',' +
        epsilon( elements[ 12 ] ) + ',' +
        epsilon( elements[ 13 ] ) + ',' +
        epsilon( elements[ 14 ] ) + ',' +
        epsilon( elements[ 15 ] ) +
      ')';
    };

    var epsilon = function ( value ) {
      return Math.abs( value ) < 0.000001 ? 0 : value;
    };

    var rotationEnabled;
    var lastMouseX;
    var lastMouseY;
    var rotX = 0;
    var rotY = 0;

    scene.addEventListener('mousedown', function(event) {
      rotationEnabled = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }, true);

    scene.addEventListener('mouseup', function(event) {
      rotationEnabled = false;
    }, true);

    scene.addEventListener('mousemove', function(event) {
      if (!rotationEnabled) {
        return;
      }
      var deltaX = (event.clientX - lastMouseX) * 0.25;
      var deltaY = (event.clientY - lastMouseY) * 0.25;
      rotX += deltaX;
      rotY += deltaY;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      var z = -500;
      if (fullscreen) {
        z = 0;
      }
      updateElement(camera, {
        rotX: rotY,
        rotY: rotX,
        z: -500
      });
    }, true);


    var updateElement = function(object, data) {
      var translation = new THREE.Matrix4().makeTranslation(data.x || 0, data.y || 0, data.z || 0);
      var rotX = THREE.Math.degToRad(data.rotX || 0);
      var rotY = THREE.Math.degToRad(data.rotY || 0);
      var rotZ = THREE.Math.degToRad(data.rotZ || 0);
      var rotationX = new THREE.Matrix4().makeRotationX(rotX);
      var rotationY = new THREE.Matrix4().makeRotationY(rotY);
      var rotationZ = new THREE.Matrix4().makeRotationZ(rotZ);
      object.style.transform = "translate3d(-50%, -50%, 0px) " + getCSSMatrix(translation.multiply(rotationZ.multiply(rotationY.multiply(rotationX))));
    }

    var perspective = perspectiveMatrix(THREE.Math.degToRad(45), viewport.offsetWidth / viewport.offsetHeight, 1, 10000);
    perspective = perspective.clone().scale(new THREE.Vector3(viewport.offsetWidth, viewport.offsetHeight, 1));
    var projectionTransform = getCSSMatrix(perspective);
    viewport.style.transform = projectionTransform;

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('VRSCene',this));
