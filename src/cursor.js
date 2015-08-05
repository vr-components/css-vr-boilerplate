 /* globals define */
 (function(define){'use strict';define(function(require,exports,module){

    var viewport;
    var world;
    var cursor;
    var intersectedEl;

    function setupCursor() {
      world = document.querySelector('.world')
      viewport = document.querySelector('.viewport');
      cursor = document.createElement('div');
      cursor.classList.add('vr');
      cursor.classList.add('cursor');
      cursor.classList.add('world');
      viewport.appendChild(cursor);
    }

    function isInside(x, y, rect) {
      return ((x >= rect.left) && (x <= rect.left + rect.width)) &&
             ((y >= rect.top) && y <= (rect.top + rect.height));
    }

    function intersect(vrEnabled) {
      var els = document.querySelectorAll('.vr');
      var rect = cursor.getBoundingClientRect();
      var el;
      var cursorX = rect.left || rect.x;
      var cursorY = rect.top || rect.y;
      if (vrEnabled) {
        el = document.elementFromPoint(0, 0);
      } else {
        el = document.elementFromPoint(cursorX, cursorY);
      }
      if (el) {
        if (el === intersectedEl) { return; }
        if (intersectedEl) {
          intersectedEl.classList.remove('hover');
        }
        intersectedEl = el;
        intersectedEl.classList.add('hover');
      } else {
        intersectedEl = undefined;
      }
    }

    module.exports = {
      enable: function (enable) {
        if (enable) {
          setupCursor();
        }
      },
      intersect: intersect
    };


  });})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('VRCursor',this));
