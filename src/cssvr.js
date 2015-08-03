 /* globals define */
 (function(define){'use strict';define(function(require,exports,module){

    var vrDevices = {};
    var viewport;
    var scene = document.querySelector('#scene');
    var world;
    var camera;
    var fullscreen = false;
    var projectionTransform;
    var fov;
    var x = 0;
    var y = 0;
    var z = 0;
    var rotX = 0;
    var rotY = 0;
    var rotZ = 0;
    var translation = new THREE.Matrix4();
    var rotation;
    var rotationEuler = THREE.Euler(0, 0, 0, "YXZ");
    var requestAnimationFrameID;
    var requestFullScreen;


    setupVRDevices(function() {
      // Creates viewport, camera and world elements
      setupScene();
      // Initiates the camera perspective matrix
      setupPerspective();
      // For mouse look mode when there's no HMD avaialable
      setupInputEventHandlers();
      setupFullscreenHandlers();
      // Function that updates the camera orientation from HMD information
      requestAnimationFrameID = window.requestAnimationFrame(updateCamera);
    });

    function setupVRDevices(done) {
      if (navigator.getVRDevices && navigator.getVRDevices().then) {
        navigator.getVRDevices().then(gotVRDevices);
      } else { done(); }
      function gotVRDevices(devices) {
          var i;
          for (var i = 0; i < devices.length; ++i) {
            if (devices[i] instanceof HMDVRDevice) {
              vrDevices.headset = devices[i];
              continue;
            }
            if (devices[i] instanceof PositionSensorVRDevice) {
              vrDevices.position = devices[i];
            }
            if (vrDevices.headset && vrDevices.position) { break; }
          }
          done();
      }
    }

    function enterVR() {
      requestFullScreen.call(scene, { vrDisplay: vrDevices.headset });
    }

    function setupPerspective() {
      fov = vrDevices.headset? vrDevices.headset.getEyeParameters('left').recommendedFieldOfView : { upDegrees: 45, rightDegrees: 45, downDegrees: 45, leftDegrees: 45 };
      //var perspective = VRPerspective.fovToProjection( fov, true, 1, 10000 );
      var perspective = perspectiveMatrix(THREE.Math.degToRad(fov.upDegrees), viewport.offsetWidth / viewport.offsetHeight, 1, 10000);
      perspective = perspective.clone().scale(new THREE.Vector3(viewport.offsetWidth, viewport.offsetHeight, 1));
      projectionTransform = getCSSMatrix(perspective);
      viewport.style.transform = projectionTransform;
    }

    function setupScene() {
      var i;
      var vrEls = scene.children;
      var vrElsLength = vrEls.length;
      viewport = document.createElement('div');
      viewport.classList.add('viewport');
      camera = document.createElement('div');
      camera.classList.add('vr');
      camera.classList.add('camera');
      world = document.createElement('div');
      world.classList.add('vr');
      world.classList.add('world');

      // Setup Hierarchy
      // scene
      //   viewport
      //      camera
      //        world
      //          user-elements
      for(i = 0; i < vrElsLength; ++i) {
        world.appendChild(vrEls[0]);
      }
      scene.appendChild(viewport);
      viewport.appendChild(camera);
      camera.appendChild(world);
      requestFullScreen = scene.mozRequestFullScreen || scene.webkitRequestFullscreen;
    }

    function updateCamera() {
      var transform;
      if (fullscreen) {
        transform = 'translate3d(-50%, -50%, 0px)';
      } else {
        transform = projectionTransform;
      }
      pollHeadOrientation();
      viewport.style.transform = transform;
      window.requestAnimationFrame(updateCamera);
    }

    function pollHeadOrientation() {
      var orientation;
      var quaternion;
      var position
      var state;
      if (vrDevices.position) {
        state = vrDevices.position.getState()
        orientation = state.orientation;
        position = state.position;
        if (orientation) {
          quaternion = new THREE.Quaternion(orientation.x, -orientation.y, orientation.z, orientation.w);
          rotation = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
        }
        if (position) {
          translation = new THREE.Matrix4().makeTranslation(position.x , position.y , position.z);
        }
      }
      updateElement(camera, {
        rotation: rotation,
        translation: translation
      });
    }

    function setupFullscreenHandlers() {
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
        viewport.classList.add('fullscreen');
      }
    }

    function perspectiveMatrix(fov, aspect, nearz, farz) {
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

    function getCSSMatrix(matrix) {
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

    function epsilon( value ) {
      return Math.abs( value ) < 0.000001 ? 0 : value;
    };

    var rotationEnabled;
    var lastMouseX;
    var lastMouseY;
    var PI_2 = Math.PI / 2;
    var cameraRotation;
    var cameraTranslation;

    function setupInputEventHandlers() {
      scene.addEventListener('mousedown', function(event) {
        rotationEnabled = true;
        scene.classList.add('selection-disabled');
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
      }, true);

      scene.addEventListener('mouseup', function(event) {
        rotationEnabled = false;
        scene.classList.remove('selection-disabled');
      }, true);

      scene.addEventListener('mousemove', function(event) {
        if (!rotationEnabled) {
          return;
        }
        var deltaX = (event.clientX - lastMouseX) * 0.2;
        var deltaY = (event.clientY - lastMouseY) * 0.2;
        rotX += deltaX;
        rotY -= deltaY;
        // Clamp to [-PI / 2, PI / 2]
        rotY = Math.max( -90, Math.min( 90, rotY ) );

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        translation = new THREE.Matrix4().makeTranslation(x , y , z);
        rotationEuler = new THREE.Euler(
          THREE.Math.degToRad(rotY),
          THREE.Math.degToRad(rotX),
          THREE.Math.degToRad(rotZ),
          "XYZ" );
        rotation = new THREE.Matrix4().makeRotationFromEuler(rotationEuler);

      }, true);

      document.documentElement.addEventListener('keydown', function (e) {
          if ( ( e.keycode || e.which ) == 32) {
              e.preventDefault();
          }
      }, false);

    }

    var updateElement = function(object, data) {
      var translation = data.translation.clone() || new THREE.Matrix4();
      var rotation = data.rotation || new THREE.Matrix4();
      object.style.transform = "translate3d(-50%, -50%, 0px) " + getCSSMatrix(translation.multiply(rotation));
    };

    module.exports = {
      zeroSensor: function () {
        rotX = 0;
        rotY = 0;
        rotation = new THREE.Matrix4();
        translation = new THREE.Matrix4();
        if (vrDevices.position) { vrDevices.position.resetSensor(); }
      },
      enterVR: enterVR
    };

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('VRCSS',this));
