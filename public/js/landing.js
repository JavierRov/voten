webpackJsonp([2,3],{

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Vue, $) {__webpack_require__(47);

if (document.querySelector('#landing')) {
	new Vue({
		mounted: function mounted() {
			this.$nextTick(function () {
				this.loadCheckBox();
			});
		},

		methods: {
			/**
    * Loads the Semantic UI's CheckBox component
    *
    * @return void
    */
			loadCheckBox: function loadCheckBox() {
				$('.ui.checkbox').checkbox();
			}
		}
	}).$mount('#landing');
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(3)))

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_laravel_echo__);
window.moment = __webpack_require__(45);
window.moment.tz.setDefault("UTC");

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = __webpack_require__(43);
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status === 401) location.reload();

	return Promise.reject(error);
});

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */


if (Laravel.env == 'local') {
	window.Echo = new __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default.a({
		broadcaster: 'pusher',
		key: '690c67d5d78d1c7ace97',
		cluster: 'eu'
	});
} else {
	window.Echo = new __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default.a({
		broadcaster: 'socket.io',
		host: 'https://echo.voten.co:6001',
		auth: {
			headers: {
				'Authorization': 'Bearer ' + 'nb35mdq2ca9928qgl4sgjf3imil5811sn41qsmcaph0p3h6sa5ht8hoktdeg'
			}
		}
	});
}

// The rest of (non-NPM) packages
__webpack_require__(55);
__webpack_require__(50);
__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(52);
__webpack_require__(49);
__webpack_require__(48);

window.emojione = __webpack_require__(51);

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * jquery.Jcrop.js v0.9.12
 * jQuery Image Cropping Plugin - released under MIT License 
 * Author: Kelly Hallman <khallman@gmail.com>
 * http://github.com/tapmodo/Jcrop
 * Copyright (c) 2008-2013 Tapmodo Interactive LLC {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * }}}
 */

(function ($) {

  $.Jcrop = function (obj, opt) {
    var options = $.extend({}, $.Jcrop.defaults),
        docOffset,
        _ua = navigator.userAgent.toLowerCase(),
        is_msie = /msie/.test(_ua),
        ie6mode = /msie [1-6]\./.test(_ua);

    // Internal Methods {{{
    function px(n) {
      return Math.round(n) + 'px';
    }
    function cssClass(cl) {
      return options.baseClass + '-' + cl;
    }
    function supportsColorFade() {
      return $.fx.step.hasOwnProperty('backgroundColor');
    }
    function getPos(obj) //{{{
    {
      var pos = $(obj).offset();
      return [pos.left, pos.top];
    }
    //}}}
    function mouseAbs(e) //{{{
    {
      return [e.pageX - docOffset[0], e.pageY - docOffset[1]];
    }
    //}}}
    function setOptions(opt) //{{{
    {
      if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) !== 'object') opt = {};
      options = $.extend(options, opt);

      $.each(['onChange', 'onSelect', 'onRelease', 'onDblClick'], function (i, e) {
        if (typeof options[e] !== 'function') options[e] = function () {};
      });
    }
    //}}}
    function startDragMode(mode, pos, touch) //{{{
    {
      docOffset = getPos($img);
      Tracker.setCursor(mode === 'move' ? mode : mode + '-resize');

      if (mode === 'move') {
        return Tracker.activateHandlers(createMover(pos), doneSelect, touch);
      }

      var fc = Coords.getFixed();
      var opp = oppLockCorner(mode);
      var opc = Coords.getCorner(oppLockCorner(opp));

      Coords.setPressed(Coords.getCorner(opp));
      Coords.setCurrent(opc);

      Tracker.activateHandlers(dragmodeHandler(mode, fc), doneSelect, touch);
    }
    //}}}
    function dragmodeHandler(mode, f) //{{{
    {
      return function (pos) {
        if (!options.aspectRatio) {
          switch (mode) {
            case 'e':
              pos[1] = f.y2;
              break;
            case 'w':
              pos[1] = f.y2;
              break;
            case 'n':
              pos[0] = f.x2;
              break;
            case 's':
              pos[0] = f.x2;
              break;
          }
        } else {
          switch (mode) {
            case 'e':
              pos[1] = f.y + 1;
              break;
            case 'w':
              pos[1] = f.y + 1;
              break;
            case 'n':
              pos[0] = f.x + 1;
              break;
            case 's':
              pos[0] = f.x + 1;
              break;
          }
        }
        Coords.setCurrent(pos);
        Selection.update();
      };
    }
    //}}}
    function createMover(pos) //{{{
    {
      var lloc = pos;
      KeyManager.watchKeys();

      return function (pos) {
        Coords.moveOffset([pos[0] - lloc[0], pos[1] - lloc[1]]);
        lloc = pos;

        Selection.update();
      };
    }
    //}}}
    function oppLockCorner(ord) //{{{
    {
      switch (ord) {
        case 'n':
          return 'sw';
        case 's':
          return 'nw';
        case 'e':
          return 'nw';
        case 'w':
          return 'ne';
        case 'ne':
          return 'sw';
        case 'nw':
          return 'se';
        case 'se':
          return 'nw';
        case 'sw':
          return 'ne';
      }
    }
    //}}}
    function createDragger(ord) //{{{
    {
      return function (e) {
        if (options.disabled) {
          return false;
        }
        if (ord === 'move' && !options.allowMove) {
          return false;
        }

        // Fix position of crop area when dragged the very first time.
        // Necessary when crop image is in a hidden element when page is loaded.
        docOffset = getPos($img);

        btndown = true;
        startDragMode(ord, mouseAbs(e));
        e.stopPropagation();
        e.preventDefault();
        return false;
      };
    }
    //}}}
    function presize($obj, w, h) //{{{
    {
      var nw = $obj.width(),
          nh = $obj.height();
      if (nw > w && w > 0) {
        nw = w;
        nh = w / $obj.width() * $obj.height();
      }
      if (nh > h && h > 0) {
        nh = h;
        nw = h / $obj.height() * $obj.width();
      }
      xscale = $obj.width() / nw;
      yscale = $obj.height() / nh;
      $obj.width(nw).height(nh);
    }
    //}}}
    function unscale(c) //{{{
    {
      return {
        x: c.x * xscale,
        y: c.y * yscale,
        x2: c.x2 * xscale,
        y2: c.y2 * yscale,
        w: c.w * xscale,
        h: c.h * yscale
      };
    }
    //}}}
    function doneSelect(pos) //{{{
    {
      var c = Coords.getFixed();
      if (c.w > options.minSelect[0] && c.h > options.minSelect[1]) {
        Selection.enableHandles();
        Selection.done();
      } else {
        Selection.release();
      }
      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
    }
    //}}}
    function _newSelection(e) //{{{
    {
      if (options.disabled) {
        return false;
      }
      if (!options.allowSelect) {
        return false;
      }
      btndown = true;
      docOffset = getPos($img);
      Selection.disableHandles();
      Tracker.setCursor('crosshair');
      var pos = mouseAbs(e);
      Coords.setPressed(pos);
      Selection.update();
      Tracker.activateHandlers(selectDrag, doneSelect, e.type.substring(0, 5) === 'touch');
      KeyManager.watchKeys();

      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    //}}}
    function selectDrag(pos) //{{{
    {
      Coords.setCurrent(pos);
      Selection.update();
    }
    //}}}
    function newTracker() //{{{
    {
      var trk = $('<div></div>').addClass(cssClass('tracker'));
      if (is_msie) {
        trk.css({
          opacity: 0,
          backgroundColor: 'white'
        });
      }
      return trk;
    }
    //}}}

    // }}}
    // Initialization {{{
    // Sanitize some options {{{
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
      obj = $(obj)[0];
    }
    if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) !== 'object') {
      opt = {};
    }
    // }}}
    setOptions(opt);
    // Initialize some jQuery objects {{{
    // The values are SET on the image(s) for the interface
    // If the original image has any of these set, they will be reset
    // However, if you destroy() the Jcrop instance the original image's
    // character in the DOM will be as you left it.
    var img_css = {
      border: 'none',
      visibility: 'visible',
      margin: 0,
      padding: 0,
      position: 'absolute',
      top: 0,
      left: 0
    };

    var $origimg = $(obj),
        img_mode = true;

    if (obj.tagName == 'IMG') {
      // Fix size of crop image.
      // Necessary when crop image is within a hidden element when page is loaded.
      if ($origimg[0].width != 0 && $origimg[0].height != 0) {
        // Obtain dimensions from contained img element.
        $origimg.width($origimg[0].width);
        $origimg.height($origimg[0].height);
      } else {
        // Obtain dimensions from temporary image in case the original is not loaded yet (e.g. IE 7.0). 
        var tempImage = new Image();
        tempImage.src = $origimg[0].src;
        $origimg.width(tempImage.width);
        $origimg.height(tempImage.height);
      }

      var $img = $origimg.clone().removeAttr('id').css(img_css).show();

      $img.width($origimg.width());
      $img.height($origimg.height());
      $origimg.after($img).hide();
    } else {
      $img = $origimg.css(img_css).show();
      img_mode = false;
      if (options.shade === null) {
        options.shade = true;
      }
    }

    presize($img, options.boxWidth, options.boxHeight);

    var boundx = $img.width(),
        boundy = $img.height(),
        $div = $('<div />').width(boundx).height(boundy).addClass(cssClass('holder')).css({
      position: 'relative',
      backgroundColor: options.bgColor
    }).insertAfter($origimg).append($img);

    if (options.addClass) {
      $div.addClass(options.addClass);
    }

    var $img2 = $('<div />'),
        $img_holder = $('<div />').width('100%').height('100%').css({
      zIndex: 310,
      position: 'absolute',
      overflow: 'hidden'
    }),
        $hdl_holder = $('<div />').width('100%').height('100%').css('zIndex', 320),
        $sel = $('<div />').css({
      position: 'absolute',
      zIndex: 600
    }).dblclick(function () {
      var c = Coords.getFixed();
      options.onDblClick.call(api, c);
    }).insertBefore($img).append($img_holder, $hdl_holder);

    if (img_mode) {

      $img2 = $('<img />').attr('src', $img.attr('src')).css(img_css).width(boundx).height(boundy), $img_holder.append($img2);
    }

    if (ie6mode) {
      $sel.css({
        overflowY: 'hidden'
      });
    }

    var bound = options.boundary;
    var $trk = newTracker().width(boundx + bound * 2).height(boundy + bound * 2).css({
      position: 'absolute',
      top: px(-bound),
      left: px(-bound),
      zIndex: 290
    }).mousedown(_newSelection);

    /* }}} */
    // Set more variables {{{
    var bgcolor = options.bgColor,
        bgopacity = options.bgOpacity,
        xlimit,
        ylimit,
        xmin,
        ymin,
        xscale,
        yscale,
        enabled = true,
        btndown,
        animating,
        shift_down;

    docOffset = getPos($img);
    // }}}
    // }}}
    // Internal Modules {{{
    // Touch Module {{{ 
    var Touch = function () {
      // Touch support detection function adapted (under MIT License)
      // from code by Jeffrey Sambells - http://github.com/iamamused/
      function hasTouchSupport() {
        var support = {},
            events = ['touchstart', 'touchmove', 'touchend'],
            el = document.createElement('div'),
            i;

        try {
          for (i = 0; i < events.length; i++) {
            var eventName = events[i];
            eventName = 'on' + eventName;
            var isSupported = eventName in el;
            if (!isSupported) {
              el.setAttribute(eventName, 'return;');
              isSupported = typeof el[eventName] == 'function';
            }
            support[events[i]] = isSupported;
          }
          return support.touchstart && support.touchend && support.touchmove;
        } catch (err) {
          return false;
        }
      }

      function detectSupport() {
        if (options.touchSupport === true || options.touchSupport === false) return options.touchSupport;else return hasTouchSupport();
      }
      return {
        createDragger: function createDragger(ord) {
          return function (e) {
            if (options.disabled) {
              return false;
            }
            if (ord === 'move' && !options.allowMove) {
              return false;
            }
            docOffset = getPos($img);
            btndown = true;
            startDragMode(ord, mouseAbs(Touch.cfilter(e)), true);
            e.stopPropagation();
            e.preventDefault();
            return false;
          };
        },
        newSelection: function newSelection(e) {
          return _newSelection(Touch.cfilter(e));
        },
        cfilter: function cfilter(e) {
          e.pageX = e.originalEvent.changedTouches[0].pageX;
          e.pageY = e.originalEvent.changedTouches[0].pageY;
          return e;
        },
        isSupported: hasTouchSupport,
        support: detectSupport()
      };
    }();
    // }}}
    // Coords Module {{{
    var Coords = function () {
      var x1 = 0,
          y1 = 0,
          x2 = 0,
          y2 = 0,
          ox,
          oy;

      function setPressed(pos) //{{{
      {
        pos = rebound(pos);
        x2 = x1 = pos[0];
        y2 = y1 = pos[1];
      }
      //}}}
      function setCurrent(pos) //{{{
      {
        pos = rebound(pos);
        ox = pos[0] - x2;
        oy = pos[1] - y2;
        x2 = pos[0];
        y2 = pos[1];
      }
      //}}}
      function getOffset() //{{{
      {
        return [ox, oy];
      }
      //}}}
      function moveOffset(offset) //{{{
      {
        var ox = offset[0],
            oy = offset[1];

        if (0 > x1 + ox) {
          ox -= ox + x1;
        }
        if (0 > y1 + oy) {
          oy -= oy + y1;
        }

        if (boundy < y2 + oy) {
          oy += boundy - (y2 + oy);
        }
        if (boundx < x2 + ox) {
          ox += boundx - (x2 + ox);
        }

        x1 += ox;
        x2 += ox;
        y1 += oy;
        y2 += oy;
      }
      //}}}
      function getCorner(ord) //{{{
      {
        var c = getFixed();
        switch (ord) {
          case 'ne':
            return [c.x2, c.y];
          case 'nw':
            return [c.x, c.y];
          case 'se':
            return [c.x2, c.y2];
          case 'sw':
            return [c.x, c.y2];
        }
      }
      //}}}
      function getFixed() //{{{
      {
        if (!options.aspectRatio) {
          return getRect();
        }
        // This function could use some optimization I think...
        var aspect = options.aspectRatio,
            min_x = options.minSize[0] / xscale,


        //min_y = options.minSize[1]/yscale,
        max_x = options.maxSize[0] / xscale,
            max_y = options.maxSize[1] / yscale,
            rw = x2 - x1,
            rh = y2 - y1,
            rwa = Math.abs(rw),
            rha = Math.abs(rh),
            real_ratio = rwa / rha,
            xx,
            yy,
            w,
            h;

        if (max_x === 0) {
          max_x = boundx * 10;
        }
        if (max_y === 0) {
          max_y = boundy * 10;
        }
        if (real_ratio < aspect) {
          yy = y2;
          w = rha * aspect;
          xx = rw < 0 ? x1 - w : w + x1;

          if (xx < 0) {
            xx = 0;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          } else if (xx > boundx) {
            xx = boundx;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          }
        } else {
          xx = x2;
          h = rwa / aspect;
          yy = rh < 0 ? y1 - h : y1 + h;
          if (yy < 0) {
            yy = 0;
            w = Math.abs((yy - y1) * aspect);
            xx = rw < 0 ? x1 - w : w + x1;
          } else if (yy > boundy) {
            yy = boundy;
            w = Math.abs(yy - y1) * aspect;
            xx = rw < 0 ? x1 - w : w + x1;
          }
        }

        // Magic %-)
        if (xx > x1) {
          // right side
          if (xx - x1 < min_x) {
            xx = x1 + min_x;
          } else if (xx - x1 > max_x) {
            xx = x1 + max_x;
          }
          if (yy > y1) {
            yy = y1 + (xx - x1) / aspect;
          } else {
            yy = y1 - (xx - x1) / aspect;
          }
        } else if (xx < x1) {
          // left side
          if (x1 - xx < min_x) {
            xx = x1 - min_x;
          } else if (x1 - xx > max_x) {
            xx = x1 - max_x;
          }
          if (yy > y1) {
            yy = y1 + (x1 - xx) / aspect;
          } else {
            yy = y1 - (x1 - xx) / aspect;
          }
        }

        if (xx < 0) {
          x1 -= xx;
          xx = 0;
        } else if (xx > boundx) {
          x1 -= xx - boundx;
          xx = boundx;
        }

        if (yy < 0) {
          y1 -= yy;
          yy = 0;
        } else if (yy > boundy) {
          y1 -= yy - boundy;
          yy = boundy;
        }

        return makeObj(flipCoords(x1, y1, xx, yy));
      }
      //}}}
      function rebound(p) //{{{
      {
        if (p[0] < 0) p[0] = 0;
        if (p[1] < 0) p[1] = 0;

        if (p[0] > boundx) p[0] = boundx;
        if (p[1] > boundy) p[1] = boundy;

        return [Math.round(p[0]), Math.round(p[1])];
      }
      //}}}
      function flipCoords(x1, y1, x2, y2) //{{{
      {
        var xa = x1,
            xb = x2,
            ya = y1,
            yb = y2;
        if (x2 < x1) {
          xa = x2;
          xb = x1;
        }
        if (y2 < y1) {
          ya = y2;
          yb = y1;
        }
        return [xa, ya, xb, yb];
      }
      //}}}
      function getRect() //{{{
      {
        var xsize = x2 - x1,
            ysize = y2 - y1,
            delta;

        if (xlimit && Math.abs(xsize) > xlimit) {
          x2 = xsize > 0 ? x1 + xlimit : x1 - xlimit;
        }
        if (ylimit && Math.abs(ysize) > ylimit) {
          y2 = ysize > 0 ? y1 + ylimit : y1 - ylimit;
        }

        if (ymin / yscale && Math.abs(ysize) < ymin / yscale) {
          y2 = ysize > 0 ? y1 + ymin / yscale : y1 - ymin / yscale;
        }
        if (xmin / xscale && Math.abs(xsize) < xmin / xscale) {
          x2 = xsize > 0 ? x1 + xmin / xscale : x1 - xmin / xscale;
        }

        if (x1 < 0) {
          x2 -= x1;
          x1 -= x1;
        }
        if (y1 < 0) {
          y2 -= y1;
          y1 -= y1;
        }
        if (x2 < 0) {
          x1 -= x2;
          x2 -= x2;
        }
        if (y2 < 0) {
          y1 -= y2;
          y2 -= y2;
        }
        if (x2 > boundx) {
          delta = x2 - boundx;
          x1 -= delta;
          x2 -= delta;
        }
        if (y2 > boundy) {
          delta = y2 - boundy;
          y1 -= delta;
          y2 -= delta;
        }
        if (x1 > boundx) {
          delta = x1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }
        if (y1 > boundy) {
          delta = y1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }

        return makeObj(flipCoords(x1, y1, x2, y2));
      }
      //}}}
      function makeObj(a) //{{{
      {
        return {
          x: a[0],
          y: a[1],
          x2: a[2],
          y2: a[3],
          w: a[2] - a[0],
          h: a[3] - a[1]
        };
      }
      //}}}

      return {
        flipCoords: flipCoords,
        setPressed: setPressed,
        setCurrent: setCurrent,
        getOffset: getOffset,
        moveOffset: moveOffset,
        getCorner: getCorner,
        getFixed: getFixed
      };
    }();

    //}}}
    // Shade Module {{{
    var Shade = function () {
      var enabled = false,
          holder = $('<div />').css({
        position: 'absolute',
        zIndex: 240,
        opacity: 0
      }),
          shades = {
        top: createShade(),
        left: createShade().height(boundy),
        right: createShade().height(boundy),
        bottom: createShade()
      };

      function resizeShades(w, h) {
        shades.left.css({ height: px(h) });
        shades.right.css({ height: px(h) });
      }
      function updateAuto() {
        return updateShade(Coords.getFixed());
      }
      function updateShade(c) {
        shades.top.css({
          left: px(c.x),
          width: px(c.w),
          height: px(c.y)
        });
        shades.bottom.css({
          top: px(c.y2),
          left: px(c.x),
          width: px(c.w),
          height: px(boundy - c.y2)
        });
        shades.right.css({
          left: px(c.x2),
          width: px(boundx - c.x2)
        });
        shades.left.css({
          width: px(c.x)
        });
      }
      function createShade() {
        return $('<div />').css({
          position: 'absolute',
          backgroundColor: options.shadeColor || options.bgColor
        }).appendTo(holder);
      }
      function enableShade() {
        if (!enabled) {
          enabled = true;
          holder.insertBefore($img);
          updateAuto();
          Selection.setBgOpacity(1, 0, 1);
          $img2.hide();

          setBgColor(options.shadeColor || options.bgColor, 1);
          if (Selection.isAwake()) {
            setOpacity(options.bgOpacity, 1);
          } else setOpacity(1, 1);
        }
      }
      function setBgColor(color, now) {
        colorChangeMacro(getShades(), color, now);
      }
      function disableShade() {
        if (enabled) {
          holder.remove();
          $img2.show();
          enabled = false;
          if (Selection.isAwake()) {
            Selection.setBgOpacity(options.bgOpacity, 1, 1);
          } else {
            Selection.setBgOpacity(1, 1, 1);
            Selection.disableHandles();
          }
          colorChangeMacro($div, 0, 1);
        }
      }
      function setOpacity(opacity, now) {
        if (enabled) {
          if (options.bgFade && !now) {
            holder.animate({
              opacity: 1 - opacity
            }, {
              queue: false,
              duration: options.fadeTime
            });
          } else holder.css({ opacity: 1 - opacity });
        }
      }
      function refreshAll() {
        options.shade ? enableShade() : disableShade();
        if (Selection.isAwake()) setOpacity(options.bgOpacity);
      }
      function getShades() {
        return holder.children();
      }

      return {
        update: updateAuto,
        updateRaw: updateShade,
        getShades: getShades,
        setBgColor: setBgColor,
        enable: enableShade,
        disable: disableShade,
        resize: resizeShades,
        refresh: refreshAll,
        opacity: setOpacity
      };
    }();
    // }}}
    // Selection Module {{{
    var Selection = function () {
      var awake,
          hdep = 370,
          borders = {},
          handle = {},
          dragbar = {},
          seehandles = false;

      // Private Methods
      function insertBorder(type) //{{{
      {
        var jq = $('<div />').css({
          position: 'absolute',
          opacity: options.borderOpacity
        }).addClass(cssClass(type));
        $img_holder.append(jq);
        return jq;
      }
      //}}}
      function dragDiv(ord, zi) //{{{
      {
        var jq = $('<div />').mousedown(createDragger(ord)).css({
          cursor: ord + '-resize',
          position: 'absolute',
          zIndex: zi
        }).addClass('ord-' + ord);

        if (Touch.support) {
          jq.bind('touchstart.jcrop', Touch.createDragger(ord));
        }

        $hdl_holder.append(jq);
        return jq;
      }
      //}}}
      function insertHandle(ord) //{{{
      {
        var hs = options.handleSize,
            div = dragDiv(ord, hdep++).css({
          opacity: options.handleOpacity
        }).addClass(cssClass('handle'));

        if (hs) {
          div.width(hs).height(hs);
        }

        return div;
      }
      //}}}
      function insertDragbar(ord) //{{{
      {
        return dragDiv(ord, hdep++).addClass('jcrop-dragbar');
      }
      //}}}
      function createDragbars(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          dragbar[li[i]] = insertDragbar(li[i]);
        }
      }
      //}}}
      function createBorders(li) //{{{
      {
        var cl, i;
        for (i = 0; i < li.length; i++) {
          switch (li[i]) {
            case 'n':
              cl = 'hline';break;
            case 's':
              cl = 'hline bottom';break;
            case 'e':
              cl = 'vline right';break;
            case 'w':
              cl = 'vline';break;
          }
          borders[li[i]] = insertBorder(cl);
        }
      }
      //}}}
      function createHandles(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          handle[li[i]] = insertHandle(li[i]);
        }
      }
      //}}}
      function moveto(x, y) //{{{
      {
        if (!options.shade) {
          $img2.css({
            top: px(-y),
            left: px(-x)
          });
        }
        $sel.css({
          top: px(y),
          left: px(x)
        });
      }
      //}}}
      function resize(w, h) //{{{
      {
        $sel.width(Math.round(w)).height(Math.round(h));
      }
      //}}}
      function refresh() //{{{
      {
        var c = Coords.getFixed();

        Coords.setPressed([c.x, c.y]);
        Coords.setCurrent([c.x2, c.y2]);

        updateVisible();
      }
      //}}}

      // Internal Methods
      function updateVisible(select) //{{{
      {
        if (awake) {
          return update(select);
        }
      }
      //}}}
      function update(select) //{{{
      {
        var c = Coords.getFixed();

        resize(c.w, c.h);
        moveto(c.x, c.y);
        if (options.shade) Shade.updateRaw(c);

        awake || show();

        if (select) {
          options.onSelect.call(api, unscale(c));
        } else {
          options.onChange.call(api, unscale(c));
        }
      }
      //}}}
      function setBgOpacity(opacity, force, now) //{{{
      {
        if (!awake && !force) return;
        if (options.bgFade && !now) {
          $img.animate({
            opacity: opacity
          }, {
            queue: false,
            duration: options.fadeTime
          });
        } else {
          $img.css('opacity', opacity);
        }
      }
      //}}}
      function show() //{{{
      {
        $sel.show();

        if (options.shade) Shade.opacity(bgopacity);else setBgOpacity(bgopacity, true);

        awake = true;
      }
      //}}}
      function release() //{{{
      {
        disableHandles();
        $sel.hide();

        if (options.shade) Shade.opacity(1);else setBgOpacity(1);

        awake = false;
        options.onRelease.call(api);
      }
      //}}}
      function showHandles() //{{{
      {
        if (seehandles) {
          $hdl_holder.show();
        }
      }
      //}}}
      function enableHandles() //{{{
      {
        seehandles = true;
        if (options.allowResize) {
          $hdl_holder.show();
          return true;
        }
      }
      //}}}
      function disableHandles() //{{{
      {
        seehandles = false;
        $hdl_holder.hide();
      }
      //}}}
      function animMode(v) //{{{
      {
        if (v) {
          animating = true;
          disableHandles();
        } else {
          animating = false;
          enableHandles();
        }
      }
      //}}}
      function done() //{{{
      {
        animMode(false);
        refresh();
      }
      //}}}
      // Insert draggable elements {{{
      // Insert border divs for outline

      if (options.dragEdges && $.isArray(options.createDragbars)) createDragbars(options.createDragbars);

      if ($.isArray(options.createHandles)) createHandles(options.createHandles);

      if (options.drawBorders && $.isArray(options.createBorders)) createBorders(options.createBorders);

      //}}}

      // This is a hack for iOS5 to support drag/move touch functionality
      $(document).bind('touchstart.jcrop-ios', function (e) {
        if ($(e.currentTarget).hasClass('jcrop-tracker')) e.stopPropagation();
      });

      var $track = newTracker().mousedown(createDragger('move')).css({
        cursor: 'move',
        position: 'absolute',
        zIndex: 360
      });

      if (Touch.support) {
        $track.bind('touchstart.jcrop', Touch.createDragger('move'));
      }

      $img_holder.append($track);
      disableHandles();

      return {
        updateVisible: updateVisible,
        update: update,
        release: release,
        refresh: refresh,
        isAwake: function isAwake() {
          return awake;
        },
        setCursor: function setCursor(cursor) {
          $track.css('cursor', cursor);
        },
        enableHandles: enableHandles,
        enableOnly: function enableOnly() {
          seehandles = true;
        },
        showHandles: showHandles,
        disableHandles: disableHandles,
        animMode: animMode,
        setBgOpacity: setBgOpacity,
        done: done
      };
    }();

    //}}}
    // Tracker Module {{{
    var Tracker = function () {
      var onMove = function onMove() {},
          onDone = function onDone() {},
          trackDoc = options.trackDocument;

      function toFront(touch) //{{{
      {
        $trk.css({
          zIndex: 450
        });

        if (touch) $(document).bind('touchmove.jcrop', trackTouchMove).bind('touchend.jcrop', trackTouchEnd);else if (trackDoc) $(document).bind('mousemove.jcrop', trackMove).bind('mouseup.jcrop', trackUp);
      }
      //}}}
      function toBack() //{{{
      {
        $trk.css({
          zIndex: 290
        });
        $(document).unbind('.jcrop');
      }
      //}}}
      function trackMove(e) //{{{
      {
        onMove(mouseAbs(e));
        return false;
      }
      //}}}
      function trackUp(e) //{{{
      {
        e.preventDefault();
        e.stopPropagation();

        if (btndown) {
          btndown = false;

          onDone(mouseAbs(e));

          if (Selection.isAwake()) {
            options.onSelect.call(api, unscale(Coords.getFixed()));
          }

          toBack();
          onMove = function onMove() {};
          onDone = function onDone() {};
        }

        return false;
      }
      //}}}
      function activateHandlers(move, done, touch) //{{{
      {
        btndown = true;
        onMove = move;
        onDone = done;
        toFront(touch);
        return false;
      }
      //}}}
      function trackTouchMove(e) //{{{
      {
        onMove(mouseAbs(Touch.cfilter(e)));
        return false;
      }
      //}}}
      function trackTouchEnd(e) //{{{
      {
        return trackUp(Touch.cfilter(e));
      }
      //}}}
      function setCursor(t) //{{{
      {
        $trk.css('cursor', t);
      }
      //}}}

      if (!trackDoc) {
        $trk.mousemove(trackMove).mouseup(trackUp).mouseout(trackUp);
      }

      $img.before($trk);
      return {
        activateHandlers: activateHandlers,
        setCursor: setCursor
      };
    }();
    //}}}
    // KeyManager Module {{{
    var KeyManager = function () {
      var $keymgr = $('<input type="radio" />').css({
        position: 'fixed',
        left: '-120px',
        width: '12px'
      }).addClass('jcrop-keymgr'),
          $keywrap = $('<div />').css({
        position: 'absolute',
        overflow: 'hidden'
      }).append($keymgr);

      function watchKeys() //{{{
      {
        if (options.keySupport) {
          $keymgr.show();
          $keymgr.focus();
        }
      }
      //}}}
      function onBlur(e) //{{{
      {
        $keymgr.hide();
      }
      //}}}
      function doNudge(e, x, y) //{{{
      {
        if (options.allowMove) {
          Coords.moveOffset([x, y]);
          Selection.updateVisible(true);
        }
        e.preventDefault();
        e.stopPropagation();
      }
      //}}}
      function parseKey(e) //{{{
      {
        if (e.ctrlKey || e.metaKey) {
          return true;
        }
        shift_down = e.shiftKey ? true : false;
        var nudge = shift_down ? 10 : 1;

        switch (e.keyCode) {
          case 37:
            doNudge(e, -nudge, 0);
            break;
          case 39:
            doNudge(e, nudge, 0);
            break;
          case 38:
            doNudge(e, 0, -nudge);
            break;
          case 40:
            doNudge(e, 0, nudge);
            break;
          case 27:
            if (options.allowSelect) Selection.release();
            break;
          case 9:
            return true;
        }

        return false;
      }
      //}}}

      if (options.keySupport) {
        $keymgr.keydown(parseKey).blur(onBlur);
        if (ie6mode || !options.fixedSupport) {
          $keymgr.css({
            position: 'absolute',
            left: '-20px'
          });
          $keywrap.append($keymgr).insertBefore($img);
        } else {
          $keymgr.insertBefore($img);
        }
      }

      return {
        watchKeys: watchKeys
      };
    }();
    //}}}
    // }}}
    // API methods {{{
    function setClass(cname) //{{{
    {
      $div.removeClass().addClass(cssClass('holder')).addClass(cname);
    }
    //}}}
    function animateTo(a, callback) //{{{
    {
      var x1 = a[0] / xscale,
          y1 = a[1] / yscale,
          x2 = a[2] / xscale,
          y2 = a[3] / yscale;

      if (animating) {
        return;
      }

      var animto = Coords.flipCoords(x1, y1, x2, y2),
          c = Coords.getFixed(),
          initcr = [c.x, c.y, c.x2, c.y2],
          animat = initcr,
          interv = options.animationDelay,
          ix1 = animto[0] - initcr[0],
          iy1 = animto[1] - initcr[1],
          ix2 = animto[2] - initcr[2],
          iy2 = animto[3] - initcr[3],
          pcent = 0,
          velocity = options.swingSpeed;

      x1 = animat[0];
      y1 = animat[1];
      x2 = animat[2];
      y2 = animat[3];

      Selection.animMode(true);
      var anim_timer;

      function queueAnimator() {
        window.setTimeout(animator, interv);
      }
      var animator = function () {
        return function () {
          pcent += (100 - pcent) / velocity;

          animat[0] = Math.round(x1 + pcent / 100 * ix1);
          animat[1] = Math.round(y1 + pcent / 100 * iy1);
          animat[2] = Math.round(x2 + pcent / 100 * ix2);
          animat[3] = Math.round(y2 + pcent / 100 * iy2);

          if (pcent >= 99.8) {
            pcent = 100;
          }
          if (pcent < 100) {
            setSelectRaw(animat);
            queueAnimator();
          } else {
            Selection.done();
            Selection.animMode(false);
            if (typeof callback === 'function') {
              callback.call(api);
            }
          }
        };
      }();
      queueAnimator();
    }
    //}}}
    function setSelect(rect) //{{{
    {
      setSelectRaw([rect[0] / xscale, rect[1] / yscale, rect[2] / xscale, rect[3] / yscale]);
      options.onSelect.call(api, unscale(Coords.getFixed()));
      Selection.enableHandles();
    }
    //}}}
    function setSelectRaw(l) //{{{
    {
      Coords.setPressed([l[0], l[1]]);
      Coords.setCurrent([l[2], l[3]]);
      Selection.update();
    }
    //}}}
    function tellSelect() //{{{
    {
      return unscale(Coords.getFixed());
    }
    //}}}
    function tellScaled() //{{{
    {
      return Coords.getFixed();
    }
    //}}}
    function setOptionsNew(opt) //{{{
    {
      setOptions(opt);
      interfaceUpdate();
    }
    //}}}
    function disableCrop() //{{{
    {
      options.disabled = true;
      Selection.disableHandles();
      Selection.setCursor('default');
      Tracker.setCursor('default');
    }
    //}}}
    function enableCrop() //{{{
    {
      options.disabled = false;
      interfaceUpdate();
    }
    //}}}
    function cancelCrop() //{{{
    {
      Selection.done();
      Tracker.activateHandlers(null, null);
    }
    //}}}
    function destroy() //{{{
    {
      $div.remove();
      $origimg.show();
      $origimg.css('visibility', 'visible');
      $(obj).removeData('Jcrop');
    }
    //}}}
    function setImage(src, callback) //{{{
    {
      Selection.release();
      disableCrop();
      var img = new Image();
      img.onload = function () {
        var iw = img.width;
        var ih = img.height;
        var bw = options.boxWidth;
        var bh = options.boxHeight;
        $img.width(iw).height(ih);
        $img.attr('src', src);
        $img2.attr('src', src);
        presize($img, bw, bh);
        boundx = $img.width();
        boundy = $img.height();
        $img2.width(boundx).height(boundy);
        $trk.width(boundx + bound * 2).height(boundy + bound * 2);
        $div.width(boundx).height(boundy);
        Shade.resize(boundx, boundy);
        enableCrop();

        if (typeof callback === 'function') {
          callback.call(api);
        }
      };
      img.src = src;
    }
    //}}}
    function colorChangeMacro($obj, color, now) {
      var mycolor = color || options.bgColor;
      if (options.bgFade && supportsColorFade() && options.fadeTime && !now) {
        $obj.animate({
          backgroundColor: mycolor
        }, {
          queue: false,
          duration: options.fadeTime
        });
      } else {
        $obj.css('backgroundColor', mycolor);
      }
    }
    function interfaceUpdate(alt) //{{{
    // This method tweaks the interface based on options object.
    // Called when options are changed and at end of initialization.
    {
      if (options.allowResize) {
        if (alt) {
          Selection.enableOnly();
        } else {
          Selection.enableHandles();
        }
      } else {
        Selection.disableHandles();
      }

      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
      Selection.setCursor(options.allowMove ? 'move' : 'default');

      if (options.hasOwnProperty('trueSize')) {
        xscale = options.trueSize[0] / boundx;
        yscale = options.trueSize[1] / boundy;
      }

      if (options.hasOwnProperty('setSelect')) {
        setSelect(options.setSelect);
        Selection.done();
        delete options.setSelect;
      }

      Shade.refresh();

      if (options.bgColor != bgcolor) {
        colorChangeMacro(options.shade ? Shade.getShades() : $div, options.shade ? options.shadeColor || options.bgColor : options.bgColor);
        bgcolor = options.bgColor;
      }

      if (bgopacity != options.bgOpacity) {
        bgopacity = options.bgOpacity;
        if (options.shade) Shade.refresh();else Selection.setBgOpacity(bgopacity);
      }

      xlimit = options.maxSize[0] || 0;
      ylimit = options.maxSize[1] || 0;
      xmin = options.minSize[0] || 0;
      ymin = options.minSize[1] || 0;

      if (options.hasOwnProperty('outerImage')) {
        $img.attr('src', options.outerImage);
        delete options.outerImage;
      }

      Selection.refresh();
    }
    //}}}
    //}}}

    if (Touch.support) $trk.bind('touchstart.jcrop', Touch.newSelection);

    $hdl_holder.hide();
    interfaceUpdate(true);

    var api = {
      setImage: setImage,
      animateTo: animateTo,
      setSelect: setSelect,
      setOptions: setOptionsNew,
      tellSelect: tellSelect,
      tellScaled: tellScaled,
      setClass: setClass,

      disable: disableCrop,
      enable: enableCrop,
      cancel: cancelCrop,
      release: Selection.release,
      destroy: destroy,

      focus: KeyManager.watchKeys,

      getBounds: function getBounds() {
        return [boundx * xscale, boundy * yscale];
      },
      getWidgetSize: function getWidgetSize() {
        return [boundx, boundy];
      },
      getScaleFactor: function getScaleFactor() {
        return [xscale, yscale];
      },
      getOptions: function getOptions() {
        // careful: internal values are returned
        return options;
      },

      ui: {
        holder: $div,
        selection: $sel
      }
    };

    if (is_msie) $div.bind('selectstart', function () {
      return false;
    });

    $origimg.data('Jcrop', api);
    return api;
  };
  $.fn.Jcrop = function (options, callback) //{{{
  {
    var api;
    // Iterate over each object, attach Jcrop
    this.each(function () {
      // If we've already attached to this object
      if ($(this).data('Jcrop')) {
        // The API can be requested this way (undocumented)
        if (options === 'api') return $(this).data('Jcrop');
        // Otherwise, we just reset the options...
        else $(this).data('Jcrop').setOptions(options);
      }
      // If we haven't been attached, preload and attach
      else {
          if (this.tagName == 'IMG') $.Jcrop.Loader(this, function () {
            $(this).css({ display: 'block', visibility: 'hidden' });
            api = $.Jcrop(this, options);
            if ($.isFunction(callback)) callback.call(api);
          });else {
            $(this).css({ display: 'block', visibility: 'hidden' });
            api = $.Jcrop(this, options);
            if ($.isFunction(callback)) callback.call(api);
          }
        }
    });

    // Return "this" so the object is chainable (jQuery-style)
    return this;
  };
  //}}}
  // $.Jcrop.Loader - basic image loader {{{

  $.Jcrop.Loader = function (imgobj, success, error) {
    var $img = $(imgobj),
        img = $img[0];

    function completeCheck() {
      if (img.complete) {
        $img.unbind('.jcloader');
        if ($.isFunction(success)) success.call(img);
      } else window.setTimeout(completeCheck, 50);
    }

    $img.bind('load.jcloader', completeCheck).bind('error.jcloader', function (e) {
      $img.unbind('.jcloader');
      if ($.isFunction(error)) error.call(img);
    });

    if (img.complete && $.isFunction(success)) {
      $img.unbind('.jcloader');
      success.call(img);
    }
  };

  //}}}
  // Global Defaults {{{
  $.Jcrop.defaults = {

    // Basic Settings
    allowSelect: true,
    allowMove: true,
    allowResize: true,

    trackDocument: true,

    // Styling Options
    baseClass: 'jcrop',
    addClass: null,
    bgColor: 'black',
    bgOpacity: 0.6,
    bgFade: false,
    borderOpacity: 0.4,
    handleOpacity: 0.5,
    handleSize: null,

    aspectRatio: 0,
    keySupport: true,
    createHandles: ['n', 's', 'e', 'w', 'nw', 'ne', 'se', 'sw'],
    createDragbars: ['n', 's', 'e', 'w'],
    createBorders: ['n', 's', 'e', 'w'],
    drawBorders: true,
    dragEdges: true,
    fixedSupport: true,
    touchSupport: null,

    shade: null,

    boxWidth: 0,
    boxHeight: 0,
    boundary: 2,
    fadeTime: 400,
    animationDelay: 20,
    swingSpeed: 3,

    minSelect: [0, 0],
    maxSize: [0, 0],
    minSize: [0, 0],

    // Callbacks / Event Handlers
    onChange: function onChange() {},
    onSelect: function onSelect() {},
    onDblClick: function onDblClick() {},
    onRelease: function onRelease() {}
  };

  // }}}
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * # Semantic UI 2.2.3 - Checkbox
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

  "use strict";

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.checkbox = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;

    $allModules.each(function () {
      var settings = $.extend(true, {}, $.fn.checkbox.settings, parameters),
          className = settings.className,
          namespace = settings.namespace,
          selector = settings.selector,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $label = $(this).children(selector.label),
          $input = $(this).children(selector.input),
          input = $input[0],
          _initialLoad = false,
          shortcutPressed = false,
          instance = $module.data(moduleNamespace),
          observer,
          element = this,
          module;

      module = {

        initialize: function initialize() {
          module.verbose('Initializing checkbox', settings);

          module.create.label();
          module.bind.events();

          module.set.tabbable();
          module.hide.input();

          module.observeChanges();
          module.instantiate();
          module.setup();
        },

        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },

        destroy: function destroy() {
          module.verbose('Destroying module');
          module.unbind.events();
          module.show.input();
          $module.removeData(moduleNamespace);
        },

        fix: {
          reference: function reference() {
            if ($module.is(selector.input)) {
              module.debug('Behavior called on <input> adjusting invoked element');
              $module = $module.closest(selector.checkbox);
              module.refresh();
            }
          }
        },

        setup: function setup() {
          module.set.initialLoad();
          if (module.is.indeterminate()) {
            module.debug('Initial value is indeterminate');
            module.indeterminate();
          } else if (module.is.checked()) {
            module.debug('Initial value is checked');
            module.check();
          } else {
            module.debug('Initial value is unchecked');
            module.uncheck();
          }
          module.remove.initialLoad();
        },

        refresh: function refresh() {
          $label = $module.children(selector.label);
          $input = $module.children(selector.input);
          input = $input[0];
        },

        hide: {
          input: function input() {
            module.verbose('Modifying <input> z-index to be unselectable');
            $input.addClass(className.hidden);
          }
        },
        show: {
          input: function input() {
            module.verbose('Modifying <input> z-index to be selectable');
            $input.removeClass(className.hidden);
          }
        },

        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            observer = new MutationObserver(function (mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
            });
            observer.observe(element, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },

        attachEvents: function attachEvents(selector, event) {
          var $element = $(selector);
          event = $.isFunction(module[event]) ? module[event] : module.toggle;
          if ($element.length > 0) {
            module.debug('Attaching checkbox events to element', selector, event);
            $element.on('click' + eventNamespace, event);
          } else {
            module.error(error.notFound);
          }
        },

        event: {
          click: function click(event) {
            var $target = $(event.target);
            if ($target.is(selector.input)) {
              module.verbose('Using default check action on initialized checkbox');
              return;
            }
            if ($target.is(selector.link)) {
              module.debug('Clicking link inside checkbox, skipping toggle');
              return;
            }
            module.toggle();
            $input.focus();
            event.preventDefault();
          },
          keydown: function keydown(event) {
            var key = event.which,
                keyCode = {
              enter: 13,
              space: 32,
              escape: 27
            };
            if (key == keyCode.escape) {
              module.verbose('Escape key pressed blurring field');
              $input.blur();
              shortcutPressed = true;
            } else if (!event.ctrlKey && (key == keyCode.space || key == keyCode.enter)) {
              module.verbose('Enter/space key pressed, toggling checkbox');
              module.toggle();
              shortcutPressed = true;
            } else {
              shortcutPressed = false;
            }
          },
          keyup: function keyup(event) {
            if (shortcutPressed) {
              event.preventDefault();
            }
          }
        },

        check: function check() {
          if (!module.should.allowCheck()) {
            return;
          }
          module.debug('Checking checkbox', $input);
          module.set.checked();
          if (!module.should.ignoreCallbacks()) {
            settings.onChecked.call(input);
            settings.onChange.call(input);
          }
        },

        uncheck: function uncheck() {
          if (!module.should.allowUncheck()) {
            return;
          }
          module.debug('Unchecking checkbox');
          module.set.unchecked();
          if (!module.should.ignoreCallbacks()) {
            settings.onUnchecked.call(input);
            settings.onChange.call(input);
          }
        },

        indeterminate: function indeterminate() {
          if (module.should.allowIndeterminate()) {
            module.debug('Checkbox is already indeterminate');
            return;
          }
          module.debug('Making checkbox indeterminate');
          module.set.indeterminate();
          if (!module.should.ignoreCallbacks()) {
            settings.onIndeterminate.call(input);
            settings.onChange.call(input);
          }
        },

        determinate: function determinate() {
          if (module.should.allowDeterminate()) {
            module.debug('Checkbox is already determinate');
            return;
          }
          module.debug('Making checkbox determinate');
          module.set.determinate();
          if (!module.should.ignoreCallbacks()) {
            settings.onDeterminate.call(input);
            settings.onChange.call(input);
          }
        },

        enable: function enable() {
          if (module.is.enabled()) {
            module.debug('Checkbox is already enabled');
            return;
          }
          module.debug('Enabling checkbox');
          module.set.enabled();
          settings.onEnable.call(input);
          // preserve legacy callbacks
          settings.onEnabled.call(input);
        },

        disable: function disable() {
          if (module.is.disabled()) {
            module.debug('Checkbox is already disabled');
            return;
          }
          module.debug('Disabling checkbox');
          module.set.disabled();
          settings.onDisable.call(input);
          // preserve legacy callbacks
          settings.onDisabled.call(input);
        },

        get: {
          radios: function radios() {
            var name = module.get.name();
            return $('input[name="' + name + '"]').closest(selector.checkbox);
          },
          otherRadios: function otherRadios() {
            return module.get.radios().not($module);
          },
          name: function name() {
            return $input.attr('name');
          }
        },

        is: {
          initialLoad: function initialLoad() {
            return _initialLoad;
          },
          radio: function radio() {
            return $input.hasClass(className.radio) || $input.attr('type') == 'radio';
          },
          indeterminate: function indeterminate() {
            return $input.prop('indeterminate') !== undefined && $input.prop('indeterminate');
          },
          checked: function checked() {
            return $input.prop('checked') !== undefined && $input.prop('checked');
          },
          disabled: function disabled() {
            return $input.prop('disabled') !== undefined && $input.prop('disabled');
          },
          enabled: function enabled() {
            return !module.is.disabled();
          },
          determinate: function determinate() {
            return !module.is.indeterminate();
          },
          unchecked: function unchecked() {
            return !module.is.checked();
          }
        },

        should: {
          allowCheck: function allowCheck() {
            if (module.is.determinate() && module.is.checked() && !module.should.forceCallbacks()) {
              module.debug('Should not allow check, checkbox is already checked');
              return false;
            }
            if (settings.beforeChecked.apply(input) === false) {
              module.debug('Should not allow check, beforeChecked cancelled');
              return false;
            }
            return true;
          },
          allowUncheck: function allowUncheck() {
            if (module.is.determinate() && module.is.unchecked() && !module.should.forceCallbacks()) {
              module.debug('Should not allow uncheck, checkbox is already unchecked');
              return false;
            }
            if (settings.beforeUnchecked.apply(input) === false) {
              module.debug('Should not allow uncheck, beforeUnchecked cancelled');
              return false;
            }
            return true;
          },
          allowIndeterminate: function allowIndeterminate() {
            if (module.is.indeterminate() && !module.should.forceCallbacks()) {
              module.debug('Should not allow indeterminate, checkbox is already indeterminate');
              return false;
            }
            if (settings.beforeIndeterminate.apply(input) === false) {
              module.debug('Should not allow indeterminate, beforeIndeterminate cancelled');
              return false;
            }
            return true;
          },
          allowDeterminate: function allowDeterminate() {
            if (module.is.determinate() && !module.should.forceCallbacks()) {
              module.debug('Should not allow determinate, checkbox is already determinate');
              return false;
            }
            if (settings.beforeDeterminate.apply(input) === false) {
              module.debug('Should not allow determinate, beforeDeterminate cancelled');
              return false;
            }
            return true;
          },
          forceCallbacks: function forceCallbacks() {
            return module.is.initialLoad() && settings.fireOnInit;
          },
          ignoreCallbacks: function ignoreCallbacks() {
            return _initialLoad && !settings.fireOnInit;
          }
        },

        can: {
          change: function change() {
            return !($module.hasClass(className.disabled) || $module.hasClass(className.readOnly) || $input.prop('disabled') || $input.prop('readonly'));
          },
          uncheck: function uncheck() {
            return typeof settings.uncheckable === 'boolean' ? settings.uncheckable : !module.is.radio();
          }
        },

        set: {
          initialLoad: function initialLoad() {
            _initialLoad = true;
          },
          checked: function checked() {
            module.verbose('Setting class to checked');
            $module.removeClass(className.indeterminate).addClass(className.checked);
            if (module.is.radio()) {
              module.uncheckOthers();
            }
            if (!module.is.indeterminate() && module.is.checked()) {
              module.debug('Input is already checked, skipping input property change');
              return;
            }
            module.verbose('Setting state to checked', input);
            $input.prop('indeterminate', false).prop('checked', true);
            module.trigger.change();
          },
          unchecked: function unchecked() {
            module.verbose('Removing checked class');
            $module.removeClass(className.indeterminate).removeClass(className.checked);
            if (!module.is.indeterminate() && module.is.unchecked()) {
              module.debug('Input is already unchecked');
              return;
            }
            module.debug('Setting state to unchecked');
            $input.prop('indeterminate', false).prop('checked', false);
            module.trigger.change();
          },
          indeterminate: function indeterminate() {
            module.verbose('Setting class to indeterminate');
            $module.addClass(className.indeterminate);
            if (module.is.indeterminate()) {
              module.debug('Input is already indeterminate, skipping input property change');
              return;
            }
            module.debug('Setting state to indeterminate');
            $input.prop('indeterminate', true);
            module.trigger.change();
          },
          determinate: function determinate() {
            module.verbose('Removing indeterminate class');
            $module.removeClass(className.indeterminate);
            if (module.is.determinate()) {
              module.debug('Input is already determinate, skipping input property change');
              return;
            }
            module.debug('Setting state to determinate');
            $input.prop('indeterminate', false);
          },
          disabled: function disabled() {
            module.verbose('Setting class to disabled');
            $module.addClass(className.disabled);
            if (module.is.disabled()) {
              module.debug('Input is already disabled, skipping input property change');
              return;
            }
            module.debug('Setting state to disabled');
            $input.prop('disabled', 'disabled');
            module.trigger.change();
          },
          enabled: function enabled() {
            module.verbose('Removing disabled class');
            $module.removeClass(className.disabled);
            if (module.is.enabled()) {
              module.debug('Input is already enabled, skipping input property change');
              return;
            }
            module.debug('Setting state to enabled');
            $input.prop('disabled', false);
            module.trigger.change();
          },
          tabbable: function tabbable() {
            module.verbose('Adding tabindex to checkbox');
            if ($input.attr('tabindex') === undefined) {
              $input.attr('tabindex', 0);
            }
          }
        },

        remove: {
          initialLoad: function initialLoad() {
            _initialLoad = false;
          }
        },

        trigger: {
          change: function change() {
            var events = document.createEvent('HTMLEvents'),
                inputElement = $input[0];
            if (inputElement) {
              module.verbose('Triggering native change event');
              events.initEvent('change', true, false);
              inputElement.dispatchEvent(events);
            }
          }
        },

        create: {
          label: function label() {
            if ($input.prevAll(selector.label).length > 0) {
              $input.prev(selector.label).detach().insertAfter($input);
              module.debug('Moving existing label', $label);
            } else if (!module.has.label()) {
              $label = $('<label>').insertAfter($input);
              module.debug('Creating label', $label);
            }
          }
        },

        has: {
          label: function label() {
            return $label.length > 0;
          }
        },

        bind: {
          events: function events() {
            module.verbose('Attaching checkbox events');
            $module.on('click' + eventNamespace, module.event.click).on('keydown' + eventNamespace, selector.input, module.event.keydown).on('keyup' + eventNamespace, selector.input, module.event.keyup);
          }
        },

        unbind: {
          events: function events() {
            module.debug('Removing events');
            $module.off(eventNamespace);
          }
        },

        uncheckOthers: function uncheckOthers() {
          var $radios = module.get.otherRadios();
          module.debug('Unchecking other radios', $radios);
          $radios.removeClass(className.checked);
        },

        toggle: function toggle() {
          if (!module.can.change()) {
            if (!module.is.radio()) {
              module.debug('Checkbox is read-only or disabled, ignoring toggle');
            }
            return;
          }
          if (module.is.indeterminate() || module.is.unchecked()) {
            module.debug('Currently unchecked');
            module.check();
          } else if (module.is.checked() && module.can.uncheck()) {
            module.debug('Currently checked');
            module.uncheck();
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;
            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;
          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }
          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    });

    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.checkbox.settings = {

    name: 'Checkbox',
    namespace: 'checkbox',

    silent: false,
    debug: false,
    verbose: true,
    performance: true,

    // delegated event context
    uncheckable: 'auto',
    fireOnInit: false,

    onChange: function onChange() {},

    beforeChecked: function beforeChecked() {},
    beforeUnchecked: function beforeUnchecked() {},
    beforeDeterminate: function beforeDeterminate() {},
    beforeIndeterminate: function beforeIndeterminate() {},

    onChecked: function onChecked() {},
    onUnchecked: function onUnchecked() {},

    onDeterminate: function onDeterminate() {},
    onIndeterminate: function onIndeterminate() {},

    onEnable: function onEnable() {},
    onDisable: function onDisable() {},

    // preserve misspelled callbacks (will be removed in 3.0)
    onEnabled: function onEnabled() {},
    onDisabled: function onDisabled() {},

    className: {
      checked: 'checked',
      indeterminate: 'indeterminate',
      disabled: 'disabled',
      hidden: 'hidden',
      radio: 'radio',
      readOnly: 'read-only'
    },

    error: {
      method: 'The method you called is not defined'
    },

    selector: {
      checkbox: '.ui.checkbox',
      label: 'label, .box',
      input: 'input[type="checkbox"], input[type="radio"]',
      link: 'a[href]'
    }

  };
})(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * # Semantic UI 2.2.2 - Dropdown
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

  "use strict";

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.dropdown = function (parameters) {
    var $allModules = $(this),
        $document = $(document),
        moduleSelector = $allModules.selector || '',
        hasTouch = 'ontouchstart' in document.documentElement,
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;

    $allModules.each(function (elementIndex) {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.dropdown.settings, parameters) : $.extend({}, $.fn.dropdown.settings),
          className = settings.className,
          message = settings.message,
          fields = settings.fields,
          keys = settings.keys,
          metadata = settings.metadata,
          namespace = settings.namespace,
          _regExp = settings.regExp,
          selector = settings.selector,
          error = settings.error,
          templates = settings.templates,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $context = $(settings.context),
          $text = $module.find(selector.text),
          $search = $module.find(selector.search),
          $sizer = $module.find(selector.sizer),
          $input = $module.find(selector.input),
          $icon = $module.find(selector.icon),
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev(),
          $menu = $module.children(selector.menu),
          $item = $menu.find(selector.item),
          activated = false,
          itemActivated = false,
          internalChange = false,
          element = this,
          instance = $module.data(moduleNamespace),
          _initialLoad,
          pageLostFocus,
          willRefocus,
          elementNamespace,
          _id,
          selectObserver,
          _menuObserver,
          module;

      module = {

        initialize: function initialize() {
          module.debug('Initializing dropdown', settings);

          if (module.is.alreadySetup()) {
            module.setup.reference();
          } else {
            module.setup.layout();
            module.refreshData();

            module.save.defaults();
            module.restore.selected();

            module.create.id();
            module.bind.events();

            module.observeChanges();
            module.instantiate();
          }
        },

        instantiate: function instantiate() {
          module.verbose('Storing instance of dropdown', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },

        destroy: function destroy() {
          module.verbose('Destroying previous dropdown', $module);
          module.remove.tabbable();
          $module.off(eventNamespace).removeData(moduleNamespace);
          $menu.off(eventNamespace);
          $document.off(elementNamespace);
          module.disconnect.menuObserver();
          module.disconnect.selectObserver();
        },

        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            selectObserver = new MutationObserver(module.event.select.mutation);
            _menuObserver = new MutationObserver(module.event.menu.mutation);
            module.debug('Setting up mutation observer', selectObserver, _menuObserver);
            module.observe.select();
            module.observe.menu();
          }
        },

        disconnect: {
          menuObserver: function menuObserver() {
            if (_menuObserver) {
              _menuObserver.disconnect();
            }
          },
          selectObserver: function selectObserver() {
            if (_menuObserver) {
              _menuObserver.disconnect();
            }
          }
        },
        observe: {
          select: function select() {
            if (module.has.input()) {
              selectObserver.observe($input[0], {
                childList: true,
                subtree: true
              });
            }
          },
          menu: function menu() {
            if (module.has.menu()) {
              _menuObserver.observe($menu[0], {
                childList: true,
                subtree: true
              });
            }
          }
        },

        create: {
          id: function id() {
            _id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + _id;
            module.verbose('Creating unique id for element', _id);
          },
          userChoice: function userChoice(values) {
            var $userChoices, $userChoice, isUserValue, html;
            values = values || module.get.userValues();
            if (!values) {
              return false;
            }
            values = $.isArray(values) ? values : [values];
            $.each(values, function (index, value) {
              if (module.get.item(value) === false) {
                html = settings.templates.addition(module.add.variables(message.addResult, value));
                $userChoice = $('<div />').html(html).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).addClass(className.addition).addClass(className.item);
                if (settings.hideAdditions) {
                  $userChoice.addClass(className.hidden);
                }
                $userChoices = $userChoices === undefined ? $userChoice : $userChoices.add($userChoice);
                module.verbose('Creating user choices for value', value, $userChoice);
              }
            });
            return $userChoices;
          },
          userLabels: function userLabels(value) {
            var userValues = module.get.userValues();
            if (userValues) {
              module.debug('Adding user labels', userValues);
              $.each(userValues, function (index, value) {
                module.verbose('Adding custom user value');
                module.add.label(value, value);
              });
            }
          },
          menu: function menu() {
            $menu = $('<div />').addClass(className.menu).appendTo($module);
          },
          sizer: function sizer() {
            $sizer = $('<span />').addClass(className.sizer).insertAfter($search);
          }
        },

        search: function search(query) {
          query = query !== undefined ? query : module.get.query();
          module.verbose('Searching for query', query);
          if (module.has.minCharacters(query)) {
            module.filter(query);
          } else {
            module.hide();
          }
        },

        select: {
          firstUnfiltered: function firstUnfiltered() {
            module.verbose('Selecting first non-filtered element');
            module.remove.selectedItem();
            $item.not(selector.unselectable).not(selector.addition + selector.hidden).eq(0).addClass(className.selected);
          },
          nextAvailable: function nextAvailable($selected) {
            $selected = $selected.eq(0);
            var $nextAvailable = $selected.nextAll(selector.item).not(selector.unselectable).eq(0),
                $prevAvailable = $selected.prevAll(selector.item).not(selector.unselectable).eq(0),
                hasNext = $nextAvailable.length > 0;
            if (hasNext) {
              module.verbose('Moving selection to', $nextAvailable);
              $nextAvailable.addClass(className.selected);
            } else {
              module.verbose('Moving selection to', $prevAvailable);
              $prevAvailable.addClass(className.selected);
            }
          }
        },

        setup: {
          api: function api() {
            var apiSettings = {
              debug: settings.debug,
              urlData: {
                value: module.get.value(),
                query: module.get.query()
              },
              on: false
            };
            module.verbose('First request, initializing API');
            $module.api(apiSettings);
          },
          layout: function layout() {
            if ($module.is('select')) {
              module.setup.select();
              module.setup.returnedObject();
            }
            if (!module.has.menu()) {
              module.create.menu();
            }
            if (module.is.search() && !module.has.search()) {
              module.verbose('Adding search input');
              $search = $('<input />').addClass(className.search).prop('autocomplete', 'off').insertBefore($text);
            }
            if (module.is.multiple() && module.is.searchSelection() && !module.has.sizer()) {
              module.create.sizer();
            }
            if (settings.allowTab) {
              module.set.tabbable();
            }
          },
          select: function select() {
            var selectValues = module.get.selectValues();
            module.debug('Dropdown initialized on a select', selectValues);
            if ($module.is('select')) {
              $input = $module;
            }
            // see if select is placed correctly already
            if ($input.parent(selector.dropdown).length > 0) {
              module.debug('UI dropdown already exists. Creating dropdown menu only');
              $module = $input.closest(selector.dropdown);
              if (!module.has.menu()) {
                module.create.menu();
              }
              $menu = $module.children(selector.menu);
              module.setup.menu(selectValues);
            } else {
              module.debug('Creating entire dropdown from select');
              $module = $('<div />').attr('class', $input.attr('class')).addClass(className.selection).addClass(className.dropdown).html(templates.dropdown(selectValues)).insertBefore($input);
              if ($input.hasClass(className.multiple) && $input.prop('multiple') === false) {
                module.error(error.missingMultiple);
                $input.prop('multiple', true);
              }
              if ($input.is('[multiple]')) {
                module.set.multiple();
              }
              if ($input.prop('disabled')) {
                module.debug('Disabling dropdown');
                $module.addClass(className.disabled);
              }
              $input.removeAttr('class').detach().prependTo($module);
            }
            module.refresh();
          },
          menu: function menu(values) {
            $menu.html(templates.menu(values, fields));
            $item = $menu.find(selector.item);
          },
          reference: function reference() {
            module.debug('Dropdown behavior was called on select, replacing with closest dropdown');
            // replace module reference
            $module = $module.parent(selector.dropdown);
            module.refresh();
            module.setup.returnedObject();
            // invoke method in context of current instance
            if (methodInvoked) {
              instance = module;
              module.invoke(query);
            }
          },
          returnedObject: function returnedObject() {
            var $firstModules = $allModules.slice(0, elementIndex),
                $lastModules = $allModules.slice(elementIndex + 1);
            // adjust all modules to use correct reference
            $allModules = $firstModules.add($module).add($lastModules);
          }
        },

        refresh: function refresh() {
          module.refreshSelectors();
          module.refreshData();
        },

        refreshItems: function refreshItems() {
          $item = $menu.find(selector.item);
        },

        refreshSelectors: function refreshSelectors() {
          module.verbose('Refreshing selector cache');
          $text = $module.find(selector.text);
          $search = $module.find(selector.search);
          $input = $module.find(selector.input);
          $icon = $module.find(selector.icon);
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev();
          $menu = $module.children(selector.menu);
          $item = $menu.find(selector.item);
        },

        refreshData: function refreshData() {
          module.verbose('Refreshing cached metadata');
          $item.removeData(metadata.text).removeData(metadata.value);
        },

        clearData: function clearData() {
          module.verbose('Clearing metadata');
          $item.removeData(metadata.text).removeData(metadata.value);
          $module.removeData(metadata.defaultText).removeData(metadata.defaultValue).removeData(metadata.placeholderText);
        },

        toggle: function toggle() {
          module.verbose('Toggling menu visibility');
          if (!module.is.active()) {
            module.show();
          } else {
            module.hide();
          }
        },

        show: function show(callback) {
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.can.show() && !module.is.active()) {
            module.debug('Showing dropdown');
            if (module.has.message() && !(module.has.maxSelections() || module.has.allResultsFiltered())) {
              module.remove.message();
            }
            if (module.is.allFiltered()) {
              return true;
            }
            if (settings.onShow.call(element) !== false) {
              module.animate.show(function () {
                if (module.can.click()) {
                  module.bind.intent();
                }
                if (module.has.menuSearch()) {
                  module.focusSearch();
                }
                module.set.visible();
                callback.call(element);
              });
            }
          }
        },

        hide: function hide(callback) {
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.active()) {
            module.debug('Hiding dropdown');
            if (settings.onHide.call(element) !== false) {
              module.animate.hide(function () {
                module.remove.visible();
                callback.call(element);
              });
            }
          }
        },

        hideOthers: function hideOthers() {
          module.verbose('Finding other dropdowns to hide');
          $allModules.not($module).has(selector.menu + '.' + className.visible).dropdown('hide');
        },

        hideMenu: function hideMenu() {
          module.verbose('Hiding menu  instantaneously');
          module.remove.active();
          module.remove.visible();
          $menu.transition('hide');
        },

        hideSubMenus: function hideSubMenus() {
          var $subMenus = $menu.children(selector.item).find(selector.menu);
          module.verbose('Hiding sub menus', $subMenus);
          $subMenus.transition('hide');
        },

        bind: {
          events: function events() {
            if (hasTouch) {
              module.bind.touchEvents();
            }
            module.bind.keyboardEvents();
            module.bind.inputEvents();
            module.bind.mouseEvents();
          },
          touchEvents: function touchEvents() {
            module.debug('Touch device detected binding additional touch events');
            if (module.is.searchSelection()) {
              // do nothing special yet
            } else if (module.is.single()) {
              $module.on('touchstart' + eventNamespace, module.event.test.toggle);
            }
            $menu.on('touchstart' + eventNamespace, selector.item, module.event.item.mouseenter);
          },
          keyboardEvents: function keyboardEvents() {
            module.verbose('Binding keyboard events');
            $module.on('keydown' + eventNamespace, module.event.keydown);
            if (module.has.search()) {
              $module.on(module.get.inputEvent() + eventNamespace, selector.search, module.event.input);
            }
            if (module.is.multiple()) {
              $document.on('keydown' + elementNamespace, module.event.document.keydown);
            }
          },
          inputEvents: function inputEvents() {
            module.verbose('Binding input change events');
            $module.on('change' + eventNamespace, selector.input, module.event.change);
          },
          mouseEvents: function mouseEvents() {
            module.verbose('Binding mouse events');
            if (module.is.multiple()) {
              $module.on('click' + eventNamespace, selector.label, module.event.label.click).on('click' + eventNamespace, selector.remove, module.event.remove.click);
            }
            if (module.is.searchSelection()) {
              $module.on('mousedown' + eventNamespace, module.event.mousedown).on('mouseup' + eventNamespace, module.event.mouseup).on('mousedown' + eventNamespace, selector.menu, module.event.menu.mousedown).on('mouseup' + eventNamespace, selector.menu, module.event.menu.mouseup).on('click' + eventNamespace, selector.icon, module.event.icon.click).on('focus' + eventNamespace, selector.search, module.event.search.focus).on('click' + eventNamespace, selector.search, module.event.search.focus).on('blur' + eventNamespace, selector.search, module.event.search.blur).on('click' + eventNamespace, selector.text, module.event.text.focus);
              if (module.is.multiple()) {
                $module.on('click' + eventNamespace, module.event.click);
              }
            } else {
              if (settings.on == 'click') {
                $module.on('click' + eventNamespace, selector.icon, module.event.icon.click).on('click' + eventNamespace, module.event.test.toggle);
              } else if (settings.on == 'hover') {
                $module.on('mouseenter' + eventNamespace, module.delay.show).on('mouseleave' + eventNamespace, module.delay.hide);
              } else {
                $module.on(settings.on + eventNamespace, module.toggle);
              }
              $module.on('mousedown' + eventNamespace, module.event.mousedown).on('mouseup' + eventNamespace, module.event.mouseup).on('focus' + eventNamespace, module.event.focus).on('blur' + eventNamespace, module.event.blur);
            }
            $menu.on('mouseenter' + eventNamespace, selector.item, module.event.item.mouseenter).on('mouseleave' + eventNamespace, selector.item, module.event.item.mouseleave).on('click' + eventNamespace, selector.item, module.event.item.click);
          },
          intent: function intent() {
            module.verbose('Binding hide intent event to document');
            if (hasTouch) {
              $document.on('touchstart' + elementNamespace, module.event.test.touch).on('touchmove' + elementNamespace, module.event.test.touch);
            }
            $document.on('click' + elementNamespace, module.event.test.hide);
          }
        },

        unbind: {
          intent: function intent() {
            module.verbose('Removing hide intent event from document');
            if (hasTouch) {
              $document.off('touchstart' + elementNamespace).off('touchmove' + elementNamespace);
            }
            $document.off('click' + elementNamespace);
          }
        },

        filter: function filter(query) {
          var searchTerm = query !== undefined ? query : module.get.query(),
              afterFiltered = function afterFiltered() {
            if (module.is.multiple()) {
              module.filterActive();
            }
            module.select.firstUnfiltered();
            if (module.has.allResultsFiltered()) {
              if (settings.onNoResults.call(element, searchTerm)) {
                if (settings.allowAdditions) {
                  if (settings.hideAdditions) {
                    module.verbose('User addition with no menu, setting empty style');
                    module.set.empty();
                    module.hideMenu();
                  }
                } else {
                  module.verbose('All items filtered, showing message', searchTerm);
                  module.add.message(message.noResults);
                }
              } else {
                module.verbose('All items filtered, hiding dropdown', searchTerm);
                module.hideMenu();
              }
            } else {
              module.remove.empty();
              module.remove.message();
            }
            if (settings.allowAdditions) {
              module.add.userSuggestion(query);
            }
            if (module.is.searchSelection() && module.can.show() && module.is.focusedOnSearch()) {
              module.show();
            }
          };
          if (settings.useLabels && module.has.maxSelections()) {
            return;
          }
          if (settings.apiSettings) {
            if (module.can.useAPI()) {
              module.queryRemote(searchTerm, function () {
                afterFiltered();
              });
            } else {
              module.error(error.noAPI);
            }
          } else {
            module.filterItems(searchTerm);
            afterFiltered();
          }
        },

        queryRemote: function queryRemote(query, callback) {
          var apiSettings = {
            errorDuration: false,
            cache: 'local',
            throttle: settings.throttle,
            urlData: {
              query: query
            },
            onError: function onError() {
              module.add.message(message.serverError);
              callback();
            },
            onFailure: function onFailure() {
              module.add.message(message.serverError);
              callback();
            },
            onSuccess: function onSuccess(response) {
              module.remove.message();
              module.setup.menu({
                values: response[fields.remoteValues]
              });
              callback();
            }
          };
          if (!$module.api('get request')) {
            module.setup.api();
          }
          apiSettings = $.extend(true, {}, apiSettings, settings.apiSettings);
          $module.api('setting', apiSettings).api('query');
        },

        filterItems: function filterItems(query) {
          var searchTerm = query !== undefined ? query : module.get.query(),
              results = null,
              escapedTerm = module.escape.regExp(searchTerm),
              beginsWithRegExp = new RegExp('^' + escapedTerm, 'igm');
          // avoid loop if we're matching nothing
          if (module.has.query()) {
            results = [];

            module.verbose('Searching for matching values', searchTerm);
            $item.each(function () {
              var $choice = $(this),
                  text,
                  value;
              if (settings.match == 'both' || settings.match == 'text') {
                text = String(module.get.choiceText($choice, false));
                if (text.search(beginsWithRegExp) !== -1) {
                  results.push(this);
                  return true;
                } else if (settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, text)) {
                  results.push(this);
                  return true;
                } else if (settings.fullTextSearch === true && module.fuzzySearch(searchTerm, text)) {
                  results.push(this);
                  return true;
                }
              }
              if (settings.match == 'both' || settings.match == 'value') {
                value = String(module.get.choiceValue($choice, text));

                if (value.search(beginsWithRegExp) !== -1) {
                  results.push(this);
                  return true;
                } else if (settings.fullTextSearch && module.fuzzySearch(searchTerm, value)) {
                  results.push(this);
                  return true;
                }
              }
            });
          }
          module.debug('Showing only matched items', searchTerm);
          module.remove.filteredItem();
          if (results) {
            $item.not(results).addClass(className.filtered);
          }
        },

        fuzzySearch: function fuzzySearch(query, term) {
          var termLength = term.length,
              queryLength = query.length;
          query = query.toLowerCase();
          term = term.toLowerCase();
          if (queryLength > termLength) {
            return false;
          }
          if (queryLength === termLength) {
            return query === term;
          }
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var queryCharacter = query.charCodeAt(characterIndex);
            while (nextCharacterIndex < termLength) {
              if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;
              }
            }
            return false;
          }
          return true;
        },
        exactSearch: function exactSearch(query, term) {
          query = query.toLowerCase();
          term = term.toLowerCase();
          if (term.indexOf(query) > -1) {
            return true;
          }
          return false;
        },
        filterActive: function filterActive() {
          if (settings.useLabels) {
            $item.filter('.' + className.active).addClass(className.filtered);
          }
        },

        focusSearch: function focusSearch(skipHandler) {
          if (module.has.search() && !module.is.focusedOnSearch()) {
            if (skipHandler) {
              $module.off('focus' + eventNamespace, selector.search);
              $search.focus();
              $module.on('focus' + eventNamespace, selector.search, module.event.search.focus);
            } else {
              $search.focus();
            }
          }
        },

        forceSelection: function forceSelection() {
          var $currentlySelected = $item.not(className.filtered).filter('.' + className.selected).eq(0),
              $activeItem = $item.not(className.filtered).filter('.' + className.active).eq(0),
              $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
              hasSelected = $selectedItem.length > 0;
          if (hasSelected) {
            module.debug('Forcing partial selection to selected item', $selectedItem);
            module.event.item.click.call($selectedItem, {}, true);
            return;
          } else {
            if (settings.allowAdditions) {
              module.set.selected(module.get.query());
              module.remove.searchTerm();
            } else {
              module.remove.searchTerm();
            }
          }
        },

        event: {
          change: function change() {
            if (!internalChange) {
              module.debug('Input changed, updating selection');
              module.set.selected();
            }
          },
          focus: function focus() {
            if (settings.showOnFocus && !activated && module.is.hidden() && !pageLostFocus) {
              module.show();
            }
          },
          blur: function blur(event) {
            pageLostFocus = document.activeElement === this;
            if (!activated && !pageLostFocus) {
              module.remove.activeLabel();
              module.hide();
            }
          },
          mousedown: function mousedown() {
            if (module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = true;
            } else {
              // prevents focus callback from occurring on mousedown
              activated = true;
            }
          },
          mouseup: function mouseup() {
            if (module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = false;
            } else {
              activated = false;
            }
          },
          click: function click(event) {
            var $target = $(event.target);
            // focus search
            if ($target.is($module)) {
              if (!module.is.focusedOnSearch()) {
                module.focusSearch();
              } else {
                module.show();
              }
            }
          },
          search: {
            focus: function focus() {
              activated = true;
              if (module.is.multiple()) {
                module.remove.activeLabel();
              }
              if (settings.showOnFocus) {
                module.search();
              }
            },
            blur: function blur(event) {
              pageLostFocus = document.activeElement === this;
              if (!willRefocus) {
                if (!itemActivated && !pageLostFocus) {
                  if (settings.forceSelection && module.has.query()) {
                    module.forceSelection();
                  }
                  module.hide();
                }
              }
              willRefocus = false;
            }
          },
          icon: {
            click: function click(event) {
              module.toggle();
              event.stopPropagation();
            }
          },
          text: {
            focus: function focus(event) {
              activated = true;
              module.focusSearch();
            }
          },
          input: function input(event) {
            if (module.is.multiple() || module.is.searchSelection()) {
              module.set.filtered();
            }
            clearTimeout(module.timer);
            module.timer = setTimeout(module.search, settings.delay.search);
          },
          label: {
            click: function click(event) {
              var $label = $(this),
                  $labels = $module.find(selector.label),
                  $activeLabels = $labels.filter('.' + className.active),
                  $nextActive = $label.nextAll('.' + className.active),
                  $prevActive = $label.prevAll('.' + className.active),
                  $range = $nextActive.length > 0 ? $label.nextUntil($nextActive).add($activeLabels).add($label) : $label.prevUntil($prevActive).add($activeLabels).add($label);
              if (event.shiftKey) {
                $activeLabels.removeClass(className.active);
                $range.addClass(className.active);
              } else if (event.ctrlKey) {
                $label.toggleClass(className.active);
              } else {
                $activeLabels.removeClass(className.active);
                $label.addClass(className.active);
              }
              settings.onLabelSelect.apply(this, $labels.filter('.' + className.active));
            }
          },
          remove: {
            click: function click() {
              var $label = $(this).parent();
              if ($label.hasClass(className.active)) {
                // remove all selected labels
                module.remove.activeLabels();
              } else {
                // remove this label only
                module.remove.activeLabels($label);
              }
            }
          },
          test: {
            toggle: function toggle(event) {
              var toggleBehavior = module.is.multiple() ? module.show : module.toggle;
              if (module.is.bubbledLabelClick(event)) {
                return;
              }
              if (module.determine.eventOnElement(event, toggleBehavior)) {
                event.preventDefault();
              }
            },
            touch: function touch(event) {
              module.determine.eventOnElement(event, function () {
                if (event.type == 'touchstart') {
                  module.timer = setTimeout(function () {
                    module.hide();
                  }, settings.delay.touch);
                } else if (event.type == 'touchmove') {
                  clearTimeout(module.timer);
                }
              });
              event.stopPropagation();
            },
            hide: function hide(event) {
              module.determine.eventInModule(event, module.hide);
            }
          },
          select: {
            mutation: function mutation(mutations) {
              module.debug('<select> modified, recreating menu');
              module.setup.select();
            }
          },
          menu: {
            mutation: function mutation(mutations) {
              var mutation = mutations[0],
                  $addedNode = mutation.addedNodes ? $(mutation.addedNodes[0]) : $(false),
                  $removedNode = mutation.removedNodes ? $(mutation.removedNodes[0]) : $(false),
                  $changedNodes = $addedNode.add($removedNode),
                  isUserAddition = $changedNodes.is(selector.addition) || $changedNodes.closest(selector.addition).length > 0,
                  isMessage = $changedNodes.is(selector.message) || $changedNodes.closest(selector.message).length > 0;
              if (isUserAddition || isMessage) {
                module.debug('Updating item selector cache');
                module.refreshItems();
              } else {
                module.debug('Menu modified, updating selector cache');
                module.refresh();
              }
            },
            mousedown: function mousedown() {
              itemActivated = true;
            },
            mouseup: function mouseup() {
              itemActivated = false;
            }
          },
          item: {
            mouseenter: function mouseenter(event) {
              var $target = $(event.target),
                  $item = $(this),
                  $subMenu = $item.children(selector.menu),
                  $otherMenus = $item.siblings(selector.item).children(selector.menu),
                  hasSubMenu = $subMenu.length > 0,
                  isBubbledEvent = $subMenu.find($target).length > 0;
              if (!isBubbledEvent && hasSubMenu) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function () {
                  module.verbose('Showing sub-menu', $subMenu);
                  $.each($otherMenus, function () {
                    module.animate.hide(false, $(this));
                  });
                  module.animate.show(false, $subMenu);
                }, settings.delay.show);
                event.preventDefault();
              }
            },
            mouseleave: function mouseleave(event) {
              var $subMenu = $(this).children(selector.menu);
              if ($subMenu.length > 0) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function () {
                  module.verbose('Hiding sub-menu', $subMenu);
                  module.animate.hide(false, $subMenu);
                }, settings.delay.hide);
              }
            },
            click: function click(event, skipRefocus) {
              var $choice = $(this),
                  $target = event ? $(event.target) : $(''),
                  $subMenu = $choice.find(selector.menu),
                  text = module.get.choiceText($choice),
                  value = module.get.choiceValue($choice, text),
                  hasSubMenu = $subMenu.length > 0,
                  isBubbledEvent = $subMenu.find($target).length > 0;
              if (!isBubbledEvent && (!hasSubMenu || settings.allowCategorySelection)) {
                if (module.is.searchSelection()) {
                  if (settings.allowAdditions) {
                    module.remove.userAddition();
                  }
                  module.remove.searchTerm();
                  if (!module.is.focusedOnSearch() && !(skipRefocus == true)) {
                    module.focusSearch(true);
                  }
                }
                if (!settings.useLabels) {
                  module.remove.filteredItem();
                  module.set.scrollPosition($choice);
                }
                module.determine.selectAction.call(this, text, value);
              }
            }
          },

          document: {
            // label selection should occur even when element has no focus
            keydown: function keydown(event) {
              var pressedKey = event.which,
                  isShortcutKey = module.is.inObject(pressedKey, keys);
              if (isShortcutKey) {
                var $label = $module.find(selector.label),
                    $activeLabel = $label.filter('.' + className.active),
                    activeValue = $activeLabel.data(metadata.value),
                    labelIndex = $label.index($activeLabel),
                    labelCount = $label.length,
                    hasActiveLabel = $activeLabel.length > 0,
                    hasMultipleActive = $activeLabel.length > 1,
                    isFirstLabel = labelIndex === 0,
                    isLastLabel = labelIndex + 1 == labelCount,
                    isSearch = module.is.searchSelection(),
                    isFocusedOnSearch = module.is.focusedOnSearch(),
                    isFocused = module.is.focused(),
                    caretAtStart = isFocusedOnSearch && module.get.caretPosition() === 0,
                    $nextLabel;
                if (isSearch && !hasActiveLabel && !isFocusedOnSearch) {
                  return;
                }

                if (pressedKey == keys.leftArrow) {
                  // activate previous label
                  if ((isFocused || caretAtStart) && !hasActiveLabel) {
                    module.verbose('Selecting previous label');
                    $label.last().addClass(className.active);
                  } else if (hasActiveLabel) {
                    if (!event.shiftKey) {
                      module.verbose('Selecting previous label');
                      $label.removeClass(className.active);
                    } else {
                      module.verbose('Adding previous label to selection');
                    }
                    if (isFirstLabel && !hasMultipleActive) {
                      $activeLabel.addClass(className.active);
                    } else {
                      $activeLabel.prev(selector.siblingLabel).addClass(className.active).end();
                    }
                    event.preventDefault();
                  }
                } else if (pressedKey == keys.rightArrow) {
                  // activate first label
                  if (isFocused && !hasActiveLabel) {
                    $label.first().addClass(className.active);
                  }
                  // activate next label
                  if (hasActiveLabel) {
                    if (!event.shiftKey) {
                      module.verbose('Selecting next label');
                      $label.removeClass(className.active);
                    } else {
                      module.verbose('Adding next label to selection');
                    }
                    if (isLastLabel) {
                      if (isSearch) {
                        if (!isFocusedOnSearch) {
                          module.focusSearch();
                        } else {
                          $label.removeClass(className.active);
                        }
                      } else if (hasMultipleActive) {
                        $activeLabel.next(selector.siblingLabel).addClass(className.active);
                      } else {
                        $activeLabel.addClass(className.active);
                      }
                    } else {
                      $activeLabel.next(selector.siblingLabel).addClass(className.active);
                    }
                    event.preventDefault();
                  }
                } else if (pressedKey == keys.deleteKey || pressedKey == keys.backspace) {
                  if (hasActiveLabel) {
                    module.verbose('Removing active labels');
                    if (isLastLabel) {
                      if (isSearch && !isFocusedOnSearch) {
                        module.focusSearch();
                      }
                    }
                    $activeLabel.last().next(selector.siblingLabel).addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                    event.preventDefault();
                  } else if (caretAtStart && !hasActiveLabel && pressedKey == keys.backspace) {
                    module.verbose('Removing last label on input backspace');
                    $activeLabel = $label.last().addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                  }
                } else {
                  $activeLabel.removeClass(className.active);
                }
              }
            }
          },

          keydown: function keydown(event) {
            var pressedKey = event.which,
                isShortcutKey = module.is.inObject(pressedKey, keys);
            if (isShortcutKey) {
              var $currentlySelected = $item.not(selector.unselectable).filter('.' + className.selected).eq(0),
                  $activeItem = $menu.children('.' + className.active).eq(0),
                  $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
                  $visibleItems = $selectedItem.length > 0 ? $selectedItem.siblings(':not(.' + className.filtered + ')').addBack() : $menu.children(':not(.' + className.filtered + ')'),
                  $subMenu = $selectedItem.children(selector.menu),
                  $parentMenu = $selectedItem.closest(selector.menu),
                  inVisibleMenu = $parentMenu.hasClass(className.visible) || $parentMenu.hasClass(className.animating) || $parentMenu.parent(selector.menu).length > 0,
                  hasSubMenu = $subMenu.length > 0,
                  hasSelectedItem = $selectedItem.length > 0,
                  selectedIsSelectable = $selectedItem.not(selector.unselectable).length > 0,
                  delimiterPressed = pressedKey == keys.delimiter && settings.allowAdditions && module.is.multiple(),
                  isAdditionWithoutMenu = settings.allowAdditions && settings.hideAdditions && (pressedKey == keys.enter || delimiterPressed) && selectedIsSelectable,
                  $nextItem,
                  isSubMenuItem,
                  newIndex;
              // allow selection with menu closed
              if (isAdditionWithoutMenu) {
                module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                module.event.item.click.call($selectedItem, event);
                if (module.is.searchSelection()) {
                  module.remove.searchTerm();
                }
              }

              // visible menu keyboard shortcuts
              if (module.is.visible()) {

                // enter (select or open sub-menu)
                if (pressedKey == keys.enter || delimiterPressed) {
                  if (pressedKey == keys.enter && hasSelectedItem && hasSubMenu && !settings.allowCategorySelection) {
                    module.verbose('Pressed enter on unselectable category, opening sub menu');
                    pressedKey = keys.rightArrow;
                  } else if (selectedIsSelectable) {
                    module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                    module.event.item.click.call($selectedItem, event);
                    if (module.is.searchSelection()) {
                      module.remove.searchTerm();
                    }
                  }
                  event.preventDefault();
                }

                // sub-menu actions
                if (hasSelectedItem) {

                  if (pressedKey == keys.leftArrow) {

                    isSubMenuItem = $parentMenu[0] !== $menu[0];

                    if (isSubMenuItem) {
                      module.verbose('Left key pressed, closing sub-menu');
                      module.animate.hide(false, $parentMenu);
                      $selectedItem.removeClass(className.selected);
                      $parentMenu.closest(selector.item).addClass(className.selected);
                      event.preventDefault();
                    }
                  }

                  // right arrow (show sub-menu)
                  if (pressedKey == keys.rightArrow) {
                    if (hasSubMenu) {
                      module.verbose('Right key pressed, opening sub-menu');
                      module.animate.show(false, $subMenu);
                      $selectedItem.removeClass(className.selected);
                      $subMenu.find(selector.item).eq(0).addClass(className.selected);
                      event.preventDefault();
                    }
                  }
                }

                // up arrow (traverse menu up)
                if (pressedKey == keys.upArrow) {
                  $nextItem = hasSelectedItem && inVisibleMenu ? $selectedItem.prevAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);
                  if ($visibleItems.index($nextItem) < 0) {
                    module.verbose('Up key pressed but reached top of current menu');
                    event.preventDefault();
                    return;
                  } else {
                    module.verbose('Up key pressed, changing active item');
                    $selectedItem.removeClass(className.selected);
                    $nextItem.addClass(className.selected);
                    module.set.scrollPosition($nextItem);
                    if (settings.selectOnKeydown && module.is.single()) {
                      module.set.selectedItem($nextItem);
                    }
                  }
                  event.preventDefault();
                }

                // down arrow (traverse menu down)
                if (pressedKey == keys.downArrow) {
                  $nextItem = hasSelectedItem && inVisibleMenu ? $nextItem = $selectedItem.nextAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);
                  if ($nextItem.length === 0) {
                    module.verbose('Down key pressed but reached bottom of current menu');
                    event.preventDefault();
                    return;
                  } else {
                    module.verbose('Down key pressed, changing active item');
                    $item.removeClass(className.selected);
                    $nextItem.addClass(className.selected);
                    module.set.scrollPosition($nextItem);
                    if (settings.selectOnKeydown && module.is.single()) {
                      module.set.activeItem($nextItem);
                      module.set.selected(module.get.choiceValue($nextItem), $nextItem);
                    }
                  }
                  event.preventDefault();
                }

                // page down (show next page)
                if (pressedKey == keys.pageUp) {
                  module.scrollPage('up');
                  event.preventDefault();
                }
                if (pressedKey == keys.pageDown) {
                  module.scrollPage('down');
                  event.preventDefault();
                }

                // escape (close menu)
                if (pressedKey == keys.escape) {
                  module.verbose('Escape key pressed, closing dropdown');
                  module.hide();
                }
              } else {
                // delimiter key
                if (delimiterPressed) {
                  event.preventDefault();
                }
                // down arrow (open menu)
                if (pressedKey == keys.downArrow && !module.is.visible()) {
                  module.verbose('Down key pressed, showing dropdown');
                  module.select.firstUnfiltered();
                  module.show();
                  event.preventDefault();
                }
              }
            } else {
              if (!module.has.search()) {
                module.set.selectedLetter(String.fromCharCode(pressedKey));
              }
            }
          }
        },

        trigger: {
          change: function change() {
            var events = document.createEvent('HTMLEvents'),
                inputElement = $input[0];
            if (inputElement) {
              module.verbose('Triggering native change event');
              events.initEvent('change', true, false);
              inputElement.dispatchEvent(events);
            }
          }
        },

        determine: {
          selectAction: function selectAction(text, value) {
            module.verbose('Determining action', settings.action);
            if ($.isFunction(module.action[settings.action])) {
              module.verbose('Triggering preset action', settings.action, text, value);
              module.action[settings.action].call(element, text, value, this);
            } else if ($.isFunction(settings.action)) {
              module.verbose('Triggering user action', settings.action, text, value);
              settings.action.call(element, text, value, this);
            } else {
              module.error(error.action, settings.action);
            }
          },
          eventInModule: function eventInModule(event, callback) {
            var $target = $(event.target),
                inDocument = $target.closest(document.documentElement).length > 0,
                inModule = $target.closest($module).length > 0;
            callback = $.isFunction(callback) ? callback : function () {};
            if (inDocument && !inModule) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
            } else {
              module.verbose('Event occurred in dropdown, canceling callback');
              return false;
            }
          },
          eventOnElement: function eventOnElement(event, callback) {
            var $target = $(event.target),
                $label = $target.closest(selector.siblingLabel),
                inVisibleDOM = document.body.contains(event.target),
                notOnLabel = $module.find($label).length === 0,
                notInMenu = $target.closest($menu).length === 0;
            callback = $.isFunction(callback) ? callback : function () {};
            if (inVisibleDOM && notOnLabel && notInMenu) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
            } else {
              module.verbose('Event occurred in dropdown menu, canceling callback');
              return false;
            }
          }
        },

        action: {

          nothing: function nothing() {},

          activate: function activate(text, value, element) {
            value = value !== undefined ? value : text;
            if (module.can.activate($(element))) {
              module.set.selected(value, $(element));
              if (module.is.multiple() && !module.is.allFiltered()) {
                return;
              } else {
                module.hideAndClear();
              }
            }
          },

          select: function select(text, value, element) {
            // mimics action.activate but does not select text
            module.action.activate.call(element);
          },

          combo: function combo(text, value, element) {
            value = value !== undefined ? value : text;
            module.set.selected(value, $(element));
            module.hideAndClear();
          },

          hide: function hide(text, value, element) {
            module.set.value(value, text);
            module.hideAndClear();
          }

        },

        get: {
          id: function id() {
            return _id;
          },
          defaultText: function defaultText() {
            return $module.data(metadata.defaultText);
          },
          defaultValue: function defaultValue() {
            return $module.data(metadata.defaultValue);
          },
          placeholderText: function placeholderText() {
            return $module.data(metadata.placeholderText) || '';
          },
          text: function text() {
            return $text.text();
          },
          query: function query() {
            return $.trim($search.val());
          },
          searchWidth: function searchWidth(value) {
            value = value !== undefined ? value : $search.val();
            $sizer.text(value);
            // prevent rounding issues
            return Math.ceil($sizer.width() + 1);
          },
          selectionCount: function selectionCount() {
            var values = module.get.values(),
                count;
            count = module.is.multiple() ? $.isArray(values) ? values.length : 0 : module.get.value() !== '' ? 1 : 0;
            return count;
          },
          transition: function transition($subMenu) {
            return settings.transition == 'auto' ? module.is.upward($subMenu) ? 'slide up' : 'slide down' : settings.transition;
          },
          userValues: function userValues() {
            var values = module.get.values();
            if (!values) {
              return false;
            }
            values = $.isArray(values) ? values : [values];
            return $.grep(values, function (value) {
              return module.get.item(value) === false;
            });
          },
          uniqueArray: function uniqueArray(array) {
            return $.grep(array, function (value, index) {
              return $.inArray(value, array) === index;
            });
          },
          caretPosition: function caretPosition() {
            var input = $search.get(0),
                range,
                rangeLength;
            if ('selectionStart' in input) {
              return input.selectionStart;
            } else if (document.selection) {
              input.focus();
              range = document.selection.createRange();
              rangeLength = range.text.length;
              range.moveStart('character', -input.value.length);
              return range.text.length - rangeLength;
            }
          },
          value: function value() {
            var value = $input.length > 0 ? $input.val() : $module.data(metadata.value),
                isEmptyMultiselect = $.isArray(value) && value.length === 1 && value[0] === '';
            // prevents placeholder element from being selected when multiple
            return value === undefined || isEmptyMultiselect ? '' : value;
          },
          values: function values() {
            var value = module.get.value();
            if (value === '') {
              return '';
            }
            return !module.has.selectInput() && module.is.multiple() ? typeof value == 'string' ? // delimited string
            value.split(settings.delimiter) : '' : value;
          },
          remoteValues: function remoteValues() {
            var values = module.get.values(),
                remoteValues = false;
            if (values) {
              if (typeof values == 'string') {
                values = [values];
              }
              $.each(values, function (index, value) {
                var name = module.read.remoteData(value);
                module.verbose('Restoring value from session data', name, value);
                if (name) {
                  if (!remoteValues) {
                    remoteValues = {};
                  }
                  remoteValues[value] = name;
                }
              });
            }
            return remoteValues;
          },
          choiceText: function choiceText($choice, preserveHTML) {
            preserveHTML = preserveHTML !== undefined ? preserveHTML : settings.preserveHTML;
            if ($choice) {
              if ($choice.find(selector.menu).length > 0) {
                module.verbose('Retrieving text of element with sub-menu');
                $choice = $choice.clone();
                $choice.find(selector.menu).remove();
                $choice.find(selector.menuIcon).remove();
              }
              return $choice.data(metadata.text) !== undefined ? $choice.data(metadata.text) : preserveHTML ? $.trim($choice.html()) : $.trim($choice.text());
            }
          },
          choiceValue: function choiceValue($choice, choiceText) {
            choiceText = choiceText || module.get.choiceText($choice);
            if (!$choice) {
              return false;
            }
            return $choice.data(metadata.value) !== undefined ? String($choice.data(metadata.value)) : typeof choiceText === 'string' ? $.trim(choiceText.toLowerCase()) : String(choiceText);
          },
          inputEvent: function inputEvent() {
            var input = $search[0];
            if (input) {
              return input.oninput !== undefined ? 'input' : input.onpropertychange !== undefined ? 'propertychange' : 'keyup';
            }
            return false;
          },
          selectValues: function selectValues() {
            var select = {};
            select.values = [];
            $module.find('option').each(function () {
              var $option = $(this),
                  name = $option.html(),
                  disabled = $option.attr('disabled'),
                  value = $option.attr('value') !== undefined ? $option.attr('value') : name;
              if (settings.placeholder === 'auto' && value === '') {
                select.placeholder = name;
              } else {
                select.values.push({
                  name: name,
                  value: value,
                  disabled: disabled
                });
              }
            });
            if (settings.placeholder && settings.placeholder !== 'auto') {
              module.debug('Setting placeholder value to', settings.placeholder);
              select.placeholder = settings.placeholder;
            }
            if (settings.sortSelect) {
              select.values.sort(function (a, b) {
                return a.name > b.name ? 1 : -1;
              });
              module.debug('Retrieved and sorted values from select', select);
            } else {
              module.debug('Retrieved values from select', select);
            }
            return select;
          },
          activeItem: function activeItem() {
            return $item.filter('.' + className.active);
          },
          selectedItem: function selectedItem() {
            var $selectedItem = $item.not(selector.unselectable).filter('.' + className.selected);
            return $selectedItem.length > 0 ? $selectedItem : $item.eq(0);
          },
          itemWithAdditions: function itemWithAdditions(value) {
            var $items = module.get.item(value),
                $userItems = module.create.userChoice(value),
                hasUserItems = $userItems && $userItems.length > 0;
            if (hasUserItems) {
              $items = $items.length > 0 ? $items.add($userItems) : $userItems;
            }
            return $items;
          },
          item: function item(value, strict) {
            var $selectedItem = false,
                shouldSearch,
                isMultiple;
            value = value !== undefined ? value : module.get.values() !== undefined ? module.get.values() : module.get.text();
            shouldSearch = isMultiple ? value.length > 0 : value !== undefined && value !== null;
            isMultiple = module.is.multiple() && $.isArray(value);
            strict = value === '' || value === 0 ? true : strict || false;
            if (shouldSearch) {
              $item.each(function () {
                var $choice = $(this),
                    optionText = module.get.choiceText($choice),
                    optionValue = module.get.choiceValue($choice, optionText);
                // safe early exit
                if (optionValue === null || optionValue === undefined) {
                  return;
                }
                if (isMultiple) {
                  if ($.inArray(String(optionValue), value) !== -1 || $.inArray(optionText, value) !== -1) {
                    $selectedItem = $selectedItem ? $selectedItem.add($choice) : $choice;
                  }
                } else if (strict) {
                  module.verbose('Ambiguous dropdown value using strict type check', $choice, value);
                  if (optionValue === value || optionText === value) {
                    $selectedItem = $choice;
                    return true;
                  }
                } else {
                  if (String(optionValue) == String(value) || optionText == value) {
                    module.verbose('Found select item by value', optionValue, value);
                    $selectedItem = $choice;
                    return true;
                  }
                }
              });
            }
            return $selectedItem;
          }
        },

        check: {
          maxSelections: function maxSelections(selectionCount) {
            if (settings.maxSelections) {
              selectionCount = selectionCount !== undefined ? selectionCount : module.get.selectionCount();
              if (selectionCount >= settings.maxSelections) {
                module.debug('Maximum selection count reached');
                if (settings.useLabels) {
                  $item.addClass(className.filtered);
                  module.add.message(message.maxSelections);
                }
                return true;
              } else {
                module.verbose('No longer at maximum selection count');
                module.remove.message();
                module.remove.filteredItem();
                if (module.is.searchSelection()) {
                  module.filterItems();
                }
                return false;
              }
            }
            return true;
          }
        },

        restore: {
          defaults: function defaults() {
            module.clear();
            module.restore.defaultText();
            module.restore.defaultValue();
          },
          defaultText: function defaultText() {
            var defaultText = module.get.defaultText(),
                placeholderText = module.get.placeholderText;
            if (defaultText === placeholderText) {
              module.debug('Restoring default placeholder text', defaultText);
              module.set.placeholderText(defaultText);
            } else {
              module.debug('Restoring default text', defaultText);
              module.set.text(defaultText);
            }
          },
          placeholderText: function placeholderText() {
            module.set.placeholderText();
          },
          defaultValue: function defaultValue() {
            var defaultValue = module.get.defaultValue();
            if (defaultValue !== undefined) {
              module.debug('Restoring default value', defaultValue);
              if (defaultValue !== '') {
                module.set.value(defaultValue);
                module.set.selected();
              } else {
                module.remove.activeItem();
                module.remove.selectedItem();
              }
            }
          },
          labels: function labels() {
            if (settings.allowAdditions) {
              if (!settings.useLabels) {
                module.error(error.labels);
                settings.useLabels = true;
              }
              module.debug('Restoring selected values');
              module.create.userLabels();
            }
            module.check.maxSelections();
          },
          selected: function selected() {
            module.restore.values();
            if (module.is.multiple()) {
              module.debug('Restoring previously selected values and labels');
              module.restore.labels();
            } else {
              module.debug('Restoring previously selected values');
            }
          },
          values: function values() {
            // prevents callbacks from occurring on initial load
            module.set.initialLoad();
            if (settings.apiSettings && settings.saveRemoteData && module.get.remoteValues()) {
              module.restore.remoteValues();
            } else {
              module.set.selected();
            }
            module.remove.initialLoad();
          },
          remoteValues: function remoteValues() {
            var values = module.get.remoteValues();
            module.debug('Recreating selected from session data', values);
            if (values) {
              if (module.is.single()) {
                $.each(values, function (value, name) {
                  module.set.text(name);
                });
              } else {
                $.each(values, function (value, name) {
                  module.add.label(value, name);
                });
              }
            }
          }
        },

        read: {
          remoteData: function remoteData(value) {
            var name;
            if (window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }
            name = sessionStorage.getItem(value);
            return name !== undefined ? name : false;
          }
        },

        save: {
          defaults: function defaults() {
            module.save.defaultText();
            module.save.placeholderText();
            module.save.defaultValue();
          },
          defaultValue: function defaultValue() {
            var value = module.get.value();
            module.verbose('Saving default value as', value);
            $module.data(metadata.defaultValue, value);
          },
          defaultText: function defaultText() {
            var text = module.get.text();
            module.verbose('Saving default text as', text);
            $module.data(metadata.defaultText, text);
          },
          placeholderText: function placeholderText() {
            var text;
            if (settings.placeholder !== false && $text.hasClass(className.placeholder)) {
              text = module.get.text();
              module.verbose('Saving placeholder text as', text);
              $module.data(metadata.placeholderText, text);
            }
          },
          remoteData: function remoteData(name, value) {
            if (window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }
            module.verbose('Saving remote data to session storage', value, name);
            sessionStorage.setItem(value, name);
          }
        },

        clear: function clear() {
          if (module.is.multiple()) {
            module.remove.labels();
          } else {
            module.remove.activeItem();
            module.remove.selectedItem();
          }
          module.set.placeholderText();
          module.clearValue();
        },

        clearValue: function clearValue() {
          module.set.value('');
        },

        scrollPage: function scrollPage(direction, $selectedItem) {
          var $currentItem = $selectedItem || module.get.selectedItem(),
              $menu = $currentItem.closest(selector.menu),
              menuHeight = $menu.outerHeight(),
              currentScroll = $menu.scrollTop(),
              itemHeight = $item.eq(0).outerHeight(),
              itemsPerPage = Math.floor(menuHeight / itemHeight),
              maxScroll = $menu.prop('scrollHeight'),
              newScroll = direction == 'up' ? currentScroll - itemHeight * itemsPerPage : currentScroll + itemHeight * itemsPerPage,
              $selectableItem = $item.not(selector.unselectable),
              isWithinRange,
              $nextSelectedItem,
              elementIndex;
          elementIndex = direction == 'up' ? $selectableItem.index($currentItem) - itemsPerPage : $selectableItem.index($currentItem) + itemsPerPage;
          isWithinRange = direction == 'up' ? elementIndex >= 0 : elementIndex < $selectableItem.length;
          $nextSelectedItem = isWithinRange ? $selectableItem.eq(elementIndex) : direction == 'up' ? $selectableItem.first() : $selectableItem.last();
          if ($nextSelectedItem.length > 0) {
            module.debug('Scrolling page', direction, $nextSelectedItem);
            $currentItem.removeClass(className.selected);
            $nextSelectedItem.addClass(className.selected);
            if (settings.selectOnKeydown && module.is.single()) {
              module.set.selectedItem($nextSelectedItem);
            }
            $menu.scrollTop(newScroll);
          }
        },

        set: {
          filtered: function filtered() {
            var isMultiple = module.is.multiple(),
                isSearch = module.is.searchSelection(),
                isSearchMultiple = isMultiple && isSearch,
                searchValue = isSearch ? module.get.query() : '',
                hasSearchValue = typeof searchValue === 'string' && searchValue.length > 0,
                searchWidth = module.get.searchWidth(),
                valueIsSet = searchValue !== '';
            if (isMultiple && hasSearchValue) {
              module.verbose('Adjusting input width', searchWidth, settings.glyphWidth);
              $search.css('width', searchWidth);
            }
            if (hasSearchValue || isSearchMultiple && valueIsSet) {
              module.verbose('Hiding placeholder text');
              $text.addClass(className.filtered);
            } else if (!isMultiple || isSearchMultiple && !valueIsSet) {
              module.verbose('Showing placeholder text');
              $text.removeClass(className.filtered);
            }
          },
          empty: function empty() {
            $module.addClass(className.empty);
          },
          loading: function loading() {
            $module.addClass(className.loading);
          },
          placeholderText: function placeholderText(text) {
            text = text || module.get.placeholderText();
            module.debug('Setting placeholder text', text);
            module.set.text(text);
            $text.addClass(className.placeholder);
          },
          tabbable: function tabbable() {
            if (module.has.search()) {
              module.debug('Added tabindex to searchable dropdown');
              $search.val('').attr('tabindex', 0);
              $menu.attr('tabindex', -1);
            } else {
              module.debug('Added tabindex to dropdown');
              if ($module.attr('tabindex') === undefined) {
                $module.attr('tabindex', 0);
                $menu.attr('tabindex', -1);
              }
            }
          },
          initialLoad: function initialLoad() {
            module.verbose('Setting initial load');
            _initialLoad = true;
          },
          activeItem: function activeItem($item) {
            if (settings.allowAdditions && $item.filter(selector.addition).length > 0) {
              $item.addClass(className.filtered);
            } else {
              $item.addClass(className.active);
            }
          },
          scrollPosition: function scrollPosition($item, forceScroll) {
            var edgeTolerance = 5,
                $menu,
                hasActive,
                offset,
                itemHeight,
                itemOffset,
                menuOffset,
                menuScroll,
                menuHeight,
                abovePage,
                belowPage;

            $item = $item || module.get.selectedItem();
            $menu = $item.closest(selector.menu);
            hasActive = $item && $item.length > 0;
            forceScroll = forceScroll !== undefined ? forceScroll : false;
            if ($item && $menu.length > 0 && hasActive) {
              itemOffset = $item.position().top;

              $menu.addClass(className.loading);
              menuScroll = $menu.scrollTop();
              menuOffset = $menu.offset().top;
              itemOffset = $item.offset().top;
              offset = menuScroll - menuOffset + itemOffset;
              if (!forceScroll) {
                menuHeight = $menu.height();
                belowPage = menuScroll + menuHeight < offset + edgeTolerance;
                abovePage = offset - edgeTolerance < menuScroll;
              }
              module.debug('Scrolling to active item', offset);
              if (forceScroll || abovePage || belowPage) {
                $menu.scrollTop(offset);
              }
              $menu.removeClass(className.loading);
            }
          },
          text: function text(_text) {
            if (settings.action !== 'select') {
              if (settings.action == 'combo') {
                module.debug('Changing combo button text', _text, $combo);
                if (settings.preserveHTML) {
                  $combo.html(_text);
                } else {
                  $combo.text(_text);
                }
              } else {
                if (_text !== module.get.placeholderText()) {
                  $text.removeClass(className.placeholder);
                }
                module.debug('Changing text', _text, $text);
                $text.removeClass(className.filtered);
                if (settings.preserveHTML) {
                  $text.html(_text);
                } else {
                  $text.text(_text);
                }
              }
            }
          },
          selectedItem: function selectedItem($item) {
            module.debug('Setting user selection to item', $item);
            module.remove.activeItem();
            module.set.activeItem($item);
            module.set.selected(module.get.choiceValue($item), $item);
          },
          selectedLetter: function selectedLetter(letter) {
            var $selectedItem = $item.filter('.' + className.selected),
                alreadySelectedLetter = $selectedItem.length > 0 && module.has.firstLetter($selectedItem, letter),
                $nextValue = false,
                $nextItem;
            // check next of same letter
            if (alreadySelectedLetter) {
              $nextItem = $selectedItem.nextAll($item).eq(0);
              if (module.has.firstLetter($nextItem, letter)) {
                $nextValue = $nextItem;
              }
            }
            // check all values
            if (!$nextValue) {
              $item.each(function () {
                if (module.has.firstLetter($(this), letter)) {
                  $nextValue = $(this);
                  return false;
                }
              });
            }
            // set next value
            if ($nextValue) {
              module.verbose('Scrolling to next value with letter', letter);
              module.set.scrollPosition($nextValue);
              $selectedItem.removeClass(className.selected);
              $nextValue.addClass(className.selected);
              if (settings.selectOnKeydown && module.is.single()) {
                module.set.selectedItem($nextValue);
              }
            }
          },
          direction: function direction($menu) {
            if (settings.direction == 'auto') {
              if (module.is.onScreen($menu)) {
                module.remove.upward($menu);
              } else {
                module.set.upward($menu);
              }
            } else if (settings.direction == 'upward') {
              module.set.upward($menu);
            }
          },
          upward: function upward($menu) {
            var $element = $menu || $module;
            $element.addClass(className.upward);
          },
          value: function value(_value, text, $selected) {
            var escapedValue = module.escape.value(_value),
                hasInput = $input.length > 0,
                isAddition = !module.has.value(_value),
                currentValue = module.get.values(),
                stringValue = _value !== undefined ? String(_value) : _value,
                newValue;
            if (hasInput) {
              if (!settings.allowReselection && stringValue == currentValue) {
                module.verbose('Skipping value update already same value', _value, currentValue);
                if (!module.is.initialLoad()) {
                  return;
                }
              }

              if (module.is.single() && module.has.selectInput() && module.can.extendSelect()) {
                module.debug('Adding user option', _value);
                module.add.optionValue(_value);
              }
              module.debug('Updating input value', escapedValue, currentValue);
              internalChange = true;
              $input.val(escapedValue);
              if (settings.fireOnInit === false && module.is.initialLoad()) {
                module.debug('Input native change event ignored on initial load');
              } else {
                module.trigger.change();
              }
              internalChange = false;
            } else {
              module.verbose('Storing value in metadata', escapedValue, $input);
              if (escapedValue !== currentValue) {
                $module.data(metadata.value, stringValue);
              }
            }
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onChange);
            } else {
              settings.onChange.call(element, _value, text, $selected);
            }
          },
          active: function active() {
            $module.addClass(className.active);
          },
          multiple: function multiple() {
            $module.addClass(className.multiple);
          },
          visible: function visible() {
            $module.addClass(className.visible);
          },
          exactly: function exactly(value, $selectedItem) {
            module.debug('Setting selected to exact values');
            module.clear();
            module.set.selected(value, $selectedItem);
          },
          selected: function selected(value, $selectedItem) {
            var isMultiple = module.is.multiple(),
                $userSelectedItem;
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);
            if (!$selectedItem) {
              return;
            }
            module.debug('Setting selected menu item to', $selectedItem);
            if (module.is.multiple()) {
              module.remove.searchWidth();
            }
            if (module.is.single()) {
              module.remove.activeItem();
              module.remove.selectedItem();
            } else if (settings.useLabels) {
              module.remove.selectedItem();
            }
            // select each item
            $selectedItem.each(function () {
              var $selected = $(this),
                  selectedText = module.get.choiceText($selected),
                  selectedValue = module.get.choiceValue($selected, selectedText),
                  isFiltered = $selected.hasClass(className.filtered),
                  isActive = $selected.hasClass(className.active),
                  isUserValue = $selected.hasClass(className.addition),
                  shouldAnimate = isMultiple && $selectedItem.length == 1;
              if (isMultiple) {
                if (!isActive || isUserValue) {
                  if (settings.apiSettings && settings.saveRemoteData) {
                    module.save.remoteData(selectedText, selectedValue);
                  }
                  if (settings.useLabels) {
                    module.add.value(selectedValue, selectedText, $selected);
                    module.add.label(selectedValue, selectedText, shouldAnimate);
                    module.set.activeItem($selected);
                    module.filterActive();
                    module.select.nextAvailable($selectedItem);
                  } else {
                    module.add.value(selectedValue, selectedText, $selected);
                    module.set.text(module.add.variables(message.count));
                    module.set.activeItem($selected);
                  }
                } else if (!isFiltered) {
                  module.debug('Selected active value, removing label');
                  module.remove.selected(selectedValue);
                }
              } else {
                if (settings.apiSettings && settings.saveRemoteData) {
                  module.save.remoteData(selectedText, selectedValue);
                }
                module.set.text(selectedText);
                module.set.value(selectedValue, selectedText, $selected);
                $selected.addClass(className.active).addClass(className.selected);
              }
            });
          }
        },

        add: {
          label: function label(value, text, shouldAnimate) {
            var $next = module.is.searchSelection() ? $search : $text,
                escapedValue = module.escape.value(value),
                $label;
            $label = $('<a />').addClass(className.label).attr('data-value', escapedValue).html(templates.label(escapedValue, text));
            $label = settings.onLabelCreate.call($label, escapedValue, text);

            if (module.has.label(value)) {
              module.debug('Label already exists, skipping', escapedValue);
              return;
            }
            if (settings.label.variation) {
              $label.addClass(settings.label.variation);
            }
            if (shouldAnimate === true) {
              module.debug('Animating in label', $label);
              $label.addClass(className.hidden).insertBefore($next).transition(settings.label.transition, settings.label.duration);
            } else {
              module.debug('Adding selection label', $label);
              $label.insertBefore($next);
            }
          },
          message: function message(_message) {
            var $message = $menu.children(selector.message),
                html = settings.templates.message(module.add.variables(_message));
            if ($message.length > 0) {
              $message.html(html);
            } else {
              $message = $('<div/>').html(html).addClass(className.message).appendTo($menu);
            }
          },
          optionValue: function optionValue(value) {
            var escapedValue = module.escape.value(value),
                $option = $input.find('option[value="' + escapedValue + '"]'),
                hasOption = $option.length > 0;
            if (hasOption) {
              return;
            }
            // temporarily disconnect observer
            module.disconnect.selectObserver();
            if (module.is.single()) {
              module.verbose('Removing previous user addition');
              $input.find('option.' + className.addition).remove();
            }
            $('<option/>').prop('value', escapedValue).addClass(className.addition).html(value).appendTo($input);
            module.verbose('Adding user addition as an <option>', value);
            module.observe.select();
          },
          userSuggestion: function userSuggestion(value) {
            var $addition = $menu.children(selector.addition),
                $existingItem = module.get.item(value),
                alreadyHasValue = $existingItem && $existingItem.not(selector.addition).length,
                hasUserSuggestion = $addition.length > 0,
                html;
            if (settings.useLabels && module.has.maxSelections()) {
              return;
            }
            if (value === '' || alreadyHasValue) {
              $addition.remove();
              return;
            }
            if (hasUserSuggestion) {
              $addition.data(metadata.value, value).data(metadata.text, value).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).removeClass(className.filtered);
              if (!settings.hideAdditions) {
                html = settings.templates.addition(module.add.variables(message.addResult, value));
                $addition.html(html);
              }
              module.verbose('Replacing user suggestion with new value', $addition);
            } else {
              $addition = module.create.userChoice(value);
              $addition.prependTo($menu);
              module.verbose('Adding item choice to menu corresponding with user choice addition', $addition);
            }
            if (!settings.hideAdditions || module.is.allFiltered()) {
              $addition.addClass(className.selected).siblings().removeClass(className.selected);
            }
            module.refreshItems();
          },
          variables: function variables(message, term) {
            var hasCount = message.search('{count}') !== -1,
                hasMaxCount = message.search('{maxCount}') !== -1,
                hasTerm = message.search('{term}') !== -1,
                values,
                count,
                query;
            module.verbose('Adding templated variables to message', message);
            if (hasCount) {
              count = module.get.selectionCount();
              message = message.replace('{count}', count);
            }
            if (hasMaxCount) {
              count = module.get.selectionCount();
              message = message.replace('{maxCount}', settings.maxSelections);
            }
            if (hasTerm) {
              query = term || module.get.query();
              message = message.replace('{term}', query);
            }
            return message;
          },
          value: function value(addedValue, addedText, $selectedItem) {
            var currentValue = module.get.values(),
                newValue;
            if (addedValue === '') {
              module.debug('Cannot select blank values from multiselect');
              return;
            }
            // extend current array
            if ($.isArray(currentValue)) {
              newValue = currentValue.concat([addedValue]);
              newValue = module.get.uniqueArray(newValue);
            } else {
              newValue = [addedValue];
            }
            // add values
            if (module.has.selectInput()) {
              if (module.can.extendSelect()) {
                module.debug('Adding value to select', addedValue, newValue, $input);
                module.add.optionValue(addedValue);
              }
            } else {
              newValue = newValue.join(settings.delimiter);
              module.debug('Setting hidden input to delimited value', newValue, $input);
            }

            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('Skipping onadd callback on initial load', settings.onAdd);
            } else {
              settings.onAdd.call(element, addedValue, addedText, $selectedItem);
            }
            module.set.value(newValue, addedValue, addedText, $selectedItem);
            module.check.maxSelections();
          }
        },

        remove: {
          active: function active() {
            $module.removeClass(className.active);
          },
          activeLabel: function activeLabel() {
            $module.find(selector.label).removeClass(className.active);
          },
          empty: function empty() {
            $module.removeClass(className.empty);
          },
          loading: function loading() {
            $module.removeClass(className.loading);
          },
          initialLoad: function initialLoad() {
            _initialLoad = false;
          },
          upward: function upward($menu) {
            var $element = $menu || $module;
            $element.removeClass(className.upward);
          },
          visible: function visible() {
            $module.removeClass(className.visible);
          },
          activeItem: function activeItem() {
            $item.removeClass(className.active);
          },
          filteredItem: function filteredItem() {
            if (settings.useLabels && module.has.maxSelections()) {
              return;
            }
            if (settings.useLabels && module.is.multiple()) {
              $item.not('.' + className.active).removeClass(className.filtered);
            } else {
              $item.removeClass(className.filtered);
            }
            module.remove.empty();
          },
          optionValue: function optionValue(value) {
            var escapedValue = module.escape.value(value),
                $option = $input.find('option[value="' + escapedValue + '"]'),
                hasOption = $option.length > 0;
            if (!hasOption || !$option.hasClass(className.addition)) {
              return;
            }
            // temporarily disconnect observer
            if (selectObserver) {
              selectObserver.disconnect();
              module.verbose('Temporarily disconnecting mutation observer');
            }
            $option.remove();
            module.verbose('Removing user addition as an <option>', escapedValue);
            if (selectObserver) {
              selectObserver.observe($input[0], {
                childList: true,
                subtree: true
              });
            }
          },
          message: function message() {
            $menu.children(selector.message).remove();
          },
          searchWidth: function searchWidth() {
            $search.css('width', '');
          },
          searchTerm: function searchTerm() {
            module.verbose('Cleared search term');
            $search.val('');
            module.set.filtered();
          },
          userAddition: function userAddition() {
            $item.filter(selector.addition).remove();
          },
          selected: function selected(value, $selectedItem) {
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);

            if (!$selectedItem) {
              return false;
            }

            $selectedItem.each(function () {
              var $selected = $(this),
                  selectedText = module.get.choiceText($selected),
                  selectedValue = module.get.choiceValue($selected, selectedText);
              if (module.is.multiple()) {
                if (settings.useLabels) {
                  module.remove.value(selectedValue, selectedText, $selected);
                  module.remove.label(selectedValue);
                } else {
                  module.remove.value(selectedValue, selectedText, $selected);
                  if (module.get.selectionCount() === 0) {
                    module.set.placeholderText();
                  } else {
                    module.set.text(module.add.variables(message.count));
                  }
                }
              } else {
                module.remove.value(selectedValue, selectedText, $selected);
              }
              $selected.removeClass(className.filtered).removeClass(className.active);
              if (settings.useLabels) {
                $selected.removeClass(className.selected);
              }
            });
          },
          selectedItem: function selectedItem() {
            $item.removeClass(className.selected);
          },
          value: function value(removedValue, removedText, $removedItem) {
            var values = module.get.values(),
                newValue;
            if (module.has.selectInput()) {
              module.verbose('Input is <select> removing selected option', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              module.remove.optionValue(removedValue);
            } else {
              module.verbose('Removing from delimited values', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              newValue = newValue.join(settings.delimiter);
            }
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onRemove);
            } else {
              settings.onRemove.call(element, removedValue, removedText, $removedItem);
            }
            module.set.value(newValue, removedText, $removedItem);
            module.check.maxSelections();
          },
          arrayValue: function arrayValue(removedValue, values) {
            if (!$.isArray(values)) {
              values = [values];
            }
            values = $.grep(values, function (value) {
              return removedValue != value;
            });
            module.verbose('Removed value from delimited string', removedValue, values);
            return values;
          },
          label: function label(value, shouldAnimate) {
            var $labels = $module.find(selector.label),
                $removedLabel = $labels.filter('[data-value="' + value + '"]');
            module.verbose('Removing label', $removedLabel);
            $removedLabel.remove();
          },
          activeLabels: function activeLabels($activeLabels) {
            $activeLabels = $activeLabels || $module.find(selector.label).filter('.' + className.active);
            module.verbose('Removing active label selections', $activeLabels);
            module.remove.labels($activeLabels);
          },
          labels: function labels($labels) {
            $labels = $labels || $module.find(selector.label);
            module.verbose('Removing labels', $labels);
            $labels.each(function () {
              var $label = $(this),
                  value = $label.data(metadata.value),
                  stringValue = value !== undefined ? String(value) : value,
                  isUserValue = module.is.userValue(stringValue);
              if (settings.onLabelRemove.call($label, value) === false) {
                module.debug('Label remove callback cancelled removal');
                return;
              }
              module.remove.message();
              if (isUserValue) {
                module.remove.value(stringValue);
                module.remove.label(stringValue);
              } else {
                // selected will also remove label
                module.remove.selected(stringValue);
              }
            });
          },
          tabbable: function tabbable() {
            if (module.has.search()) {
              module.debug('Searchable dropdown initialized');
              $search.removeAttr('tabindex');
              $menu.removeAttr('tabindex');
            } else {
              module.debug('Simple selection dropdown initialized');
              $module.removeAttr('tabindex');
              $menu.removeAttr('tabindex');
            }
          }
        },

        has: {
          menuSearch: function menuSearch() {
            return module.has.search() && $search.closest($menu).length > 0;
          },
          search: function search() {
            return $search.length > 0;
          },
          sizer: function sizer() {
            return $sizer.length > 0;
          },
          selectInput: function selectInput() {
            return $input.is('select');
          },
          minCharacters: function minCharacters(searchTerm) {
            if (settings.minCharacters) {
              searchTerm = searchTerm !== undefined ? String(searchTerm) : String(module.get.query());
              return searchTerm.length >= settings.minCharacters;
            }
            return true;
          },
          firstLetter: function firstLetter($item, letter) {
            var text, firstLetter;
            if (!$item || $item.length === 0 || typeof letter !== 'string') {
              return false;
            }
            text = module.get.choiceText($item, false);
            letter = letter.toLowerCase();
            firstLetter = String(text).charAt(0).toLowerCase();
            return letter == firstLetter;
          },
          input: function input() {
            return $input.length > 0;
          },
          items: function items() {
            return $item.length > 0;
          },
          menu: function menu() {
            return $menu.length > 0;
          },
          message: function message() {
            return $menu.children(selector.message).length !== 0;
          },
          label: function label(value) {
            var escapedValue = module.escape.value(value),
                $labels = $module.find(selector.label);
            return $labels.filter('[data-value="' + escapedValue + '"]').length > 0;
          },
          maxSelections: function maxSelections() {
            return settings.maxSelections && module.get.selectionCount() >= settings.maxSelections;
          },
          allResultsFiltered: function allResultsFiltered() {
            var $normalResults = $item.not(selector.addition);
            return $normalResults.filter(selector.unselectable).length === $normalResults.length;
          },
          userSuggestion: function userSuggestion() {
            return $menu.children(selector.addition).length > 0;
          },
          query: function query() {
            return module.get.query() !== '';
          },
          value: function value(_value2) {
            var values = module.get.values(),
                hasValue = $.isArray(values) ? values && $.inArray(_value2, values) !== -1 : values == _value2;
            return hasValue ? true : false;
          }
        },

        is: {
          active: function active() {
            return $module.hasClass(className.active);
          },
          bubbledLabelClick: function bubbledLabelClick(event) {
            return $(event.target).is('select, input') && $module.closest('label').length > 0;
          },
          alreadySetup: function alreadySetup() {
            return $module.is('select') && $module.parent(selector.dropdown).length > 0 && $module.prev().length === 0;
          },
          animating: function animating($subMenu) {
            return $subMenu ? $subMenu.transition && $subMenu.transition('is animating') : $menu.transition && $menu.transition('is animating');
          },
          disabled: function disabled() {
            return $module.hasClass(className.disabled);
          },
          focused: function focused() {
            return document.activeElement === $module[0];
          },
          focusedOnSearch: function focusedOnSearch() {
            return document.activeElement === $search[0];
          },
          allFiltered: function allFiltered() {
            return (module.is.multiple() || module.has.search()) && !(settings.hideAdditions == false && module.has.userSuggestion()) && !module.has.message() && module.has.allResultsFiltered();
          },
          hidden: function hidden($subMenu) {
            return !module.is.visible($subMenu);
          },
          initialLoad: function initialLoad() {
            return _initialLoad;
          },
          onScreen: function onScreen($subMenu) {
            var $currentMenu = $subMenu || $menu,
                canOpenDownward = true,
                onScreen = {},
                calculations;
            $currentMenu.addClass(className.loading);
            calculations = {
              context: {
                scrollTop: $context.scrollTop(),
                height: $context.outerHeight()
              },
              menu: {
                offset: $currentMenu.offset(),
                height: $currentMenu.outerHeight()
              }
            };
            onScreen = {
              above: calculations.context.scrollTop <= calculations.menu.offset.top - calculations.menu.height,
              below: calculations.context.scrollTop + calculations.context.height >= calculations.menu.offset.top + calculations.menu.height
            };
            if (onScreen.below) {
              module.verbose('Dropdown can fit in context downward', onScreen);
              canOpenDownward = true;
            } else if (!onScreen.below && !onScreen.above) {
              module.verbose('Dropdown cannot fit in either direction, favoring downward', onScreen);
              canOpenDownward = true;
            } else {
              module.verbose('Dropdown cannot fit below, opening upward', onScreen);
              canOpenDownward = false;
            }
            $currentMenu.removeClass(className.loading);
            return canOpenDownward;
          },
          inObject: function inObject(needle, object) {
            var found = false;
            $.each(object, function (index, property) {
              if (property == needle) {
                found = true;
                return true;
              }
            });
            return found;
          },
          multiple: function multiple() {
            return $module.hasClass(className.multiple);
          },
          single: function single() {
            return !module.is.multiple();
          },
          selectMutation: function selectMutation(mutations) {
            var selectChanged = false;
            $.each(mutations, function (index, mutation) {
              if (mutation.target && $(mutation.target).is('select')) {
                selectChanged = true;
                return true;
              }
            });
            return selectChanged;
          },
          search: function search() {
            return $module.hasClass(className.search);
          },
          searchSelection: function searchSelection() {
            return module.has.search() && $search.parent(selector.dropdown).length === 1;
          },
          selection: function selection() {
            return $module.hasClass(className.selection);
          },
          userValue: function userValue(value) {
            return $.inArray(value, module.get.userValues()) !== -1;
          },
          upward: function upward($menu) {
            var $element = $menu || $module;
            return $element.hasClass(className.upward);
          },
          visible: function visible($subMenu) {
            return $subMenu ? $subMenu.hasClass(className.visible) : $menu.hasClass(className.visible);
          }
        },

        can: {
          activate: function activate($item) {
            if (settings.useLabels) {
              return true;
            }
            if (!module.has.maxSelections()) {
              return true;
            }
            if (module.has.maxSelections() && $item.hasClass(className.active)) {
              return true;
            }
            return false;
          },
          click: function click() {
            return hasTouch || settings.on == 'click';
          },
          extendSelect: function extendSelect() {
            return settings.allowAdditions || settings.apiSettings;
          },
          show: function show() {
            return !module.is.disabled() && (module.has.items() || module.has.message());
          },
          useAPI: function useAPI() {
            return $.fn.api !== undefined;
          }
        },

        animate: {
          show: function show(callback, $subMenu) {
            var $currentMenu = $subMenu || $menu,
                start = $subMenu ? function () {} : function () {
              module.hideSubMenus();
              module.hideOthers();
              module.set.active();
            },
                transition;
            callback = $.isFunction(callback) ? callback : function () {};
            module.verbose('Doing menu show animation', $currentMenu);
            module.set.direction($subMenu);
            transition = module.get.transition($subMenu);
            if (module.is.selection()) {
              module.set.scrollPosition(module.get.selectedItem(), true);
            }
            if (module.is.hidden($currentMenu) || module.is.animating($currentMenu)) {
              if (transition == 'none') {
                start();
                $currentMenu.transition('show');
                callback.call(element);
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({
                  animation: transition + ' in',
                  debug: settings.debug,
                  verbose: settings.verbose,
                  duration: settings.duration,
                  queue: true,
                  onStart: start,
                  onComplete: function onComplete() {
                    callback.call(element);
                  }
                });
              } else {
                module.error(error.noTransition, transition);
              }
            }
          },
          hide: function hide(callback, $subMenu) {
            var $currentMenu = $subMenu || $menu,
                duration = $subMenu ? settings.duration * 0.9 : settings.duration,
                start = $subMenu ? function () {} : function () {
              if (module.can.click()) {
                module.unbind.intent();
              }
              module.remove.active();
            },
                transition = module.get.transition($subMenu);
            callback = $.isFunction(callback) ? callback : function () {};
            if (module.is.visible($currentMenu) || module.is.animating($currentMenu)) {
              module.verbose('Doing menu hide animation', $currentMenu);

              if (transition == 'none') {
                start();
                $currentMenu.transition('hide');
                callback.call(element);
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({
                  animation: transition + ' out',
                  duration: settings.duration,
                  debug: settings.debug,
                  verbose: settings.verbose,
                  queue: true,
                  onStart: start,
                  onComplete: function onComplete() {
                    if (settings.direction == 'auto') {
                      module.remove.upward($subMenu);
                    }
                    callback.call(element);
                  }
                });
              } else {
                module.error(error.transition);
              }
            }
          }
        },

        hideAndClear: function hideAndClear() {
          module.remove.searchTerm();
          if (module.has.maxSelections()) {
            return;
          }
          if (module.has.search()) {
            module.hide(function () {
              module.remove.filteredItem();
            });
          } else {
            module.hide();
          }
        },

        delay: {
          show: function show() {
            module.verbose('Delaying show event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.show, settings.delay.show);
          },
          hide: function hide() {
            module.verbose('Delaying hide event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.hide, settings.delay.hide);
          }
        },

        escape: {
          value: function value(_value3) {
            var multipleValues = $.isArray(_value3),
                stringValue = typeof _value3 === 'string',
                isUnparsable = !stringValue && !multipleValues,
                hasQuotes = stringValue && _value3.search(_regExp.quote) !== -1,
                values = [];
            if (!module.has.selectInput() || isUnparsable || !hasQuotes) {
              return _value3;
            }
            module.debug('Encoding quote values for use in select', _value3);
            if (multipleValues) {
              $.each(_value3, function (index, value) {
                values.push(value.replace(_regExp.quote, '&quot;'));
              });
              return values;
            }
            return _value3.replace(_regExp.quote, '&quot;');
          },
          regExp: function regExp(text) {
            text = String(text);
            return text.replace(_regExp.escape, '\\$&');
          }
        },

        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;
            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;
          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }
          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : $allModules;
  };

  $.fn.dropdown.settings = {

    silent: false,
    debug: false,
    verbose: false,
    performance: true,

    on: 'click', // what event should show menu action on item selection
    action: 'activate', // action on item selection (nothing, activate, select, combo, hide, function(){})


    apiSettings: false,
    selectOnKeydown: true, // Whether selection should occur automatically when keyboard shortcuts used
    minCharacters: 0, // Minimum characters required to trigger API call
    saveRemoteData: true, // Whether remote name/value pairs should be stored in sessionStorage to allow remote data to be restored on page refresh
    throttle: 200, // How long to wait after last user input to search remotely

    context: window, // Context to use when determining if on screen
    direction: 'auto', // Whether dropdown should always open in one direction
    keepOnScreen: true, // Whether dropdown should check whether it is on screen before showing

    match: 'both', // what to match against with search selection (both, text, or label)
    fullTextSearch: false, // search anywhere in value (set to 'exact' to require exact matches)

    placeholder: 'auto', // whether to convert blank <select> values to placeholder text
    preserveHTML: true, // preserve html when selecting value
    sortSelect: false, // sort selection on init

    forceSelection: true, // force a choice on blur with search selection

    allowAdditions: false, // whether multiple select should allow user added values
    hideAdditions: true, // whether or not to hide special message prompting a user they can enter a value

    maxSelections: false, // When set to a number limits the number of selections to this count
    useLabels: true, // whether multiple select should filter currently active selections from choices
    delimiter: ',', // when multiselect uses normal <input> the values will be delimited with this character

    showOnFocus: true, // show menu on focus
    allowReselection: false, // whether current value should trigger callbacks when reselected
    allowTab: true, // add tabindex to element
    allowCategorySelection: false, // allow elements with sub-menus to be selected

    fireOnInit: false, // Whether callbacks should fire when initializing dropdown values

    transition: 'auto', // auto transition will slide down or up based on direction
    duration: 200, // duration of transition

    glyphWidth: 1.037, // widest glyph width in em (W is 1.037 em) used to calculate multiselect input width

    // label settings on multi-select
    label: {
      transition: 'scale',
      duration: 200,
      variation: false
    },

    // delay before event
    delay: {
      hide: 300,
      show: 200,
      search: 20,
      touch: 50
    },

    /* Callbacks */
    onChange: function onChange(value, text, $selected) {},
    onAdd: function onAdd(value, text, $selected) {},
    onRemove: function onRemove(value, text, $selected) {},

    onLabelSelect: function onLabelSelect($selectedLabels) {},
    onLabelCreate: function onLabelCreate(value, text) {
      return $(this);
    },
    onLabelRemove: function onLabelRemove(value) {
      return true;
    },
    onNoResults: function onNoResults(searchTerm) {
      return true;
    },
    onShow: function onShow() {},
    onHide: function onHide() {},

    /* Component */
    name: 'Dropdown',
    namespace: 'dropdown',

    message: {
      addResult: 'Add <b>{term}</b>',
      count: '{count} selected',
      maxSelections: 'Max {maxCount} selections',
      noResults: 'No results found.',
      serverError: 'There was an error contacting the server'
    },

    error: {
      action: 'You called a dropdown action that was not defined',
      alreadySetup: 'Once a select has been initialized behaviors must be called on the created ui dropdown',
      labels: 'Allowing user additions currently requires the use of labels.',
      missingMultiple: '<select> requires multiple property to be set to correctly preserve multiple values',
      method: 'The method you called is not defined.',
      noAPI: 'The API module is required to load resources remotely',
      noStorage: 'Saving remote data requires session storage',
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>'
    },

    regExp: {
      escape: /[-[\]{}()*+?.,\\^$|#\s]/g,
      quote: /"/g
    },

    metadata: {
      defaultText: 'defaultText',
      defaultValue: 'defaultValue',
      placeholderText: 'placeholder',
      text: 'text',
      value: 'value'
    },

    // property names for remote query
    fields: {
      remoteValues: 'results', // grouping for api results
      values: 'values', // grouping for all dropdown values
      disabled: 'disabled', // whether value should be disabled
      name: 'name', // displayed dropdown text
      value: 'value', // actual dropdown value
      text: 'text' // displayed text when selected
    },

    keys: {
      backspace: 8,
      delimiter: 188, // comma
      deleteKey: 46,
      enter: 13,
      escape: 27,
      pageUp: 33,
      pageDown: 34,
      leftArrow: 37,
      upArrow: 38,
      rightArrow: 39,
      downArrow: 40
    },

    selector: {
      addition: '.addition',
      dropdown: '.ui.dropdown',
      hidden: '.hidden',
      icon: '> .dropdown.icon',
      input: '> input[type="hidden"], > select',
      item: '.item',
      label: '> .label',
      remove: '> .label > .delete.icon',
      siblingLabel: '.label',
      menu: '.menu',
      message: '.message',
      menuIcon: '.dropdown.icon',
      search: 'input.search, .menu > .search > input, .menu input.search',
      sizer: '> input.sizer',
      text: '> .text:not(.icon)',
      unselectable: '.disabled, .filtered'
    },

    className: {
      active: 'active',
      addition: 'addition',
      animating: 'animating',
      disabled: 'disabled',
      empty: 'empty',
      dropdown: 'ui dropdown',
      filtered: 'filtered',
      hidden: 'hidden transition',
      item: 'item',
      label: 'ui label',
      loading: 'loading',
      menu: 'menu',
      message: 'message',
      multiple: 'multiple',
      placeholder: 'default',
      sizer: 'sizer',
      search: 'search',
      selected: 'selected',
      selection: 'selection',
      upward: 'upward',
      visible: 'visible'
    }

  };

  /* Templates */
  $.fn.dropdown.settings.templates = {

    // generates dropdown from select values
    dropdown: function dropdown(select) {
      var placeholder = select.placeholder || false,
          values = select.values || {},
          html = '';
      html += '<i class="dropdown icon"></i>';
      if (select.placeholder) {
        html += '<div class="default text">' + placeholder + '</div>';
      } else {
        html += '<div class="text"></div>';
      }
      html += '<div class="menu">';
      $.each(select.values, function (index, option) {
        html += option.disabled ? '<div class="disabled item" data-value="' + option.value + '">' + option.name + '</div>' : '<div class="item" data-value="' + option.value + '">' + option.name + '</div>';
      });
      html += '</div>';
      return html;
    },

    // generates just menu from select
    menu: function menu(response, fields) {
      var values = response[fields.values] || {},
          html = '';
      $.each(values, function (index, option) {
        var maybeText = option[fields.text] ? 'data-text="' + option[fields.text] + '"' : '',
            maybeDisabled = option[fields.disabled] ? 'disabled ' : '';
        html += '<div class="' + maybeDisabled + 'item" data-value="' + option[fields.value] + '"' + maybeText + '>';
        html += option[fields.name];
        html += '</div>';
      });
      return html;
    },

    // generates label for multiselect
    label: function label(value, text) {
      return text + '<i class="delete icon"></i>';
    },

    // generates messages like "No results"
    message: function message(_message2) {
      return _message2;
    },

    // generates user addition to selection menu
    addition: function addition(choice) {
      return choice;
    }

  };
})(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*! emojione 02-12-2016 */
!function (a) {
  var _a$jsEscapeMap;

  a.emojioneList = { ":kiss_ww:": { unicode: ["1f469-200d-2764-fe0f-200d-1f48b-200d-1f469", "1f469-2764-1f48b-1f469"], fname: "1f469-2764-1f48b-1f469", uc: "1f469-200d-2764-fe0f-200d-1f48b-200d-1f469", isCanonical: !0 }, ":couplekiss_ww:": { unicode: ["1f469-200d-2764-fe0f-200d-1f48b-200d-1f469", "1f469-2764-1f48b-1f469"], fname: "1f469-2764-1f48b-1f469", uc: "1f469-200d-2764-fe0f-200d-1f48b-200d-1f469", isCanonical: !1 }, ":kiss_mm:": { unicode: ["1f468-200d-2764-fe0f-200d-1f48b-200d-1f468", "1f468-2764-1f48b-1f468"], fname: "1f468-2764-1f48b-1f468", uc: "1f468-200d-2764-fe0f-200d-1f48b-200d-1f468", isCanonical: !0 }, ":couplekiss_mm:": { unicode: ["1f468-200d-2764-fe0f-200d-1f48b-200d-1f468", "1f468-2764-1f48b-1f468"], fname: "1f468-2764-1f48b-1f468", uc: "1f468-200d-2764-fe0f-200d-1f48b-200d-1f468", isCanonical: !1 }, ":family_mmbb:": { unicode: ["1f468-200d-1f468-200d-1f466-200d-1f466", "1f468-1f468-1f466-1f466"], fname: "1f468-1f468-1f466-1f466", uc: "1f468-200d-1f468-200d-1f466-200d-1f466", isCanonical: !0 }, ":family_mmgb:": { unicode: ["1f468-200d-1f468-200d-1f467-200d-1f466", "1f468-1f468-1f467-1f466"], fname: "1f468-1f468-1f467-1f466", uc: "1f468-200d-1f468-200d-1f467-200d-1f466", isCanonical: !0 }, ":family_mmgg:": { unicode: ["1f468-200d-1f468-200d-1f467-200d-1f467", "1f468-1f468-1f467-1f467"], fname: "1f468-1f468-1f467-1f467", uc: "1f468-200d-1f468-200d-1f467-200d-1f467", isCanonical: !0 }, ":family_mwbb:": { unicode: ["1f468-200d-1f469-200d-1f466-200d-1f466", "1f468-1f469-1f466-1f466"], fname: "1f468-1f469-1f466-1f466", uc: "1f468-200d-1f469-200d-1f466-200d-1f466", isCanonical: !0 }, ":family_mwgb:": { unicode: ["1f468-200d-1f469-200d-1f467-200d-1f466", "1f468-1f469-1f467-1f466"], fname: "1f468-1f469-1f467-1f466", uc: "1f468-200d-1f469-200d-1f467-200d-1f466", isCanonical: !0 }, ":family_mwgg:": { unicode: ["1f468-200d-1f469-200d-1f467-200d-1f467", "1f468-1f469-1f467-1f467"], fname: "1f468-1f469-1f467-1f467", uc: "1f468-200d-1f469-200d-1f467-200d-1f467", isCanonical: !0 }, ":family_wwbb:": { unicode: ["1f469-200d-1f469-200d-1f466-200d-1f466", "1f469-1f469-1f466-1f466"], fname: "1f469-1f469-1f466-1f466", uc: "1f469-200d-1f469-200d-1f466-200d-1f466", isCanonical: !0 }, ":family_wwgb:": { unicode: ["1f469-200d-1f469-200d-1f467-200d-1f466", "1f469-1f469-1f467-1f466"], fname: "1f469-1f469-1f467-1f466", uc: "1f469-200d-1f469-200d-1f467-200d-1f466", isCanonical: !0 }, ":family_wwgg:": { unicode: ["1f469-200d-1f469-200d-1f467-200d-1f467", "1f469-1f469-1f467-1f467"], fname: "1f469-1f469-1f467-1f467", uc: "1f469-200d-1f469-200d-1f467-200d-1f467", isCanonical: !0 }, ":couple_ww:": { unicode: ["1f469-200d-2764-fe0f-200d-1f469", "1f469-2764-1f469"], fname: "1f469-2764-1f469", uc: "1f469-200d-2764-fe0f-200d-1f469", isCanonical: !0 }, ":couple_with_heart_ww:": { unicode: ["1f469-200d-2764-fe0f-200d-1f469", "1f469-2764-1f469"], fname: "1f469-2764-1f469", uc: "1f469-200d-2764-fe0f-200d-1f469", isCanonical: !1 }, ":couple_mm:": { unicode: ["1f468-200d-2764-fe0f-200d-1f468", "1f468-2764-1f468"], fname: "1f468-2764-1f468", uc: "1f468-200d-2764-fe0f-200d-1f468", isCanonical: !0 }, ":couple_with_heart_mm:": { unicode: ["1f468-200d-2764-fe0f-200d-1f468", "1f468-2764-1f468"], fname: "1f468-2764-1f468", uc: "1f468-200d-2764-fe0f-200d-1f468", isCanonical: !1 }, ":family_mmb:": { unicode: ["1f468-200d-1f468-200d-1f466", "1f468-1f468-1f466"], fname: "1f468-1f468-1f466", uc: "1f468-200d-1f468-200d-1f466", isCanonical: !0 }, ":family_mmg:": { unicode: ["1f468-200d-1f468-200d-1f467", "1f468-1f468-1f467"], fname: "1f468-1f468-1f467", uc: "1f468-200d-1f468-200d-1f467", isCanonical: !0 }, ":family_mwg:": { unicode: ["1f468-200d-1f469-200d-1f467", "1f468-1f469-1f467"], fname: "1f468-1f469-1f467", uc: "1f468-200d-1f469-200d-1f467", isCanonical: !0 }, ":family_wwb:": { unicode: ["1f469-200d-1f469-200d-1f466", "1f469-1f469-1f466"], fname: "1f469-1f469-1f466", uc: "1f469-200d-1f469-200d-1f466", isCanonical: !0 }, ":family_wwg:": { unicode: ["1f469-200d-1f469-200d-1f467", "1f469-1f469-1f467"], fname: "1f469-1f469-1f467", uc: "1f469-200d-1f469-200d-1f467", isCanonical: !0 }, ":rainbow_flag:": { unicode: ["1f3f3-fe0f-200d-1f308", "1f3f3-1f308"], fname: "1f3f3-1f308", uc: "1f3f3-fe0f-200d-1f308", isCanonical: !0 }, ":gay_pride_flag:": { unicode: ["1f3f3-fe0f-200d-1f308", "1f3f3-1f308"], fname: "1f3f3-1f308", uc: "1f3f3-fe0f-200d-1f308", isCanonical: !1 }, ":eye_in_speech_bubble:": { unicode: ["1f441-200d-1f5e8", "1f441-1f5e8"], fname: "1f441-1f5e8", uc: "1f441-200d-1f5e8", isCanonical: !0 }, ":hash:": { unicode: ["0023-fe0f-20e3", "0023-20e3"], fname: "0023-20e3", uc: "0023-20e3", isCanonical: !0 }, ":zero:": { unicode: ["0030-fe0f-20e3", "0030-20e3"], fname: "0030-20e3", uc: "0030-20e3", isCanonical: !0 }, ":one:": { unicode: ["0031-fe0f-20e3", "0031-20e3"], fname: "0031-20e3", uc: "0031-20e3", isCanonical: !0 }, ":two:": { unicode: ["0032-fe0f-20e3", "0032-20e3"], fname: "0032-20e3", uc: "0032-20e3", isCanonical: !0 }, ":three:": { unicode: ["0033-fe0f-20e3", "0033-20e3"], fname: "0033-20e3", uc: "0033-20e3", isCanonical: !0 }, ":four:": { unicode: ["0034-fe0f-20e3", "0034-20e3"], fname: "0034-20e3", uc: "0034-20e3", isCanonical: !0 }, ":five:": { unicode: ["0035-fe0f-20e3", "0035-20e3"], fname: "0035-20e3", uc: "0035-20e3", isCanonical: !0 }, ":six:": { unicode: ["0036-fe0f-20e3", "0036-20e3"], fname: "0036-20e3", uc: "0036-20e3", isCanonical: !0 }, ":seven:": { unicode: ["0037-fe0f-20e3", "0037-20e3"], fname: "0037-20e3", uc: "0037-20e3", isCanonical: !0 }, ":eight:": { unicode: ["0038-fe0f-20e3", "0038-20e3"], fname: "0038-20e3", uc: "0038-20e3", isCanonical: !0 }, ":nine:": { unicode: ["0039-fe0f-20e3", "0039-20e3"], fname: "0039-20e3", uc: "0039-20e3", isCanonical: !0 }, ":asterisk:": { unicode: ["002a-fe0f-20e3", "002a-20e3"], fname: "002a-20e3", uc: "002a-20e3", isCanonical: !0 }, ":keycap_asterisk:": { unicode: ["002a-fe0f-20e3", "002a-20e3"], fname: "002a-20e3", uc: "002a-20e3", isCanonical: !1 }, ":handball_tone5:": { unicode: ["1f93e-1f3ff"], fname: "1f93e-1f3ff", uc: "1f93e-1f3ff", isCanonical: !0 }, ":handball_tone4:": { unicode: ["1f93e-1f3fe"], fname: "1f93e-1f3fe", uc: "1f93e-1f3fe", isCanonical: !0 }, ":handball_tone3:": { unicode: ["1f93e-1f3fd"], fname: "1f93e-1f3fd", uc: "1f93e-1f3fd", isCanonical: !0 }, ":handball_tone2:": { unicode: ["1f93e-1f3fc"], fname: "1f93e-1f3fc", uc: "1f93e-1f3fc", isCanonical: !0 }, ":handball_tone1:": { unicode: ["1f93e-1f3fb"], fname: "1f93e-1f3fb", uc: "1f93e-1f3fb", isCanonical: !0 }, ":water_polo_tone5:": { unicode: ["1f93d-1f3ff"], fname: "1f93d-1f3ff", uc: "1f93d-1f3ff", isCanonical: !0 }, ":water_polo_tone4:": { unicode: ["1f93d-1f3fe"], fname: "1f93d-1f3fe", uc: "1f93d-1f3fe", isCanonical: !0 }, ":water_polo_tone3:": { unicode: ["1f93d-1f3fd"], fname: "1f93d-1f3fd", uc: "1f93d-1f3fd", isCanonical: !0 }, ":water_polo_tone2:": { unicode: ["1f93d-1f3fc"], fname: "1f93d-1f3fc", uc: "1f93d-1f3fc", isCanonical: !0 }, ":water_polo_tone1:": { unicode: ["1f93d-1f3fb"], fname: "1f93d-1f3fb", uc: "1f93d-1f3fb", isCanonical: !0 }, ":wrestlers_tone5:": { unicode: ["1f93c-1f3ff"], fname: "1f93c-1f3ff", uc: "1f93c-1f3ff", isCanonical: !0 }, ":wrestling_tone5:": { unicode: ["1f93c-1f3ff"], fname: "1f93c-1f3ff", uc: "1f93c-1f3ff", isCanonical: !1 }, ":wrestlers_tone4:": { unicode: ["1f93c-1f3fe"], fname: "1f93c-1f3fe", uc: "1f93c-1f3fe", isCanonical: !0 }, ":wrestling_tone4:": { unicode: ["1f93c-1f3fe"], fname: "1f93c-1f3fe", uc: "1f93c-1f3fe", isCanonical: !1 }, ":wrestlers_tone3:": { unicode: ["1f93c-1f3fd"], fname: "1f93c-1f3fd", uc: "1f93c-1f3fd", isCanonical: !0 }, ":wrestling_tone3:": { unicode: ["1f93c-1f3fd"], fname: "1f93c-1f3fd", uc: "1f93c-1f3fd", isCanonical: !1 }, ":wrestlers_tone2:": { unicode: ["1f93c-1f3fc"], fname: "1f93c-1f3fc", uc: "1f93c-1f3fc", isCanonical: !0 }, ":wrestling_tone2:": { unicode: ["1f93c-1f3fc"], fname: "1f93c-1f3fc", uc: "1f93c-1f3fc", isCanonical: !1 }, ":wrestlers_tone1:": { unicode: ["1f93c-1f3fb"], fname: "1f93c-1f3fb", uc: "1f93c-1f3fb", isCanonical: !0 }, ":wrestling_tone1:": { unicode: ["1f93c-1f3fb"], fname: "1f93c-1f3fb", uc: "1f93c-1f3fb", isCanonical: !1 }, ":juggling_tone5:": { unicode: ["1f939-1f3ff"], fname: "1f939-1f3ff", uc: "1f939-1f3ff", isCanonical: !0 }, ":juggler_tone5:": { unicode: ["1f939-1f3ff"], fname: "1f939-1f3ff", uc: "1f939-1f3ff", isCanonical: !1 }, ":juggling_tone4:": { unicode: ["1f939-1f3fe"], fname: "1f939-1f3fe", uc: "1f939-1f3fe", isCanonical: !0 }, ":juggler_tone4:": { unicode: ["1f939-1f3fe"], fname: "1f939-1f3fe", uc: "1f939-1f3fe", isCanonical: !1 }, ":juggling_tone3:": { unicode: ["1f939-1f3fd"], fname: "1f939-1f3fd", uc: "1f939-1f3fd", isCanonical: !0 }, ":juggler_tone3:": { unicode: ["1f939-1f3fd"], fname: "1f939-1f3fd", uc: "1f939-1f3fd", isCanonical: !1 }, ":juggling_tone2:": { unicode: ["1f939-1f3fc"], fname: "1f939-1f3fc", uc: "1f939-1f3fc", isCanonical: !0 }, ":juggler_tone2:": { unicode: ["1f939-1f3fc"], fname: "1f939-1f3fc", uc: "1f939-1f3fc", isCanonical: !1 }, ":juggling_tone1:": { unicode: ["1f939-1f3fb"], fname: "1f939-1f3fb", uc: "1f939-1f3fb", isCanonical: !0 }, ":juggler_tone1:": { unicode: ["1f939-1f3fb"], fname: "1f939-1f3fb", uc: "1f939-1f3fb", isCanonical: !1 }, ":cartwheel_tone5:": { unicode: ["1f938-1f3ff"], fname: "1f938-1f3ff", uc: "1f938-1f3ff", isCanonical: !0 }, ":person_doing_cartwheel_tone5:": { unicode: ["1f938-1f3ff"], fname: "1f938-1f3ff", uc: "1f938-1f3ff", isCanonical: !1 }, ":cartwheel_tone4:": { unicode: ["1f938-1f3fe"], fname: "1f938-1f3fe", uc: "1f938-1f3fe", isCanonical: !0 }, ":person_doing_cartwheel_tone4:": { unicode: ["1f938-1f3fe"], fname: "1f938-1f3fe", uc: "1f938-1f3fe", isCanonical: !1 }, ":cartwheel_tone3:": { unicode: ["1f938-1f3fd"], fname: "1f938-1f3fd", uc: "1f938-1f3fd", isCanonical: !0 }, ":person_doing_cartwheel_tone3:": { unicode: ["1f938-1f3fd"], fname: "1f938-1f3fd", uc: "1f938-1f3fd", isCanonical: !1 }, ":cartwheel_tone2:": { unicode: ["1f938-1f3fc"], fname: "1f938-1f3fc", uc: "1f938-1f3fc", isCanonical: !0 }, ":person_doing_cartwheel_tone2:": { unicode: ["1f938-1f3fc"], fname: "1f938-1f3fc", uc: "1f938-1f3fc", isCanonical: !1 }, ":cartwheel_tone1:": { unicode: ["1f938-1f3fb"], fname: "1f938-1f3fb", uc: "1f938-1f3fb", isCanonical: !0 }, ":person_doing_cartwheel_tone1:": { unicode: ["1f938-1f3fb"], fname: "1f938-1f3fb", uc: "1f938-1f3fb", isCanonical: !1 }, ":shrug_tone5:": { unicode: ["1f937-1f3ff"], fname: "1f937-1f3ff", uc: "1f937-1f3ff", isCanonical: !0 }, ":shrug_tone4:": { unicode: ["1f937-1f3fe"], fname: "1f937-1f3fe", uc: "1f937-1f3fe", isCanonical: !0 }, ":shrug_tone3:": { unicode: ["1f937-1f3fd"], fname: "1f937-1f3fd", uc: "1f937-1f3fd", isCanonical: !0 }, ":shrug_tone2:": { unicode: ["1f937-1f3fc"], fname: "1f937-1f3fc", uc: "1f937-1f3fc", isCanonical: !0 }, ":shrug_tone1:": { unicode: ["1f937-1f3fb"], fname: "1f937-1f3fb", uc: "1f937-1f3fb", isCanonical: !0 }, ":mrs_claus_tone5:": { unicode: ["1f936-1f3ff"], fname: "1f936-1f3ff", uc: "1f936-1f3ff", isCanonical: !0 }, ":mother_christmas_tone5:": { unicode: ["1f936-1f3ff"], fname: "1f936-1f3ff", uc: "1f936-1f3ff", isCanonical: !1 }, ":mrs_claus_tone4:": { unicode: ["1f936-1f3fe"], fname: "1f936-1f3fe", uc: "1f936-1f3fe", isCanonical: !0 }, ":mother_christmas_tone4:": { unicode: ["1f936-1f3fe"], fname: "1f936-1f3fe", uc: "1f936-1f3fe", isCanonical: !1 }, ":mrs_claus_tone3:": { unicode: ["1f936-1f3fd"], fname: "1f936-1f3fd", uc: "1f936-1f3fd", isCanonical: !0 }, ":mother_christmas_tone3:": { unicode: ["1f936-1f3fd"], fname: "1f936-1f3fd", uc: "1f936-1f3fd", isCanonical: !1 }, ":mrs_claus_tone2:": { unicode: ["1f936-1f3fc"], fname: "1f936-1f3fc", uc: "1f936-1f3fc", isCanonical: !0 }, ":mother_christmas_tone2:": { unicode: ["1f936-1f3fc"], fname: "1f936-1f3fc", uc: "1f936-1f3fc", isCanonical: !1 }, ":mrs_claus_tone1:": { unicode: ["1f936-1f3fb"], fname: "1f936-1f3fb", uc: "1f936-1f3fb", isCanonical: !0 }, ":mother_christmas_tone1:": { unicode: ["1f936-1f3fb"], fname: "1f936-1f3fb", uc: "1f936-1f3fb", isCanonical: !1 }, ":man_in_tuxedo_tone5:": { unicode: ["1f935-1f3ff"], fname: "1f935-1f3ff", uc: "1f935-1f3ff", isCanonical: !0 }, ":tuxedo_tone5:": { unicode: ["1f935-1f3ff"], fname: "1f935-1f3ff", uc: "1f935-1f3ff", isCanonical: !1 }, ":man_in_tuxedo_tone4:": { unicode: ["1f935-1f3fe"], fname: "1f935-1f3fe", uc: "1f935-1f3fe", isCanonical: !0 }, ":tuxedo_tone4:": { unicode: ["1f935-1f3fe"], fname: "1f935-1f3fe", uc: "1f935-1f3fe", isCanonical: !1 }, ":man_in_tuxedo_tone3:": { unicode: ["1f935-1f3fd"], fname: "1f935-1f3fd", uc: "1f935-1f3fd", isCanonical: !0 }, ":tuxedo_tone3:": { unicode: ["1f935-1f3fd"], fname: "1f935-1f3fd", uc: "1f935-1f3fd", isCanonical: !1 }, ":man_in_tuxedo_tone2:": { unicode: ["1f935-1f3fc"], fname: "1f935-1f3fc", uc: "1f935-1f3fc", isCanonical: !0 }, ":tuxedo_tone2:": { unicode: ["1f935-1f3fc"], fname: "1f935-1f3fc", uc: "1f935-1f3fc", isCanonical: !1 }, ":man_in_tuxedo_tone1:": { unicode: ["1f935-1f3fb"], fname: "1f935-1f3fb", uc: "1f935-1f3fb", isCanonical: !0 }, ":tuxedo_tone1:": { unicode: ["1f935-1f3fb"], fname: "1f935-1f3fb", uc: "1f935-1f3fb", isCanonical: !1 }, ":prince_tone5:": { unicode: ["1f934-1f3ff"], fname: "1f934-1f3ff", uc: "1f934-1f3ff", isCanonical: !0 }, ":prince_tone4:": { unicode: ["1f934-1f3fe"], fname: "1f934-1f3fe", uc: "1f934-1f3fe", isCanonical: !0 }, ":prince_tone3:": { unicode: ["1f934-1f3fd"], fname: "1f934-1f3fd", uc: "1f934-1f3fd", isCanonical: !0 }, ":prince_tone2:": { unicode: ["1f934-1f3fc"], fname: "1f934-1f3fc", uc: "1f934-1f3fc", isCanonical: !0 }, ":prince_tone1:": { unicode: ["1f934-1f3fb"], fname: "1f934-1f3fb", uc: "1f934-1f3fb", isCanonical: !0 }, ":selfie_tone5:": { unicode: ["1f933-1f3ff"], fname: "1f933-1f3ff", uc: "1f933-1f3ff", isCanonical: !0 }, ":selfie_tone4:": { unicode: ["1f933-1f3fe"], fname: "1f933-1f3fe", uc: "1f933-1f3fe", isCanonical: !0 }, ":selfie_tone3:": { unicode: ["1f933-1f3fd"], fname: "1f933-1f3fd", uc: "1f933-1f3fd", isCanonical: !0 }, ":selfie_tone2:": { unicode: ["1f933-1f3fc"], fname: "1f933-1f3fc", uc: "1f933-1f3fc", isCanonical: !0 }, ":selfie_tone1:": { unicode: ["1f933-1f3fb"], fname: "1f933-1f3fb", uc: "1f933-1f3fb", isCanonical: !0 }, ":pregnant_woman_tone5:": { unicode: ["1f930-1f3ff"], fname: "1f930-1f3ff", uc: "1f930-1f3ff", isCanonical: !0 }, ":expecting_woman_tone5:": { unicode: ["1f930-1f3ff"], fname: "1f930-1f3ff", uc: "1f930-1f3ff", isCanonical: !1 }, ":pregnant_woman_tone4:": { unicode: ["1f930-1f3fe"], fname: "1f930-1f3fe", uc: "1f930-1f3fe", isCanonical: !0 }, ":expecting_woman_tone4:": { unicode: ["1f930-1f3fe"], fname: "1f930-1f3fe", uc: "1f930-1f3fe", isCanonical: !1 }, ":pregnant_woman_tone3:": { unicode: ["1f930-1f3fd"], fname: "1f930-1f3fd", uc: "1f930-1f3fd", isCanonical: !0 }, ":expecting_woman_tone3:": { unicode: ["1f930-1f3fd"], fname: "1f930-1f3fd", uc: "1f930-1f3fd", isCanonical: !1 }, ":pregnant_woman_tone2:": { unicode: ["1f930-1f3fc"], fname: "1f930-1f3fc", uc: "1f930-1f3fc", isCanonical: !0 }, ":expecting_woman_tone2:": { unicode: ["1f930-1f3fc"], fname: "1f930-1f3fc", uc: "1f930-1f3fc", isCanonical: !1 }, ":pregnant_woman_tone1:": { unicode: ["1f930-1f3fb"], fname: "1f930-1f3fb", uc: "1f930-1f3fb", isCanonical: !0 }, ":expecting_woman_tone1:": { unicode: ["1f930-1f3fb"], fname: "1f930-1f3fb", uc: "1f930-1f3fb", isCanonical: !1 }, ":face_palm_tone5:": { unicode: ["1f926-1f3ff"], fname: "1f926-1f3ff", uc: "1f926-1f3ff", isCanonical: !0 }, ":facepalm_tone5:": { unicode: ["1f926-1f3ff"], fname: "1f926-1f3ff", uc: "1f926-1f3ff", isCanonical: !1 }, ":face_palm_tone4:": { unicode: ["1f926-1f3fe"], fname: "1f926-1f3fe", uc: "1f926-1f3fe", isCanonical: !0 }, ":facepalm_tone4:": { unicode: ["1f926-1f3fe"], fname: "1f926-1f3fe", uc: "1f926-1f3fe", isCanonical: !1 }, ":face_palm_tone3:": { unicode: ["1f926-1f3fd"], fname: "1f926-1f3fd", uc: "1f926-1f3fd", isCanonical: !0 }, ":facepalm_tone3:": { unicode: ["1f926-1f3fd"], fname: "1f926-1f3fd", uc: "1f926-1f3fd", isCanonical: !1 }, ":face_palm_tone2:": { unicode: ["1f926-1f3fc"], fname: "1f926-1f3fc", uc: "1f926-1f3fc", isCanonical: !0 }, ":facepalm_tone2:": { unicode: ["1f926-1f3fc"], fname: "1f926-1f3fc", uc: "1f926-1f3fc", isCanonical: !1 }, ":face_palm_tone1:": { unicode: ["1f926-1f3fb"], fname: "1f926-1f3fb", uc: "1f926-1f3fb", isCanonical: !0 }, ":facepalm_tone1:": { unicode: ["1f926-1f3fb"], fname: "1f926-1f3fb", uc: "1f926-1f3fb", isCanonical: !1 }, ":fingers_crossed_tone5:": { unicode: ["1f91e-1f3ff"], fname: "1f91e-1f3ff", uc: "1f91e-1f3ff", isCanonical: !0 }, ":hand_with_index_and_middle_fingers_crossed_tone5:": { unicode: ["1f91e-1f3ff"], fname: "1f91e-1f3ff", uc: "1f91e-1f3ff", isCanonical: !1 }, ":fingers_crossed_tone4:": { unicode: ["1f91e-1f3fe"], fname: "1f91e-1f3fe", uc: "1f91e-1f3fe", isCanonical: !0 }, ":hand_with_index_and_middle_fingers_crossed_tone4:": { unicode: ["1f91e-1f3fe"], fname: "1f91e-1f3fe", uc: "1f91e-1f3fe", isCanonical: !1 }, ":fingers_crossed_tone3:": { unicode: ["1f91e-1f3fd"], fname: "1f91e-1f3fd", uc: "1f91e-1f3fd", isCanonical: !0 }, ":hand_with_index_and_middle_fingers_crossed_tone3:": { unicode: ["1f91e-1f3fd"], fname: "1f91e-1f3fd", uc: "1f91e-1f3fd", isCanonical: !1 }, ":fingers_crossed_tone2:": { unicode: ["1f91e-1f3fc"], fname: "1f91e-1f3fc", uc: "1f91e-1f3fc", isCanonical: !0 }, ":hand_with_index_and_middle_fingers_crossed_tone2:": { unicode: ["1f91e-1f3fc"], fname: "1f91e-1f3fc", uc: "1f91e-1f3fc", isCanonical: !1 }, ":fingers_crossed_tone1:": { unicode: ["1f91e-1f3fb"], fname: "1f91e-1f3fb", uc: "1f91e-1f3fb", isCanonical: !0 }, ":hand_with_index_and_middle_fingers_crossed_tone1:": { unicode: ["1f91e-1f3fb"], fname: "1f91e-1f3fb", uc: "1f91e-1f3fb", isCanonical: !1 }, ":handshake_tone5:": { unicode: ["1f91d-1f3ff"], fname: "1f91d-1f3ff", uc: "1f91d-1f3ff", isCanonical: !0 }, ":shaking_hands_tone5:": { unicode: ["1f91d-1f3ff"], fname: "1f91d-1f3ff", uc: "1f91d-1f3ff", isCanonical: !1 }, ":handshake_tone4:": { unicode: ["1f91d-1f3fe"], fname: "1f91d-1f3fe", uc: "1f91d-1f3fe", isCanonical: !0 }, ":shaking_hands_tone4:": { unicode: ["1f91d-1f3fe"], fname: "1f91d-1f3fe", uc: "1f91d-1f3fe", isCanonical: !1 }, ":handshake_tone3:": { unicode: ["1f91d-1f3fd"], fname: "1f91d-1f3fd", uc: "1f91d-1f3fd", isCanonical: !0 }, ":shaking_hands_tone3:": { unicode: ["1f91d-1f3fd"], fname: "1f91d-1f3fd", uc: "1f91d-1f3fd", isCanonical: !1 }, ":handshake_tone2:": { unicode: ["1f91d-1f3fc"], fname: "1f91d-1f3fc", uc: "1f91d-1f3fc", isCanonical: !0 }, ":shaking_hands_tone2:": { unicode: ["1f91d-1f3fc"], fname: "1f91d-1f3fc", uc: "1f91d-1f3fc", isCanonical: !1 }, ":handshake_tone1:": { unicode: ["1f91d-1f3fb"], fname: "1f91d-1f3fb", uc: "1f91d-1f3fb", isCanonical: !0 }, ":shaking_hands_tone1:": { unicode: ["1f91d-1f3fb"], fname: "1f91d-1f3fb", uc: "1f91d-1f3fb", isCanonical: !1 }, ":right_facing_fist_tone5:": { unicode: ["1f91c-1f3ff"], fname: "1f91c-1f3ff", uc: "1f91c-1f3ff", isCanonical: !0 }, ":right_fist_tone5:": { unicode: ["1f91c-1f3ff"], fname: "1f91c-1f3ff", uc: "1f91c-1f3ff", isCanonical: !1 }, ":right_facing_fist_tone4:": { unicode: ["1f91c-1f3fe"], fname: "1f91c-1f3fe", uc: "1f91c-1f3fe", isCanonical: !0 }, ":right_fist_tone4:": { unicode: ["1f91c-1f3fe"], fname: "1f91c-1f3fe", uc: "1f91c-1f3fe", isCanonical: !1 }, ":right_facing_fist_tone3:": { unicode: ["1f91c-1f3fd"], fname: "1f91c-1f3fd", uc: "1f91c-1f3fd", isCanonical: !0 }, ":right_fist_tone3:": { unicode: ["1f91c-1f3fd"], fname: "1f91c-1f3fd", uc: "1f91c-1f3fd", isCanonical: !1 }, ":right_facing_fist_tone2:": { unicode: ["1f91c-1f3fc"], fname: "1f91c-1f3fc", uc: "1f91c-1f3fc", isCanonical: !0 }, ":right_fist_tone2:": { unicode: ["1f91c-1f3fc"], fname: "1f91c-1f3fc", uc: "1f91c-1f3fc", isCanonical: !1 }, ":right_facing_fist_tone1:": { unicode: ["1f91c-1f3fb"], fname: "1f91c-1f3fb", uc: "1f91c-1f3fb", isCanonical: !0 }, ":right_fist_tone1:": { unicode: ["1f91c-1f3fb"], fname: "1f91c-1f3fb", uc: "1f91c-1f3fb", isCanonical: !1 }, ":left_facing_fist_tone5:": { unicode: ["1f91b-1f3ff"], fname: "1f91b-1f3ff", uc: "1f91b-1f3ff", isCanonical: !0 }, ":left_fist_tone5:": { unicode: ["1f91b-1f3ff"], fname: "1f91b-1f3ff", uc: "1f91b-1f3ff", isCanonical: !1 }, ":left_facing_fist_tone4:": { unicode: ["1f91b-1f3fe"], fname: "1f91b-1f3fe", uc: "1f91b-1f3fe", isCanonical: !0 }, ":left_fist_tone4:": { unicode: ["1f91b-1f3fe"], fname: "1f91b-1f3fe", uc: "1f91b-1f3fe", isCanonical: !1 }, ":left_facing_fist_tone3:": { unicode: ["1f91b-1f3fd"], fname: "1f91b-1f3fd", uc: "1f91b-1f3fd", isCanonical: !0 }, ":left_fist_tone3:": { unicode: ["1f91b-1f3fd"], fname: "1f91b-1f3fd", uc: "1f91b-1f3fd", isCanonical: !1 }, ":left_facing_fist_tone2:": { unicode: ["1f91b-1f3fc"], fname: "1f91b-1f3fc", uc: "1f91b-1f3fc", isCanonical: !0 }, ":left_fist_tone2:": { unicode: ["1f91b-1f3fc"], fname: "1f91b-1f3fc", uc: "1f91b-1f3fc", isCanonical: !1 }, ":left_facing_fist_tone1:": { unicode: ["1f91b-1f3fb"], fname: "1f91b-1f3fb", uc: "1f91b-1f3fb", isCanonical: !0 }, ":left_fist_tone1:": { unicode: ["1f91b-1f3fb"], fname: "1f91b-1f3fb", uc: "1f91b-1f3fb", isCanonical: !1 }, ":raised_back_of_hand_tone5:": { unicode: ["1f91a-1f3ff"], fname: "1f91a-1f3ff", uc: "1f91a-1f3ff", isCanonical: !0 }, ":back_of_hand_tone5:": { unicode: ["1f91a-1f3ff"], fname: "1f91a-1f3ff", uc: "1f91a-1f3ff", isCanonical: !1 }, ":raised_back_of_hand_tone4:": { unicode: ["1f91a-1f3fe"], fname: "1f91a-1f3fe", uc: "1f91a-1f3fe", isCanonical: !0 }, ":back_of_hand_tone4:": { unicode: ["1f91a-1f3fe"], fname: "1f91a-1f3fe", uc: "1f91a-1f3fe", isCanonical: !1 }, ":raised_back_of_hand_tone3:": { unicode: ["1f91a-1f3fd"], fname: "1f91a-1f3fd", uc: "1f91a-1f3fd", isCanonical: !0 }, ":back_of_hand_tone3:": { unicode: ["1f91a-1f3fd"], fname: "1f91a-1f3fd", uc: "1f91a-1f3fd", isCanonical: !1 }, ":raised_back_of_hand_tone2:": { unicode: ["1f91a-1f3fc"], fname: "1f91a-1f3fc", uc: "1f91a-1f3fc", isCanonical: !0 }, ":back_of_hand_tone2:": { unicode: ["1f91a-1f3fc"], fname: "1f91a-1f3fc", uc: "1f91a-1f3fc", isCanonical: !1 }, ":raised_back_of_hand_tone1:": { unicode: ["1f91a-1f3fb"], fname: "1f91a-1f3fb", uc: "1f91a-1f3fb", isCanonical: !0 }, ":back_of_hand_tone1:": { unicode: ["1f91a-1f3fb"], fname: "1f91a-1f3fb", uc: "1f91a-1f3fb", isCanonical: !1 }, ":call_me_tone5:": { unicode: ["1f919-1f3ff"], fname: "1f919-1f3ff", uc: "1f919-1f3ff", isCanonical: !0 }, ":call_me_hand_tone5:": { unicode: ["1f919-1f3ff"], fname: "1f919-1f3ff", uc: "1f919-1f3ff", isCanonical: !1 }, ":call_me_tone4:": { unicode: ["1f919-1f3fe"], fname: "1f919-1f3fe", uc: "1f919-1f3fe", isCanonical: !0 }, ":call_me_hand_tone4:": { unicode: ["1f919-1f3fe"], fname: "1f919-1f3fe", uc: "1f919-1f3fe", isCanonical: !1 }, ":call_me_tone3:": { unicode: ["1f919-1f3fd"], fname: "1f919-1f3fd", uc: "1f919-1f3fd", isCanonical: !0 }, ":call_me_hand_tone3:": { unicode: ["1f919-1f3fd"], fname: "1f919-1f3fd", uc: "1f919-1f3fd", isCanonical: !1 }, ":call_me_tone2:": { unicode: ["1f919-1f3fc"], fname: "1f919-1f3fc", uc: "1f919-1f3fc", isCanonical: !0 }, ":call_me_hand_tone2:": { unicode: ["1f919-1f3fc"], fname: "1f919-1f3fc", uc: "1f919-1f3fc", isCanonical: !1 }, ":call_me_tone1:": { unicode: ["1f919-1f3fb"], fname: "1f919-1f3fb", uc: "1f919-1f3fb", isCanonical: !0 }, ":call_me_hand_tone1:": { unicode: ["1f919-1f3fb"], fname: "1f919-1f3fb", uc: "1f919-1f3fb", isCanonical: !1 }, ":metal_tone5:": { unicode: ["1f918-1f3ff"], fname: "1f918-1f3ff", uc: "1f918-1f3ff", isCanonical: !0 }, ":sign_of_the_horns_tone5:": { unicode: ["1f918-1f3ff"], fname: "1f918-1f3ff", uc: "1f918-1f3ff", isCanonical: !1 }, ":metal_tone4:": { unicode: ["1f918-1f3fe"], fname: "1f918-1f3fe", uc: "1f918-1f3fe", isCanonical: !0 }, ":sign_of_the_horns_tone4:": { unicode: ["1f918-1f3fe"], fname: "1f918-1f3fe", uc: "1f918-1f3fe", isCanonical: !1 }, ":metal_tone3:": { unicode: ["1f918-1f3fd"], fname: "1f918-1f3fd", uc: "1f918-1f3fd", isCanonical: !0 }, ":sign_of_the_horns_tone3:": { unicode: ["1f918-1f3fd"], fname: "1f918-1f3fd", uc: "1f918-1f3fd", isCanonical: !1 }, ":metal_tone2:": { unicode: ["1f918-1f3fc"], fname: "1f918-1f3fc", uc: "1f918-1f3fc", isCanonical: !0 }, ":sign_of_the_horns_tone2:": { unicode: ["1f918-1f3fc"], fname: "1f918-1f3fc", uc: "1f918-1f3fc", isCanonical: !1 }, ":metal_tone1:": { unicode: ["1f918-1f3fb"], fname: "1f918-1f3fb", uc: "1f918-1f3fb", isCanonical: !0 }, ":sign_of_the_horns_tone1:": { unicode: ["1f918-1f3fb"], fname: "1f918-1f3fb", uc: "1f918-1f3fb", isCanonical: !1 }, ":bath_tone5:": { unicode: ["1f6c0-1f3ff"], fname: "1f6c0-1f3ff", uc: "1f6c0-1f3ff", isCanonical: !0 }, ":bath_tone4:": { unicode: ["1f6c0-1f3fe"], fname: "1f6c0-1f3fe", uc: "1f6c0-1f3fe", isCanonical: !0 }, ":bath_tone3:": { unicode: ["1f6c0-1f3fd"], fname: "1f6c0-1f3fd", uc: "1f6c0-1f3fd", isCanonical: !0 }, ":bath_tone2:": { unicode: ["1f6c0-1f3fc"], fname: "1f6c0-1f3fc", uc: "1f6c0-1f3fc", isCanonical: !0 }, ":bath_tone1:": { unicode: ["1f6c0-1f3fb"], fname: "1f6c0-1f3fb", uc: "1f6c0-1f3fb", isCanonical: !0 }, ":walking_tone5:": { unicode: ["1f6b6-1f3ff"], fname: "1f6b6-1f3ff", uc: "1f6b6-1f3ff", isCanonical: !0 }, ":walking_tone4:": { unicode: ["1f6b6-1f3fe"], fname: "1f6b6-1f3fe", uc: "1f6b6-1f3fe", isCanonical: !0 }, ":walking_tone3:": { unicode: ["1f6b6-1f3fd"], fname: "1f6b6-1f3fd", uc: "1f6b6-1f3fd", isCanonical: !0 }, ":walking_tone2:": { unicode: ["1f6b6-1f3fc"], fname: "1f6b6-1f3fc", uc: "1f6b6-1f3fc", isCanonical: !0 }, ":walking_tone1:": { unicode: ["1f6b6-1f3fb"], fname: "1f6b6-1f3fb", uc: "1f6b6-1f3fb", isCanonical: !0 }, ":mountain_bicyclist_tone5:": { unicode: ["1f6b5-1f3ff"], fname: "1f6b5-1f3ff", uc: "1f6b5-1f3ff", isCanonical: !0 }, ":mountain_bicyclist_tone4:": { unicode: ["1f6b5-1f3fe"], fname: "1f6b5-1f3fe", uc: "1f6b5-1f3fe", isCanonical: !0 }, ":mountain_bicyclist_tone3:": { unicode: ["1f6b5-1f3fd"], fname: "1f6b5-1f3fd", uc: "1f6b5-1f3fd", isCanonical: !0 }, ":mountain_bicyclist_tone2:": { unicode: ["1f6b5-1f3fc"], fname: "1f6b5-1f3fc", uc: "1f6b5-1f3fc", isCanonical: !0 }, ":mountain_bicyclist_tone1:": { unicode: ["1f6b5-1f3fb"], fname: "1f6b5-1f3fb", uc: "1f6b5-1f3fb", isCanonical: !0 }, ":bicyclist_tone5:": { unicode: ["1f6b4-1f3ff"], fname: "1f6b4-1f3ff", uc: "1f6b4-1f3ff", isCanonical: !0 }, ":bicyclist_tone4:": { unicode: ["1f6b4-1f3fe"], fname: "1f6b4-1f3fe", uc: "1f6b4-1f3fe", isCanonical: !0 }, ":bicyclist_tone3:": { unicode: ["1f6b4-1f3fd"], fname: "1f6b4-1f3fd", uc: "1f6b4-1f3fd", isCanonical: !0 }, ":bicyclist_tone2:": { unicode: ["1f6b4-1f3fc"], fname: "1f6b4-1f3fc", uc: "1f6b4-1f3fc", isCanonical: !0 }, ":bicyclist_tone1:": { unicode: ["1f6b4-1f3fb"], fname: "1f6b4-1f3fb", uc: "1f6b4-1f3fb", isCanonical: !0 }, ":rowboat_tone5:": { unicode: ["1f6a3-1f3ff"], fname: "1f6a3-1f3ff", uc: "1f6a3-1f3ff", isCanonical: !0 }, ":rowboat_tone4:": { unicode: ["1f6a3-1f3fe"], fname: "1f6a3-1f3fe", uc: "1f6a3-1f3fe", isCanonical: !0 }, ":rowboat_tone3:": { unicode: ["1f6a3-1f3fd"], fname: "1f6a3-1f3fd", uc: "1f6a3-1f3fd", isCanonical: !0 }, ":rowboat_tone2:": { unicode: ["1f6a3-1f3fc"], fname: "1f6a3-1f3fc", uc: "1f6a3-1f3fc", isCanonical: !0 }, ":rowboat_tone1:": { unicode: ["1f6a3-1f3fb"], fname: "1f6a3-1f3fb", uc: "1f6a3-1f3fb", isCanonical: !0 }, ":pray_tone5:": { unicode: ["1f64f-1f3ff"], fname: "1f64f-1f3ff", uc: "1f64f-1f3ff", isCanonical: !0 }, ":pray_tone4:": { unicode: ["1f64f-1f3fe"], fname: "1f64f-1f3fe", uc: "1f64f-1f3fe", isCanonical: !0 }, ":pray_tone3:": { unicode: ["1f64f-1f3fd"], fname: "1f64f-1f3fd", uc: "1f64f-1f3fd", isCanonical: !0 }, ":pray_tone2:": { unicode: ["1f64f-1f3fc"], fname: "1f64f-1f3fc", uc: "1f64f-1f3fc", isCanonical: !0 }, ":pray_tone1:": { unicode: ["1f64f-1f3fb"], fname: "1f64f-1f3fb", uc: "1f64f-1f3fb", isCanonical: !0 }, ":person_with_pouting_face_tone5:": { unicode: ["1f64e-1f3ff"], fname: "1f64e-1f3ff", uc: "1f64e-1f3ff", isCanonical: !0 }, ":person_with_pouting_face_tone4:": { unicode: ["1f64e-1f3fe"], fname: "1f64e-1f3fe", uc: "1f64e-1f3fe", isCanonical: !0 }, ":person_with_pouting_face_tone3:": { unicode: ["1f64e-1f3fd"], fname: "1f64e-1f3fd", uc: "1f64e-1f3fd", isCanonical: !0 }, ":person_with_pouting_face_tone2:": { unicode: ["1f64e-1f3fc"], fname: "1f64e-1f3fc", uc: "1f64e-1f3fc", isCanonical: !0 }, ":person_with_pouting_face_tone1:": { unicode: ["1f64e-1f3fb"], fname: "1f64e-1f3fb", uc: "1f64e-1f3fb", isCanonical: !0 }, ":person_frowning_tone5:": { unicode: ["1f64d-1f3ff"], fname: "1f64d-1f3ff", uc: "1f64d-1f3ff", isCanonical: !0 }, ":person_frowning_tone4:": { unicode: ["1f64d-1f3fe"], fname: "1f64d-1f3fe", uc: "1f64d-1f3fe", isCanonical: !0 }, ":person_frowning_tone3:": { unicode: ["1f64d-1f3fd"], fname: "1f64d-1f3fd", uc: "1f64d-1f3fd", isCanonical: !0 }, ":person_frowning_tone2:": { unicode: ["1f64d-1f3fc"], fname: "1f64d-1f3fc", uc: "1f64d-1f3fc", isCanonical: !0 }, ":person_frowning_tone1:": { unicode: ["1f64d-1f3fb"], fname: "1f64d-1f3fb", uc: "1f64d-1f3fb", isCanonical: !0 }, ":raised_hands_tone5:": { unicode: ["1f64c-1f3ff"], fname: "1f64c-1f3ff", uc: "1f64c-1f3ff", isCanonical: !0 }, ":raised_hands_tone4:": { unicode: ["1f64c-1f3fe"], fname: "1f64c-1f3fe", uc: "1f64c-1f3fe", isCanonical: !0 }, ":raised_hands_tone3:": { unicode: ["1f64c-1f3fd"], fname: "1f64c-1f3fd", uc: "1f64c-1f3fd", isCanonical: !0 }, ":raised_hands_tone2:": { unicode: ["1f64c-1f3fc"], fname: "1f64c-1f3fc", uc: "1f64c-1f3fc", isCanonical: !0 }, ":raised_hands_tone1:": { unicode: ["1f64c-1f3fb"], fname: "1f64c-1f3fb", uc: "1f64c-1f3fb", isCanonical: !0 }, ":raising_hand_tone5:": { unicode: ["1f64b-1f3ff"], fname: "1f64b-1f3ff", uc: "1f64b-1f3ff", isCanonical: !0 }, ":raising_hand_tone4:": { unicode: ["1f64b-1f3fe"], fname: "1f64b-1f3fe", uc: "1f64b-1f3fe", isCanonical: !0 }, ":raising_hand_tone3:": { unicode: ["1f64b-1f3fd"], fname: "1f64b-1f3fd", uc: "1f64b-1f3fd", isCanonical: !0 }, ":raising_hand_tone2:": { unicode: ["1f64b-1f3fc"], fname: "1f64b-1f3fc", uc: "1f64b-1f3fc", isCanonical: !0 }, ":raising_hand_tone1:": { unicode: ["1f64b-1f3fb"], fname: "1f64b-1f3fb", uc: "1f64b-1f3fb", isCanonical: !0 }, ":bow_tone5:": { unicode: ["1f647-1f3ff"], fname: "1f647-1f3ff", uc: "1f647-1f3ff", isCanonical: !0 }, ":bow_tone4:": { unicode: ["1f647-1f3fe"], fname: "1f647-1f3fe", uc: "1f647-1f3fe", isCanonical: !0 }, ":bow_tone3:": { unicode: ["1f647-1f3fd"], fname: "1f647-1f3fd", uc: "1f647-1f3fd", isCanonical: !0 }, ":bow_tone2:": { unicode: ["1f647-1f3fc"], fname: "1f647-1f3fc", uc: "1f647-1f3fc", isCanonical: !0 }, ":bow_tone1:": { unicode: ["1f647-1f3fb"], fname: "1f647-1f3fb", uc: "1f647-1f3fb", isCanonical: !0 }, ":ok_woman_tone5:": { unicode: ["1f646-1f3ff"], fname: "1f646-1f3ff", uc: "1f646-1f3ff", isCanonical: !0 }, ":ok_woman_tone4:": { unicode: ["1f646-1f3fe"], fname: "1f646-1f3fe", uc: "1f646-1f3fe", isCanonical: !0 }, ":ok_woman_tone3:": { unicode: ["1f646-1f3fd"], fname: "1f646-1f3fd", uc: "1f646-1f3fd", isCanonical: !0 }, ":ok_woman_tone2:": { unicode: ["1f646-1f3fc"], fname: "1f646-1f3fc", uc: "1f646-1f3fc", isCanonical: !0 }, ":ok_woman_tone1:": { unicode: ["1f646-1f3fb"], fname: "1f646-1f3fb", uc: "1f646-1f3fb", isCanonical: !0 }, ":no_good_tone5:": { unicode: ["1f645-1f3ff"], fname: "1f645-1f3ff", uc: "1f645-1f3ff", isCanonical: !0 }, ":no_good_tone4:": { unicode: ["1f645-1f3fe"], fname: "1f645-1f3fe", uc: "1f645-1f3fe", isCanonical: !0 }, ":no_good_tone3:": { unicode: ["1f645-1f3fd"], fname: "1f645-1f3fd", uc: "1f645-1f3fd", isCanonical: !0 }, ":no_good_tone2:": { unicode: ["1f645-1f3fc"], fname: "1f645-1f3fc", uc: "1f645-1f3fc", isCanonical: !0 }, ":no_good_tone1:": { unicode: ["1f645-1f3fb"], fname: "1f645-1f3fb", uc: "1f645-1f3fb", isCanonical: !0 }, ":vulcan_tone5:": { unicode: ["1f596-1f3ff"], fname: "1f596-1f3ff", uc: "1f596-1f3ff", isCanonical: !0 }, ":raised_hand_with_part_between_middle_and_ring_fingers_tone5:": { unicode: ["1f596-1f3ff"], fname: "1f596-1f3ff", uc: "1f596-1f3ff", isCanonical: !1 }, ":vulcan_tone4:": { unicode: ["1f596-1f3fe"], fname: "1f596-1f3fe", uc: "1f596-1f3fe", isCanonical: !0 }, ":raised_hand_with_part_between_middle_and_ring_fingers_tone4:": { unicode: ["1f596-1f3fe"], fname: "1f596-1f3fe", uc: "1f596-1f3fe", isCanonical: !1 }, ":vulcan_tone3:": { unicode: ["1f596-1f3fd"], fname: "1f596-1f3fd", uc: "1f596-1f3fd", isCanonical: !0 }, ":raised_hand_with_part_between_middle_and_ring_fingers_tone3:": { unicode: ["1f596-1f3fd"], fname: "1f596-1f3fd", uc: "1f596-1f3fd", isCanonical: !1 }, ":vulcan_tone2:": { unicode: ["1f596-1f3fc"], fname: "1f596-1f3fc", uc: "1f596-1f3fc", isCanonical: !0 }, ":raised_hand_with_part_between_middle_and_ring_fingers_tone2:": { unicode: ["1f596-1f3fc"], fname: "1f596-1f3fc", uc: "1f596-1f3fc", isCanonical: !1 }, ":vulcan_tone1:": { unicode: ["1f596-1f3fb"], fname: "1f596-1f3fb", uc: "1f596-1f3fb", isCanonical: !0 }, ":raised_hand_with_part_between_middle_and_ring_fingers_tone1:": { unicode: ["1f596-1f3fb"], fname: "1f596-1f3fb", uc: "1f596-1f3fb", isCanonical: !1 }, ":middle_finger_tone5:": { unicode: ["1f595-1f3ff"], fname: "1f595-1f3ff", uc: "1f595-1f3ff", isCanonical: !0 }, ":reversed_hand_with_middle_finger_extended_tone5:": { unicode: ["1f595-1f3ff"], fname: "1f595-1f3ff", uc: "1f595-1f3ff", isCanonical: !1 }, ":middle_finger_tone4:": { unicode: ["1f595-1f3fe"], fname: "1f595-1f3fe", uc: "1f595-1f3fe", isCanonical: !0 }, ":reversed_hand_with_middle_finger_extended_tone4:": { unicode: ["1f595-1f3fe"], fname: "1f595-1f3fe", uc: "1f595-1f3fe", isCanonical: !1 }, ":middle_finger_tone3:": { unicode: ["1f595-1f3fd"], fname: "1f595-1f3fd", uc: "1f595-1f3fd", isCanonical: !0 }, ":reversed_hand_with_middle_finger_extended_tone3:": { unicode: ["1f595-1f3fd"], fname: "1f595-1f3fd", uc: "1f595-1f3fd", isCanonical: !1 }, ":middle_finger_tone2:": { unicode: ["1f595-1f3fc"], fname: "1f595-1f3fc", uc: "1f595-1f3fc", isCanonical: !0 }, ":reversed_hand_with_middle_finger_extended_tone2:": { unicode: ["1f595-1f3fc"], fname: "1f595-1f3fc", uc: "1f595-1f3fc", isCanonical: !1 }, ":middle_finger_tone1:": { unicode: ["1f595-1f3fb"], fname: "1f595-1f3fb", uc: "1f595-1f3fb", isCanonical: !0 }, ":reversed_hand_with_middle_finger_extended_tone1:": { unicode: ["1f595-1f3fb"], fname: "1f595-1f3fb", uc: "1f595-1f3fb", isCanonical: !1 }, ":hand_splayed_tone5:": { unicode: ["1f590-1f3ff"], fname: "1f590-1f3ff", uc: "1f590-1f3ff", isCanonical: !0 }, ":raised_hand_with_fingers_splayed_tone5:": { unicode: ["1f590-1f3ff"], fname: "1f590-1f3ff", uc: "1f590-1f3ff", isCanonical: !1 }, ":hand_splayed_tone4:": { unicode: ["1f590-1f3fe"], fname: "1f590-1f3fe", uc: "1f590-1f3fe", isCanonical: !0 }, ":raised_hand_with_fingers_splayed_tone4:": { unicode: ["1f590-1f3fe"], fname: "1f590-1f3fe", uc: "1f590-1f3fe", isCanonical: !1 }, ":hand_splayed_tone3:": { unicode: ["1f590-1f3fd"], fname: "1f590-1f3fd", uc: "1f590-1f3fd", isCanonical: !0 }, ":raised_hand_with_fingers_splayed_tone3:": { unicode: ["1f590-1f3fd"], fname: "1f590-1f3fd", uc: "1f590-1f3fd", isCanonical: !1 }, ":hand_splayed_tone2:": { unicode: ["1f590-1f3fc"], fname: "1f590-1f3fc", uc: "1f590-1f3fc", isCanonical: !0 }, ":raised_hand_with_fingers_splayed_tone2:": { unicode: ["1f590-1f3fc"], fname: "1f590-1f3fc", uc: "1f590-1f3fc", isCanonical: !1 }, ":hand_splayed_tone1:": { unicode: ["1f590-1f3fb"], fname: "1f590-1f3fb", uc: "1f590-1f3fb", isCanonical: !0 }, ":raised_hand_with_fingers_splayed_tone1:": {
      unicode: ["1f590-1f3fb"], fname: "1f590-1f3fb", uc: "1f590-1f3fb", isCanonical: !1 }, ":man_dancing_tone5:": { unicode: ["1f57a-1f3ff"], fname: "1f57a-1f3ff", uc: "1f57a-1f3ff", isCanonical: !0 }, ":male_dancer_tone5:": { unicode: ["1f57a-1f3ff"], fname: "1f57a-1f3ff", uc: "1f57a-1f3ff", isCanonical: !1 }, ":man_dancing_tone4:": { unicode: ["1f57a-1f3fe"], fname: "1f57a-1f3fe", uc: "1f57a-1f3fe", isCanonical: !0 }, ":male_dancer_tone4:": { unicode: ["1f57a-1f3fe"], fname: "1f57a-1f3fe", uc: "1f57a-1f3fe", isCanonical: !1 }, ":man_dancing_tone3:": { unicode: ["1f57a-1f3fd"], fname: "1f57a-1f3fd", uc: "1f57a-1f3fd", isCanonical: !0 }, ":male_dancer_tone3:": { unicode: ["1f57a-1f3fd"], fname: "1f57a-1f3fd", uc: "1f57a-1f3fd", isCanonical: !1 }, ":man_dancing_tone2:": { unicode: ["1f57a-1f3fc"], fname: "1f57a-1f3fc", uc: "1f57a-1f3fc", isCanonical: !0 }, ":male_dancer_tone2:": { unicode: ["1f57a-1f3fc"], fname: "1f57a-1f3fc", uc: "1f57a-1f3fc", isCanonical: !1 }, ":man_dancing_tone1:": { unicode: ["1f57a-1f3fb"], fname: "1f57a-1f3fb", uc: "1f57a-1f3fb", isCanonical: !0 }, ":male_dancer_tone1:": { unicode: ["1f57a-1f3fb"], fname: "1f57a-1f3fb", uc: "1f57a-1f3fb", isCanonical: !1 }, ":spy_tone5:": { unicode: ["1f575-1f3ff"], fname: "1f575-1f3ff", uc: "1f575-1f3ff", isCanonical: !0 }, ":sleuth_or_spy_tone5:": { unicode: ["1f575-1f3ff"], fname: "1f575-1f3ff", uc: "1f575-1f3ff", isCanonical: !1 }, ":spy_tone4:": { unicode: ["1f575-1f3fe"], fname: "1f575-1f3fe", uc: "1f575-1f3fe", isCanonical: !0 }, ":sleuth_or_spy_tone4:": { unicode: ["1f575-1f3fe"], fname: "1f575-1f3fe", uc: "1f575-1f3fe", isCanonical: !1 }, ":spy_tone3:": { unicode: ["1f575-1f3fd"], fname: "1f575-1f3fd", uc: "1f575-1f3fd", isCanonical: !0 }, ":sleuth_or_spy_tone3:": { unicode: ["1f575-1f3fd"], fname: "1f575-1f3fd", uc: "1f575-1f3fd", isCanonical: !1 }, ":spy_tone2:": { unicode: ["1f575-1f3fc"], fname: "1f575-1f3fc", uc: "1f575-1f3fc", isCanonical: !0 }, ":sleuth_or_spy_tone2:": { unicode: ["1f575-1f3fc"], fname: "1f575-1f3fc", uc: "1f575-1f3fc", isCanonical: !1 }, ":spy_tone1:": { unicode: ["1f575-1f3fb"], fname: "1f575-1f3fb", uc: "1f575-1f3fb", isCanonical: !0 }, ":sleuth_or_spy_tone1:": { unicode: ["1f575-1f3fb"], fname: "1f575-1f3fb", uc: "1f575-1f3fb", isCanonical: !1 }, ":muscle_tone5:": { unicode: ["1f4aa-1f3ff"], fname: "1f4aa-1f3ff", uc: "1f4aa-1f3ff", isCanonical: !0 }, ":muscle_tone4:": { unicode: ["1f4aa-1f3fe"], fname: "1f4aa-1f3fe", uc: "1f4aa-1f3fe", isCanonical: !0 }, ":muscle_tone3:": { unicode: ["1f4aa-1f3fd"], fname: "1f4aa-1f3fd", uc: "1f4aa-1f3fd", isCanonical: !0 }, ":muscle_tone2:": { unicode: ["1f4aa-1f3fc"], fname: "1f4aa-1f3fc", uc: "1f4aa-1f3fc", isCanonical: !0 }, ":muscle_tone1:": { unicode: ["1f4aa-1f3fb"], fname: "1f4aa-1f3fb", uc: "1f4aa-1f3fb", isCanonical: !0 }, ":haircut_tone5:": { unicode: ["1f487-1f3ff"], fname: "1f487-1f3ff", uc: "1f487-1f3ff", isCanonical: !0 }, ":haircut_tone4:": { unicode: ["1f487-1f3fe"], fname: "1f487-1f3fe", uc: "1f487-1f3fe", isCanonical: !0 }, ":haircut_tone3:": { unicode: ["1f487-1f3fd"], fname: "1f487-1f3fd", uc: "1f487-1f3fd", isCanonical: !0 }, ":haircut_tone2:": { unicode: ["1f487-1f3fc"], fname: "1f487-1f3fc", uc: "1f487-1f3fc", isCanonical: !0 }, ":haircut_tone1:": { unicode: ["1f487-1f3fb"], fname: "1f487-1f3fb", uc: "1f487-1f3fb", isCanonical: !0 }, ":massage_tone5:": { unicode: ["1f486-1f3ff"], fname: "1f486-1f3ff", uc: "1f486-1f3ff", isCanonical: !0 }, ":massage_tone4:": { unicode: ["1f486-1f3fe"], fname: "1f486-1f3fe", uc: "1f486-1f3fe", isCanonical: !0 }, ":massage_tone3:": { unicode: ["1f486-1f3fd"], fname: "1f486-1f3fd", uc: "1f486-1f3fd", isCanonical: !0 }, ":massage_tone2:": { unicode: ["1f486-1f3fc"], fname: "1f486-1f3fc", uc: "1f486-1f3fc", isCanonical: !0 }, ":massage_tone1:": { unicode: ["1f486-1f3fb"], fname: "1f486-1f3fb", uc: "1f486-1f3fb", isCanonical: !0 }, ":nail_care_tone5:": { unicode: ["1f485-1f3ff"], fname: "1f485-1f3ff", uc: "1f485-1f3ff", isCanonical: !0 }, ":nail_care_tone4:": { unicode: ["1f485-1f3fe"], fname: "1f485-1f3fe", uc: "1f485-1f3fe", isCanonical: !0 }, ":nail_care_tone3:": { unicode: ["1f485-1f3fd"], fname: "1f485-1f3fd", uc: "1f485-1f3fd", isCanonical: !0 }, ":nail_care_tone2:": { unicode: ["1f485-1f3fc"], fname: "1f485-1f3fc", uc: "1f485-1f3fc", isCanonical: !0 }, ":nail_care_tone1:": { unicode: ["1f485-1f3fb"], fname: "1f485-1f3fb", uc: "1f485-1f3fb", isCanonical: !0 }, ":dancer_tone5:": { unicode: ["1f483-1f3ff"], fname: "1f483-1f3ff", uc: "1f483-1f3ff", isCanonical: !0 }, ":dancer_tone4:": { unicode: ["1f483-1f3fe"], fname: "1f483-1f3fe", uc: "1f483-1f3fe", isCanonical: !0 }, ":dancer_tone3:": { unicode: ["1f483-1f3fd"], fname: "1f483-1f3fd", uc: "1f483-1f3fd", isCanonical: !0 }, ":dancer_tone2:": { unicode: ["1f483-1f3fc"], fname: "1f483-1f3fc", uc: "1f483-1f3fc", isCanonical: !0 }, ":dancer_tone1:": { unicode: ["1f483-1f3fb"], fname: "1f483-1f3fb", uc: "1f483-1f3fb", isCanonical: !0 }, ":guardsman_tone5:": { unicode: ["1f482-1f3ff"], fname: "1f482-1f3ff", uc: "1f482-1f3ff", isCanonical: !0 }, ":guardsman_tone4:": { unicode: ["1f482-1f3fe"], fname: "1f482-1f3fe", uc: "1f482-1f3fe", isCanonical: !0 }, ":guardsman_tone3:": { unicode: ["1f482-1f3fd"], fname: "1f482-1f3fd", uc: "1f482-1f3fd", isCanonical: !0 }, ":guardsman_tone2:": { unicode: ["1f482-1f3fc"], fname: "1f482-1f3fc", uc: "1f482-1f3fc", isCanonical: !0 }, ":guardsman_tone1:": { unicode: ["1f482-1f3fb"], fname: "1f482-1f3fb", uc: "1f482-1f3fb", isCanonical: !0 }, ":information_desk_person_tone5:": { unicode: ["1f481-1f3ff"], fname: "1f481-1f3ff", uc: "1f481-1f3ff", isCanonical: !0 }, ":information_desk_person_tone4:": { unicode: ["1f481-1f3fe"], fname: "1f481-1f3fe", uc: "1f481-1f3fe", isCanonical: !0 }, ":information_desk_person_tone3:": { unicode: ["1f481-1f3fd"], fname: "1f481-1f3fd", uc: "1f481-1f3fd", isCanonical: !0 }, ":information_desk_person_tone2:": { unicode: ["1f481-1f3fc"], fname: "1f481-1f3fc", uc: "1f481-1f3fc", isCanonical: !0 }, ":information_desk_person_tone1:": { unicode: ["1f481-1f3fb"], fname: "1f481-1f3fb", uc: "1f481-1f3fb", isCanonical: !0 }, ":angel_tone5:": { unicode: ["1f47c-1f3ff"], fname: "1f47c-1f3ff", uc: "1f47c-1f3ff", isCanonical: !0 }, ":angel_tone4:": { unicode: ["1f47c-1f3fe"], fname: "1f47c-1f3fe", uc: "1f47c-1f3fe", isCanonical: !0 }, ":angel_tone3:": { unicode: ["1f47c-1f3fd"], fname: "1f47c-1f3fd", uc: "1f47c-1f3fd", isCanonical: !0 }, ":angel_tone2:": { unicode: ["1f47c-1f3fc"], fname: "1f47c-1f3fc", uc: "1f47c-1f3fc", isCanonical: !0 }, ":angel_tone1:": { unicode: ["1f47c-1f3fb"], fname: "1f47c-1f3fb", uc: "1f47c-1f3fb", isCanonical: !0 }, ":princess_tone5:": { unicode: ["1f478-1f3ff"], fname: "1f478-1f3ff", uc: "1f478-1f3ff", isCanonical: !0 }, ":princess_tone4:": { unicode: ["1f478-1f3fe"], fname: "1f478-1f3fe", uc: "1f478-1f3fe", isCanonical: !0 }, ":princess_tone3:": { unicode: ["1f478-1f3fd"], fname: "1f478-1f3fd", uc: "1f478-1f3fd", isCanonical: !0 }, ":princess_tone2:": { unicode: ["1f478-1f3fc"], fname: "1f478-1f3fc", uc: "1f478-1f3fc", isCanonical: !0 }, ":princess_tone1:": { unicode: ["1f478-1f3fb"], fname: "1f478-1f3fb", uc: "1f478-1f3fb", isCanonical: !0 }, ":construction_worker_tone5:": { unicode: ["1f477-1f3ff"], fname: "1f477-1f3ff", uc: "1f477-1f3ff", isCanonical: !0 }, ":construction_worker_tone4:": { unicode: ["1f477-1f3fe"], fname: "1f477-1f3fe", uc: "1f477-1f3fe", isCanonical: !0 }, ":construction_worker_tone3:": { unicode: ["1f477-1f3fd"], fname: "1f477-1f3fd", uc: "1f477-1f3fd", isCanonical: !0 }, ":construction_worker_tone2:": { unicode: ["1f477-1f3fc"], fname: "1f477-1f3fc", uc: "1f477-1f3fc", isCanonical: !0 }, ":construction_worker_tone1:": { unicode: ["1f477-1f3fb"], fname: "1f477-1f3fb", uc: "1f477-1f3fb", isCanonical: !0 }, ":baby_tone5:": { unicode: ["1f476-1f3ff"], fname: "1f476-1f3ff", uc: "1f476-1f3ff", isCanonical: !0 }, ":baby_tone4:": { unicode: ["1f476-1f3fe"], fname: "1f476-1f3fe", uc: "1f476-1f3fe", isCanonical: !0 }, ":baby_tone3:": { unicode: ["1f476-1f3fd"], fname: "1f476-1f3fd", uc: "1f476-1f3fd", isCanonical: !0 }, ":baby_tone2:": { unicode: ["1f476-1f3fc"], fname: "1f476-1f3fc", uc: "1f476-1f3fc", isCanonical: !0 }, ":baby_tone1:": { unicode: ["1f476-1f3fb"], fname: "1f476-1f3fb", uc: "1f476-1f3fb", isCanonical: !0 }, ":older_woman_tone5:": { unicode: ["1f475-1f3ff"], fname: "1f475-1f3ff", uc: "1f475-1f3ff", isCanonical: !0 }, ":grandma_tone5:": { unicode: ["1f475-1f3ff"], fname: "1f475-1f3ff", uc: "1f475-1f3ff", isCanonical: !1 }, ":older_woman_tone4:": { unicode: ["1f475-1f3fe"], fname: "1f475-1f3fe", uc: "1f475-1f3fe", isCanonical: !0 }, ":grandma_tone4:": { unicode: ["1f475-1f3fe"], fname: "1f475-1f3fe", uc: "1f475-1f3fe", isCanonical: !1 }, ":older_woman_tone3:": { unicode: ["1f475-1f3fd"], fname: "1f475-1f3fd", uc: "1f475-1f3fd", isCanonical: !0 }, ":grandma_tone3:": { unicode: ["1f475-1f3fd"], fname: "1f475-1f3fd", uc: "1f475-1f3fd", isCanonical: !1 }, ":older_woman_tone2:": { unicode: ["1f475-1f3fc"], fname: "1f475-1f3fc", uc: "1f475-1f3fc", isCanonical: !0 }, ":grandma_tone2:": { unicode: ["1f475-1f3fc"], fname: "1f475-1f3fc", uc: "1f475-1f3fc", isCanonical: !1 }, ":older_woman_tone1:": { unicode: ["1f475-1f3fb"], fname: "1f475-1f3fb", uc: "1f475-1f3fb", isCanonical: !0 }, ":grandma_tone1:": { unicode: ["1f475-1f3fb"], fname: "1f475-1f3fb", uc: "1f475-1f3fb", isCanonical: !1 }, ":older_man_tone5:": { unicode: ["1f474-1f3ff"], fname: "1f474-1f3ff", uc: "1f474-1f3ff", isCanonical: !0 }, ":older_man_tone4:": { unicode: ["1f474-1f3fe"], fname: "1f474-1f3fe", uc: "1f474-1f3fe", isCanonical: !0 }, ":older_man_tone3:": { unicode: ["1f474-1f3fd"], fname: "1f474-1f3fd", uc: "1f474-1f3fd", isCanonical: !0 }, ":older_man_tone2:": { unicode: ["1f474-1f3fc"], fname: "1f474-1f3fc", uc: "1f474-1f3fc", isCanonical: !0 }, ":older_man_tone1:": { unicode: ["1f474-1f3fb"], fname: "1f474-1f3fb", uc: "1f474-1f3fb", isCanonical: !0 }, ":man_with_turban_tone5:": { unicode: ["1f473-1f3ff"], fname: "1f473-1f3ff", uc: "1f473-1f3ff", isCanonical: !0 }, ":man_with_turban_tone4:": { unicode: ["1f473-1f3fe"], fname: "1f473-1f3fe", uc: "1f473-1f3fe", isCanonical: !0 }, ":man_with_turban_tone3:": { unicode: ["1f473-1f3fd"], fname: "1f473-1f3fd", uc: "1f473-1f3fd", isCanonical: !0 }, ":man_with_turban_tone2:": { unicode: ["1f473-1f3fc"], fname: "1f473-1f3fc", uc: "1f473-1f3fc", isCanonical: !0 }, ":man_with_turban_tone1:": { unicode: ["1f473-1f3fb"], fname: "1f473-1f3fb", uc: "1f473-1f3fb", isCanonical: !0 }, ":man_with_gua_pi_mao_tone5:": { unicode: ["1f472-1f3ff"], fname: "1f472-1f3ff", uc: "1f472-1f3ff", isCanonical: !0 }, ":man_with_gua_pi_mao_tone4:": { unicode: ["1f472-1f3fe"], fname: "1f472-1f3fe", uc: "1f472-1f3fe", isCanonical: !0 }, ":man_with_gua_pi_mao_tone3:": { unicode: ["1f472-1f3fd"], fname: "1f472-1f3fd", uc: "1f472-1f3fd", isCanonical: !0 }, ":man_with_gua_pi_mao_tone2:": { unicode: ["1f472-1f3fc"], fname: "1f472-1f3fc", uc: "1f472-1f3fc", isCanonical: !0 }, ":man_with_gua_pi_mao_tone1:": { unicode: ["1f472-1f3fb"], fname: "1f472-1f3fb", uc: "1f472-1f3fb", isCanonical: !0 }, ":person_with_blond_hair_tone5:": { unicode: ["1f471-1f3ff"], fname: "1f471-1f3ff", uc: "1f471-1f3ff", isCanonical: !0 }, ":person_with_blond_hair_tone4:": { unicode: ["1f471-1f3fe"], fname: "1f471-1f3fe", uc: "1f471-1f3fe", isCanonical: !0 }, ":person_with_blond_hair_tone3:": { unicode: ["1f471-1f3fd"], fname: "1f471-1f3fd", uc: "1f471-1f3fd", isCanonical: !0 }, ":person_with_blond_hair_tone2:": { unicode: ["1f471-1f3fc"], fname: "1f471-1f3fc", uc: "1f471-1f3fc", isCanonical: !0 }, ":person_with_blond_hair_tone1:": { unicode: ["1f471-1f3fb"], fname: "1f471-1f3fb", uc: "1f471-1f3fb", isCanonical: !0 }, ":bride_with_veil_tone5:": { unicode: ["1f470-1f3ff"], fname: "1f470-1f3ff", uc: "1f470-1f3ff", isCanonical: !0 }, ":bride_with_veil_tone4:": { unicode: ["1f470-1f3fe"], fname: "1f470-1f3fe", uc: "1f470-1f3fe", isCanonical: !0 }, ":bride_with_veil_tone3:": { unicode: ["1f470-1f3fd"], fname: "1f470-1f3fd", uc: "1f470-1f3fd", isCanonical: !0 }, ":bride_with_veil_tone2:": { unicode: ["1f470-1f3fc"], fname: "1f470-1f3fc", uc: "1f470-1f3fc", isCanonical: !0 }, ":bride_with_veil_tone1:": { unicode: ["1f470-1f3fb"], fname: "1f470-1f3fb", uc: "1f470-1f3fb", isCanonical: !0 }, ":cop_tone5:": { unicode: ["1f46e-1f3ff"], fname: "1f46e-1f3ff", uc: "1f46e-1f3ff", isCanonical: !0 }, ":cop_tone4:": { unicode: ["1f46e-1f3fe"], fname: "1f46e-1f3fe", uc: "1f46e-1f3fe", isCanonical: !0 }, ":cop_tone3:": { unicode: ["1f46e-1f3fd"], fname: "1f46e-1f3fd", uc: "1f46e-1f3fd", isCanonical: !0 }, ":cop_tone2:": { unicode: ["1f46e-1f3fc"], fname: "1f46e-1f3fc", uc: "1f46e-1f3fc", isCanonical: !0 }, ":cop_tone1:": { unicode: ["1f46e-1f3fb"], fname: "1f46e-1f3fb", uc: "1f46e-1f3fb", isCanonical: !0 }, ":woman_tone5:": { unicode: ["1f469-1f3ff"], fname: "1f469-1f3ff", uc: "1f469-1f3ff", isCanonical: !0 }, ":woman_tone4:": { unicode: ["1f469-1f3fe"], fname: "1f469-1f3fe", uc: "1f469-1f3fe", isCanonical: !0 }, ":woman_tone3:": { unicode: ["1f469-1f3fd"], fname: "1f469-1f3fd", uc: "1f469-1f3fd", isCanonical: !0 }, ":woman_tone2:": { unicode: ["1f469-1f3fc"], fname: "1f469-1f3fc", uc: "1f469-1f3fc", isCanonical: !0 }, ":woman_tone1:": { unicode: ["1f469-1f3fb"], fname: "1f469-1f3fb", uc: "1f469-1f3fb", isCanonical: !0 }, ":man_tone5:": { unicode: ["1f468-1f3ff"], fname: "1f468-1f3ff", uc: "1f468-1f3ff", isCanonical: !0 }, ":man_tone4:": { unicode: ["1f468-1f3fe"], fname: "1f468-1f3fe", uc: "1f468-1f3fe", isCanonical: !0 }, ":man_tone3:": { unicode: ["1f468-1f3fd"], fname: "1f468-1f3fd", uc: "1f468-1f3fd", isCanonical: !0 }, ":man_tone2:": { unicode: ["1f468-1f3fc"], fname: "1f468-1f3fc", uc: "1f468-1f3fc", isCanonical: !0 }, ":man_tone1:": { unicode: ["1f468-1f3fb"], fname: "1f468-1f3fb", uc: "1f468-1f3fb", isCanonical: !0 }, ":girl_tone5:": { unicode: ["1f467-1f3ff"], fname: "1f467-1f3ff", uc: "1f467-1f3ff", isCanonical: !0 }, ":girl_tone4:": { unicode: ["1f467-1f3fe"], fname: "1f467-1f3fe", uc: "1f467-1f3fe", isCanonical: !0 }, ":girl_tone3:": { unicode: ["1f467-1f3fd"], fname: "1f467-1f3fd", uc: "1f467-1f3fd", isCanonical: !0 }, ":girl_tone2:": { unicode: ["1f467-1f3fc"], fname: "1f467-1f3fc", uc: "1f467-1f3fc", isCanonical: !0 }, ":girl_tone1:": { unicode: ["1f467-1f3fb"], fname: "1f467-1f3fb", uc: "1f467-1f3fb", isCanonical: !0 }, ":boy_tone5:": { unicode: ["1f466-1f3ff"], fname: "1f466-1f3ff", uc: "1f466-1f3ff", isCanonical: !0 }, ":boy_tone4:": { unicode: ["1f466-1f3fe"], fname: "1f466-1f3fe", uc: "1f466-1f3fe", isCanonical: !0 }, ":boy_tone3:": { unicode: ["1f466-1f3fd"], fname: "1f466-1f3fd", uc: "1f466-1f3fd", isCanonical: !0 }, ":boy_tone2:": { unicode: ["1f466-1f3fc"], fname: "1f466-1f3fc", uc: "1f466-1f3fc", isCanonical: !0 }, ":boy_tone1:": { unicode: ["1f466-1f3fb"], fname: "1f466-1f3fb", uc: "1f466-1f3fb", isCanonical: !0 }, ":open_hands_tone5:": { unicode: ["1f450-1f3ff"], fname: "1f450-1f3ff", uc: "1f450-1f3ff", isCanonical: !0 }, ":open_hands_tone4:": { unicode: ["1f450-1f3fe"], fname: "1f450-1f3fe", uc: "1f450-1f3fe", isCanonical: !0 }, ":open_hands_tone3:": { unicode: ["1f450-1f3fd"], fname: "1f450-1f3fd", uc: "1f450-1f3fd", isCanonical: !0 }, ":open_hands_tone2:": { unicode: ["1f450-1f3fc"], fname: "1f450-1f3fc", uc: "1f450-1f3fc", isCanonical: !0 }, ":open_hands_tone1:": { unicode: ["1f450-1f3fb"], fname: "1f450-1f3fb", uc: "1f450-1f3fb", isCanonical: !0 }, ":clap_tone5:": { unicode: ["1f44f-1f3ff"], fname: "1f44f-1f3ff", uc: "1f44f-1f3ff", isCanonical: !0 }, ":clap_tone4:": { unicode: ["1f44f-1f3fe"], fname: "1f44f-1f3fe", uc: "1f44f-1f3fe", isCanonical: !0 }, ":clap_tone3:": { unicode: ["1f44f-1f3fd"], fname: "1f44f-1f3fd", uc: "1f44f-1f3fd", isCanonical: !0 }, ":clap_tone2:": { unicode: ["1f44f-1f3fc"], fname: "1f44f-1f3fc", uc: "1f44f-1f3fc", isCanonical: !0 }, ":clap_tone1:": { unicode: ["1f44f-1f3fb"], fname: "1f44f-1f3fb", uc: "1f44f-1f3fb", isCanonical: !0 }, ":thumbsdown_tone5:": { unicode: ["1f44e-1f3ff"], fname: "1f44e-1f3ff", uc: "1f44e-1f3ff", isCanonical: !0 }, ":-1_tone5:": { unicode: ["1f44e-1f3ff"], fname: "1f44e-1f3ff", uc: "1f44e-1f3ff", isCanonical: !1 }, ":thumbdown_tone5:": { unicode: ["1f44e-1f3ff"], fname: "1f44e-1f3ff", uc: "1f44e-1f3ff", isCanonical: !1 }, ":thumbsdown_tone4:": { unicode: ["1f44e-1f3fe"], fname: "1f44e-1f3fe", uc: "1f44e-1f3fe", isCanonical: !0 }, ":-1_tone4:": { unicode: ["1f44e-1f3fe"], fname: "1f44e-1f3fe", uc: "1f44e-1f3fe", isCanonical: !1 }, ":thumbdown_tone4:": { unicode: ["1f44e-1f3fe"], fname: "1f44e-1f3fe", uc: "1f44e-1f3fe", isCanonical: !1 }, ":thumbsdown_tone3:": { unicode: ["1f44e-1f3fd"], fname: "1f44e-1f3fd", uc: "1f44e-1f3fd", isCanonical: !0 }, ":-1_tone3:": { unicode: ["1f44e-1f3fd"], fname: "1f44e-1f3fd", uc: "1f44e-1f3fd", isCanonical: !1 }, ":thumbdown_tone3:": { unicode: ["1f44e-1f3fd"], fname: "1f44e-1f3fd", uc: "1f44e-1f3fd", isCanonical: !1 }, ":thumbsdown_tone2:": { unicode: ["1f44e-1f3fc"], fname: "1f44e-1f3fc", uc: "1f44e-1f3fc", isCanonical: !0 }, ":-1_tone2:": { unicode: ["1f44e-1f3fc"], fname: "1f44e-1f3fc", uc: "1f44e-1f3fc", isCanonical: !1 }, ":thumbdown_tone2:": { unicode: ["1f44e-1f3fc"], fname: "1f44e-1f3fc", uc: "1f44e-1f3fc", isCanonical: !1 }, ":thumbsdown_tone1:": { unicode: ["1f44e-1f3fb"], fname: "1f44e-1f3fb", uc: "1f44e-1f3fb", isCanonical: !0 }, ":-1_tone1:": { unicode: ["1f44e-1f3fb"], fname: "1f44e-1f3fb", uc: "1f44e-1f3fb", isCanonical: !1 }, ":thumbdown_tone1:": { unicode: ["1f44e-1f3fb"], fname: "1f44e-1f3fb", uc: "1f44e-1f3fb", isCanonical: !1 }, ":thumbsup_tone5:": { unicode: ["1f44d-1f3ff"], fname: "1f44d-1f3ff", uc: "1f44d-1f3ff", isCanonical: !0 }, ":+1_tone5:": { unicode: ["1f44d-1f3ff"], fname: "1f44d-1f3ff", uc: "1f44d-1f3ff", isCanonical: !1 }, ":thumbup_tone5:": { unicode: ["1f44d-1f3ff"], fname: "1f44d-1f3ff", uc: "1f44d-1f3ff", isCanonical: !1 }, ":thumbsup_tone4:": { unicode: ["1f44d-1f3fe"], fname: "1f44d-1f3fe", uc: "1f44d-1f3fe", isCanonical: !0 }, ":+1_tone4:": { unicode: ["1f44d-1f3fe"], fname: "1f44d-1f3fe", uc: "1f44d-1f3fe", isCanonical: !1 }, ":thumbup_tone4:": { unicode: ["1f44d-1f3fe"], fname: "1f44d-1f3fe", uc: "1f44d-1f3fe", isCanonical: !1 }, ":thumbsup_tone3:": { unicode: ["1f44d-1f3fd"], fname: "1f44d-1f3fd", uc: "1f44d-1f3fd", isCanonical: !0 }, ":+1_tone3:": { unicode: ["1f44d-1f3fd"], fname: "1f44d-1f3fd", uc: "1f44d-1f3fd", isCanonical: !1 }, ":thumbup_tone3:": { unicode: ["1f44d-1f3fd"], fname: "1f44d-1f3fd", uc: "1f44d-1f3fd", isCanonical: !1 }, ":thumbsup_tone2:": { unicode: ["1f44d-1f3fc"], fname: "1f44d-1f3fc", uc: "1f44d-1f3fc", isCanonical: !0 }, ":+1_tone2:": { unicode: ["1f44d-1f3fc"], fname: "1f44d-1f3fc", uc: "1f44d-1f3fc", isCanonical: !1 }, ":thumbup_tone2:": { unicode: ["1f44d-1f3fc"], fname: "1f44d-1f3fc", uc: "1f44d-1f3fc", isCanonical: !1 }, ":thumbsup_tone1:": { unicode: ["1f44d-1f3fb"], fname: "1f44d-1f3fb", uc: "1f44d-1f3fb", isCanonical: !0 }, ":+1_tone1:": { unicode: ["1f44d-1f3fb"], fname: "1f44d-1f3fb", uc: "1f44d-1f3fb", isCanonical: !1 }, ":thumbup_tone1:": { unicode: ["1f44d-1f3fb"], fname: "1f44d-1f3fb", uc: "1f44d-1f3fb", isCanonical: !1 }, ":ok_hand_tone5:": { unicode: ["1f44c-1f3ff"], fname: "1f44c-1f3ff", uc: "1f44c-1f3ff", isCanonical: !0 }, ":ok_hand_tone4:": { unicode: ["1f44c-1f3fe"], fname: "1f44c-1f3fe", uc: "1f44c-1f3fe", isCanonical: !0 }, ":ok_hand_tone3:": { unicode: ["1f44c-1f3fd"], fname: "1f44c-1f3fd", uc: "1f44c-1f3fd", isCanonical: !0 }, ":ok_hand_tone2:": { unicode: ["1f44c-1f3fc"], fname: "1f44c-1f3fc", uc: "1f44c-1f3fc", isCanonical: !0 }, ":ok_hand_tone1:": { unicode: ["1f44c-1f3fb"], fname: "1f44c-1f3fb", uc: "1f44c-1f3fb", isCanonical: !0 }, ":wave_tone5:": { unicode: ["1f44b-1f3ff"], fname: "1f44b-1f3ff", uc: "1f44b-1f3ff", isCanonical: !0 }, ":wave_tone4:": { unicode: ["1f44b-1f3fe"], fname: "1f44b-1f3fe", uc: "1f44b-1f3fe", isCanonical: !0 }, ":wave_tone3:": { unicode: ["1f44b-1f3fd"], fname: "1f44b-1f3fd", uc: "1f44b-1f3fd", isCanonical: !0 }, ":wave_tone2:": { unicode: ["1f44b-1f3fc"], fname: "1f44b-1f3fc", uc: "1f44b-1f3fc", isCanonical: !0 }, ":wave_tone1:": { unicode: ["1f44b-1f3fb"], fname: "1f44b-1f3fb", uc: "1f44b-1f3fb", isCanonical: !0 }, ":punch_tone5:": { unicode: ["1f44a-1f3ff"], fname: "1f44a-1f3ff", uc: "1f44a-1f3ff", isCanonical: !0 }, ":punch_tone4:": { unicode: ["1f44a-1f3fe"], fname: "1f44a-1f3fe", uc: "1f44a-1f3fe", isCanonical: !0 }, ":punch_tone3:": { unicode: ["1f44a-1f3fd"], fname: "1f44a-1f3fd", uc: "1f44a-1f3fd", isCanonical: !0 }, ":punch_tone2:": { unicode: ["1f44a-1f3fc"], fname: "1f44a-1f3fc", uc: "1f44a-1f3fc", isCanonical: !0 }, ":punch_tone1:": { unicode: ["1f44a-1f3fb"], fname: "1f44a-1f3fb", uc: "1f44a-1f3fb", isCanonical: !0 }, ":point_right_tone5:": { unicode: ["1f449-1f3ff"], fname: "1f449-1f3ff", uc: "1f449-1f3ff", isCanonical: !0 }, ":point_right_tone4:": { unicode: ["1f449-1f3fe"], fname: "1f449-1f3fe", uc: "1f449-1f3fe", isCanonical: !0 }, ":point_right_tone3:": { unicode: ["1f449-1f3fd"], fname: "1f449-1f3fd", uc: "1f449-1f3fd", isCanonical: !0 }, ":point_right_tone2:": { unicode: ["1f449-1f3fc"], fname: "1f449-1f3fc", uc: "1f449-1f3fc", isCanonical: !0 }, ":point_right_tone1:": { unicode: ["1f449-1f3fb"], fname: "1f449-1f3fb", uc: "1f449-1f3fb", isCanonical: !0 }, ":point_left_tone5:": { unicode: ["1f448-1f3ff"], fname: "1f448-1f3ff", uc: "1f448-1f3ff", isCanonical: !0 }, ":point_left_tone4:": { unicode: ["1f448-1f3fe"], fname: "1f448-1f3fe", uc: "1f448-1f3fe", isCanonical: !0 }, ":point_left_tone3:": { unicode: ["1f448-1f3fd"], fname: "1f448-1f3fd", uc: "1f448-1f3fd", isCanonical: !0 }, ":point_left_tone2:": { unicode: ["1f448-1f3fc"], fname: "1f448-1f3fc", uc: "1f448-1f3fc", isCanonical: !0 }, ":point_left_tone1:": { unicode: ["1f448-1f3fb"], fname: "1f448-1f3fb", uc: "1f448-1f3fb", isCanonical: !0 }, ":point_down_tone5:": { unicode: ["1f447-1f3ff"], fname: "1f447-1f3ff", uc: "1f447-1f3ff", isCanonical: !0 }, ":point_down_tone4:": { unicode: ["1f447-1f3fe"], fname: "1f447-1f3fe", uc: "1f447-1f3fe", isCanonical: !0 }, ":point_down_tone3:": { unicode: ["1f447-1f3fd"], fname: "1f447-1f3fd", uc: "1f447-1f3fd", isCanonical: !0 }, ":point_down_tone2:": { unicode: ["1f447-1f3fc"], fname: "1f447-1f3fc", uc: "1f447-1f3fc", isCanonical: !0 }, ":point_down_tone1:": { unicode: ["1f447-1f3fb"], fname: "1f447-1f3fb", uc: "1f447-1f3fb", isCanonical: !0 }, ":point_up_2_tone5:": { unicode: ["1f446-1f3ff"], fname: "1f446-1f3ff", uc: "1f446-1f3ff", isCanonical: !0 }, ":point_up_2_tone4:": { unicode: ["1f446-1f3fe"], fname: "1f446-1f3fe", uc: "1f446-1f3fe", isCanonical: !0 }, ":point_up_2_tone3:": { unicode: ["1f446-1f3fd"], fname: "1f446-1f3fd", uc: "1f446-1f3fd", isCanonical: !0 }, ":point_up_2_tone2:": { unicode: ["1f446-1f3fc"], fname: "1f446-1f3fc", uc: "1f446-1f3fc", isCanonical: !0 }, ":point_up_2_tone1:": { unicode: ["1f446-1f3fb"], fname: "1f446-1f3fb", uc: "1f446-1f3fb", isCanonical: !0 }, ":nose_tone5:": { unicode: ["1f443-1f3ff"], fname: "1f443-1f3ff", uc: "1f443-1f3ff", isCanonical: !0 }, ":nose_tone4:": { unicode: ["1f443-1f3fe"], fname: "1f443-1f3fe", uc: "1f443-1f3fe", isCanonical: !0 }, ":nose_tone3:": { unicode: ["1f443-1f3fd"], fname: "1f443-1f3fd", uc: "1f443-1f3fd", isCanonical: !0 }, ":nose_tone2:": { unicode: ["1f443-1f3fc"], fname: "1f443-1f3fc", uc: "1f443-1f3fc", isCanonical: !0 }, ":nose_tone1:": { unicode: ["1f443-1f3fb"], fname: "1f443-1f3fb", uc: "1f443-1f3fb", isCanonical: !0 }, ":ear_tone5:": { unicode: ["1f442-1f3ff"], fname: "1f442-1f3ff", uc: "1f442-1f3ff", isCanonical: !0 }, ":ear_tone4:": { unicode: ["1f442-1f3fe"], fname: "1f442-1f3fe", uc: "1f442-1f3fe", isCanonical: !0 }, ":ear_tone3:": { unicode: ["1f442-1f3fd"], fname: "1f442-1f3fd", uc: "1f442-1f3fd", isCanonical: !0 }, ":ear_tone2:": { unicode: ["1f442-1f3fc"], fname: "1f442-1f3fc", uc: "1f442-1f3fc", isCanonical: !0 }, ":ear_tone1:": { unicode: ["1f442-1f3fb"], fname: "1f442-1f3fb", uc: "1f442-1f3fb", isCanonical: !0 }, ":lifter_tone5:": { unicode: ["1f3cb-1f3ff"], fname: "1f3cb-1f3ff", uc: "1f3cb-1f3ff", isCanonical: !0 }, ":weight_lifter_tone5:": { unicode: ["1f3cb-1f3ff"], fname: "1f3cb-1f3ff", uc: "1f3cb-1f3ff", isCanonical: !1 }, ":lifter_tone4:": { unicode: ["1f3cb-1f3fe"], fname: "1f3cb-1f3fe", uc: "1f3cb-1f3fe", isCanonical: !0 }, ":weight_lifter_tone4:": { unicode: ["1f3cb-1f3fe"], fname: "1f3cb-1f3fe", uc: "1f3cb-1f3fe", isCanonical: !1 }, ":lifter_tone3:": { unicode: ["1f3cb-1f3fd"], fname: "1f3cb-1f3fd", uc: "1f3cb-1f3fd", isCanonical: !0 }, ":weight_lifter_tone3:": { unicode: ["1f3cb-1f3fd"], fname: "1f3cb-1f3fd", uc: "1f3cb-1f3fd", isCanonical: !1 }, ":lifter_tone2:": { unicode: ["1f3cb-1f3fc"], fname: "1f3cb-1f3fc", uc: "1f3cb-1f3fc", isCanonical: !0 }, ":weight_lifter_tone2:": { unicode: ["1f3cb-1f3fc"], fname: "1f3cb-1f3fc", uc: "1f3cb-1f3fc", isCanonical: !1 }, ":lifter_tone1:": { unicode: ["1f3cb-1f3fb"], fname: "1f3cb-1f3fb", uc: "1f3cb-1f3fb", isCanonical: !0 }, ":weight_lifter_tone1:": { unicode: ["1f3cb-1f3fb"], fname: "1f3cb-1f3fb", uc: "1f3cb-1f3fb", isCanonical: !1 }, ":swimmer_tone5:": { unicode: ["1f3ca-1f3ff"], fname: "1f3ca-1f3ff", uc: "1f3ca-1f3ff", isCanonical: !0 }, ":swimmer_tone4:": { unicode: ["1f3ca-1f3fe"], fname: "1f3ca-1f3fe", uc: "1f3ca-1f3fe", isCanonical: !0 }, ":swimmer_tone3:": { unicode: ["1f3ca-1f3fd"], fname: "1f3ca-1f3fd", uc: "1f3ca-1f3fd", isCanonical: !0 }, ":swimmer_tone2:": { unicode: ["1f3ca-1f3fc"], fname: "1f3ca-1f3fc", uc: "1f3ca-1f3fc", isCanonical: !0 }, ":swimmer_tone1:": { unicode: ["1f3ca-1f3fb"], fname: "1f3ca-1f3fb", uc: "1f3ca-1f3fb", isCanonical: !0 }, ":horse_racing_tone5:": { unicode: ["1f3c7-1f3ff"], fname: "1f3c7-1f3ff", uc: "1f3c7-1f3ff", isCanonical: !0 }, ":horse_racing_tone4:": { unicode: ["1f3c7-1f3fe"], fname: "1f3c7-1f3fe", uc: "1f3c7-1f3fe", isCanonical: !0 }, ":horse_racing_tone3:": { unicode: ["1f3c7-1f3fd"], fname: "1f3c7-1f3fd", uc: "1f3c7-1f3fd", isCanonical: !0 }, ":horse_racing_tone2:": { unicode: ["1f3c7-1f3fc"], fname: "1f3c7-1f3fc", uc: "1f3c7-1f3fc", isCanonical: !0 }, ":horse_racing_tone1:": { unicode: ["1f3c7-1f3fb"], fname: "1f3c7-1f3fb", uc: "1f3c7-1f3fb", isCanonical: !0 }, ":surfer_tone5:": { unicode: ["1f3c4-1f3ff"], fname: "1f3c4-1f3ff", uc: "1f3c4-1f3ff", isCanonical: !0 }, ":surfer_tone4:": { unicode: ["1f3c4-1f3fe"], fname: "1f3c4-1f3fe", uc: "1f3c4-1f3fe", isCanonical: !0 }, ":surfer_tone3:": { unicode: ["1f3c4-1f3fd"], fname: "1f3c4-1f3fd", uc: "1f3c4-1f3fd", isCanonical: !0 }, ":surfer_tone2:": { unicode: ["1f3c4-1f3fc"], fname: "1f3c4-1f3fc", uc: "1f3c4-1f3fc", isCanonical: !0 }, ":surfer_tone1:": { unicode: ["1f3c4-1f3fb"], fname: "1f3c4-1f3fb", uc: "1f3c4-1f3fb", isCanonical: !0 }, ":runner_tone5:": { unicode: ["1f3c3-1f3ff"], fname: "1f3c3-1f3ff", uc: "1f3c3-1f3ff", isCanonical: !0 }, ":runner_tone4:": { unicode: ["1f3c3-1f3fe"], fname: "1f3c3-1f3fe", uc: "1f3c3-1f3fe", isCanonical: !0 }, ":runner_tone3:": { unicode: ["1f3c3-1f3fd"], fname: "1f3c3-1f3fd", uc: "1f3c3-1f3fd", isCanonical: !0 }, ":runner_tone2:": { unicode: ["1f3c3-1f3fc"], fname: "1f3c3-1f3fc", uc: "1f3c3-1f3fc", isCanonical: !0 }, ":runner_tone1:": { unicode: ["1f3c3-1f3fb"], fname: "1f3c3-1f3fb", uc: "1f3c3-1f3fb", isCanonical: !0 }, ":santa_tone5:": { unicode: ["1f385-1f3ff"], fname: "1f385-1f3ff", uc: "1f385-1f3ff", isCanonical: !0 }, ":santa_tone4:": { unicode: ["1f385-1f3fe"], fname: "1f385-1f3fe", uc: "1f385-1f3fe", isCanonical: !0 }, ":santa_tone3:": { unicode: ["1f385-1f3fd"], fname: "1f385-1f3fd", uc: "1f385-1f3fd", isCanonical: !0 }, ":santa_tone2:": { unicode: ["1f385-1f3fc"], fname: "1f385-1f3fc", uc: "1f385-1f3fc", isCanonical: !0 }, ":santa_tone1:": { unicode: ["1f385-1f3fb"], fname: "1f385-1f3fb", uc: "1f385-1f3fb", isCanonical: !0 }, ":flag_zw:": { unicode: ["1f1ff-1f1fc"], fname: "1f1ff-1f1fc", uc: "1f1ff-1f1fc", isCanonical: !0 }, ":zw:": { unicode: ["1f1ff-1f1fc"], fname: "1f1ff-1f1fc", uc: "1f1ff-1f1fc", isCanonical: !1 }, ":flag_zm:": { unicode: ["1f1ff-1f1f2"], fname: "1f1ff-1f1f2", uc: "1f1ff-1f1f2", isCanonical: !0 }, ":zm:": { unicode: ["1f1ff-1f1f2"], fname: "1f1ff-1f1f2", uc: "1f1ff-1f1f2", isCanonical: !1 }, ":flag_za:": { unicode: ["1f1ff-1f1e6"], fname: "1f1ff-1f1e6", uc: "1f1ff-1f1e6", isCanonical: !0 }, ":za:": { unicode: ["1f1ff-1f1e6"], fname: "1f1ff-1f1e6", uc: "1f1ff-1f1e6", isCanonical: !1 }, ":flag_yt:": { unicode: ["1f1fe-1f1f9"], fname: "1f1fe-1f1f9", uc: "1f1fe-1f1f9", isCanonical: !0 }, ":yt:": { unicode: ["1f1fe-1f1f9"], fname: "1f1fe-1f1f9", uc: "1f1fe-1f1f9", isCanonical: !1 }, ":flag_ye:": { unicode: ["1f1fe-1f1ea"], fname: "1f1fe-1f1ea", uc: "1f1fe-1f1ea", isCanonical: !0 }, ":ye:": { unicode: ["1f1fe-1f1ea"], fname: "1f1fe-1f1ea", uc: "1f1fe-1f1ea", isCanonical: !1 }, ":flag_xk:": { unicode: ["1f1fd-1f1f0"], fname: "1f1fd-1f1f0", uc: "1f1fd-1f1f0", isCanonical: !0 }, ":xk:": { unicode: ["1f1fd-1f1f0"], fname: "1f1fd-1f1f0", uc: "1f1fd-1f1f0", isCanonical: !1 }, ":flag_ws:": { unicode: ["1f1fc-1f1f8"], fname: "1f1fc-1f1f8", uc: "1f1fc-1f1f8", isCanonical: !0 }, ":ws:": { unicode: ["1f1fc-1f1f8"], fname: "1f1fc-1f1f8", uc: "1f1fc-1f1f8", isCanonical: !1 }, ":flag_wf:": { unicode: ["1f1fc-1f1eb"], fname: "1f1fc-1f1eb", uc: "1f1fc-1f1eb", isCanonical: !0 }, ":wf:": { unicode: ["1f1fc-1f1eb"], fname: "1f1fc-1f1eb", uc: "1f1fc-1f1eb", isCanonical: !1 }, ":flag_vu:": { unicode: ["1f1fb-1f1fa"], fname: "1f1fb-1f1fa", uc: "1f1fb-1f1fa", isCanonical: !0 }, ":vu:": { unicode: ["1f1fb-1f1fa"], fname: "1f1fb-1f1fa", uc: "1f1fb-1f1fa", isCanonical: !1 }, ":flag_vn:": { unicode: ["1f1fb-1f1f3"], fname: "1f1fb-1f1f3", uc: "1f1fb-1f1f3", isCanonical: !0 }, ":vn:": { unicode: ["1f1fb-1f1f3"], fname: "1f1fb-1f1f3", uc: "1f1fb-1f1f3", isCanonical: !1 }, ":flag_vi:": { unicode: ["1f1fb-1f1ee"], fname: "1f1fb-1f1ee", uc: "1f1fb-1f1ee", isCanonical: !0 }, ":vi:": { unicode: ["1f1fb-1f1ee"], fname: "1f1fb-1f1ee", uc: "1f1fb-1f1ee", isCanonical: !1 }, ":flag_vg:": { unicode: ["1f1fb-1f1ec"], fname: "1f1fb-1f1ec", uc: "1f1fb-1f1ec", isCanonical: !0 }, ":vg:": { unicode: ["1f1fb-1f1ec"], fname: "1f1fb-1f1ec", uc: "1f1fb-1f1ec", isCanonical: !1 }, ":flag_ve:": { unicode: ["1f1fb-1f1ea"], fname: "1f1fb-1f1ea", uc: "1f1fb-1f1ea", isCanonical: !0 }, ":ve:": { unicode: ["1f1fb-1f1ea"], fname: "1f1fb-1f1ea", uc: "1f1fb-1f1ea", isCanonical: !1 }, ":flag_vc:": { unicode: ["1f1fb-1f1e8"], fname: "1f1fb-1f1e8", uc: "1f1fb-1f1e8", isCanonical: !0 }, ":vc:": { unicode: ["1f1fb-1f1e8"], fname: "1f1fb-1f1e8", uc: "1f1fb-1f1e8", isCanonical: !1 }, ":flag_va:": { unicode: ["1f1fb-1f1e6"], fname: "1f1fb-1f1e6", uc: "1f1fb-1f1e6", isCanonical: !0 }, ":va:": { unicode: ["1f1fb-1f1e6"], fname: "1f1fb-1f1e6", uc: "1f1fb-1f1e6", isCanonical: !1 }, ":flag_uz:": { unicode: ["1f1fa-1f1ff"], fname: "1f1fa-1f1ff", uc: "1f1fa-1f1ff", isCanonical: !0 }, ":uz:": { unicode: ["1f1fa-1f1ff"], fname: "1f1fa-1f1ff", uc: "1f1fa-1f1ff", isCanonical: !1 }, ":flag_uy:": { unicode: ["1f1fa-1f1fe"], fname: "1f1fa-1f1fe", uc: "1f1fa-1f1fe", isCanonical: !0 }, ":uy:": { unicode: ["1f1fa-1f1fe"], fname: "1f1fa-1f1fe", uc: "1f1fa-1f1fe", isCanonical: !1 }, ":flag_us:": { unicode: ["1f1fa-1f1f8"], fname: "1f1fa-1f1f8", uc: "1f1fa-1f1f8", isCanonical: !0 }, ":us:": { unicode: ["1f1fa-1f1f8"], fname: "1f1fa-1f1f8", uc: "1f1fa-1f1f8", isCanonical: !1 }, ":flag_um:": { unicode: ["1f1fa-1f1f2"], fname: "1f1fa-1f1f2", uc: "1f1fa-1f1f2", isCanonical: !0 }, ":um:": { unicode: ["1f1fa-1f1f2"], fname: "1f1fa-1f1f2", uc: "1f1fa-1f1f2", isCanonical: !1 }, ":flag_ug:": { unicode: ["1f1fa-1f1ec"], fname: "1f1fa-1f1ec", uc: "1f1fa-1f1ec", isCanonical: !0 }, ":ug:": { unicode: ["1f1fa-1f1ec"], fname: "1f1fa-1f1ec", uc: "1f1fa-1f1ec", isCanonical: !1 }, ":flag_ua:": { unicode: ["1f1fa-1f1e6"], fname: "1f1fa-1f1e6", uc: "1f1fa-1f1e6", isCanonical: !0 }, ":ua:": { unicode: ["1f1fa-1f1e6"], fname: "1f1fa-1f1e6", uc: "1f1fa-1f1e6", isCanonical: !1 }, ":flag_tz:": { unicode: ["1f1f9-1f1ff"], fname: "1f1f9-1f1ff", uc: "1f1f9-1f1ff", isCanonical: !0 }, ":tz:": { unicode: ["1f1f9-1f1ff"], fname: "1f1f9-1f1ff", uc: "1f1f9-1f1ff", isCanonical: !1 }, ":flag_tw:": { unicode: ["1f1f9-1f1fc"], fname: "1f1f9-1f1fc", uc: "1f1f9-1f1fc", isCanonical: !0 }, ":tw:": { unicode: ["1f1f9-1f1fc"], fname: "1f1f9-1f1fc", uc: "1f1f9-1f1fc", isCanonical: !1 }, ":flag_tv:": { unicode: ["1f1f9-1f1fb"], fname: "1f1f9-1f1fb", uc: "1f1f9-1f1fb", isCanonical: !0 }, ":tuvalu:": { unicode: ["1f1f9-1f1fb"], fname: "1f1f9-1f1fb", uc: "1f1f9-1f1fb", isCanonical: !1 }, ":flag_tt:": { unicode: ["1f1f9-1f1f9"], fname: "1f1f9-1f1f9", uc: "1f1f9-1f1f9", isCanonical: !0 }, ":tt:": { unicode: ["1f1f9-1f1f9"], fname: "1f1f9-1f1f9", uc: "1f1f9-1f1f9", isCanonical: !1 }, ":flag_tr:": { unicode: ["1f1f9-1f1f7"], fname: "1f1f9-1f1f7", uc: "1f1f9-1f1f7", isCanonical: !0 }, ":tr:": { unicode: ["1f1f9-1f1f7"], fname: "1f1f9-1f1f7", uc: "1f1f9-1f1f7", isCanonical: !1 }, ":flag_to:": { unicode: ["1f1f9-1f1f4"], fname: "1f1f9-1f1f4", uc: "1f1f9-1f1f4", isCanonical: !0 }, ":to:": { unicode: ["1f1f9-1f1f4"], fname: "1f1f9-1f1f4", uc: "1f1f9-1f1f4", isCanonical: !1 }, ":flag_tn:": { unicode: ["1f1f9-1f1f3"], fname: "1f1f9-1f1f3", uc: "1f1f9-1f1f3", isCanonical: !0 }, ":tn:": { unicode: ["1f1f9-1f1f3"], fname: "1f1f9-1f1f3", uc: "1f1f9-1f1f3", isCanonical: !1 }, ":flag_tm:": { unicode: ["1f1f9-1f1f2"], fname: "1f1f9-1f1f2", uc: "1f1f9-1f1f2", isCanonical: !0 }, ":turkmenistan:": { unicode: ["1f1f9-1f1f2"], fname: "1f1f9-1f1f2", uc: "1f1f9-1f1f2", isCanonical: !1 }, ":flag_tl:": { unicode: ["1f1f9-1f1f1"], fname: "1f1f9-1f1f1", uc: "1f1f9-1f1f1", isCanonical: !0 }, ":tl:": { unicode: ["1f1f9-1f1f1"], fname: "1f1f9-1f1f1", uc: "1f1f9-1f1f1", isCanonical: !1 }, ":flag_tk:": { unicode: ["1f1f9-1f1f0"], fname: "1f1f9-1f1f0", uc: "1f1f9-1f1f0", isCanonical: !0 }, ":tk:": { unicode: ["1f1f9-1f1f0"], fname: "1f1f9-1f1f0", uc: "1f1f9-1f1f0", isCanonical: !1 }, ":flag_tj:": { unicode: ["1f1f9-1f1ef"], fname: "1f1f9-1f1ef", uc: "1f1f9-1f1ef", isCanonical: !0 }, ":tj:": { unicode: ["1f1f9-1f1ef"], fname: "1f1f9-1f1ef", uc: "1f1f9-1f1ef", isCanonical: !1 }, ":flag_th:": { unicode: ["1f1f9-1f1ed"], fname: "1f1f9-1f1ed", uc: "1f1f9-1f1ed", isCanonical: !0 }, ":th:": { unicode: ["1f1f9-1f1ed"], fname: "1f1f9-1f1ed", uc: "1f1f9-1f1ed", isCanonical: !1 }, ":flag_tg:": { unicode: ["1f1f9-1f1ec"], fname: "1f1f9-1f1ec", uc: "1f1f9-1f1ec", isCanonical: !0 }, ":tg:": { unicode: ["1f1f9-1f1ec"], fname: "1f1f9-1f1ec", uc: "1f1f9-1f1ec", isCanonical: !1 }, ":flag_tf:": { unicode: ["1f1f9-1f1eb"], fname: "1f1f9-1f1eb", uc: "1f1f9-1f1eb", isCanonical: !0 }, ":tf:": { unicode: ["1f1f9-1f1eb"], fname: "1f1f9-1f1eb", uc: "1f1f9-1f1eb", isCanonical: !1 }, ":flag_td:": { unicode: ["1f1f9-1f1e9"], fname: "1f1f9-1f1e9", uc: "1f1f9-1f1e9", isCanonical: !0 }, ":td:": { unicode: ["1f1f9-1f1e9"], fname: "1f1f9-1f1e9", uc: "1f1f9-1f1e9", isCanonical: !1 }, ":flag_tc:": { unicode: ["1f1f9-1f1e8"], fname: "1f1f9-1f1e8", uc: "1f1f9-1f1e8", isCanonical: !0 }, ":tc:": { unicode: ["1f1f9-1f1e8"], fname: "1f1f9-1f1e8", uc: "1f1f9-1f1e8", isCanonical: !1 }, ":flag_ta:": { unicode: ["1f1f9-1f1e6"], fname: "1f1f9-1f1e6", uc: "1f1f9-1f1e6", isCanonical: !0 }, ":ta:": { unicode: ["1f1f9-1f1e6"], fname: "1f1f9-1f1e6", uc: "1f1f9-1f1e6", isCanonical: !1 }, ":flag_sz:": { unicode: ["1f1f8-1f1ff"], fname: "1f1f8-1f1ff", uc: "1f1f8-1f1ff", isCanonical: !0 }, ":sz:": { unicode: ["1f1f8-1f1ff"], fname: "1f1f8-1f1ff", uc: "1f1f8-1f1ff", isCanonical: !1 }, ":flag_sy:": { unicode: ["1f1f8-1f1fe"], fname: "1f1f8-1f1fe", uc: "1f1f8-1f1fe", isCanonical: !0 }, ":sy:": { unicode: ["1f1f8-1f1fe"], fname: "1f1f8-1f1fe", uc: "1f1f8-1f1fe", isCanonical: !1 }, ":flag_sx:": { unicode: ["1f1f8-1f1fd"], fname: "1f1f8-1f1fd", uc: "1f1f8-1f1fd", isCanonical: !0
    }, ":sx:": { unicode: ["1f1f8-1f1fd"], fname: "1f1f8-1f1fd", uc: "1f1f8-1f1fd", isCanonical: !1 }, ":flag_sv:": { unicode: ["1f1f8-1f1fb"], fname: "1f1f8-1f1fb", uc: "1f1f8-1f1fb", isCanonical: !0 }, ":sv:": { unicode: ["1f1f8-1f1fb"], fname: "1f1f8-1f1fb", uc: "1f1f8-1f1fb", isCanonical: !1 }, ":flag_st:": { unicode: ["1f1f8-1f1f9"], fname: "1f1f8-1f1f9", uc: "1f1f8-1f1f9", isCanonical: !0 }, ":st:": { unicode: ["1f1f8-1f1f9"], fname: "1f1f8-1f1f9", uc: "1f1f8-1f1f9", isCanonical: !1 }, ":flag_ss:": { unicode: ["1f1f8-1f1f8"], fname: "1f1f8-1f1f8", uc: "1f1f8-1f1f8", isCanonical: !0 }, ":ss:": { unicode: ["1f1f8-1f1f8"], fname: "1f1f8-1f1f8", uc: "1f1f8-1f1f8", isCanonical: !1 }, ":flag_sr:": { unicode: ["1f1f8-1f1f7"], fname: "1f1f8-1f1f7", uc: "1f1f8-1f1f7", isCanonical: !0 }, ":sr:": { unicode: ["1f1f8-1f1f7"], fname: "1f1f8-1f1f7", uc: "1f1f8-1f1f7", isCanonical: !1 }, ":flag_so:": { unicode: ["1f1f8-1f1f4"], fname: "1f1f8-1f1f4", uc: "1f1f8-1f1f4", isCanonical: !0 }, ":so:": { unicode: ["1f1f8-1f1f4"], fname: "1f1f8-1f1f4", uc: "1f1f8-1f1f4", isCanonical: !1 }, ":flag_sn:": { unicode: ["1f1f8-1f1f3"], fname: "1f1f8-1f1f3", uc: "1f1f8-1f1f3", isCanonical: !0 }, ":sn:": { unicode: ["1f1f8-1f1f3"], fname: "1f1f8-1f1f3", uc: "1f1f8-1f1f3", isCanonical: !1 }, ":flag_sm:": { unicode: ["1f1f8-1f1f2"], fname: "1f1f8-1f1f2", uc: "1f1f8-1f1f2", isCanonical: !0 }, ":sm:": { unicode: ["1f1f8-1f1f2"], fname: "1f1f8-1f1f2", uc: "1f1f8-1f1f2", isCanonical: !1 }, ":flag_sl:": { unicode: ["1f1f8-1f1f1"], fname: "1f1f8-1f1f1", uc: "1f1f8-1f1f1", isCanonical: !0 }, ":sl:": { unicode: ["1f1f8-1f1f1"], fname: "1f1f8-1f1f1", uc: "1f1f8-1f1f1", isCanonical: !1 }, ":flag_sk:": { unicode: ["1f1f8-1f1f0"], fname: "1f1f8-1f1f0", uc: "1f1f8-1f1f0", isCanonical: !0 }, ":sk:": { unicode: ["1f1f8-1f1f0"], fname: "1f1f8-1f1f0", uc: "1f1f8-1f1f0", isCanonical: !1 }, ":flag_sj:": { unicode: ["1f1f8-1f1ef"], fname: "1f1f8-1f1ef", uc: "1f1f8-1f1ef", isCanonical: !0 }, ":sj:": { unicode: ["1f1f8-1f1ef"], fname: "1f1f8-1f1ef", uc: "1f1f8-1f1ef", isCanonical: !1 }, ":flag_si:": { unicode: ["1f1f8-1f1ee"], fname: "1f1f8-1f1ee", uc: "1f1f8-1f1ee", isCanonical: !0 }, ":si:": { unicode: ["1f1f8-1f1ee"], fname: "1f1f8-1f1ee", uc: "1f1f8-1f1ee", isCanonical: !1 }, ":flag_sh:": { unicode: ["1f1f8-1f1ed"], fname: "1f1f8-1f1ed", uc: "1f1f8-1f1ed", isCanonical: !0 }, ":sh:": { unicode: ["1f1f8-1f1ed"], fname: "1f1f8-1f1ed", uc: "1f1f8-1f1ed", isCanonical: !1 }, ":flag_sg:": { unicode: ["1f1f8-1f1ec"], fname: "1f1f8-1f1ec", uc: "1f1f8-1f1ec", isCanonical: !0 }, ":sg:": { unicode: ["1f1f8-1f1ec"], fname: "1f1f8-1f1ec", uc: "1f1f8-1f1ec", isCanonical: !1 }, ":flag_se:": { unicode: ["1f1f8-1f1ea"], fname: "1f1f8-1f1ea", uc: "1f1f8-1f1ea", isCanonical: !0 }, ":se:": { unicode: ["1f1f8-1f1ea"], fname: "1f1f8-1f1ea", uc: "1f1f8-1f1ea", isCanonical: !1 }, ":flag_sd:": { unicode: ["1f1f8-1f1e9"], fname: "1f1f8-1f1e9", uc: "1f1f8-1f1e9", isCanonical: !0 }, ":sd:": { unicode: ["1f1f8-1f1e9"], fname: "1f1f8-1f1e9", uc: "1f1f8-1f1e9", isCanonical: !1 }, ":flag_sc:": { unicode: ["1f1f8-1f1e8"], fname: "1f1f8-1f1e8", uc: "1f1f8-1f1e8", isCanonical: !0 }, ":sc:": { unicode: ["1f1f8-1f1e8"], fname: "1f1f8-1f1e8", uc: "1f1f8-1f1e8", isCanonical: !1 }, ":flag_sb:": { unicode: ["1f1f8-1f1e7"], fname: "1f1f8-1f1e7", uc: "1f1f8-1f1e7", isCanonical: !0 }, ":sb:": { unicode: ["1f1f8-1f1e7"], fname: "1f1f8-1f1e7", uc: "1f1f8-1f1e7", isCanonical: !1 }, ":flag_sa:": { unicode: ["1f1f8-1f1e6"], fname: "1f1f8-1f1e6", uc: "1f1f8-1f1e6", isCanonical: !0 }, ":saudiarabia:": { unicode: ["1f1f8-1f1e6"], fname: "1f1f8-1f1e6", uc: "1f1f8-1f1e6", isCanonical: !1 }, ":saudi:": { unicode: ["1f1f8-1f1e6"], fname: "1f1f8-1f1e6", uc: "1f1f8-1f1e6", isCanonical: !1 }, ":flag_rw:": { unicode: ["1f1f7-1f1fc"], fname: "1f1f7-1f1fc", uc: "1f1f7-1f1fc", isCanonical: !0 }, ":rw:": { unicode: ["1f1f7-1f1fc"], fname: "1f1f7-1f1fc", uc: "1f1f7-1f1fc", isCanonical: !1 }, ":flag_ru:": { unicode: ["1f1f7-1f1fa"], fname: "1f1f7-1f1fa", uc: "1f1f7-1f1fa", isCanonical: !0 }, ":ru:": { unicode: ["1f1f7-1f1fa"], fname: "1f1f7-1f1fa", uc: "1f1f7-1f1fa", isCanonical: !1 }, ":flag_rs:": { unicode: ["1f1f7-1f1f8"], fname: "1f1f7-1f1f8", uc: "1f1f7-1f1f8", isCanonical: !0 }, ":rs:": { unicode: ["1f1f7-1f1f8"], fname: "1f1f7-1f1f8", uc: "1f1f7-1f1f8", isCanonical: !1 }, ":flag_ro:": { unicode: ["1f1f7-1f1f4"], fname: "1f1f7-1f1f4", uc: "1f1f7-1f1f4", isCanonical: !0 }, ":ro:": { unicode: ["1f1f7-1f1f4"], fname: "1f1f7-1f1f4", uc: "1f1f7-1f1f4", isCanonical: !1 }, ":flag_re:": { unicode: ["1f1f7-1f1ea"], fname: "1f1f7-1f1ea", uc: "1f1f7-1f1ea", isCanonical: !0 }, ":re:": { unicode: ["1f1f7-1f1ea"], fname: "1f1f7-1f1ea", uc: "1f1f7-1f1ea", isCanonical: !1 }, ":flag_qa:": { unicode: ["1f1f6-1f1e6"], fname: "1f1f6-1f1e6", uc: "1f1f6-1f1e6", isCanonical: !0 }, ":qa:": { unicode: ["1f1f6-1f1e6"], fname: "1f1f6-1f1e6", uc: "1f1f6-1f1e6", isCanonical: !1 }, ":flag_py:": { unicode: ["1f1f5-1f1fe"], fname: "1f1f5-1f1fe", uc: "1f1f5-1f1fe", isCanonical: !0 }, ":py:": { unicode: ["1f1f5-1f1fe"], fname: "1f1f5-1f1fe", uc: "1f1f5-1f1fe", isCanonical: !1 }, ":flag_pw:": { unicode: ["1f1f5-1f1fc"], fname: "1f1f5-1f1fc", uc: "1f1f5-1f1fc", isCanonical: !0 }, ":pw:": { unicode: ["1f1f5-1f1fc"], fname: "1f1f5-1f1fc", uc: "1f1f5-1f1fc", isCanonical: !1 }, ":flag_pt:": { unicode: ["1f1f5-1f1f9"], fname: "1f1f5-1f1f9", uc: "1f1f5-1f1f9", isCanonical: !0 }, ":pt:": { unicode: ["1f1f5-1f1f9"], fname: "1f1f5-1f1f9", uc: "1f1f5-1f1f9", isCanonical: !1 }, ":flag_ps:": { unicode: ["1f1f5-1f1f8"], fname: "1f1f5-1f1f8", uc: "1f1f5-1f1f8", isCanonical: !0 }, ":ps:": { unicode: ["1f1f5-1f1f8"], fname: "1f1f5-1f1f8", uc: "1f1f5-1f1f8", isCanonical: !1 }, ":flag_pr:": { unicode: ["1f1f5-1f1f7"], fname: "1f1f5-1f1f7", uc: "1f1f5-1f1f7", isCanonical: !0 }, ":pr:": { unicode: ["1f1f5-1f1f7"], fname: "1f1f5-1f1f7", uc: "1f1f5-1f1f7", isCanonical: !1 }, ":flag_pn:": { unicode: ["1f1f5-1f1f3"], fname: "1f1f5-1f1f3", uc: "1f1f5-1f1f3", isCanonical: !0 }, ":pn:": { unicode: ["1f1f5-1f1f3"], fname: "1f1f5-1f1f3", uc: "1f1f5-1f1f3", isCanonical: !1 }, ":flag_pm:": { unicode: ["1f1f5-1f1f2"], fname: "1f1f5-1f1f2", uc: "1f1f5-1f1f2", isCanonical: !0 }, ":pm:": { unicode: ["1f1f5-1f1f2"], fname: "1f1f5-1f1f2", uc: "1f1f5-1f1f2", isCanonical: !1 }, ":flag_pl:": { unicode: ["1f1f5-1f1f1"], fname: "1f1f5-1f1f1", uc: "1f1f5-1f1f1", isCanonical: !0 }, ":pl:": { unicode: ["1f1f5-1f1f1"], fname: "1f1f5-1f1f1", uc: "1f1f5-1f1f1", isCanonical: !1 }, ":flag_pk:": { unicode: ["1f1f5-1f1f0"], fname: "1f1f5-1f1f0", uc: "1f1f5-1f1f0", isCanonical: !0 }, ":pk:": { unicode: ["1f1f5-1f1f0"], fname: "1f1f5-1f1f0", uc: "1f1f5-1f1f0", isCanonical: !1 }, ":flag_ph:": { unicode: ["1f1f5-1f1ed"], fname: "1f1f5-1f1ed", uc: "1f1f5-1f1ed", isCanonical: !0 }, ":ph:": { unicode: ["1f1f5-1f1ed"], fname: "1f1f5-1f1ed", uc: "1f1f5-1f1ed", isCanonical: !1 }, ":flag_pg:": { unicode: ["1f1f5-1f1ec"], fname: "1f1f5-1f1ec", uc: "1f1f5-1f1ec", isCanonical: !0 }, ":pg:": { unicode: ["1f1f5-1f1ec"], fname: "1f1f5-1f1ec", uc: "1f1f5-1f1ec", isCanonical: !1 }, ":flag_pf:": { unicode: ["1f1f5-1f1eb"], fname: "1f1f5-1f1eb", uc: "1f1f5-1f1eb", isCanonical: !0 }, ":pf:": { unicode: ["1f1f5-1f1eb"], fname: "1f1f5-1f1eb", uc: "1f1f5-1f1eb", isCanonical: !1 }, ":flag_pe:": { unicode: ["1f1f5-1f1ea"], fname: "1f1f5-1f1ea", uc: "1f1f5-1f1ea", isCanonical: !0 }, ":pe:": { unicode: ["1f1f5-1f1ea"], fname: "1f1f5-1f1ea", uc: "1f1f5-1f1ea", isCanonical: !1 }, ":flag_pa:": { unicode: ["1f1f5-1f1e6"], fname: "1f1f5-1f1e6", uc: "1f1f5-1f1e6", isCanonical: !0 }, ":pa:": { unicode: ["1f1f5-1f1e6"], fname: "1f1f5-1f1e6", uc: "1f1f5-1f1e6", isCanonical: !1 }, ":flag_om:": { unicode: ["1f1f4-1f1f2"], fname: "1f1f4-1f1f2", uc: "1f1f4-1f1f2", isCanonical: !0 }, ":om:": { unicode: ["1f1f4-1f1f2"], fname: "1f1f4-1f1f2", uc: "1f1f4-1f1f2", isCanonical: !1 }, ":flag_nz:": { unicode: ["1f1f3-1f1ff"], fname: "1f1f3-1f1ff", uc: "1f1f3-1f1ff", isCanonical: !0 }, ":nz:": { unicode: ["1f1f3-1f1ff"], fname: "1f1f3-1f1ff", uc: "1f1f3-1f1ff", isCanonical: !1 }, ":flag_nu:": { unicode: ["1f1f3-1f1fa"], fname: "1f1f3-1f1fa", uc: "1f1f3-1f1fa", isCanonical: !0 }, ":nu:": { unicode: ["1f1f3-1f1fa"], fname: "1f1f3-1f1fa", uc: "1f1f3-1f1fa", isCanonical: !1 }, ":flag_nr:": { unicode: ["1f1f3-1f1f7"], fname: "1f1f3-1f1f7", uc: "1f1f3-1f1f7", isCanonical: !0 }, ":nr:": { unicode: ["1f1f3-1f1f7"], fname: "1f1f3-1f1f7", uc: "1f1f3-1f1f7", isCanonical: !1 }, ":flag_np:": { unicode: ["1f1f3-1f1f5"], fname: "1f1f3-1f1f5", uc: "1f1f3-1f1f5", isCanonical: !0 }, ":np:": { unicode: ["1f1f3-1f1f5"], fname: "1f1f3-1f1f5", uc: "1f1f3-1f1f5", isCanonical: !1 }, ":flag_no:": { unicode: ["1f1f3-1f1f4"], fname: "1f1f3-1f1f4", uc: "1f1f3-1f1f4", isCanonical: !0 }, ":no:": { unicode: ["1f1f3-1f1f4"], fname: "1f1f3-1f1f4", uc: "1f1f3-1f1f4", isCanonical: !1 }, ":flag_nl:": { unicode: ["1f1f3-1f1f1"], fname: "1f1f3-1f1f1", uc: "1f1f3-1f1f1", isCanonical: !0 }, ":nl:": { unicode: ["1f1f3-1f1f1"], fname: "1f1f3-1f1f1", uc: "1f1f3-1f1f1", isCanonical: !1 }, ":flag_ni:": { unicode: ["1f1f3-1f1ee"], fname: "1f1f3-1f1ee", uc: "1f1f3-1f1ee", isCanonical: !0 }, ":ni:": { unicode: ["1f1f3-1f1ee"], fname: "1f1f3-1f1ee", uc: "1f1f3-1f1ee", isCanonical: !1 }, ":flag_ng:": { unicode: ["1f1f3-1f1ec"], fname: "1f1f3-1f1ec", uc: "1f1f3-1f1ec", isCanonical: !0 }, ":nigeria:": { unicode: ["1f1f3-1f1ec"], fname: "1f1f3-1f1ec", uc: "1f1f3-1f1ec", isCanonical: !1 }, ":flag_nf:": { unicode: ["1f1f3-1f1eb"], fname: "1f1f3-1f1eb", uc: "1f1f3-1f1eb", isCanonical: !0 }, ":nf:": { unicode: ["1f1f3-1f1eb"], fname: "1f1f3-1f1eb", uc: "1f1f3-1f1eb", isCanonical: !1 }, ":flag_ne:": { unicode: ["1f1f3-1f1ea"], fname: "1f1f3-1f1ea", uc: "1f1f3-1f1ea", isCanonical: !0 }, ":ne:": { unicode: ["1f1f3-1f1ea"], fname: "1f1f3-1f1ea", uc: "1f1f3-1f1ea", isCanonical: !1 }, ":flag_nc:": { unicode: ["1f1f3-1f1e8"], fname: "1f1f3-1f1e8", uc: "1f1f3-1f1e8", isCanonical: !0 }, ":nc:": { unicode: ["1f1f3-1f1e8"], fname: "1f1f3-1f1e8", uc: "1f1f3-1f1e8", isCanonical: !1 }, ":flag_na:": { unicode: ["1f1f3-1f1e6"], fname: "1f1f3-1f1e6", uc: "1f1f3-1f1e6", isCanonical: !0 }, ":na:": { unicode: ["1f1f3-1f1e6"], fname: "1f1f3-1f1e6", uc: "1f1f3-1f1e6", isCanonical: !1 }, ":flag_mz:": { unicode: ["1f1f2-1f1ff"], fname: "1f1f2-1f1ff", uc: "1f1f2-1f1ff", isCanonical: !0 }, ":mz:": { unicode: ["1f1f2-1f1ff"], fname: "1f1f2-1f1ff", uc: "1f1f2-1f1ff", isCanonical: !1 }, ":flag_my:": { unicode: ["1f1f2-1f1fe"], fname: "1f1f2-1f1fe", uc: "1f1f2-1f1fe", isCanonical: !0 }, ":my:": { unicode: ["1f1f2-1f1fe"], fname: "1f1f2-1f1fe", uc: "1f1f2-1f1fe", isCanonical: !1 }, ":flag_mx:": { unicode: ["1f1f2-1f1fd"], fname: "1f1f2-1f1fd", uc: "1f1f2-1f1fd", isCanonical: !0 }, ":mx:": { unicode: ["1f1f2-1f1fd"], fname: "1f1f2-1f1fd", uc: "1f1f2-1f1fd", isCanonical: !1 }, ":flag_mw:": { unicode: ["1f1f2-1f1fc"], fname: "1f1f2-1f1fc", uc: "1f1f2-1f1fc", isCanonical: !0 }, ":mw:": { unicode: ["1f1f2-1f1fc"], fname: "1f1f2-1f1fc", uc: "1f1f2-1f1fc", isCanonical: !1 }, ":flag_mv:": { unicode: ["1f1f2-1f1fb"], fname: "1f1f2-1f1fb", uc: "1f1f2-1f1fb", isCanonical: !0 }, ":mv:": { unicode: ["1f1f2-1f1fb"], fname: "1f1f2-1f1fb", uc: "1f1f2-1f1fb", isCanonical: !1 }, ":flag_mu:": { unicode: ["1f1f2-1f1fa"], fname: "1f1f2-1f1fa", uc: "1f1f2-1f1fa", isCanonical: !0 }, ":mu:": { unicode: ["1f1f2-1f1fa"], fname: "1f1f2-1f1fa", uc: "1f1f2-1f1fa", isCanonical: !1 }, ":flag_mt:": { unicode: ["1f1f2-1f1f9"], fname: "1f1f2-1f1f9", uc: "1f1f2-1f1f9", isCanonical: !0 }, ":mt:": { unicode: ["1f1f2-1f1f9"], fname: "1f1f2-1f1f9", uc: "1f1f2-1f1f9", isCanonical: !1 }, ":flag_ms:": { unicode: ["1f1f2-1f1f8"], fname: "1f1f2-1f1f8", uc: "1f1f2-1f1f8", isCanonical: !0 }, ":ms:": { unicode: ["1f1f2-1f1f8"], fname: "1f1f2-1f1f8", uc: "1f1f2-1f1f8", isCanonical: !1 }, ":flag_mr:": { unicode: ["1f1f2-1f1f7"], fname: "1f1f2-1f1f7", uc: "1f1f2-1f1f7", isCanonical: !0 }, ":mr:": { unicode: ["1f1f2-1f1f7"], fname: "1f1f2-1f1f7", uc: "1f1f2-1f1f7", isCanonical: !1 }, ":flag_mq:": { unicode: ["1f1f2-1f1f6"], fname: "1f1f2-1f1f6", uc: "1f1f2-1f1f6", isCanonical: !0 }, ":mq:": { unicode: ["1f1f2-1f1f6"], fname: "1f1f2-1f1f6", uc: "1f1f2-1f1f6", isCanonical: !1 }, ":flag_mp:": { unicode: ["1f1f2-1f1f5"], fname: "1f1f2-1f1f5", uc: "1f1f2-1f1f5", isCanonical: !0 }, ":mp:": { unicode: ["1f1f2-1f1f5"], fname: "1f1f2-1f1f5", uc: "1f1f2-1f1f5", isCanonical: !1 }, ":flag_mo:": { unicode: ["1f1f2-1f1f4"], fname: "1f1f2-1f1f4", uc: "1f1f2-1f1f4", isCanonical: !0 }, ":mo:": { unicode: ["1f1f2-1f1f4"], fname: "1f1f2-1f1f4", uc: "1f1f2-1f1f4", isCanonical: !1 }, ":flag_mn:": { unicode: ["1f1f2-1f1f3"], fname: "1f1f2-1f1f3", uc: "1f1f2-1f1f3", isCanonical: !0 }, ":mn:": { unicode: ["1f1f2-1f1f3"], fname: "1f1f2-1f1f3", uc: "1f1f2-1f1f3", isCanonical: !1 }, ":flag_mm:": { unicode: ["1f1f2-1f1f2"], fname: "1f1f2-1f1f2", uc: "1f1f2-1f1f2", isCanonical: !0 }, ":mm:": { unicode: ["1f1f2-1f1f2"], fname: "1f1f2-1f1f2", uc: "1f1f2-1f1f2", isCanonical: !1 }, ":flag_ml:": { unicode: ["1f1f2-1f1f1"], fname: "1f1f2-1f1f1", uc: "1f1f2-1f1f1", isCanonical: !0 }, ":ml:": { unicode: ["1f1f2-1f1f1"], fname: "1f1f2-1f1f1", uc: "1f1f2-1f1f1", isCanonical: !1 }, ":flag_mk:": { unicode: ["1f1f2-1f1f0"], fname: "1f1f2-1f1f0", uc: "1f1f2-1f1f0", isCanonical: !0 }, ":mk:": { unicode: ["1f1f2-1f1f0"], fname: "1f1f2-1f1f0", uc: "1f1f2-1f1f0", isCanonical: !1 }, ":flag_mh:": { unicode: ["1f1f2-1f1ed"], fname: "1f1f2-1f1ed", uc: "1f1f2-1f1ed", isCanonical: !0 }, ":mh:": { unicode: ["1f1f2-1f1ed"], fname: "1f1f2-1f1ed", uc: "1f1f2-1f1ed", isCanonical: !1 }, ":flag_mg:": { unicode: ["1f1f2-1f1ec"], fname: "1f1f2-1f1ec", uc: "1f1f2-1f1ec", isCanonical: !0 }, ":mg:": { unicode: ["1f1f2-1f1ec"], fname: "1f1f2-1f1ec", uc: "1f1f2-1f1ec", isCanonical: !1 }, ":flag_mf:": { unicode: ["1f1f2-1f1eb"], fname: "1f1f2-1f1eb", uc: "1f1f2-1f1eb", isCanonical: !0 }, ":mf:": { unicode: ["1f1f2-1f1eb"], fname: "1f1f2-1f1eb", uc: "1f1f2-1f1eb", isCanonical: !1 }, ":flag_me:": { unicode: ["1f1f2-1f1ea"], fname: "1f1f2-1f1ea", uc: "1f1f2-1f1ea", isCanonical: !0 }, ":me:": { unicode: ["1f1f2-1f1ea"], fname: "1f1f2-1f1ea", uc: "1f1f2-1f1ea", isCanonical: !1 }, ":flag_md:": { unicode: ["1f1f2-1f1e9"], fname: "1f1f2-1f1e9", uc: "1f1f2-1f1e9", isCanonical: !0 }, ":md:": { unicode: ["1f1f2-1f1e9"], fname: "1f1f2-1f1e9", uc: "1f1f2-1f1e9", isCanonical: !1 }, ":flag_mc:": { unicode: ["1f1f2-1f1e8"], fname: "1f1f2-1f1e8", uc: "1f1f2-1f1e8", isCanonical: !0 }, ":mc:": { unicode: ["1f1f2-1f1e8"], fname: "1f1f2-1f1e8", uc: "1f1f2-1f1e8", isCanonical: !1 }, ":flag_ma:": { unicode: ["1f1f2-1f1e6"], fname: "1f1f2-1f1e6", uc: "1f1f2-1f1e6", isCanonical: !0 }, ":ma:": { unicode: ["1f1f2-1f1e6"], fname: "1f1f2-1f1e6", uc: "1f1f2-1f1e6", isCanonical: !1 }, ":flag_ly:": { unicode: ["1f1f1-1f1fe"], fname: "1f1f1-1f1fe", uc: "1f1f1-1f1fe", isCanonical: !0 }, ":ly:": { unicode: ["1f1f1-1f1fe"], fname: "1f1f1-1f1fe", uc: "1f1f1-1f1fe", isCanonical: !1 }, ":flag_lv:": { unicode: ["1f1f1-1f1fb"], fname: "1f1f1-1f1fb", uc: "1f1f1-1f1fb", isCanonical: !0 }, ":lv:": { unicode: ["1f1f1-1f1fb"], fname: "1f1f1-1f1fb", uc: "1f1f1-1f1fb", isCanonical: !1 }, ":flag_lu:": { unicode: ["1f1f1-1f1fa"], fname: "1f1f1-1f1fa", uc: "1f1f1-1f1fa", isCanonical: !0 }, ":lu:": { unicode: ["1f1f1-1f1fa"], fname: "1f1f1-1f1fa", uc: "1f1f1-1f1fa", isCanonical: !1 }, ":flag_lt:": { unicode: ["1f1f1-1f1f9"], fname: "1f1f1-1f1f9", uc: "1f1f1-1f1f9", isCanonical: !0 }, ":lt:": { unicode: ["1f1f1-1f1f9"], fname: "1f1f1-1f1f9", uc: "1f1f1-1f1f9", isCanonical: !1 }, ":flag_ls:": { unicode: ["1f1f1-1f1f8"], fname: "1f1f1-1f1f8", uc: "1f1f1-1f1f8", isCanonical: !0 }, ":ls:": { unicode: ["1f1f1-1f1f8"], fname: "1f1f1-1f1f8", uc: "1f1f1-1f1f8", isCanonical: !1 }, ":flag_lr:": { unicode: ["1f1f1-1f1f7"], fname: "1f1f1-1f1f7", uc: "1f1f1-1f1f7", isCanonical: !0 }, ":lr:": { unicode: ["1f1f1-1f1f7"], fname: "1f1f1-1f1f7", uc: "1f1f1-1f1f7", isCanonical: !1 }, ":flag_lk:": { unicode: ["1f1f1-1f1f0"], fname: "1f1f1-1f1f0", uc: "1f1f1-1f1f0", isCanonical: !0 }, ":lk:": { unicode: ["1f1f1-1f1f0"], fname: "1f1f1-1f1f0", uc: "1f1f1-1f1f0", isCanonical: !1 }, ":flag_li:": { unicode: ["1f1f1-1f1ee"], fname: "1f1f1-1f1ee", uc: "1f1f1-1f1ee", isCanonical: !0 }, ":li:": { unicode: ["1f1f1-1f1ee"], fname: "1f1f1-1f1ee", uc: "1f1f1-1f1ee", isCanonical: !1 }, ":flag_lc:": { unicode: ["1f1f1-1f1e8"], fname: "1f1f1-1f1e8", uc: "1f1f1-1f1e8", isCanonical: !0 }, ":lc:": { unicode: ["1f1f1-1f1e8"], fname: "1f1f1-1f1e8", uc: "1f1f1-1f1e8", isCanonical: !1 }, ":flag_lb:": { unicode: ["1f1f1-1f1e7"], fname: "1f1f1-1f1e7", uc: "1f1f1-1f1e7", isCanonical: !0 }, ":lb:": { unicode: ["1f1f1-1f1e7"], fname: "1f1f1-1f1e7", uc: "1f1f1-1f1e7", isCanonical: !1 }, ":flag_la:": { unicode: ["1f1f1-1f1e6"], fname: "1f1f1-1f1e6", uc: "1f1f1-1f1e6", isCanonical: !0 }, ":la:": { unicode: ["1f1f1-1f1e6"], fname: "1f1f1-1f1e6", uc: "1f1f1-1f1e6", isCanonical: !1 }, ":flag_kz:": { unicode: ["1f1f0-1f1ff"], fname: "1f1f0-1f1ff", uc: "1f1f0-1f1ff", isCanonical: !0 }, ":kz:": { unicode: ["1f1f0-1f1ff"], fname: "1f1f0-1f1ff", uc: "1f1f0-1f1ff", isCanonical: !1 }, ":flag_ky:": { unicode: ["1f1f0-1f1fe"], fname: "1f1f0-1f1fe", uc: "1f1f0-1f1fe", isCanonical: !0 }, ":ky:": { unicode: ["1f1f0-1f1fe"], fname: "1f1f0-1f1fe", uc: "1f1f0-1f1fe", isCanonical: !1 }, ":flag_kw:": { unicode: ["1f1f0-1f1fc"], fname: "1f1f0-1f1fc", uc: "1f1f0-1f1fc", isCanonical: !0 }, ":kw:": { unicode: ["1f1f0-1f1fc"], fname: "1f1f0-1f1fc", uc: "1f1f0-1f1fc", isCanonical: !1 }, ":flag_kr:": { unicode: ["1f1f0-1f1f7"], fname: "1f1f0-1f1f7", uc: "1f1f0-1f1f7", isCanonical: !0 }, ":kr:": { unicode: ["1f1f0-1f1f7"], fname: "1f1f0-1f1f7", uc: "1f1f0-1f1f7", isCanonical: !1 }, ":flag_kp:": { unicode: ["1f1f0-1f1f5"], fname: "1f1f0-1f1f5", uc: "1f1f0-1f1f5", isCanonical: !0 }, ":kp:": { unicode: ["1f1f0-1f1f5"], fname: "1f1f0-1f1f5", uc: "1f1f0-1f1f5", isCanonical: !1 }, ":flag_kn:": { unicode: ["1f1f0-1f1f3"], fname: "1f1f0-1f1f3", uc: "1f1f0-1f1f3", isCanonical: !0 }, ":kn:": { unicode: ["1f1f0-1f1f3"], fname: "1f1f0-1f1f3", uc: "1f1f0-1f1f3", isCanonical: !1 }, ":flag_km:": { unicode: ["1f1f0-1f1f2"], fname: "1f1f0-1f1f2", uc: "1f1f0-1f1f2", isCanonical: !0 }, ":km:": { unicode: ["1f1f0-1f1f2"], fname: "1f1f0-1f1f2", uc: "1f1f0-1f1f2", isCanonical: !1 }, ":flag_ki:": { unicode: ["1f1f0-1f1ee"], fname: "1f1f0-1f1ee", uc: "1f1f0-1f1ee", isCanonical: !0 }, ":ki:": { unicode: ["1f1f0-1f1ee"], fname: "1f1f0-1f1ee", uc: "1f1f0-1f1ee", isCanonical: !1 }, ":flag_kh:": { unicode: ["1f1f0-1f1ed"], fname: "1f1f0-1f1ed", uc: "1f1f0-1f1ed", isCanonical: !0 }, ":kh:": { unicode: ["1f1f0-1f1ed"], fname: "1f1f0-1f1ed", uc: "1f1f0-1f1ed", isCanonical: !1 }, ":flag_kg:": { unicode: ["1f1f0-1f1ec"], fname: "1f1f0-1f1ec", uc: "1f1f0-1f1ec", isCanonical: !0 }, ":kg:": { unicode: ["1f1f0-1f1ec"], fname: "1f1f0-1f1ec", uc: "1f1f0-1f1ec", isCanonical: !1 }, ":flag_ke:": { unicode: ["1f1f0-1f1ea"], fname: "1f1f0-1f1ea", uc: "1f1f0-1f1ea", isCanonical: !0 }, ":ke:": { unicode: ["1f1f0-1f1ea"], fname: "1f1f0-1f1ea", uc: "1f1f0-1f1ea", isCanonical: !1 }, ":flag_jp:": { unicode: ["1f1ef-1f1f5"], fname: "1f1ef-1f1f5", uc: "1f1ef-1f1f5", isCanonical: !0 }, ":jp:": { unicode: ["1f1ef-1f1f5"], fname: "1f1ef-1f1f5", uc: "1f1ef-1f1f5", isCanonical: !1 }, ":flag_jo:": { unicode: ["1f1ef-1f1f4"], fname: "1f1ef-1f1f4", uc: "1f1ef-1f1f4", isCanonical: !0 }, ":jo:": { unicode: ["1f1ef-1f1f4"], fname: "1f1ef-1f1f4", uc: "1f1ef-1f1f4", isCanonical: !1 }, ":flag_jm:": { unicode: ["1f1ef-1f1f2"], fname: "1f1ef-1f1f2", uc: "1f1ef-1f1f2", isCanonical: !0 }, ":jm:": { unicode: ["1f1ef-1f1f2"], fname: "1f1ef-1f1f2", uc: "1f1ef-1f1f2", isCanonical: !1 }, ":flag_je:": { unicode: ["1f1ef-1f1ea"], fname: "1f1ef-1f1ea", uc: "1f1ef-1f1ea", isCanonical: !0 }, ":je:": { unicode: ["1f1ef-1f1ea"], fname: "1f1ef-1f1ea", uc: "1f1ef-1f1ea", isCanonical: !1 }, ":flag_it:": { unicode: ["1f1ee-1f1f9"], fname: "1f1ee-1f1f9", uc: "1f1ee-1f1f9", isCanonical: !0 }, ":it:": { unicode: ["1f1ee-1f1f9"], fname: "1f1ee-1f1f9", uc: "1f1ee-1f1f9", isCanonical: !1 }, ":flag_is:": { unicode: ["1f1ee-1f1f8"], fname: "1f1ee-1f1f8", uc: "1f1ee-1f1f8", isCanonical: !0 }, ":is:": { unicode: ["1f1ee-1f1f8"], fname: "1f1ee-1f1f8", uc: "1f1ee-1f1f8", isCanonical: !1 }, ":flag_ir:": { unicode: ["1f1ee-1f1f7"], fname: "1f1ee-1f1f7", uc: "1f1ee-1f1f7", isCanonical: !0 }, ":ir:": { unicode: ["1f1ee-1f1f7"], fname: "1f1ee-1f1f7", uc: "1f1ee-1f1f7", isCanonical: !1 }, ":flag_iq:": { unicode: ["1f1ee-1f1f6"], fname: "1f1ee-1f1f6", uc: "1f1ee-1f1f6", isCanonical: !0 }, ":iq:": { unicode: ["1f1ee-1f1f6"], fname: "1f1ee-1f1f6", uc: "1f1ee-1f1f6", isCanonical: !1 }, ":flag_io:": { unicode: ["1f1ee-1f1f4"], fname: "1f1ee-1f1f4", uc: "1f1ee-1f1f4", isCanonical: !0 }, ":io:": { unicode: ["1f1ee-1f1f4"], fname: "1f1ee-1f1f4", uc: "1f1ee-1f1f4", isCanonical: !1 }, ":flag_in:": { unicode: ["1f1ee-1f1f3"], fname: "1f1ee-1f1f3", uc: "1f1ee-1f1f3", isCanonical: !0 }, ":in:": { unicode: ["1f1ee-1f1f3"], fname: "1f1ee-1f1f3", uc: "1f1ee-1f1f3", isCanonical: !1 }, ":flag_im:": { unicode: ["1f1ee-1f1f2"], fname: "1f1ee-1f1f2", uc: "1f1ee-1f1f2", isCanonical: !0 }, ":im:": { unicode: ["1f1ee-1f1f2"], fname: "1f1ee-1f1f2", uc: "1f1ee-1f1f2", isCanonical: !1 }, ":flag_il:": { unicode: ["1f1ee-1f1f1"], fname: "1f1ee-1f1f1", uc: "1f1ee-1f1f1", isCanonical: !0 }, ":il:": { unicode: ["1f1ee-1f1f1"], fname: "1f1ee-1f1f1", uc: "1f1ee-1f1f1", isCanonical: !1 }, ":flag_ie:": { unicode: ["1f1ee-1f1ea"], fname: "1f1ee-1f1ea", uc: "1f1ee-1f1ea", isCanonical: !0 }, ":ie:": { unicode: ["1f1ee-1f1ea"], fname: "1f1ee-1f1ea", uc: "1f1ee-1f1ea", isCanonical: !1 }, ":flag_id:": { unicode: ["1f1ee-1f1e9"], fname: "1f1ee-1f1e9", uc: "1f1ee-1f1e9", isCanonical: !0 }, ":indonesia:": { unicode: ["1f1ee-1f1e9"], fname: "1f1ee-1f1e9", uc: "1f1ee-1f1e9", isCanonical: !1 }, ":flag_ic:": { unicode: ["1f1ee-1f1e8"], fname: "1f1ee-1f1e8", uc: "1f1ee-1f1e8", isCanonical: !0 }, ":ic:": { unicode: ["1f1ee-1f1e8"], fname: "1f1ee-1f1e8", uc: "1f1ee-1f1e8", isCanonical: !1 }, ":flag_hu:": { unicode: ["1f1ed-1f1fa"], fname: "1f1ed-1f1fa", uc: "1f1ed-1f1fa", isCanonical: !0 }, ":hu:": { unicode: ["1f1ed-1f1fa"], fname: "1f1ed-1f1fa", uc: "1f1ed-1f1fa", isCanonical: !1 }, ":flag_ht:": { unicode: ["1f1ed-1f1f9"], fname: "1f1ed-1f1f9", uc: "1f1ed-1f1f9", isCanonical: !0 }, ":ht:": { unicode: ["1f1ed-1f1f9"], fname: "1f1ed-1f1f9", uc: "1f1ed-1f1f9", isCanonical: !1 }, ":flag_hr:": { unicode: ["1f1ed-1f1f7"], fname: "1f1ed-1f1f7", uc: "1f1ed-1f1f7", isCanonical: !0 }, ":hr:": { unicode: ["1f1ed-1f1f7"], fname: "1f1ed-1f1f7", uc: "1f1ed-1f1f7", isCanonical: !1 }, ":flag_hn:": { unicode: ["1f1ed-1f1f3"], fname: "1f1ed-1f1f3", uc: "1f1ed-1f1f3", isCanonical: !0 }, ":hn:": { unicode: ["1f1ed-1f1f3"], fname: "1f1ed-1f1f3", uc: "1f1ed-1f1f3", isCanonical: !1 }, ":flag_hm:": { unicode: ["1f1ed-1f1f2"], fname: "1f1ed-1f1f2", uc: "1f1ed-1f1f2", isCanonical: !0 }, ":hm:": { unicode: ["1f1ed-1f1f2"], fname: "1f1ed-1f1f2", uc: "1f1ed-1f1f2", isCanonical: !1 }, ":flag_hk:": { unicode: ["1f1ed-1f1f0"], fname: "1f1ed-1f1f0", uc: "1f1ed-1f1f0", isCanonical: !0 }, ":hk:": { unicode: ["1f1ed-1f1f0"], fname: "1f1ed-1f1f0", uc: "1f1ed-1f1f0", isCanonical: !1 }, ":flag_gy:": { unicode: ["1f1ec-1f1fe"], fname: "1f1ec-1f1fe", uc: "1f1ec-1f1fe", isCanonical: !0 }, ":gy:": { unicode: ["1f1ec-1f1fe"], fname: "1f1ec-1f1fe", uc: "1f1ec-1f1fe", isCanonical: !1 }, ":flag_gw:": { unicode: ["1f1ec-1f1fc"], fname: "1f1ec-1f1fc", uc: "1f1ec-1f1fc", isCanonical: !0 }, ":gw:": { unicode: ["1f1ec-1f1fc"], fname: "1f1ec-1f1fc", uc: "1f1ec-1f1fc", isCanonical: !1 }, ":flag_gu:": { unicode: ["1f1ec-1f1fa"], fname: "1f1ec-1f1fa", uc: "1f1ec-1f1fa", isCanonical: !0 }, ":gu:": { unicode: ["1f1ec-1f1fa"], fname: "1f1ec-1f1fa", uc: "1f1ec-1f1fa", isCanonical: !1 }, ":flag_gt:": { unicode: ["1f1ec-1f1f9"], fname: "1f1ec-1f1f9", uc: "1f1ec-1f1f9", isCanonical: !0 }, ":gt:": { unicode: ["1f1ec-1f1f9"], fname: "1f1ec-1f1f9", uc: "1f1ec-1f1f9", isCanonical: !1 }, ":flag_gs:": { unicode: ["1f1ec-1f1f8"], fname: "1f1ec-1f1f8", uc: "1f1ec-1f1f8", isCanonical: !0 }, ":gs:": { unicode: ["1f1ec-1f1f8"], fname: "1f1ec-1f1f8", uc: "1f1ec-1f1f8", isCanonical: !1 }, ":flag_gr:": { unicode: ["1f1ec-1f1f7"], fname: "1f1ec-1f1f7", uc: "1f1ec-1f1f7", isCanonical: !0 }, ":gr:": { unicode: ["1f1ec-1f1f7"], fname: "1f1ec-1f1f7", uc: "1f1ec-1f1f7", isCanonical: !1 }, ":flag_gq:": { unicode: ["1f1ec-1f1f6"], fname: "1f1ec-1f1f6", uc: "1f1ec-1f1f6", isCanonical: !0 }, ":gq:": { unicode: ["1f1ec-1f1f6"], fname: "1f1ec-1f1f6", uc: "1f1ec-1f1f6", isCanonical: !1 }, ":flag_gp:": { unicode: ["1f1ec-1f1f5"], fname: "1f1ec-1f1f5", uc: "1f1ec-1f1f5", isCanonical: !0 }, ":gp:": { unicode: ["1f1ec-1f1f5"], fname: "1f1ec-1f1f5", uc: "1f1ec-1f1f5", isCanonical: !1 }, ":flag_gn:": { unicode: ["1f1ec-1f1f3"], fname: "1f1ec-1f1f3", uc: "1f1ec-1f1f3", isCanonical: !0 }, ":gn:": { unicode: ["1f1ec-1f1f3"], fname: "1f1ec-1f1f3", uc: "1f1ec-1f1f3", isCanonical: !1 }, ":flag_gm:": { unicode: ["1f1ec-1f1f2"], fname: "1f1ec-1f1f2", uc: "1f1ec-1f1f2", isCanonical: !0 }, ":gm:": { unicode: ["1f1ec-1f1f2"], fname: "1f1ec-1f1f2", uc: "1f1ec-1f1f2", isCanonical: !1 }, ":flag_gl:": { unicode: ["1f1ec-1f1f1"], fname: "1f1ec-1f1f1", uc: "1f1ec-1f1f1", isCanonical: !0 }, ":gl:": { unicode: ["1f1ec-1f1f1"], fname: "1f1ec-1f1f1", uc: "1f1ec-1f1f1", isCanonical: !1 }, ":flag_gi:": { unicode: ["1f1ec-1f1ee"], fname: "1f1ec-1f1ee", uc: "1f1ec-1f1ee", isCanonical: !0 }, ":gi:": { unicode: ["1f1ec-1f1ee"], fname: "1f1ec-1f1ee", uc: "1f1ec-1f1ee", isCanonical: !1 }, ":flag_gh:": { unicode: ["1f1ec-1f1ed"], fname: "1f1ec-1f1ed", uc: "1f1ec-1f1ed", isCanonical: !0 }, ":gh:": { unicode: ["1f1ec-1f1ed"], fname: "1f1ec-1f1ed", uc: "1f1ec-1f1ed", isCanonical: !1 }, ":flag_gg:": { unicode: ["1f1ec-1f1ec"], fname: "1f1ec-1f1ec", uc: "1f1ec-1f1ec", isCanonical: !0 }, ":gg:": { unicode: ["1f1ec-1f1ec"], fname: "1f1ec-1f1ec", uc: "1f1ec-1f1ec", isCanonical: !1 }, ":flag_gf:": { unicode: ["1f1ec-1f1eb"], fname: "1f1ec-1f1eb", uc: "1f1ec-1f1eb", isCanonical: !0 }, ":gf:": { unicode: ["1f1ec-1f1eb"], fname: "1f1ec-1f1eb", uc: "1f1ec-1f1eb", isCanonical: !1 }, ":flag_ge:": { unicode: ["1f1ec-1f1ea"], fname: "1f1ec-1f1ea", uc: "1f1ec-1f1ea", isCanonical: !0 }, ":ge:": { unicode: ["1f1ec-1f1ea"], fname: "1f1ec-1f1ea", uc: "1f1ec-1f1ea", isCanonical: !1 }, ":flag_gd:": { unicode: ["1f1ec-1f1e9"], fname: "1f1ec-1f1e9", uc: "1f1ec-1f1e9", isCanonical: !0 }, ":gd:": { unicode: ["1f1ec-1f1e9"], fname: "1f1ec-1f1e9", uc: "1f1ec-1f1e9", isCanonical: !1 }, ":flag_gb:": { unicode: ["1f1ec-1f1e7"], fname: "1f1ec-1f1e7", uc: "1f1ec-1f1e7", isCanonical: !0 }, ":gb:": { unicode: ["1f1ec-1f1e7"], fname: "1f1ec-1f1e7", uc: "1f1ec-1f1e7", isCanonical: !1 }, ":flag_ga:": { unicode: ["1f1ec-1f1e6"], fname: "1f1ec-1f1e6", uc: "1f1ec-1f1e6", isCanonical: !0 }, ":ga:": { unicode: ["1f1ec-1f1e6"], fname: "1f1ec-1f1e6", uc: "1f1ec-1f1e6", isCanonical: !1 }, ":flag_fr:": { unicode: ["1f1eb-1f1f7"], fname: "1f1eb-1f1f7", uc: "1f1eb-1f1f7", isCanonical: !0 }, ":fr:": { unicode: ["1f1eb-1f1f7"], fname: "1f1eb-1f1f7", uc: "1f1eb-1f1f7", isCanonical: !1 }, ":flag_fo:": { unicode: ["1f1eb-1f1f4"], fname: "1f1eb-1f1f4", uc: "1f1eb-1f1f4", isCanonical: !0 }, ":fo:": { unicode: ["1f1eb-1f1f4"], fname: "1f1eb-1f1f4", uc: "1f1eb-1f1f4", isCanonical: !1 }, ":flag_fm:": { unicode: ["1f1eb-1f1f2"], fname: "1f1eb-1f1f2", uc: "1f1eb-1f1f2", isCanonical: !0 }, ":fm:": { unicode: ["1f1eb-1f1f2"], fname: "1f1eb-1f1f2", uc: "1f1eb-1f1f2", isCanonical: !1 }, ":flag_fk:": { unicode: ["1f1eb-1f1f0"], fname: "1f1eb-1f1f0", uc: "1f1eb-1f1f0", isCanonical: !0 }, ":fk:": { unicode: ["1f1eb-1f1f0"], fname: "1f1eb-1f1f0", uc: "1f1eb-1f1f0", isCanonical: !1 }, ":flag_fj:": { unicode: ["1f1eb-1f1ef"], fname: "1f1eb-1f1ef", uc: "1f1eb-1f1ef", isCanonical: !0 }, ":fj:": { unicode: ["1f1eb-1f1ef"], fname: "1f1eb-1f1ef", uc: "1f1eb-1f1ef", isCanonical: !1 }, ":flag_fi:": { unicode: ["1f1eb-1f1ee"], fname: "1f1eb-1f1ee", uc: "1f1eb-1f1ee", isCanonical: !0 }, ":fi:": { unicode: ["1f1eb-1f1ee"], fname: "1f1eb-1f1ee", uc: "1f1eb-1f1ee", isCanonical: !1 }, ":flag_eu:": { unicode: ["1f1ea-1f1fa"], fname: "1f1ea-1f1fa", uc: "1f1ea-1f1fa", isCanonical: !0 }, ":eu:": { unicode: ["1f1ea-1f1fa"], fname: "1f1ea-1f1fa", uc: "1f1ea-1f1fa", isCanonical: !1 }, ":flag_et:": { unicode: ["1f1ea-1f1f9"], fname: "1f1ea-1f1f9", uc: "1f1ea-1f1f9", isCanonical: !0 }, ":et:": { unicode: ["1f1ea-1f1f9"], fname: "1f1ea-1f1f9", uc: "1f1ea-1f1f9", isCanonical: !1 }, ":flag_es:": { unicode: ["1f1ea-1f1f8"], fname: "1f1ea-1f1f8", uc: "1f1ea-1f1f8", isCanonical: !0 }, ":es:": { unicode: ["1f1ea-1f1f8"], fname: "1f1ea-1f1f8", uc: "1f1ea-1f1f8", isCanonical: !1 }, ":flag_er:": { unicode: ["1f1ea-1f1f7"], fname: "1f1ea-1f1f7", uc: "1f1ea-1f1f7", isCanonical: !0 }, ":er:": { unicode: ["1f1ea-1f1f7"], fname: "1f1ea-1f1f7", uc: "1f1ea-1f1f7", isCanonical: !1 }, ":flag_eh:": { unicode: ["1f1ea-1f1ed"], fname: "1f1ea-1f1ed", uc: "1f1ea-1f1ed", isCanonical: !0 }, ":eh:": { unicode: ["1f1ea-1f1ed"], fname: "1f1ea-1f1ed", uc: "1f1ea-1f1ed", isCanonical: !1 }, ":flag_eg:": { unicode: ["1f1ea-1f1ec"], fname: "1f1ea-1f1ec", uc: "1f1ea-1f1ec", isCanonical: !0 }, ":eg:": { unicode: ["1f1ea-1f1ec"], fname: "1f1ea-1f1ec", uc: "1f1ea-1f1ec", isCanonical: !1 }, ":flag_ee:": { unicode: ["1f1ea-1f1ea"], fname: "1f1ea-1f1ea", uc: "1f1ea-1f1ea", isCanonical: !0 }, ":ee:": { unicode: ["1f1ea-1f1ea"], fname: "1f1ea-1f1ea", uc: "1f1ea-1f1ea", isCanonical: !1 }, ":flag_ec:": { unicode: ["1f1ea-1f1e8"], fname: "1f1ea-1f1e8", uc: "1f1ea-1f1e8", isCanonical: !0 }, ":ec:": { unicode: ["1f1ea-1f1e8"], fname: "1f1ea-1f1e8", uc: "1f1ea-1f1e8", isCanonical: !1 }, ":flag_ea:": { unicode: ["1f1ea-1f1e6"], fname: "1f1ea-1f1e6", uc: "1f1ea-1f1e6", isCanonical: !0 }, ":ea:": { unicode: ["1f1ea-1f1e6"], fname: "1f1ea-1f1e6", uc: "1f1ea-1f1e6", isCanonical: !1 }, ":flag_dz:": { unicode: ["1f1e9-1f1ff"], fname: "1f1e9-1f1ff", uc: "1f1e9-1f1ff", isCanonical: !0 }, ":dz:": { unicode: ["1f1e9-1f1ff"], fname: "1f1e9-1f1ff", uc: "1f1e9-1f1ff", isCanonical: !1 }, ":flag_do:": { unicode: ["1f1e9-1f1f4"], fname: "1f1e9-1f1f4", uc: "1f1e9-1f1f4", isCanonical: !0 }, ":do:": { unicode: ["1f1e9-1f1f4"], fname: "1f1e9-1f1f4", uc: "1f1e9-1f1f4", isCanonical: !1 }, ":flag_dm:": { unicode: ["1f1e9-1f1f2"], fname: "1f1e9-1f1f2", uc: "1f1e9-1f1f2", isCanonical: !0 }, ":dm:": { unicode: ["1f1e9-1f1f2"], fname: "1f1e9-1f1f2", uc: "1f1e9-1f1f2", isCanonical: !1 }, ":flag_dk:": { unicode: ["1f1e9-1f1f0"], fname: "1f1e9-1f1f0", uc: "1f1e9-1f1f0", isCanonical: !0 }, ":dk:": { unicode: ["1f1e9-1f1f0"], fname: "1f1e9-1f1f0", uc: "1f1e9-1f1f0", isCanonical: !1 }, ":flag_dj:": { unicode: ["1f1e9-1f1ef"], fname: "1f1e9-1f1ef", uc: "1f1e9-1f1ef", isCanonical: !0 }, ":dj:": { unicode: ["1f1e9-1f1ef"], fname: "1f1e9-1f1ef", uc: "1f1e9-1f1ef", isCanonical: !1 }, ":flag_dg:": { unicode: ["1f1e9-1f1ec"], fname: "1f1e9-1f1ec", uc: "1f1e9-1f1ec", isCanonical: !0 }, ":dg:": { unicode: ["1f1e9-1f1ec"], fname: "1f1e9-1f1ec", uc: "1f1e9-1f1ec", isCanonical: !1 }, ":flag_de:": { unicode: ["1f1e9-1f1ea"], fname: "1f1e9-1f1ea", uc: "1f1e9-1f1ea", isCanonical: !0 }, ":de:": { unicode: ["1f1e9-1f1ea"], fname: "1f1e9-1f1ea", uc: "1f1e9-1f1ea", isCanonical: !1 }, ":flag_cz:": { unicode: ["1f1e8-1f1ff"], fname: "1f1e8-1f1ff", uc: "1f1e8-1f1ff", isCanonical: !0 }, ":cz:": { unicode: ["1f1e8-1f1ff"], fname: "1f1e8-1f1ff", uc: "1f1e8-1f1ff", isCanonical: !1 }, ":flag_cy:": { unicode: ["1f1e8-1f1fe"], fname: "1f1e8-1f1fe", uc: "1f1e8-1f1fe", isCanonical: !0 }, ":cy:": { unicode: ["1f1e8-1f1fe"], fname: "1f1e8-1f1fe", uc: "1f1e8-1f1fe", isCanonical: !1 }, ":flag_cx:": { unicode: ["1f1e8-1f1fd"], fname: "1f1e8-1f1fd", uc: "1f1e8-1f1fd", isCanonical: !0 }, ":cx:": { unicode: ["1f1e8-1f1fd"], fname: "1f1e8-1f1fd", uc: "1f1e8-1f1fd", isCanonical: !1 }, ":flag_cw:": { unicode: ["1f1e8-1f1fc"], fname: "1f1e8-1f1fc", uc: "1f1e8-1f1fc", isCanonical: !0 }, ":cw:": { unicode: ["1f1e8-1f1fc"], fname: "1f1e8-1f1fc", uc: "1f1e8-1f1fc", isCanonical: !1 }, ":flag_cv:": { unicode: ["1f1e8-1f1fb"], fname: "1f1e8-1f1fb", uc: "1f1e8-1f1fb", isCanonical: !0 }, ":cv:": { unicode: ["1f1e8-1f1fb"], fname: "1f1e8-1f1fb", uc: "1f1e8-1f1fb", isCanonical: !1 }, ":flag_cu:": { unicode: ["1f1e8-1f1fa"], fname: "1f1e8-1f1fa", uc: "1f1e8-1f1fa", isCanonical: !0 }, ":cu:": { unicode: ["1f1e8-1f1fa"], fname: "1f1e8-1f1fa", uc: "1f1e8-1f1fa", isCanonical: !1 }, ":flag_cr:": { unicode: ["1f1e8-1f1f7"], fname: "1f1e8-1f1f7", uc: "1f1e8-1f1f7", isCanonical: !0 }, ":cr:": { unicode: ["1f1e8-1f1f7"], fname: "1f1e8-1f1f7", uc: "1f1e8-1f1f7", isCanonical: !1 }, ":flag_cp:": { unicode: ["1f1e8-1f1f5"], fname: "1f1e8-1f1f5", uc: "1f1e8-1f1f5", isCanonical: !0 }, ":cp:": { unicode: ["1f1e8-1f1f5"], fname: "1f1e8-1f1f5", uc: "1f1e8-1f1f5", isCanonical: !1 }, ":flag_co:": { unicode: ["1f1e8-1f1f4"], fname: "1f1e8-1f1f4", uc: "1f1e8-1f1f4", isCanonical: !0 }, ":co:": { unicode: ["1f1e8-1f1f4"], fname: "1f1e8-1f1f4", uc: "1f1e8-1f1f4", isCanonical: !1 }, ":flag_cn:": { unicode: ["1f1e8-1f1f3"], fname: "1f1e8-1f1f3", uc: "1f1e8-1f1f3", isCanonical: !0 }, ":cn:": { unicode: ["1f1e8-1f1f3"], fname: "1f1e8-1f1f3", uc: "1f1e8-1f1f3", isCanonical: !1 }, ":flag_cm:": { unicode: ["1f1e8-1f1f2"], fname: "1f1e8-1f1f2", uc: "1f1e8-1f1f2", isCanonical: !0 }, ":cm:": { unicode: ["1f1e8-1f1f2"], fname: "1f1e8-1f1f2", uc: "1f1e8-1f1f2", isCanonical: !1 }, ":flag_cl:": { unicode: ["1f1e8-1f1f1"], fname: "1f1e8-1f1f1", uc: "1f1e8-1f1f1", isCanonical: !0 }, ":chile:": { unicode: ["1f1e8-1f1f1"], fname: "1f1e8-1f1f1", uc: "1f1e8-1f1f1", isCanonical: !1 }, ":flag_ck:": { unicode: ["1f1e8-1f1f0"], fname: "1f1e8-1f1f0", uc: "1f1e8-1f1f0", isCanonical: !0 }, ":ck:": { unicode: ["1f1e8-1f1f0"], fname: "1f1e8-1f1f0", uc: "1f1e8-1f1f0", isCanonical: !1 }, ":flag_ci:": { unicode: ["1f1e8-1f1ee"], fname: "1f1e8-1f1ee", uc: "1f1e8-1f1ee", isCanonical: !0 }, ":ci:": { unicode: ["1f1e8-1f1ee"], fname: "1f1e8-1f1ee", uc: "1f1e8-1f1ee", isCanonical: !1 }, ":flag_ch:": { unicode: ["1f1e8-1f1ed"], fname: "1f1e8-1f1ed", uc: "1f1e8-1f1ed", isCanonical: !0 }, ":ch:": { unicode: ["1f1e8-1f1ed"], fname: "1f1e8-1f1ed", uc: "1f1e8-1f1ed", isCanonical: !1 }, ":flag_cg:": { unicode: ["1f1e8-1f1ec"], fname: "1f1e8-1f1ec", uc: "1f1e8-1f1ec", isCanonical: !0 }, ":cg:": { unicode: ["1f1e8-1f1ec"], fname: "1f1e8-1f1ec", uc: "1f1e8-1f1ec", isCanonical: !1 }, ":flag_cf:": { unicode: ["1f1e8-1f1eb"], fname: "1f1e8-1f1eb", uc: "1f1e8-1f1eb", isCanonical: !0 }, ":cf:": { unicode: ["1f1e8-1f1eb"], fname: "1f1e8-1f1eb", uc: "1f1e8-1f1eb", isCanonical: !1 }, ":flag_cd:": { unicode: ["1f1e8-1f1e9"], fname: "1f1e8-1f1e9", uc: "1f1e8-1f1e9", isCanonical: !0 }, ":congo:": { unicode: ["1f1e8-1f1e9"], fname: "1f1e8-1f1e9", uc: "1f1e8-1f1e9", isCanonical: !1 }, ":flag_cc:": { unicode: ["1f1e8-1f1e8"], fname: "1f1e8-1f1e8", uc: "1f1e8-1f1e8", isCanonical: !0 }, ":cc:": { unicode: ["1f1e8-1f1e8"], fname: "1f1e8-1f1e8", uc: "1f1e8-1f1e8", isCanonical: !1 }, ":flag_ca:": { unicode: ["1f1e8-1f1e6"], fname: "1f1e8-1f1e6", uc: "1f1e8-1f1e6", isCanonical: !0 }, ":ca:": { unicode: ["1f1e8-1f1e6"], fname: "1f1e8-1f1e6", uc: "1f1e8-1f1e6", isCanonical: !1 }, ":flag_bz:": { unicode: ["1f1e7-1f1ff"], fname: "1f1e7-1f1ff", uc: "1f1e7-1f1ff", isCanonical: !0 }, ":bz:": { unicode: ["1f1e7-1f1ff"], fname: "1f1e7-1f1ff", uc: "1f1e7-1f1ff", isCanonical: !1 }, ":flag_by:": { unicode: ["1f1e7-1f1fe"], fname: "1f1e7-1f1fe", uc: "1f1e7-1f1fe", isCanonical: !0 }, ":by:": { unicode: ["1f1e7-1f1fe"], fname: "1f1e7-1f1fe", uc: "1f1e7-1f1fe", isCanonical: !1 }, ":flag_bw:": { unicode: ["1f1e7-1f1fc"], fname: "1f1e7-1f1fc", uc: "1f1e7-1f1fc", isCanonical: !0 }, ":bw:": { unicode: ["1f1e7-1f1fc"], fname: "1f1e7-1f1fc", uc: "1f1e7-1f1fc", isCanonical: !1 }, ":flag_bv:": { unicode: ["1f1e7-1f1fb"], fname: "1f1e7-1f1fb", uc: "1f1e7-1f1fb", isCanonical: !0 }, ":bv:": { unicode: ["1f1e7-1f1fb"], fname: "1f1e7-1f1fb",
      uc: "1f1e7-1f1fb", isCanonical: !1 }, ":flag_bt:": { unicode: ["1f1e7-1f1f9"], fname: "1f1e7-1f1f9", uc: "1f1e7-1f1f9", isCanonical: !0 }, ":bt:": { unicode: ["1f1e7-1f1f9"], fname: "1f1e7-1f1f9", uc: "1f1e7-1f1f9", isCanonical: !1 }, ":flag_bs:": { unicode: ["1f1e7-1f1f8"], fname: "1f1e7-1f1f8", uc: "1f1e7-1f1f8", isCanonical: !0 }, ":bs:": { unicode: ["1f1e7-1f1f8"], fname: "1f1e7-1f1f8", uc: "1f1e7-1f1f8", isCanonical: !1 }, ":flag_br:": { unicode: ["1f1e7-1f1f7"], fname: "1f1e7-1f1f7", uc: "1f1e7-1f1f7", isCanonical: !0 }, ":br:": { unicode: ["1f1e7-1f1f7"], fname: "1f1e7-1f1f7", uc: "1f1e7-1f1f7", isCanonical: !1 }, ":flag_bq:": { unicode: ["1f1e7-1f1f6"], fname: "1f1e7-1f1f6", uc: "1f1e7-1f1f6", isCanonical: !0 }, ":bq:": { unicode: ["1f1e7-1f1f6"], fname: "1f1e7-1f1f6", uc: "1f1e7-1f1f6", isCanonical: !1 }, ":flag_bo:": { unicode: ["1f1e7-1f1f4"], fname: "1f1e7-1f1f4", uc: "1f1e7-1f1f4", isCanonical: !0 }, ":bo:": { unicode: ["1f1e7-1f1f4"], fname: "1f1e7-1f1f4", uc: "1f1e7-1f1f4", isCanonical: !1 }, ":flag_bn:": { unicode: ["1f1e7-1f1f3"], fname: "1f1e7-1f1f3", uc: "1f1e7-1f1f3", isCanonical: !0 }, ":bn:": { unicode: ["1f1e7-1f1f3"], fname: "1f1e7-1f1f3", uc: "1f1e7-1f1f3", isCanonical: !1 }, ":flag_bm:": { unicode: ["1f1e7-1f1f2"], fname: "1f1e7-1f1f2", uc: "1f1e7-1f1f2", isCanonical: !0 }, ":bm:": { unicode: ["1f1e7-1f1f2"], fname: "1f1e7-1f1f2", uc: "1f1e7-1f1f2", isCanonical: !1 }, ":flag_bl:": { unicode: ["1f1e7-1f1f1"], fname: "1f1e7-1f1f1", uc: "1f1e7-1f1f1", isCanonical: !0 }, ":bl:": { unicode: ["1f1e7-1f1f1"], fname: "1f1e7-1f1f1", uc: "1f1e7-1f1f1", isCanonical: !1 }, ":flag_bj:": { unicode: ["1f1e7-1f1ef"], fname: "1f1e7-1f1ef", uc: "1f1e7-1f1ef", isCanonical: !0 }, ":bj:": { unicode: ["1f1e7-1f1ef"], fname: "1f1e7-1f1ef", uc: "1f1e7-1f1ef", isCanonical: !1 }, ":flag_bi:": { unicode: ["1f1e7-1f1ee"], fname: "1f1e7-1f1ee", uc: "1f1e7-1f1ee", isCanonical: !0 }, ":bi:": { unicode: ["1f1e7-1f1ee"], fname: "1f1e7-1f1ee", uc: "1f1e7-1f1ee", isCanonical: !1 }, ":flag_bh:": { unicode: ["1f1e7-1f1ed"], fname: "1f1e7-1f1ed", uc: "1f1e7-1f1ed", isCanonical: !0 }, ":bh:": { unicode: ["1f1e7-1f1ed"], fname: "1f1e7-1f1ed", uc: "1f1e7-1f1ed", isCanonical: !1 }, ":flag_bg:": { unicode: ["1f1e7-1f1ec"], fname: "1f1e7-1f1ec", uc: "1f1e7-1f1ec", isCanonical: !0 }, ":bg:": { unicode: ["1f1e7-1f1ec"], fname: "1f1e7-1f1ec", uc: "1f1e7-1f1ec", isCanonical: !1 }, ":flag_bf:": { unicode: ["1f1e7-1f1eb"], fname: "1f1e7-1f1eb", uc: "1f1e7-1f1eb", isCanonical: !0 }, ":bf:": { unicode: ["1f1e7-1f1eb"], fname: "1f1e7-1f1eb", uc: "1f1e7-1f1eb", isCanonical: !1 }, ":flag_be:": { unicode: ["1f1e7-1f1ea"], fname: "1f1e7-1f1ea", uc: "1f1e7-1f1ea", isCanonical: !0 }, ":be:": { unicode: ["1f1e7-1f1ea"], fname: "1f1e7-1f1ea", uc: "1f1e7-1f1ea", isCanonical: !1 }, ":flag_bd:": { unicode: ["1f1e7-1f1e9"], fname: "1f1e7-1f1e9", uc: "1f1e7-1f1e9", isCanonical: !0 }, ":bd:": { unicode: ["1f1e7-1f1e9"], fname: "1f1e7-1f1e9", uc: "1f1e7-1f1e9", isCanonical: !1 }, ":flag_bb:": { unicode: ["1f1e7-1f1e7"], fname: "1f1e7-1f1e7", uc: "1f1e7-1f1e7", isCanonical: !0 }, ":bb:": { unicode: ["1f1e7-1f1e7"], fname: "1f1e7-1f1e7", uc: "1f1e7-1f1e7", isCanonical: !1 }, ":flag_ba:": { unicode: ["1f1e7-1f1e6"], fname: "1f1e7-1f1e6", uc: "1f1e7-1f1e6", isCanonical: !0 }, ":ba:": { unicode: ["1f1e7-1f1e6"], fname: "1f1e7-1f1e6", uc: "1f1e7-1f1e6", isCanonical: !1 }, ":flag_az:": { unicode: ["1f1e6-1f1ff"], fname: "1f1e6-1f1ff", uc: "1f1e6-1f1ff", isCanonical: !0 }, ":az:": { unicode: ["1f1e6-1f1ff"], fname: "1f1e6-1f1ff", uc: "1f1e6-1f1ff", isCanonical: !1 }, ":flag_ax:": { unicode: ["1f1e6-1f1fd"], fname: "1f1e6-1f1fd", uc: "1f1e6-1f1fd", isCanonical: !0 }, ":ax:": { unicode: ["1f1e6-1f1fd"], fname: "1f1e6-1f1fd", uc: "1f1e6-1f1fd", isCanonical: !1 }, ":flag_aw:": { unicode: ["1f1e6-1f1fc"], fname: "1f1e6-1f1fc", uc: "1f1e6-1f1fc", isCanonical: !0 }, ":aw:": { unicode: ["1f1e6-1f1fc"], fname: "1f1e6-1f1fc", uc: "1f1e6-1f1fc", isCanonical: !1 }, ":flag_au:": { unicode: ["1f1e6-1f1fa"], fname: "1f1e6-1f1fa", uc: "1f1e6-1f1fa", isCanonical: !0 }, ":au:": { unicode: ["1f1e6-1f1fa"], fname: "1f1e6-1f1fa", uc: "1f1e6-1f1fa", isCanonical: !1 }, ":flag_at:": { unicode: ["1f1e6-1f1f9"], fname: "1f1e6-1f1f9", uc: "1f1e6-1f1f9", isCanonical: !0 }, ":at:": { unicode: ["1f1e6-1f1f9"], fname: "1f1e6-1f1f9", uc: "1f1e6-1f1f9", isCanonical: !1 }, ":flag_as:": { unicode: ["1f1e6-1f1f8"], fname: "1f1e6-1f1f8", uc: "1f1e6-1f1f8", isCanonical: !0 }, ":as:": { unicode: ["1f1e6-1f1f8"], fname: "1f1e6-1f1f8", uc: "1f1e6-1f1f8", isCanonical: !1 }, ":flag_ar:": { unicode: ["1f1e6-1f1f7"], fname: "1f1e6-1f1f7", uc: "1f1e6-1f1f7", isCanonical: !0 }, ":ar:": { unicode: ["1f1e6-1f1f7"], fname: "1f1e6-1f1f7", uc: "1f1e6-1f1f7", isCanonical: !1 }, ":flag_aq:": { unicode: ["1f1e6-1f1f6"], fname: "1f1e6-1f1f6", uc: "1f1e6-1f1f6", isCanonical: !0 }, ":aq:": { unicode: ["1f1e6-1f1f6"], fname: "1f1e6-1f1f6", uc: "1f1e6-1f1f6", isCanonical: !1 }, ":flag_ao:": { unicode: ["1f1e6-1f1f4"], fname: "1f1e6-1f1f4", uc: "1f1e6-1f1f4", isCanonical: !0 }, ":ao:": { unicode: ["1f1e6-1f1f4"], fname: "1f1e6-1f1f4", uc: "1f1e6-1f1f4", isCanonical: !1 }, ":flag_am:": { unicode: ["1f1e6-1f1f2"], fname: "1f1e6-1f1f2", uc: "1f1e6-1f1f2", isCanonical: !0 }, ":am:": { unicode: ["1f1e6-1f1f2"], fname: "1f1e6-1f1f2", uc: "1f1e6-1f1f2", isCanonical: !1 }, ":flag_al:": { unicode: ["1f1e6-1f1f1"], fname: "1f1e6-1f1f1", uc: "1f1e6-1f1f1", isCanonical: !0 }, ":al:": { unicode: ["1f1e6-1f1f1"], fname: "1f1e6-1f1f1", uc: "1f1e6-1f1f1", isCanonical: !1 }, ":flag_ai:": { unicode: ["1f1e6-1f1ee"], fname: "1f1e6-1f1ee", uc: "1f1e6-1f1ee", isCanonical: !0 }, ":ai:": { unicode: ["1f1e6-1f1ee"], fname: "1f1e6-1f1ee", uc: "1f1e6-1f1ee", isCanonical: !1 }, ":flag_ag:": { unicode: ["1f1e6-1f1ec"], fname: "1f1e6-1f1ec", uc: "1f1e6-1f1ec", isCanonical: !0 }, ":ag:": { unicode: ["1f1e6-1f1ec"], fname: "1f1e6-1f1ec", uc: "1f1e6-1f1ec", isCanonical: !1 }, ":flag_af:": { unicode: ["1f1e6-1f1eb"], fname: "1f1e6-1f1eb", uc: "1f1e6-1f1eb", isCanonical: !0 }, ":af:": { unicode: ["1f1e6-1f1eb"], fname: "1f1e6-1f1eb", uc: "1f1e6-1f1eb", isCanonical: !1 }, ":flag_ae:": { unicode: ["1f1e6-1f1ea"], fname: "1f1e6-1f1ea", uc: "1f1e6-1f1ea", isCanonical: !0 }, ":ae:": { unicode: ["1f1e6-1f1ea"], fname: "1f1e6-1f1ea", uc: "1f1e6-1f1ea", isCanonical: !1 }, ":flag_ad:": { unicode: ["1f1e6-1f1e9"], fname: "1f1e6-1f1e9", uc: "1f1e6-1f1e9", isCanonical: !0 }, ":ad:": { unicode: ["1f1e6-1f1e9"], fname: "1f1e6-1f1e9", uc: "1f1e6-1f1e9", isCanonical: !1 }, ":flag_ac:": { unicode: ["1f1e6-1f1e8"], fname: "1f1e6-1f1e8", uc: "1f1e6-1f1e8", isCanonical: !0 }, ":ac:": { unicode: ["1f1e6-1f1e8"], fname: "1f1e6-1f1e8", uc: "1f1e6-1f1e8", isCanonical: !1 }, ":mahjong:": { unicode: ["1f004-fe0f", "1f004"], fname: "1f004", uc: "1f004", isCanonical: !0 }, ":parking:": { unicode: ["1f17f-fe0f", "1f17f"], fname: "1f17f", uc: "1f17f", isCanonical: !0 }, ":sa:": { unicode: ["1f202-fe0f", "1f202"], fname: "1f202", uc: "1f202", isCanonical: !0 }, ":u7121:": { unicode: ["1f21a-fe0f", "1f21a"], fname: "1f21a", uc: "1f21a", isCanonical: !0 }, ":u6307:": { unicode: ["1f22f-fe0f", "1f22f"], fname: "1f22f", uc: "1f22f", isCanonical: !0 }, ":u6708:": { unicode: ["1f237-fe0f", "1f237"], fname: "1f237", uc: "1f237", isCanonical: !0 }, ":film_frames:": { unicode: ["1f39e-fe0f", "1f39e"], fname: "1f39e", uc: "1f39e", isCanonical: !0 }, ":tickets:": { unicode: ["1f39f-fe0f", "1f39f"], fname: "1f39f", uc: "1f39f", isCanonical: !0 }, ":admission_tickets:": { unicode: ["1f39f-fe0f", "1f39f"], fname: "1f39f", uc: "1f39f", isCanonical: !1 }, ":lifter:": { unicode: ["1f3cb-fe0f", "1f3cb"], fname: "1f3cb", uc: "1f3cb", isCanonical: !0 }, ":weight_lifter:": { unicode: ["1f3cb-fe0f", "1f3cb"], fname: "1f3cb", uc: "1f3cb", isCanonical: !1 }, ":golfer:": { unicode: ["1f3cc-fe0f", "1f3cc"], fname: "1f3cc", uc: "1f3cc", isCanonical: !0 }, ":motorcycle:": { unicode: ["1f3cd-fe0f", "1f3cd"], fname: "1f3cd", uc: "1f3cd", isCanonical: !0 }, ":racing_motorcycle:": { unicode: ["1f3cd-fe0f", "1f3cd"], fname: "1f3cd", uc: "1f3cd", isCanonical: !1 }, ":race_car:": { unicode: ["1f3ce-fe0f", "1f3ce"], fname: "1f3ce", uc: "1f3ce", isCanonical: !0 }, ":racing_car:": { unicode: ["1f3ce-fe0f", "1f3ce"], fname: "1f3ce", uc: "1f3ce", isCanonical: !1 }, ":military_medal:": { unicode: ["1f396-fe0f", "1f396"], fname: "1f396", uc: "1f396", isCanonical: !0 }, ":reminder_ribbon:": { unicode: ["1f397-fe0f", "1f397"], fname: "1f397", uc: "1f397", isCanonical: !0 }, ":hot_pepper:": { unicode: ["1f336-fe0f", "1f336"], fname: "1f336", uc: "1f336", isCanonical: !0 }, ":cloud_rain:": { unicode: ["1f327-fe0f", "1f327"], fname: "1f327", uc: "1f327", isCanonical: !0 }, ":cloud_with_rain:": { unicode: ["1f327-fe0f", "1f327"], fname: "1f327", uc: "1f327", isCanonical: !1 }, ":cloud_snow:": { unicode: ["1f328-fe0f", "1f328"], fname: "1f328", uc: "1f328", isCanonical: !0 }, ":cloud_with_snow:": { unicode: ["1f328-fe0f", "1f328"], fname: "1f328", uc: "1f328", isCanonical: !1 }, ":cloud_lightning:": { unicode: ["1f329-fe0f", "1f329"], fname: "1f329", uc: "1f329", isCanonical: !0 }, ":cloud_with_lightning:": { unicode: ["1f329-fe0f", "1f329"], fname: "1f329", uc: "1f329", isCanonical: !1 }, ":cloud_tornado:": { unicode: ["1f32a-fe0f", "1f32a"], fname: "1f32a", uc: "1f32a", isCanonical: !0 }, ":cloud_with_tornado:": { unicode: ["1f32a-fe0f", "1f32a"], fname: "1f32a", uc: "1f32a", isCanonical: !1 }, ":fog:": { unicode: ["1f32b-fe0f", "1f32b"], fname: "1f32b", uc: "1f32b", isCanonical: !0 }, ":wind_blowing_face:": { unicode: ["1f32c-fe0f", "1f32c"], fname: "1f32c", uc: "1f32c", isCanonical: !0 }, ":chipmunk:": { unicode: ["1f43f-fe0f", "1f43f"], fname: "1f43f", uc: "1f43f", isCanonical: !0 }, ":spider:": { unicode: ["1f577-fe0f", "1f577"], fname: "1f577", uc: "1f577", isCanonical: !0 }, ":spider_web:": { unicode: ["1f578-fe0f", "1f578"], fname: "1f578", uc: "1f578", isCanonical: !0 }, ":thermometer:": { unicode: ["1f321-fe0f", "1f321"], fname: "1f321", uc: "1f321", isCanonical: !0 }, ":microphone2:": { unicode: ["1f399-fe0f", "1f399"], fname: "1f399", uc: "1f399", isCanonical: !0 }, ":studio_microphone:": { unicode: ["1f399-fe0f", "1f399"], fname: "1f399", uc: "1f399", isCanonical: !1 }, ":level_slider:": { unicode: ["1f39a-fe0f", "1f39a"], fname: "1f39a", uc: "1f39a", isCanonical: !0 }, ":control_knobs:": { unicode: ["1f39b-fe0f", "1f39b"], fname: "1f39b", uc: "1f39b", isCanonical: !0 }, ":flag_white:": { unicode: ["1f3f3-fe0f", "1f3f3"], fname: "1f3f3", uc: "1f3f3", isCanonical: !0 }, ":waving_white_flag:": { unicode: ["1f3f3-fe0f", "1f3f3"], fname: "1f3f3", uc: "1f3f3", isCanonical: !1 }, ":rosette:": { unicode: ["1f3f5-fe0f", "1f3f5"], fname: "1f3f5", uc: "1f3f5", isCanonical: !0 }, ":label:": { unicode: ["1f3f7-fe0f", "1f3f7"], fname: "1f3f7", uc: "1f3f7", isCanonical: !0 }, ":projector:": { unicode: ["1f4fd-fe0f", "1f4fd"], fname: "1f4fd", uc: "1f4fd", isCanonical: !0 }, ":film_projector:": { unicode: ["1f4fd-fe0f", "1f4fd"], fname: "1f4fd", uc: "1f4fd", isCanonical: !1 }, ":om_symbol:": { unicode: ["1f549-fe0f", "1f549"], fname: "1f549", uc: "1f549", isCanonical: !0 }, ":dove:": { unicode: ["1f54a-fe0f", "1f54a"], fname: "1f54a", uc: "1f54a", isCanonical: !0 }, ":dove_of_peace:": { unicode: ["1f54a-fe0f", "1f54a"], fname: "1f54a", uc: "1f54a", isCanonical: !1 }, ":candle:": { unicode: ["1f56f-fe0f", "1f56f"], fname: "1f56f", uc: "1f56f", isCanonical: !0 }, ":clock:": { unicode: ["1f570-fe0f", "1f570"], fname: "1f570", uc: "1f570", isCanonical: !0 }, ":mantlepiece_clock:": { unicode: ["1f570-fe0f", "1f570"], fname: "1f570", uc: "1f570", isCanonical: !1 }, ":hole:": { unicode: ["1f573-fe0f", "1f573"], fname: "1f573", uc: "1f573", isCanonical: !0 }, ":dark_sunglasses:": { unicode: ["1f576-fe0f", "1f576"], fname: "1f576", uc: "1f576", isCanonical: !0 }, ":joystick:": { unicode: ["1f579-fe0f", "1f579"], fname: "1f579", uc: "1f579", isCanonical: !0 }, ":paperclips:": { unicode: ["1f587-fe0f", "1f587"], fname: "1f587", uc: "1f587", isCanonical: !0 }, ":linked_paperclips:": { unicode: ["1f587-fe0f", "1f587"], fname: "1f587", uc: "1f587", isCanonical: !1 }, ":pen_ballpoint:": { unicode: ["1f58a-fe0f", "1f58a"], fname: "1f58a", uc: "1f58a", isCanonical: !0 }, ":lower_left_ballpoint_pen:": { unicode: ["1f58a-fe0f", "1f58a"], fname: "1f58a", uc: "1f58a", isCanonical: !1 }, ":pen_fountain:": { unicode: ["1f58b-fe0f", "1f58b"], fname: "1f58b", uc: "1f58b", isCanonical: !0 }, ":lower_left_fountain_pen:": { unicode: ["1f58b-fe0f", "1f58b"], fname: "1f58b", uc: "1f58b", isCanonical: !1 }, ":paintbrush:": { unicode: ["1f58c-fe0f", "1f58c"], fname: "1f58c", uc: "1f58c", isCanonical: !0 }, ":lower_left_paintbrush:": { unicode: ["1f58c-fe0f", "1f58c"], fname: "1f58c", uc: "1f58c", isCanonical: !1 }, ":crayon:": { unicode: ["1f58d-fe0f", "1f58d"], fname: "1f58d", uc: "1f58d", isCanonical: !0 }, ":lower_left_crayon:": { unicode: ["1f58d-fe0f", "1f58d"], fname: "1f58d", uc: "1f58d", isCanonical: !1 }, ":desktop:": { unicode: ["1f5a5-fe0f", "1f5a5"], fname: "1f5a5", uc: "1f5a5", isCanonical: !0 }, ":desktop_computer:": { unicode: ["1f5a5-fe0f", "1f5a5"], fname: "1f5a5", uc: "1f5a5", isCanonical: !1 }, ":printer:": { unicode: ["1f5a8-fe0f", "1f5a8"], fname: "1f5a8", uc: "1f5a8", isCanonical: !0 }, ":trackball:": { unicode: ["1f5b2-fe0f", "1f5b2"], fname: "1f5b2", uc: "1f5b2", isCanonical: !0 }, ":frame_photo:": { unicode: ["1f5bc-fe0f", "1f5bc"], fname: "1f5bc", uc: "1f5bc", isCanonical: !0 }, ":frame_with_picture:": { unicode: ["1f5bc-fe0f", "1f5bc"], fname: "1f5bc", uc: "1f5bc", isCanonical: !1 }, ":dividers:": { unicode: ["1f5c2-fe0f", "1f5c2"], fname: "1f5c2", uc: "1f5c2", isCanonical: !0 }, ":card_index_dividers:": { unicode: ["1f5c2-fe0f", "1f5c2"], fname: "1f5c2", uc: "1f5c2", isCanonical: !1 }, ":card_box:": { unicode: ["1f5c3-fe0f", "1f5c3"], fname: "1f5c3", uc: "1f5c3", isCanonical: !0 }, ":card_file_box:": { unicode: ["1f5c3-fe0f", "1f5c3"], fname: "1f5c3", uc: "1f5c3", isCanonical: !1 }, ":file_cabinet:": { unicode: ["1f5c4-fe0f", "1f5c4"], fname: "1f5c4", uc: "1f5c4", isCanonical: !0 }, ":wastebasket:": { unicode: ["1f5d1-fe0f", "1f5d1"], fname: "1f5d1", uc: "1f5d1", isCanonical: !0 }, ":notepad_spiral:": { unicode: ["1f5d2-fe0f", "1f5d2"], fname: "1f5d2", uc: "1f5d2", isCanonical: !0 }, ":spiral_note_pad:": { unicode: ["1f5d2-fe0f", "1f5d2"], fname: "1f5d2", uc: "1f5d2", isCanonical: !1 }, ":calendar_spiral:": { unicode: ["1f5d3-fe0f", "1f5d3"], fname: "1f5d3", uc: "1f5d3", isCanonical: !0 }, ":spiral_calendar_pad:": { unicode: ["1f5d3-fe0f", "1f5d3"], fname: "1f5d3", uc: "1f5d3", isCanonical: !1 }, ":compression:": { unicode: ["1f5dc-fe0f", "1f5dc"], fname: "1f5dc", uc: "1f5dc", isCanonical: !0 }, ":key2:": { unicode: ["1f5dd-fe0f", "1f5dd"], fname: "1f5dd", uc: "1f5dd", isCanonical: !0 }, ":old_key:": { unicode: ["1f5dd-fe0f", "1f5dd"], fname: "1f5dd", uc: "1f5dd", isCanonical: !1 }, ":newspaper2:": { unicode: ["1f5de-fe0f", "1f5de"], fname: "1f5de", uc: "1f5de", isCanonical: !0 }, ":rolled_up_newspaper:": { unicode: ["1f5de-fe0f", "1f5de"], fname: "1f5de", uc: "1f5de", isCanonical: !1 }, ":dagger:": { unicode: ["1f5e1-fe0f", "1f5e1"], fname: "1f5e1", uc: "1f5e1", isCanonical: !0 }, ":dagger_knife:": { unicode: ["1f5e1-fe0f", "1f5e1"], fname: "1f5e1", uc: "1f5e1", isCanonical: !1 }, ":speaking_head:": { unicode: ["1f5e3-fe0f", "1f5e3"], fname: "1f5e3", uc: "1f5e3", isCanonical: !0 }, ":speaking_head_in_silhouette:": { unicode: ["1f5e3-fe0f", "1f5e3"], fname: "1f5e3", uc: "1f5e3", isCanonical: !1 }, ":speech_left:": { unicode: ["1f5e8-fe0f", "1f5e8"], fname: "1f5e8", uc: "1f5e8", isCanonical: !0 }, ":left_speech_bubble:": { unicode: ["1f5e8-fe0f", "1f5e8"], fname: "1f5e8", uc: "1f5e8", isCanonical: !1 }, ":anger_right:": { unicode: ["1f5ef-fe0f", "1f5ef"], fname: "1f5ef", uc: "1f5ef", isCanonical: !0 }, ":right_anger_bubble:": { unicode: ["1f5ef-fe0f", "1f5ef"], fname: "1f5ef", uc: "1f5ef", isCanonical: !1 }, ":ballot_box:": { unicode: ["1f5f3-fe0f", "1f5f3"], fname: "1f5f3", uc: "1f5f3", isCanonical: !0 }, ":ballot_box_with_ballot:": { unicode: ["1f5f3-fe0f", "1f5f3"], fname: "1f5f3", uc: "1f5f3", isCanonical: !1 }, ":map:": { unicode: ["1f5fa-fe0f", "1f5fa"], fname: "1f5fa", uc: "1f5fa", isCanonical: !0 }, ":world_map:": { unicode: ["1f5fa-fe0f", "1f5fa"], fname: "1f5fa", uc: "1f5fa", isCanonical: !1 }, ":tools:": { unicode: ["1f6e0-fe0f", "1f6e0"], fname: "1f6e0", uc: "1f6e0", isCanonical: !0 }, ":hammer_and_wrench:": { unicode: ["1f6e0-fe0f", "1f6e0"], fname: "1f6e0", uc: "1f6e0", isCanonical: !1 }, ":shield:": { unicode: ["1f6e1-fe0f", "1f6e1"], fname: "1f6e1", uc: "1f6e1", isCanonical: !0 }, ":oil:": { unicode: ["1f6e2-fe0f", "1f6e2"], fname: "1f6e2", uc: "1f6e2", isCanonical: !0 }, ":oil_drum:": { unicode: ["1f6e2-fe0f", "1f6e2"], fname: "1f6e2", uc: "1f6e2", isCanonical: !1 }, ":satellite_orbital:": { unicode: ["1f6f0-fe0f", "1f6f0"], fname: "1f6f0", uc: "1f6f0", isCanonical: !0 }, ":fork_knife_plate:": { unicode: ["1f37d-fe0f", "1f37d"], fname: "1f37d", uc: "1f37d", isCanonical: !0 }, ":fork_and_knife_with_plate:": { unicode: ["1f37d-fe0f", "1f37d"], fname: "1f37d", uc: "1f37d", isCanonical: !1 }, ":eye:": { unicode: ["1f441-fe0f", "1f441"], fname: "1f441", uc: "1f441", isCanonical: !0 }, ":levitate:": { unicode: ["1f574-fe0f", "1f574"], fname: "1f574", uc: "1f574", isCanonical: !0 }, ":man_in_business_suit_levitating:": { unicode: ["1f574-fe0f", "1f574"], fname: "1f574", uc: "1f574", isCanonical: !1 }, ":spy:": { unicode: ["1f575-fe0f", "1f575"], fname: "1f575", uc: "1f575", isCanonical: !0 }, ":sleuth_or_spy:": { unicode: ["1f575-fe0f", "1f575"], fname: "1f575", uc: "1f575", isCanonical: !1 }, ":hand_splayed:": { unicode: ["1f590-fe0f", "1f590"], fname: "1f590", uc: "1f590", isCanonical: !0 }, ":raised_hand_with_fingers_splayed:": { unicode: ["1f590-fe0f", "1f590"], fname: "1f590", uc: "1f590", isCanonical: !1 }, ":mountain_snow:": { unicode: ["1f3d4-fe0f", "1f3d4"], fname: "1f3d4", uc: "1f3d4", isCanonical: !0 }, ":snow_capped_mountain:": { unicode: ["1f3d4-fe0f", "1f3d4"], fname: "1f3d4", uc: "1f3d4", isCanonical: !1 }, ":camping:": { unicode: ["1f3d5-fe0f", "1f3d5"], fname: "1f3d5", uc: "1f3d5", isCanonical: !0 }, ":beach:": { unicode: ["1f3d6-fe0f", "1f3d6"], fname: "1f3d6", uc: "1f3d6", isCanonical: !0 }, ":beach_with_umbrella:": { unicode: ["1f3d6-fe0f", "1f3d6"], fname: "1f3d6", uc: "1f3d6", isCanonical: !1 }, ":construction_site:": { unicode: ["1f3d7-fe0f", "1f3d7"], fname: "1f3d7", uc: "1f3d7", isCanonical: !0 }, ":building_construction:": { unicode: ["1f3d7-fe0f", "1f3d7"], fname: "1f3d7", uc: "1f3d7", isCanonical: !1 }, ":homes:": { unicode: ["1f3d8-fe0f", "1f3d8"], fname: "1f3d8", uc: "1f3d8", isCanonical: !0 }, ":house_buildings:": { unicode: ["1f3d8-fe0f", "1f3d8"], fname: "1f3d8", uc: "1f3d8", isCanonical: !1 }, ":cityscape:": { unicode: ["1f3d9-fe0f", "1f3d9"], fname: "1f3d9", uc: "1f3d9", isCanonical: !0 }, ":house_abandoned:": { unicode: ["1f3da-fe0f", "1f3da"], fname: "1f3da", uc: "1f3da", isCanonical: !0 }, ":derelict_house_building:": { unicode: ["1f3da-fe0f", "1f3da"], fname: "1f3da", uc: "1f3da", isCanonical: !1 }, ":classical_building:": { unicode: ["1f3db-fe0f", "1f3db"], fname: "1f3db", uc: "1f3db", isCanonical: !0 }, ":desert:": { unicode: ["1f3dc-fe0f", "1f3dc"], fname: "1f3dc", uc: "1f3dc", isCanonical: !0 }, ":island:": { unicode: ["1f3dd-fe0f", "1f3dd"], fname: "1f3dd", uc: "1f3dd", isCanonical: !0 }, ":desert_island:": { unicode: ["1f3dd-fe0f", "1f3dd"], fname: "1f3dd", uc: "1f3dd", isCanonical: !1 }, ":park:": { unicode: ["1f3de-fe0f", "1f3de"], fname: "1f3de", uc: "1f3de", isCanonical: !0 }, ":national_park:": { unicode: ["1f3de-fe0f", "1f3de"], fname: "1f3de", uc: "1f3de", isCanonical: !1 }, ":stadium:": { unicode: ["1f3df-fe0f", "1f3df"], fname: "1f3df", uc: "1f3df", isCanonical: !0 }, ":couch:": { unicode: ["1f6cb-fe0f", "1f6cb"], fname: "1f6cb", uc: "1f6cb", isCanonical: !0 }, ":couch_and_lamp:": { unicode: ["1f6cb-fe0f", "1f6cb"], fname: "1f6cb", uc: "1f6cb", isCanonical: !1 }, ":shopping_bags:": { unicode: ["1f6cd-fe0f", "1f6cd"], fname: "1f6cd", uc: "1f6cd", isCanonical: !0 }, ":bellhop:": { unicode: ["1f6ce-fe0f", "1f6ce"], fname: "1f6ce", uc: "1f6ce", isCanonical: !0 }, ":bellhop_bell:": { unicode: ["1f6ce-fe0f", "1f6ce"], fname: "1f6ce", uc: "1f6ce", isCanonical: !1 }, ":bed:": { unicode: ["1f6cf-fe0f", "1f6cf"], fname: "1f6cf", uc: "1f6cf", isCanonical: !0 }, ":motorway:": { unicode: ["1f6e3-fe0f", "1f6e3"], fname: "1f6e3", uc: "1f6e3", isCanonical: !0 }, ":railway_track:": { unicode: ["1f6e4-fe0f", "1f6e4"], fname: "1f6e4", uc: "1f6e4", isCanonical: !0 }, ":railroad_track:": { unicode: ["1f6e4-fe0f", "1f6e4"], fname: "1f6e4", uc: "1f6e4", isCanonical: !1 }, ":motorboat:": { unicode: ["1f6e5-fe0f", "1f6e5"], fname: "1f6e5", uc: "1f6e5", isCanonical: !0 }, ":airplane_small:": { unicode: ["1f6e9-fe0f", "1f6e9"], fname: "1f6e9", uc: "1f6e9", isCanonical: !0 }, ":small_airplane:": { unicode: ["1f6e9-fe0f", "1f6e9"], fname: "1f6e9", uc: "1f6e9", isCanonical: !1 }, ":cruise_ship:": { unicode: ["1f6f3-fe0f", "1f6f3"], fname: "1f6f3", uc: "1f6f3", isCanonical: !0 }, ":passenger_ship:": { unicode: ["1f6f3-fe0f", "1f6f3"], fname: "1f6f3", uc: "1f6f3", isCanonical: !1 }, ":white_sun_small_cloud:": { unicode: ["1f324-fe0f", "1f324"], fname: "1f324", uc: "1f324", isCanonical: !0 }, ":white_sun_with_small_cloud:": { unicode: ["1f324-fe0f", "1f324"], fname: "1f324", uc: "1f324", isCanonical: !1 }, ":white_sun_cloud:": { unicode: ["1f325-fe0f", "1f325"], fname: "1f325", uc: "1f325", isCanonical: !0 }, ":white_sun_behind_cloud:": { unicode: ["1f325-fe0f", "1f325"], fname: "1f325", uc: "1f325", isCanonical: !1 }, ":white_sun_rain_cloud:": { unicode: ["1f326-fe0f", "1f326"], fname: "1f326", uc: "1f326", isCanonical: !0 }, ":white_sun_behind_cloud_with_rain:": { unicode: ["1f326-fe0f", "1f326"], fname: "1f326", uc: "1f326", isCanonical: !1 }, ":mouse_three_button:": { unicode: ["1f5b1-fe0f", "1f5b1"], fname: "1f5b1", uc: "1f5b1", isCanonical: !0 }, ":three_button_mouse:": { unicode: ["1f5b1-fe0f", "1f5b1"], fname: "1f5b1", uc: "1f5b1", isCanonical: !1 }, ":point_up_tone1:": { unicode: ["261d-1f3fb"], fname: "261d-1f3fb", uc: "261d-1f3fb", isCanonical: !0 }, ":point_up_tone2:": { unicode: ["261d-1f3fc"], fname: "261d-1f3fc", uc: "261d-1f3fc", isCanonical: !0 }, ":point_up_tone3:": { unicode: ["261d-1f3fd"], fname: "261d-1f3fd", uc: "261d-1f3fd", isCanonical: !0 }, ":point_up_tone4:": { unicode: ["261d-1f3fe"], fname: "261d-1f3fe", uc: "261d-1f3fe", isCanonical: !0 }, ":point_up_tone5:": { unicode: ["261d-1f3ff"], fname: "261d-1f3ff", uc: "261d-1f3ff", isCanonical: !0 }, ":v_tone1:": { unicode: ["270c-1f3fb"], fname: "270c-1f3fb", uc: "270c-1f3fb", isCanonical: !0 }, ":v_tone2:": { unicode: ["270c-1f3fc"], fname: "270c-1f3fc", uc: "270c-1f3fc", isCanonical: !0 }, ":v_tone3:": { unicode: ["270c-1f3fd"], fname: "270c-1f3fd", uc: "270c-1f3fd", isCanonical: !0 }, ":v_tone4:": { unicode: ["270c-1f3fe"], fname: "270c-1f3fe", uc: "270c-1f3fe", isCanonical: !0 }, ":v_tone5:": { unicode: ["270c-1f3ff"], fname: "270c-1f3ff", uc: "270c-1f3ff", isCanonical: !0 }, ":fist_tone1:": { unicode: ["270a-1f3fb"], fname: "270a-1f3fb", uc: "270a-1f3fb", isCanonical: !0 }, ":fist_tone2:": { unicode: ["270a-1f3fc"], fname: "270a-1f3fc", uc: "270a-1f3fc", isCanonical: !0 }, ":fist_tone3:": { unicode: ["270a-1f3fd"], fname: "270a-1f3fd", uc: "270a-1f3fd", isCanonical: !0 }, ":fist_tone4:": { unicode: ["270a-1f3fe"], fname: "270a-1f3fe", uc: "270a-1f3fe", isCanonical: !0 }, ":fist_tone5:": { unicode: ["270a-1f3ff"], fname: "270a-1f3ff", uc: "270a-1f3ff", isCanonical: !0 }, ":raised_hand_tone1:": { unicode: ["270b-1f3fb"], fname: "270b-1f3fb", uc: "270b-1f3fb", isCanonical: !0 }, ":raised_hand_tone2:": { unicode: ["270b-1f3fc"], fname: "270b-1f3fc", uc: "270b-1f3fc", isCanonical: !0 }, ":raised_hand_tone3:": { unicode: ["270b-1f3fd"], fname: "270b-1f3fd", uc: "270b-1f3fd", isCanonical: !0 }, ":raised_hand_tone4:": { unicode: ["270b-1f3fe"], fname: "270b-1f3fe", uc: "270b-1f3fe", isCanonical: !0 }, ":raised_hand_tone5:": { unicode: ["270b-1f3ff"], fname: "270b-1f3ff", uc: "270b-1f3ff", isCanonical: !0 }, ":writing_hand_tone1:": { unicode: ["270d-1f3fb"], fname: "270d-1f3fb", uc: "270d-1f3fb", isCanonical: !0 }, ":writing_hand_tone2:": { unicode: ["270d-1f3fc"], fname: "270d-1f3fc", uc: "270d-1f3fc", isCanonical: !0 }, ":writing_hand_tone3:": { unicode: ["270d-1f3fd"], fname: "270d-1f3fd", uc: "270d-1f3fd", isCanonical: !0 }, ":writing_hand_tone4:": { unicode: ["270d-1f3fe"], fname: "270d-1f3fe", uc: "270d-1f3fe", isCanonical: !0 }, ":writing_hand_tone5:": { unicode: ["270d-1f3ff"], fname: "270d-1f3ff", uc: "270d-1f3ff", isCanonical: !0 }, ":basketball_player_tone1:": { unicode: ["26f9-1f3fb"], fname: "26f9-1f3fb", uc: "26f9-1f3fb", isCanonical: !0 }, ":person_with_ball_tone1:": { unicode: ["26f9-1f3fb"], fname: "26f9-1f3fb", uc: "26f9-1f3fb", isCanonical: !1 }, ":basketball_player_tone2:": { unicode: ["26f9-1f3fc"], fname: "26f9-1f3fc", uc: "26f9-1f3fc", isCanonical: !0 }, ":person_with_ball_tone2:": { unicode: ["26f9-1f3fc"], fname: "26f9-1f3fc", uc: "26f9-1f3fc", isCanonical: !1 }, ":basketball_player_tone3:": { unicode: ["26f9-1f3fd"], fname: "26f9-1f3fd", uc: "26f9-1f3fd", isCanonical: !0 }, ":person_with_ball_tone3:": { unicode: ["26f9-1f3fd"], fname: "26f9-1f3fd", uc: "26f9-1f3fd", isCanonical: !1 }, ":basketball_player_tone4:": { unicode: ["26f9-1f3fe"], fname: "26f9-1f3fe", uc: "26f9-1f3fe", isCanonical: !0 }, ":person_with_ball_tone4:": { unicode: ["26f9-1f3fe"], fname: "26f9-1f3fe", uc: "26f9-1f3fe", isCanonical: !1 }, ":basketball_player_tone5:": { unicode: ["26f9-1f3ff"], fname: "26f9-1f3ff", uc: "26f9-1f3ff", isCanonical: !0 }, ":person_with_ball_tone5:": { unicode: ["26f9-1f3ff"], fname: "26f9-1f3ff", uc: "26f9-1f3ff", isCanonical: !1 }, ":copyright:": { unicode: ["00a9-fe0f", "00a9"], fname: "00a9", uc: "00a9", isCanonical: !0 }, ":registered:": { unicode: ["00ae-fe0f", "00ae"], fname: "00ae", uc: "00ae", isCanonical: !0 }, ":bangbang:": { unicode: ["203c-fe0f", "203c"], fname: "203c", uc: "203c", isCanonical: !0 }, ":interrobang:": { unicode: ["2049-fe0f", "2049"], fname: "2049", uc: "2049", isCanonical: !0 }, ":tm:": { unicode: ["2122-fe0f", "2122"], fname: "2122", uc: "2122", isCanonical: !0 }, ":information_source:": { unicode: ["2139-fe0f", "2139"], fname: "2139", uc: "2139", isCanonical: !0 }, ":left_right_arrow:": { unicode: ["2194-fe0f", "2194"], fname: "2194", uc: "2194", isCanonical: !0 }, ":arrow_up_down:": { unicode: ["2195-fe0f", "2195"], fname: "2195", uc: "2195", isCanonical: !0 }, ":arrow_upper_left:": { unicode: ["2196-fe0f", "2196"], fname: "2196", uc: "2196", isCanonical: !0 }, ":arrow_upper_right:": { unicode: ["2197-fe0f", "2197"], fname: "2197", uc: "2197", isCanonical: !0 }, ":arrow_lower_right:": { unicode: ["2198-fe0f", "2198"], fname: "2198", uc: "2198", isCanonical: !0 }, ":arrow_lower_left:": { unicode: ["2199-fe0f", "2199"], fname: "2199", uc: "2199", isCanonical: !0 }, ":leftwards_arrow_with_hook:": { unicode: ["21a9-fe0f", "21a9"], fname: "21a9", uc: "21a9", isCanonical: !0 }, ":arrow_right_hook:": { unicode: ["21aa-fe0f", "21aa"], fname: "21aa", uc: "21aa", isCanonical: !0 }, ":watch:": { unicode: ["231a-fe0f", "231a"], fname: "231a", uc: "231a", isCanonical: !0 }, ":hourglass:": { unicode: ["231b-fe0f", "231b"], fname: "231b", uc: "231b", isCanonical: !0 }, ":m:": { unicode: ["24c2-fe0f", "24c2"], fname: "24c2", uc: "24c2", isCanonical: !0 }, ":black_small_square:": { unicode: ["25aa-fe0f", "25aa"], fname: "25aa", uc: "25aa", isCanonical: !0 }, ":white_small_square:": { unicode: ["25ab-fe0f", "25ab"], fname: "25ab", uc: "25ab", isCanonical: !0 }, ":arrow_forward:": { unicode: ["25b6-fe0f", "25b6"], fname: "25b6", uc: "25b6", isCanonical: !0 }, ":arrow_backward:": { unicode: ["25c0-fe0f", "25c0"], fname: "25c0", uc: "25c0", isCanonical: !0 }, ":white_medium_square:": { unicode: ["25fb-fe0f", "25fb"], fname: "25fb", uc: "25fb", isCanonical: !0 }, ":black_medium_square:": { unicode: ["25fc-fe0f", "25fc"], fname: "25fc", uc: "25fc", isCanonical: !0 }, ":white_medium_small_square:": { unicode: ["25fd-fe0f", "25fd"], fname: "25fd", uc: "25fd", isCanonical: !0 }, ":black_medium_small_square:": { unicode: ["25fe-fe0f", "25fe"], fname: "25fe", uc: "25fe", isCanonical: !0 }, ":sunny:": { unicode: ["2600-fe0f", "2600"], fname: "2600", uc: "2600", isCanonical: !0 }, ":cloud:": { unicode: ["2601-fe0f", "2601"], fname: "2601", uc: "2601", isCanonical: !0 }, ":telephone:": { unicode: ["260e-fe0f", "260e"], fname: "260e", uc: "260e", isCanonical: !0 }, ":ballot_box_with_check:": { unicode: ["2611-fe0f", "2611"], fname: "2611", uc: "2611", isCanonical: !0 }, ":umbrella:": { unicode: ["2614-fe0f", "2614"], fname: "2614", uc: "2614", isCanonical: !0 }, ":coffee:": { unicode: ["2615-fe0f", "2615"], fname: "2615", uc: "2615", isCanonical: !0 }, ":point_up:": { unicode: ["261d-fe0f", "261d"], fname: "261d", uc: "261d", isCanonical: !0 }, ":relaxed:": { unicode: ["263a-fe0f", "263a"], fname: "263a", uc: "263a", isCanonical: !0 }, ":aries:": { unicode: ["2648-fe0f", "2648"], fname: "2648", uc: "2648", isCanonical: !0 }, ":taurus:": { unicode: ["2649-fe0f", "2649"], fname: "2649", uc: "2649", isCanonical: !0 }, ":gemini:": { unicode: ["264a-fe0f", "264a"], fname: "264a", uc: "264a", isCanonical: !0 }, ":cancer:": { unicode: ["264b-fe0f", "264b"], fname: "264b", uc: "264b", isCanonical: !0 }, ":leo:": { unicode: ["264c-fe0f", "264c"], fname: "264c", uc: "264c", isCanonical: !0 }, ":virgo:": { unicode: ["264d-fe0f", "264d"], fname: "264d", uc: "264d", isCanonical: !0 }, ":libra:": { unicode: ["264e-fe0f", "264e"], fname: "264e", uc: "264e", isCanonical: !0 }, ":scorpius:": { unicode: ["264f-fe0f", "264f"], fname: "264f", uc: "264f", isCanonical: !0 }, ":sagittarius:": { unicode: ["2650-fe0f", "2650"], fname: "2650", uc: "2650", isCanonical: !0 }, ":capricorn:": { unicode: ["2651-fe0f", "2651"], fname: "2651", uc: "2651", isCanonical: !0 }, ":aquarius:": { unicode: ["2652-fe0f", "2652"], fname: "2652", uc: "2652", isCanonical: !0 }, ":pisces:": { unicode: ["2653-fe0f", "2653"], fname: "2653", uc: "2653", isCanonical: !0 }, ":spades:": { unicode: ["2660-fe0f", "2660"], fname: "2660", uc: "2660", isCanonical: !0 }, ":clubs:": { unicode: ["2663-fe0f", "2663"], fname: "2663", uc: "2663", isCanonical: !0 }, ":hearts:": { unicode: ["2665-fe0f", "2665"], fname: "2665", uc: "2665", isCanonical: !0 }, ":diamonds:": { unicode: ["2666-fe0f", "2666"], fname: "2666", uc: "2666", isCanonical: !0 }, ":hotsprings:": { unicode: ["2668-fe0f", "2668"], fname: "2668", uc: "2668", isCanonical: !0 }, ":recycle:": { unicode: ["267b-fe0f", "267b"], fname: "267b", uc: "267b", isCanonical: !0 }, ":wheelchair:": { unicode: ["267f-fe0f", "267f"], fname: "267f", uc: "267f", isCanonical: !0 }, ":anchor:": { unicode: ["2693-fe0f", "2693"], fname: "2693", uc: "2693", isCanonical: !0 }, ":warning:": { unicode: ["26a0-fe0f", "26a0"], fname: "26a0", uc: "26a0", isCanonical: !0 }, ":zap:": { unicode: ["26a1-fe0f", "26a1"], fname: "26a1", uc: "26a1", isCanonical: !0 }, ":white_circle:": { unicode: ["26aa-fe0f", "26aa"], fname: "26aa", uc: "26aa", isCanonical: !0 }, ":black_circle:": { unicode: ["26ab-fe0f", "26ab"], fname: "26ab", uc: "26ab", isCanonical: !0 }, ":soccer:": { unicode: ["26bd-fe0f", "26bd"], fname: "26bd", uc: "26bd", isCanonical: !0 }, ":baseball:": { unicode: ["26be-fe0f", "26be"], fname: "26be", uc: "26be", isCanonical: !0 }, ":snowman:": { unicode: ["26c4-fe0f", "26c4"], fname: "26c4", uc: "26c4", isCanonical: !0 }, ":partly_sunny:": { unicode: ["26c5-fe0f", "26c5"], fname: "26c5", uc: "26c5", isCanonical: !0 }, ":no_entry:": { unicode: ["26d4-fe0f", "26d4"], fname: "26d4", uc: "26d4", isCanonical: !0 }, ":church:": { unicode: ["26ea-fe0f", "26ea"], fname: "26ea", uc: "26ea", isCanonical: !0 }, ":fountain:": { unicode: ["26f2-fe0f", "26f2"], fname: "26f2", uc: "26f2", isCanonical: !0 }, ":golf:": { unicode: ["26f3-fe0f", "26f3"], fname: "26f3", uc: "26f3", isCanonical: !0 }, ":sailboat:": { unicode: ["26f5-fe0f", "26f5"], fname: "26f5", uc: "26f5", isCanonical: !0 }, ":tent:": { unicode: ["26fa-fe0f", "26fa"], fname: "26fa", uc: "26fa", isCanonical: !0 }, ":fuelpump:": { unicode: ["26fd-fe0f", "26fd"], fname: "26fd", uc: "26fd", isCanonical: !0 }, ":scissors:": { unicode: ["2702-fe0f", "2702"], fname: "2702", uc: "2702", isCanonical: !0 }, ":airplane:": { unicode: ["2708-fe0f", "2708"], fname: "2708", uc: "2708", isCanonical: !0 }, ":envelope:": { unicode: ["2709-fe0f", "2709"], fname: "2709", uc: "2709", isCanonical: !0 }, ":v:": { unicode: ["270c-fe0f", "270c"], fname: "270c", uc: "270c", isCanonical: !0 }, ":pencil2:": { unicode: ["270f-fe0f", "270f"], fname: "270f", uc: "270f", isCanonical: !0 }, ":black_nib:": { unicode: ["2712-fe0f", "2712"], fname: "2712", uc: "2712", isCanonical: !0 }, ":heavy_check_mark:": { unicode: ["2714-fe0f", "2714"], fname: "2714", uc: "2714", isCanonical: !0 }, ":heavy_multiplication_x:": { unicode: ["2716-fe0f", "2716"], fname: "2716", uc: "2716", isCanonical: !0 }, ":eight_spoked_asterisk:": { unicode: ["2733-fe0f", "2733"], fname: "2733", uc: "2733", isCanonical: !0 }, ":eight_pointed_black_star:": { unicode: ["2734-fe0f", "2734"], fname: "2734", uc: "2734", isCanonical: !0 }, ":snowflake:": { unicode: ["2744-fe0f", "2744"], fname: "2744", uc: "2744", isCanonical: !0 }, ":sparkle:": { unicode: ["2747-fe0f", "2747"], fname: "2747", uc: "2747", isCanonical: !0 }, ":exclamation:": { unicode: ["2757-fe0f", "2757"], fname: "2757", uc: "2757", isCanonical: !0 }, ":heart:": { unicode: ["2764-fe0f", "2764"], fname: "2764", uc: "2764", isCanonical: !0 }, ":arrow_right:": { unicode: ["27a1-fe0f", "27a1"], fname: "27a1", uc: "27a1", isCanonical: !0 }, ":arrow_heading_up:": { unicode: ["2934-fe0f", "2934"], fname: "2934", uc: "2934", isCanonical: !0 }, ":arrow_heading_down:": { unicode: ["2935-fe0f", "2935"], fname: "2935", uc: "2935", isCanonical: !0 }, ":arrow_left:": { unicode: ["2b05-fe0f", "2b05"], fname: "2b05", uc: "2b05", isCanonical: !0 }, ":arrow_up:": { unicode: ["2b06-fe0f", "2b06"], fname: "2b06", uc: "2b06", isCanonical: !0 }, ":arrow_down:": { unicode: ["2b07-fe0f", "2b07"], fname: "2b07", uc: "2b07", isCanonical: !0 }, ":black_large_square:": { unicode: ["2b1b-fe0f", "2b1b"], fname: "2b1b", uc: "2b1b", isCanonical: !0 }, ":white_large_square:": { unicode: ["2b1c-fe0f", "2b1c"], fname: "2b1c", uc: "2b1c", isCanonical: !0 }, ":star:": { unicode: ["2b50-fe0f", "2b50"], fname: "2b50", uc: "2b50", isCanonical: !0 }, ":o:": { unicode: ["2b55-fe0f", "2b55"], fname: "2b55", uc: "2b55", isCanonical: !0 }, ":wavy_dash:": { unicode: ["3030-fe0f", "3030"], fname: "3030", uc: "3030", isCanonical: !0 }, ":part_alternation_mark:": { unicode: ["303d-fe0f", "303d"], fname: "303d", uc: "303d", isCanonical: !0 }, ":congratulations:": { unicode: ["3297-fe0f", "3297"], fname: "3297", uc: "3297", isCanonical: !0 }, ":secret:": { unicode: ["3299-fe0f", "3299"], fname: "3299", uc: "3299", isCanonical: !0 }, ":cross:": { unicode: ["271d-fe0f", "271d"], fname: "271d", uc: "271d", isCanonical: !0 }, ":latin_cross:": { unicode: ["271d-fe0f", "271d"], fname: "271d", uc: "271d", isCanonical: !1 }, ":keyboard:": { unicode: ["2328-fe0f", "2328"], fname: "2328", uc: "2328", isCanonical: !0 }, ":writing_hand:": { unicode: ["270d-fe0f", "270d"], fname: "270d", uc: "270d", isCanonical: !0 }, ":eject:": { unicode: ["23cf-fe0f", "23cf"], fname: "23cf", uc: "23cf", isCanonical: !0 }, ":eject_symbol:": { unicode: ["23cf-fe0f", "23cf"], fname: "23cf", uc: "23cf", isCanonical: !1 }, ":track_next:": { unicode: ["23ed-fe0f", "23ed"], fname: "23ed", uc: "23ed", isCanonical: !0 }, ":next_track:": { unicode: ["23ed-fe0f", "23ed"], fname: "23ed", uc: "23ed", isCanonical: !1 }, ":track_previous:": { unicode: ["23ee-fe0f", "23ee"], fname: "23ee", uc: "23ee", isCanonical: !0 }, ":previous_track:": { unicode: ["23ee-fe0f", "23ee"], fname: "23ee", uc: "23ee", isCanonical: !1 }, ":play_pause:": { unicode: ["23ef-fe0f", "23ef"], fname: "23ef", uc: "23ef", isCanonical: !0
    }, ":stopwatch:": { unicode: ["23f1-fe0f", "23f1"], fname: "23f1", uc: "23f1", isCanonical: !0 }, ":timer:": { unicode: ["23f2-fe0f", "23f2"], fname: "23f2", uc: "23f2", isCanonical: !0 }, ":timer_clock:": { unicode: ["23f2-fe0f", "23f2"], fname: "23f2", uc: "23f2", isCanonical: !1 }, ":pause_button:": { unicode: ["23f8-fe0f", "23f8"], fname: "23f8", uc: "23f8", isCanonical: !0 }, ":double_vertical_bar:": { unicode: ["23f8-fe0f", "23f8"], fname: "23f8", uc: "23f8", isCanonical: !1 }, ":stop_button:": { unicode: ["23f9-fe0f", "23f9"], fname: "23f9", uc: "23f9", isCanonical: !0 }, ":record_button:": { unicode: ["23fa-fe0f", "23fa"], fname: "23fa", uc: "23fa", isCanonical: !0 }, ":umbrella2:": { unicode: ["2602-fe0f", "2602"], fname: "2602", uc: "2602", isCanonical: !0 }, ":snowman2:": { unicode: ["2603-fe0f", "2603"], fname: "2603", uc: "2603", isCanonical: !0 }, ":comet:": { unicode: ["2604-fe0f", "2604"], fname: "2604", uc: "2604", isCanonical: !0 }, ":shamrock:": { unicode: ["2618-fe0f", "2618"], fname: "2618", uc: "2618", isCanonical: !0 }, ":skull_crossbones:": { unicode: ["2620-fe0f", "2620"], fname: "2620", uc: "2620", isCanonical: !0 }, ":skull_and_crossbones:": { unicode: ["2620-fe0f", "2620"], fname: "2620", uc: "2620", isCanonical: !1 }, ":radioactive:": { unicode: ["2622-fe0f", "2622"], fname: "2622", uc: "2622", isCanonical: !0 }, ":radioactive_sign:": { unicode: ["2622-fe0f", "2622"], fname: "2622", uc: "2622", isCanonical: !1 }, ":biohazard:": { unicode: ["2623-fe0f", "2623"], fname: "2623", uc: "2623", isCanonical: !0 }, ":biohazard_sign:": { unicode: ["2623-fe0f", "2623"], fname: "2623", uc: "2623", isCanonical: !1 }, ":orthodox_cross:": { unicode: ["2626-fe0f", "2626"], fname: "2626", uc: "2626", isCanonical: !0 }, ":star_and_crescent:": { unicode: ["262a-fe0f", "262a"], fname: "262a", uc: "262a", isCanonical: !0 }, ":peace:": { unicode: ["262e-fe0f", "262e"], fname: "262e", uc: "262e", isCanonical: !0 }, ":peace_symbol:": { unicode: ["262e-fe0f", "262e"], fname: "262e", uc: "262e", isCanonical: !1 }, ":yin_yang:": { unicode: ["262f-fe0f", "262f"], fname: "262f", uc: "262f", isCanonical: !0 }, ":wheel_of_dharma:": { unicode: ["2638-fe0f", "2638"], fname: "2638", uc: "2638", isCanonical: !0 }, ":frowning2:": { unicode: ["2639-fe0f", "2639"], fname: "2639", uc: "2639", isCanonical: !0 }, ":white_frowning_face:": { unicode: ["2639-fe0f", "2639"], fname: "2639", uc: "2639", isCanonical: !1 }, ":hammer_pick:": { unicode: ["2692-fe0f", "2692"], fname: "2692", uc: "2692", isCanonical: !0 }, ":hammer_and_pick:": { unicode: ["2692-fe0f", "2692"], fname: "2692", uc: "2692", isCanonical: !1 }, ":crossed_swords:": { unicode: ["2694-fe0f", "2694"], fname: "2694", uc: "2694", isCanonical: !0 }, ":scales:": { unicode: ["2696-fe0f", "2696"], fname: "2696", uc: "2696", isCanonical: !0 }, ":alembic:": { unicode: ["2697-fe0f", "2697"], fname: "2697", uc: "2697", isCanonical: !0 }, ":gear:": { unicode: ["2699-fe0f", "2699"], fname: "2699", uc: "2699", isCanonical: !0 }, ":atom:": { unicode: ["269b-fe0f", "269b"], fname: "269b", uc: "269b", isCanonical: !0 }, ":atom_symbol:": { unicode: ["269b-fe0f", "269b"], fname: "269b", uc: "269b", isCanonical: !1 }, ":fleur-de-lis:": { unicode: ["269c-fe0f", "269c"], fname: "269c", uc: "269c", isCanonical: !0 }, ":coffin:": { unicode: ["26b0-fe0f", "26b0"], fname: "26b0", uc: "26b0", isCanonical: !0 }, ":urn:": { unicode: ["26b1-fe0f", "26b1"], fname: "26b1", uc: "26b1", isCanonical: !0 }, ":funeral_urn:": { unicode: ["26b1-fe0f", "26b1"], fname: "26b1", uc: "26b1", isCanonical: !1 }, ":thunder_cloud_rain:": { unicode: ["26c8-fe0f", "26c8"], fname: "26c8", uc: "26c8", isCanonical: !0 }, ":thunder_cloud_and_rain:": { unicode: ["26c8-fe0f", "26c8"], fname: "26c8", uc: "26c8", isCanonical: !1 }, ":pick:": { unicode: ["26cf-fe0f", "26cf"], fname: "26cf", uc: "26cf", isCanonical: !0 }, ":helmet_with_cross:": { unicode: ["26d1-fe0f", "26d1"], fname: "26d1", uc: "26d1", isCanonical: !0 }, ":helmet_with_white_cross:": { unicode: ["26d1-fe0f", "26d1"], fname: "26d1", uc: "26d1", isCanonical: !1 }, ":chains:": { unicode: ["26d3-fe0f", "26d3"], fname: "26d3", uc: "26d3", isCanonical: !0 }, ":shinto_shrine:": { unicode: ["26e9-fe0f", "26e9"], fname: "26e9", uc: "26e9", isCanonical: !0 }, ":mountain:": { unicode: ["26f0-fe0f", "26f0"], fname: "26f0", uc: "26f0", isCanonical: !0 }, ":beach_umbrella:": { unicode: ["26f1-fe0f", "26f1"], fname: "26f1", uc: "26f1", isCanonical: !0 }, ":umbrella_on_ground:": { unicode: ["26f1-fe0f", "26f1"], fname: "26f1", uc: "26f1", isCanonical: !1 }, ":ferry:": { unicode: ["26f4-fe0f", "26f4"], fname: "26f4", uc: "26f4", isCanonical: !0 }, ":skier:": { unicode: ["26f7-fe0f", "26f7"], fname: "26f7", uc: "26f7", isCanonical: !0 }, ":ice_skate:": { unicode: ["26f8-fe0f", "26f8"], fname: "26f8", uc: "26f8", isCanonical: !0 }, ":basketball_player:": { unicode: ["26f9-fe0f", "26f9"], fname: "26f9", uc: "26f9", isCanonical: !0 }, ":person_with_ball:": { unicode: ["26f9-fe0f", "26f9"], fname: "26f9", uc: "26f9", isCanonical: !1 }, ":star_of_david:": { unicode: ["2721-fe0f", "2721"], fname: "2721", uc: "2721", isCanonical: !0 }, ":heart_exclamation:": { unicode: ["2763-fe0f", "2763"], fname: "2763", uc: "2763", isCanonical: !0 }, ":heavy_heart_exclamation_mark_ornament:": { unicode: ["2763-fe0f", "2763"], fname: "2763", uc: "2763", isCanonical: !1 }, ":third_place:": { unicode: ["1f949"], fname: "1f949", uc: "1f949", isCanonical: !0 }, ":third_place_medal:": { unicode: ["1f949"], fname: "1f949", uc: "1f949", isCanonical: !1 }, ":second_place:": { unicode: ["1f948"], fname: "1f948", uc: "1f948", isCanonical: !0 }, ":second_place_medal:": { unicode: ["1f948"], fname: "1f948", uc: "1f948", isCanonical: !1 }, ":first_place:": { unicode: ["1f947"], fname: "1f947", uc: "1f947", isCanonical: !0 }, ":first_place_medal:": { unicode: ["1f947"], fname: "1f947", uc: "1f947", isCanonical: !1 }, ":fencer:": { unicode: ["1f93a"], fname: "1f93a", uc: "1f93a", isCanonical: !0 }, ":fencing:": { unicode: ["1f93a"], fname: "1f93a", uc: "1f93a", isCanonical: !1 }, ":goal:": { unicode: ["1f945"], fname: "1f945", uc: "1f945", isCanonical: !0 }, ":goal_net:": { unicode: ["1f945"], fname: "1f945", uc: "1f945", isCanonical: !1 }, ":handball:": { unicode: ["1f93e"], fname: "1f93e", uc: "1f93e", isCanonical: !0 }, ":regional_indicator_z:": { unicode: ["1f1ff"], fname: "1f1ff", uc: "1f1ff", isCanonical: !0 }, ":water_polo:": { unicode: ["1f93d"], fname: "1f93d", uc: "1f93d", isCanonical: !0 }, ":martial_arts_uniform:": { unicode: ["1f94b"], fname: "1f94b", uc: "1f94b", isCanonical: !0 }, ":karate_uniform:": { unicode: ["1f94b"], fname: "1f94b", uc: "1f94b", isCanonical: !1 }, ":boxing_glove:": { unicode: ["1f94a"], fname: "1f94a", uc: "1f94a", isCanonical: !0 }, ":boxing_gloves:": { unicode: ["1f94a"], fname: "1f94a", uc: "1f94a", isCanonical: !1 }, ":wrestlers:": { unicode: ["1f93c"], fname: "1f93c", uc: "1f93c", isCanonical: !0 }, ":wrestling:": { unicode: ["1f93c"], fname: "1f93c", uc: "1f93c", isCanonical: !1 }, ":juggling:": { unicode: ["1f939"], fname: "1f939", uc: "1f939", isCanonical: !0 }, ":juggler:": { unicode: ["1f939"], fname: "1f939", uc: "1f939", isCanonical: !1 }, ":cartwheel:": { unicode: ["1f938"], fname: "1f938", uc: "1f938", isCanonical: !0 }, ":person_doing_cartwheel:": { unicode: ["1f938"], fname: "1f938", uc: "1f938", isCanonical: !1 }, ":canoe:": { unicode: ["1f6f6"], fname: "1f6f6", uc: "1f6f6", isCanonical: !0 }, ":kayak:": { unicode: ["1f6f6"], fname: "1f6f6", uc: "1f6f6", isCanonical: !1 }, ":motor_scooter:": { unicode: ["1f6f5"], fname: "1f6f5", uc: "1f6f5", isCanonical: !0 }, ":motorbike:": { unicode: ["1f6f5"], fname: "1f6f5", uc: "1f6f5", isCanonical: !1 }, ":scooter:": { unicode: ["1f6f4"], fname: "1f6f4", uc: "1f6f4", isCanonical: !0 }, ":shopping_cart:": { unicode: ["1f6d2"], fname: "1f6d2", uc: "1f6d2", isCanonical: !0 }, ":shopping_trolley:": { unicode: ["1f6d2"], fname: "1f6d2", uc: "1f6d2", isCanonical: !1 }, ":black_joker:": { unicode: ["1f0cf"], fname: "1f0cf", uc: "1f0cf", isCanonical: !0 }, ":a:": { unicode: ["1f170"], fname: "1f170", uc: "1f170", isCanonical: !0 }, ":b:": { unicode: ["1f171"], fname: "1f171", uc: "1f171", isCanonical: !0 }, ":o2:": { unicode: ["1f17e"], fname: "1f17e", uc: "1f17e", isCanonical: !0 }, ":octagonal_sign:": { unicode: ["1f6d1"], fname: "1f6d1", uc: "1f6d1", isCanonical: !0 }, ":stop_sign:": { unicode: ["1f6d1"], fname: "1f6d1", uc: "1f6d1", isCanonical: !1 }, ":ab:": { unicode: ["1f18e"], fname: "1f18e", uc: "1f18e", isCanonical: !0 }, ":cl:": { unicode: ["1f191"], fname: "1f191", uc: "1f191", isCanonical: !0 }, ":regional_indicator_y:": { unicode: ["1f1fe"], fname: "1f1fe", uc: "1f1fe", isCanonical: !0 }, ":cool:": { unicode: ["1f192"], fname: "1f192", uc: "1f192", isCanonical: !0 }, ":free:": { unicode: ["1f193"], fname: "1f193", uc: "1f193", isCanonical: !0 }, ":id:": { unicode: ["1f194"], fname: "1f194", uc: "1f194", isCanonical: !0 }, ":new:": { unicode: ["1f195"], fname: "1f195", uc: "1f195", isCanonical: !0 }, ":ng:": { unicode: ["1f196"], fname: "1f196", uc: "1f196", isCanonical: !0 }, ":ok:": { unicode: ["1f197"], fname: "1f197", uc: "1f197", isCanonical: !0 }, ":sos:": { unicode: ["1f198"], fname: "1f198", uc: "1f198", isCanonical: !0 }, ":spoon:": { unicode: ["1f944"], fname: "1f944", uc: "1f944", isCanonical: !0 }, ":up:": { unicode: ["1f199"], fname: "1f199", uc: "1f199", isCanonical: !0 }, ":vs:": { unicode: ["1f19a"], fname: "1f19a", uc: "1f19a", isCanonical: !0 }, ":champagne_glass:": { unicode: ["1f942"], fname: "1f942", uc: "1f942", isCanonical: !0 }, ":clinking_glass:": { unicode: ["1f942"], fname: "1f942", uc: "1f942", isCanonical: !1 }, ":tumbler_glass:": { unicode: ["1f943"], fname: "1f943", uc: "1f943", isCanonical: !0 }, ":whisky:": { unicode: ["1f943"], fname: "1f943", uc: "1f943", isCanonical: !1 }, ":koko:": { unicode: ["1f201"], fname: "1f201", uc: "1f201", isCanonical: !0 }, ":stuffed_flatbread:": { unicode: ["1f959"], fname: "1f959", uc: "1f959", isCanonical: !0 }, ":stuffed_pita:": { unicode: ["1f959"], fname: "1f959", uc: "1f959", isCanonical: !1 }, ":u7981:": { unicode: ["1f232"], fname: "1f232", uc: "1f232", isCanonical: !0 }, ":u7a7a:": { unicode: ["1f233"], fname: "1f233", uc: "1f233", isCanonical: !0 }, ":u5408:": { unicode: ["1f234"], fname: "1f234", uc: "1f234", isCanonical: !0 }, ":u6e80:": { unicode: ["1f235"], fname: "1f235", uc: "1f235", isCanonical: !0 }, ":u6709:": { unicode: ["1f236"], fname: "1f236", uc: "1f236", isCanonical: !0 }, ":shallow_pan_of_food:": { unicode: ["1f958"], fname: "1f958", uc: "1f958", isCanonical: !0 }, ":paella:": { unicode: ["1f958"], fname: "1f958", uc: "1f958", isCanonical: !1 }, ":u7533:": { unicode: ["1f238"], fname: "1f238", uc: "1f238", isCanonical: !0 }, ":u5272:": { unicode: ["1f239"], fname: "1f239", uc: "1f239", isCanonical: !0 }, ":salad:": { unicode: ["1f957"], fname: "1f957", uc: "1f957", isCanonical: !0 }, ":green_salad:": { unicode: ["1f957"], fname: "1f957", uc: "1f957", isCanonical: !1 }, ":u55b6:": { unicode: ["1f23a"], fname: "1f23a", uc: "1f23a", isCanonical: !0 }, ":ideograph_advantage:": { unicode: ["1f250"], fname: "1f250", uc: "1f250", isCanonical: !0 }, ":accept:": { unicode: ["1f251"], fname: "1f251", uc: "1f251", isCanonical: !0 }, ":cyclone:": { unicode: ["1f300"], fname: "1f300", uc: "1f300", isCanonical: !0 }, ":french_bread:": { unicode: ["1f956"], fname: "1f956", uc: "1f956", isCanonical: !0 }, ":baguette_bread:": { unicode: ["1f956"], fname: "1f956", uc: "1f956", isCanonical: !1 }, ":foggy:": { unicode: ["1f301"], fname: "1f301", uc: "1f301", isCanonical: !0 }, ":closed_umbrella:": { unicode: ["1f302"], fname: "1f302", uc: "1f302", isCanonical: !0 }, ":night_with_stars:": { unicode: ["1f303"], fname: "1f303", uc: "1f303", isCanonical: !0 }, ":sunrise_over_mountains:": { unicode: ["1f304"], fname: "1f304", uc: "1f304", isCanonical: !0 }, ":sunrise:": { unicode: ["1f305"], fname: "1f305", uc: "1f305", isCanonical: !0 }, ":city_dusk:": { unicode: ["1f306"], fname: "1f306", uc: "1f306", isCanonical: !0 }, ":carrot:": { unicode: ["1f955"], fname: "1f955", uc: "1f955", isCanonical: !0 }, ":city_sunset:": { unicode: ["1f307"], fname: "1f307", uc: "1f307", isCanonical: !0 }, ":city_sunrise:": { unicode: ["1f307"], fname: "1f307", uc: "1f307", isCanonical: !1 }, ":rainbow:": { unicode: ["1f308"], fname: "1f308", uc: "1f308", isCanonical: !0 }, ":potato:": { unicode: ["1f954"], fname: "1f954", uc: "1f954", isCanonical: !0 }, ":bridge_at_night:": { unicode: ["1f309"], fname: "1f309", uc: "1f309", isCanonical: !0 }, ":ocean:": { unicode: ["1f30a"], fname: "1f30a", uc: "1f30a", isCanonical: !0 }, ":volcano:": { unicode: ["1f30b"], fname: "1f30b", uc: "1f30b", isCanonical: !0 }, ":milky_way:": { unicode: ["1f30c"], fname: "1f30c", uc: "1f30c", isCanonical: !0 }, ":earth_asia:": { unicode: ["1f30f"], fname: "1f30f", uc: "1f30f", isCanonical: !0 }, ":new_moon:": { unicode: ["1f311"], fname: "1f311", uc: "1f311", isCanonical: !0 }, ":bacon:": { unicode: ["1f953"], fname: "1f953", uc: "1f953", isCanonical: !0 }, ":first_quarter_moon:": { unicode: ["1f313"], fname: "1f313", uc: "1f313", isCanonical: !0 }, ":waxing_gibbous_moon:": { unicode: ["1f314"], fname: "1f314", uc: "1f314", isCanonical: !0 }, ":full_moon:": { unicode: ["1f315"], fname: "1f315", uc: "1f315", isCanonical: !0 }, ":crescent_moon:": { unicode: ["1f319"], fname: "1f319", uc: "1f319", isCanonical: !0 }, ":first_quarter_moon_with_face:": { unicode: ["1f31b"], fname: "1f31b", uc: "1f31b", isCanonical: !0 }, ":star2:": { unicode: ["1f31f"], fname: "1f31f", uc: "1f31f", isCanonical: !0 }, ":cucumber:": { unicode: ["1f952"], fname: "1f952", uc: "1f952", isCanonical: !0 }, ":stars:": { unicode: ["1f320"], fname: "1f320", uc: "1f320", isCanonical: !0 }, ":chestnut:": { unicode: ["1f330"], fname: "1f330", uc: "1f330", isCanonical: !0 }, ":avocado:": { unicode: ["1f951"], fname: "1f951", uc: "1f951", isCanonical: !0 }, ":seedling:": { unicode: ["1f331"], fname: "1f331", uc: "1f331", isCanonical: !0 }, ":palm_tree:": { unicode: ["1f334"], fname: "1f334", uc: "1f334", isCanonical: !0 }, ":cactus:": { unicode: ["1f335"], fname: "1f335", uc: "1f335", isCanonical: !0 }, ":tulip:": { unicode: ["1f337"], fname: "1f337", uc: "1f337", isCanonical: !0 }, ":cherry_blossom:": { unicode: ["1f338"], fname: "1f338", uc: "1f338", isCanonical: !0 }, ":rose:": { unicode: ["1f339"], fname: "1f339", uc: "1f339", isCanonical: !0 }, ":hibiscus:": { unicode: ["1f33a"], fname: "1f33a", uc: "1f33a", isCanonical: !0 }, ":sunflower:": { unicode: ["1f33b"], fname: "1f33b", uc: "1f33b", isCanonical: !0 }, ":blossom:": { unicode: ["1f33c"], fname: "1f33c", uc: "1f33c", isCanonical: !0 }, ":corn:": { unicode: ["1f33d"], fname: "1f33d", uc: "1f33d", isCanonical: !0 }, ":croissant:": { unicode: ["1f950"], fname: "1f950", uc: "1f950", isCanonical: !0 }, ":ear_of_rice:": { unicode: ["1f33e"], fname: "1f33e", uc: "1f33e", isCanonical: !0 }, ":herb:": { unicode: ["1f33f"], fname: "1f33f", uc: "1f33f", isCanonical: !0 }, ":four_leaf_clover:": { unicode: ["1f340"], fname: "1f340", uc: "1f340", isCanonical: !0 }, ":maple_leaf:": { unicode: ["1f341"], fname: "1f341", uc: "1f341", isCanonical: !0 }, ":fallen_leaf:": { unicode: ["1f342"], fname: "1f342", uc: "1f342", isCanonical: !0 }, ":leaves:": { unicode: ["1f343"], fname: "1f343", uc: "1f343", isCanonical: !0 }, ":mushroom:": { unicode: ["1f344"], fname: "1f344", uc: "1f344", isCanonical: !0 }, ":tomato:": { unicode: ["1f345"], fname: "1f345", uc: "1f345", isCanonical: !0 }, ":eggplant:": { unicode: ["1f346"], fname: "1f346", uc: "1f346", isCanonical: !0 }, ":grapes:": { unicode: ["1f347"], fname: "1f347", uc: "1f347", isCanonical: !0 }, ":melon:": { unicode: ["1f348"], fname: "1f348", uc: "1f348", isCanonical: !0 }, ":watermelon:": { unicode: ["1f349"], fname: "1f349", uc: "1f349", isCanonical: !0 }, ":tangerine:": { unicode: ["1f34a"], fname: "1f34a", uc: "1f34a", isCanonical: !0 }, ":wilted_rose:": { unicode: ["1f940"], fname: "1f940", uc: "1f940", isCanonical: !0 }, ":wilted_flower:": { unicode: ["1f940"], fname: "1f940", uc: "1f940", isCanonical: !1 }, ":banana:": { unicode: ["1f34c"], fname: "1f34c", uc: "1f34c", isCanonical: !0 }, ":pineapple:": { unicode: ["1f34d"], fname: "1f34d", uc: "1f34d", isCanonical: !0 }, ":apple:": { unicode: ["1f34e"], fname: "1f34e", uc: "1f34e", isCanonical: !0 }, ":green_apple:": { unicode: ["1f34f"], fname: "1f34f", uc: "1f34f", isCanonical: !0 }, ":peach:": { unicode: ["1f351"], fname: "1f351", uc: "1f351", isCanonical: !0 }, ":cherries:": { unicode: ["1f352"], fname: "1f352", uc: "1f352", isCanonical: !0 }, ":strawberry:": { unicode: ["1f353"], fname: "1f353", uc: "1f353", isCanonical: !0 }, ":rhino:": { unicode: ["1f98f"], fname: "1f98f", uc: "1f98f", isCanonical: !0 }, ":rhinoceros:": { unicode: ["1f98f"], fname: "1f98f", uc: "1f98f", isCanonical: !1 }, ":hamburger:": { unicode: ["1f354"], fname: "1f354", uc: "1f354", isCanonical: !0 }, ":pizza:": { unicode: ["1f355"], fname: "1f355", uc: "1f355", isCanonical: !0 }, ":meat_on_bone:": { unicode: ["1f356"], fname: "1f356", uc: "1f356", isCanonical: !0 }, ":lizard:": { unicode: ["1f98e"], fname: "1f98e", uc: "1f98e", isCanonical: !0 }, ":poultry_leg:": { unicode: ["1f357"], fname: "1f357", uc: "1f357", isCanonical: !0 }, ":rice_cracker:": { unicode: ["1f358"], fname: "1f358", uc: "1f358", isCanonical: !0 }, ":rice_ball:": { unicode: ["1f359"], fname: "1f359", uc: "1f359", isCanonical: !0 }, ":gorilla:": { unicode: ["1f98d"], fname: "1f98d", uc: "1f98d", isCanonical: !0 }, ":rice:": { unicode: ["1f35a"], fname: "1f35a", uc: "1f35a", isCanonical: !0 }, ":curry:": { unicode: ["1f35b"], fname: "1f35b", uc: "1f35b", isCanonical: !0 }, ":deer:": { unicode: ["1f98c"], fname: "1f98c", uc: "1f98c", isCanonical: !0 }, ":ramen:": { unicode: ["1f35c"], fname: "1f35c", uc: "1f35c", isCanonical: !0 }, ":spaghetti:": { unicode: ["1f35d"], fname: "1f35d", uc: "1f35d", isCanonical: !0 }, ":bread:": { unicode: ["1f35e"], fname: "1f35e", uc: "1f35e", isCanonical: !0 }, ":fries:": { unicode: ["1f35f"], fname: "1f35f", uc: "1f35f", isCanonical: !0 }, ":butterfly:": { unicode: ["1f98b"], fname: "1f98b", uc: "1f98b", isCanonical: !0 }, ":sweet_potato:": { unicode: ["1f360"], fname: "1f360", uc: "1f360", isCanonical: !0 }, ":dango:": { unicode: ["1f361"], fname: "1f361", uc: "1f361", isCanonical: !0 }, ":fox:": { unicode: ["1f98a"], fname: "1f98a", uc: "1f98a", isCanonical: !0 }, ":fox_face:": { unicode: ["1f98a"], fname: "1f98a", uc: "1f98a", isCanonical: !1 }, ":oden:": { unicode: ["1f362"], fname: "1f362", uc: "1f362", isCanonical: !0 }, ":sushi:": { unicode: ["1f363"], fname: "1f363", uc: "1f363", isCanonical: !0 }, ":owl:": { unicode: ["1f989"], fname: "1f989", uc: "1f989", isCanonical: !0 }, ":fried_shrimp:": { unicode: ["1f364"], fname: "1f364", uc: "1f364", isCanonical: !0 }, ":fish_cake:": { unicode: ["1f365"], fname: "1f365", uc: "1f365", isCanonical: !0 }, ":shark:": { unicode: ["1f988"], fname: "1f988", uc: "1f988", isCanonical: !0 }, ":icecream:": { unicode: ["1f366"], fname: "1f366", uc: "1f366", isCanonical: !0 }, ":bat:": { unicode: ["1f987"], fname: "1f987", uc: "1f987", isCanonical: !0 }, ":shaved_ice:": { unicode: ["1f367"], fname: "1f367", uc: "1f367", isCanonical: !0 }, ":regional_indicator_x:": { unicode: ["1f1fd"], fname: "1f1fd", uc: "1f1fd", isCanonical: !0 }, ":ice_cream:": { unicode: ["1f368"], fname: "1f368", uc: "1f368", isCanonical: !0 }, ":duck:": { unicode: ["1f986"], fname: "1f986", uc: "1f986", isCanonical: !0 }, ":doughnut:": { unicode: ["1f369"], fname: "1f369", uc: "1f369", isCanonical: !0 }, ":eagle:": { unicode: ["1f985"], fname: "1f985", uc: "1f985", isCanonical: !0 }, ":cookie:": { unicode: ["1f36a"], fname: "1f36a", uc: "1f36a", isCanonical: !0 }, ":black_heart:": { unicode: ["1f5a4"], fname: "1f5a4", uc: "1f5a4", isCanonical: !0 }, ":chocolate_bar:": { unicode: ["1f36b"], fname: "1f36b", uc: "1f36b", isCanonical: !0 }, ":candy:": { unicode: ["1f36c"], fname: "1f36c", uc: "1f36c", isCanonical: !0 }, ":lollipop:": { unicode: ["1f36d"], fname: "1f36d", uc: "1f36d", isCanonical: !0 }, ":custard:": { unicode: ["1f36e"], fname: "1f36e", uc: "1f36e", isCanonical: !0 }, ":pudding:": { unicode: ["1f36e"], fname: "1f36e", uc: "1f36e", isCanonical: !1 }, ":flan:": { unicode: ["1f36e"], fname: "1f36e", uc: "1f36e", isCanonical: !1 }, ":honey_pot:": { unicode: ["1f36f"], fname: "1f36f", uc: "1f36f", isCanonical: !0 }, ":fingers_crossed:": { unicode: ["1f91e"], fname: "1f91e", uc: "1f91e", isCanonical: !0 }, ":hand_with_index_and_middle_finger_crossed:": { unicode: ["1f91e"], fname: "1f91e", uc: "1f91e", isCanonical: !1 }, ":cake:": { unicode: ["1f370"], fname: "1f370", uc: "1f370", isCanonical: !0 }, ":bento:": { unicode: ["1f371"], fname: "1f371", uc: "1f371", isCanonical: !0 }, ":stew:": { unicode: ["1f372"], fname: "1f372", uc: "1f372", isCanonical: !0 }, ":handshake:": { unicode: ["1f91d"], fname: "1f91d", uc: "1f91d", isCanonical: !0 }, ":shaking_hands:": { unicode: ["1f91d"], fname: "1f91d", uc: "1f91d", isCanonical: !1 }, ":cooking:": { unicode: ["1f373"], fname: "1f373", uc: "1f373", isCanonical: !0 }, ":fork_and_knife:": { unicode: ["1f374"], fname: "1f374", uc: "1f374", isCanonical: !0 }, ":tea:": { unicode: ["1f375"], fname: "1f375", uc: "1f375", isCanonical: !0 }, ":sake:": { unicode: ["1f376"], fname: "1f376", uc: "1f376", isCanonical: !0 }, ":wine_glass:": { unicode: ["1f377"], fname: "1f377", uc: "1f377", isCanonical: !0 }, ":cocktail:": { unicode: ["1f378"], fname: "1f378", uc: "1f378", isCanonical: !0 }, ":tropical_drink:": { unicode: ["1f379"], fname: "1f379", uc: "1f379", isCanonical: !0 }, ":beer:": { unicode: ["1f37a"], fname: "1f37a", uc: "1f37a", isCanonical: !0 }, ":beers:": { unicode: ["1f37b"], fname: "1f37b", uc: "1f37b", isCanonical: !0 }, ":ribbon:": { unicode: ["1f380"], fname: "1f380", uc: "1f380", isCanonical: !0 }, ":gift:": { unicode: ["1f381"], fname: "1f381", uc: "1f381", isCanonical: !0 }, ":birthday:": { unicode: ["1f382"], fname: "1f382", uc: "1f382", isCanonical: !0 }, ":jack_o_lantern:": { unicode: ["1f383"], fname: "1f383", uc: "1f383", isCanonical: !0 }, ":left_facing_fist:": { unicode: ["1f91b"], fname: "1f91b", uc: "1f91b", isCanonical: !0 }, ":left_fist:": { unicode: ["1f91b"], fname: "1f91b", uc: "1f91b", isCanonical: !1 }, ":right_facing_fist:": { unicode: ["1f91c"], fname: "1f91c", uc: "1f91c", isCanonical: !0 }, ":right_fist:": { unicode: ["1f91c"], fname: "1f91c", uc: "1f91c", isCanonical: !1 }, ":christmas_tree:": { unicode: ["1f384"], fname: "1f384", uc: "1f384", isCanonical: !0 }, ":santa:": { unicode: ["1f385"], fname: "1f385", uc: "1f385", isCanonical: !0 }, ":fireworks:": { unicode: ["1f386"], fname: "1f386", uc: "1f386", isCanonical: !0 }, ":raised_back_of_hand:": { unicode: ["1f91a"], fname: "1f91a", uc: "1f91a", isCanonical: !0 }, ":back_of_hand:": { unicode: ["1f91a"], fname: "1f91a", uc: "1f91a", isCanonical: !1 }, ":sparkler:": { unicode: ["1f387"], fname: "1f387", uc: "1f387", isCanonical: !0 }, ":balloon:": { unicode: ["1f388"], fname: "1f388", uc: "1f388", isCanonical: !0 }, ":tada:": { unicode: ["1f389"], fname: "1f389", uc: "1f389", isCanonical: !0 }, ":confetti_ball:": { unicode: ["1f38a"], fname: "1f38a", uc: "1f38a", isCanonical: !0 }, ":tanabata_tree:": { unicode: ["1f38b"], fname: "1f38b", uc: "1f38b", isCanonical: !0 }, ":crossed_flags:": { unicode: ["1f38c"], fname: "1f38c", uc: "1f38c", isCanonical: !0 }, ":call_me:": { unicode: ["1f919"], fname: "1f919", uc: "1f919", isCanonical: !0 }, ":call_me_hand:": { unicode: ["1f919"], fname: "1f919", uc: "1f919", isCanonical: !1 }, ":bamboo:": { unicode: ["1f38d"], fname: "1f38d", uc: "1f38d", isCanonical: !0 }, ":man_dancing:": { unicode: ["1f57a"], fname: "1f57a", uc: "1f57a", isCanonical: !0 }, ":male_dancer:": { unicode: ["1f57a"], fname: "1f57a", uc: "1f57a", isCanonical: !1 }, ":dolls:": { unicode: ["1f38e"], fname: "1f38e", uc: "1f38e", isCanonical: !0 }, ":selfie:": { unicode: ["1f933"], fname: "1f933", uc: "1f933", isCanonical: !0 }, ":flags:": { unicode: ["1f38f"], fname: "1f38f", uc: "1f38f", isCanonical: !0 }, ":pregnant_woman:": { unicode: ["1f930"], fname: "1f930", uc: "1f930", isCanonical: !0 }, ":expecting_woman:": { unicode: ["1f930"], fname: "1f930", uc: "1f930", isCanonical: !1 }, ":wind_chime:": { unicode: ["1f390"], fname: "1f390", uc: "1f390", isCanonical: !0 }, ":face_palm:": { unicode: ["1f926"], fname: "1f926", uc: "1f926", isCanonical: !0 }, ":facepalm:": { unicode: ["1f926"], fname: "1f926", uc: "1f926", isCanonical: !1 }, ":shrug:": { unicode: ["1f937"], fname: "1f937", uc: "1f937", isCanonical: !0 }, ":rice_scene:": { unicode: ["1f391"], fname: "1f391", uc: "1f391", isCanonical: !0 }, ":school_satchel:": { unicode: ["1f392"], fname: "1f392", uc: "1f392", isCanonical: !0 }, ":mortar_board:": { unicode: ["1f393"], fname: "1f393", uc: "1f393", isCanonical: !0 }, ":carousel_horse:": { unicode: ["1f3a0"], fname: "1f3a0", uc: "1f3a0", isCanonical: !0 }, ":ferris_wheel:": { unicode: ["1f3a1"], fname: "1f3a1", uc: "1f3a1", isCanonical: !0 }, ":roller_coaster:": { unicode: ["1f3a2"], fname: "1f3a2", uc: "1f3a2", isCanonical: !0 }, ":fishing_pole_and_fish:": { unicode: ["1f3a3"], fname: "1f3a3", uc: "1f3a3", isCanonical: !0 }, ":microphone:": { unicode: ["1f3a4"], fname: "1f3a4", uc: "1f3a4", isCanonical: !0 }, ":movie_camera:": { unicode: ["1f3a5"], fname: "1f3a5", uc: "1f3a5", isCanonical: !0 }, ":cinema:": { unicode: ["1f3a6"], fname: "1f3a6", uc: "1f3a6", isCanonical: !0 }, ":headphones:": { unicode: ["1f3a7"], fname: "1f3a7", uc: "1f3a7", isCanonical: !0 }, ":mrs_claus:": { unicode: ["1f936"], fname: "1f936", uc: "1f936", isCanonical: !0 }, ":mother_christmas:": { unicode: ["1f936"], fname: "1f936", uc: "1f936", isCanonical: !1 }, ":art:": { unicode: ["1f3a8"], fname: "1f3a8", uc: "1f3a8", isCanonical: !0 }, ":man_in_tuxedo:": { unicode: ["1f935"], fname: "1f935", uc: "1f935", isCanonical: !0 }, ":tophat:": { unicode: ["1f3a9"], fname: "1f3a9", uc: "1f3a9", isCanonical: !0 }, ":circus_tent:": { unicode: ["1f3aa"], fname: "1f3aa", uc: "1f3aa", isCanonical: !0 }, ":prince:": { unicode: ["1f934"], fname: "1f934", uc: "1f934", isCanonical: !0 }, ":ticket:": { unicode: ["1f3ab"], fname: "1f3ab", uc: "1f3ab", isCanonical: !0 }, ":clapper:": { unicode: ["1f3ac"], fname: "1f3ac", uc: "1f3ac", isCanonical: !0 }, ":performing_arts:": { unicode: ["1f3ad"], fname: "1f3ad", uc: "1f3ad", isCanonical: !0 }, ":sneezing_face:": { unicode: ["1f927"], fname: "1f927", uc: "1f927", isCanonical: !0 }, ":sneeze:": { unicode: ["1f927"], fname: "1f927", uc: "1f927", isCanonical: !1 }, ":video_game:": { unicode: ["1f3ae"], fname: "1f3ae", uc: "1f3ae", isCanonical: !0 }, ":dart:": { unicode: ["1f3af"], fname: "1f3af", uc: "1f3af", isCanonical: !0 }, ":slot_machine:": { unicode: ["1f3b0"], fname: "1f3b0", uc: "1f3b0", isCanonical: !0 }, ":8ball:": { unicode: ["1f3b1"], fname: "1f3b1", uc: "1f3b1", isCanonical: !0 }, ":game_die:": { unicode: ["1f3b2"], fname: "1f3b2", uc: "1f3b2", isCanonical: !0 }, ":bowling:": { unicode: ["1f3b3"], fname: "1f3b3", uc: "1f3b3", isCanonical: !0 }, ":flower_playing_cards:": { unicode: ["1f3b4"], fname: "1f3b4", uc: "1f3b4", isCanonical: !0 }, ":lying_face:": { unicode: ["1f925"], fname: "1f925", uc: "1f925", isCanonical: !0 }, ":liar:": { unicode: ["1f925"], fname: "1f925", uc: "1f925", isCanonical: !1 }, ":musical_note:": { unicode: ["1f3b5"], fname: "1f3b5", uc: "1f3b5", isCanonical: !0 }, ":notes:": { unicode: ["1f3b6"], fname: "1f3b6", uc: "1f3b6", isCanonical: !0 }, ":saxophone:": { unicode: ["1f3b7"], fname: "1f3b7", uc: "1f3b7", isCanonical: !0 }, ":drooling_face:": { unicode: ["1f924"], fname: "1f924", uc: "1f924", isCanonical: !0 }, ":drool:": { unicode: ["1f924"], fname: "1f924", uc: "1f924", isCanonical: !1 }, ":guitar:": { unicode: ["1f3b8"], fname: "1f3b8", uc: "1f3b8", isCanonical: !0 }, ":musical_keyboard:": { unicode: ["1f3b9"], fname: "1f3b9", uc: "1f3b9", isCanonical: !0 }, ":trumpet:": { unicode: ["1f3ba"], fname: "1f3ba", uc: "1f3ba", isCanonical: !0 }, ":rofl:": { unicode: ["1f923"], fname: "1f923", uc: "1f923", isCanonical: !0 }, ":rolling_on_the_floor_laughing:": { unicode: ["1f923"], fname: "1f923", uc: "1f923", isCanonical: !1 }, ":violin:": { unicode: ["1f3bb"], fname: "1f3bb", uc: "1f3bb", isCanonical: !0 }, ":musical_score:": { unicode: ["1f3bc"], fname: "1f3bc", uc: "1f3bc", isCanonical: !0 }, ":running_shirt_with_sash:": { unicode: ["1f3bd"], fname: "1f3bd", uc: "1f3bd", isCanonical: !0 }, ":nauseated_face:": { unicode: ["1f922"], fname: "1f922", uc: "1f922", isCanonical: !0 }, ":sick:": { unicode: ["1f922"], fname: "1f922", uc: "1f922", isCanonical: !1 }, ":tennis:": { unicode: ["1f3be"], fname: "1f3be", uc: "1f3be", isCanonical: !0 }, ":ski:": { unicode: ["1f3bf"], fname: "1f3bf", uc: "1f3bf", isCanonical: !0 }, ":basketball:": { unicode: ["1f3c0"], fname: "1f3c0", uc: "1f3c0", isCanonical: !0 }, ":checkered_flag:": { unicode: ["1f3c1"], fname: "1f3c1", uc: "1f3c1", isCanonical: !0 }, ":clown:": { unicode: ["1f921"], fname: "1f921", uc: "1f921", isCanonical: !0 }, ":clown_face:": { unicode: ["1f921"], fname: "1f921", uc: "1f921", isCanonical: !1 }, ":snowboarder:": { unicode: ["1f3c2"], fname: "1f3c2", uc: "1f3c2", isCanonical: !0 }, ":runner:": { unicode: ["1f3c3"], fname: "1f3c3", uc: "1f3c3", isCanonical: !0 }, ":surfer:": { unicode: ["1f3c4"], fname: "1f3c4", uc: "1f3c4", isCanonical: !0 }, ":trophy:": { unicode: ["1f3c6"], fname: "1f3c6", uc: "1f3c6", isCanonical: !0 }, ":football:": { unicode: ["1f3c8"], fname: "1f3c8", uc: "1f3c8", isCanonical: !0 }, ":swimmer:": { unicode: ["1f3ca"], fname: "1f3ca", uc: "1f3ca", isCanonical: !0 }, ":house:": { unicode: ["1f3e0"], fname: "1f3e0", uc: "1f3e0", isCanonical: !0 }, ":house_with_garden:": { unicode: ["1f3e1"], fname: "1f3e1", uc: "1f3e1", isCanonical: !0 }, ":office:": { unicode: ["1f3e2"], fname: "1f3e2", uc: "1f3e2", isCanonical: !0 }, ":post_office:": { unicode: ["1f3e3"], fname: "1f3e3", uc: "1f3e3", isCanonical: !0 }, ":hospital:": { unicode: ["1f3e5"], fname: "1f3e5", uc: "1f3e5", isCanonical: !0 }, ":bank:": { unicode: ["1f3e6"], fname: "1f3e6", uc: "1f3e6", isCanonical: !0 }, ":atm:": { unicode: ["1f3e7"], fname: "1f3e7", uc: "1f3e7", isCanonical: !0 }, ":hotel:": { unicode: ["1f3e8"], fname: "1f3e8", uc: "1f3e8", isCanonical: !0 }, ":love_hotel:": { unicode: ["1f3e9"], fname: "1f3e9", uc: "1f3e9", isCanonical: !0 }, ":convenience_store:": { unicode: ["1f3ea"], fname: "1f3ea", uc: "1f3ea", isCanonical: !0 }, ":school:": { unicode: ["1f3eb"], fname: "1f3eb", uc: "1f3eb", isCanonical: !0 }, ":department_store:": { unicode: ["1f3ec"], fname: "1f3ec", uc: "1f3ec", isCanonical: !0 }, ":cowboy:": { unicode: ["1f920"], fname: "1f920", uc: "1f920", isCanonical: !0 }, ":face_with_cowboy_hat:": { unicode: ["1f920"], fname: "1f920", uc: "1f920", isCanonical: !1 }, ":factory:": { unicode: ["1f3ed"], fname: "1f3ed", uc: "1f3ed", isCanonical: !0 }, ":izakaya_lantern:": { unicode: ["1f3ee"], fname: "1f3ee", uc: "1f3ee", isCanonical: !0 }, ":japanese_castle:": { unicode: ["1f3ef"], fname: "1f3ef", uc: "1f3ef", isCanonical: !0 }, ":european_castle:": { unicode: ["1f3f0"], fname: "1f3f0", uc: "1f3f0", isCanonical: !0 }, ":snail:": { unicode: ["1f40c"], fname: "1f40c", uc: "1f40c", isCanonical: !0 }, ":snake:": { unicode: ["1f40d"], fname: "1f40d", uc: "1f40d", isCanonical: !0 }, ":racehorse:": { unicode: ["1f40e"], fname: "1f40e", uc: "1f40e", isCanonical: !0 }, ":sheep:": { unicode: ["1f411"], fname: "1f411", uc: "1f411", isCanonical: !0 }, ":monkey:": { unicode: ["1f412"], fname: "1f412", uc: "1f412", isCanonical: !0 }, ":chicken:": { unicode: ["1f414"], fname: "1f414", uc: "1f414", isCanonical: !0 }, ":boar:": { unicode: ["1f417"], fname: "1f417", uc: "1f417", isCanonical: !0 }, ":elephant:": { unicode: ["1f418"], fname: "1f418", uc: "1f418", isCanonical: !0 }, ":octopus:": { unicode: ["1f419"], fname: "1f419", uc: "1f419", isCanonical: !0 }, ":shell:": { unicode: ["1f41a"], fname: "1f41a", uc: "1f41a", isCanonical: !0 }, ":bug:": { unicode: ["1f41b"], fname: "1f41b", uc: "1f41b", isCanonical: !0 }, ":ant:": { unicode: ["1f41c"], fname: "1f41c", uc: "1f41c", isCanonical: !0 }, ":bee:": { unicode: ["1f41d"], fname: "1f41d", uc: "1f41d", isCanonical: !0 }, ":beetle:": { unicode: ["1f41e"], fname: "1f41e", uc: "1f41e", isCanonical: !0 }, ":fish:": { unicode: ["1f41f"], fname: "1f41f", uc: "1f41f", isCanonical: !0 }, ":tropical_fish:": { unicode: ["1f420"], fname: "1f420", uc: "1f420", isCanonical: !0 }, ":blowfish:": { unicode: ["1f421"], fname: "1f421", uc: "1f421", isCanonical: !0 }, ":turtle:": { unicode: ["1f422"], fname: "1f422", uc: "1f422", isCanonical: !0 }, ":hatching_chick:": { unicode: ["1f423"], fname: "1f423", uc: "1f423", isCanonical: !0 }, ":baby_chick:": { unicode: ["1f424"], fname: "1f424", uc: "1f424", isCanonical: !0 }, ":hatched_chick:": { unicode: ["1f425"], fname: "1f425", uc: "1f425", isCanonical: !0 }, ":bird:": { unicode: ["1f426"], fname: "1f426", uc: "1f426", isCanonical: !0 }, ":penguin:": { unicode: ["1f427"], fname: "1f427", uc: "1f427", isCanonical: !0 }, ":koala:": { unicode: ["1f428"], fname: "1f428", uc: "1f428", isCanonical: !0 }, ":poodle:": { unicode: ["1f429"], fname: "1f429", uc: "1f429", isCanonical: !0 }, ":camel:": { unicode: ["1f42b"], fname: "1f42b", uc: "1f42b", isCanonical: !0 }, ":dolphin:": { unicode: ["1f42c"], fname: "1f42c", uc: "1f42c", isCanonical: !0 }, ":mouse:": { unicode: ["1f42d"], fname: "1f42d", uc: "1f42d", isCanonical: !0 }, ":cow:": { unicode: ["1f42e"], fname: "1f42e", uc: "1f42e", isCanonical: !0 }, ":tiger:": { unicode: ["1f42f"], fname: "1f42f", uc: "1f42f", isCanonical: !0 }, ":rabbit:": { unicode: ["1f430"], fname: "1f430", uc: "1f430", isCanonical: !0 }, ":cat:": { unicode: ["1f431"], fname: "1f431", uc: "1f431", isCanonical: !0 }, ":dragon_face:": { unicode: ["1f432"], fname: "1f432", uc: "1f432", isCanonical: !0 }, ":whale:": { unicode: ["1f433"], fname: "1f433", uc: "1f433", isCanonical: !0 }, ":horse:": { unicode: ["1f434"], fname: "1f434", uc: "1f434", isCanonical: !0 }, ":monkey_face:": { unicode: ["1f435"], fname: "1f435", uc: "1f435", isCanonical: !0 }, ":dog:": { unicode: ["1f436"], fname: "1f436", uc: "1f436", isCanonical: !0 }, ":pig:": { unicode: ["1f437"], fname: "1f437", uc: "1f437", isCanonical: !0 }, ":frog:": { unicode: ["1f438"], fname: "1f438", uc: "1f438", isCanonical: !0 }, ":hamster:": { unicode: ["1f439"], fname: "1f439", uc: "1f439", isCanonical: !0 }, ":wolf:": { unicode: ["1f43a"], fname: "1f43a", uc: "1f43a", isCanonical: !0 }, ":bear:": { unicode: ["1f43b"], fname: "1f43b", uc: "1f43b", isCanonical: !0 }, ":panda_face:": { unicode: ["1f43c"], fname: "1f43c", uc: "1f43c", isCanonical: !0 }, ":pig_nose:": { unicode: ["1f43d"], fname: "1f43d", uc: "1f43d", isCanonical: !0 }, ":feet:": { unicode: ["1f43e"], fname: "1f43e", uc: "1f43e", isCanonical: !0 }, ":paw_prints:": { unicode: ["1f43e"], fname: "1f43e", uc: "1f43e", isCanonical: !1 }, ":eyes:": { unicode: ["1f440"], fname: "1f440", uc: "1f440", isCanonical: !0 }, ":ear:": { unicode: ["1f442"], fname: "1f442", uc: "1f442", isCanonical: !0 }, ":nose:": { unicode: ["1f443"], fname: "1f443", uc: "1f443", isCanonical: !0 }, ":lips:": { unicode: ["1f444"], fname: "1f444", uc: "1f444", isCanonical: !0 }, ":tongue:": { unicode: ["1f445"], fname: "1f445", uc: "1f445", isCanonical: !0 }, ":point_up_2:": { unicode: ["1f446"], fname: "1f446", uc: "1f446", isCanonical: !0 }, ":point_down:": { unicode: ["1f447"], fname: "1f447", uc: "1f447", isCanonical: !0 }, ":point_left:": { unicode: ["1f448"], fname: "1f448", uc: "1f448", isCanonical: !0 }, ":point_right:": { unicode: ["1f449"], fname: "1f449", uc: "1f449", isCanonical: !0 }, ":punch:": { unicode: ["1f44a"], fname: "1f44a", uc: "1f44a", isCanonical: !0 }, ":wave:": { unicode: ["1f44b"], fname: "1f44b", uc: "1f44b", isCanonical: !0 }, ":ok_hand:": { unicode: ["1f44c"], fname: "1f44c", uc: "1f44c", isCanonical: !0 }, ":thumbsup:": { unicode: ["1f44d"], fname: "1f44d", uc: "1f44d", isCanonical: !0 }, ":+1:": { unicode: ["1f44d"], fname: "1f44d", uc: "1f44d", isCanonical: !1 }, ":thumbup:": { unicode: ["1f44d"], fname: "1f44d", uc: "1f44d", isCanonical: !1 }, ":thumbsdown:": { unicode: ["1f44e"], fname: "1f44e", uc: "1f44e", isCanonical: !0 }, ":-1:": { unicode: ["1f44e"], fname: "1f44e", uc: "1f44e", isCanonical: !1 }, ":thumbdown:": { unicode: ["1f44e"], fname: "1f44e", uc: "1f44e", isCanonical: !1 }, ":clap:": { unicode: ["1f44f"], fname: "1f44f", uc: "1f44f", isCanonical: !0 }, ":open_hands:": {
      unicode: ["1f450"], fname: "1f450", uc: "1f450", isCanonical: !0 }, ":crown:": { unicode: ["1f451"], fname: "1f451", uc: "1f451", isCanonical: !0 }, ":womans_hat:": { unicode: ["1f452"], fname: "1f452", uc: "1f452", isCanonical: !0 }, ":eyeglasses:": { unicode: ["1f453"], fname: "1f453", uc: "1f453", isCanonical: !0 }, ":necktie:": { unicode: ["1f454"], fname: "1f454", uc: "1f454", isCanonical: !0 }, ":shirt:": { unicode: ["1f455"], fname: "1f455", uc: "1f455", isCanonical: !0 }, ":jeans:": { unicode: ["1f456"], fname: "1f456", uc: "1f456", isCanonical: !0 }, ":dress:": { unicode: ["1f457"], fname: "1f457", uc: "1f457", isCanonical: !0 }, ":kimono:": { unicode: ["1f458"], fname: "1f458", uc: "1f458", isCanonical: !0 }, ":bikini:": { unicode: ["1f459"], fname: "1f459", uc: "1f459", isCanonical: !0 }, ":womans_clothes:": { unicode: ["1f45a"], fname: "1f45a", uc: "1f45a", isCanonical: !0 }, ":purse:": { unicode: ["1f45b"], fname: "1f45b", uc: "1f45b", isCanonical: !0 }, ":handbag:": { unicode: ["1f45c"], fname: "1f45c", uc: "1f45c", isCanonical: !0 }, ":pouch:": { unicode: ["1f45d"], fname: "1f45d", uc: "1f45d", isCanonical: !0 }, ":mans_shoe:": { unicode: ["1f45e"], fname: "1f45e", uc: "1f45e", isCanonical: !0 }, ":athletic_shoe:": { unicode: ["1f45f"], fname: "1f45f", uc: "1f45f", isCanonical: !0 }, ":high_heel:": { unicode: ["1f460"], fname: "1f460", uc: "1f460", isCanonical: !0 }, ":sandal:": { unicode: ["1f461"], fname: "1f461", uc: "1f461", isCanonical: !0 }, ":boot:": { unicode: ["1f462"], fname: "1f462", uc: "1f462", isCanonical: !0 }, ":footprints:": { unicode: ["1f463"], fname: "1f463", uc: "1f463", isCanonical: !0 }, ":bust_in_silhouette:": { unicode: ["1f464"], fname: "1f464", uc: "1f464", isCanonical: !0 }, ":boy:": { unicode: ["1f466"], fname: "1f466", uc: "1f466", isCanonical: !0 }, ":girl:": { unicode: ["1f467"], fname: "1f467", uc: "1f467", isCanonical: !0 }, ":man:": { unicode: ["1f468"], fname: "1f468", uc: "1f468", isCanonical: !0 }, ":woman:": { unicode: ["1f469"], fname: "1f469", uc: "1f469", isCanonical: !0 }, ":family:": { unicode: ["1f46a"], fname: "1f46a", uc: "1f46a", isCanonical: !0 }, ":couple:": { unicode: ["1f46b"], fname: "1f46b", uc: "1f46b", isCanonical: !0 }, ":cop:": { unicode: ["1f46e"], fname: "1f46e", uc: "1f46e", isCanonical: !0 }, ":dancers:": { unicode: ["1f46f"], fname: "1f46f", uc: "1f46f", isCanonical: !0 }, ":bride_with_veil:": { unicode: ["1f470"], fname: "1f470", uc: "1f470", isCanonical: !0 }, ":person_with_blond_hair:": { unicode: ["1f471"], fname: "1f471", uc: "1f471", isCanonical: !0 }, ":man_with_gua_pi_mao:": { unicode: ["1f472"], fname: "1f472", uc: "1f472", isCanonical: !0 }, ":man_with_turban:": { unicode: ["1f473"], fname: "1f473", uc: "1f473", isCanonical: !0 }, ":older_man:": { unicode: ["1f474"], fname: "1f474", uc: "1f474", isCanonical: !0 }, ":older_woman:": { unicode: ["1f475"], fname: "1f475", uc: "1f475", isCanonical: !0 }, ":grandma:": { unicode: ["1f475"], fname: "1f475", uc: "1f475", isCanonical: !1 }, ":baby:": { unicode: ["1f476"], fname: "1f476", uc: "1f476", isCanonical: !0 }, ":construction_worker:": { unicode: ["1f477"], fname: "1f477", uc: "1f477", isCanonical: !0 }, ":princess:": { unicode: ["1f478"], fname: "1f478", uc: "1f478", isCanonical: !0 }, ":japanese_ogre:": { unicode: ["1f479"], fname: "1f479", uc: "1f479", isCanonical: !0 }, ":japanese_goblin:": { unicode: ["1f47a"], fname: "1f47a", uc: "1f47a", isCanonical: !0 }, ":ghost:": { unicode: ["1f47b"], fname: "1f47b", uc: "1f47b", isCanonical: !0 }, ":angel:": { unicode: ["1f47c"], fname: "1f47c", uc: "1f47c", isCanonical: !0 }, ":alien:": { unicode: ["1f47d"], fname: "1f47d", uc: "1f47d", isCanonical: !0 }, ":space_invader:": { unicode: ["1f47e"], fname: "1f47e", uc: "1f47e", isCanonical: !0 }, ":imp:": { unicode: ["1f47f"], fname: "1f47f", uc: "1f47f", isCanonical: !0 }, ":skull:": { unicode: ["1f480"], fname: "1f480", uc: "1f480", isCanonical: !0 }, ":skeleton:": { unicode: ["1f480"], fname: "1f480", uc: "1f480", isCanonical: !1 }, ":card_index:": { unicode: ["1f4c7"], fname: "1f4c7", uc: "1f4c7", isCanonical: !0 }, ":information_desk_person:": { unicode: ["1f481"], fname: "1f481", uc: "1f481", isCanonical: !0 }, ":guardsman:": { unicode: ["1f482"], fname: "1f482", uc: "1f482", isCanonical: !0 }, ":dancer:": { unicode: ["1f483"], fname: "1f483", uc: "1f483", isCanonical: !0 }, ":lipstick:": { unicode: ["1f484"], fname: "1f484", uc: "1f484", isCanonical: !0 }, ":nail_care:": { unicode: ["1f485"], fname: "1f485", uc: "1f485", isCanonical: !0 }, ":ledger:": { unicode: ["1f4d2"], fname: "1f4d2", uc: "1f4d2", isCanonical: !0 }, ":massage:": { unicode: ["1f486"], fname: "1f486", uc: "1f486", isCanonical: !0 }, ":notebook:": { unicode: ["1f4d3"], fname: "1f4d3", uc: "1f4d3", isCanonical: !0 }, ":haircut:": { unicode: ["1f487"], fname: "1f487", uc: "1f487", isCanonical: !0 }, ":notebook_with_decorative_cover:": { unicode: ["1f4d4"], fname: "1f4d4", uc: "1f4d4", isCanonical: !0 }, ":barber:": { unicode: ["1f488"], fname: "1f488", uc: "1f488", isCanonical: !0 }, ":closed_book:": { unicode: ["1f4d5"], fname: "1f4d5", uc: "1f4d5", isCanonical: !0 }, ":syringe:": { unicode: ["1f489"], fname: "1f489", uc: "1f489", isCanonical: !0 }, ":book:": { unicode: ["1f4d6"], fname: "1f4d6", uc: "1f4d6", isCanonical: !0 }, ":pill:": { unicode: ["1f48a"], fname: "1f48a", uc: "1f48a", isCanonical: !0 }, ":green_book:": { unicode: ["1f4d7"], fname: "1f4d7", uc: "1f4d7", isCanonical: !0 }, ":kiss:": { unicode: ["1f48b"], fname: "1f48b", uc: "1f48b", isCanonical: !0 }, ":blue_book:": { unicode: ["1f4d8"], fname: "1f4d8", uc: "1f4d8", isCanonical: !0 }, ":love_letter:": { unicode: ["1f48c"], fname: "1f48c", uc: "1f48c", isCanonical: !0 }, ":orange_book:": { unicode: ["1f4d9"], fname: "1f4d9", uc: "1f4d9", isCanonical: !0 }, ":ring:": { unicode: ["1f48d"], fname: "1f48d", uc: "1f48d", isCanonical: !0 }, ":books:": { unicode: ["1f4da"], fname: "1f4da", uc: "1f4da", isCanonical: !0 }, ":gem:": { unicode: ["1f48e"], fname: "1f48e", uc: "1f48e", isCanonical: !0 }, ":name_badge:": { unicode: ["1f4db"], fname: "1f4db", uc: "1f4db", isCanonical: !0 }, ":couplekiss:": { unicode: ["1f48f"], fname: "1f48f", uc: "1f48f", isCanonical: !0 }, ":scroll:": { unicode: ["1f4dc"], fname: "1f4dc", uc: "1f4dc", isCanonical: !0 }, ":bouquet:": { unicode: ["1f490"], fname: "1f490", uc: "1f490", isCanonical: !0 }, ":pencil:": { unicode: ["1f4dd"], fname: "1f4dd", uc: "1f4dd", isCanonical: !0 }, ":couple_with_heart:": { unicode: ["1f491"], fname: "1f491", uc: "1f491", isCanonical: !0 }, ":telephone_receiver:": { unicode: ["1f4de"], fname: "1f4de", uc: "1f4de", isCanonical: !0 }, ":wedding:": { unicode: ["1f492"], fname: "1f492", uc: "1f492", isCanonical: !0 }, ":pager:": { unicode: ["1f4df"], fname: "1f4df", uc: "1f4df", isCanonical: !0 }, ":fax:": { unicode: ["1f4e0"], fname: "1f4e0", uc: "1f4e0", isCanonical: !0 }, ":heartbeat:": { unicode: ["1f493"], fname: "1f493", uc: "1f493", isCanonical: !0 }, ":satellite:": { unicode: ["1f4e1"], fname: "1f4e1", uc: "1f4e1", isCanonical: !0 }, ":loudspeaker:": { unicode: ["1f4e2"], fname: "1f4e2", uc: "1f4e2", isCanonical: !0 }, ":broken_heart:": { unicode: ["1f494"], fname: "1f494", uc: "1f494", isCanonical: !0 }, ":mega:": { unicode: ["1f4e3"], fname: "1f4e3", uc: "1f4e3", isCanonical: !0 }, ":outbox_tray:": { unicode: ["1f4e4"], fname: "1f4e4", uc: "1f4e4", isCanonical: !0 }, ":two_hearts:": { unicode: ["1f495"], fname: "1f495", uc: "1f495", isCanonical: !0 }, ":inbox_tray:": { unicode: ["1f4e5"], fname: "1f4e5", uc: "1f4e5", isCanonical: !0 }, ":package:": { unicode: ["1f4e6"], fname: "1f4e6", uc: "1f4e6", isCanonical: !0 }, ":sparkling_heart:": { unicode: ["1f496"], fname: "1f496", uc: "1f496", isCanonical: !0 }, ":e-mail:": { unicode: ["1f4e7"], fname: "1f4e7", uc: "1f4e7", isCanonical: !0 }, ":email:": { unicode: ["1f4e7"], fname: "1f4e7", uc: "1f4e7", isCanonical: !1 }, ":incoming_envelope:": { unicode: ["1f4e8"], fname: "1f4e8", uc: "1f4e8", isCanonical: !0 }, ":heartpulse:": { unicode: ["1f497"], fname: "1f497", uc: "1f497", isCanonical: !0 }, ":envelope_with_arrow:": { unicode: ["1f4e9"], fname: "1f4e9", uc: "1f4e9", isCanonical: !0 }, ":mailbox_closed:": { unicode: ["1f4ea"], fname: "1f4ea", uc: "1f4ea", isCanonical: !0 }, ":cupid:": { unicode: ["1f498"], fname: "1f498", uc: "1f498", isCanonical: !0 }, ":mailbox:": { unicode: ["1f4eb"], fname: "1f4eb", uc: "1f4eb", isCanonical: !0 }, ":postbox:": { unicode: ["1f4ee"], fname: "1f4ee", uc: "1f4ee", isCanonical: !0 }, ":blue_heart:": { unicode: ["1f499"], fname: "1f499", uc: "1f499", isCanonical: !0 }, ":newspaper:": { unicode: ["1f4f0"], fname: "1f4f0", uc: "1f4f0", isCanonical: !0 }, ":iphone:": { unicode: ["1f4f1"], fname: "1f4f1", uc: "1f4f1", isCanonical: !0 }, ":green_heart:": { unicode: ["1f49a"], fname: "1f49a", uc: "1f49a", isCanonical: !0 }, ":calling:": { unicode: ["1f4f2"], fname: "1f4f2", uc: "1f4f2", isCanonical: !0 }, ":vibration_mode:": { unicode: ["1f4f3"], fname: "1f4f3", uc: "1f4f3", isCanonical: !0 }, ":yellow_heart:": { unicode: ["1f49b"], fname: "1f49b", uc: "1f49b", isCanonical: !0 }, ":mobile_phone_off:": { unicode: ["1f4f4"], fname: "1f4f4", uc: "1f4f4", isCanonical: !0 }, ":signal_strength:": { unicode: ["1f4f6"], fname: "1f4f6", uc: "1f4f6", isCanonical: !0 }, ":purple_heart:": { unicode: ["1f49c"], fname: "1f49c", uc: "1f49c", isCanonical: !0 }, ":camera:": { unicode: ["1f4f7"], fname: "1f4f7", uc: "1f4f7", isCanonical: !0 }, ":video_camera:": { unicode: ["1f4f9"], fname: "1f4f9", uc: "1f4f9", isCanonical: !0 }, ":gift_heart:": { unicode: ["1f49d"], fname: "1f49d", uc: "1f49d", isCanonical: !0 }, ":tv:": { unicode: ["1f4fa"], fname: "1f4fa", uc: "1f4fa", isCanonical: !0 }, ":radio:": { unicode: ["1f4fb"], fname: "1f4fb", uc: "1f4fb", isCanonical: !0 }, ":revolving_hearts:": { unicode: ["1f49e"], fname: "1f49e", uc: "1f49e", isCanonical: !0 }, ":vhs:": { unicode: ["1f4fc"], fname: "1f4fc", uc: "1f4fc", isCanonical: !0 }, ":arrows_clockwise:": { unicode: ["1f503"], fname: "1f503", uc: "1f503", isCanonical: !0 }, ":heart_decoration:": { unicode: ["1f49f"], fname: "1f49f", uc: "1f49f", isCanonical: !0 }, ":loud_sound:": { unicode: ["1f50a"], fname: "1f50a", uc: "1f50a", isCanonical: !0 }, ":battery:": { unicode: ["1f50b"], fname: "1f50b", uc: "1f50b", isCanonical: !0 }, ":diamond_shape_with_a_dot_inside:": { unicode: ["1f4a0"], fname: "1f4a0", uc: "1f4a0", isCanonical: !0 }, ":electric_plug:": { unicode: ["1f50c"], fname: "1f50c", uc: "1f50c", isCanonical: !0 }, ":mag:": { unicode: ["1f50d"], fname: "1f50d", uc: "1f50d", isCanonical: !0 }, ":bulb:": { unicode: ["1f4a1"], fname: "1f4a1", uc: "1f4a1", isCanonical: !0 }, ":mag_right:": { unicode: ["1f50e"], fname: "1f50e", uc: "1f50e", isCanonical: !0 }, ":lock_with_ink_pen:": { unicode: ["1f50f"], fname: "1f50f", uc: "1f50f", isCanonical: !0 }, ":anger:": { unicode: ["1f4a2"], fname: "1f4a2", uc: "1f4a2", isCanonical: !0 }, ":closed_lock_with_key:": { unicode: ["1f510"], fname: "1f510", uc: "1f510", isCanonical: !0 }, ":key:": { unicode: ["1f511"], fname: "1f511", uc: "1f511", isCanonical: !0 }, ":bomb:": { unicode: ["1f4a3"], fname: "1f4a3", uc: "1f4a3", isCanonical: !0 }, ":lock:": { unicode: ["1f512"], fname: "1f512", uc: "1f512", isCanonical: !0 }, ":unlock:": { unicode: ["1f513"], fname: "1f513", uc: "1f513", isCanonical: !0 }, ":zzz:": { unicode: ["1f4a4"], fname: "1f4a4", uc: "1f4a4", isCanonical: !0 }, ":bell:": { unicode: ["1f514"], fname: "1f514", uc: "1f514", isCanonical: !0 }, ":bookmark:": { unicode: ["1f516"], fname: "1f516", uc: "1f516", isCanonical: !0 }, ":boom:": { unicode: ["1f4a5"], fname: "1f4a5", uc: "1f4a5", isCanonical: !0 }, ":link:": { unicode: ["1f517"], fname: "1f517", uc: "1f517", isCanonical: !0 }, ":radio_button:": { unicode: ["1f518"], fname: "1f518", uc: "1f518", isCanonical: !0 }, ":sweat_drops:": { unicode: ["1f4a6"], fname: "1f4a6", uc: "1f4a6", isCanonical: !0 }, ":back:": { unicode: ["1f519"], fname: "1f519", uc: "1f519", isCanonical: !0 }, ":end:": { unicode: ["1f51a"], fname: "1f51a", uc: "1f51a", isCanonical: !0 }, ":droplet:": { unicode: ["1f4a7"], fname: "1f4a7", uc: "1f4a7", isCanonical: !0 }, ":on:": { unicode: ["1f51b"], fname: "1f51b", uc: "1f51b", isCanonical: !0 }, ":soon:": { unicode: ["1f51c"], fname: "1f51c", uc: "1f51c", isCanonical: !0 }, ":dash:": { unicode: ["1f4a8"], fname: "1f4a8", uc: "1f4a8", isCanonical: !0 }, ":top:": { unicode: ["1f51d"], fname: "1f51d", uc: "1f51d", isCanonical: !0 }, ":underage:": { unicode: ["1f51e"], fname: "1f51e", uc: "1f51e", isCanonical: !0 }, ":poop:": { unicode: ["1f4a9"], fname: "1f4a9", uc: "1f4a9", isCanonical: !0 }, ":shit:": { unicode: ["1f4a9"], fname: "1f4a9", uc: "1f4a9", isCanonical: !1 }, ":hankey:": { unicode: ["1f4a9"], fname: "1f4a9", uc: "1f4a9", isCanonical: !1 }, ":poo:": { unicode: ["1f4a9"], fname: "1f4a9", uc: "1f4a9", isCanonical: !1 }, ":keycap_ten:": { unicode: ["1f51f"], fname: "1f51f", uc: "1f51f", isCanonical: !0 }, ":muscle:": { unicode: ["1f4aa"], fname: "1f4aa", uc: "1f4aa", isCanonical: !0 }, ":capital_abcd:": { unicode: ["1f520"], fname: "1f520", uc: "1f520", isCanonical: !0 }, ":abcd:": { unicode: ["1f521"], fname: "1f521", uc: "1f521", isCanonical: !0 }, ":dizzy:": { unicode: ["1f4ab"], fname: "1f4ab", uc: "1f4ab", isCanonical: !0 }, ":1234:": { unicode: ["1f522"], fname: "1f522", uc: "1f522", isCanonical: !0 }, ":symbols:": { unicode: ["1f523"], fname: "1f523", uc: "1f523", isCanonical: !0 }, ":speech_balloon:": { unicode: ["1f4ac"], fname: "1f4ac", uc: "1f4ac", isCanonical: !0 }, ":abc:": { unicode: ["1f524"], fname: "1f524", uc: "1f524", isCanonical: !0 }, ":fire:": { unicode: ["1f525"], fname: "1f525", uc: "1f525", isCanonical: !0 }, ":flame:": { unicode: ["1f525"], fname: "1f525", uc: "1f525", isCanonical: !1 }, ":white_flower:": { unicode: ["1f4ae"], fname: "1f4ae", uc: "1f4ae", isCanonical: !0 }, ":flashlight:": { unicode: ["1f526"], fname: "1f526", uc: "1f526", isCanonical: !0 }, ":wrench:": { unicode: ["1f527"], fname: "1f527", uc: "1f527", isCanonical: !0 }, ":100:": { unicode: ["1f4af"], fname: "1f4af", uc: "1f4af", isCanonical: !0 }, ":hammer:": { unicode: ["1f528"], fname: "1f528", uc: "1f528", isCanonical: !0 }, ":nut_and_bolt:": { unicode: ["1f529"], fname: "1f529", uc: "1f529", isCanonical: !0 }, ":moneybag:": { unicode: ["1f4b0"], fname: "1f4b0", uc: "1f4b0", isCanonical: !0 }, ":knife:": { unicode: ["1f52a"], fname: "1f52a", uc: "1f52a", isCanonical: !0 }, ":gun:": { unicode: ["1f52b"], fname: "1f52b", uc: "1f52b", isCanonical: !0 }, ":currency_exchange:": { unicode: ["1f4b1"], fname: "1f4b1", uc: "1f4b1", isCanonical: !0 }, ":crystal_ball:": { unicode: ["1f52e"], fname: "1f52e", uc: "1f52e", isCanonical: !0 }, ":heavy_dollar_sign:": { unicode: ["1f4b2"], fname: "1f4b2", uc: "1f4b2", isCanonical: !0 }, ":six_pointed_star:": { unicode: ["1f52f"], fname: "1f52f", uc: "1f52f", isCanonical: !0 }, ":credit_card:": { unicode: ["1f4b3"], fname: "1f4b3", uc: "1f4b3", isCanonical: !0 }, ":beginner:": { unicode: ["1f530"], fname: "1f530", uc: "1f530", isCanonical: !0 }, ":trident:": { unicode: ["1f531"], fname: "1f531", uc: "1f531", isCanonical: !0 }, ":yen:": { unicode: ["1f4b4"], fname: "1f4b4", uc: "1f4b4", isCanonical: !0 }, ":black_square_button:": { unicode: ["1f532"], fname: "1f532", uc: "1f532", isCanonical: !0 }, ":white_square_button:": { unicode: ["1f533"], fname: "1f533", uc: "1f533", isCanonical: !0 }, ":dollar:": { unicode: ["1f4b5"], fname: "1f4b5", uc: "1f4b5", isCanonical: !0 }, ":red_circle:": { unicode: ["1f534"], fname: "1f534", uc: "1f534", isCanonical: !0 }, ":blue_circle:": { unicode: ["1f535"], fname: "1f535", uc: "1f535", isCanonical: !0 }, ":money_with_wings:": { unicode: ["1f4b8"], fname: "1f4b8", uc: "1f4b8", isCanonical: !0 }, ":large_orange_diamond:": { unicode: ["1f536"], fname: "1f536", uc: "1f536", isCanonical: !0 }, ":large_blue_diamond:": { unicode: ["1f537"], fname: "1f537", uc: "1f537", isCanonical: !0 }, ":chart:": { unicode: ["1f4b9"], fname: "1f4b9", uc: "1f4b9", isCanonical: !0 }, ":small_orange_diamond:": { unicode: ["1f538"], fname: "1f538", uc: "1f538", isCanonical: !0 }, ":small_blue_diamond:": { unicode: ["1f539"], fname: "1f539", uc: "1f539", isCanonical: !0 }, ":seat:": { unicode: ["1f4ba"], fname: "1f4ba", uc: "1f4ba", isCanonical: !0 }, ":small_red_triangle:": { unicode: ["1f53a"], fname: "1f53a", uc: "1f53a", isCanonical: !0 }, ":small_red_triangle_down:": { unicode: ["1f53b"], fname: "1f53b", uc: "1f53b", isCanonical: !0 }, ":computer:": { unicode: ["1f4bb"], fname: "1f4bb", uc: "1f4bb", isCanonical: !0 }, ":arrow_up_small:": { unicode: ["1f53c"], fname: "1f53c", uc: "1f53c", isCanonical: !0 }, ":briefcase:": { unicode: ["1f4bc"], fname: "1f4bc", uc: "1f4bc", isCanonical: !0 }, ":arrow_down_small:": { unicode: ["1f53d"], fname: "1f53d", uc: "1f53d", isCanonical: !0 }, ":clock1:": { unicode: ["1f550"], fname: "1f550", uc: "1f550", isCanonical: !0 }, ":minidisc:": { unicode: ["1f4bd"], fname: "1f4bd", uc: "1f4bd", isCanonical: !0 }, ":clock2:": { unicode: ["1f551"], fname: "1f551", uc: "1f551", isCanonical: !0 }, ":floppy_disk:": { unicode: ["1f4be"], fname: "1f4be", uc: "1f4be", isCanonical: !0 }, ":clock3:": { unicode: ["1f552"], fname: "1f552", uc: "1f552", isCanonical: !0 }, ":cd:": { unicode: ["1f4bf"], fname: "1f4bf", uc: "1f4bf", isCanonical: !0 }, ":clock4:": { unicode: ["1f553"], fname: "1f553", uc: "1f553", isCanonical: !0 }, ":dvd:": { unicode: ["1f4c0"], fname: "1f4c0", uc: "1f4c0", isCanonical: !0 }, ":clock5:": { unicode: ["1f554"], fname: "1f554", uc: "1f554", isCanonical: !0 }, ":clock6:": { unicode: ["1f555"], fname: "1f555", uc: "1f555", isCanonical: !0 }, ":file_folder:": { unicode: ["1f4c1"], fname: "1f4c1", uc: "1f4c1", isCanonical: !0 }, ":clock7:": { unicode: ["1f556"], fname: "1f556", uc: "1f556", isCanonical: !0 }, ":clock8:": { unicode: ["1f557"], fname: "1f557", uc: "1f557", isCanonical: !0 }, ":open_file_folder:": { unicode: ["1f4c2"], fname: "1f4c2", uc: "1f4c2", isCanonical: !0 }, ":clock9:": { unicode: ["1f558"], fname: "1f558", uc: "1f558", isCanonical: !0 }, ":clock10:": { unicode: ["1f559"], fname: "1f559", uc: "1f559", isCanonical: !0 }, ":page_with_curl:": { unicode: ["1f4c3"], fname: "1f4c3", uc: "1f4c3", isCanonical: !0 }, ":clock11:": { unicode: ["1f55a"], fname: "1f55a", uc: "1f55a", isCanonical: !0 }, ":clock12:": { unicode: ["1f55b"], fname: "1f55b", uc: "1f55b", isCanonical: !0 }, ":page_facing_up:": { unicode: ["1f4c4"], fname: "1f4c4", uc: "1f4c4", isCanonical: !0 }, ":mount_fuji:": { unicode: ["1f5fb"], fname: "1f5fb", uc: "1f5fb", isCanonical: !0 }, ":tokyo_tower:": { unicode: ["1f5fc"], fname: "1f5fc", uc: "1f5fc", isCanonical: !0 }, ":date:": { unicode: ["1f4c5"], fname: "1f4c5", uc: "1f4c5", isCanonical: !0 }, ":statue_of_liberty:": { unicode: ["1f5fd"], fname: "1f5fd", uc: "1f5fd", isCanonical: !0 }, ":japan:": { unicode: ["1f5fe"], fname: "1f5fe", uc: "1f5fe", isCanonical: !0 }, ":calendar:": { unicode: ["1f4c6"], fname: "1f4c6", uc: "1f4c6", isCanonical: !0 }, ":moyai:": { unicode: ["1f5ff"], fname: "1f5ff", uc: "1f5ff", isCanonical: !0 }, ":grin:": { unicode: ["1f601"], fname: "1f601", uc: "1f601", isCanonical: !0 }, ":joy:": { unicode: ["1f602"], fname: "1f602", uc: "1f602", isCanonical: !0 }, ":smiley:": { unicode: ["1f603"], fname: "1f603", uc: "1f603", isCanonical: !0 }, ":chart_with_upwards_trend:": { unicode: ["1f4c8"], fname: "1f4c8", uc: "1f4c8", isCanonical: !0 }, ":smile:": { unicode: ["1f604"], fname: "1f604", uc: "1f604", isCanonical: !0 }, ":sweat_smile:": { unicode: ["1f605"], fname: "1f605", uc: "1f605", isCanonical: !0 }, ":chart_with_downwards_trend:": { unicode: ["1f4c9"], fname: "1f4c9", uc: "1f4c9", isCanonical: !0 }, ":laughing:": { unicode: ["1f606"], fname: "1f606", uc: "1f606", isCanonical: !0 }, ":satisfied:": { unicode: ["1f606"], fname: "1f606", uc: "1f606", isCanonical: !1 }, ":wink:": { unicode: ["1f609"], fname: "1f609", uc: "1f609", isCanonical: !0 }, ":bar_chart:": { unicode: ["1f4ca"], fname: "1f4ca", uc: "1f4ca", isCanonical: !0 }, ":blush:": { unicode: ["1f60a"], fname: "1f60a", uc: "1f60a", isCanonical: !0 }, ":yum:": { unicode: ["1f60b"], fname: "1f60b", uc: "1f60b", isCanonical: !0 }, ":clipboard:": { unicode: ["1f4cb"], fname: "1f4cb", uc: "1f4cb", isCanonical: !0 }, ":relieved:": { unicode: ["1f60c"], fname: "1f60c", uc: "1f60c", isCanonical: !0 }, ":heart_eyes:": { unicode: ["1f60d"], fname: "1f60d", uc: "1f60d", isCanonical: !0 }, ":pushpin:": { unicode: ["1f4cc"], fname: "1f4cc", uc: "1f4cc", isCanonical: !0 }, ":smirk:": { unicode: ["1f60f"], fname: "1f60f", uc: "1f60f", isCanonical: !0 }, ":unamused:": { unicode: ["1f612"], fname: "1f612", uc: "1f612", isCanonical: !0 }, ":round_pushpin:": { unicode: ["1f4cd"], fname: "1f4cd", uc: "1f4cd", isCanonical: !0 }, ":sweat:": { unicode: ["1f613"], fname: "1f613", uc: "1f613", isCanonical: !0 }, ":pensive:": { unicode: ["1f614"], fname: "1f614", uc: "1f614", isCanonical: !0 }, ":paperclip:": { unicode: ["1f4ce"], fname: "1f4ce", uc: "1f4ce", isCanonical: !0 }, ":confounded:": { unicode: ["1f616"], fname: "1f616", uc: "1f616", isCanonical: !0 }, ":kissing_heart:": { unicode: ["1f618"], fname: "1f618", uc: "1f618", isCanonical: !0 }, ":straight_ruler:": { unicode: ["1f4cf"], fname: "1f4cf", uc: "1f4cf", isCanonical: !0 }, ":kissing_closed_eyes:": { unicode: ["1f61a"], fname: "1f61a", uc: "1f61a", isCanonical: !0 }, ":stuck_out_tongue_winking_eye:": { unicode: ["1f61c"], fname: "1f61c", uc: "1f61c", isCanonical: !0 }, ":triangular_ruler:": { unicode: ["1f4d0"], fname: "1f4d0", uc: "1f4d0", isCanonical: !0 }, ":stuck_out_tongue_closed_eyes:": { unicode: ["1f61d"], fname: "1f61d", uc: "1f61d", isCanonical: !0 }, ":disappointed:": { unicode: ["1f61e"], fname: "1f61e", uc: "1f61e", isCanonical: !0 }, ":bookmark_tabs:": { unicode: ["1f4d1"], fname: "1f4d1", uc: "1f4d1", isCanonical: !0 }, ":angry:": { unicode: ["1f620"], fname: "1f620", uc: "1f620", isCanonical: !0 }, ":rage:": { unicode: ["1f621"], fname: "1f621", uc: "1f621", isCanonical: !0 }, ":cry:": { unicode: ["1f622"], fname: "1f622", uc: "1f622", isCanonical: !0 }, ":persevere:": { unicode: ["1f623"], fname: "1f623", uc: "1f623", isCanonical: !0 }, ":triumph:": { unicode: ["1f624"], fname: "1f624", uc: "1f624", isCanonical: !0 }, ":disappointed_relieved:": { unicode: ["1f625"], fname: "1f625", uc: "1f625", isCanonical: !0 }, ":fearful:": { unicode: ["1f628"], fname: "1f628", uc: "1f628", isCanonical: !0 }, ":weary:": { unicode: ["1f629"], fname: "1f629", uc: "1f629", isCanonical: !0 }, ":sleepy:": { unicode: ["1f62a"], fname: "1f62a", uc: "1f62a", isCanonical: !0 }, ":tired_face:": { unicode: ["1f62b"], fname: "1f62b", uc: "1f62b", isCanonical: !0 }, ":sob:": { unicode: ["1f62d"], fname: "1f62d", uc: "1f62d", isCanonical: !0 }, ":cold_sweat:": { unicode: ["1f630"], fname: "1f630", uc: "1f630", isCanonical: !0 }, ":scream:": { unicode: ["1f631"], fname: "1f631", uc: "1f631", isCanonical: !0 }, ":astonished:": { unicode: ["1f632"], fname: "1f632", uc: "1f632", isCanonical: !0 }, ":flushed:": { unicode: ["1f633"], fname: "1f633", uc: "1f633", isCanonical: !0 }, ":dizzy_face:": { unicode: ["1f635"], fname: "1f635", uc: "1f635", isCanonical: !0 }, ":mask:": { unicode: ["1f637"], fname: "1f637", uc: "1f637", isCanonical: !0 }, ":smile_cat:": { unicode: ["1f638"], fname: "1f638", uc: "1f638", isCanonical: !0 }, ":joy_cat:": { unicode: ["1f639"], fname: "1f639", uc: "1f639", isCanonical: !0 }, ":smiley_cat:": { unicode: ["1f63a"], fname: "1f63a", uc: "1f63a", isCanonical: !0 }, ":heart_eyes_cat:": { unicode: ["1f63b"], fname: "1f63b", uc: "1f63b", isCanonical: !0 }, ":smirk_cat:": { unicode: ["1f63c"], fname: "1f63c", uc: "1f63c", isCanonical: !0 }, ":kissing_cat:": { unicode: ["1f63d"], fname: "1f63d", uc: "1f63d", isCanonical: !0 }, ":pouting_cat:": { unicode: ["1f63e"], fname: "1f63e", uc: "1f63e", isCanonical: !0 }, ":crying_cat_face:": { unicode: ["1f63f"], fname: "1f63f", uc: "1f63f", isCanonical: !0 }, ":scream_cat:": { unicode: ["1f640"], fname: "1f640", uc: "1f640", isCanonical: !0 }, ":no_good:": { unicode: ["1f645"], fname: "1f645", uc: "1f645", isCanonical: !0 }, ":ok_woman:": { unicode: ["1f646"], fname: "1f646", uc: "1f646", isCanonical: !0 }, ":bow:": { unicode: ["1f647"], fname: "1f647", uc: "1f647", isCanonical: !0 }, ":see_no_evil:": { unicode: ["1f648"], fname: "1f648", uc: "1f648", isCanonical: !0 }, ":hear_no_evil:": { unicode: ["1f649"], fname: "1f649", uc: "1f649", isCanonical: !0 }, ":speak_no_evil:": { unicode: ["1f64a"], fname: "1f64a", uc: "1f64a", isCanonical: !0 }, ":raising_hand:": { unicode: ["1f64b"], fname: "1f64b", uc: "1f64b", isCanonical: !0 }, ":raised_hands:": { unicode: ["1f64c"], fname: "1f64c", uc: "1f64c", isCanonical: !0 }, ":person_frowning:": { unicode: ["1f64d"], fname: "1f64d", uc: "1f64d", isCanonical: !0 }, ":person_with_pouting_face:": { unicode: ["1f64e"], fname: "1f64e", uc: "1f64e", isCanonical: !0 }, ":pray:": { unicode: ["1f64f"], fname: "1f64f", uc: "1f64f", isCanonical: !0 }, ":rocket:": { unicode: ["1f680"], fname: "1f680", uc: "1f680", isCanonical: !0 }, ":railway_car:": { unicode: ["1f683"], fname: "1f683", uc: "1f683", isCanonical: !0 }, ":bullettrain_side:": { unicode: ["1f684"], fname: "1f684", uc: "1f684", isCanonical: !0 }, ":bullettrain_front:": { unicode: ["1f685"], fname: "1f685", uc: "1f685", isCanonical: !0 }, ":metro:": { unicode: ["1f687"], fname: "1f687", uc: "1f687", isCanonical: !0 }, ":station:": { unicode: ["1f689"], fname: "1f689", uc: "1f689", isCanonical: !0 }, ":bus:": { unicode: ["1f68c"], fname: "1f68c", uc: "1f68c", isCanonical: !0 }, ":busstop:": { unicode: ["1f68f"], fname: "1f68f", uc: "1f68f", isCanonical: !0 }, ":ambulance:": { unicode: ["1f691"], fname: "1f691", uc: "1f691", isCanonical: !0 }, ":fire_engine:": { unicode: ["1f692"], fname: "1f692", uc: "1f692", isCanonical: !0 }, ":police_car:": { unicode: ["1f693"], fname: "1f693", uc: "1f693", isCanonical: !0 }, ":taxi:": { unicode: ["1f695"], fname: "1f695", uc: "1f695", isCanonical: !0 }, ":red_car:": { unicode: ["1f697"], fname: "1f697", uc: "1f697", isCanonical: !0 }, ":blue_car:": { unicode: ["1f699"], fname: "1f699", uc: "1f699", isCanonical: !0 }, ":truck:": { unicode: ["1f69a"], fname: "1f69a", uc: "1f69a", isCanonical: !0 }, ":ship:": { unicode: ["1f6a2"], fname: "1f6a2", uc: "1f6a2", isCanonical: !0 }, ":speedboat:": { unicode: ["1f6a4"], fname: "1f6a4", uc: "1f6a4", isCanonical: !0 }, ":traffic_light:": { unicode: ["1f6a5"], fname: "1f6a5", uc: "1f6a5", isCanonical: !0 }, ":construction:": { unicode: ["1f6a7"], fname: "1f6a7", uc: "1f6a7", isCanonical: !0 }, ":rotating_light:": { unicode: ["1f6a8"], fname: "1f6a8", uc: "1f6a8", isCanonical: !0 }, ":triangular_flag_on_post:": { unicode: ["1f6a9"], fname: "1f6a9", uc: "1f6a9", isCanonical: !0 }, ":door:": { unicode: ["1f6aa"], fname: "1f6aa", uc: "1f6aa", isCanonical: !0 }, ":no_entry_sign:": { unicode: ["1f6ab"], fname: "1f6ab", uc: "1f6ab", isCanonical: !0 }, ":smoking:": { unicode: ["1f6ac"], fname: "1f6ac", uc: "1f6ac", isCanonical: !0 }, ":no_smoking:": { unicode: ["1f6ad"], fname: "1f6ad", uc: "1f6ad", isCanonical: !0 }, ":bike:": { unicode: ["1f6b2"], fname: "1f6b2", uc: "1f6b2", isCanonical: !0 }, ":walking:": { unicode: ["1f6b6"], fname: "1f6b6", uc: "1f6b6", isCanonical: !0 }, ":mens:": { unicode: ["1f6b9"], fname: "1f6b9", uc: "1f6b9", isCanonical: !0 }, ":womens:": { unicode: ["1f6ba"], fname: "1f6ba", uc: "1f6ba", isCanonical: !0 }, ":restroom:": { unicode: ["1f6bb"], fname: "1f6bb", uc: "1f6bb", isCanonical: !0 }, ":baby_symbol:": { unicode: ["1f6bc"], fname: "1f6bc", uc: "1f6bc", isCanonical: !0 }, ":toilet:": { unicode: ["1f6bd"], fname: "1f6bd", uc: "1f6bd", isCanonical: !0 }, ":wc:": { unicode: ["1f6be"], fname: "1f6be", uc: "1f6be", isCanonical: !0 }, ":bath:": { unicode: ["1f6c0"], fname: "1f6c0", uc: "1f6c0", isCanonical: !0 }, ":metal:": { unicode: ["1f918"], fname: "1f918", uc: "1f918", isCanonical: !0 }, ":sign_of_the_horns:": { unicode: ["1f918"], fname: "1f918", uc: "1f918", isCanonical: !1 }, ":grinning:": { unicode: ["1f600"], fname: "1f600", uc: "1f600", isCanonical: !0 }, ":innocent:": { unicode: ["1f607"], fname: "1f607", uc: "1f607", isCanonical: !0 }, ":smiling_imp:": { unicode: ["1f608"], fname: "1f608", uc: "1f608", isCanonical: !0 }, ":sunglasses:": { unicode: ["1f60e"], fname: "1f60e", uc: "1f60e", isCanonical: !0 }, ":neutral_face:": { unicode: ["1f610"], fname: "1f610", uc: "1f610", isCanonical: !0 }, ":expressionless:": { unicode: ["1f611"], fname: "1f611", uc: "1f611", isCanonical: !0 }, ":confused:": { unicode: ["1f615"], fname: "1f615", uc: "1f615", isCanonical: !0 }, ":kissing:": { unicode: ["1f617"], fname: "1f617", uc: "1f617", isCanonical: !0 }, ":kissing_smiling_eyes:": { unicode: ["1f619"], fname: "1f619", uc: "1f619", isCanonical: !0 }, ":stuck_out_tongue:": { unicode: ["1f61b"], fname: "1f61b", uc: "1f61b", isCanonical: !0 }, ":worried:": { unicode: ["1f61f"], fname: "1f61f", uc: "1f61f", isCanonical: !0 }, ":frowning:": { unicode: ["1f626"], fname: "1f626", uc: "1f626", isCanonical: !0 }, ":anguished:": { unicode: ["1f627"], fname: "1f627", uc: "1f627", isCanonical: !0 }, ":grimacing:": { unicode: ["1f62c"], fname: "1f62c", uc: "1f62c", isCanonical: !0 }, ":open_mouth:": { unicode: ["1f62e"], fname: "1f62e", uc: "1f62e", isCanonical: !0 }, ":hushed:": { unicode: ["1f62f"], fname: "1f62f", uc: "1f62f", isCanonical: !0 }, ":sleeping:": { unicode: ["1f634"], fname: "1f634", uc: "1f634", isCanonical: !0 }, ":no_mouth:": { unicode: ["1f636"], fname: "1f636", uc: "1f636", isCanonical: !0 }, ":helicopter:": { unicode: ["1f681"], fname: "1f681", uc: "1f681", isCanonical: !0 }, ":steam_locomotive:": { unicode: ["1f682"], fname: "1f682", uc: "1f682", isCanonical: !0 }, ":train2:": { unicode: ["1f686"], fname: "1f686", uc: "1f686", isCanonical: !0 }, ":light_rail:": { unicode: ["1f688"], fname: "1f688", uc: "1f688", isCanonical: !0 }, ":tram:": { unicode: ["1f68a"], fname: "1f68a", uc: "1f68a", isCanonical: !0 }, ":oncoming_bus:": { unicode: ["1f68d"], fname: "1f68d", uc: "1f68d", isCanonical: !0 }, ":trolleybus:": { unicode: ["1f68e"], fname: "1f68e", uc: "1f68e", isCanonical: !0 }, ":minibus:": { unicode: ["1f690"], fname: "1f690", uc: "1f690", isCanonical: !0 }, ":oncoming_police_car:": { unicode: ["1f694"], fname: "1f694", uc: "1f694", isCanonical: !0 }, ":oncoming_taxi:": { unicode: ["1f696"], fname: "1f696", uc: "1f696", isCanonical: !0 }, ":oncoming_automobile:": { unicode: ["1f698"], fname: "1f698", uc: "1f698", isCanonical: !0 }, ":articulated_lorry:": { unicode: ["1f69b"], fname: "1f69b", uc: "1f69b", isCanonical: !0 }, ":tractor:": { unicode: ["1f69c"], fname: "1f69c", uc: "1f69c", isCanonical: !0 }, ":monorail:": { unicode: ["1f69d"], fname: "1f69d", uc: "1f69d", isCanonical: !0 }, ":mountain_railway:": { unicode: ["1f69e"], fname: "1f69e", uc: "1f69e", isCanonical: !0 }, ":suspension_railway:": { unicode: ["1f69f"], fname: "1f69f", uc: "1f69f", isCanonical: !0 }, ":mountain_cableway:": { unicode: ["1f6a0"], fname: "1f6a0", uc: "1f6a0", isCanonical: !0 }, ":aerial_tramway:": { unicode: ["1f6a1"], fname: "1f6a1", uc: "1f6a1", isCanonical: !0 }, ":rowboat:": { unicode: ["1f6a3"], fname: "1f6a3", uc: "1f6a3", isCanonical: !0 }, ":vertical_traffic_light:": { unicode: ["1f6a6"], fname: "1f6a6", uc: "1f6a6", isCanonical: !0 }, ":put_litter_in_its_place:": { unicode: ["1f6ae"], fname: "1f6ae", uc: "1f6ae", isCanonical: !0 }, ":do_not_litter:": { unicode: ["1f6af"], fname: "1f6af", uc: "1f6af", isCanonical: !0 }, ":potable_water:": { unicode: ["1f6b0"], fname: "1f6b0", uc: "1f6b0", isCanonical: !0 }, ":non-potable_water:": { unicode: ["1f6b1"], fname: "1f6b1", uc: "1f6b1", isCanonical: !0 }, ":no_bicycles:": { unicode: ["1f6b3"], fname: "1f6b3", uc: "1f6b3", isCanonical: !0 }, ":bicyclist:": { unicode: ["1f6b4"], fname: "1f6b4", uc: "1f6b4", isCanonical: !0 }, ":mountain_bicyclist:": { unicode: ["1f6b5"], fname: "1f6b5", uc: "1f6b5", isCanonical: !0 }, ":no_pedestrians:": { unicode: ["1f6b7"], fname: "1f6b7", uc: "1f6b7", isCanonical: !0 }, ":children_crossing:": { unicode: ["1f6b8"], fname: "1f6b8", uc: "1f6b8", isCanonical: !0 }, ":shower:": { unicode: ["1f6bf"], fname: "1f6bf", uc: "1f6bf", isCanonical: !0 }, ":bathtub:": { unicode: ["1f6c1"], fname: "1f6c1", uc: "1f6c1", isCanonical: !0 }, ":passport_control:": { unicode: ["1f6c2"], fname: "1f6c2", uc: "1f6c2", isCanonical: !0 }, ":customs:": { unicode: ["1f6c3"], fname: "1f6c3", uc: "1f6c3", isCanonical: !0 }, ":baggage_claim:": { unicode: ["1f6c4"], fname: "1f6c4", uc: "1f6c4", isCanonical: !0 }, ":left_luggage:": { unicode: ["1f6c5"], fname: "1f6c5", uc: "1f6c5", isCanonical: !0 }, ":earth_africa:": { unicode: ["1f30d"], fname: "1f30d", uc: "1f30d", isCanonical: !0 }, ":earth_americas:": { unicode: ["1f30e"], fname: "1f30e", uc: "1f30e", isCanonical: !0 }, ":globe_with_meridians:": { unicode: ["1f310"], fname: "1f310", uc: "1f310", isCanonical: !0 }, ":waxing_crescent_moon:": { unicode: ["1f312"], fname: "1f312", uc: "1f312", isCanonical: !0 }, ":waning_gibbous_moon:": { unicode: ["1f316"], fname: "1f316", uc: "1f316", isCanonical: !0 }, ":last_quarter_moon:": { unicode: ["1f317"], fname: "1f317", uc: "1f317", isCanonical: !0 }, ":waning_crescent_moon:": { unicode: ["1f318"], fname: "1f318", uc: "1f318", isCanonical: !0 }, ":new_moon_with_face:": { unicode: ["1f31a"], fname: "1f31a", uc: "1f31a", isCanonical: !0 }, ":last_quarter_moon_with_face:": { unicode: ["1f31c"], fname: "1f31c", uc: "1f31c", isCanonical: !0 }, ":full_moon_with_face:": { unicode: ["1f31d"], fname: "1f31d", uc: "1f31d", isCanonical: !0 }, ":sun_with_face:": { unicode: ["1f31e"], fname: "1f31e", uc: "1f31e", isCanonical: !0 }, ":evergreen_tree:": { unicode: ["1f332"], fname: "1f332", uc: "1f332", isCanonical: !0 }, ":deciduous_tree:": { unicode: ["1f333"], fname: "1f333", uc: "1f333", isCanonical: !0 }, ":lemon:": { unicode: ["1f34b"], fname: "1f34b", uc: "1f34b", isCanonical: !0 }, ":pear:": { unicode: ["1f350"], fname: "1f350", uc: "1f350", isCanonical: !0 }, ":baby_bottle:": { unicode: ["1f37c"], fname: "1f37c", uc: "1f37c", isCanonical: !0 }, ":horse_racing:": { unicode: ["1f3c7"], fname: "1f3c7", uc: "1f3c7", isCanonical: !0 }, ":rugby_football:": { unicode: ["1f3c9"], fname: "1f3c9", uc: "1f3c9", isCanonical: !0 }, ":european_post_office:": { unicode: ["1f3e4"], fname: "1f3e4", uc: "1f3e4", isCanonical: !0 }, ":rat:": { unicode: ["1f400"], fname: "1f400", uc: "1f400", isCanonical: !0 }, ":mouse2:": { unicode: ["1f401"], fname: "1f401", uc: "1f401", isCanonical: !0 }, ":ox:": { unicode: ["1f402"], fname: "1f402", uc: "1f402", isCanonical: !0 }, ":water_buffalo:": { unicode: ["1f403"], fname: "1f403", uc: "1f403", isCanonical: !0 }, ":cow2:": { unicode: ["1f404"], fname: "1f404", uc: "1f404", isCanonical: !0 }, ":tiger2:": { unicode: ["1f405"], fname: "1f405", uc: "1f405", isCanonical: !0 }, ":leopard:": { unicode: ["1f406"], fname: "1f406", uc: "1f406", isCanonical: !0 }, ":rabbit2:": { unicode: ["1f407"], fname: "1f407", uc: "1f407", isCanonical: !0 }, ":cat2:": { unicode: ["1f408"], fname: "1f408", uc: "1f408", isCanonical: !0 }, ":dragon:": { unicode: ["1f409"], fname: "1f409", uc: "1f409", isCanonical: !0 }, ":crocodile:": { unicode: ["1f40a"], fname: "1f40a", uc: "1f40a", isCanonical: !0 }, ":whale2:": { unicode: ["1f40b"], fname: "1f40b", uc: "1f40b", isCanonical: !0 }, ":ram:": { unicode: ["1f40f"], fname: "1f40f", uc: "1f40f", isCanonical: !0 }, ":goat:": { unicode: ["1f410"], fname: "1f410", uc: "1f410", isCanonical: !0 }, ":rooster:": { unicode: ["1f413"], fname: "1f413", uc: "1f413", isCanonical: !0 }, ":dog2:": { unicode: ["1f415"], fname: "1f415", uc: "1f415", isCanonical: !0 }, ":pig2:": { unicode: ["1f416"], fname: "1f416", uc: "1f416", isCanonical: !0 }, ":dromedary_camel:": { unicode: ["1f42a"], fname: "1f42a", uc: "1f42a", isCanonical: !0 }, ":busts_in_silhouette:": { unicode: ["1f465"], fname: "1f465", uc: "1f465", isCanonical: !0 }, ":two_men_holding_hands:": { unicode: ["1f46c"], fname: "1f46c", uc: "1f46c", isCanonical: !0 }, ":two_women_holding_hands:": { unicode: ["1f46d"], fname: "1f46d", uc: "1f46d", isCanonical: !0 }, ":thought_balloon:": { unicode: ["1f4ad"], fname: "1f4ad", uc: "1f4ad", isCanonical: !0 }, ":euro:": { unicode: ["1f4b6"], fname: "1f4b6", uc: "1f4b6", isCanonical: !0 }, ":pound:": { unicode: ["1f4b7"], fname: "1f4b7", uc: "1f4b7", isCanonical: !0 }, ":mailbox_with_mail:": { unicode: ["1f4ec"], fname: "1f4ec", uc: "1f4ec", isCanonical: !0 }, ":mailbox_with_no_mail:": { unicode: ["1f4ed"],
      fname: "1f4ed", uc: "1f4ed", isCanonical: !0 }, ":postal_horn:": { unicode: ["1f4ef"], fname: "1f4ef", uc: "1f4ef", isCanonical: !0 }, ":no_mobile_phones:": { unicode: ["1f4f5"], fname: "1f4f5", uc: "1f4f5", isCanonical: !0 }, ":twisted_rightwards_arrows:": { unicode: ["1f500"], fname: "1f500", uc: "1f500", isCanonical: !0 }, ":repeat:": { unicode: ["1f501"], fname: "1f501", uc: "1f501", isCanonical: !0 }, ":repeat_one:": { unicode: ["1f502"], fname: "1f502", uc: "1f502", isCanonical: !0 }, ":arrows_counterclockwise:": { unicode: ["1f504"], fname: "1f504", uc: "1f504", isCanonical: !0 }, ":low_brightness:": { unicode: ["1f505"], fname: "1f505", uc: "1f505", isCanonical: !0 }, ":high_brightness:": { unicode: ["1f506"], fname: "1f506", uc: "1f506", isCanonical: !0 }, ":mute:": { unicode: ["1f507"], fname: "1f507", uc: "1f507", isCanonical: !0 }, ":sound:": { unicode: ["1f509"], fname: "1f509", uc: "1f509", isCanonical: !0 }, ":no_bell:": { unicode: ["1f515"], fname: "1f515", uc: "1f515", isCanonical: !0 }, ":microscope:": { unicode: ["1f52c"], fname: "1f52c", uc: "1f52c", isCanonical: !0 }, ":telescope:": { unicode: ["1f52d"], fname: "1f52d", uc: "1f52d", isCanonical: !0 }, ":clock130:": { unicode: ["1f55c"], fname: "1f55c", uc: "1f55c", isCanonical: !0 }, ":clock230:": { unicode: ["1f55d"], fname: "1f55d", uc: "1f55d", isCanonical: !0 }, ":clock330:": { unicode: ["1f55e"], fname: "1f55e", uc: "1f55e", isCanonical: !0 }, ":clock430:": { unicode: ["1f55f"], fname: "1f55f", uc: "1f55f", isCanonical: !0 }, ":clock530:": { unicode: ["1f560"], fname: "1f560", uc: "1f560", isCanonical: !0 }, ":clock630:": { unicode: ["1f561"], fname: "1f561", uc: "1f561", isCanonical: !0 }, ":clock730:": { unicode: ["1f562"], fname: "1f562", uc: "1f562", isCanonical: !0 }, ":clock830:": { unicode: ["1f563"], fname: "1f563", uc: "1f563", isCanonical: !0 }, ":clock930:": { unicode: ["1f564"], fname: "1f564", uc: "1f564", isCanonical: !0 }, ":clock1030:": { unicode: ["1f565"], fname: "1f565", uc: "1f565", isCanonical: !0 }, ":clock1130:": { unicode: ["1f566"], fname: "1f566", uc: "1f566", isCanonical: !0 }, ":clock1230:": { unicode: ["1f567"], fname: "1f567", uc: "1f567", isCanonical: !0 }, ":speaker:": { unicode: ["1f508"], fname: "1f508", uc: "1f508", isCanonical: !0 }, ":train:": { unicode: ["1f68b"], fname: "1f68b", uc: "1f68b", isCanonical: !0 }, ":medal:": { unicode: ["1f3c5"], fname: "1f3c5", uc: "1f3c5", isCanonical: !0 }, ":sports_medal:": { unicode: ["1f3c5"], fname: "1f3c5", uc: "1f3c5", isCanonical: !1 }, ":flag_black:": { unicode: ["1f3f4"], fname: "1f3f4", uc: "1f3f4", isCanonical: !0 }, ":waving_black_flag:": { unicode: ["1f3f4"], fname: "1f3f4", uc: "1f3f4", isCanonical: !1 }, ":camera_with_flash:": { unicode: ["1f4f8"], fname: "1f4f8", uc: "1f4f8", isCanonical: !0 }, ":sleeping_accommodation:": { unicode: ["1f6cc"], fname: "1f6cc", uc: "1f6cc", isCanonical: !0 }, ":middle_finger:": { unicode: ["1f595"], fname: "1f595", uc: "1f595", isCanonical: !0 }, ":reversed_hand_with_middle_finger_extended:": { unicode: ["1f595"], fname: "1f595", uc: "1f595", isCanonical: !1 }, ":vulcan:": { unicode: ["1f596"], fname: "1f596", uc: "1f596", isCanonical: !0 }, ":raised_hand_with_part_between_middle_and_ring_fingers:": { unicode: ["1f596"], fname: "1f596", uc: "1f596", isCanonical: !1 }, ":slight_frown:": { unicode: ["1f641"], fname: "1f641", uc: "1f641", isCanonical: !0 }, ":slightly_frowning_face:": { unicode: ["1f641"], fname: "1f641", uc: "1f641", isCanonical: !1 }, ":slight_smile:": { unicode: ["1f642"], fname: "1f642", uc: "1f642", isCanonical: !0 }, ":slightly_smiling_face:": { unicode: ["1f642"], fname: "1f642", uc: "1f642", isCanonical: !1 }, ":airplane_departure:": { unicode: ["1f6eb"], fname: "1f6eb", uc: "1f6eb", isCanonical: !0 }, ":airplane_arriving:": { unicode: ["1f6ec"], fname: "1f6ec", uc: "1f6ec", isCanonical: !0 }, ":tone1:": { unicode: ["1f3fb"], fname: "1f3fb", uc: "1f3fb", isCanonical: !0 }, ":tone2:": { unicode: ["1f3fc"], fname: "1f3fc", uc: "1f3fc", isCanonical: !0 }, ":tone3:": { unicode: ["1f3fd"], fname: "1f3fd", uc: "1f3fd", isCanonical: !0 }, ":tone4:": { unicode: ["1f3fe"], fname: "1f3fe", uc: "1f3fe", isCanonical: !0 }, ":tone5:": { unicode: ["1f3ff"], fname: "1f3ff", uc: "1f3ff", isCanonical: !0 }, ":upside_down:": { unicode: ["1f643"], fname: "1f643", uc: "1f643", isCanonical: !0 }, ":upside_down_face:": { unicode: ["1f643"], fname: "1f643", uc: "1f643", isCanonical: !1 }, ":money_mouth:": { unicode: ["1f911"], fname: "1f911", uc: "1f911", isCanonical: !0 }, ":money_mouth_face:": { unicode: ["1f911"], fname: "1f911", uc: "1f911", isCanonical: !1 }, ":nerd:": { unicode: ["1f913"], fname: "1f913", uc: "1f913", isCanonical: !0 }, ":nerd_face:": { unicode: ["1f913"], fname: "1f913", uc: "1f913", isCanonical: !1 }, ":hugging:": { unicode: ["1f917"], fname: "1f917", uc: "1f917", isCanonical: !0 }, ":hugging_face:": { unicode: ["1f917"], fname: "1f917", uc: "1f917", isCanonical: !1 }, ":rolling_eyes:": { unicode: ["1f644"], fname: "1f644", uc: "1f644", isCanonical: !0 }, ":face_with_rolling_eyes:": { unicode: ["1f644"], fname: "1f644", uc: "1f644", isCanonical: !1 }, ":thinking:": { unicode: ["1f914"], fname: "1f914", uc: "1f914", isCanonical: !0 }, ":thinking_face:": { unicode: ["1f914"], fname: "1f914", uc: "1f914", isCanonical: !1 }, ":zipper_mouth:": { unicode: ["1f910"], fname: "1f910", uc: "1f910", isCanonical: !0 }, ":zipper_mouth_face:": { unicode: ["1f910"], fname: "1f910", uc: "1f910", isCanonical: !1 }, ":thermometer_face:": { unicode: ["1f912"], fname: "1f912", uc: "1f912", isCanonical: !0 }, ":face_with_thermometer:": { unicode: ["1f912"], fname: "1f912", uc: "1f912", isCanonical: !1 }, ":head_bandage:": { unicode: ["1f915"], fname: "1f915", uc: "1f915", isCanonical: !0 }, ":face_with_head_bandage:": { unicode: ["1f915"], fname: "1f915", uc: "1f915", isCanonical: !1 }, ":robot:": { unicode: ["1f916"], fname: "1f916", uc: "1f916", isCanonical: !0 }, ":robot_face:": { unicode: ["1f916"], fname: "1f916", uc: "1f916", isCanonical: !1 }, ":lion_face:": { unicode: ["1f981"], fname: "1f981", uc: "1f981", isCanonical: !0 }, ":lion:": { unicode: ["1f981"], fname: "1f981", uc: "1f981", isCanonical: !1 }, ":unicorn:": { unicode: ["1f984"], fname: "1f984", uc: "1f984", isCanonical: !0 }, ":unicorn_face:": { unicode: ["1f984"], fname: "1f984", uc: "1f984", isCanonical: !1 }, ":scorpion:": { unicode: ["1f982"], fname: "1f982", uc: "1f982", isCanonical: !0 }, ":crab:": { unicode: ["1f980"], fname: "1f980", uc: "1f980", isCanonical: !0 }, ":turkey:": { unicode: ["1f983"], fname: "1f983", uc: "1f983", isCanonical: !0 }, ":cheese:": { unicode: ["1f9c0"], fname: "1f9c0", uc: "1f9c0", isCanonical: !0 }, ":cheese_wedge:": { unicode: ["1f9c0"], fname: "1f9c0", uc: "1f9c0", isCanonical: !1 }, ":hotdog:": { unicode: ["1f32d"], fname: "1f32d", uc: "1f32d", isCanonical: !0 }, ":hot_dog:": { unicode: ["1f32d"], fname: "1f32d", uc: "1f32d", isCanonical: !1 }, ":taco:": { unicode: ["1f32e"], fname: "1f32e", uc: "1f32e", isCanonical: !0 }, ":burrito:": { unicode: ["1f32f"], fname: "1f32f", uc: "1f32f", isCanonical: !0 }, ":popcorn:": { unicode: ["1f37f"], fname: "1f37f", uc: "1f37f", isCanonical: !0 }, ":champagne:": { unicode: ["1f37e"], fname: "1f37e", uc: "1f37e", isCanonical: !0 }, ":bottle_with_popping_cork:": { unicode: ["1f37e"], fname: "1f37e", uc: "1f37e", isCanonical: !1 }, ":bow_and_arrow:": { unicode: ["1f3f9"], fname: "1f3f9", uc: "1f3f9", isCanonical: !0 }, ":archery:": { unicode: ["1f3f9"], fname: "1f3f9", uc: "1f3f9", isCanonical: !1 }, ":amphora:": { unicode: ["1f3fa"], fname: "1f3fa", uc: "1f3fa", isCanonical: !0 }, ":place_of_worship:": { unicode: ["1f6d0"], fname: "1f6d0", uc: "1f6d0", isCanonical: !0 }, ":worship_symbol:": { unicode: ["1f6d0"], fname: "1f6d0", uc: "1f6d0", isCanonical: !1 }, ":kaaba:": { unicode: ["1f54b"], fname: "1f54b", uc: "1f54b", isCanonical: !0 }, ":mosque:": { unicode: ["1f54c"], fname: "1f54c", uc: "1f54c", isCanonical: !0 }, ":synagogue:": { unicode: ["1f54d"], fname: "1f54d", uc: "1f54d", isCanonical: !0 }, ":menorah:": { unicode: ["1f54e"], fname: "1f54e", uc: "1f54e", isCanonical: !0 }, ":prayer_beads:": { unicode: ["1f4ff"], fname: "1f4ff", uc: "1f4ff", isCanonical: !0 }, ":cricket:": { unicode: ["1f3cf"], fname: "1f3cf", uc: "1f3cf", isCanonical: !0 }, ":cricket_bat_ball:": { unicode: ["1f3cf"], fname: "1f3cf", uc: "1f3cf", isCanonical: !1 }, ":volleyball:": { unicode: ["1f3d0"], fname: "1f3d0", uc: "1f3d0", isCanonical: !0 }, ":field_hockey:": { unicode: ["1f3d1"], fname: "1f3d1", uc: "1f3d1", isCanonical: !0 }, ":hockey:": { unicode: ["1f3d2"], fname: "1f3d2", uc: "1f3d2", isCanonical: !0 }, ":ping_pong:": { unicode: ["1f3d3"], fname: "1f3d3", uc: "1f3d3", isCanonical: !0 }, ":table_tennis:": { unicode: ["1f3d3"], fname: "1f3d3", uc: "1f3d3", isCanonical: !1 }, ":badminton:": { unicode: ["1f3f8"], fname: "1f3f8", uc: "1f3f8", isCanonical: !0 }, ":drum:": { unicode: ["1f941"], fname: "1f941", uc: "1f941", isCanonical: !0 }, ":drum_with_drumsticks:": { unicode: ["1f941"], fname: "1f941", uc: "1f941", isCanonical: !1 }, ":shrimp:": { unicode: ["1f990"], fname: "1f990", uc: "1f990", isCanonical: !0 }, ":squid:": { unicode: ["1f991"], fname: "1f991", uc: "1f991", isCanonical: !0 }, ":egg:": { unicode: ["1f95a"], fname: "1f95a", uc: "1f95a", isCanonical: !0 }, ":milk:": { unicode: ["1f95b"], fname: "1f95b", uc: "1f95b", isCanonical: !0 }, ":glass_of_milk:": { unicode: ["1f95b"], fname: "1f95b", uc: "1f95b", isCanonical: !1 }, ":peanuts:": { unicode: ["1f95c"], fname: "1f95c", uc: "1f95c", isCanonical: !0 }, ":shelled_peanut:": { unicode: ["1f95c"], fname: "1f95c", uc: "1f95c", isCanonical: !1 }, ":kiwi:": { unicode: ["1f95d"], fname: "1f95d", uc: "1f95d", isCanonical: !0 }, ":kiwifruit:": { unicode: ["1f95d"], fname: "1f95d", uc: "1f95d", isCanonical: !1 }, ":pancakes:": { unicode: ["1f95e"], fname: "1f95e", uc: "1f95e", isCanonical: !0 }, ":regional_indicator_w:": { unicode: ["1f1fc"], fname: "1f1fc", uc: "1f1fc", isCanonical: !0 }, ":regional_indicator_v:": { unicode: ["1f1fb"], fname: "1f1fb", uc: "1f1fb", isCanonical: !0 }, ":regional_indicator_u:": { unicode: ["1f1fa"], fname: "1f1fa", uc: "1f1fa", isCanonical: !0 }, ":regional_indicator_t:": { unicode: ["1f1f9"], fname: "1f1f9", uc: "1f1f9", isCanonical: !0 }, ":regional_indicator_s:": { unicode: ["1f1f8"], fname: "1f1f8", uc: "1f1f8", isCanonical: !0 }, ":regional_indicator_r:": { unicode: ["1f1f7"], fname: "1f1f7", uc: "1f1f7", isCanonical: !0 }, ":regional_indicator_q:": { unicode: ["1f1f6"], fname: "1f1f6", uc: "1f1f6", isCanonical: !0 }, ":regional_indicator_p:": { unicode: ["1f1f5"], fname: "1f1f5", uc: "1f1f5", isCanonical: !0 }, ":regional_indicator_o:": { unicode: ["1f1f4"], fname: "1f1f4", uc: "1f1f4", isCanonical: !0 }, ":regional_indicator_n:": { unicode: ["1f1f3"], fname: "1f1f3", uc: "1f1f3", isCanonical: !0 }, ":regional_indicator_m:": { unicode: ["1f1f2"], fname: "1f1f2", uc: "1f1f2", isCanonical: !0 }, ":regional_indicator_l:": { unicode: ["1f1f1"], fname: "1f1f1", uc: "1f1f1", isCanonical: !0 }, ":regional_indicator_k:": { unicode: ["1f1f0"], fname: "1f1f0", uc: "1f1f0", isCanonical: !0 }, ":regional_indicator_j:": { unicode: ["1f1ef"], fname: "1f1ef", uc: "1f1ef", isCanonical: !0 }, ":regional_indicator_i:": { unicode: ["1f1ee"], fname: "1f1ee", uc: "1f1ee", isCanonical: !0 }, ":regional_indicator_h:": { unicode: ["1f1ed"], fname: "1f1ed", uc: "1f1ed", isCanonical: !0 }, ":regional_indicator_g:": { unicode: ["1f1ec"], fname: "1f1ec", uc: "1f1ec", isCanonical: !0 }, ":regional_indicator_f:": { unicode: ["1f1eb"], fname: "1f1eb", uc: "1f1eb", isCanonical: !0 }, ":regional_indicator_e:": { unicode: ["1f1ea"], fname: "1f1ea", uc: "1f1ea", isCanonical: !0 }, ":regional_indicator_d:": { unicode: ["1f1e9"], fname: "1f1e9", uc: "1f1e9", isCanonical: !0 }, ":regional_indicator_c:": { unicode: ["1f1e8"], fname: "1f1e8", uc: "1f1e8", isCanonical: !0 }, ":regional_indicator_b:": { unicode: ["1f1e7"], fname: "1f1e7", uc: "1f1e7", isCanonical: !0 }, ":regional_indicator_a:": { unicode: ["1f1e6"], fname: "1f1e6", uc: "1f1e6", isCanonical: !0 }, ":fast_forward:": { unicode: ["23e9"], fname: "23e9", uc: "23e9", isCanonical: !0 }, ":rewind:": { unicode: ["23ea"], fname: "23ea", uc: "23ea", isCanonical: !0 }, ":arrow_double_up:": { unicode: ["23eb"], fname: "23eb", uc: "23eb", isCanonical: !0 }, ":arrow_double_down:": { unicode: ["23ec"], fname: "23ec", uc: "23ec", isCanonical: !0 }, ":alarm_clock:": { unicode: ["23f0"], fname: "23f0", uc: "23f0", isCanonical: !0 }, ":hourglass_flowing_sand:": { unicode: ["23f3"], fname: "23f3", uc: "23f3", isCanonical: !0 }, ":ophiuchus:": { unicode: ["26ce"], fname: "26ce", uc: "26ce", isCanonical: !0 }, ":white_check_mark:": { unicode: ["2705"], fname: "2705", uc: "2705", isCanonical: !0 }, ":fist:": { unicode: ["270a"], fname: "270a", uc: "270a", isCanonical: !0 }, ":raised_hand:": { unicode: ["270b"], fname: "270b", uc: "270b", isCanonical: !0 }, ":sparkles:": { unicode: ["2728"], fname: "2728", uc: "2728", isCanonical: !0 }, ":x:": { unicode: ["274c"], fname: "274c", uc: "274c", isCanonical: !0 }, ":negative_squared_cross_mark:": { unicode: ["274e"], fname: "274e", uc: "274e", isCanonical: !0 }, ":question:": { unicode: ["2753"], fname: "2753", uc: "2753", isCanonical: !0 }, ":grey_question:": { unicode: ["2754"], fname: "2754", uc: "2754", isCanonical: !0 }, ":grey_exclamation:": { unicode: ["2755"], fname: "2755", uc: "2755", isCanonical: !0 }, ":heavy_plus_sign:": { unicode: ["2795"], fname: "2795", uc: "2795", isCanonical: !0 }, ":heavy_minus_sign:": { unicode: ["2796"], fname: "2796", uc: "2796", isCanonical: !0 }, ":heavy_division_sign:": { unicode: ["2797"], fname: "2797", uc: "2797", isCanonical: !0 }, ":curly_loop:": { unicode: ["27b0"], fname: "27b0", uc: "27b0", isCanonical: !0 }, ":loop:": { unicode: ["27bf"], fname: "27bf", uc: "27bf", isCanonical: !0 } };var b,
      c = [];for (b in a.emojioneList) {
    a.emojioneList.hasOwnProperty(b) && c.push(b.replace(/[+]/g, "\\$&"));
  }a.shortnames = c.join("|"), a.asciiList = { "<3": "2764", "</3": "1f494", ":')": "1f602", ":'-)": "1f602", ":D": "1f603", ":-D": "1f603", "=D": "1f603", ":)": "1f642", ":-)": "1f642", "=]": "1f642", "=)": "1f642", ":]": "1f642", "':)": "1f605", "':-)": "1f605", "'=)": "1f605", "':D": "1f605", "':-D": "1f605", "'=D": "1f605", ">:)": "1f606", ">;)": "1f606", ">:-)": "1f606", ">=)": "1f606", ";)": "1f609", ";-)": "1f609", "*-)": "1f609", "*)": "1f609", ";-]": "1f609", ";]": "1f609", ";D": "1f609", ";^)": "1f609", "':(": "1f613", "':-(": "1f613", "'=(": "1f613", ":*": "1f618", ":-*": "1f618", "=*": "1f618", ":^*": "1f618", ">:P": "1f61c", "X-P": "1f61c", "x-p": "1f61c", ">:[": "1f61e", ":-(": "1f61e", ":(": "1f61e", ":-[": "1f61e", ":[": "1f61e", "=(": "1f61e", ">:(": "1f620", ">:-(": "1f620", ":@": "1f620", ":'(": "1f622", ":'-(": "1f622", ";(": "1f622", ";-(": "1f622", ">.<": "1f623", "D:": "1f628", ":$": "1f633", "=$": "1f633", "#-)": "1f635", "#)": "1f635", "%-)": "1f635", "%)": "1f635", "X)": "1f635", "X-)": "1f635", "*\\0/*": "1f646", "\\0/": "1f646", "*\\O/*": "1f646", "\\O/": "1f646", "O:-)": "1f607", "0:-3": "1f607", "0:3": "1f607", "0:-)": "1f607", "0:)": "1f607", "0;^)": "1f607", "O:)": "1f607", "O;-)": "1f607", "O=)": "1f607", "0;-)": "1f607", "O:-3": "1f607", "O:3": "1f607", "B-)": "1f60e", "B)": "1f60e", "8)": "1f60e", "8-)": "1f60e", "B-D": "1f60e", "8-D": "1f60e", "-_-": "1f611", "-__-": "1f611", "-___-": "1f611", ">:\\": "1f615", ">:/": "1f615", ":-/": "1f615", ":-.": "1f615", ":/": "1f615", ":\\": "1f615", "=/": "1f615", "=\\": "1f615", ":L": "1f615", "=L": "1f615", ":P": "1f61b", ":-P": "1f61b", "=P": "1f61b", ":-p": "1f61b", ":p": "1f61b", "=p": "1f61b", ":-Þ": "1f61b", ":Þ": "1f61b", ":þ": "1f61b", ":-þ": "1f61b", ":-b": "1f61b", ":b": "1f61b", "d:": "1f61b", ":-O": "1f62e", ":O": "1f62e", ":-o": "1f62e", ":o": "1f62e", O_O: "1f62e", ">:O": "1f62e", ":-X": "1f636", ":X": "1f636", ":-#": "1f636", ":#": "1f636", "=X": "1f636", "=x": "1f636", ":x": "1f636", ":-x": "1f636", "=#": "1f636" }, a.asciiRegexp = "(\\<3|&lt;3|\\<\\/3|&lt;\\/3|\\:'\\)|\\:'\\-\\)|\\:D|\\:\\-D|\\=D|\\:\\)|\\:\\-\\)|\\=\\]|\\=\\)|\\:\\]|'\\:\\)|'\\:\\-\\)|'\\=\\)|'\\:D|'\\:\\-D|'\\=D|\\>\\:\\)|&gt;\\:\\)|\\>;\\)|&gt;;\\)|\\>\\:\\-\\)|&gt;\\:\\-\\)|\\>\\=\\)|&gt;\\=\\)|;\\)|;\\-\\)|\\*\\-\\)|\\*\\)|;\\-\\]|;\\]|;D|;\\^\\)|'\\:\\(|'\\:\\-\\(|'\\=\\(|\\:\\*|\\:\\-\\*|\\=\\*|\\:\\^\\*|\\>\\:P|&gt;\\:P|X\\-P|x\\-p|\\>\\:\\[|&gt;\\:\\[|\\:\\-\\(|\\:\\(|\\:\\-\\[|\\:\\[|\\=\\(|\\>\\:\\(|&gt;\\:\\(|\\>\\:\\-\\(|&gt;\\:\\-\\(|\\:@|\\:'\\(|\\:'\\-\\(|;\\(|;\\-\\(|\\>\\.\\<|&gt;\\.&lt;|D\\:|\\:\\$|\\=\\$|#\\-\\)|#\\)|%\\-\\)|%\\)|X\\)|X\\-\\)|\\*\\\\0\\/\\*|\\\\0\\/|\\*\\\\O\\/\\*|\\\\O\\/|O\\:\\-\\)|0\\:\\-3|0\\:3|0\\:\\-\\)|0\\:\\)|0;\\^\\)|O\\:\\-\\)|O\\:\\)|O;\\-\\)|O\\=\\)|0;\\-\\)|O\\:\\-3|O\\:3|B\\-\\)|B\\)|8\\)|8\\-\\)|B\\-D|8\\-D|\\-_\\-|\\-__\\-|\\-___\\-|\\>\\:\\\\|&gt;\\:\\\\|\\>\\:\\/|&gt;\\:\\/|\\:\\-\\/|\\:\\-\\.|\\:\\/|\\:\\\\|\\=\\/|\\=\\\\|\\:L|\\=L|\\:P|\\:\\-P|\\=P|\\:\\-p|\\:p|\\=p|\\:\\-Þ|\\:\\-&THORN;|\\:Þ|\\:&THORN;|\\:þ|\\:&thorn;|\\:\\-þ|\\:\\-&thorn;|\\:\\-b|\\:b|d\\:|\\:\\-O|\\:O|\\:\\-o|\\:o|O_O|\\>\\:O|&gt;\\:O|\\:\\-X|\\:X|\\:\\-#|\\:#|\\=X|\\=x|\\:x|\\:\\-x|\\=#)", a.unicodeRegexp = "(\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC8B\\u200D\\uD83D\\uDC69|\\uD83D\\uDC68\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC8B\\u200D\\uD83D\\uDC68|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC69|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC66|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC66\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC66\\uD83D\\uDC66|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC67\\uD83D\\uDC67|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC66|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC67\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC67|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC67|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC66\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC68|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u2764\\uD83D\\uDC8B\\uD83D\\uDC69|\\uD83D\\uDC68\\u2764\\uD83D\\uDC8B\\uD83D\\uDC68|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC67|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC67|\\uD83C\\uDFF3\\uFE0F\\u200D\\uD83C\\uDF08|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC67|\\uD83D\\uDC68\\u2764\\uD83D\\uDC68|\\uD83D\\uDC41\\u200D\\uD83D\\uDDE8|\\uD83D\\uDC69\\u2764\\uD83D\\uDC69|\\uD83D\\uDC41\\uD83D\\uDDE8|\\uD83C\\uDDE6\\uD83C\\uDDE8|\\uD83C\\uDDE6\\uD83C\\uDDE9|\\uD83C\\uDDE6\\uD83C\\uDDEA|\\uD83C\\uDDE6\\uD83C\\uDDEB|\\uD83C\\uDDE6\\uD83C\\uDDEC|\\uD83C\\uDDE6\\uD83C\\uDDEE|\\uD83C\\uDDE6\\uD83C\\uDDF1|\\uD83C\\uDDE6\\uD83C\\uDDF2|\\uD83C\\uDDE6\\uD83C\\uDDF4|\\uD83C\\uDDE6\\uD83C\\uDDF6|\\uD83C\\uDDE6\\uD83C\\uDDF7|\\uD83C\\uDDE6\\uD83C\\uDDF8|\\uD83E\\uDD3E\\uD83C\\uDFFF|\\uD83E\\uDD3E\\uD83C\\uDFFE|\\uD83E\\uDD3E\\uD83C\\uDFFD|\\uD83E\\uDD3E\\uD83C\\uDFFC|\\uD83E\\uDD3E\\uD83C\\uDFFB|\\uD83E\\uDD3D\\uD83C\\uDFFF|\\uD83E\\uDD3D\\uD83C\\uDFFE|\\uD83E\\uDD3D\\uD83C\\uDFFD|\\uD83E\\uDD3D\\uD83C\\uDFFC|\\uD83E\\uDD3D\\uD83C\\uDFFB|\\uD83E\\uDD3C\\uD83C\\uDFFF|\\uD83E\\uDD3C\\uD83C\\uDFFE|\\uD83E\\uDD3C\\uD83C\\uDFFD|\\uD83E\\uDD3C\\uD83C\\uDFFC|\\uD83E\\uDD3C\\uD83C\\uDFFB|\\uD83E\\uDD39\\uD83C\\uDFFF|\\uD83E\\uDD39\\uD83C\\uDFFE|\\uD83E\\uDD39\\uD83C\\uDFFD|\\uD83E\\uDD39\\uD83C\\uDFFC|\\uD83E\\uDD39\\uD83C\\uDFFB|\\uD83E\\uDD38\\uD83C\\uDFFF|\\uD83E\\uDD38\\uD83C\\uDFFE|\\uD83E\\uDD38\\uD83C\\uDFFD|\\uD83E\\uDD38\\uD83C\\uDFFC|\\uD83E\\uDD38\\uD83C\\uDFFB|\\uD83E\\uDD37\\uD83C\\uDFFF|\\uD83E\\uDD37\\uD83C\\uDFFE|\\uD83E\\uDD37\\uD83C\\uDFFD|\\uD83E\\uDD37\\uD83C\\uDFFC|\\uD83E\\uDD37\\uD83C\\uDFFB|\\uD83E\\uDD36\\uD83C\\uDFFF|\\uD83E\\uDD36\\uD83C\\uDFFE|\\uD83E\\uDD36\\uD83C\\uDFFD|\\uD83E\\uDD36\\uD83C\\uDFFC|\\uD83E\\uDD36\\uD83C\\uDFFB|\\uD83E\\uDD35\\uD83C\\uDFFF|\\uD83E\\uDD35\\uD83C\\uDFFE|\\uD83E\\uDD35\\uD83C\\uDFFD|\\uD83E\\uDD35\\uD83C\\uDFFC|\\uD83E\\uDD35\\uD83C\\uDFFB|\\uD83E\\uDD34\\uD83C\\uDFFF|\\uD83E\\uDD34\\uD83C\\uDFFE|\\uD83E\\uDD34\\uD83C\\uDFFD|\\uD83E\\uDD34\\uD83C\\uDFFC|\\uD83E\\uDD34\\uD83C\\uDFFB|\\uD83E\\uDD33\\uD83C\\uDFFF|\\uD83E\\uDD33\\uD83C\\uDFFE|\\uD83E\\uDD33\\uD83C\\uDFFD|\\uD83E\\uDD33\\uD83C\\uDFFC|\\uD83E\\uDD33\\uD83C\\uDFFB|\\uD83E\\uDD30\\uD83C\\uDFFF|\\uD83E\\uDD30\\uD83C\\uDFFE|\\uD83E\\uDD30\\uD83C\\uDFFD|\\uD83E\\uDD30\\uD83C\\uDFFC|\\uD83E\\uDD30\\uD83C\\uDFFB|\\uD83E\\uDD26\\uD83C\\uDFFF|\\uD83E\\uDD26\\uD83C\\uDFFE|\\uD83E\\uDD26\\uD83C\\uDFFD|\\uD83E\\uDD26\\uD83C\\uDFFC|\\uD83E\\uDD26\\uD83C\\uDFFB|\\uD83E\\uDD1E\\uD83C\\uDFFF|\\uD83E\\uDD1E\\uD83C\\uDFFE|\\uD83E\\uDD1E\\uD83C\\uDFFD|\\uD83E\\uDD1E\\uD83C\\uDFFC|\\uD83E\\uDD1E\\uD83C\\uDFFB|\\uD83E\\uDD1D\\uD83C\\uDFFF|\\uD83E\\uDD1D\\uD83C\\uDFFE|\\uD83E\\uDD1D\\uD83C\\uDFFD|\\uD83E\\uDD1D\\uD83C\\uDFFC|\\uD83E\\uDD1D\\uD83C\\uDFFB|\\uD83E\\uDD1C\\uD83C\\uDFFF|\\uD83E\\uDD1C\\uD83C\\uDFFE|\\uD83E\\uDD1C\\uD83C\\uDFFD|\\uD83E\\uDD1C\\uD83C\\uDFFC|\\uD83E\\uDD1C\\uD83C\\uDFFB|\\uD83E\\uDD1B\\uD83C\\uDFFF|\\uD83E\\uDD1B\\uD83C\\uDFFE|\\uD83E\\uDD1B\\uD83C\\uDFFD|\\uD83E\\uDD1B\\uD83C\\uDFFC|\\uD83E\\uDD1B\\uD83C\\uDFFB|\\uD83E\\uDD1A\\uD83C\\uDFFF|\\uD83E\\uDD1A\\uD83C\\uDFFE|\\uD83E\\uDD1A\\uD83C\\uDFFD|\\uD83E\\uDD1A\\uD83C\\uDFFC|\\uD83E\\uDD1A\\uD83C\\uDFFB|\\uD83E\\uDD19\\uD83C\\uDFFF|\\uD83E\\uDD19\\uD83C\\uDFFE|\\uD83E\\uDD19\\uD83C\\uDFFD|\\uD83E\\uDD19\\uD83C\\uDFFC|\\uD83E\\uDD19\\uD83C\\uDFFB|\\uD83E\\uDD18\\uD83C\\uDFFF|\\uD83E\\uDD18\\uD83C\\uDFFE|\\uD83E\\uDD18\\uD83C\\uDFFD|\\uD83E\\uDD18\\uD83C\\uDFFC|\\uD83E\\uDD18\\uD83C\\uDFFB|\\uD83D\\uDEC0\\uD83C\\uDFFF|\\uD83D\\uDEC0\\uD83C\\uDFFE|\\uD83D\\uDEC0\\uD83C\\uDFFD|\\uD83D\\uDEC0\\uD83C\\uDFFC|\\uD83D\\uDEC0\\uD83C\\uDFFB|\\uD83D\\uDEB6\\uD83C\\uDFFF|\\uD83D\\uDEB6\\uD83C\\uDFFE|\\uD83D\\uDEB6\\uD83C\\uDFFD|\\uD83D\\uDEB6\\uD83C\\uDFFC|\\uD83D\\uDEB6\\uD83C\\uDFFB|\\uD83D\\uDEB5\\uD83C\\uDFFF|\\uD83D\\uDEB5\\uD83C\\uDFFE|\\uD83D\\uDEB5\\uD83C\\uDFFD|\\uD83D\\uDEB5\\uD83C\\uDFFC|\\uD83D\\uDEB5\\uD83C\\uDFFB|\\uD83D\\uDEB4\\uD83C\\uDFFF|\\uD83D\\uDEB4\\uD83C\\uDFFE|\\uD83D\\uDEB4\\uD83C\\uDFFD|\\uD83D\\uDEB4\\uD83C\\uDFFC|\\uD83D\\uDEB4\\uD83C\\uDFFB|\\uD83D\\uDEA3\\uD83C\\uDFFF|\\uD83D\\uDEA3\\uD83C\\uDFFE|\\uD83D\\uDEA3\\uD83C\\uDFFD|\\uD83D\\uDEA3\\uD83C\\uDFFC|\\uD83D\\uDEA3\\uD83C\\uDFFB|\\uD83D\\uDE4F\\uD83C\\uDFFF|\\uD83D\\uDE4F\\uD83C\\uDFFE|\\uD83D\\uDE4F\\uD83C\\uDFFD|\\uD83D\\uDE4F\\uD83C\\uDFFC|\\uD83D\\uDE4F\\uD83C\\uDFFB|\\uD83D\\uDE4E\\uD83C\\uDFFF|\\uD83D\\uDE4E\\uD83C\\uDFFE|\\uD83D\\uDE4E\\uD83C\\uDFFD|\\uD83D\\uDE4E\\uD83C\\uDFFC|\\uD83D\\uDE4E\\uD83C\\uDFFB|\\uD83D\\uDE4D\\uD83C\\uDFFF|\\uD83D\\uDE4D\\uD83C\\uDFFE|\\uD83D\\uDE4D\\uD83C\\uDFFD|\\uD83D\\uDE4D\\uD83C\\uDFFC|\\uD83D\\uDE4D\\uD83C\\uDFFB|\\uD83D\\uDE4C\\uD83C\\uDFFF|\\uD83D\\uDE4C\\uD83C\\uDFFE|\\uD83D\\uDE4C\\uD83C\\uDFFD|\\uD83D\\uDE4C\\uD83C\\uDFFC|\\uD83D\\uDE4C\\uD83C\\uDFFB|\\uD83D\\uDE4B\\uD83C\\uDFFF|\\uD83D\\uDE4B\\uD83C\\uDFFE|\\uD83D\\uDE4B\\uD83C\\uDFFD|\\uD83D\\uDE4B\\uD83C\\uDFFC|\\uD83D\\uDE4B\\uD83C\\uDFFB|\\uD83D\\uDE47\\uD83C\\uDFFF|\\uD83D\\uDE47\\uD83C\\uDFFE|\\uD83D\\uDE47\\uD83C\\uDFFD|\\uD83D\\uDE47\\uD83C\\uDFFC|\\uD83D\\uDE47\\uD83C\\uDFFB|\\uD83D\\uDE46\\uD83C\\uDFFF|\\uD83D\\uDE46\\uD83C\\uDFFE|\\uD83D\\uDE46\\uD83C\\uDFFD|\\uD83D\\uDE46\\uD83C\\uDFFC|\\uD83D\\uDE46\\uD83C\\uDFFB|\\uD83D\\uDE45\\uD83C\\uDFFF|\\uD83D\\uDE45\\uD83C\\uDFFE|\\uD83D\\uDE45\\uD83C\\uDFFD|\\uD83D\\uDE45\\uD83C\\uDFFC|\\uD83D\\uDE45\\uD83C\\uDFFB|\\uD83D\\uDD96\\uD83C\\uDFFF|\\uD83D\\uDD96\\uD83C\\uDFFE|\\uD83D\\uDD96\\uD83C\\uDFFD|\\uD83D\\uDD96\\uD83C\\uDFFC|\\uD83D\\uDD96\\uD83C\\uDFFB|\\uD83D\\uDD95\\uD83C\\uDFFF|\\uD83D\\uDD95\\uD83C\\uDFFE|\\uD83D\\uDD95\\uD83C\\uDFFD|\\uD83D\\uDD95\\uD83C\\uDFFC|\\uD83D\\uDD95\\uD83C\\uDFFB|\\uD83D\\uDD90\\uD83C\\uDFFF|\\uD83D\\uDD90\\uD83C\\uDFFE|\\uD83D\\uDD90\\uD83C\\uDFFD|\\uD83D\\uDD90\\uD83C\\uDFFC|\\uD83D\\uDD90\\uD83C\\uDFFB|\\uD83D\\uDD7A\\uD83C\\uDFFF|\\uD83D\\uDD7A\\uD83C\\uDFFE|\\uD83D\\uDD7A\\uD83C\\uDFFD|\\uD83D\\uDD7A\\uD83C\\uDFFC|\\uD83D\\uDD7A\\uD83C\\uDFFB|\\uD83D\\uDD75\\uD83C\\uDFFF|\\uD83D\\uDD75\\uD83C\\uDFFE|\\uD83D\\uDD75\\uD83C\\uDFFD|\\uD83D\\uDD75\\uD83C\\uDFFC|\\uD83D\\uDD75\\uD83C\\uDFFB|\\uD83D\\uDCAA\\uD83C\\uDFFF|\\uD83D\\uDCAA\\uD83C\\uDFFE|\\uD83D\\uDCAA\\uD83C\\uDFFD|\\uD83D\\uDCAA\\uD83C\\uDFFC|\\uD83D\\uDCAA\\uD83C\\uDFFB|\\uD83D\\uDC87\\uD83C\\uDFFF|\\uD83D\\uDC87\\uD83C\\uDFFE|\\uD83D\\uDC87\\uD83C\\uDFFD|\\uD83D\\uDC87\\uD83C\\uDFFC|\\uD83D\\uDC87\\uD83C\\uDFFB|\\uD83D\\uDC86\\uD83C\\uDFFF|\\uD83D\\uDC86\\uD83C\\uDFFE|\\uD83D\\uDC86\\uD83C\\uDFFD|\\uD83D\\uDC86\\uD83C\\uDFFC|\\uD83D\\uDC86\\uD83C\\uDFFB|\\uD83D\\uDC85\\uD83C\\uDFFF|\\uD83D\\uDC85\\uD83C\\uDFFE|\\uD83D\\uDC85\\uD83C\\uDFFD|\\uD83D\\uDC85\\uD83C\\uDFFC|\\uD83D\\uDC85\\uD83C\\uDFFB|\\uD83D\\uDC83\\uD83C\\uDFFF|\\uD83D\\uDC83\\uD83C\\uDFFE|\\uD83D\\uDC83\\uD83C\\uDFFD|\\uD83D\\uDC83\\uD83C\\uDFFC|\\uD83D\\uDC83\\uD83C\\uDFFB|\\uD83D\\uDC82\\uD83C\\uDFFF|\\uD83D\\uDC82\\uD83C\\uDFFE|\\uD83D\\uDC82\\uD83C\\uDFFD|\\uD83D\\uDC82\\uD83C\\uDFFC|\\uD83D\\uDC82\\uD83C\\uDFFB|\\uD83D\\uDC81\\uD83C\\uDFFF|\\uD83D\\uDC81\\uD83C\\uDFFE|\\uD83D\\uDC81\\uD83C\\uDFFD|\\uD83D\\uDC81\\uD83C\\uDFFC|\\uD83D\\uDC81\\uD83C\\uDFFB|\\uD83D\\uDC7C\\uD83C\\uDFFF|\\uD83D\\uDC7C\\uD83C\\uDFFE|\\uD83D\\uDC7C\\uD83C\\uDFFD|\\uD83D\\uDC7C\\uD83C\\uDFFC|\\uD83D\\uDC7C\\uD83C\\uDFFB|\\uD83D\\uDC78\\uD83C\\uDFFF|\\uD83D\\uDC78\\uD83C\\uDFFE|\\uD83D\\uDC78\\uD83C\\uDFFD|\\uD83D\\uDC78\\uD83C\\uDFFC|\\uD83D\\uDC78\\uD83C\\uDFFB|\\uD83D\\uDC77\\uD83C\\uDFFF|\\uD83D\\uDC77\\uD83C\\uDFFE|\\uD83D\\uDC77\\uD83C\\uDFFD|\\uD83D\\uDC77\\uD83C\\uDFFC|\\uD83D\\uDC77\\uD83C\\uDFFB|\\uD83D\\uDC76\\uD83C\\uDFFF|\\uD83D\\uDC76\\uD83C\\uDFFE|\\uD83D\\uDC76\\uD83C\\uDFFD|\\uD83D\\uDC76\\uD83C\\uDFFC|\\uD83D\\uDC76\\uD83C\\uDFFB|\\uD83D\\uDC75\\uD83C\\uDFFF|\\uD83D\\uDC75\\uD83C\\uDFFE|\\uD83D\\uDC75\\uD83C\\uDFFD|\\uD83D\\uDC75\\uD83C\\uDFFC|\\uD83D\\uDC75\\uD83C\\uDFFB|\\uD83D\\uDC74\\uD83C\\uDFFF|\\uD83D\\uDC74\\uD83C\\uDFFE|\\uD83D\\uDC74\\uD83C\\uDFFD|\\uD83D\\uDC74\\uD83C\\uDFFC|\\uD83D\\uDC74\\uD83C\\uDFFB|\\uD83D\\uDC73\\uD83C\\uDFFF|\\uD83D\\uDC73\\uD83C\\uDFFE|\\uD83D\\uDC73\\uD83C\\uDFFD|\\uD83D\\uDC73\\uD83C\\uDFFC|\\uD83D\\uDC73\\uD83C\\uDFFB|\\uD83D\\uDC72\\uD83C\\uDFFF|\\uD83D\\uDC72\\uD83C\\uDFFE|\\uD83D\\uDC72\\uD83C\\uDFFD|\\uD83D\\uDC72\\uD83C\\uDFFC|\\uD83D\\uDC72\\uD83C\\uDFFB|\\uD83D\\uDC71\\uD83C\\uDFFF|\\uD83D\\uDC71\\uD83C\\uDFFE|\\uD83D\\uDC71\\uD83C\\uDFFD|\\uD83D\\uDC71\\uD83C\\uDFFC|\\uD83D\\uDC71\\uD83C\\uDFFB|\\uD83D\\uDC70\\uD83C\\uDFFF|\\uD83D\\uDC70\\uD83C\\uDFFE|\\uD83D\\uDC70\\uD83C\\uDFFD|\\uD83D\\uDC70\\uD83C\\uDFFC|\\uD83D\\uDC70\\uD83C\\uDFFB|\\uD83D\\uDC6E\\uD83C\\uDFFF|\\uD83D\\uDC6E\\uD83C\\uDFFE|\\uD83D\\uDC6E\\uD83C\\uDFFD|\\uD83D\\uDC6E\\uD83C\\uDFFC|\\uD83D\\uDC6E\\uD83C\\uDFFB|\\uD83D\\uDC69\\uD83C\\uDFFF|\\uD83D\\uDC69\\uD83C\\uDFFE|\\uD83D\\uDC69\\uD83C\\uDFFD|\\uD83D\\uDC69\\uD83C\\uDFFC|\\uD83D\\uDC69\\uD83C\\uDFFB|\\uD83D\\uDC68\\uD83C\\uDFFF|\\uD83D\\uDC68\\uD83C\\uDFFE|\\uD83D\\uDC68\\uD83C\\uDFFD|\\uD83D\\uDC68\\uD83C\\uDFFC|\\uD83D\\uDC68\\uD83C\\uDFFB|\\uD83D\\uDC67\\uD83C\\uDFFF|\\uD83D\\uDC67\\uD83C\\uDFFE|\\uD83D\\uDC67\\uD83C\\uDFFD|\\uD83D\\uDC67\\uD83C\\uDFFC|\\uD83D\\uDC67\\uD83C\\uDFFB|\\uD83D\\uDC66\\uD83C\\uDFFF|\\uD83D\\uDC66\\uD83C\\uDFFE|\\uD83D\\uDC66\\uD83C\\uDFFD|\\uD83D\\uDC66\\uD83C\\uDFFC|\\uD83D\\uDC66\\uD83C\\uDFFB|\\uD83D\\uDC50\\uD83C\\uDFFF|\\uD83D\\uDC50\\uD83C\\uDFFE|\\uD83D\\uDC50\\uD83C\\uDFFD|\\uD83D\\uDC50\\uD83C\\uDFFC|\\uD83D\\uDC50\\uD83C\\uDFFB|\\uD83D\\uDC4F\\uD83C\\uDFFF|\\uD83D\\uDC4F\\uD83C\\uDFFE|\\uD83D\\uDC4F\\uD83C\\uDFFD|\\uD83D\\uDC4F\\uD83C\\uDFFC|\\uD83D\\uDC4F\\uD83C\\uDFFB|\\uD83D\\uDC4E\\uD83C\\uDFFF|\\uD83D\\uDC4E\\uD83C\\uDFFE|\\uD83D\\uDC4E\\uD83C\\uDFFD|\\uD83D\\uDC4E\\uD83C\\uDFFC|\\uD83D\\uDC4E\\uD83C\\uDFFB|\\uD83D\\uDC4D\\uD83C\\uDFFF|\\uD83D\\uDC4D\\uD83C\\uDFFE|\\uD83D\\uDC4D\\uD83C\\uDFFD|\\uD83D\\uDC4D\\uD83C\\uDFFC|\\uD83D\\uDC4D\\uD83C\\uDFFB|\\uD83D\\uDC4C\\uD83C\\uDFFF|\\uD83D\\uDC4C\\uD83C\\uDFFE|\\uD83D\\uDC4C\\uD83C\\uDFFD|\\uD83D\\uDC4C\\uD83C\\uDFFC|\\uD83D\\uDC4C\\uD83C\\uDFFB|\\uD83D\\uDC4B\\uD83C\\uDFFF|\\uD83D\\uDC4B\\uD83C\\uDFFE|\\uD83D\\uDC4B\\uD83C\\uDFFD|\\uD83D\\uDC4B\\uD83C\\uDFFC|\\uD83D\\uDC4B\\uD83C\\uDFFB|\\uD83D\\uDC4A\\uD83C\\uDFFF|\\uD83D\\uDC4A\\uD83C\\uDFFE|\\uD83D\\uDC4A\\uD83C\\uDFFD|\\uD83D\\uDC4A\\uD83C\\uDFFC|\\uD83D\\uDC4A\\uD83C\\uDFFB|\\uD83D\\uDC49\\uD83C\\uDFFF|\\uD83D\\uDC49\\uD83C\\uDFFE|\\uD83D\\uDC49\\uD83C\\uDFFD|\\uD83D\\uDC49\\uD83C\\uDFFC|\\uD83D\\uDC49\\uD83C\\uDFFB|\\uD83D\\uDC48\\uD83C\\uDFFF|\\uD83D\\uDC48\\uD83C\\uDFFE|\\uD83D\\uDC48\\uD83C\\uDFFD|\\uD83D\\uDC48\\uD83C\\uDFFC|\\uD83D\\uDC48\\uD83C\\uDFFB|\\uD83D\\uDC47\\uD83C\\uDFFF|\\uD83D\\uDC47\\uD83C\\uDFFE|\\uD83D\\uDC47\\uD83C\\uDFFD|\\uD83D\\uDC47\\uD83C\\uDFFC|\\uD83D\\uDC47\\uD83C\\uDFFB|\\uD83D\\uDC46\\uD83C\\uDFFF|\\uD83D\\uDC46\\uD83C\\uDFFE|\\uD83D\\uDC46\\uD83C\\uDFFD|\\uD83D\\uDC46\\uD83C\\uDFFC|\\uD83D\\uDC46\\uD83C\\uDFFB|\\uD83D\\uDC43\\uD83C\\uDFFF|\\uD83D\\uDC43\\uD83C\\uDFFE|\\uD83D\\uDC43\\uD83C\\uDFFD|\\uD83D\\uDC43\\uD83C\\uDFFC|\\uD83D\\uDC43\\uD83C\\uDFFB|\\uD83D\\uDC42\\uD83C\\uDFFF|\\uD83D\\uDC42\\uD83C\\uDFFE|\\uD83D\\uDC42\\uD83C\\uDFFD|\\uD83D\\uDC42\\uD83C\\uDFFC|\\uD83D\\uDC42\\uD83C\\uDFFB|\\uD83C\\uDFCB\\uD83C\\uDFFF|\\uD83C\\uDFCB\\uD83C\\uDFFE|\\uD83C\\uDFF3\\uD83C\\uDF08|\\uD83C\\uDFCB\\uD83C\\uDFFC|\\uD83C\\uDFCB\\uD83C\\uDFFB|\\uD83C\\uDFCA\\uD83C\\uDFFF|\\uD83C\\uDFCA\\uD83C\\uDFFE|\\uD83C\\uDFCA\\uD83C\\uDFFD|\\uD83C\\uDFCA\\uD83C\\uDFFC|\\uD83C\\uDFCA\\uD83C\\uDFFB|\\uD83C\\uDFC7\\uD83C\\uDFFF|\\uD83C\\uDFC7\\uD83C\\uDFFE|\\uD83C\\uDFC7\\uD83C\\uDFFD|\\uD83C\\uDFC7\\uD83C\\uDFFC|\\uD83C\\uDFC7\\uD83C\\uDFFB|\\uD83C\\uDFC4\\uD83C\\uDFFF|\\uD83C\\uDFCB\\uD83C\\uDFFD|\\uD83C\\uDFC4\\uD83C\\uDFFD|\\uD83C\\uDFC4\\uD83C\\uDFFC|\\uD83C\\uDFC4\\uD83C\\uDFFB|\\uD83C\\uDFC3\\uD83C\\uDFFF|\\uD83C\\uDFC3\\uD83C\\uDFFE|\\uD83C\\uDFC3\\uD83C\\uDFFD|\\uD83C\\uDFC3\\uD83C\\uDFFC|\\uD83C\\uDFC3\\uD83C\\uDFFB|\\uD83C\\uDF85\\uD83C\\uDFFF|\\uD83C\\uDF85\\uD83C\\uDFFE|\\uD83C\\uDF85\\uD83C\\uDFFD|\\uD83C\\uDF85\\uD83C\\uDFFC|\\uD83C\\uDF85\\uD83C\\uDFFB|\\uD83C\\uDDFF\\uD83C\\uDDFC|\\uD83C\\uDDFF\\uD83C\\uDDF2|\\uD83C\\uDDFF\\uD83C\\uDDE6|\\uD83C\\uDDFE\\uD83C\\uDDF9|\\uD83C\\uDDFE\\uD83C\\uDDEA|\\uD83C\\uDDFD\\uD83C\\uDDF0|\\uD83C\\uDDFC\\uD83C\\uDDF8|\\uD83C\\uDDFC\\uD83C\\uDDEB|\\uD83C\\uDDFB\\uD83C\\uDDFA|\\uD83C\\uDDFB\\uD83C\\uDDF3|\\uD83C\\uDDFB\\uD83C\\uDDEE|\\uD83C\\uDDFB\\uD83C\\uDDEC|\\uD83C\\uDDFB\\uD83C\\uDDEA|\\uD83C\\uDDFB\\uD83C\\uDDE8|\\uD83C\\uDDFB\\uD83C\\uDDE6|\\uD83C\\uDDFA\\uD83C\\uDDFF|\\uD83C\\uDDFA\\uD83C\\uDDFE|\\uD83C\\uDDFA\\uD83C\\uDDF8|\\uD83C\\uDDFA\\uD83C\\uDDF2|\\uD83C\\uDDFA\\uD83C\\uDDEC|\\uD83C\\uDDFA\\uD83C\\uDDE6|\\uD83C\\uDDF9\\uD83C\\uDDFF|\\uD83C\\uDDF9\\uD83C\\uDDFC|\\uD83C\\uDDF9\\uD83C\\uDDFB|\\uD83C\\uDDF9\\uD83C\\uDDF9|\\uD83C\\uDDF9\\uD83C\\uDDF7|\\uD83C\\uDDF9\\uD83C\\uDDF4|\\uD83C\\uDDF9\\uD83C\\uDDF3|\\uD83C\\uDDF9\\uD83C\\uDDF2|\\uD83C\\uDDF9\\uD83C\\uDDF1|\\uD83C\\uDDF9\\uD83C\\uDDF0|\\uD83C\\uDDF9\\uD83C\\uDDEF|\\uD83C\\uDDF9\\uD83C\\uDDED|\\uD83C\\uDDF9\\uD83C\\uDDEC|\\uD83C\\uDDF9\\uD83C\\uDDEB|\\uD83C\\uDDF9\\uD83C\\uDDE9|\\uD83C\\uDDF9\\uD83C\\uDDE8|\\uD83C\\uDDF9\\uD83C\\uDDE6|\\uD83C\\uDDF8\\uD83C\\uDDFF|\\uD83C\\uDDF8\\uD83C\\uDDFE|\\uD83C\\uDDF8\\uD83C\\uDDFD|\\uD83C\\uDDF8\\uD83C\\uDDFB|\\uD83C\\uDDF8\\uD83C\\uDDF9|\\uD83C\\uDDF8\\uD83C\\uDDF8|\\uD83C\\uDDF8\\uD83C\\uDDF7|\\uD83C\\uDDF8\\uD83C\\uDDF4|\\uD83C\\uDDF8\\uD83C\\uDDF3|\\uD83C\\uDDF8\\uD83C\\uDDF2|\\uD83C\\uDDF8\\uD83C\\uDDF1|\\uD83C\\uDDF8\\uD83C\\uDDF0|\\uD83C\\uDDF8\\uD83C\\uDDEF|\\uD83C\\uDDF8\\uD83C\\uDDEE|\\uD83C\\uDDF8\\uD83C\\uDDED|\\uD83C\\uDDF8\\uD83C\\uDDEC|\\uD83C\\uDDF8\\uD83C\\uDDEA|\\uD83C\\uDDF8\\uD83C\\uDDE9|\\uD83C\\uDDF8\\uD83C\\uDDE8|\\uD83C\\uDDF8\\uD83C\\uDDE7|\\uD83C\\uDDF8\\uD83C\\uDDE6|\\uD83C\\uDDF7\\uD83C\\uDDFC|\\uD83C\\uDDF7\\uD83C\\uDDFA|\\uD83C\\uDDF7\\uD83C\\uDDF8|\\uD83C\\uDDF7\\uD83C\\uDDF4|\\uD83C\\uDDF7\\uD83C\\uDDEA|\\uD83C\\uDDF6\\uD83C\\uDDE6|\\uD83C\\uDDF5\\uD83C\\uDDFE|\\uD83C\\uDDF5\\uD83C\\uDDFC|\\uD83C\\uDDF5\\uD83C\\uDDF9|\\uD83C\\uDDF5\\uD83C\\uDDF8|\\uD83C\\uDDF5\\uD83C\\uDDF7|\\uD83C\\uDDF5\\uD83C\\uDDF3|\\uD83C\\uDDF5\\uD83C\\uDDF2|\\uD83C\\uDDF5\\uD83C\\uDDF1|\\uD83C\\uDDF5\\uD83C\\uDDF0|\\uD83C\\uDDF5\\uD83C\\uDDED|\\uD83C\\uDDF5\\uD83C\\uDDEC|\\uD83C\\uDDF5\\uD83C\\uDDEB|\\uD83C\\uDDF5\\uD83C\\uDDEA|\\uD83C\\uDDF5\\uD83C\\uDDE6|\\uD83C\\uDDF4\\uD83C\\uDDF2|\\uD83C\\uDDF3\\uD83C\\uDDFF|\\uD83C\\uDDF3\\uD83C\\uDDFA|\\uD83C\\uDDF3\\uD83C\\uDDF7|\\uD83C\\uDDF3\\uD83C\\uDDF5|\\uD83C\\uDDF3\\uD83C\\uDDF4|\\uD83C\\uDDF3\\uD83C\\uDDF1|\\uD83C\\uDDF3\\uD83C\\uDDEE|\\uD83C\\uDDF3\\uD83C\\uDDEC|\\uD83C\\uDDF3\\uD83C\\uDDEB|\\uD83C\\uDDF3\\uD83C\\uDDEA|\\uD83C\\uDDF3\\uD83C\\uDDE8|\\uD83C\\uDDF3\\uD83C\\uDDE6|\\uD83C\\uDDF2\\uD83C\\uDDFF|\\uD83C\\uDDF2\\uD83C\\uDDFE|\\uD83C\\uDDF2\\uD83C\\uDDFD|\\uD83C\\uDDF2\\uD83C\\uDDFC|\\uD83C\\uDDF2\\uD83C\\uDDFB|\\uD83C\\uDDF2\\uD83C\\uDDFA|\\uD83C\\uDDF2\\uD83C\\uDDF9|\\uD83C\\uDDF2\\uD83C\\uDDF8|\\uD83C\\uDDF2\\uD83C\\uDDF7|\\uD83C\\uDDF2\\uD83C\\uDDF6|\\uD83C\\uDDF2\\uD83C\\uDDF5|\\uD83C\\uDDF2\\uD83C\\uDDF4|\\uD83C\\uDDF2\\uD83C\\uDDF3|\\uD83C\\uDDF2\\uD83C\\uDDF2|\\uD83C\\uDDF2\\uD83C\\uDDF1|\\uD83C\\uDDF2\\uD83C\\uDDF0|\\uD83C\\uDDF2\\uD83C\\uDDED|\\uD83C\\uDDF2\\uD83C\\uDDEC|\\uD83C\\uDDF2\\uD83C\\uDDEB|\\uD83C\\uDDF2\\uD83C\\uDDEA|\\uD83C\\uDDF2\\uD83C\\uDDE9|\\uD83C\\uDDF2\\uD83C\\uDDE8|\\uD83C\\uDDF2\\uD83C\\uDDE6|\\uD83C\\uDDF1\\uD83C\\uDDFE|\\uD83C\\uDDF1\\uD83C\\uDDFB|\\uD83C\\uDDF1\\uD83C\\uDDFA|\\uD83C\\uDDF1\\uD83C\\uDDF9|\\uD83C\\uDDF1\\uD83C\\uDDF8|\\uD83C\\uDDF1\\uD83C\\uDDF7|\\uD83C\\uDDF1\\uD83C\\uDDF0|\\uD83C\\uDDF1\\uD83C\\uDDEE|\\uD83C\\uDDF1\\uD83C\\uDDE8|\\uD83C\\uDDF1\\uD83C\\uDDE7|\\uD83C\\uDDF1\\uD83C\\uDDE6|\\uD83C\\uDDF0\\uD83C\\uDDFF|\\uD83C\\uDDF0\\uD83C\\uDDFE|\\uD83C\\uDDF0\\uD83C\\uDDFC|\\uD83C\\uDDF0\\uD83C\\uDDF7|\\uD83C\\uDDF0\\uD83C\\uDDF5|\\uD83C\\uDDF0\\uD83C\\uDDF3|\\uD83C\\uDDF0\\uD83C\\uDDF2|\\uD83C\\uDDF0\\uD83C\\uDDEE|\\uD83C\\uDDF0\\uD83C\\uDDED|\\uD83C\\uDDF0\\uD83C\\uDDEC|\\uD83C\\uDDF0\\uD83C\\uDDEA|\\uD83C\\uDDEF\\uD83C\\uDDF5|\\uD83C\\uDDEF\\uD83C\\uDDF4|\\uD83C\\uDDEF\\uD83C\\uDDF2|\\uD83C\\uDDEF\\uD83C\\uDDEA|\\uD83C\\uDDEE\\uD83C\\uDDF9|\\uD83C\\uDDEE\\uD83C\\uDDF8|\\uD83C\\uDDEE\\uD83C\\uDDF7|\\uD83C\\uDDEE\\uD83C\\uDDF6|\\uD83C\\uDDEE\\uD83C\\uDDF4|\\uD83C\\uDDEE\\uD83C\\uDDF3|\\uD83C\\uDDEE\\uD83C\\uDDF2|\\uD83C\\uDDEE\\uD83C\\uDDF1|\\uD83C\\uDDEE\\uD83C\\uDDEA|\\uD83C\\uDDEE\\uD83C\\uDDE9|\\uD83C\\uDDEE\\uD83C\\uDDE8|\\uD83C\\uDDED\\uD83C\\uDDFA|\\uD83C\\uDDED\\uD83C\\uDDF9|\\uD83C\\uDDED\\uD83C\\uDDF7|\\uD83C\\uDDED\\uD83C\\uDDF3|\\uD83C\\uDDED\\uD83C\\uDDF2|\\uD83C\\uDDED\\uD83C\\uDDF0|\\uD83C\\uDDEC\\uD83C\\uDDFE|\\uD83C\\uDDEC\\uD83C\\uDDFC|\\uD83C\\uDDEC\\uD83C\\uDDFA|\\uD83C\\uDDEC\\uD83C\\uDDF9|\\uD83C\\uDDEC\\uD83C\\uDDF8|\\uD83C\\uDDEC\\uD83C\\uDDF7|\\uD83C\\uDDEC\\uD83C\\uDDF6|\\uD83C\\uDDEC\\uD83C\\uDDF5|\\uD83C\\uDDEC\\uD83C\\uDDF3|\\uD83C\\uDDEC\\uD83C\\uDDF2|\\uD83C\\uDDEC\\uD83C\\uDDF1|\\uD83C\\uDDEC\\uD83C\\uDDEE|\\uD83C\\uDDEC\\uD83C\\uDDED|\\uD83C\\uDDEC\\uD83C\\uDDEC|\\uD83C\\uDDEC\\uD83C\\uDDEB|\\uD83C\\uDDEC\\uD83C\\uDDEA|\\uD83C\\uDDEC\\uD83C\\uDDE9|\\uD83C\\uDDEC\\uD83C\\uDDE7|\\uD83C\\uDDEC\\uD83C\\uDDE6|\\uD83C\\uDDEB\\uD83C\\uDDF7|\\uD83C\\uDDEB\\uD83C\\uDDF4|\\uD83C\\uDDEB\\uD83C\\uDDF2|\\uD83C\\uDDEB\\uD83C\\uDDF0|\\uD83C\\uDDEB\\uD83C\\uDDEF|\\uD83C\\uDDEB\\uD83C\\uDDEE|\\uD83C\\uDDEA\\uD83C\\uDDFA|\\uD83C\\uDDEA\\uD83C\\uDDF9|\\uD83C\\uDDEA\\uD83C\\uDDF8|\\uD83C\\uDDEA\\uD83C\\uDDF7|\\uD83C\\uDDEA\\uD83C\\uDDED|\\uD83C\\uDDEA\\uD83C\\uDDEC|\\uD83C\\uDDEA\\uD83C\\uDDEA|\\uD83C\\uDDEA\\uD83C\\uDDE8|\\uD83C\\uDDEA\\uD83C\\uDDE6|\\uD83C\\uDDE9\\uD83C\\uDDFF|\\uD83C\\uDDE9\\uD83C\\uDDF4|\\uD83C\\uDDE9\\uD83C\\uDDF2|\\uD83C\\uDDE9\\uD83C\\uDDF0|\\uD83C\\uDDE9\\uD83C\\uDDEF|\\uD83C\\uDDE9\\uD83C\\uDDEC|\\uD83C\\uDDE9\\uD83C\\uDDEA|\\uD83C\\uDDE8\\uD83C\\uDDFF|\\uD83C\\uDDE8\\uD83C\\uDDFE|\\uD83C\\uDDE8\\uD83C\\uDDFD|\\uD83C\\uDDE8\\uD83C\\uDDFC|\\uD83C\\uDDE8\\uD83C\\uDDFB|\\uD83C\\uDDE8\\uD83C\\uDDFA|\\uD83C\\uDDE8\\uD83C\\uDDF7|\\uD83C\\uDDE8\\uD83C\\uDDF5|\\uD83C\\uDDE8\\uD83C\\uDDF4|\\uD83C\\uDDE8\\uD83C\\uDDF3|\\uD83C\\uDDE8\\uD83C\\uDDF2|\\uD83C\\uDDE8\\uD83C\\uDDF1|\\uD83C\\uDDE8\\uD83C\\uDDF0|\\uD83C\\uDDE8\\uD83C\\uDDEE|\\uD83C\\uDDE8\\uD83C\\uDDED|\\uD83C\\uDDE8\\uD83C\\uDDEC|\\uD83C\\uDDE8\\uD83C\\uDDEB|\\uD83C\\uDDE8\\uD83C\\uDDE9|\\uD83C\\uDDE8\\uD83C\\uDDE8|\\uD83C\\uDDE8\\uD83C\\uDDE6|\\uD83C\\uDDE7\\uD83C\\uDDFF|\\uD83C\\uDDE7\\uD83C\\uDDFE|\\uD83C\\uDDE7\\uD83C\\uDDFC|\\uD83C\\uDDE7\\uD83C\\uDDFB|\\uD83C\\uDDE7\\uD83C\\uDDF9|\\uD83C\\uDDE7\\uD83C\\uDDF8|\\uD83C\\uDDE7\\uD83C\\uDDF7|\\uD83C\\uDDE7\\uD83C\\uDDF6|\\uD83C\\uDDE7\\uD83C\\uDDF4|\\uD83C\\uDDE7\\uD83C\\uDDF3|\\uD83C\\uDDE7\\uD83C\\uDDF2|\\uD83C\\uDDE7\\uD83C\\uDDF1|\\uD83C\\uDDE7\\uD83C\\uDDEF|\\uD83C\\uDDE7\\uD83C\\uDDEE|\\uD83C\\uDDE7\\uD83C\\uDDED|\\uD83C\\uDDE7\\uD83C\\uDDEC|\\uD83C\\uDDE7\\uD83C\\uDDEB|\\uD83C\\uDDE7\\uD83C\\uDDEA|\\uD83C\\uDDE7\\uD83C\\uDDE9|\\uD83C\\uDDE7\\uD83C\\uDDE7|\\uD83C\\uDDE7\\uD83C\\uDDE6|\\uD83C\\uDDE6\\uD83C\\uDDFF|\\uD83C\\uDDE6\\uD83C\\uDDFD|\\uD83C\\uDDE6\\uD83C\\uDDFC|\\uD83C\\uDDE6\\uD83C\\uDDFA|\\uD83C\\uDDE6\\uD83C\\uDDF9|\\uD83C\\uDFC4\\uD83C\\uDFFE|\\uD83D\\uDDE3\\uFE0F|\\u26F9\\uD83C\\uDFFF|\\u26F9\\uD83C\\uDFFE|\\u26F9\\uD83C\\uDFFD|\\u26F9\\uD83C\\uDFFC|\\u26F9\\uD83C\\uDFFB|\\u270D\\uD83C\\uDFFF|\\u270D\\uD83C\\uDFFE|\\u270D\\uD83C\\uDFFD|\\u270D\\uD83C\\uDFFC|\\u270D\\uD83C\\uDFFB|\\uD83C\\uDC04\\uFE0F|\\uD83C\\uDD7F\\uFE0F|\\uD83C\\uDE02\\uFE0F|\\uD83C\\uDE1A\\uFE0F|\\uD83C\\uDE2F\\uFE0F|\\uD83C\\uDE37\\uFE0F|\\uD83C\\uDF9E\\uFE0F|\\uD83C\\uDF9F\\uFE0F|\\uD83C\\uDFCB\\uFE0F|\\uD83C\\uDFCC\\uFE0F|\\uD83C\\uDFCD\\uFE0F|\\uD83C\\uDFCE\\uFE0F|\\uD83C\\uDF96\\uFE0F|\\uD83C\\uDF97\\uFE0F|\\uD83C\\uDF36\\uFE0F|\\uD83C\\uDF27\\uFE0F|\\uD83C\\uDF28\\uFE0F|\\uD83C\\uDF29\\uFE0F|\\uD83C\\uDF2A\\uFE0F|\\uD83C\\uDF2B\\uFE0F|\\uD83C\\uDF2C\\uFE0F|\\uD83D\\uDC3F\\uFE0F|\\uD83D\\uDD77\\uFE0F|\\uD83D\\uDD78\\uFE0F|\\uD83C\\uDF21\\uFE0F|\\uD83C\\uDF99\\uFE0F|\\uD83C\\uDF9A\\uFE0F|\\uD83C\\uDF9B\\uFE0F|\\uD83C\\uDFF3\\uFE0F|\\uD83C\\uDFF5\\uFE0F|\\uD83C\\uDFF7\\uFE0F|\\uD83D\\uDCFD\\uFE0F|\\uD83D\\uDD49\\uFE0F|\\uD83D\\uDD4A\\uFE0F|\\uD83D\\uDD6F\\uFE0F|\\uD83D\\uDD70\\uFE0F|\\uD83D\\uDD73\\uFE0F|\\uD83D\\uDD76\\uFE0F|\\uD83D\\uDD79\\uFE0F|\\uD83D\\uDD87\\uFE0F|\\uD83D\\uDD8A\\uFE0F|\\uD83D\\uDD8B\\uFE0F|\\uD83D\\uDD8C\\uFE0F|\\uD83D\\uDD8D\\uFE0F|\\uD83D\\uDDA5\\uFE0F|\\uD83D\\uDDA8\\uFE0F|\\uD83D\\uDDB2\\uFE0F|\\uD83D\\uDDBC\\uFE0F|\\uD83D\\uDDC2\\uFE0F|\\uD83D\\uDDC3\\uFE0F|\\uD83D\\uDDC4\\uFE0F|\\uD83D\\uDDD1\\uFE0F|\\uD83D\\uDDD2\\uFE0F|\\uD83D\\uDDD3\\uFE0F|\\uD83D\\uDDDC\\uFE0F|\\uD83D\\uDDDD\\uFE0F|\\uD83D\\uDDDE\\uFE0F|\\uD83D\\uDDE1\\uFE0F|\\u270B\\uD83C\\uDFFF|\\uD83D\\uDDE8\\uFE0F|\\uD83D\\uDDEF\\uFE0F|\\uD83D\\uDDF3\\uFE0F|\\uD83D\\uDDFA\\uFE0F|\\uD83D\\uDEE0\\uFE0F|\\uD83D\\uDEE1\\uFE0F|\\uD83D\\uDEE2\\uFE0F|\\uD83D\\uDEF0\\uFE0F|\\uD83C\\uDF7D\\uFE0F|\\uD83D\\uDC41\\uFE0F|\\uD83D\\uDD74\\uFE0F|\\uD83D\\uDD75\\uFE0F|\\uD83D\\uDD90\\uFE0F|\\uD83C\\uDFD4\\uFE0F|\\uD83C\\uDFD5\\uFE0F|\\uD83C\\uDFD6\\uFE0F|\\uD83C\\uDFD7\\uFE0F|\\uD83C\\uDFD8\\uFE0F|\\uD83C\\uDFD9\\uFE0F|\\uD83C\\uDFDA\\uFE0F|\\uD83C\\uDFDB\\uFE0F|\\uD83C\\uDFDC\\uFE0F|\\uD83C\\uDFDD\\uFE0F|\\uD83C\\uDFDE\\uFE0F|\\uD83C\\uDFDF\\uFE0F|\\uD83D\\uDECB\\uFE0F|\\uD83D\\uDECD\\uFE0F|\\uD83D\\uDECE\\uFE0F|\\uD83D\\uDECF\\uFE0F|\\uD83D\\uDEE3\\uFE0F|\\uD83D\\uDEE4\\uFE0F|\\uD83D\\uDEE5\\uFE0F|\\uD83D\\uDEE9\\uFE0F|\\uD83D\\uDEF3\\uFE0F|\\uD83C\\uDF24\\uFE0F|\\uD83C\\uDF25\\uFE0F|\\uD83C\\uDF26\\uFE0F|\\uD83D\\uDDB1\\uFE0F|\\u261D\\uD83C\\uDFFB|\\u261D\\uD83C\\uDFFC|\\u261D\\uD83C\\uDFFD|\\u261D\\uD83C\\uDFFE|\\u261D\\uD83C\\uDFFF|\\u270C\\uD83C\\uDFFB|\\u270C\\uD83C\\uDFFC|\\u270C\\uD83C\\uDFFD|\\u270C\\uD83C\\uDFFE|\\u270C\\uD83C\\uDFFF|\\u270A\\uD83C\\uDFFB|\\u270A\\uD83C\\uDFFC|\\u270A\\uD83C\\uDFFD|\\u270A\\uD83C\\uDFFE|\\u270A\\uD83C\\uDFFF|\\u270B\\uD83C\\uDFFB|\\u270B\\uD83C\\uDFFC|\\u270B\\uD83C\\uDFFD|\\u270B\\uD83C\\uDFFE|\\4\\uFE0F\\u20E3|\\9\\uFE0F\\u20E3|\\0\\uFE0F\\u20E3|\\1\\uFE0F\\u20E3|\\2\\uFE0F\\u20E3|\\3\\uFE0F\\u20E3|\\#\\uFE0F\\u20E3|\\5\\uFE0F\\u20E3|\\6\\uFE0F\\u20E3|\\7\\uFE0F\\u20E3|\\8\\uFE0F\\u20E3|\\*\\uFE0F\\u20E3|\\uD83D\\uDDE1|\\uD83D\\uDD77|\\uD83D\\uDDE3|\\uD83D\\uDEE4|\\uD83D\\uDDE8|\\uD83D\\uDD78|\\uD83D\\uDDEF|\\uD83C\\uDE37|\\uD83D\\uDDF3|\\uD83C\\uDF21|\\uD83D\\uDDFA|\\uD83D\\uDDB1|\\uD83D\\uDEE0|\\uD83C\\uDF99|\\uD83D\\uDEE1|\\uD83C\\uDF9E|\\uD83D\\uDEE2|\\uD83C\\uDF9A|\\uD83D\\uDEF0|\\uD83D\\uDEE3|\\uD83C\\uDF7D|\\uD83C\\uDF9B|\\uD83D\\uDC41|\\uD83C\\uDF9F|\\uD83D\\uDD74|\\uD83C\\uDFF3|\\uD83D\\uDD75|\\uD83D\\uDEF3|\\uD83D\\uDD90|\\uD83C\\uDFF5|\\uD83C\\uDFD4|\\uD83C\\uDFCB|\\uD83C\\uDFD5|\\uD83C\\uDFF7|\\uD83C\\uDFD6|\\uD83D\\uDECF|\\uD83C\\uDFD7|\\uD83D\\uDCFD|\\uD83C\\uDFD8|\\uD83C\\uDFCC|\\uD83C\\uDFD9|\\uD83D\\uDD49|\\uD83C\\uDFDA|\\uD83C\\uDF25|\\uD83C\\uDFDB|\\uD83D\\uDD4A|\\uD83C\\uDFDC|\\uD83C\\uDFCD|\\uD83C\\uDFDD|\\uD83D\\uDD6F|\\uD83C\\uDFDE|\\uD83D\\uDECE|\\uD83C\\uDFDF|\\uD83D\\uDD70|\\uD83D\\uDECB|\\uD83C\\uDFCE|\\uD83D\\uDECD|\\uD83D\\uDD73|\\uD83D\\uDECE|\\uD83D\\uDEE9|\\uD83D\\uDECF|\\uD83D\\uDD76|\\uD83D\\uDEE3|\\uD83C\\uDF96|\\uD83D\\uDEE4|\\uD83D\\uDD79|\\uD83D\\uDEE5|\\uD83D\\uDECD|\\uD83D\\uDEE9|\\uD83D\\uDD87|\\uD83D\\uDEF3|\\uD83C\\uDF97|\\uD83C\\uDF24|\\uD83D\\uDD8A|\\uD83C\\uDF25|\\uD83C\\uDC04|\\uD83C\\uDF26|\\uD83D\\uDD8B|\\uD83D\\uDDB1|\\uD83C\\uDF36|\\uD83D\\uDD8C|\\uD83C\\uDF26|\\uD83D\\uDD8D|\\uD83C\\uDF27|\\uD83D\\uDDA5|\\uD83C\\uDD7F|\\uD83D\\uDDA8|\\uD83C\\uDF28|\\uD83D\\uDDB2|\\uD83D\\uDECB|\\uD83D\\uDDBC|\\uD83C\\uDF29|\\uD83D\\uDDC2|\\uD83C\\uDE02|\\uD83D\\uDDC3|\\uD83C\\uDF2A|\\uD83D\\uDDC4|\\uD83D\\uDEE5|\\uD83D\\uDDD1|\\uD83C\\uDF2B|\\uD83D\\uDDD2|\\uD83C\\uDE1A|\\uD83D\\uDDD3|\\uD83C\\uDF2C|\\uD83D\\uDDDC|\\uD83C\\uDF24|\\uD83D\\uDDDD|\\uD83D\\uDC3F|\\uD83D\\uDDDE|\\u00A9\\uFE0F|\\uD83C\\uDFDF|\\u00AE\\uFE0F|\\uD83C\\uDFDE|\\u203C\\uFE0F|\\uD83C\\uDFDD|\\u2049\\uFE0F|\\uD83C\\uDFDC|\\u2122\\uFE0F|\\uD83C\\uDFDB|\\u2139\\uFE0F|\\uD83C\\uDFDA|\\u2194\\uFE0F|\\uD83C\\uDFD9|\\u2195\\uFE0F|\\uD83C\\uDFD8|\\u2196\\uFE0F|\\uD83C\\uDFD7|\\u2197\\uFE0F|\\uD83C\\uDFD6|\\u2198\\uFE0F|\\uD83C\\uDFD5|\\u2199\\uFE0F|\\uD83C\\uDFD4|\\u21A9\\uFE0F|\\uD83D\\uDD90|\\u21AA\\uFE0F|\\uD83D\\uDD75|\\u231A\\uFE0F|\\uD83D\\uDD74|\\u231B\\uFE0F|\\uD83D\\uDC41|\\u24C2\\uFE0F|\\uD83C\\uDF7D|\\u25AA\\uFE0F|\\uD83D\\uDEF0|\\u25AB\\uFE0F|\\uD83D\\uDEE2|\\u25B6\\uFE0F|\\uD83D\\uDEE1|\\u25C0\\uFE0F|\\uD83D\\uDEE0|\\u25FB\\uFE0F|\\uD83D\\uDDFA|\\u25FC\\uFE0F|\\uD83D\\uDDF3|\\u25FD\\uFE0F|\\uD83D\\uDDEF|\\u25FE\\uFE0F|\\uD83D\\uDDE8|\\u2600\\uFE0F|\\uD83D\\uDDE3|\\u2601\\uFE0F|\\uD83D\\uDDE1|\\u260E\\uFE0F|\\uD83D\\uDDDE|\\u2611\\uFE0F|\\uD83D\\uDDDD|\\u2614\\uFE0F|\\uD83D\\uDDDC|\\u2615\\uFE0F|\\uD83D\\uDDD3|\\u261D\\uFE0F|\\uD83D\\uDDD2|\\u263A\\uFE0F|\\uD83D\\uDDD1|\\u2648\\uFE0F|\\uD83D\\uDDC4|\\u2649\\uFE0F|\\uD83D\\uDDC3|\\u264A\\uFE0F|\\uD83D\\uDDC2|\\u264B\\uFE0F|\\uD83D\\uDDBC|\\u264C\\uFE0F|\\uD83D\\uDDB2|\\u264D\\uFE0F|\\uD83D\\uDDA8|\\u264E\\uFE0F|\\uD83D\\uDDA5|\\u264F\\uFE0F|\\uD83D\\uDD8D|\\u2650\\uFE0F|\\uD83D\\uDD8C|\\u2651\\uFE0F|\\uD83D\\uDD8B|\\u2652\\uFE0F|\\uD83D\\uDD8A|\\u2653\\uFE0F|\\uD83D\\uDD87|\\u2660\\uFE0F|\\uD83D\\uDD79|\\u2663\\uFE0F|\\uD83D\\uDD76|\\u2665\\uFE0F|\\uD83D\\uDD73|\\u2666\\uFE0F|\\uD83D\\uDD70|\\u2668\\uFE0F|\\uD83D\\uDD6F|\\u267B\\uFE0F|\\uD83D\\uDD4A|\\u267F\\uFE0F|\\uD83D\\uDD49|\\u2693\\uFE0F|\\uD83D\\uDCFD|\\u26A0\\uFE0F|\\uD83C\\uDFF7|\\u26A1\\uFE0F|\\uD83C\\uDFF5|\\u26AA\\uFE0F|\\uD83C\\uDFF3|\\u26AB\\uFE0F|\\uD83C\\uDF9B|\\u26BD\\uFE0F|\\uD83C\\uDF9A|\\u26BE\\uFE0F|\\uD83C\\uDF99|\\u26C4\\uFE0F|\\uD83C\\uDF21|\\u26C5\\uFE0F|\\uD83D\\uDD78|\\u26D4\\uFE0F|\\uD83D\\uDD77|\\u26EA\\uFE0F|\\uD83D\\uDC3F|\\uD83C\\uDE2F|\\uD83C\\uDF2C|\\u26F3\\uFE0F|\\uD83C\\uDF2B|\\u26F5\\uFE0F|\\uD83C\\uDF2A|\\u26FA\\uFE0F|\\uD83C\\uDF29|\\u26FD\\uFE0F|\\uD83C\\uDF28|\\u2702\\uFE0F|\\uD83C\\uDF27|\\u2708\\uFE0F|\\uD83C\\uDF36|\\u2709\\uFE0F|\\uD83C\\uDF97|\\u270C\\uFE0F|\\uD83C\\uDF96|\\u270F\\uFE0F|\\uD83C\\uDFCE|\\u2712\\uFE0F|\\uD83C\\uDFCD|\\u2714\\uFE0F|\\uD83C\\uDFCC|\\u2716\\uFE0F|\\uD83C\\uDFCB|\\u2733\\uFE0F|\\uD83C\\uDF9F|\\u2734\\uFE0F|\\uD83C\\uDF9E|\\u2744\\uFE0F|\\uD83C\\uDE37|\\u2747\\uFE0F|\\uD83C\\uDE2F|\\u2757\\uFE0F|\\uD83C\\uDE1A|\\u2764\\uFE0F|\\uD83C\\uDE02|\\u27A1\\uFE0F|\\uD83C\\uDD7F|\\u2934\\uFE0F|\\uD83C\\uDC04|\\u2935\\uFE0F|\\uD83C\\uDDE6|\\u2B05\\uFE0F|\\uD83C\\uDDE7|\\u2B06\\uFE0F|\\uD83C\\uDDE8|\\u2B07\\uFE0F|\\uD83C\\uDDE9|\\u2B1B\\uFE0F|\\uD83C\\uDDEA|\\u2B1C\\uFE0F|\\uD83C\\uDDEB|\\u2B50\\uFE0F|\\uD83C\\uDDEC|\\u2B55\\uFE0F|\\uD83C\\uDDED|\\u3030\\uFE0F|\\uD83C\\uDDEE|\\u303D\\uFE0F|\\uD83C\\uDDEF|\\u3297\\uFE0F|\\uD83C\\uDDF0|\\u3299\\uFE0F|\\uD83C\\uDDF1|\\u271D\\uFE0F|\\uD83C\\uDDF2|\\u2328\\uFE0F|\\uD83C\\uDDF3|\\u270D\\uFE0F|\\uD83C\\uDDF4|\\u23CF\\uFE0F|\\uD83C\\uDDF5|\\u23ED\\uFE0F|\\uD83C\\uDDF6|\\u23EE\\uFE0F|\\uD83C\\uDDF7|\\u23EF\\uFE0F|\\uD83C\\uDDF8|\\u23F1\\uFE0F|\\uD83C\\uDDF9|\\u23F2\\uFE0F|\\uD83C\\uDDFA|\\u23F8\\uFE0F|\\uD83C\\uDDFB|\\u23F9\\uFE0F|\\uD83C\\uDDFC|\\u23FA\\uFE0F|\\uD83E\\uDD5E|\\u2602\\uFE0F|\\uD83E\\uDD5D|\\u2603\\uFE0F|\\uD83E\\uDD5C|\\u2604\\uFE0F|\\uD83E\\uDD5B|\\u2618\\uFE0F|\\uD83E\\uDD5A|\\u2620\\uFE0F|\\uD83E\\uDD91|\\u2622\\uFE0F|\\uD83E\\uDD90|\\u2623\\uFE0F|\\uD83E\\uDD41|\\u2626\\uFE0F|\\uD83C\\uDFF8|\\u262A\\uFE0F|\\uD83C\\uDFD3|\\u262E\\uFE0F|\\uD83C\\uDFD2|\\u262F\\uFE0F|\\uD83C\\uDFD1|\\u2638\\uFE0F|\\uD83C\\uDFD0|\\u2639\\uFE0F|\\uD83C\\uDFCF|\\u2692\\uFE0F|\\uD83D\\uDCFF|\\u2694\\uFE0F|\\uD83D\\uDD4E|\\u2696\\uFE0F|\\uD83D\\uDD4D|\\u2697\\uFE0F|\\uD83D\\uDD4C|\\u2699\\uFE0F|\\uD83D\\uDD4B|\\u269B\\uFE0F|\\uD83D\\uDED0|\\u269C\\uFE0F|\\uD83C\\uDFFA|\\u26B0\\uFE0F|\\uD83C\\uDFF9|\\u26B1\\uFE0F|\\uD83C\\uDF7E|\\u26C8\\uFE0F|\\uD83C\\uDF7F|\\u26CF\\uFE0F|\\uD83C\\uDF2F|\\u26D1\\uFE0F|\\uD83C\\uDF2E|\\u26D3\\uFE0F|\\uD83C\\uDF2D|\\u26E9\\uFE0F|\\uD83E\\uDDC0|\\u26F0\\uFE0F|\\uD83E\\uDD83|\\u26F1\\uFE0F|\\uD83E\\uDD80|\\u26F4\\uFE0F|\\uD83E\\uDD82|\\u26F7\\uFE0F|\\uD83E\\uDD84|\\u26F8\\uFE0F|\\uD83E\\uDD81|\\u26F9\\uFE0F|\\uD83E\\uDD16|\\u2721\\uFE0F|\\uD83E\\uDD15|\\u2763\\uFE0F|\\uD83E\\uDD12|\\uD83E\\uDD49|\\uD83E\\uDD48|\\uD83E\\uDD47|\\uD83E\\uDD3A|\\uD83E\\uDD45|\\uD83E\\uDD3E|\\uD83C\\uDDFF|\\uD83E\\uDD3D|\\uD83E\\uDD4B|\\uD83E\\uDD4A|\\uD83E\\uDD3C|\\uD83E\\uDD39|\\uD83E\\uDD38|\\uD83D\\uDEF6|\\uD83D\\uDEF5|\\uD83D\\uDEF4|\\uD83D\\uDED2|\\uD83C\\uDCCF|\\uD83C\\uDD70|\\uD83C\\uDD71|\\uD83C\\uDD7E|\\uD83D\\uDED1|\\uD83C\\uDD8E|\\uD83C\\uDD91|\\uD83C\\uDDFE|\\uD83C\\uDD92|\\uD83C\\uDD93|\\uD83C\\uDD94|\\uD83C\\uDD95|\\uD83C\\uDD96|\\uD83C\\uDD97|\\uD83C\\uDD98|\\uD83E\\uDD44|\\uD83C\\uDD99|\\uD83C\\uDD9A|\\uD83E\\uDD42|\\uD83E\\uDD43|\\uD83C\\uDE01|\\uD83E\\uDD59|\\uD83C\\uDE32|\\uD83C\\uDE33|\\uD83C\\uDE34|\\uD83C\\uDE35|\\uD83C\\uDE36|\\uD83E\\uDD58|\\uD83C\\uDE38|\\uD83C\\uDE39|\\uD83E\\uDD57|\\uD83C\\uDE3A|\\uD83C\\uDE50|\\uD83C\\uDE51|\\uD83C\\uDF00|\\uD83E\\uDD56|\\uD83C\\uDF01|\\uD83C\\uDF02|\\uD83C\\uDF03|\\uD83C\\uDF04|\\uD83C\\uDF05|\\uD83C\\uDF06|\\uD83E\\uDD55|\\uD83C\\uDF07|\\uD83C\\uDF08|\\uD83E\\uDD54|\\uD83C\\uDF09|\\uD83C\\uDF0A|\\uD83C\\uDF0B|\\uD83C\\uDF0C|\\uD83C\\uDF0F|\\uD83C\\uDF11|\\uD83E\\uDD53|\\uD83C\\uDF13|\\uD83C\\uDF14|\\uD83C\\uDF15|\\uD83C\\uDF19|\\uD83C\\uDF1B|\\uD83C\\uDF1F|\\uD83E\\uDD52|\\uD83C\\uDF20|\\uD83C\\uDF30|\\uD83E\\uDD51|\\uD83C\\uDF31|\\uD83C\\uDF34|\\uD83C\\uDF35|\\uD83C\\uDF37|\\uD83C\\uDF38|\\uD83C\\uDF39|\\uD83C\\uDF3A|\\uD83C\\uDF3B|\\uD83C\\uDF3C|\\uD83C\\uDF3D|\\uD83E\\uDD50|\\uD83C\\uDF3E|\\uD83C\\uDF3F|\\uD83C\\uDF40|\\uD83C\\uDF41|\\uD83C\\uDF42|\\uD83C\\uDF43|\\uD83C\\uDF44|\\uD83C\\uDF45|\\uD83C\\uDF46|\\uD83C\\uDF47|\\uD83C\\uDF48|\\uD83C\\uDF49|\\uD83C\\uDF4A|\\uD83E\\uDD40|\\uD83C\\uDF4C|\\uD83C\\uDF4D|\\uD83C\\uDF4E|\\uD83C\\uDF4F|\\uD83C\\uDF51|\\uD83C\\uDF52|\\uD83C\\uDF53|\\uD83E\\uDD8F|\\uD83C\\uDF54|\\uD83C\\uDF55|\\uD83C\\uDF56|\\uD83E\\uDD8E|\\uD83C\\uDF57|\\uD83C\\uDF58|\\uD83C\\uDF59|\\uD83E\\uDD8D|\\uD83C\\uDF5A|\\uD83C\\uDF5B|\\uD83E\\uDD8C|\\uD83C\\uDF5C|\\uD83C\\uDF5D|\\uD83C\\uDF5E|\\uD83C\\uDF5F|\\uD83E\\uDD8B|\\uD83C\\uDF60|\\uD83C\\uDF61|\\uD83E\\uDD8A|\\uD83C\\uDF62|\\uD83C\\uDF63|\\uD83E\\uDD89|\\uD83C\\uDF64|\\uD83C\\uDF65|\\uD83E\\uDD88|\\uD83C\\uDF66|\\uD83E\\uDD87|\\uD83C\\uDF67|\\uD83C\\uDDFD|\\uD83C\\uDF68|\\uD83E\\uDD86|\\uD83C\\uDF69|\\uD83E\\uDD85|\\uD83C\\uDF6A|\\uD83D\\uDDA4|\\uD83C\\uDF6B|\\uD83C\\uDF6C|\\uD83C\\uDF6D|\\uD83C\\uDF6E|\\uD83C\\uDF6F|\\uD83E\\uDD1E|\\uD83C\\uDF70|\\uD83C\\uDF71|\\uD83C\\uDF72|\\uD83E\\uDD1D|\\uD83C\\uDF73|\\uD83C\\uDF74|\\uD83C\\uDF75|\\uD83C\\uDF76|\\uD83C\\uDF77|\\uD83C\\uDF78|\\uD83C\\uDF79|\\uD83C\\uDF7A|\\uD83C\\uDF7B|\\uD83C\\uDF80|\\uD83C\\uDF81|\\uD83C\\uDF82|\\uD83C\\uDF83|\\uD83E\\uDD1B|\\uD83E\\uDD1C|\\uD83C\\uDF84|\\uD83C\\uDF85|\\uD83C\\uDF86|\\uD83E\\uDD1A|\\uD83C\\uDF87|\\uD83C\\uDF88|\\uD83C\\uDF89|\\uD83C\\uDF8A|\\uD83C\\uDF8B|\\uD83C\\uDF8C|\\uD83E\\uDD19|\\uD83C\\uDF8D|\\uD83D\\uDD7A|\\uD83C\\uDF8E|\\uD83E\\uDD33|\\uD83C\\uDF8F|\\uD83E\\uDD30|\\uD83C\\uDF90|\\uD83E\\uDD26|\\uD83E\\uDD37|\\uD83C\\uDF91|\\uD83C\\uDF92|\\uD83C\\uDF93|\\uD83C\\uDFA0|\\uD83C\\uDFA1|\\uD83C\\uDFA2|\\uD83C\\uDFA3|\\uD83C\\uDFA4|\\uD83C\\uDFA5|\\uD83C\\uDFA6|\\uD83C\\uDFA7|\\uD83E\\uDD36|\\uD83C\\uDFA8|\\uD83E\\uDD35|\\uD83C\\uDFA9|\\uD83C\\uDFAA|\\uD83E\\uDD34|\\uD83C\\uDFAB|\\uD83C\\uDFAC|\\uD83C\\uDFAD|\\uD83E\\uDD27|\\uD83C\\uDFAE|\\uD83C\\uDFAF|\\uD83C\\uDFB0|\\uD83C\\uDFB1|\\uD83C\\uDFB2|\\uD83C\\uDFB3|\\uD83C\\uDFB4|\\uD83E\\uDD25|\\uD83C\\uDFB5|\\uD83C\\uDFB6|\\uD83C\\uDFB7|\\uD83E\\uDD24|\\uD83C\\uDFB8|\\uD83C\\uDFB9|\\uD83C\\uDFBA|\\uD83E\\uDD23|\\uD83C\\uDFBB|\\uD83C\\uDFBC|\\uD83C\\uDFBD|\\uD83E\\uDD22|\\uD83C\\uDFBE|\\uD83C\\uDFBF|\\uD83C\\uDFC0|\\uD83C\\uDFC1|\\uD83E\\uDD21|\\uD83C\\uDFC2|\\uD83C\\uDFC3|\\uD83C\\uDFC4|\\uD83C\\uDFC6|\\uD83C\\uDFC8|\\uD83C\\uDFCA|\\uD83C\\uDFE0|\\uD83C\\uDFE1|\\uD83C\\uDFE2|\\uD83C\\uDFE3|\\uD83C\\uDFE5|\\uD83C\\uDFE6|\\uD83C\\uDFE7|\\uD83C\\uDFE8|\\uD83C\\uDFE9|\\uD83C\\uDFEA|\\uD83C\\uDFEB|\\uD83C\\uDFEC|\\uD83E\\uDD20|\\uD83C\\uDFED|\\uD83C\\uDFEE|\\uD83C\\uDFEF|\\uD83C\\uDFF0|\\uD83D\\uDC0C|\\uD83D\\uDC0D|\\uD83D\\uDC0E|\\uD83D\\uDC11|\\uD83D\\uDC12|\\uD83D\\uDC14|\\uD83D\\uDC17|\\uD83D\\uDC18|\\uD83D\\uDC19|\\uD83D\\uDC1A|\\uD83D\\uDC1B|\\uD83D\\uDC1C|\\uD83D\\uDC1D|\\uD83D\\uDC1E|\\uD83D\\uDC1F|\\uD83D\\uDC20|\\uD83D\\uDC21|\\uD83D\\uDC22|\\uD83D\\uDC23|\\uD83D\\uDC24|\\uD83D\\uDC25|\\uD83D\\uDC26|\\uD83D\\uDC27|\\uD83D\\uDC28|\\uD83D\\uDC29|\\uD83D\\uDC2B|\\uD83D\\uDC2C|\\uD83D\\uDC2D|\\uD83D\\uDC2E|\\uD83D\\uDC2F|\\uD83D\\uDC30|\\uD83D\\uDC31|\\uD83D\\uDC32|\\uD83D\\uDC33|\\uD83D\\uDC34|\\uD83D\\uDC35|\\uD83D\\uDC36|\\uD83D\\uDC37|\\uD83D\\uDC38|\\uD83D\\uDC39|\\uD83D\\uDC3A|\\uD83D\\uDC3B|\\uD83D\\uDC3C|\\uD83D\\uDC3D|\\uD83D\\uDC3E|\\uD83D\\uDC40|\\uD83D\\uDC42|\\uD83D\\uDC43|\\uD83D\\uDC44|\\uD83D\\uDC45|\\uD83D\\uDC46|\\uD83D\\uDC47|\\uD83D\\uDC48|\\uD83D\\uDC49|\\uD83D\\uDC4A|\\uD83D\\uDC4B|\\uD83D\\uDC4C|\\uD83D\\uDC4D|\\uD83D\\uDC4E|\\uD83D\\uDC4F|\\uD83D\\uDC50|\\uD83D\\uDC51|\\uD83D\\uDC52|\\uD83D\\uDC53|\\uD83D\\uDC54|\\uD83D\\uDC55|\\uD83D\\uDC56|\\uD83D\\uDC57|\\uD83D\\uDC58|\\uD83D\\uDC59|\\uD83D\\uDC5A|\\uD83D\\uDC5B|\\uD83D\\uDC5C|\\uD83D\\uDC5D|\\uD83D\\uDC5E|\\uD83D\\uDC5F|\\uD83D\\uDC60|\\uD83D\\uDC61|\\uD83D\\uDC62|\\uD83D\\uDC63|\\uD83D\\uDC64|\\uD83D\\uDC66|\\uD83D\\uDC67|\\uD83D\\uDC68|\\uD83D\\uDC69|\\uD83D\\uDC6A|\\uD83D\\uDC6B|\\uD83D\\uDC6E|\\uD83D\\uDC6F|\\uD83D\\uDC70|\\uD83D\\uDC71|\\uD83D\\uDC72|\\uD83D\\uDC73|\\uD83D\\uDC74|\\uD83D\\uDC75|\\uD83D\\uDC76|\\uD83D\\uDC77|\\uD83D\\uDC78|\\uD83D\\uDC79|\\uD83D\\uDC7A|\\uD83D\\uDC7B|\\uD83D\\uDC7C|\\uD83D\\uDC7D|\\uD83D\\uDC7E|\\uD83D\\uDC7F|\\uD83D\\uDC80|\\uD83D\\uDCC7|\\uD83D\\uDC81|\\uD83D\\uDC82|\\uD83D\\uDC83|\\uD83D\\uDC84|\\uD83D\\uDC85|\\uD83D\\uDCD2|\\uD83D\\uDC86|\\uD83D\\uDCD3|\\uD83D\\uDC87|\\uD83D\\uDCD4|\\uD83D\\uDC88|\\uD83D\\uDCD5|\\uD83D\\uDC89|\\uD83D\\uDCD6|\\uD83D\\uDC8A|\\uD83D\\uDCD7|\\uD83D\\uDC8B|\\uD83D\\uDCD8|\\uD83D\\uDC8C|\\uD83D\\uDCD9|\\uD83D\\uDC8D|\\uD83D\\uDCDA|\\uD83D\\uDC8E|\\uD83D\\uDCDB|\\uD83D\\uDC8F|\\uD83D\\uDCDC|\\uD83D\\uDC90|\\uD83D\\uDCDD|\\uD83D\\uDC91|\\uD83D\\uDCDE|\\uD83D\\uDC92|\\uD83D\\uDCDF|\\uD83D\\uDCE0|\\uD83D\\uDC93|\\uD83D\\uDCE1|\\uD83D\\uDCE2|\\uD83D\\uDC94|\\uD83D\\uDCE3|\\uD83D\\uDCE4|\\uD83D\\uDC95|\\uD83D\\uDCE5|\\uD83D\\uDCE6|\\uD83D\\uDC96|\\uD83D\\uDCE7|\\uD83D\\uDCE8|\\uD83D\\uDC97|\\uD83D\\uDCE9|\\uD83D\\uDCEA|\\uD83D\\uDC98|\\uD83D\\uDCEB|\\uD83D\\uDCEE|\\uD83D\\uDC99|\\uD83D\\uDCF0|\\uD83D\\uDCF1|\\uD83D\\uDC9A|\\uD83D\\uDCF2|\\uD83D\\uDCF3|\\uD83D\\uDC9B|\\uD83D\\uDCF4|\\uD83D\\uDCF6|\\uD83D\\uDC9C|\\uD83D\\uDCF7|\\uD83D\\uDCF9|\\uD83D\\uDC9D|\\uD83D\\uDCFA|\\uD83D\\uDCFB|\\uD83D\\uDC9E|\\uD83D\\uDCFC|\\uD83D\\uDD03|\\uD83D\\uDC9F|\\uD83D\\uDD0A|\\uD83D\\uDD0B|\\uD83D\\uDCA0|\\uD83D\\uDD0C|\\uD83D\\uDD0D|\\uD83D\\uDCA1|\\uD83D\\uDD0E|\\uD83D\\uDD0F|\\uD83D\\uDCA2|\\uD83D\\uDD10|\\uD83D\\uDD11|\\uD83D\\uDCA3|\\uD83D\\uDD12|\\uD83D\\uDD13|\\uD83D\\uDCA4|\\uD83D\\uDD14|\\uD83D\\uDD16|\\uD83D\\uDCA5|\\uD83D\\uDD17|\\uD83D\\uDD18|\\uD83D\\uDCA6|\\uD83D\\uDD19|\\uD83D\\uDD1A|\\uD83D\\uDCA7|\\uD83D\\uDD1B|\\uD83D\\uDD1C|\\uD83D\\uDCA8|\\uD83D\\uDD1D|\\uD83D\\uDD1E|\\uD83D\\uDCA9|\\uD83D\\uDD1F|\\uD83D\\uDCAA|\\uD83D\\uDD20|\\uD83D\\uDD21|\\uD83D\\uDCAB|\\uD83D\\uDD22|\\uD83D\\uDD23|\\uD83D\\uDCAC|\\uD83D\\uDD24|\\uD83D\\uDD25|\\uD83D\\uDCAE|\\uD83D\\uDD26|\\uD83D\\uDD27|\\uD83D\\uDCAF|\\uD83D\\uDD28|\\uD83D\\uDD29|\\uD83D\\uDCB0|\\uD83D\\uDD2A|\\uD83D\\uDD2B|\\uD83D\\uDCB1|\\uD83D\\uDD2E|\\uD83D\\uDCB2|\\uD83D\\uDD2F|\\uD83D\\uDCB3|\\uD83D\\uDD30|\\uD83D\\uDD31|\\uD83D\\uDCB4|\\uD83D\\uDD32|\\uD83D\\uDD33|\\uD83D\\uDCB5|\\uD83D\\uDD34|\\uD83D\\uDD35|\\uD83D\\uDCB8|\\uD83D\\uDD36|\\uD83D\\uDD37|\\uD83D\\uDCB9|\\uD83D\\uDD38|\\uD83D\\uDD39|\\uD83D\\uDCBA|\\uD83D\\uDD3A|\\uD83D\\uDD3B|\\uD83D\\uDCBB|\\uD83D\\uDD3C|\\uD83D\\uDCBC|\\uD83D\\uDD3D|\\uD83D\\uDD50|\\uD83D\\uDCBD|\\uD83D\\uDD51|\\uD83D\\uDCBE|\\uD83D\\uDD52|\\uD83D\\uDCBF|\\uD83D\\uDD53|\\uD83D\\uDCC0|\\uD83D\\uDD54|\\uD83D\\uDD55|\\uD83D\\uDCC1|\\uD83D\\uDD56|\\uD83D\\uDD57|\\uD83D\\uDCC2|\\uD83D\\uDD58|\\uD83D\\uDD59|\\uD83D\\uDCC3|\\uD83D\\uDD5A|\\uD83D\\uDD5B|\\uD83D\\uDCC4|\\uD83D\\uDDFB|\\uD83D\\uDDFC|\\uD83D\\uDCC5|\\uD83D\\uDDFD|\\uD83D\\uDDFE|\\uD83D\\uDCC6|\\uD83D\\uDDFF|\\uD83D\\uDE01|\\uD83D\\uDE02|\\uD83D\\uDE03|\\uD83D\\uDCC8|\\uD83D\\uDE04|\\uD83D\\uDE05|\\uD83D\\uDCC9|\\uD83D\\uDE06|\\uD83D\\uDE09|\\uD83D\\uDCCA|\\uD83D\\uDE0A|\\uD83D\\uDE0B|\\uD83D\\uDCCB|\\uD83D\\uDE0C|\\uD83D\\uDE0D|\\uD83D\\uDCCC|\\uD83D\\uDE0F|\\uD83D\\uDE12|\\uD83D\\uDCCD|\\uD83D\\uDE13|\\uD83D\\uDE14|\\uD83D\\uDCCE|\\uD83D\\uDE16|\\uD83D\\uDE18|\\uD83D\\uDCCF|\\uD83D\\uDE1A|\\uD83D\\uDE1C|\\uD83D\\uDCD0|\\uD83D\\uDE1D|\\uD83D\\uDE1E|\\uD83D\\uDCD1|\\uD83D\\uDE20|\\uD83D\\uDE21|\\uD83D\\uDE22|\\uD83D\\uDE23|\\uD83D\\uDE24|\\uD83D\\uDE25|\\uD83D\\uDE28|\\uD83D\\uDE29|\\uD83D\\uDE2A|\\uD83D\\uDE2B|\\uD83D\\uDE2D|\\uD83D\\uDE30|\\uD83D\\uDE31|\\uD83D\\uDE32|\\uD83D\\uDE33|\\uD83D\\uDE35|\\uD83D\\uDE37|\\uD83D\\uDE38|\\uD83D\\uDE39|\\uD83D\\uDE3A|\\uD83D\\uDE3B|\\uD83D\\uDE3C|\\uD83D\\uDE3D|\\uD83D\\uDE3E|\\uD83D\\uDE3F|\\uD83D\\uDE40|\\uD83D\\uDE45|\\uD83D\\uDE46|\\uD83D\\uDE47|\\uD83D\\uDE48|\\uD83D\\uDE49|\\uD83D\\uDE4A|\\uD83D\\uDE4B|\\uD83D\\uDE4C|\\uD83D\\uDE4D|\\uD83D\\uDE4E|\\uD83D\\uDE4F|\\uD83D\\uDE80|\\uD83D\\uDE83|\\uD83D\\uDE84|\\uD83D\\uDE85|\\uD83D\\uDE87|\\uD83D\\uDE89|\\uD83D\\uDE8C|\\uD83D\\uDE8F|\\uD83D\\uDE91|\\uD83D\\uDE92|\\uD83D\\uDE93|\\uD83D\\uDE95|\\uD83D\\uDE97|\\uD83D\\uDE99|\\uD83D\\uDE9A|\\uD83D\\uDEA2|\\uD83D\\uDEA4|\\uD83D\\uDEA5|\\uD83D\\uDEA7|\\uD83D\\uDEA8|\\uD83D\\uDEA9|\\uD83D\\uDEAA|\\uD83D\\uDEAB|\\uD83D\\uDEAC|\\uD83D\\uDEAD|\\uD83D\\uDEB2|\\uD83D\\uDEB6|\\uD83D\\uDEB9|\\uD83D\\uDEBA|\\uD83D\\uDEBB|\\uD83D\\uDEBC|\\uD83D\\uDEBD|\\uD83D\\uDEBE|\\uD83D\\uDEC0|\\uD83E\\uDD18|\\uD83D\\uDE00|\\uD83D\\uDE07|\\uD83D\\uDE08|\\uD83D\\uDE0E|\\uD83D\\uDE10|\\uD83D\\uDE11|\\uD83D\\uDE15|\\uD83D\\uDE17|\\uD83D\\uDE19|\\uD83D\\uDE1B|\\uD83D\\uDE1F|\\uD83D\\uDE26|\\uD83D\\uDE27|\\uD83D\\uDE2C|\\uD83D\\uDE2E|\\uD83D\\uDE2F|\\uD83D\\uDE34|\\uD83D\\uDE36|\\uD83D\\uDE81|\\uD83D\\uDE82|\\uD83D\\uDE86|\\uD83D\\uDE88|\\uD83D\\uDE8A|\\uD83D\\uDE8D|\\uD83D\\uDE8E|\\uD83D\\uDE90|\\uD83D\\uDE94|\\uD83D\\uDE96|\\uD83D\\uDE98|\\uD83D\\uDE9B|\\uD83D\\uDE9C|\\uD83D\\uDE9D|\\uD83D\\uDE9E|\\uD83D\\uDE9F|\\uD83D\\uDEA0|\\uD83D\\uDEA1|\\uD83D\\uDEA3|\\uD83D\\uDEA6|\\uD83D\\uDEAE|\\uD83D\\uDEAF|\\uD83D\\uDEB0|\\uD83D\\uDEB1|\\uD83D\\uDEB3|\\uD83D\\uDEB4|\\uD83D\\uDEB5|\\uD83D\\uDEB7|\\uD83D\\uDEB8|\\uD83D\\uDEBF|\\uD83D\\uDEC1|\\uD83D\\uDEC2|\\uD83D\\uDEC3|\\uD83D\\uDEC4|\\uD83D\\uDEC5|\\uD83C\\uDF0D|\\uD83C\\uDF0E|\\uD83C\\uDF10|\\uD83C\\uDF12|\\uD83C\\uDF16|\\uD83C\\uDF17|\\uD83C\\uDF18|\\uD83C\\uDF1A|\\uD83C\\uDF1C|\\uD83C\\uDF1D|\\uD83C\\uDF1E|\\uD83C\\uDF32|\\uD83C\\uDF33|\\uD83C\\uDF4B|\\uD83C\\uDF50|\\uD83C\\uDF7C|\\uD83C\\uDFC7|\\uD83C\\uDFC9|\\uD83C\\uDFE4|\\uD83D\\uDC00|\\uD83D\\uDC01|\\uD83D\\uDC02|\\uD83D\\uDC03|\\uD83D\\uDC04|\\uD83D\\uDC05|\\uD83D\\uDC06|\\uD83D\\uDC07|\\uD83D\\uDC08|\\uD83D\\uDC09|\\uD83D\\uDC0A|\\uD83D\\uDC0B|\\uD83D\\uDC0F|\\uD83D\\uDC10|\\uD83D\\uDC13|\\uD83D\\uDC15|\\uD83D\\uDC16|\\uD83D\\uDC2A|\\uD83D\\uDC65|\\uD83D\\uDC6C|\\uD83D\\uDC6D|\\uD83D\\uDCAD|\\uD83D\\uDCB6|\\uD83D\\uDCB7|\\uD83D\\uDCEC|\\uD83D\\uDCED|\\uD83D\\uDCEF|\\uD83D\\uDCF5|\\uD83D\\uDD00|\\uD83D\\uDD01|\\uD83D\\uDD02|\\uD83D\\uDD04|\\uD83D\\uDD05|\\uD83D\\uDD06|\\uD83D\\uDD07|\\uD83D\\uDD09|\\uD83D\\uDD15|\\uD83D\\uDD2C|\\uD83D\\uDD2D|\\uD83D\\uDD5C|\\uD83D\\uDD5D|\\uD83D\\uDD5E|\\uD83D\\uDD5F|\\uD83D\\uDD60|\\uD83D\\uDD61|\\uD83D\\uDD62|\\uD83D\\uDD63|\\uD83D\\uDD64|\\uD83D\\uDD65|\\uD83D\\uDD66|\\uD83D\\uDD67|\\uD83D\\uDD08|\\uD83D\\uDE8B|\\uD83C\\uDFC5|\\uD83C\\uDFF4|\\uD83D\\uDCF8|\\uD83D\\uDECC|\\uD83D\\uDD95|\\uD83D\\uDD96|\\uD83D\\uDE41|\\uD83D\\uDE42|\\uD83D\\uDEEB|\\uD83D\\uDEEC|\\uD83C\\uDFFB|\\uD83C\\uDFFC|\\uD83C\\uDFFD|\\uD83C\\uDFFE|\\uD83C\\uDFFF|\\uD83D\\uDE43|\\uD83E\\uDD11|\\uD83E\\uDD13|\\uD83E\\uDD17|\\uD83D\\uDE44|\\uD83E\\uDD14|\\uD83E\\uDD10|\\u26F2\\uFE0F|\\#\\u20E3|\\9\\u20E3|\\8\\u20E3|\\7\\u20E3|\\6\\u20E3|\\*\\u20E3|\\4\\u20E3|\\3\\u20E3|\\2\\u20E3|\\1\\u20E3|\\0\\u20E3|\\5\\u20E3|\\u26B1|\\u26B0|\\u269C|\\u269B|\\u2699|\\u2697|\\u2696|\\u2694|\\u2692|\\u2639|\\u2638|\\u262F|\\u262E|\\u262A|\\u2626|\\u2623|\\u2622|\\u2620|\\u2618|\\u2604|\\u2603|\\u2602|\\u23FA|\\u23F9|\\u23F8|\\u23F2|\\u23F1|\\u23EF|\\u23EE|\\u23ED|\\u23CF|\\u270D|\\u2328|\\u271D|\\u3299|\\u3297|\\u303D|\\u3030|\\u2B55|\\u2B50|\\u2B1C|\\u2B1B|\\u2B07|\\u2B06|\\u2B05|\\u2935|\\u23E9|\\u23EA|\\u23EB|\\u23EC|\\u23F0|\\u23F3|\\u26CE|\\u2705|\\u270A|\\u270B|\\u2728|\\u274C|\\u274E|\\u2753|\\u2754|\\u2755|\\u2795|\\u2796|\\u2797|\\u27B0|\\u27BF|\\u00A9|\\u00AE|\\u203C|\\u2049|\\u2122|\\u2139|\\u2194|\\u2195|\\u2196|\\u2197|\\u2198|\\u2199|\\u21A9|\\u21AA|\\u231A|\\u231B|\\u24C2|\\u25AA|\\u25AB|\\u25B6|\\u25C0|\\u25FB|\\u25FC|\\u25FD|\\u25FE|\\u2600|\\u2601|\\u260E|\\u2611|\\u2614|\\u2615|\\u261D|\\u263A|\\u2648|\\u2649|\\u264A|\\u264B|\\u264C|\\u264D|\\u264E|\\u264F|\\u2650|\\u2651|\\u2652|\\u2653|\\u2660|\\u2663|\\u2665|\\u2666|\\u2668|\\u267B|\\u267F|\\u2693|\\u26A0|\\u26A1|\\u26AA|\\u26AB|\\u26BD|\\u26BE|\\u26C4|\\u26C5|\\u26D4|\\u26EA|\\u26F2|\\u26F3|\\u26F5|\\u26FA|\\u26FD|\\u2702|\\u2708|\\u2709|\\u270C|\\u270F|\\u2712|\\u2714|\\u2716|\\u2733|\\u2734|\\u2744|\\u2747|\\u2721|\\u2764|\\u27A1|\\u2934|\\u2935|\\u2B05|\\u2B06|\\u2B07|\\u2B1B|\\u2B1C|\\u2B50|\\u2B55|\\u3030|\\u303D|\\u3297|\\u3299|\\u2934|\\u27A1|\\u2764|\\u2757|\\u2747|\\u2744|\\u2734|\\u2733|\\u2716|\\u2714|\\u2712|\\u270F|\\u270C|\\u2709|\\u2708|\\u2702|\\u26FD|\\u26FA|\\u26F5|\\u26F3|\\u26F2|\\u26EA|\\u26D4|\\u26C5|\\u26C4|\\u26BE|\\u26BD|\\u26AB|\\u26AA|\\u26A1|\\u26A0|\\u2693|\\u271D|\\u267F|\\u267B|\\u2668|\\u2666|\\u2665|\\u2663|\\u2660|\\u2653|\\u2652|\\u2651|\\u2650|\\u264F|\\u264E|\\u264D|\\u2328|\\u264C|\\u264B|\\u264A|\\u2649|\\u2648|\\u263A|\\u261D|\\u2615|\\u2614|\\u2611|\\u260E|\\u2601|\\u2600|\\u25FE|\\u25FD|\\u25FC|\\u25FB|\\u25C0|\\u25B6|\\u25AB|\\u25AA|\\u24C2|\\u231B|\\u231A|\\u21AA|\\u270D|\\u21A9|\\u2199|\\u2198|\\u2197|\\u2196|\\u2195|\\u2194|\\u2139|\\u2122|\\u2049|\\u203C|\\u00AE|\\u00A9|\\u2763|\\u26F9|\\u26F8|\\u26F7|\\u26F4|\\u26F1|\\u26F0|\\u26E9|\\u26D3|\\u23CF|\\u23ED|\\u23EE|\\u23EF|\\u23F1|\\u23F2|\\u23F8|\\u23F9|\\u23FA|\\u2602|\\u2603|\\u2604|\\u2618|\\u2620|\\u2622|\\u2623|\\u2626|\\u262A|\\u262E|\\u262F|\\u2638|\\u2639|\\u2692|\\u2694|\\u2696|\\u2697|\\u2699|\\u269B|\\u269C|\\u26B0|\\u26B1|\\u26C8|\\u26CF|\\u26D1|\\u26D3|\\u26E9|\\u26F0|\\u26F1|\\u26F4|\\u26F7|\\u26F8|\\u26F9|\\u2721|\\u2763|\\u26D1|\\u26CF|\\u26C8|\\u2757)", a.jsEscapeMap = (_a$jsEscapeMap = { "👩‍❤️‍💋‍👩": "1f469-200d-2764-fe0f-200d-1f48b-200d-1f469", "👩❤💋👩": "1f469-2764-1f48b-1f469", "👨‍❤️‍💋‍👨": "1f468-200d-2764-fe0f-200d-1f48b-200d-1f468", "👨❤💋👨": "1f468-2764-1f48b-1f468", "👨‍👨‍👦‍👦": "1f468-200d-1f468-200d-1f466-200d-1f466", "👨👨👦👦": "1f468-1f468-1f466-1f466", "👨‍👨‍👧‍👦": "1f468-200d-1f468-200d-1f467-200d-1f466", "👨👨👧👦": "1f468-1f468-1f467-1f466", "👨‍👨‍👧‍👧": "1f468-200d-1f468-200d-1f467-200d-1f467", "👨👨👧👧": "1f468-1f468-1f467-1f467", "👨‍👩‍👦‍👦": "1f468-200d-1f469-200d-1f466-200d-1f466", "👨👩👦👦": "1f468-1f469-1f466-1f466", "👨‍👩‍👧‍👦": "1f468-200d-1f469-200d-1f467-200d-1f466", "👨👩👧👦": "1f468-1f469-1f467-1f466", "👨‍👩‍👧‍👧": "1f468-200d-1f469-200d-1f467-200d-1f467", "👨👩👧👧": "1f468-1f469-1f467-1f467", "👩‍👩‍👦‍👦": "1f469-200d-1f469-200d-1f466-200d-1f466", "👩👩👦👦": "1f469-1f469-1f466-1f466", "👩‍👩‍👧‍👦": "1f469-200d-1f469-200d-1f467-200d-1f466", "👩👩👧👦": "1f469-1f469-1f467-1f466", "👩‍👩‍👧‍👧": "1f469-200d-1f469-200d-1f467-200d-1f467", "👩👩👧👧": "1f469-1f469-1f467-1f467", "👩‍❤️‍👩": "1f469-200d-2764-fe0f-200d-1f469", "👩❤👩": "1f469-2764-1f469", "👨‍❤️‍👨": "1f468-200d-2764-fe0f-200d-1f468", "👨❤👨": "1f468-2764-1f468", "👨‍👨‍👦": "1f468-200d-1f468-200d-1f466", "👨👨👦": "1f468-1f468-1f466", "👨‍👨‍👧": "1f468-200d-1f468-200d-1f467", "👨👨👧": "1f468-1f468-1f467", "👨‍👩‍👧": "1f468-200d-1f469-200d-1f467", "👨👩👧": "1f468-1f469-1f467", "👩‍👩‍👦": "1f469-200d-1f469-200d-1f466", "👩👩👦": "1f469-1f469-1f466", "👩‍👩‍👧": "1f469-200d-1f469-200d-1f467", "👩👩👧": "1f469-1f469-1f467", "🏳️‍🌈": "1f3f3-fe0f-200d-1f308", "🏳🌈": "1f3f3-1f308", "👁‍🗨": "1f441-200d-1f5e8", "👁🗨": "1f441-1f5e8", "#️⃣": "0023-fe0f-20e3", "#⃣": "0023-20e3", "0️⃣": "0030-fe0f-20e3", "0⃣": "0030-20e3", "1️⃣": "0031-fe0f-20e3", "1⃣": "0031-20e3", "2️⃣": "0032-fe0f-20e3", "2⃣": "0032-20e3", "3️⃣": "0033-fe0f-20e3", "3⃣": "0033-20e3", "4️⃣": "0034-fe0f-20e3", "4⃣": "0034-20e3", "5️⃣": "0035-fe0f-20e3", "5⃣": "0035-20e3", "6️⃣": "0036-fe0f-20e3", "6⃣": "0036-20e3", "7️⃣": "0037-fe0f-20e3", "7⃣": "0037-20e3", "8️⃣": "0038-fe0f-20e3", "8⃣": "0038-20e3", "9️⃣": "0039-fe0f-20e3", "9⃣": "0039-20e3", "*️⃣": "002a-fe0f-20e3", "*⃣": "002a-20e3", "🤾🏿": "1f93e-1f3ff", "🤾🏾": "1f93e-1f3fe", "🤾🏽": "1f93e-1f3fd", "🤾🏼": "1f93e-1f3fc", "🤾🏻": "1f93e-1f3fb", "🤽🏿": "1f93d-1f3ff", "🤽🏾": "1f93d-1f3fe", "🤽🏽": "1f93d-1f3fd", "🤽🏼": "1f93d-1f3fc", "🤽🏻": "1f93d-1f3fb", "🤼🏿": "1f93c-1f3ff", "🤼🏾": "1f93c-1f3fe", "🤼🏽": "1f93c-1f3fd", "🤼🏼": "1f93c-1f3fc", "🤼🏻": "1f93c-1f3fb", "🤹🏿": "1f939-1f3ff", "🤹🏾": "1f939-1f3fe", "🤹🏽": "1f939-1f3fd", "🤹🏼": "1f939-1f3fc", "🤹🏻": "1f939-1f3fb", "🤸🏿": "1f938-1f3ff", "🤸🏾": "1f938-1f3fe", "🤸🏽": "1f938-1f3fd", "🤸🏼": "1f938-1f3fc", "🤸🏻": "1f938-1f3fb", "🤷🏿": "1f937-1f3ff", "🤷🏾": "1f937-1f3fe", "🤷🏽": "1f937-1f3fd", "🤷🏼": "1f937-1f3fc", "🤷🏻": "1f937-1f3fb", "🤶🏿": "1f936-1f3ff", "🤶🏾": "1f936-1f3fe", "🤶🏽": "1f936-1f3fd", "🤶🏼": "1f936-1f3fc", "🤶🏻": "1f936-1f3fb", "🤵🏿": "1f935-1f3ff", "🤵🏾": "1f935-1f3fe", "🤵🏽": "1f935-1f3fd", "🤵🏼": "1f935-1f3fc", "🤵🏻": "1f935-1f3fb", "🤴🏿": "1f934-1f3ff", "🤴🏾": "1f934-1f3fe", "🤴🏽": "1f934-1f3fd", "🤴🏼": "1f934-1f3fc", "🤴🏻": "1f934-1f3fb", "🤳🏿": "1f933-1f3ff", "🤳🏾": "1f933-1f3fe", "🤳🏽": "1f933-1f3fd", "🤳🏼": "1f933-1f3fc", "🤳🏻": "1f933-1f3fb", "🤰🏿": "1f930-1f3ff", "🤰🏾": "1f930-1f3fe", "🤰🏽": "1f930-1f3fd", "🤰🏼": "1f930-1f3fc", "🤰🏻": "1f930-1f3fb", "🤦🏿": "1f926-1f3ff", "🤦🏾": "1f926-1f3fe", "🤦🏽": "1f926-1f3fd", "🤦🏼": "1f926-1f3fc", "🤦🏻": "1f926-1f3fb", "🤞🏿": "1f91e-1f3ff", "🤞🏾": "1f91e-1f3fe", "🤞🏽": "1f91e-1f3fd", "🤞🏼": "1f91e-1f3fc", "🤞🏻": "1f91e-1f3fb", "🤝🏿": "1f91d-1f3ff", "🤝🏾": "1f91d-1f3fe", "🤝🏽": "1f91d-1f3fd", "🤝🏼": "1f91d-1f3fc", "🤝🏻": "1f91d-1f3fb", "🤜🏿": "1f91c-1f3ff", "🤜🏾": "1f91c-1f3fe", "🤜🏽": "1f91c-1f3fd", "🤜🏼": "1f91c-1f3fc", "🤜🏻": "1f91c-1f3fb", "🤛🏿": "1f91b-1f3ff", "🤛🏾": "1f91b-1f3fe", "🤛🏽": "1f91b-1f3fd", "🤛🏼": "1f91b-1f3fc", "🤛🏻": "1f91b-1f3fb", "🤚🏿": "1f91a-1f3ff", "🤚🏾": "1f91a-1f3fe", "🤚🏽": "1f91a-1f3fd", "🤚🏼": "1f91a-1f3fc", "🤚🏻": "1f91a-1f3fb", "🤙🏿": "1f919-1f3ff", "🤙🏾": "1f919-1f3fe", "🤙🏽": "1f919-1f3fd", "🤙🏼": "1f919-1f3fc", "🤙🏻": "1f919-1f3fb", "🤘🏿": "1f918-1f3ff", "🤘🏾": "1f918-1f3fe", "🤘🏽": "1f918-1f3fd", "🤘🏼": "1f918-1f3fc", "🤘🏻": "1f918-1f3fb", "🛀🏿": "1f6c0-1f3ff", "🛀🏾": "1f6c0-1f3fe", "🛀🏽": "1f6c0-1f3fd", "🛀🏼": "1f6c0-1f3fc", "🛀🏻": "1f6c0-1f3fb", "🚶🏿": "1f6b6-1f3ff", "🚶🏾": "1f6b6-1f3fe", "🚶🏽": "1f6b6-1f3fd", "🚶🏼": "1f6b6-1f3fc", "🚶🏻": "1f6b6-1f3fb", "🚵🏿": "1f6b5-1f3ff", "🚵🏾": "1f6b5-1f3fe", "🚵🏽": "1f6b5-1f3fd", "🚵🏼": "1f6b5-1f3fc", "🚵🏻": "1f6b5-1f3fb", "🚴🏿": "1f6b4-1f3ff", "🚴🏾": "1f6b4-1f3fe", "🚴🏽": "1f6b4-1f3fd", "🚴🏼": "1f6b4-1f3fc", "🚴🏻": "1f6b4-1f3fb", "🚣🏿": "1f6a3-1f3ff", "🚣🏾": "1f6a3-1f3fe", "🚣🏽": "1f6a3-1f3fd", "🚣🏼": "1f6a3-1f3fc", "🚣🏻": "1f6a3-1f3fb", "🙏🏿": "1f64f-1f3ff", "🙏🏾": "1f64f-1f3fe", "🙏🏽": "1f64f-1f3fd", "🙏🏼": "1f64f-1f3fc", "🙏🏻": "1f64f-1f3fb", "🙎🏿": "1f64e-1f3ff", "🙎🏾": "1f64e-1f3fe", "🙎🏽": "1f64e-1f3fd", "🙎🏼": "1f64e-1f3fc", "🙎🏻": "1f64e-1f3fb", "🙍🏿": "1f64d-1f3ff", "🙍🏾": "1f64d-1f3fe", "🙍🏽": "1f64d-1f3fd", "🙍🏼": "1f64d-1f3fc", "🙍🏻": "1f64d-1f3fb", "🙌🏿": "1f64c-1f3ff", "🙌🏾": "1f64c-1f3fe", "🙌🏽": "1f64c-1f3fd", "🙌🏼": "1f64c-1f3fc", "🙌🏻": "1f64c-1f3fb", "🙋🏿": "1f64b-1f3ff", "🙋🏾": "1f64b-1f3fe", "🙋🏽": "1f64b-1f3fd", "🙋🏼": "1f64b-1f3fc", "🙋🏻": "1f64b-1f3fb", "🙇🏿": "1f647-1f3ff", "🙇🏾": "1f647-1f3fe", "🙇🏽": "1f647-1f3fd", "🙇🏼": "1f647-1f3fc", "🙇🏻": "1f647-1f3fb", "🙆🏿": "1f646-1f3ff", "🙆🏾": "1f646-1f3fe", "🙆🏽": "1f646-1f3fd", "🙆🏼": "1f646-1f3fc", "🙆🏻": "1f646-1f3fb", "🙅🏿": "1f645-1f3ff", "🙅🏾": "1f645-1f3fe", "🙅🏽": "1f645-1f3fd", "🙅🏼": "1f645-1f3fc", "🙅🏻": "1f645-1f3fb", "🖖🏿": "1f596-1f3ff", "🖖🏾": "1f596-1f3fe", "🖖🏽": "1f596-1f3fd", "🖖🏼": "1f596-1f3fc", "🖖🏻": "1f596-1f3fb", "🖕🏿": "1f595-1f3ff", "🖕🏾": "1f595-1f3fe", "🖕🏽": "1f595-1f3fd", "🖕🏼": "1f595-1f3fc", "🖕🏻": "1f595-1f3fb", "🖐🏿": "1f590-1f3ff", "🖐🏾": "1f590-1f3fe", "🖐🏽": "1f590-1f3fd", "🖐🏼": "1f590-1f3fc", "🖐🏻": "1f590-1f3fb", "🕺🏿": "1f57a-1f3ff", "🕺🏾": "1f57a-1f3fe", "🕺🏽": "1f57a-1f3fd", "🕺🏼": "1f57a-1f3fc", "🕺🏻": "1f57a-1f3fb", "🕵🏿": "1f575-1f3ff", "🕵🏾": "1f575-1f3fe", "🕵🏽": "1f575-1f3fd", "🕵🏼": "1f575-1f3fc", "🕵🏻": "1f575-1f3fb", "💪🏿": "1f4aa-1f3ff", "💪🏾": "1f4aa-1f3fe", "💪🏽": "1f4aa-1f3fd", "💪🏼": "1f4aa-1f3fc", "💪🏻": "1f4aa-1f3fb", "💇🏿": "1f487-1f3ff", "💇🏾": "1f487-1f3fe", "💇🏽": "1f487-1f3fd", "💇🏼": "1f487-1f3fc", "💇🏻": "1f487-1f3fb", "💆🏿": "1f486-1f3ff", "💆🏾": "1f486-1f3fe", "💆🏽": "1f486-1f3fd", "💆🏼": "1f486-1f3fc", "💆🏻": "1f486-1f3fb", "💅🏿": "1f485-1f3ff", "💅🏾": "1f485-1f3fe", "💅🏽": "1f485-1f3fd", "💅🏼": "1f485-1f3fc", "💅🏻": "1f485-1f3fb", "💃🏿": "1f483-1f3ff", "💃🏾": "1f483-1f3fe", "💃🏽": "1f483-1f3fd", "💃🏼": "1f483-1f3fc", "💃🏻": "1f483-1f3fb", "💂🏿": "1f482-1f3ff", "💂🏾": "1f482-1f3fe", "💂🏽": "1f482-1f3fd", "💂🏼": "1f482-1f3fc", "💂🏻": "1f482-1f3fb", "💁🏿": "1f481-1f3ff", "💁🏾": "1f481-1f3fe", "💁🏽": "1f481-1f3fd", "💁🏼": "1f481-1f3fc", "💁🏻": "1f481-1f3fb", "👼🏿": "1f47c-1f3ff", "👼🏾": "1f47c-1f3fe", "👼🏽": "1f47c-1f3fd", "👼🏼": "1f47c-1f3fc", "👼🏻": "1f47c-1f3fb", "👸🏿": "1f478-1f3ff", "👸🏾": "1f478-1f3fe", "👸🏽": "1f478-1f3fd", "👸🏼": "1f478-1f3fc", "👸🏻": "1f478-1f3fb", "👷🏿": "1f477-1f3ff", "👷🏾": "1f477-1f3fe", "👷🏽": "1f477-1f3fd", "👷🏼": "1f477-1f3fc", "👷🏻": "1f477-1f3fb", "👶🏿": "1f476-1f3ff", "👶🏾": "1f476-1f3fe", "👶🏽": "1f476-1f3fd", "👶🏼": "1f476-1f3fc", "👶🏻": "1f476-1f3fb", "👵🏿": "1f475-1f3ff", "👵🏾": "1f475-1f3fe", "👵🏽": "1f475-1f3fd", "👵🏼": "1f475-1f3fc", "👵🏻": "1f475-1f3fb", "👴🏿": "1f474-1f3ff", "👴🏾": "1f474-1f3fe", "👴🏽": "1f474-1f3fd", "👴🏼": "1f474-1f3fc", "👴🏻": "1f474-1f3fb", "👳🏿": "1f473-1f3ff", "👳🏾": "1f473-1f3fe", "👳🏽": "1f473-1f3fd", "👳🏼": "1f473-1f3fc", "👳🏻": "1f473-1f3fb", "👲🏿": "1f472-1f3ff", "👲🏾": "1f472-1f3fe", "👲🏽": "1f472-1f3fd", "👲🏼": "1f472-1f3fc", "👲🏻": "1f472-1f3fb", "👱🏿": "1f471-1f3ff", "👱🏾": "1f471-1f3fe", "👱🏽": "1f471-1f3fd", "👱🏼": "1f471-1f3fc", "👱🏻": "1f471-1f3fb", "👰🏿": "1f470-1f3ff", "👰🏾": "1f470-1f3fe", "👰🏽": "1f470-1f3fd", "👰🏼": "1f470-1f3fc", "👰🏻": "1f470-1f3fb", "👮🏿": "1f46e-1f3ff", "👮🏾": "1f46e-1f3fe", "👮🏽": "1f46e-1f3fd", "👮🏼": "1f46e-1f3fc", "👮🏻": "1f46e-1f3fb", "👩🏿": "1f469-1f3ff", "👩🏾": "1f469-1f3fe", "👩🏽": "1f469-1f3fd", "👩🏼": "1f469-1f3fc", "👩🏻": "1f469-1f3fb", "👨🏿": "1f468-1f3ff", "👨🏾": "1f468-1f3fe", "👨🏽": "1f468-1f3fd", "👨🏼": "1f468-1f3fc", "👨🏻": "1f468-1f3fb", "👧🏿": "1f467-1f3ff", "👧🏾": "1f467-1f3fe", "👧🏽": "1f467-1f3fd", "👧🏼": "1f467-1f3fc", "👧🏻": "1f467-1f3fb", "👦🏿": "1f466-1f3ff", "👦🏾": "1f466-1f3fe", "👦🏽": "1f466-1f3fd", "👦🏼": "1f466-1f3fc", "👦🏻": "1f466-1f3fb", "👐🏿": "1f450-1f3ff", "👐🏾": "1f450-1f3fe", "👐🏽": "1f450-1f3fd", "👐🏼": "1f450-1f3fc", "👐🏻": "1f450-1f3fb", "👏🏿": "1f44f-1f3ff", "👏🏾": "1f44f-1f3fe", "👏🏽": "1f44f-1f3fd", "👏🏼": "1f44f-1f3fc", "👏🏻": "1f44f-1f3fb", "👎🏿": "1f44e-1f3ff", "👎🏾": "1f44e-1f3fe", "👎🏽": "1f44e-1f3fd", "👎🏼": "1f44e-1f3fc", "👎🏻": "1f44e-1f3fb", "👍🏿": "1f44d-1f3ff", "👍🏾": "1f44d-1f3fe", "👍🏽": "1f44d-1f3fd", "👍🏼": "1f44d-1f3fc", "👍🏻": "1f44d-1f3fb", "👌🏿": "1f44c-1f3ff", "👌🏾": "1f44c-1f3fe", "👌🏽": "1f44c-1f3fd", "👌🏼": "1f44c-1f3fc", "👌🏻": "1f44c-1f3fb", "👋🏿": "1f44b-1f3ff", "👋🏾": "1f44b-1f3fe", "👋🏽": "1f44b-1f3fd", "👋🏼": "1f44b-1f3fc", "👋🏻": "1f44b-1f3fb", "👊🏿": "1f44a-1f3ff", "👊🏾": "1f44a-1f3fe", "👊🏽": "1f44a-1f3fd", "👊🏼": "1f44a-1f3fc", "👊🏻": "1f44a-1f3fb", "👉🏿": "1f449-1f3ff", "👉🏾": "1f449-1f3fe", "👉🏽": "1f449-1f3fd", "👉🏼": "1f449-1f3fc", "👉🏻": "1f449-1f3fb", "👈🏿": "1f448-1f3ff", "👈🏾": "1f448-1f3fe", "👈🏽": "1f448-1f3fd", "👈🏼": "1f448-1f3fc", "👈🏻": "1f448-1f3fb", "👇🏿": "1f447-1f3ff", "👇🏾": "1f447-1f3fe", "👇🏽": "1f447-1f3fd", "👇🏼": "1f447-1f3fc", "👇🏻": "1f447-1f3fb", "👆🏿": "1f446-1f3ff", "👆🏾": "1f446-1f3fe", "👆🏽": "1f446-1f3fd", "👆🏼": "1f446-1f3fc", "👆🏻": "1f446-1f3fb", "👃🏿": "1f443-1f3ff", "👃🏾": "1f443-1f3fe", "👃🏽": "1f443-1f3fd", "👃🏼": "1f443-1f3fc", "👃🏻": "1f443-1f3fb", "👂🏿": "1f442-1f3ff", "👂🏾": "1f442-1f3fe", "👂🏽": "1f442-1f3fd", "👂🏼": "1f442-1f3fc", "👂🏻": "1f442-1f3fb", "🏋🏿": "1f3cb-1f3ff", "🏋🏾": "1f3cb-1f3fe", "🏋🏽": "1f3cb-1f3fd", "🏋🏼": "1f3cb-1f3fc", "🏋🏻": "1f3cb-1f3fb", "🏊🏿": "1f3ca-1f3ff", "🏊🏾": "1f3ca-1f3fe", "🏊🏽": "1f3ca-1f3fd", "🏊🏼": "1f3ca-1f3fc", "🏊🏻": "1f3ca-1f3fb", "🏇🏿": "1f3c7-1f3ff", "🏇🏾": "1f3c7-1f3fe", "🏇🏽": "1f3c7-1f3fd", "🏇🏼": "1f3c7-1f3fc", "🏇🏻": "1f3c7-1f3fb", "🏄🏿": "1f3c4-1f3ff", "🏄🏾": "1f3c4-1f3fe", "🏄🏽": "1f3c4-1f3fd", "🏄🏼": "1f3c4-1f3fc", "🏄🏻": "1f3c4-1f3fb", "🏃🏿": "1f3c3-1f3ff", "🏃🏾": "1f3c3-1f3fe", "🏃🏽": "1f3c3-1f3fd", "🏃🏼": "1f3c3-1f3fc", "🏃🏻": "1f3c3-1f3fb", "🎅🏿": "1f385-1f3ff", "🎅🏾": "1f385-1f3fe", "🎅🏽": "1f385-1f3fd", "🎅🏼": "1f385-1f3fc", "🎅🏻": "1f385-1f3fb", "🇿🇼": "1f1ff-1f1fc", "🇿🇲": "1f1ff-1f1f2", "🇿🇦": "1f1ff-1f1e6", "🇾🇹": "1f1fe-1f1f9", "🇾🇪": "1f1fe-1f1ea", "🇽🇰": "1f1fd-1f1f0", "🇼🇸": "1f1fc-1f1f8", "🇼🇫": "1f1fc-1f1eb", "🇻🇺": "1f1fb-1f1fa", "🇻🇳": "1f1fb-1f1f3", "🇻🇮": "1f1fb-1f1ee", "🇻🇬": "1f1fb-1f1ec", "🇻🇪": "1f1fb-1f1ea", "🇻🇨": "1f1fb-1f1e8", "🇻🇦": "1f1fb-1f1e6", "🇺🇿": "1f1fa-1f1ff", "🇺🇾": "1f1fa-1f1fe", "🇺🇸": "1f1fa-1f1f8", "🇺🇲": "1f1fa-1f1f2", "🇺🇬": "1f1fa-1f1ec", "🇺🇦": "1f1fa-1f1e6", "🇹🇿": "1f1f9-1f1ff", "🇹🇼": "1f1f9-1f1fc", "🇹🇻": "1f1f9-1f1fb", "🇹🇹": "1f1f9-1f1f9", "🇹🇷": "1f1f9-1f1f7", "🇹🇴": "1f1f9-1f1f4", "🇹🇳": "1f1f9-1f1f3", "🇹🇲": "1f1f9-1f1f2", "🇹🇱": "1f1f9-1f1f1", "🇹🇰": "1f1f9-1f1f0", "🇹🇯": "1f1f9-1f1ef", "🇹🇭": "1f1f9-1f1ed", "🇹🇬": "1f1f9-1f1ec", "🇹🇫": "1f1f9-1f1eb", "🇹🇩": "1f1f9-1f1e9", "🇹🇨": "1f1f9-1f1e8", "🇹🇦": "1f1f9-1f1e6", "🇸🇿": "1f1f8-1f1ff", "🇸🇾": "1f1f8-1f1fe", "🇸🇽": "1f1f8-1f1fd", "🇸🇻": "1f1f8-1f1fb", "🇸🇹": "1f1f8-1f1f9", "🇸🇸": "1f1f8-1f1f8", "🇸🇷": "1f1f8-1f1f7", "🇸🇴": "1f1f8-1f1f4", "🇸🇳": "1f1f8-1f1f3", "🇸🇲": "1f1f8-1f1f2", "🇸🇱": "1f1f8-1f1f1", "🇸🇰": "1f1f8-1f1f0", "🇸🇯": "1f1f8-1f1ef", "🇸🇮": "1f1f8-1f1ee", "🇸🇭": "1f1f8-1f1ed", "🇸🇬": "1f1f8-1f1ec", "🇸🇪": "1f1f8-1f1ea", "🇸🇩": "1f1f8-1f1e9", "🇸🇨": "1f1f8-1f1e8", "🇸🇧": "1f1f8-1f1e7", "🇸🇦": "1f1f8-1f1e6", "🇷🇼": "1f1f7-1f1fc", "🇷🇺": "1f1f7-1f1fa", "🇷🇸": "1f1f7-1f1f8", "🇷🇴": "1f1f7-1f1f4", "🇷🇪": "1f1f7-1f1ea", "🇶🇦": "1f1f6-1f1e6", "🇵🇾": "1f1f5-1f1fe", "🇵🇼": "1f1f5-1f1fc", "🇵🇹": "1f1f5-1f1f9", "🇵🇸": "1f1f5-1f1f8", "🇵🇷": "1f1f5-1f1f7", "🇵🇳": "1f1f5-1f1f3", "🇵🇲": "1f1f5-1f1f2", "🇵🇱": "1f1f5-1f1f1", "🇵🇰": "1f1f5-1f1f0", "🇵🇭": "1f1f5-1f1ed", "🇵🇬": "1f1f5-1f1ec", "🇵🇫": "1f1f5-1f1eb", "🇵🇪": "1f1f5-1f1ea", "🇵🇦": "1f1f5-1f1e6", "🇴🇲": "1f1f4-1f1f2", "🇳🇿": "1f1f3-1f1ff", "🇳🇺": "1f1f3-1f1fa", "🇳🇷": "1f1f3-1f1f7", "🇳🇵": "1f1f3-1f1f5", "🇳🇴": "1f1f3-1f1f4", "🇳🇱": "1f1f3-1f1f1", "🇳🇮": "1f1f3-1f1ee", "🇳🇬": "1f1f3-1f1ec", "🇳🇫": "1f1f3-1f1eb", "🇳🇪": "1f1f3-1f1ea", "🇳🇨": "1f1f3-1f1e8", "🇳🇦": "1f1f3-1f1e6", "🇲🇿": "1f1f2-1f1ff", "🇲🇾": "1f1f2-1f1fe", "🇲🇽": "1f1f2-1f1fd", "🇲🇼": "1f1f2-1f1fc", "🇲🇻": "1f1f2-1f1fb", "🇲🇺": "1f1f2-1f1fa", "🇲🇹": "1f1f2-1f1f9", "🇲🇸": "1f1f2-1f1f8", "🇲🇷": "1f1f2-1f1f7", "🇲🇶": "1f1f2-1f1f6", "🇲🇵": "1f1f2-1f1f5", "🇲🇴": "1f1f2-1f1f4", "🇲🇳": "1f1f2-1f1f3", "🇲🇲": "1f1f2-1f1f2", "🇲🇱": "1f1f2-1f1f1", "🇲🇰": "1f1f2-1f1f0", "🇲🇭": "1f1f2-1f1ed", "🇲🇬": "1f1f2-1f1ec", "🇲🇫": "1f1f2-1f1eb", "🇲🇪": "1f1f2-1f1ea", "🇲🇩": "1f1f2-1f1e9", "🇲🇨": "1f1f2-1f1e8", "🇲🇦": "1f1f2-1f1e6", "🇱🇾": "1f1f1-1f1fe", "🇱🇻": "1f1f1-1f1fb", "🇱🇺": "1f1f1-1f1fa", "🇱🇹": "1f1f1-1f1f9", "🇱🇸": "1f1f1-1f1f8", "🇱🇷": "1f1f1-1f1f7", "🇱🇰": "1f1f1-1f1f0", "🇱🇮": "1f1f1-1f1ee", "🇱🇨": "1f1f1-1f1e8", "🇱🇧": "1f1f1-1f1e7", "🇱🇦": "1f1f1-1f1e6", "🇰🇿": "1f1f0-1f1ff", "🇰🇾": "1f1f0-1f1fe", "🇰🇼": "1f1f0-1f1fc", "🇰🇷": "1f1f0-1f1f7", "🇰🇵": "1f1f0-1f1f5", "🇰🇳": "1f1f0-1f1f3", "🇰🇲": "1f1f0-1f1f2", "🇰🇮": "1f1f0-1f1ee", "🇰🇭": "1f1f0-1f1ed", "🇰🇬": "1f1f0-1f1ec", "🇰🇪": "1f1f0-1f1ea", "🇯🇵": "1f1ef-1f1f5", "🇯🇴": "1f1ef-1f1f4", "🇯🇲": "1f1ef-1f1f2", "🇯🇪": "1f1ef-1f1ea", "🇮🇹": "1f1ee-1f1f9", "🇮🇸": "1f1ee-1f1f8", "🇮🇷": "1f1ee-1f1f7", "🇮🇶": "1f1ee-1f1f6", "🇮🇴": "1f1ee-1f1f4", "🇮🇳": "1f1ee-1f1f3", "🇮🇲": "1f1ee-1f1f2", "🇮🇱": "1f1ee-1f1f1", "🇮🇪": "1f1ee-1f1ea", "🇮🇩": "1f1ee-1f1e9", "🇮🇨": "1f1ee-1f1e8", "🇭🇺": "1f1ed-1f1fa", "🇭🇹": "1f1ed-1f1f9", "🇭🇷": "1f1ed-1f1f7", "🇭🇳": "1f1ed-1f1f3", "🇭🇲": "1f1ed-1f1f2", "🇭🇰": "1f1ed-1f1f0", "🇬🇾": "1f1ec-1f1fe", "🇬🇼": "1f1ec-1f1fc", "🇬🇺": "1f1ec-1f1fa", "🇬🇹": "1f1ec-1f1f9", "🇬🇸": "1f1ec-1f1f8", "🇬🇷": "1f1ec-1f1f7", "🇬🇶": "1f1ec-1f1f6", "🇬🇵": "1f1ec-1f1f5", "🇬🇳": "1f1ec-1f1f3", "🇬🇲": "1f1ec-1f1f2", "🇬🇱": "1f1ec-1f1f1", "🇬🇮": "1f1ec-1f1ee", "🇬🇭": "1f1ec-1f1ed", "🇬🇬": "1f1ec-1f1ec", "🇬🇫": "1f1ec-1f1eb", "🇬🇪": "1f1ec-1f1ea", "🇬🇩": "1f1ec-1f1e9", "🇬🇧": "1f1ec-1f1e7", "🇬🇦": "1f1ec-1f1e6", "🇫🇷": "1f1eb-1f1f7", "🇫🇴": "1f1eb-1f1f4", "🇫🇲": "1f1eb-1f1f2", "🇫🇰": "1f1eb-1f1f0", "🇫🇯": "1f1eb-1f1ef", "🇫🇮": "1f1eb-1f1ee", "🇪🇺": "1f1ea-1f1fa", "🇪🇹": "1f1ea-1f1f9", "🇪🇸": "1f1ea-1f1f8", "🇪🇷": "1f1ea-1f1f7", "🇪🇭": "1f1ea-1f1ed", "🇪🇬": "1f1ea-1f1ec", "🇪🇪": "1f1ea-1f1ea", "🇪🇨": "1f1ea-1f1e8", "🇪🇦": "1f1ea-1f1e6", "🇩🇿": "1f1e9-1f1ff", "🇩🇴": "1f1e9-1f1f4", "🇩🇲": "1f1e9-1f1f2", "🇩🇰": "1f1e9-1f1f0", "🇩🇯": "1f1e9-1f1ef", "🇩🇬": "1f1e9-1f1ec", "🇩🇪": "1f1e9-1f1ea", "🇨🇿": "1f1e8-1f1ff", "🇨🇾": "1f1e8-1f1fe", "🇨🇽": "1f1e8-1f1fd", "🇨🇼": "1f1e8-1f1fc", "🇨🇻": "1f1e8-1f1fb", "🇨🇺": "1f1e8-1f1fa", "🇨🇷": "1f1e8-1f1f7", "🇨🇵": "1f1e8-1f1f5", "🇨🇴": "1f1e8-1f1f4", "🇨🇳": "1f1e8-1f1f3", "🇨🇲": "1f1e8-1f1f2", "🇨🇱": "1f1e8-1f1f1", "🇨🇰": "1f1e8-1f1f0", "🇨🇮": "1f1e8-1f1ee", "🇨🇭": "1f1e8-1f1ed", "🇨🇬": "1f1e8-1f1ec", "🇨🇫": "1f1e8-1f1eb", "🇨🇩": "1f1e8-1f1e9", "🇨🇨": "1f1e8-1f1e8", "🇨🇦": "1f1e8-1f1e6", "🇧🇿": "1f1e7-1f1ff", "🇧🇾": "1f1e7-1f1fe", "🇧🇼": "1f1e7-1f1fc", "🇧🇻": "1f1e7-1f1fb", "🇧🇹": "1f1e7-1f1f9", "🇧🇸": "1f1e7-1f1f8", "🇧🇷": "1f1e7-1f1f7", "🇧🇶": "1f1e7-1f1f6", "🇧🇴": "1f1e7-1f1f4", "🇧🇳": "1f1e7-1f1f3", "🇧🇲": "1f1e7-1f1f2", "🇧🇱": "1f1e7-1f1f1", "🇧🇯": "1f1e7-1f1ef", "🇧🇮": "1f1e7-1f1ee", "🇧🇭": "1f1e7-1f1ed", "🇧🇬": "1f1e7-1f1ec", "🇧🇫": "1f1e7-1f1eb", "🇧🇪": "1f1e7-1f1ea", "🇧🇩": "1f1e7-1f1e9", "🇧🇧": "1f1e7-1f1e7", "🇧🇦": "1f1e7-1f1e6", "🇦🇿": "1f1e6-1f1ff", "🇦🇽": "1f1e6-1f1fd", "🇦🇼": "1f1e6-1f1fc", "🇦🇺": "1f1e6-1f1fa", "🇦🇹": "1f1e6-1f1f9", "🇦🇸": "1f1e6-1f1f8", "🇦🇷": "1f1e6-1f1f7", "🇦🇶": "1f1e6-1f1f6", "🇦🇴": "1f1e6-1f1f4", "🇦🇲": "1f1e6-1f1f2", "🇦🇱": "1f1e6-1f1f1", "🇦🇮": "1f1e6-1f1ee", "🇦🇬": "1f1e6-1f1ec", "🇦🇫": "1f1e6-1f1eb", "🇦🇪": "1f1e6-1f1ea", "🇦🇩": "1f1e6-1f1e9", "🇦🇨": "1f1e6-1f1e8", "🀄️": "1f004-fe0f", "🀄": "1f004", "🅿️": "1f17f-fe0f", "🅿": "1f17f", "🈂️": "1f202-fe0f", "🈂": "1f202", "🈚️": "1f21a-fe0f", "🈚": "1f21a", "🈯️": "1f22f-fe0f", "🈯": "1f22f", "🈷️": "1f237-fe0f", "🈷": "1f237", "🎞️": "1f39e-fe0f", "🎞": "1f39e", "🎟️": "1f39f-fe0f", "🎟": "1f39f", "🏋️": "1f3cb-fe0f", "🏋": "1f3cb", "🏌️": "1f3cc-fe0f", "🏌": "1f3cc", "🏍️": "1f3cd-fe0f", "🏍": "1f3cd", "🏎️": "1f3ce-fe0f", "🏎": "1f3ce", "🎖️": "1f396-fe0f", "🎖": "1f396", "🎗️": "1f397-fe0f", "🎗": "1f397", "🌶️": "1f336-fe0f", "🌶": "1f336", "🌧️": "1f327-fe0f", "🌧": "1f327", "🌨️": "1f328-fe0f", "🌨": "1f328", "🌩️": "1f329-fe0f", "🌩": "1f329", "🌪️": "1f32a-fe0f", "🌪": "1f32a", "🌫️": "1f32b-fe0f", "🌫": "1f32b", "🌬️": "1f32c-fe0f", "🌬": "1f32c", "🐿️": "1f43f-fe0f", "🐿": "1f43f", "🕷️": "1f577-fe0f", "🕷": "1f577", "🕸️": "1f578-fe0f", "🕸": "1f578", "🌡️": "1f321-fe0f", "🌡": "1f321", "🎙️": "1f399-fe0f", "🎙": "1f399", "🎚️": "1f39a-fe0f", "🎚": "1f39a", "🎛️": "1f39b-fe0f", "🎛": "1f39b", "🏳️": "1f3f3-fe0f", "🏳": "1f3f3", "🏵️": "1f3f5-fe0f", "🏵": "1f3f5", "🏷️": "1f3f7-fe0f", "🏷": "1f3f7", "📽️": "1f4fd-fe0f", "📽": "1f4fd", "🕉️": "1f549-fe0f", "🕉": "1f549", "🕊️": "1f54a-fe0f", "🕊": "1f54a", "🕯️": "1f56f-fe0f", "🕯": "1f56f", "🕰️": "1f570-fe0f", "🕰": "1f570", "🕳️": "1f573-fe0f", "🕳": "1f573", "🕶️": "1f576-fe0f", "🕶": "1f576", "🕹️": "1f579-fe0f", "🕹": "1f579", "🖇️": "1f587-fe0f", "🖇": "1f587", "🖊️": "1f58a-fe0f", "🖊": "1f58a", "🖋️": "1f58b-fe0f", "🖋": "1f58b", "🖌️": "1f58c-fe0f", "🖌": "1f58c", "🖍️": "1f58d-fe0f", "🖍": "1f58d", "🖥️": "1f5a5-fe0f", "🖥": "1f5a5", "🖨️": "1f5a8-fe0f", "🖨": "1f5a8", "🖲️": "1f5b2-fe0f", "🖲": "1f5b2", "🖼️": "1f5bc-fe0f", "🖼": "1f5bc", "🗂️": "1f5c2-fe0f", "🗂": "1f5c2", "🗃️": "1f5c3-fe0f", "🗃": "1f5c3", "🗄️": "1f5c4-fe0f", "🗄": "1f5c4", "🗑️": "1f5d1-fe0f", "🗑": "1f5d1", "🗒️": "1f5d2-fe0f", "🗒": "1f5d2", "🗓️": "1f5d3-fe0f", "🗓": "1f5d3", "🗜️": "1f5dc-fe0f", "🗜": "1f5dc", "🗝️": "1f5dd-fe0f", "🗝": "1f5dd", "🗞️": "1f5de-fe0f", "🗞": "1f5de", "🗡️": "1f5e1-fe0f", "🗡": "1f5e1", "🗣️": "1f5e3-fe0f", "🗣": "1f5e3", "🗨️": "1f5e8-fe0f", "🗨": "1f5e8", "🗯️": "1f5ef-fe0f", "🗯": "1f5ef", "🗳️": "1f5f3-fe0f", "🗳": "1f5f3", "🗺️": "1f5fa-fe0f", "🗺": "1f5fa", "🛠️": "1f6e0-fe0f", "🛠": "1f6e0", "🛡️": "1f6e1-fe0f", "🛡": "1f6e1", "🛢️": "1f6e2-fe0f", "🛢": "1f6e2", "🛰️": "1f6f0-fe0f", "🛰": "1f6f0", "🍽️": "1f37d-fe0f", "🍽": "1f37d", "👁️": "1f441-fe0f", "👁": "1f441", "🕴️": "1f574-fe0f", "🕴": "1f574", "🕵️": "1f575-fe0f", "🕵": "1f575", "🖐️": "1f590-fe0f", "🖐": "1f590", "🏔️": "1f3d4-fe0f", "🏔": "1f3d4", "🏕️": "1f3d5-fe0f", "🏕": "1f3d5", "🏖️": "1f3d6-fe0f", "🏖": "1f3d6", "🏗️": "1f3d7-fe0f", "🏗": "1f3d7", "🏘️": "1f3d8-fe0f", "🏘": "1f3d8", "🏙️": "1f3d9-fe0f", "🏙": "1f3d9", "🏚️": "1f3da-fe0f", "🏚": "1f3da", "🏛️": "1f3db-fe0f", "🏛": "1f3db", "🏜️": "1f3dc-fe0f", "🏜": "1f3dc", "🏝️": "1f3dd-fe0f", "🏝": "1f3dd", "🏞️": "1f3de-fe0f", "🏞": "1f3de", "🏟️": "1f3df-fe0f", "🏟": "1f3df", "🛋️": "1f6cb-fe0f", "🛋": "1f6cb", "🛍️": "1f6cd-fe0f", "🛍": "1f6cd", "🛎️": "1f6ce-fe0f", "🛎": "1f6ce", "🛏️": "1f6cf-fe0f", "🛏": "1f6cf", "🛣️": "1f6e3-fe0f", "🛣": "1f6e3", "🛤️": "1f6e4-fe0f", "🛤": "1f6e4", "🛥️": "1f6e5-fe0f", "🛥": "1f6e5", "🛩️": "1f6e9-fe0f", "🛩": "1f6e9", "🛳️": "1f6f3-fe0f", "🛳": "1f6f3", "🌤️": "1f324-fe0f", "🌤": "1f324", "🌥️": "1f325-fe0f", "🌥": "1f325", "🌦️": "1f326-fe0f", "🌦": "1f326", "🖱️": "1f5b1-fe0f", "🖱": "1f5b1", "☝🏻": "261d-1f3fb", "☝🏼": "261d-1f3fc", "☝🏽": "261d-1f3fd", "☝🏾": "261d-1f3fe", "☝🏿": "261d-1f3ff", "✌🏻": "270c-1f3fb", "✌🏼": "270c-1f3fc", "✌🏽": "270c-1f3fd", "✌🏾": "270c-1f3fe", "✌🏿": "270c-1f3ff", "✊🏻": "270a-1f3fb", "✊🏼": "270a-1f3fc", "✊🏽": "270a-1f3fd", "✊🏾": "270a-1f3fe", "✊🏿": "270a-1f3ff", "✋🏻": "270b-1f3fb", "✋🏼": "270b-1f3fc", "✋🏽": "270b-1f3fd", "✋🏾": "270b-1f3fe", "✋🏿": "270b-1f3ff", "✍🏻": "270d-1f3fb", "✍🏼": "270d-1f3fc", "✍🏽": "270d-1f3fd", "✍🏾": "270d-1f3fe", "✍🏿": "270d-1f3ff", "⛹🏻": "26f9-1f3fb", "⛹🏼": "26f9-1f3fc", "⛹🏽": "26f9-1f3fd", "⛹🏾": "26f9-1f3fe", "⛹🏿": "26f9-1f3ff", "©️": "00a9-fe0f", "©": "00a9", "®️": "00ae-fe0f", "®": "00ae", "‼️": "203c-fe0f", "‼": "203c", "⁉️": "2049-fe0f", "⁉": "2049", "™️": "2122-fe0f", "™": "2122", "ℹ️": "2139-fe0f", "ℹ": "2139", "↔️": "2194-fe0f", "↔": "2194", "↕️": "2195-fe0f", "↕": "2195", "↖️": "2196-fe0f", "↖": "2196", "↗️": "2197-fe0f", "↗": "2197", "↘️": "2198-fe0f", "↘": "2198", "↙️": "2199-fe0f", "↙": "2199", "↩️": "21a9-fe0f", "↩": "21a9", "↪️": "21aa-fe0f", "↪": "21aa", "⌚️": "231a-fe0f", "⌚": "231a", "⌛️": "231b-fe0f", "⌛": "231b", "Ⓜ️": "24c2-fe0f", "Ⓜ": "24c2", "▪️": "25aa-fe0f", "▪": "25aa", "▫️": "25ab-fe0f", "▫": "25ab", "▶️": "25b6-fe0f", "▶": "25b6", "◀️": "25c0-fe0f", "◀": "25c0", "◻️": "25fb-fe0f", "◻": "25fb", "◼️": "25fc-fe0f", "◼": "25fc", "◽️": "25fd-fe0f", "◽": "25fd", "◾️": "25fe-fe0f", "◾": "25fe", "☀️": "2600-fe0f", "☀": "2600", "☁️": "2601-fe0f", "☁": "2601", "☎️": "260e-fe0f", "☎": "260e", "☑️": "2611-fe0f", "☑": "2611", "☔️": "2614-fe0f", "☔": "2614", "☕️": "2615-fe0f", "☕": "2615", "☝️": "261d-fe0f", "☝": "261d", "☺️": "263a-fe0f", "☺": "263a", "♈️": "2648-fe0f", "♈": "2648", "♉️": "2649-fe0f", "♉": "2649", "♊️": "264a-fe0f", "♊": "264a", "♋️": "264b-fe0f", "♋": "264b", "♌️": "264c-fe0f", "♌": "264c", "♍️": "264d-fe0f", "♍": "264d", "♎️": "264e-fe0f", "♎": "264e", "♏️": "264f-fe0f", "♏": "264f", "♐️": "2650-fe0f", "♐": "2650", "♑️": "2651-fe0f", "♑": "2651", "♒️": "2652-fe0f", "♒": "2652", "♓️": "2653-fe0f", "♓": "2653", "♠️": "2660-fe0f", "♠": "2660", "♣️": "2663-fe0f", "♣": "2663", "♥️": "2665-fe0f", "♥": "2665", "♦️": "2666-fe0f", "♦": "2666", "♨️": "2668-fe0f", "♨": "2668", "♻️": "267b-fe0f", "♻": "267b", "♿️": "267f-fe0f", "♿": "267f", "⚓️": "2693-fe0f", "⚓": "2693", "⚠️": "26a0-fe0f", "⚠": "26a0", "⚡️": "26a1-fe0f", "⚡": "26a1", "⚪️": "26aa-fe0f", "⚪": "26aa", "⚫️": "26ab-fe0f", "⚫": "26ab", "⚽️": "26bd-fe0f", "⚽": "26bd", "⚾️": "26be-fe0f", "⚾": "26be", "⛄️": "26c4-fe0f", "⛄": "26c4", "⛅️": "26c5-fe0f", "⛅": "26c5", "⛔️": "26d4-fe0f", "⛔": "26d4", "⛪️": "26ea-fe0f", "⛪": "26ea", "⛲️": "26f2-fe0f", "⛲": "26f2", "⛳️": "26f3-fe0f", "⛳": "26f3", "⛵️": "26f5-fe0f", "⛵": "26f5", "⛺️": "26fa-fe0f", "⛺": "26fa", "⛽️": "26fd-fe0f", "⛽": "26fd", "✂️": "2702-fe0f", "✂": "2702", "✈️": "2708-fe0f", "✈": "2708", "✉️": "2709-fe0f", "✉": "2709", "✌️": "270c-fe0f", "✌": "270c", "✏️": "270f-fe0f", "✏": "270f", "✒️": "2712-fe0f", "✒": "2712", "✔️": "2714-fe0f", "✔": "2714", "✖️": "2716-fe0f", "✖": "2716", "✳️": "2733-fe0f", "✳": "2733", "✴️": "2734-fe0f", "✴": "2734", "❄️": "2744-fe0f", "❄": "2744", "❇️": "2747-fe0f", "❇": "2747", "❗️": "2757-fe0f", "❗": "2757", "❤️": "2764-fe0f", "❤": "2764", "➡️": "27a1-fe0f", "➡": "27a1", "⤴️": "2934-fe0f", "⤴": "2934", "⤵️": "2935-fe0f", "⤵": "2935", "⬅️": "2b05-fe0f", "⬅": "2b05", "⬆️": "2b06-fe0f", "⬆": "2b06", "⬇️": "2b07-fe0f", "⬇": "2b07", "⬛️": "2b1b-fe0f", "⬛": "2b1b", "⬜️": "2b1c-fe0f", "⬜": "2b1c", "⭐️": "2b50-fe0f", "⭐": "2b50", "⭕️": "2b55-fe0f", "⭕": "2b55", "〰️": "3030-fe0f", "〰": "3030", "〽️": "303d-fe0f", "〽": "303d", "㊗️": "3297-fe0f", "㊗": "3297", "㊙️": "3299-fe0f", "㊙": "3299", "✝️": "271d-fe0f", "✝": "271d", "⌨️": "2328-fe0f", "⌨": "2328", "✍️": "270d-fe0f", "✍": "270d", "⏏️": "23cf-fe0f", "⏏": "23cf", "⏭️": "23ed-fe0f", "⏭": "23ed", "⏮️": "23ee-fe0f", "⏮": "23ee", "⏯️": "23ef-fe0f", "⏯": "23ef", "⏱️": "23f1-fe0f", "⏱": "23f1", "⏲️": "23f2-fe0f", "⏲": "23f2", "⏸️": "23f8-fe0f", "⏸": "23f8", "⏹️": "23f9-fe0f", "⏹": "23f9", "⏺️": "23fa-fe0f", "⏺": "23fa", "☂️": "2602-fe0f", "☂": "2602", "☃️": "2603-fe0f", "☃": "2603", "☄️": "2604-fe0f", "☄": "2604", "☘️": "2618-fe0f", "☘": "2618", "☠️": "2620-fe0f", "☠": "2620", "☢️": "2622-fe0f", "☢": "2622", "☣️": "2623-fe0f", "☣": "2623", "☦️": "2626-fe0f", "☦": "2626", "☪️": "262a-fe0f", "☪": "262a", "☮️": "262e-fe0f", "☮": "262e", "☯️": "262f-fe0f", "☯": "262f", "☸️": "2638-fe0f", "☸": "2638", "☹️": "2639-fe0f", "☹": "2639", "⚒️": "2692-fe0f", "⚒": "2692", "⚔️": "2694-fe0f", "⚔": "2694", "⚖️": "2696-fe0f", "⚖": "2696", "⚗️": "2697-fe0f", "⚗": "2697", "⚙️": "2699-fe0f", "⚙": "2699", "⚛️": "269b-fe0f", "⚛": "269b", "⚜️": "269c-fe0f", "⚜": "269c", "⚰️": "26b0-fe0f", "⚰": "26b0", "⚱️": "26b1-fe0f", "⚱": "26b1", "⛈️": "26c8-fe0f", "⛈": "26c8", "⛏️": "26cf-fe0f", "⛏": "26cf", "⛑️": "26d1-fe0f", "⛑": "26d1", "⛓️": "26d3-fe0f", "⛓": "26d3", "⛩️": "26e9-fe0f", "⛩": "26e9", "⛰️": "26f0-fe0f", "⛰": "26f0", "⛱️": "26f1-fe0f", "⛱": "26f1", "⛴️": "26f4-fe0f", "⛴": "26f4", "⛷️": "26f7-fe0f", "⛷": "26f7", "⛸️": "26f8-fe0f", "⛸": "26f8", "⛹️": "26f9-fe0f", "⛹": "26f9", "✡️": "2721-fe0f", "✡": "2721", "❣️": "2763-fe0f", "❣": "2763", "🥉": "1f949", "🥈": "1f948", "🥇": "1f947", "🤺": "1f93a", "🥅": "1f945", "🤾": "1f93e", "🇿": "1f1ff", "🤽": "1f93d", "🥋": "1f94b", "🥊": "1f94a", "🤼": "1f93c", "🤹": "1f939", "🤸": "1f938", "🛶": "1f6f6", "🛵": "1f6f5", "🛴": "1f6f4", "🛒": "1f6d2", "🃏": "1f0cf", "🅰": "1f170", "🅱": "1f171", "🅾": "1f17e", "🛑": "1f6d1", "🆎": "1f18e", "🆑": "1f191", "🇾": "1f1fe", "🆒": "1f192", "🆓": "1f193", "🆔": "1f194", "🆕": "1f195", "🆖": "1f196", "🆗": "1f197", "🆘": "1f198", "🥄": "1f944", "🆙": "1f199", "🆚": "1f19a", "🥂": "1f942", "🥃": "1f943", "🈁": "1f201", "🥙": "1f959", "🈲": "1f232", "🈳": "1f233", "🈴": "1f234", "🈵": "1f235", "🈶": "1f236", "🥘": "1f958", "🈸": "1f238", "🈹": "1f239", "🥗": "1f957", "🈺": "1f23a", "🉐": "1f250", "🉑": "1f251", "🌀": "1f300", "🥖": "1f956", "🌁": "1f301", "🌂": "1f302", "🌃": "1f303", "🌄": "1f304", "🌅": "1f305", "🌆": "1f306", "🥕": "1f955", "🌇": "1f307", "🌈": "1f308", "🥔": "1f954", "🌉": "1f309", "🌊": "1f30a", "🌋": "1f30b", "🌌": "1f30c", "🌏": "1f30f", "🌑": "1f311", "🥓": "1f953", "🌓": "1f313", "🌔": "1f314", "🌕": "1f315", "🌙": "1f319", "🌛": "1f31b", "🌟": "1f31f", "🥒": "1f952", "🌠": "1f320", "🌰": "1f330", "🥑": "1f951", "🌱": "1f331", "🌴": "1f334", "🌵": "1f335", "🌷": "1f337", "🌸": "1f338", "🌹": "1f339", "🌺": "1f33a", "🌻": "1f33b", "🌼": "1f33c", "🌽": "1f33d", "🥐": "1f950", "🌾": "1f33e", "🌿": "1f33f", "🍀": "1f340", "🍁": "1f341", "🍂": "1f342", "🍃": "1f343", "🍄": "1f344", "🍅": "1f345", "🍆": "1f346", "🍇": "1f347", "🍈": "1f348", "🍉": "1f349", "🍊": "1f34a", "🥀": "1f940", "🍌": "1f34c", "🍍": "1f34d", "🍎": "1f34e", "🍏": "1f34f", "🍑": "1f351", "🍒": "1f352", "🍓": "1f353", "🦏": "1f98f", "🍔": "1f354", "🍕": "1f355", "🍖": "1f356", "🦎": "1f98e", "🍗": "1f357", "🍘": "1f358", "🍙": "1f359", "🦍": "1f98d", "🍚": "1f35a", "🍛": "1f35b", "🦌": "1f98c", "🍜": "1f35c", "🍝": "1f35d", "🍞": "1f35e", "🍟": "1f35f", "🦋": "1f98b", "🍠": "1f360", "🍡": "1f361", "🦊": "1f98a", "🍢": "1f362", "🍣": "1f363", "🦉": "1f989", "🍤": "1f364", "🍥": "1f365", "🦈": "1f988", "🍦": "1f366", "🦇": "1f987", "🍧": "1f367", "🇽": "1f1fd", "🍨": "1f368", "🦆": "1f986", "🍩": "1f369", "🦅": "1f985", "🍪": "1f36a", "🖤": "1f5a4", "🍫": "1f36b", "🍬": "1f36c", "🍭": "1f36d", "🍮": "1f36e", "🍯": "1f36f", "🤞": "1f91e", "🍰": "1f370", "🍱": "1f371", "🍲": "1f372", "🤝": "1f91d", "🍳": "1f373", "🍴": "1f374", "🍵": "1f375", "🍶": "1f376", "🍷": "1f377", "🍸": "1f378", "🍹": "1f379", "🍺": "1f37a", "🍻": "1f37b", "🎀": "1f380", "🎁": "1f381", "🎂": "1f382", "🎃": "1f383", "🤛": "1f91b", "🤜": "1f91c", "🎄": "1f384", "🎅": "1f385", "🎆": "1f386", "🤚": "1f91a", "🎇": "1f387", "🎈": "1f388", "🎉": "1f389", "🎊": "1f38a", "🎋": "1f38b", "🎌": "1f38c", "🤙": "1f919", "🎍": "1f38d", "🕺": "1f57a", "🎎": "1f38e", "🤳": "1f933", "🎏": "1f38f", "🤰": "1f930", "🎐": "1f390", "🤦": "1f926", "🤷": "1f937", "🎑": "1f391", "🎒": "1f392", "🎓": "1f393", "🎠": "1f3a0", "🎡": "1f3a1", "🎢": "1f3a2", "🎣": "1f3a3", "🎤": "1f3a4", "🎥": "1f3a5", "🎦": "1f3a6", "🎧": "1f3a7", "🤶": "1f936", "🎨": "1f3a8", "🤵": "1f935", "🎩": "1f3a9", "🎪": "1f3aa", "🤴": "1f934", "🎫": "1f3ab", "🎬": "1f3ac", "🎭": "1f3ad", "🤧": "1f927", "🎮": "1f3ae", "🎯": "1f3af", "🎰": "1f3b0", "🎱": "1f3b1", "🎲": "1f3b2", "🎳": "1f3b3", "🎴": "1f3b4", "🤥": "1f925", "🎵": "1f3b5", "🎶": "1f3b6", "🎷": "1f3b7", "🤤": "1f924", "🎸": "1f3b8", "🎹": "1f3b9", "🎺": "1f3ba", "🤣": "1f923", "🎻": "1f3bb", "🎼": "1f3bc", "🎽": "1f3bd", "🤢": "1f922", "🎾": "1f3be", "🎿": "1f3bf", "🏀": "1f3c0", "🏁": "1f3c1", "🤡": "1f921", "🏂": "1f3c2", "🏃": "1f3c3", "🏄": "1f3c4", "🏆": "1f3c6", "🏈": "1f3c8", "🏊": "1f3ca", "🏠": "1f3e0", "🏡": "1f3e1", "🏢": "1f3e2", "🏣": "1f3e3", "🏥": "1f3e5", "🏦": "1f3e6", "🏧": "1f3e7", "🏨": "1f3e8", "🏩": "1f3e9", "🏪": "1f3ea", "🏫": "1f3eb", "🏬": "1f3ec", "🤠": "1f920", "🏭": "1f3ed", "🏮": "1f3ee", "🏯": "1f3ef", "🏰": "1f3f0", "🐌": "1f40c", "🐍": "1f40d", "🐎": "1f40e", "🐑": "1f411", "🐒": "1f412", "🐔": "1f414", "🐗": "1f417", "🐘": "1f418", "🐙": "1f419", "🐚": "1f41a", "🐛": "1f41b", "🐜": "1f41c", "🐝": "1f41d", "🐞": "1f41e", "🐟": "1f41f", "🐠": "1f420", "🐡": "1f421", "🐢": "1f422", "🐣": "1f423", "🐤": "1f424", "🐥": "1f425", "🐦": "1f426", "🐧": "1f427", "🐨": "1f428", "🐩": "1f429", "🐫": "1f42b", "🐬": "1f42c", "🐭": "1f42d", "🐮": "1f42e", "🐯": "1f42f", "🐰": "1f430", "🐱": "1f431", "🐲": "1f432", "🐳": "1f433", "🐴": "1f434", "🐵": "1f435", "🐶": "1f436", "🐷": "1f437", "🐸": "1f438", "🐹": "1f439", "🐺": "1f43a", "🐻": "1f43b", "🐼": "1f43c", "🐽": "1f43d", "🐾": "1f43e", "👀": "1f440", "👂": "1f442", "👃": "1f443", "👄": "1f444", "👅": "1f445", "👆": "1f446", "👇": "1f447", "👈": "1f448", "👉": "1f449", "👊": "1f44a", "👋": "1f44b", "👌": "1f44c", "👍": "1f44d", "👎": "1f44e", "👏": "1f44f", "👐": "1f450", "👑": "1f451", "👒": "1f452", "👓": "1f453", "👔": "1f454", "👕": "1f455", "👖": "1f456", "👗": "1f457", "👘": "1f458", "👙": "1f459", "👚": "1f45a", "👛": "1f45b", "👜": "1f45c", "👝": "1f45d", "👞": "1f45e", "👟": "1f45f", "👠": "1f460", "👡": "1f461", "👢": "1f462", "👣": "1f463", "👤": "1f464", "👦": "1f466", "👧": "1f467", "👨": "1f468", "👩": "1f469", "👪": "1f46a", "👫": "1f46b", "👮": "1f46e", "👯": "1f46f", "👰": "1f470", "👱": "1f471", "👲": "1f472", "👳": "1f473", "👴": "1f474", "👵": "1f475", "👶": "1f476", "👷": "1f477", "👸": "1f478", "👹": "1f479", "👺": "1f47a", "👻": "1f47b", "👼": "1f47c", "👽": "1f47d", "👾": "1f47e", "👿": "1f47f", "💀": "1f480", "📇": "1f4c7", "💁": "1f481", "💂": "1f482", "💃": "1f483", "💄": "1f484", "💅": "1f485", "📒": "1f4d2", "💆": "1f486", "📓": "1f4d3", "💇": "1f487", "📔": "1f4d4", "💈": "1f488", "📕": "1f4d5", "💉": "1f489", "📖": "1f4d6", "💊": "1f48a", "📗": "1f4d7", "💋": "1f48b", "📘": "1f4d8", "💌": "1f48c", "📙": "1f4d9", "💍": "1f48d", "📚": "1f4da", "💎": "1f48e", "📛": "1f4db", "💏": "1f48f", "📜": "1f4dc", "💐": "1f490", "📝": "1f4dd", "💑": "1f491", "📞": "1f4de", "💒": "1f492", "📟": "1f4df", "📠": "1f4e0", "💓": "1f493", "📡": "1f4e1", "📢": "1f4e2", "💔": "1f494", "📣": "1f4e3", "📤": "1f4e4", "💕": "1f495", "📥": "1f4e5", "📦": "1f4e6", "💖": "1f496", "📧": "1f4e7", "📨": "1f4e8", "💗": "1f497", "📩": "1f4e9", "📪": "1f4ea", "💘": "1f498", "📫": "1f4eb", "📮": "1f4ee", "💙": "1f499", "📰": "1f4f0", "📱": "1f4f1", "💚": "1f49a", "📲": "1f4f2", "📳": "1f4f3", "💛": "1f49b", "📴": "1f4f4", "📶": "1f4f6", "💜": "1f49c", "📷": "1f4f7", "📹": "1f4f9", "💝": "1f49d", "📺": "1f4fa", "📻": "1f4fb", "💞": "1f49e", "📼": "1f4fc", "🔃": "1f503", "💟": "1f49f", "🔊": "1f50a", "🔋": "1f50b", "💠": "1f4a0", "🔌": "1f50c", "🔍": "1f50d", "💡": "1f4a1", "🔎": "1f50e", "🔏": "1f50f", "💢": "1f4a2", "🔐": "1f510", "🔑": "1f511", "💣": "1f4a3", "🔒": "1f512", "🔓": "1f513", "💤": "1f4a4", "🔔": "1f514", "🔖": "1f516", "💥": "1f4a5", "🔗": "1f517", "🔘": "1f518", "💦": "1f4a6", "🔙": "1f519", "🔚": "1f51a", "💧": "1f4a7", "🔛": "1f51b", "🔜": "1f51c", "💨": "1f4a8", "🔝": "1f51d", "🔞": "1f51e", "💩": "1f4a9", "🔟": "1f51f", "💪": "1f4aa", "🔠": "1f520", "🔡": "1f521", "💫": "1f4ab", "🔢": "1f522", "🔣": "1f523", "💬": "1f4ac", "🔤": "1f524", "🔥": "1f525", "💮": "1f4ae", "🔦": "1f526", "🔧": "1f527", "💯": "1f4af", "🔨": "1f528", "🔩": "1f529", "💰": "1f4b0", "🔪": "1f52a", "🔫": "1f52b", "💱": "1f4b1", "🔮": "1f52e", "💲": "1f4b2", "🔯": "1f52f", "💳": "1f4b3", "🔰": "1f530", "🔱": "1f531", "💴": "1f4b4", "🔲": "1f532", "🔳": "1f533", "💵": "1f4b5", "🔴": "1f534", "🔵": "1f535", "💸": "1f4b8", "🔶": "1f536", "🔷": "1f537", "💹": "1f4b9", "🔸": "1f538", "🔹": "1f539", "💺": "1f4ba", "🔺": "1f53a", "🔻": "1f53b", "💻": "1f4bb", "🔼": "1f53c", "💼": "1f4bc", "🔽": "1f53d", "🕐": "1f550", "💽": "1f4bd", "🕑": "1f551", "💾": "1f4be", "🕒": "1f552", "💿": "1f4bf", "🕓": "1f553", "📀": "1f4c0", "🕔": "1f554", "🕕": "1f555", "📁": "1f4c1", "🕖": "1f556", "🕗": "1f557", "📂": "1f4c2", "🕘": "1f558", "🕙": "1f559", "📃": "1f4c3", "🕚": "1f55a", "🕛": "1f55b", "📄": "1f4c4", "🗻": "1f5fb", "🗼": "1f5fc", "📅": "1f4c5", "🗽": "1f5fd", "🗾": "1f5fe", "📆": "1f4c6", "🗿": "1f5ff", "😁": "1f601", "😂": "1f602", "😃": "1f603", "📈": "1f4c8", "😄": "1f604", "😅": "1f605", "📉": "1f4c9", "😆": "1f606", "😉": "1f609", "📊": "1f4ca", "😊": "1f60a", "😋": "1f60b", "📋": "1f4cb", "😌": "1f60c", "😍": "1f60d", "📌": "1f4cc", "😏": "1f60f", "😒": "1f612", "📍": "1f4cd", "😓": "1f613", "😔": "1f614", "📎": "1f4ce", "😖": "1f616", "😘": "1f618", "📏": "1f4cf", "😚": "1f61a", "😜": "1f61c", "📐": "1f4d0", "😝": "1f61d", "😞": "1f61e", "📑": "1f4d1", "😠": "1f620", "😡": "1f621", "😢": "1f622", "😣": "1f623", "😤": "1f624", "😥": "1f625", "😨": "1f628", "😩": "1f629", "😪": "1f62a", "😫": "1f62b", "😭": "1f62d", "😰": "1f630", "😱": "1f631", "😲": "1f632", "😳": "1f633", "😵": "1f635", "😷": "1f637", "😸": "1f638", "😹": "1f639", "😺": "1f63a", "😻": "1f63b", "😼": "1f63c", "😽": "1f63d", "😾": "1f63e", "😿": "1f63f", "🙀": "1f640", "🙅": "1f645", "🙆": "1f646", "🙇": "1f647", "🙈": "1f648", "🙉": "1f649", "🙊": "1f64a", "🙋": "1f64b", "🙌": "1f64c", "🙍": "1f64d", "🙎": "1f64e", "🙏": "1f64f", "🚀": "1f680", "🚃": "1f683", "🚄": "1f684", "🚅": "1f685", "🚇": "1f687", "🚉": "1f689", "🚌": "1f68c", "🚏": "1f68f", "🚑": "1f691", "🚒": "1f692", "🚓": "1f693", "🚕": "1f695", "🚗": "1f697", "🚙": "1f699", "🚚": "1f69a", "🚢": "1f6a2", "🚤": "1f6a4", "🚥": "1f6a5", "🚧": "1f6a7", "🚨": "1f6a8", "🚩": "1f6a9", "🚪": "1f6aa", "🚫": "1f6ab", "🚬": "1f6ac", "🚭": "1f6ad", "🚲": "1f6b2", "🚶": "1f6b6", "🚹": "1f6b9", "🚺": "1f6ba", "🚻": "1f6bb", "🚼": "1f6bc", "🚽": "1f6bd", "🚾": "1f6be", "🛀": "1f6c0", "🤘": "1f918", "😀": "1f600", "😇": "1f607", "😈": "1f608", "😎": "1f60e", "😐": "1f610", "😑": "1f611", "😕": "1f615", "😗": "1f617", "😙": "1f619", "😛": "1f61b", "😟": "1f61f", "😦": "1f626", "😧": "1f627", "😬": "1f62c", "😮": "1f62e", "😯": "1f62f", "😴": "1f634", "😶": "1f636", "🚁": "1f681", "🚂": "1f682",
    "🚆": "1f686", "🚈": "1f688", "🚊": "1f68a", "🚍": "1f68d", "🚎": "1f68e", "🚐": "1f690", "🚔": "1f694", "🚖": "1f696", "🚘": "1f698", "🚛": "1f69b", "🚜": "1f69c", "🚝": "1f69d", "🚞": "1f69e", "🚟": "1f69f", "🚠": "1f6a0", "🚡": "1f6a1", "🚣": "1f6a3", "🚦": "1f6a6", "🚮": "1f6ae", "🚯": "1f6af", "🚰": "1f6b0", "🚱": "1f6b1", "🚳": "1f6b3", "🚴": "1f6b4", "🚵": "1f6b5", "🚷": "1f6b7", "🚸": "1f6b8", "🚿": "1f6bf", "🛁": "1f6c1", "🛂": "1f6c2", "🛃": "1f6c3", "🛄": "1f6c4", "🛅": "1f6c5", "🌍": "1f30d", "🌎": "1f30e", "🌐": "1f310", "🌒": "1f312", "🌖": "1f316", "🌗": "1f317", "🌘": "1f318", "🌚": "1f31a", "🌜": "1f31c", "🌝": "1f31d", "🌞": "1f31e", "🌲": "1f332", "🌳": "1f333", "🍋": "1f34b", "🍐": "1f350", "🍼": "1f37c", "🏇": "1f3c7", "🏉": "1f3c9", "🏤": "1f3e4", "🐀": "1f400", "🐁": "1f401", "🐂": "1f402", "🐃": "1f403", "🐄": "1f404", "🐅": "1f405", "🐆": "1f406", "🐇": "1f407", "🐈": "1f408", "🐉": "1f409", "🐊": "1f40a", "🐋": "1f40b", "🐏": "1f40f", "🐐": "1f410", "🐓": "1f413", "🐕": "1f415", "🐖": "1f416", "🐪": "1f42a", "👥": "1f465", "👬": "1f46c", "👭": "1f46d", "💭": "1f4ad", "💶": "1f4b6", "💷": "1f4b7", "📬": "1f4ec", "📭": "1f4ed", "📯": "1f4ef", "📵": "1f4f5", "🔀": "1f500", "🔁": "1f501", "🔂": "1f502", "🔄": "1f504", "🔅": "1f505", "🔆": "1f506", "🔇": "1f507", "🔉": "1f509", "🔕": "1f515", "🔬": "1f52c", "🔭": "1f52d", "🕜": "1f55c", "🕝": "1f55d", "🕞": "1f55e", "🕟": "1f55f", "🕠": "1f560", "🕡": "1f561", "🕢": "1f562", "🕣": "1f563", "🕤": "1f564", "🕥": "1f565", "🕦": "1f566", "🕧": "1f567", "🔈": "1f508", "🚋": "1f68b", "🏅": "1f3c5", "🏴": "1f3f4", "📸": "1f4f8", "🛌": "1f6cc", "🖕": "1f595", "🖖": "1f596", "🙁": "1f641", "🙂": "1f642", "🛫": "1f6eb", "🛬": "1f6ec", "🏻": "1f3fb", "🏼": "1f3fc", "🏽": "1f3fd", "🏾": "1f3fe", "🏿": "1f3ff", "🙃": "1f643", "🤑": "1f911", "🤓": "1f913", "🤗": "1f917", "🙄": "1f644", "🤔": "1f914", "🤐": "1f910", "🤒": "1f912", "🤕": "1f915", "🤖": "1f916", "🦁": "1f981", "🦄": "1f984", "🦂": "1f982", "🦀": "1f980", "🦃": "1f983", "🧀": "1f9c0", "🌭": "1f32d", "🌮": "1f32e", "🌯": "1f32f", "🍿": "1f37f", "🍾": "1f37e", "🏹": "1f3f9", "🏺": "1f3fa", "🛐": "1f6d0", "🕋": "1f54b", "🕌": "1f54c", "🕍": "1f54d", "🕎": "1f54e", "📿": "1f4ff", "🏏": "1f3cf", "🏐": "1f3d0", "🏑": "1f3d1", "🏒": "1f3d2", "🏓": "1f3d3", "🏸": "1f3f8", "🥁": "1f941", "🦐": "1f990", "🦑": "1f991", "🥚": "1f95a", "🥛": "1f95b", "🥜": "1f95c", "🥝": "1f95d", "🥞": "1f95e", "🇼": "1f1fc", "🇻": "1f1fb", "🇺": "1f1fa", "🇹": "1f1f9", "🇸": "1f1f8", "🇷": "1f1f7", "🇶": "1f1f6", "🇵": "1f1f5", "🇴": "1f1f4", "🇳": "1f1f3", "🇲": "1f1f2", "🇱": "1f1f1", "🇰": "1f1f0", "🇯": "1f1ef", "🇮": "1f1ee", "🇭": "1f1ed", "🇬": "1f1ec", "🇫": "1f1eb", "🇪": "1f1ea", "🇩": "1f1e9", "🇨": "1f1e8", "🇧": "1f1e7", "🇦": "1f1e6", "⏩": "23e9", "⏪": "23ea", "⏫": "23eb", "⏬": "23ec", "⏰": "23f0", "⏳": "23f3", "⛎": "26ce", "✅": "2705", "✊": "270a", "✋": "270b", "✨": "2728", "❌": "274c", "❎": "274e", "❓": "2753", "❔": "2754", "❕": "2755", "➕": "2795", "➖": "2796", "➗": "2797", "➰": "27b0", "➿": "27bf" }, _defineProperty(_a$jsEscapeMap, "\xA9", "00a9"), _defineProperty(_a$jsEscapeMap, "\xAE", "00ae"), _defineProperty(_a$jsEscapeMap, "\u203C", "203c"), _defineProperty(_a$jsEscapeMap, "\u2049", "2049"), _defineProperty(_a$jsEscapeMap, "\u2122", "2122"), _defineProperty(_a$jsEscapeMap, "\u2139", "2139"), _defineProperty(_a$jsEscapeMap, "\u2194", "2194"), _defineProperty(_a$jsEscapeMap, "\u2195", "2195"), _defineProperty(_a$jsEscapeMap, "\u2196", "2196"), _defineProperty(_a$jsEscapeMap, "\u2197", "2197"), _defineProperty(_a$jsEscapeMap, "\u2198", "2198"), _defineProperty(_a$jsEscapeMap, "\u2199", "2199"), _defineProperty(_a$jsEscapeMap, "\u21A9", "21a9"), _defineProperty(_a$jsEscapeMap, "\u21AA", "21aa"), _defineProperty(_a$jsEscapeMap, "\u231A", "231a"), _defineProperty(_a$jsEscapeMap, "\u231B", "231b"), _defineProperty(_a$jsEscapeMap, "\u24C2", "24c2"), _defineProperty(_a$jsEscapeMap, "\u25AA", "25aa"), _defineProperty(_a$jsEscapeMap, "\u25AB", "25ab"), _defineProperty(_a$jsEscapeMap, "\u25B6", "25b6"), _defineProperty(_a$jsEscapeMap, "\u25C0", "25c0"), _defineProperty(_a$jsEscapeMap, "\u25FB", "25fb"), _defineProperty(_a$jsEscapeMap, "\u25FC", "25fc"), _defineProperty(_a$jsEscapeMap, "\u25FD", "25fd"), _defineProperty(_a$jsEscapeMap, "\u25FE", "25fe"), _defineProperty(_a$jsEscapeMap, "\u2600", "2600"), _defineProperty(_a$jsEscapeMap, "\u2601", "2601"), _defineProperty(_a$jsEscapeMap, "\u260E", "260e"), _defineProperty(_a$jsEscapeMap, "\u2611", "2611"), _defineProperty(_a$jsEscapeMap, "\u2614", "2614"), _defineProperty(_a$jsEscapeMap, "\u2615", "2615"), _defineProperty(_a$jsEscapeMap, "\u261D", "261d"), _defineProperty(_a$jsEscapeMap, "\u263A", "263a"), _defineProperty(_a$jsEscapeMap, "\u2648", "2648"), _defineProperty(_a$jsEscapeMap, "\u2649", "2649"), _defineProperty(_a$jsEscapeMap, "\u264A", "264a"), _defineProperty(_a$jsEscapeMap, "\u264B", "264b"), _defineProperty(_a$jsEscapeMap, "\u264C", "264c"), _defineProperty(_a$jsEscapeMap, "\u264D", "264d"), _defineProperty(_a$jsEscapeMap, "\u264E", "264e"), _defineProperty(_a$jsEscapeMap, "\u264F", "264f"), _defineProperty(_a$jsEscapeMap, "\u2650", "2650"), _defineProperty(_a$jsEscapeMap, "\u2651", "2651"), _defineProperty(_a$jsEscapeMap, "\u2652", "2652"), _defineProperty(_a$jsEscapeMap, "\u2653", "2653"), _defineProperty(_a$jsEscapeMap, "\u2660", "2660"), _defineProperty(_a$jsEscapeMap, "\u2663", "2663"), _defineProperty(_a$jsEscapeMap, "\u2665", "2665"), _defineProperty(_a$jsEscapeMap, "\u2666", "2666"), _defineProperty(_a$jsEscapeMap, "\u2668", "2668"), _defineProperty(_a$jsEscapeMap, "\u267B", "267b"), _defineProperty(_a$jsEscapeMap, "\u267F", "267f"), _defineProperty(_a$jsEscapeMap, "\u2693", "2693"), _defineProperty(_a$jsEscapeMap, "\u26A0", "26a0"), _defineProperty(_a$jsEscapeMap, "\u26A1", "26a1"), _defineProperty(_a$jsEscapeMap, "\u26AA", "26aa"), _defineProperty(_a$jsEscapeMap, "\u26AB", "26ab"), _defineProperty(_a$jsEscapeMap, "\u26BD", "26bd"), _defineProperty(_a$jsEscapeMap, "\u26BE", "26be"), _defineProperty(_a$jsEscapeMap, "\u26C4", "26c4"), _defineProperty(_a$jsEscapeMap, "\u26C5", "26c5"), _defineProperty(_a$jsEscapeMap, "\u26D4", "26d4"), _defineProperty(_a$jsEscapeMap, "\u26EA", "26ea"), _defineProperty(_a$jsEscapeMap, "\u26F2", "26f2"), _defineProperty(_a$jsEscapeMap, "\u26F3", "26f3"), _defineProperty(_a$jsEscapeMap, "\u26F5", "26f5"), _defineProperty(_a$jsEscapeMap, "\u26FA", "26fa"), _defineProperty(_a$jsEscapeMap, "\u26FD", "26fd"), _defineProperty(_a$jsEscapeMap, "\u2702", "2702"), _defineProperty(_a$jsEscapeMap, "\u2708", "2708"), _defineProperty(_a$jsEscapeMap, "\u2709", "2709"), _defineProperty(_a$jsEscapeMap, "\u270C", "270c"), _defineProperty(_a$jsEscapeMap, "\u270F", "270f"), _defineProperty(_a$jsEscapeMap, "\u2712", "2712"), _defineProperty(_a$jsEscapeMap, "\u2714", "2714"), _defineProperty(_a$jsEscapeMap, "\u2716", "2716"), _defineProperty(_a$jsEscapeMap, "\u2733", "2733"), _defineProperty(_a$jsEscapeMap, "\u2734", "2734"), _defineProperty(_a$jsEscapeMap, "\u2744", "2744"), _defineProperty(_a$jsEscapeMap, "\u2747", "2747"), _defineProperty(_a$jsEscapeMap, "\u2757", "2757"), _defineProperty(_a$jsEscapeMap, "\u2764", "2764"), _defineProperty(_a$jsEscapeMap, "\u27A1", "27a1"), _defineProperty(_a$jsEscapeMap, "\u2934", "2934"), _defineProperty(_a$jsEscapeMap, "\u2935", "2935"), _defineProperty(_a$jsEscapeMap, "\u2B05", "2b05"), _defineProperty(_a$jsEscapeMap, "\u2B06", "2b06"), _defineProperty(_a$jsEscapeMap, "\u2B07", "2b07"), _defineProperty(_a$jsEscapeMap, "\u2B1B", "2b1b"), _defineProperty(_a$jsEscapeMap, "\u2B1C", "2b1c"), _defineProperty(_a$jsEscapeMap, "\u2B50", "2b50"), _defineProperty(_a$jsEscapeMap, "\u2B55", "2b55"), _defineProperty(_a$jsEscapeMap, "\u3030", "3030"), _defineProperty(_a$jsEscapeMap, "\u303D", "303d"), _defineProperty(_a$jsEscapeMap, "\u3297", "3297"), _defineProperty(_a$jsEscapeMap, "\u3299", "3299"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDC04", "1f004"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDD7F", "1f17f"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDE02", "1f202"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDE1A", "1f21a"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDE2F", "1f22f"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDE37", "1f237"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF9E", "1f39e"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF9F", "1f39f"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFCB", "1f3cb"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFCC", "1f3cc"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFCD", "1f3cd"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFCE", "1f3ce"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF96", "1f396"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF97", "1f397"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF36", "1f336"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF27", "1f327"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF28", "1f328"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF29", "1f329"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF2A", "1f32a"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF2B", "1f32b"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF2C", "1f32c"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDC3F", "1f43f"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD77", "1f577"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD78", "1f578"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF21", "1f321"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF99", "1f399"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF9A", "1f39a"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF9B", "1f39b"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFF3", "1f3f3"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFF5", "1f3f5"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFF7", "1f3f7"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDCFD", "1f4fd"), _defineProperty(_a$jsEscapeMap, "\u271D", "271d"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD49", "1f549"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD4A", "1f54a"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD6F", "1f56f"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD70", "1f570"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD73", "1f573"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD76", "1f576"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD79", "1f579"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD87", "1f587"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD8A", "1f58a"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD8B", "1f58b"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD8C", "1f58c"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD8D", "1f58d"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDA5", "1f5a5"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDA8", "1f5a8"), _defineProperty(_a$jsEscapeMap, "\u2328", "2328"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDB2", "1f5b2"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDBC", "1f5bc"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDC2", "1f5c2"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDC3", "1f5c3"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDC4", "1f5c4"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDD1", "1f5d1"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDD2", "1f5d2"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDD3", "1f5d3"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDDC", "1f5dc"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDDD", "1f5dd"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDDE", "1f5de"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDE1", "1f5e1"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDE3", "1f5e3"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDE8", "1f5e8"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDEF", "1f5ef"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDF3", "1f5f3"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDFA", "1f5fa"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEE0", "1f6e0"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEE1", "1f6e1"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEE2", "1f6e2"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEF0", "1f6f0"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF7D", "1f37d"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDC41", "1f441"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD74", "1f574"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD75", "1f575"), _defineProperty(_a$jsEscapeMap, "\u270D", "270d"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDD90", "1f590"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFD4", "1f3d4"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFD5", "1f3d5"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFD6", "1f3d6"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFD7", "1f3d7"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFD8", "1f3d8"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFD9", "1f3d9"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFDA", "1f3da"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFDB", "1f3db"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFDC", "1f3dc"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFDD", "1f3dd"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFDE", "1f3de"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDFDF", "1f3df"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDECB", "1f6cb"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDECD", "1f6cd"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDECE", "1f6ce"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDECF", "1f6cf"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEE3", "1f6e3"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEE4", "1f6e4"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEE5", "1f6e5"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEE9", "1f6e9"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDEF3", "1f6f3"), _defineProperty(_a$jsEscapeMap, "\u23CF", "23cf"), _defineProperty(_a$jsEscapeMap, "\u23ED", "23ed"), _defineProperty(_a$jsEscapeMap, "\u23EE", "23ee"), _defineProperty(_a$jsEscapeMap, "\u23EF", "23ef"), _defineProperty(_a$jsEscapeMap, "\u23F1", "23f1"), _defineProperty(_a$jsEscapeMap, "\u23F2", "23f2"), _defineProperty(_a$jsEscapeMap, "\u23F8", "23f8"), _defineProperty(_a$jsEscapeMap, "\u23F9", "23f9"), _defineProperty(_a$jsEscapeMap, "\u23FA", "23fa"), _defineProperty(_a$jsEscapeMap, "\u2602", "2602"), _defineProperty(_a$jsEscapeMap, "\u2603", "2603"), _defineProperty(_a$jsEscapeMap, "\u2604", "2604"), _defineProperty(_a$jsEscapeMap, "\u2618", "2618"), _defineProperty(_a$jsEscapeMap, "\u2620", "2620"), _defineProperty(_a$jsEscapeMap, "\u2622", "2622"), _defineProperty(_a$jsEscapeMap, "\u2623", "2623"), _defineProperty(_a$jsEscapeMap, "\u2626", "2626"), _defineProperty(_a$jsEscapeMap, "\u262A", "262a"), _defineProperty(_a$jsEscapeMap, "\u262E", "262e"), _defineProperty(_a$jsEscapeMap, "\u262F", "262f"), _defineProperty(_a$jsEscapeMap, "\u2638", "2638"), _defineProperty(_a$jsEscapeMap, "\u2639", "2639"), _defineProperty(_a$jsEscapeMap, "\u2692", "2692"), _defineProperty(_a$jsEscapeMap, "\u2694", "2694"), _defineProperty(_a$jsEscapeMap, "\u2696", "2696"), _defineProperty(_a$jsEscapeMap, "\u2697", "2697"), _defineProperty(_a$jsEscapeMap, "\u2699", "2699"), _defineProperty(_a$jsEscapeMap, "\u269B", "269b"), _defineProperty(_a$jsEscapeMap, "\u269C", "269c"), _defineProperty(_a$jsEscapeMap, "\u26B0", "26b0"), _defineProperty(_a$jsEscapeMap, "\u26B1", "26b1"), _defineProperty(_a$jsEscapeMap, "\u26C8", "26c8"), _defineProperty(_a$jsEscapeMap, "\u26CF", "26cf"), _defineProperty(_a$jsEscapeMap, "\u26D1", "26d1"), _defineProperty(_a$jsEscapeMap, "\u26D3", "26d3"), _defineProperty(_a$jsEscapeMap, "\u26E9", "26e9"), _defineProperty(_a$jsEscapeMap, "\u26F0", "26f0"), _defineProperty(_a$jsEscapeMap, "\u26F1", "26f1"), _defineProperty(_a$jsEscapeMap, "\u26F4", "26f4"), _defineProperty(_a$jsEscapeMap, "\u26F7", "26f7"), _defineProperty(_a$jsEscapeMap, "\u26F8", "26f8"), _defineProperty(_a$jsEscapeMap, "\u26F9", "26f9"), _defineProperty(_a$jsEscapeMap, "\u2721", "2721"), _defineProperty(_a$jsEscapeMap, "\u2763", "2763"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF24", "1f324"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF25", "1f325"), _defineProperty(_a$jsEscapeMap, "\uD83C\uDF26", "1f326"), _defineProperty(_a$jsEscapeMap, "\uD83D\uDDB1", "1f5b1"), _a$jsEscapeMap), a.imagePathPNG = "https://cdn.jsdelivr.net/emojione/assets/png/", a.imagePathSVG = "https://cdn.jsdelivr.net/emojione/assets/svg/", a.imagePathSVGSprites = "./../assets/sprites/emojione.sprites.svg", a.imageType = "png", a.imageTitleTag = !0, a.sprites = !1, a.unicodeAlt = !0, a.ascii = !1, a.cacheBustParam = "?v=2.2.7", a.regShortNames = new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + a.shortnames + ")", "gi"), a.regAscii = new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|((\\s|^)" + a.asciiRegexp + "(?=\\s|$|[!,.?]))", "g"), a.regUnicode = new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + a.unicodeRegexp + ")", "gi"), a.toImage = function (b) {
    return b = a.unicodeToImage(b), b = a.shortnameToImage(b);
  }, a.unifyUnicode = function (b) {
    return b = a.toShort(b), b = a.shortnameToUnicode(b);
  }, a.shortnameToAscii = function (b) {
    var c,
        d = a.objectFlip(a.asciiList);return b = b.replace(a.regShortNames, function (b) {
      return "undefined" != typeof b && "" !== b && b in a.emojioneList ? (c = a.emojioneList[b].unicode[a.emojioneList[b].unicode.length - 1], "undefined" != typeof d[c] ? d[c] : b) : b;
    });
  }, a.shortnameToUnicode = function (b) {
    var c, d, e;return b = b.replace(a.regShortNames, function (b) {
      return "undefined" != typeof b && "" !== b && b in a.emojioneList ? (c = a.emojioneList[b].unicode[0].toUpperCase(), d = a.emojioneList[b].fname, e = a.emojioneList[b].uc, a.convert(e)) : b;
    }), a.ascii && (b = b.replace(a.regAscii, function (b, d, e, f) {
      return "undefined" != typeof f && "" !== f && a.unescapeHTML(f) in a.asciiList ? (f = a.unescapeHTML(f), c = a.asciiList[f].toUpperCase(), e + a.convert(c)) : b;
    })), b;
  }, a.shortnameToImage = function (b) {
    var c, d, e, f;return b = b.replace(a.regShortNames, function (b) {
      return "undefined" != typeof b && "" !== b && b in a.emojioneList ? (d = a.emojioneList[b].unicode[a.emojioneList[b].unicode.length - 1], f = a.imageTitleTag ? 'title="' + b + '"' : "", e = a.unicodeAlt ? a.convert(d.toUpperCase()) : b, c = "png" === a.imageType ? a.sprites ? '<span class="emojione emojione-' + d + '" ' + f + ">" + e + "</span>" : '<img class="emojione" alt="' + e + '" ' + f + ' src="' + a.imagePathPNG + d + ".png" + a.cacheBustParam + '"/>' : a.sprites ? '<svg class="emojione"><description>' + e + '</description><use xlink:href="' + a.imagePathSVGSprites + "#emoji-" + d + '"></use></svg>' : '<object class="emojione" data="' + a.imagePathSVG + d + ".svg" + a.cacheBustParam + '" type="image/svg+xml" standby="' + e + '">' + e + "</object>") : b;
    }), a.ascii && (b = b.replace(a.regAscii, function (b, g, h, i) {
      return "undefined" != typeof i && "" !== i && a.unescapeHTML(i) in a.asciiList ? (i = a.unescapeHTML(i), d = a.asciiList[i], f = a.imageTitleTag ? 'title="' + a.escapeHTML(i) + '"' : "", e = a.unicodeAlt ? a.convert(d.toUpperCase()) : a.escapeHTML(i), c = "png" === a.imageType ? a.sprites ? h + '<span class="emojione emojione-' + d + '"  ' + f + ">" + e + "</span>" : h + '<img class="emojione" alt="' + e + '" ' + f + ' src="' + a.imagePathPNG + d + ".png" + a.cacheBustParam + '"/>' : a.sprites ? '<svg class="emojione"><description>' + e + '</description><use xlink:href="' + a.imagePathSVGSprites + "#emoji-" + d + '"></use></svg>' : h + '<object class="emojione" data="' + a.imagePathSVG + d + ".svg" + a.cacheBustParam + '" type="image/svg+xml" standby="' + e + '">' + e + "</object>") : b;
    })), b;
  }, a.unicodeToImage = function (b) {
    var c,
        d,
        e,
        f,
        g,
        h,
        i = a.mapUnicodeToShort();return b = b.replace(a.regUnicode, function (b) {
      return "undefined" != typeof b && "" !== b && b in a.jsEscapeMap ? (d = a.jsEscapeMap[b], e = i[d], f = a.emojioneList[e].fname, g = a.unicodeAlt ? a.convert(d.toUpperCase()) : e, h = a.imageTitleTag ? 'title="' + e + '"' : "", c = "png" === a.imageType ? a.sprites ? '<span class="emojione emojione-' + d + '" ' + h + ">" + g + "</span>" : '<img class="emojione" alt="' + g + '" ' + h + ' src="' + a.imagePathPNG + f + ".png" + a.cacheBustParam + '"/>' : a.sprites ? '<svg class="emojione"><description>' + g + '</description><use xlink:href="' + a.imagePathSVGSprites + "#emoji-" + d + '"></use></svg>' : '<img class="emojione" alt="' + g + '" ' + h + ' src="' + a.imagePathSVG + f + ".svg" + a.cacheBustParam + '"/>') : b;
    });
  }, a.toShort = function (b) {
    var c = a.getUnicodeReplacementRegEx(),
        d = a.mapUnicodeCharactersToShort();return a.replaceAll(b, c, d);
  }, a.convert = function (a) {
    if (a.indexOf("-") > -1) {
      for (var b = [], c = a.split("-"), d = 0; d < c.length; d++) {
        var e = parseInt(c[d], 16);if (e >= 65536 && 1114111 >= e) {
          var f = Math.floor((e - 65536) / 1024) + 55296,
              g = (e - 65536) % 1024 + 56320;e = String.fromCharCode(f) + String.fromCharCode(g);
        } else e = String.fromCharCode(e);b.push(e);
      }return b.join("");
    }var c = parseInt(a, 16);if (c >= 65536 && 1114111 >= c) {
      var f = Math.floor((c - 65536) / 1024) + 55296,
          g = (c - 65536) % 1024 + 56320;return String.fromCharCode(f) + String.fromCharCode(g);
    }return String.fromCharCode(c);
  }, a.escapeHTML = function (a) {
    var b = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };return a.replace(/[&<>"']/g, function (a) {
      return b[a];
    });
  }, a.unescapeHTML = function (a) {
    var b = { "&amp;": "&", "&#38;": "&", "&#x26;": "&", "&lt;": "<", "&#60;": "<", "&#x3C;": "<", "&gt;": ">", "&#62;": ">", "&#x3E;": ">", "&quot;": '"', "&#34;": '"', "&#x22;": '"', "&apos;": "'", "&#39;": "'", "&#x27;": "'" };return a.replace(/&(?:amp|#38|#x26|lt|#60|#x3C|gt|#62|#x3E|apos|#39|#x27|quot|#34|#x22);/gi, function (a) {
      return b[a];
    });
  }, a.mapEmojioneList = function (b) {
    for (var c in a.emojioneList) {
      if (a.emojioneList.hasOwnProperty(c)) for (var d = 0, e = a.emojioneList[c].unicode.length; e > d; d++) {
        var f = a.emojioneList[c].unicode[d];b(f, c);
      }
    }
  }, a.mapUnicodeToShort = function () {
    return a.memMapShortToUnicode || (a.memMapShortToUnicode = {}, a.mapEmojioneList(function (b, c) {
      a.memMapShortToUnicode[b] = c;
    })), a.memMapShortToUnicode;
  }, a.memoizeReplacement = function () {
    if (!a.unicodeReplacementRegEx || !a.memMapShortToUnicodeCharacters) {
      var b = [];a.memMapShortToUnicodeCharacters = {}, a.mapEmojioneList(function (c, d) {
        var e = a.convert(c);a.emojioneList[d].isCanonical && (a.memMapShortToUnicodeCharacters[e] = d), b.push(e);
      }), a.unicodeReplacementRegEx = b.join("|");
    }
  }, a.mapUnicodeCharactersToShort = function () {
    return a.memoizeReplacement(), a.memMapShortToUnicodeCharacters;
  }, a.getUnicodeReplacementRegEx = function () {
    return a.memoizeReplacement(), a.unicodeReplacementRegEx;
  }, a.objectFlip = function (a) {
    var b,
        c = {};for (b in a) {
      a.hasOwnProperty(b) && (c[a[b]] = b);
    }return c;
  }, a.escapeRegExp = function (a) {
    return a.replace(/[-[\]{}()*+?.,;:&\\^$#\s]/g, "\\$&");
  }, a.replaceAll = function (b, c, d) {
    var e = a.escapeRegExp(c),
        f = new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + e + ")", "gi"),
        g = function g(a, b) {
      return "undefined" == typeof b || "" === b ? a : d[b];
    };return b.replace(f, g);
  };
}(this.emojione = this.emojione || {}), "object" == ( false ? "undefined" : _typeof(module)) && (module.exports = this.emojione);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)(module)))

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * # Semantic UI 2.2.3 - Form Validation
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

  "use strict";

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.form = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        legacyParameters = arguments[1],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var $module = $(this),
          element = this,
          formErrors = [],
          keyHeldDown = false,


      // set at run-time
      $field,
          $group,
          $message,
          $prompt,
          $submit,
          $clear,
          $reset,
          _settings,
          _validation,
          metadata,
          selector,
          className,
          error,
          namespace,
          moduleNamespace,
          eventNamespace,
          instance,
          module;

      module = {

        initialize: function initialize() {

          // settings grabbed at run time
          module.get.settings();
          if (methodInvoked) {
            if (instance === undefined) {
              module.instantiate();
            }
            module.invoke(query);
          } else {
            if (instance !== undefined) {
              instance.invoke('destroy');
            }
            module.verbose('Initializing form validation', $module, _settings);
            module.bindEvents();
            module.set.defaults();
            module.instantiate();
          }
        },

        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },

        destroy: function destroy() {
          module.verbose('Destroying previous module', instance);
          module.removeEvents();
          $module.removeData(moduleNamespace);
        },

        refresh: function refresh() {
          module.verbose('Refreshing selector cache');
          $field = $module.find(selector.field);
          $group = $module.find(selector.group);
          $message = $module.find(selector.message);
          $prompt = $module.find(selector.prompt);

          $submit = $module.find(selector.submit);
          $clear = $module.find(selector.clear);
          $reset = $module.find(selector.reset);
        },

        submit: function submit() {
          module.verbose('Submitting form', $module);
          $module.submit();
        },

        attachEvents: function attachEvents(selector, action) {
          action = action || 'submit';
          $(selector).on('click' + eventNamespace, function (event) {
            module[action]();
            event.preventDefault();
          });
        },

        bindEvents: function bindEvents() {
          module.verbose('Attaching form events');
          $module.on('submit' + eventNamespace, module.validate.form).on('blur' + eventNamespace, selector.field, module.event.field.blur).on('click' + eventNamespace, selector.submit, module.submit).on('click' + eventNamespace, selector.reset, module.reset).on('click' + eventNamespace, selector.clear, module.clear);
          if (_settings.keyboardShortcuts) {
            $module.on('keydown' + eventNamespace, selector.field, module.event.field.keydown);
          }
          $field.each(function () {
            var $input = $(this),
                type = $input.prop('type'),
                inputEvent = module.get.changeEvent(type, $input);
            $(this).on(inputEvent + eventNamespace, module.event.field.change);
          });
        },

        clear: function clear() {
          $field.each(function () {
            var $field = $(this),
                $element = $field.parent(),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.find(selector.prompt),
                defaultValue = $field.data(metadata.defaultValue) || '',
                isCheckbox = $element.is(selector.uiCheckbox),
                isDropdown = $element.is(selector.uiDropdown),
                isErrored = $fieldGroup.hasClass(className.error);
            if (isErrored) {
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);
              $prompt.remove();
            }
            if (isDropdown) {
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('clear');
            } else if (isCheckbox) {
              $field.prop('checked', false);
            } else {
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val('');
            }
          });
        },

        reset: function reset() {
          $field.each(function () {
            var $field = $(this),
                $element = $field.parent(),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.find(selector.prompt),
                defaultValue = $field.data(metadata.defaultValue),
                isCheckbox = $element.is(selector.uiCheckbox),
                isDropdown = $element.is(selector.uiDropdown),
                isErrored = $fieldGroup.hasClass(className.error);
            if (defaultValue === undefined) {
              return;
            }
            if (isErrored) {
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);
              $prompt.remove();
            }
            if (isDropdown) {
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('restore defaults');
            } else if (isCheckbox) {
              module.verbose('Resetting checkbox value', $element, defaultValue);
              $field.prop('checked', defaultValue);
            } else {
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val(defaultValue);
            }
          });
        },

        is: {
          bracketedRule: function bracketedRule(rule) {
            return rule.type && rule.type.match(_settings.regExp.bracket);
          },
          empty: function empty($field) {
            if (!$field || $field.length === 0) {
              return true;
            } else if ($field.is('input[type="checkbox"]')) {
              return !$field.is(':checked');
            } else {
              return module.is.blank($field);
            }
          },
          blank: function blank($field) {
            return $.trim($field.val()) === '';
          },
          valid: function valid() {
            var allValid = true;
            module.verbose('Checking if form is valid');
            $.each(_validation, function (fieldName, field) {
              if (!module.validate.field(field, fieldName)) {
                allValid = false;
              }
            });
            return allValid;
          }
        },

        removeEvents: function removeEvents() {
          $module.off(eventNamespace);
          $field.off(eventNamespace);
          $submit.off(eventNamespace);
          $field.off(eventNamespace);
        },

        event: {
          field: {
            keydown: function keydown(event) {
              var $field = $(this),
                  key = event.which,
                  isInput = $field.is(selector.input),
                  isCheckbox = $field.is(selector.checkbox),
                  isInDropdown = $field.closest(selector.uiDropdown).length > 0,
                  keyCode = {
                enter: 13,
                escape: 27
              };
              if (key == keyCode.escape) {
                module.verbose('Escape key pressed blurring field');
                $field.blur();
              }
              if (!event.ctrlKey && key == keyCode.enter && isInput && !isInDropdown && !isCheckbox) {
                if (!keyHeldDown) {
                  $field.one('keyup' + eventNamespace, module.event.field.keyup);
                  module.submit();
                  module.debug('Enter pressed on input submitting form');
                }
                keyHeldDown = true;
              }
            },
            keyup: function keyup() {
              keyHeldDown = false;
            },
            blur: function blur(event) {
              var $field = $(this),
                  $fieldGroup = $field.closest($group),
                  validationRules = module.get.validation($field);
              if ($fieldGroup.hasClass(className.error)) {
                module.debug('Revalidating field', $field, validationRules);
                if (validationRules) {
                  module.validate.field(validationRules);
                }
              } else if (_settings.on == 'blur' || _settings.on == 'change') {
                if (validationRules) {
                  module.validate.field(validationRules);
                }
              }
            },
            change: function change(event) {
              var $field = $(this),
                  $fieldGroup = $field.closest($group),
                  validationRules = module.get.validation($field);
              if (_settings.on == 'change' || $fieldGroup.hasClass(className.error) && _settings.revalidate) {
                clearTimeout(module.timer);
                module.timer = setTimeout(function () {
                  module.debug('Revalidating field', $field, module.get.validation($field));
                  module.validate.field(validationRules);
                }, _settings.delay);
              }
            }
          }

        },

        get: {
          ancillaryValue: function ancillaryValue(rule) {
            if (!rule.type || !rule.value && !module.is.bracketedRule(rule)) {
              return false;
            }
            return rule.value !== undefined ? rule.value : rule.type.match(_settings.regExp.bracket)[1] + '';
          },
          ruleName: function ruleName(rule) {
            if (module.is.bracketedRule(rule)) {
              return rule.type.replace(rule.type.match(_settings.regExp.bracket)[0], '');
            }
            return rule.type;
          },
          changeEvent: function changeEvent(type, $input) {
            if (type == 'checkbox' || type == 'radio' || type == 'hidden' || $input.is('select')) {
              return 'change';
            } else {
              return module.get.inputEvent();
            }
          },
          inputEvent: function inputEvent() {
            return document.createElement('input').oninput !== undefined ? 'input' : document.createElement('input').onpropertychange !== undefined ? 'propertychange' : 'keyup';
          },
          prompt: function prompt(rule, field) {
            var ruleName = module.get.ruleName(rule),
                ancillary = module.get.ancillaryValue(rule),
                prompt = rule.prompt || _settings.prompt[ruleName] || _settings.text.unspecifiedRule,
                requiresValue = prompt.search('{value}') !== -1,
                requiresName = prompt.search('{name}') !== -1,
                $label,
                $field,
                name;
            if (requiresName || requiresValue) {
              $field = module.get.field(field.identifier);
            }
            if (requiresValue) {
              prompt = prompt.replace('{value}', $field.val());
            }
            if (requiresName) {
              $label = $field.closest(selector.group).find('label').eq(0);
              name = $label.length == 1 ? $label.text() : $field.prop('placeholder') || _settings.text.unspecifiedField;
              prompt = prompt.replace('{name}', name);
            }
            prompt = prompt.replace('{identifier}', field.identifier);
            prompt = prompt.replace('{ruleValue}', ancillary);
            if (!rule.prompt) {
              module.verbose('Using default validation prompt for type', prompt, ruleName);
            }
            return prompt;
          },
          settings: function settings() {
            if ($.isPlainObject(parameters)) {
              var keys = Object.keys(parameters),
                  isLegacySettings = keys.length > 0 ? parameters[keys[0]].identifier !== undefined && parameters[keys[0]].rules !== undefined : false,
                  ruleKeys;
              if (isLegacySettings) {
                // 1.x (ducktyped)
                _settings = $.extend(true, {}, $.fn.form.settings, legacyParameters);
                _validation = $.extend({}, $.fn.form.settings.defaults, parameters);
                module.error(_settings.error.oldSyntax, element);
                module.verbose('Extending settings from legacy parameters', _validation, _settings);
              } else {
                // 2.x
                if (parameters.fields) {
                  ruleKeys = Object.keys(parameters.fields);
                  if (typeof parameters.fields[ruleKeys[0]] == 'string' || $.isArray(parameters.fields[ruleKeys[0]])) {
                    $.each(parameters.fields, function (name, rules) {
                      if (typeof rules == 'string') {
                        rules = [rules];
                      }
                      parameters.fields[name] = {
                        rules: []
                      };
                      $.each(rules, function (index, rule) {
                        parameters.fields[name].rules.push({ type: rule });
                      });
                    });
                  }
                }

                _settings = $.extend(true, {}, $.fn.form.settings, parameters);
                _validation = $.extend({}, $.fn.form.settings.defaults, _settings.fields);
                module.verbose('Extending settings', _validation, _settings);
              }
            } else {
              _settings = $.fn.form.settings;
              _validation = $.fn.form.settings.defaults;
              module.verbose('Using default form validation', _validation, _settings);
            }

            // shorthand
            namespace = _settings.namespace;
            metadata = _settings.metadata;
            selector = _settings.selector;
            className = _settings.className;
            error = _settings.error;
            moduleNamespace = 'module-' + namespace;
            eventNamespace = '.' + namespace;

            // grab instance
            instance = $module.data(moduleNamespace);

            // refresh selector cache
            module.refresh();
          },
          field: function field(identifier) {
            module.verbose('Finding field with identifier', identifier);
            if ($field.filter('#' + identifier).length > 0) {
              return $field.filter('#' + identifier);
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return $field.filter('[name="' + identifier + '"]');
            } else if ($field.filter('[name="' + identifier + '[]"]').length > 0) {
              return $field.filter('[name="' + identifier + '[]"]');
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return $field.filter('[data-' + metadata.validate + '="' + identifier + '"]');
            }
            return $('<input/>');
          },
          fields: function fields(_fields) {
            var $fields = $();
            $.each(_fields, function (index, name) {
              $fields = $fields.add(module.get.field(name));
            });
            return $fields;
          },
          validation: function validation($field) {
            var fieldValidation, identifier;
            if (!_validation) {
              return false;
            }
            $.each(_validation, function (fieldName, field) {
              identifier = field.identifier || fieldName;
              if (module.get.field(identifier)[0] == $field[0]) {
                field.identifier = identifier;
                fieldValidation = field;
              }
            });
            return fieldValidation || false;
          },
          value: function value(field) {
            var fields = [],
                results;
            fields.push(field);
            results = module.get.values.call(element, fields);
            return results[field];
          },
          values: function values(fields) {
            var $fields = $.isArray(fields) ? module.get.fields(fields) : $field,
                values = {};
            $fields.each(function (index, field) {
              var $field = $(field),
                  type = $field.prop('type'),
                  name = $field.prop('name'),
                  value = $field.val(),
                  isCheckbox = $field.is(selector.checkbox),
                  isRadio = $field.is(selector.radio),
                  isMultiple = name.indexOf('[]') !== -1,
                  isChecked = isCheckbox ? $field.is(':checked') : false;
              if (name) {
                if (isMultiple) {
                  name = name.replace('[]', '');
                  if (!values[name]) {
                    values[name] = [];
                  }
                  if (isCheckbox) {
                    if (isChecked) {
                      values[name].push(value || true);
                    } else {
                      values[name].push(false);
                    }
                  } else {
                    values[name].push(value);
                  }
                } else {
                  if (isRadio) {
                    if (isChecked) {
                      values[name] = value;
                    }
                  } else if (isCheckbox) {
                    if (isChecked) {
                      values[name] = value || true;
                    } else {
                      values[name] = false;
                    }
                  } else {
                    values[name] = value;
                  }
                }
              }
            });
            return values;
          }
        },

        has: {

          field: function field(identifier) {
            module.verbose('Checking for existence of a field with identifier', identifier);
            if (typeof identifier !== 'string') {
              module.error(error.identifier, identifier);
            }
            if ($field.filter('#' + identifier).length > 0) {
              return true;
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return true;
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return true;
            }
            return false;
          }

        },

        add: {
          prompt: function prompt(identifier, errors) {
            var $field = module.get.field(identifier),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.children(selector.prompt),
                promptExists = $prompt.length !== 0;
            errors = typeof errors == 'string' ? [errors] : errors;
            module.verbose('Adding field error state', identifier);
            $fieldGroup.addClass(className.error);
            if (_settings.inline) {
              if (!promptExists) {
                $prompt = _settings.templates.prompt(errors);
                $prompt.appendTo($fieldGroup);
              }
              $prompt.html(errors[0]);
              if (!promptExists) {
                if (_settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                  module.verbose('Displaying error with css transition', _settings.transition);
                  $prompt.transition(_settings.transition + ' in', _settings.duration);
                } else {
                  module.verbose('Displaying error with fallback javascript animation');
                  $prompt.fadeIn(_settings.duration);
                }
              } else {
                module.verbose('Inline errors are disabled, no inline error added', identifier);
              }
            }
          },
          errors: function errors(_errors) {
            module.debug('Adding form error messages', _errors);
            module.set.error();
            $message.html(_settings.templates.error(_errors));
          }
        },

        remove: {
          prompt: function prompt(identifier) {
            var $field = module.get.field(identifier),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.children(selector.prompt);
            $fieldGroup.removeClass(className.error);
            if (_settings.inline && $prompt.is(':visible')) {
              module.verbose('Removing prompt for field', identifier);
              if (_settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                $prompt.transition(_settings.transition + ' out', _settings.duration, function () {
                  $prompt.remove();
                });
              } else {
                $prompt.fadeOut(_settings.duration, function () {
                  $prompt.remove();
                });
              }
            }
          }
        },

        set: {
          success: function success() {
            $module.removeClass(className.error).addClass(className.success);
          },
          defaults: function defaults() {
            $field.each(function () {
              var $field = $(this),
                  isCheckbox = $field.filter(selector.checkbox).length > 0,
                  value = isCheckbox ? $field.is(':checked') : $field.val();
              $field.data(metadata.defaultValue, value);
            });
          },
          error: function error() {
            $module.removeClass(className.success).addClass(className.error);
          },
          value: function value(field, _value) {
            var fields = {};
            fields[field] = _value;
            return module.set.values.call(element, fields);
          },
          values: function values(fields) {
            if ($.isEmptyObject(fields)) {
              return;
            }
            $.each(fields, function (key, value) {
              var $field = module.get.field(key),
                  $element = $field.parent(),
                  isMultiple = $.isArray(value),
                  isCheckbox = $element.is(selector.uiCheckbox),
                  isDropdown = $element.is(selector.uiDropdown),
                  isRadio = $field.is(selector.radio) && isCheckbox,
                  fieldExists = $field.length > 0,
                  $multipleField;
              if (fieldExists) {
                if (isMultiple && isCheckbox) {
                  module.verbose('Selecting multiple', value, $field);
                  $element.checkbox('uncheck');
                  $.each(value, function (index, value) {
                    $multipleField = $field.filter('[value="' + value + '"]');
                    $element = $multipleField.parent();
                    if ($multipleField.length > 0) {
                      $element.checkbox('check');
                    }
                  });
                } else if (isRadio) {
                  module.verbose('Selecting radio value', value, $field);
                  $field.filter('[value="' + value + '"]').parent(selector.uiCheckbox).checkbox('check');
                } else if (isCheckbox) {
                  module.verbose('Setting checkbox value', value, $element);
                  if (value === true) {
                    $element.checkbox('check');
                  } else {
                    $element.checkbox('uncheck');
                  }
                } else if (isDropdown) {
                  module.verbose('Setting dropdown value', value, $element);
                  $element.dropdown('set selected', value);
                } else {
                  module.verbose('Setting field value', value, $field);
                  $field.val(value);
                }
              }
            });
          }
        },

        validate: {

          form: function form(event, ignoreCallbacks) {
            var values = module.get.values(),
                apiRequest;

            // input keydown event will fire submit repeatedly by browser default
            if (keyHeldDown) {
              return false;
            }

            // reset errors
            formErrors = [];
            if (module.is.valid()) {
              module.debug('Form has no validation errors, submitting');
              module.set.success();
              if (ignoreCallbacks !== true) {
                return _settings.onSuccess.call(element, event, values);
              }
            } else {
              module.debug('Form has errors');
              module.set.error();
              if (!_settings.inline) {
                module.add.errors(formErrors);
              }
              // prevent ajax submit
              if ($module.data('moduleApi') !== undefined) {
                event.stopImmediatePropagation();
              }
              if (ignoreCallbacks !== true) {
                return _settings.onFailure.call(element, formErrors, values);
              }
            }
          },

          // takes a validation object and returns whether field passes validation
          field: function field(_field, fieldName) {
            var identifier = _field.identifier || fieldName,
                $field = module.get.field(identifier),
                $dependsField = _field.depends ? module.get.field(_field.depends) : false,
                fieldValid = true,
                fieldErrors = [];
            if (!_field.identifier) {
              module.debug('Using field name as identifier', identifier);
              _field.identifier = identifier;
            }
            if ($field.prop('disabled')) {
              module.debug('Field is disabled. Skipping', identifier);
              fieldValid = true;
            } else if (_field.optional && module.is.blank($field)) {
              module.debug('Field is optional and blank. Skipping', identifier);
              fieldValid = true;
            } else if (_field.depends && module.is.empty($dependsField)) {
              module.debug('Field depends on another value that is not present or empty. Skipping', $dependsField);
              fieldValid = true;
            } else if (_field.rules !== undefined) {
              $.each(_field.rules, function (index, rule) {
                if (module.has.field(identifier) && !module.validate.rule(_field, rule)) {
                  module.debug('Field is invalid', identifier, rule.type);
                  fieldErrors.push(module.get.prompt(rule, _field));
                  fieldValid = false;
                }
              });
            }
            if (fieldValid) {
              module.remove.prompt(identifier, fieldErrors);
              _settings.onValid.call($field);
            } else {
              formErrors = formErrors.concat(fieldErrors);
              module.add.prompt(identifier, fieldErrors);
              _settings.onInvalid.call($field, fieldErrors);
              return false;
            }
            return true;
          },

          // takes validation rule and returns whether field passes rule
          rule: function rule(field, _rule) {
            var $field = module.get.field(field.identifier),
                type = _rule.type,
                value = $field.val(),
                isValid = true,
                ancillary = module.get.ancillaryValue(_rule),
                ruleName = module.get.ruleName(_rule),
                ruleFunction = _settings.rules[ruleName];
            if (!$.isFunction(ruleFunction)) {
              module.error(error.noRule, ruleName);
              return;
            }
            // cast to string avoiding encoding special values
            value = value === undefined || value === '' || value === null ? '' : $.trim(value + '');
            return ruleFunction.call($field, value, ancillary);
          }
        },

        setting: function setting(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, _settings, name);
          } else if (value !== undefined) {
            _settings[name] = value;
          } else {
            return _settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!_settings.silent && _settings.debug) {
            if (_settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, _settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!_settings.silent && _settings.verbose && _settings.debug) {
            if (_settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, _settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!_settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, _settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;
            if (_settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = _settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;
          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }
          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }
          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };
      module.initialize();
    });

    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.form.settings = {

    name: 'Form',
    namespace: 'form',

    debug: false,
    verbose: false,
    performance: true,

    fields: false,

    keyboardShortcuts: true,
    on: 'submit',
    inline: false,

    delay: 200,
    revalidate: true,

    transition: 'scale',
    duration: 200,

    onValid: function onValid() {},
    onInvalid: function onInvalid() {},
    onSuccess: function onSuccess() {
      return true;
    },
    onFailure: function onFailure() {
      return false;
    },

    metadata: {
      defaultValue: 'default',
      validate: 'validate'
    },

    regExp: {
      bracket: /\[(.*)\]/i,
      decimal: /^\d*(\.)\d+/,
      email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      flags: /^\/(.*)\/(.*)?/,
      integer: /^\-?\d+$/,
      number: /^\-?\d*(\.\d+)?$/,
      url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
    },

    text: {
      unspecifiedRule: 'Please enter a valid value',
      unspecifiedField: 'This field'
    },

    prompt: {
      empty: '{name} must have a value',
      checked: '{name} must be checked',
      email: '{name} must be a valid e-mail',
      url: '{name} must be a valid url',
      regExp: '{name} is not formatted correctly',
      integer: '{name} must be an integer',
      decimal: '{name} must be a decimal number',
      number: '{name} must be set to a number',
      is: '{name} must be "{ruleValue}"',
      isExactly: '{name} must be exactly "{ruleValue}"',
      not: '{name} cannot be set to "{ruleValue}"',
      notExactly: '{name} cannot be set to exactly "{ruleValue}"',
      contain: '{name} cannot contain "{ruleValue}"',
      containExactly: '{name} cannot contain exactly "{ruleValue}"',
      doesntContain: '{name} must contain  "{ruleValue}"',
      doesntContainExactly: '{name} must contain exactly "{ruleValue}"',
      minLength: '{name} must be at least {ruleValue} characters',
      length: '{name} must be at least {ruleValue} characters',
      exactLength: '{name} must be exactly {ruleValue} characters',
      maxLength: '{name} cannot be longer than {ruleValue} characters',
      match: '{name} must match {ruleValue} field',
      different: '{name} must have a different value than {ruleValue} field',
      creditCard: '{name} must be a valid credit card number',
      minCount: '{name} must have at least {ruleValue} choices',
      exactCount: '{name} must have exactly {ruleValue} choices',
      maxCount: '{name} must have {ruleValue} or less choices'
    },

    selector: {
      checkbox: 'input[type="checkbox"], input[type="radio"]',
      clear: '.clear',
      field: 'input, textarea, select',
      group: '.field',
      input: 'input',
      message: '.error.message',
      prompt: '.prompt.label',
      radio: 'input[type="radio"]',
      reset: '.reset:not([type="reset"])',
      submit: '.submit:not([type="submit"])',
      uiCheckbox: '.ui.checkbox',
      uiDropdown: '.ui.dropdown'
    },

    className: {
      error: 'error',
      label: 'ui prompt label',
      pressed: 'down',
      success: 'success'
    },

    error: {
      identifier: 'You must specify a string identifier for each field',
      method: 'The method you called is not defined.',
      noRule: 'There is no rule matching the one you specified',
      oldSyntax: 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.'
    },

    templates: {

      // template that produces error message
      error: function error(errors) {
        var html = '<ul class="list">';
        $.each(errors, function (index, value) {
          html += '<li>' + value + '</li>';
        });
        html += '</ul>';
        return $(html);
      },

      // template that produces label
      prompt: function prompt(errors) {
        return $('<div/>').addClass('ui basic red pointing prompt label').html(errors[0]);
      }
    },

    rules: {

      // is not empty or blank string
      empty: function empty(value) {
        return !(value === undefined || '' === value || $.isArray(value) && value.length === 0);
      },

      // checkbox checked
      checked: function checked() {
        return $(this).filter(':checked').length > 0;
      },

      // is most likely an email
      email: function email(value) {
        return $.fn.form.settings.regExp.email.test(value);
      },

      // value is most likely url
      url: function url(value) {
        return $.fn.form.settings.regExp.url.test(value);
      },

      // matches specified regExp
      regExp: function regExp(value, _regExp) {
        if (_regExp instanceof RegExp) {
          return value.match(_regExp);
        }
        var regExpParts = _regExp.match($.fn.form.settings.regExp.flags),
            flags;
        // regular expression specified as /baz/gi (flags)
        if (regExpParts) {
          _regExp = regExpParts.length >= 2 ? regExpParts[1] : _regExp;
          flags = regExpParts.length >= 3 ? regExpParts[2] : '';
        }
        return value.match(new RegExp(_regExp, flags));
      },

      // is valid integer or matches range
      integer: function integer(value, range) {
        var intRegExp = $.fn.form.settings.regExp.integer,
            min,
            max,
            parts;
        if (!range || ['', '..'].indexOf(range) !== -1) {
          // do nothing
        } else if (range.indexOf('..') == -1) {
          if (intRegExp.test(range)) {
            min = max = range - 0;
          }
        } else {
          parts = range.split('..', 2);
          if (intRegExp.test(parts[0])) {
            min = parts[0] - 0;
          }
          if (intRegExp.test(parts[1])) {
            max = parts[1] - 0;
          }
        }
        return intRegExp.test(value) && (min === undefined || value >= min) && (max === undefined || value <= max);
      },

      // is valid number (with decimal)
      decimal: function decimal(value) {
        return $.fn.form.settings.regExp.decimal.test(value);
      },

      // is valid number
      number: function number(value) {
        return $.fn.form.settings.regExp.number.test(value);
      },

      // is value (case insensitive)
      is: function is(value, text) {
        text = typeof text == 'string' ? text.toLowerCase() : text;
        value = typeof value == 'string' ? value.toLowerCase() : value;
        return value == text;
      },

      // is value
      isExactly: function isExactly(value, text) {
        return value == text;
      },

      // value is not another value (case insensitive)
      not: function not(value, notValue) {
        value = typeof value == 'string' ? value.toLowerCase() : value;
        notValue = typeof notValue == 'string' ? notValue.toLowerCase() : notValue;
        return value != notValue;
      },

      // value is not another value (case sensitive)
      notExactly: function notExactly(value, notValue) {
        return value != notValue;
      },

      // value contains text (insensitive)
      contains: function contains(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) !== -1;
      },

      // value contains text (case sensitive)
      containsExactly: function containsExactly(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) !== -1;
      },

      // value contains text (insensitive)
      doesntContain: function doesntContain(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) === -1;
      },

      // value contains text (case sensitive)
      doesntContainExactly: function doesntContainExactly(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) === -1;
      },

      // is at least string length
      minLength: function minLength(value, requiredLength) {
        return value !== undefined ? value.length >= requiredLength : false;
      },

      // see rls notes for 2.0.6 (this is a duplicate of minLength)
      length: function length(value, requiredLength) {
        return value !== undefined ? value.length >= requiredLength : false;
      },

      // is exactly length
      exactLength: function exactLength(value, requiredLength) {
        return value !== undefined ? value.length == requiredLength : false;
      },

      // is less than length
      maxLength: function maxLength(value, _maxLength) {
        return value !== undefined ? value.length <= _maxLength : false;
      },

      // matches another field
      match: function match(value, identifier) {
        var $form = $(this),
            matchingValue;
        if ($('[data-validate="' + identifier + '"]').length > 0) {
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {
          matchingValue = $('#' + identifier).val();
        } else if ($('[name="' + identifier + '"]').length > 0) {
          matchingValue = $('[name="' + identifier + '"]').val();
        } else if ($('[name="' + identifier + '[]"]').length > 0) {
          matchingValue = $('[name="' + identifier + '[]"]');
        }
        return matchingValue !== undefined ? value.toString() == matchingValue.toString() : false;
      },

      // different than another field
      different: function different(value, identifier) {
        // use either id or name of field
        var $form = $(this),
            matchingValue;
        if ($('[data-validate="' + identifier + '"]').length > 0) {
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {
          matchingValue = $('#' + identifier).val();
        } else if ($('[name="' + identifier + '"]').length > 0) {
          matchingValue = $('[name="' + identifier + '"]').val();
        } else if ($('[name="' + identifier + '[]"]').length > 0) {
          matchingValue = $('[name="' + identifier + '[]"]');
        }
        return matchingValue !== undefined ? value.toString() !== matchingValue.toString() : false;
      },

      creditCard: function creditCard(cardNumber, cardTypes) {
        var cards = {
          visa: {
            pattern: /^4/,
            length: [16]
          },
          amex: {
            pattern: /^3[47]/,
            length: [15]
          },
          mastercard: {
            pattern: /^5[1-5]/,
            length: [16]
          },
          discover: {
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            length: [16]
          },
          unionPay: {
            pattern: /^(62|88)/,
            length: [16, 17, 18, 19]
          },
          jcb: {
            pattern: /^35(2[89]|[3-8][0-9])/,
            length: [16]
          },
          maestro: {
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            length: [12, 13, 14, 15, 16, 17, 18, 19]
          },
          dinersClub: {
            pattern: /^(30[0-5]|^36)/,
            length: [14]
          },
          laser: {
            pattern: /^(6304|670[69]|6771)/,
            length: [16, 17, 18, 19]
          },
          visaElectron: {
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            length: [16]
          }
        },
            valid = {},
            validCard = false,
            requiredTypes = typeof cardTypes == 'string' ? cardTypes.split(',') : false,
            unionPay,
            validation;

        if (typeof cardNumber !== 'string' || cardNumber.length === 0) {
          return;
        }

        // verify card types
        if (requiredTypes) {
          $.each(requiredTypes, function (index, type) {
            // verify each card type
            validation = cards[type];
            if (validation) {
              valid = {
                length: $.inArray(cardNumber.length, validation.length) !== -1,
                pattern: cardNumber.search(validation.pattern) !== -1
              };
              if (valid.length && valid.pattern) {
                validCard = true;
              }
            }
          });

          if (!validCard) {
            return false;
          }
        }

        // skip luhn for UnionPay
        unionPay = {
          number: $.inArray(cardNumber.length, cards.unionPay.length) !== -1,
          pattern: cardNumber.search(cards.unionPay.pattern) !== -1
        };
        if (unionPay.number && unionPay.pattern) {
          return true;
        }

        // verify luhn, adapted from  <https://gist.github.com/2134376>
        var length = cardNumber.length,
            multiple = 0,
            producedValue = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
            sum = 0;
        while (length--) {
          sum += producedValue[multiple][parseInt(cardNumber.charAt(length), 10)];
          multiple ^= 1;
        }
        return sum % 10 === 0 && sum > 0;
      },

      minCount: function minCount(value, _minCount) {
        if (_minCount == 0) {
          return true;
        }
        if (_minCount == 1) {
          return value !== '';
        }
        return value.split(',').length >= _minCount;
      },

      exactCount: function exactCount(value, _exactCount) {
        if (_exactCount == 0) {
          return value === '';
        }
        if (_exactCount == 1) {
          return value !== '' && value.search(',') === -1;
        }
        return value.split(',').length == _exactCount;
      },

      maxCount: function maxCount(value, _maxCount) {
        if (_maxCount == 0) {
          return false;
        }
        if (_maxCount == 1) {
          return value.search(',') === -1;
        }
        return value.split(',').length <= _maxCount;
      }
    }

  };
})(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * # Semantic UI 2.2.3 - Popup
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

  "use strict";

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.popup = function (parameters) {
    var $allModules = $(this),
        $document = $(document),
        $window = $(window),
        $body = $('body'),
        moduleSelector = $allModules.selector || '',
        hasTouch = true,
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.popup.settings, parameters) : $.extend({}, $.fn.popup.settings),
          selector = settings.selector,
          className = settings.className,
          error = settings.error,
          metadata = settings.metadata,
          namespace = settings.namespace,
          eventNamespace = '.' + settings.namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $context = $(settings.context),
          $scrollContext = $(settings.scrollContext),
          $boundary = $(settings.boundary),
          $target = settings.target ? $(settings.target) : $module,
          $popup,
          $offsetParent,
          searchDepth = 0,
          triedPositions = false,
          openedWithTouch = false,
          element = this,
          instance = $module.data(moduleNamespace),
          documentObserver,
          elementNamespace,
          _id,
          module;

      module = {

        // binds events
        initialize: function initialize() {
          module.debug('Initializing', $module);
          module.createID();
          module.bind.events();
          if (!module.exists() && settings.preserve) {
            module.create();
          }
          if (settings.observeChanges) {
            module.observeChanges();
          }
          module.instantiate();
        },

        instantiate: function instantiate() {
          module.verbose('Storing instance', module);
          instance = module;
          $module.data(moduleNamespace, instance);
        },

        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            documentObserver = new MutationObserver(module.event.documentChanged);
            documentObserver.observe(document, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', documentObserver);
          }
        },

        refresh: function refresh() {
          if (settings.popup) {
            $popup = $(settings.popup).eq(0);
          } else {
            if (settings.inline) {
              $popup = $target.nextAll(selector.popup).eq(0);
              settings.popup = $popup;
            }
          }
          if (settings.popup) {
            $popup.addClass(className.loading);
            $offsetParent = module.get.offsetParent();
            $popup.removeClass(className.loading);
            if (settings.movePopup && module.has.popup() && module.get.offsetParent($popup)[0] !== $offsetParent[0]) {
              module.debug('Moving popup to the same offset parent as activating element');
              $popup.detach().appendTo($offsetParent);
            }
          } else {
            $offsetParent = settings.inline ? module.get.offsetParent($target) : module.has.popup() ? module.get.offsetParent($popup) : $body;
          }
          if ($offsetParent.is('html') && $offsetParent[0] !== $body[0]) {
            module.debug('Setting page as offset parent');
            $offsetParent = $body;
          }
          if (module.get.variation()) {
            module.set.variation();
          }
        },

        reposition: function reposition() {
          module.refresh();
          module.set.position();
        },

        destroy: function destroy() {
          module.debug('Destroying previous module');
          if (documentObserver) {
            documentObserver.disconnect();
          }
          // remove element only if was created dynamically
          if ($popup && !settings.preserve) {
            module.removePopup();
          }
          // clear all timeouts
          clearTimeout(module.hideTimer);
          clearTimeout(module.showTimer);
          // remove events
          module.unbind.close();
          module.unbind.events();
          $module.removeData(moduleNamespace);
        },

        event: {
          start: function start(event) {
            var delay = $.isPlainObject(settings.delay) ? settings.delay.show : settings.delay;
            clearTimeout(module.hideTimer);
            if (!openedWithTouch) {
              module.showTimer = setTimeout(module.show, delay);
            }
          },
          end: function end() {
            var delay = $.isPlainObject(settings.delay) ? settings.delay.hide : settings.delay;
            clearTimeout(module.showTimer);
            module.hideTimer = setTimeout(module.hide, delay);
          },
          touchstart: function touchstart(event) {
            openedWithTouch = true;
            module.show();
          },
          resize: function resize() {
            if (module.is.visible()) {
              module.set.position();
            }
          },
          documentChanged: function documentChanged(mutations) {
            [].forEach.call(mutations, function (mutation) {
              if (mutation.removedNodes) {
                [].forEach.call(mutation.removedNodes, function (node) {
                  if (node == element || $(node).find(element).length > 0) {
                    module.debug('Element removed from DOM, tearing down events');
                    module.destroy();
                  }
                });
              }
            });
          },
          hideGracefully: function hideGracefully(event) {
            var $target = $(event.target),
                isInDOM = $.contains(document.documentElement, event.target),
                inPopup = $target.closest(selector.popup).length > 0;
            // don't close on clicks inside popup
            if (event && !inPopup && isInDOM) {
              module.debug('Click occurred outside popup hiding popup');
              module.hide();
            } else {
              module.debug('Click was inside popup, keeping popup open');
            }
          }
        },

        // generates popup html from metadata
        create: function create() {
          var html = module.get.html(),
              title = module.get.title(),
              content = module.get.content();

          if (html || content || title) {
            module.debug('Creating pop-up html');
            if (!html) {
              html = settings.templates.popup({
                title: title,
                content: content
              });
            }
            $popup = $('<div/>').addClass(className.popup).data(metadata.activator, $module).html(html);
            if (settings.inline) {
              module.verbose('Inserting popup element inline', $popup);
              $popup.insertAfter($module);
            } else {
              module.verbose('Appending popup element to body', $popup);
              $popup.appendTo($context);
            }
            module.refresh();
            module.set.variation();

            if (settings.hoverable) {
              module.bind.popup();
            }
            settings.onCreate.call($popup, element);
          } else if ($target.next(selector.popup).length !== 0) {
            module.verbose('Pre-existing popup found');
            settings.inline = true;
            settings.popup = $target.next(selector.popup).data(metadata.activator, $module);
            module.refresh();
            if (settings.hoverable) {
              module.bind.popup();
            }
          } else if (settings.popup) {
            $(settings.popup).data(metadata.activator, $module);
            module.verbose('Used popup specified in settings');
            module.refresh();
            if (settings.hoverable) {
              module.bind.popup();
            }
          } else {
            module.debug('No content specified skipping display', element);
          }
        },

        createID: function createID() {
          _id = (Math.random().toString(16) + '000000000').substr(2, 8);
          elementNamespace = '.' + _id;
          module.verbose('Creating unique id for element', _id);
        },

        // determines popup state
        toggle: function toggle() {
          module.debug('Toggling pop-up');
          if (module.is.hidden()) {
            module.debug('Popup is hidden, showing pop-up');
            module.unbind.close();
            module.show();
          } else {
            module.debug('Popup is visible, hiding pop-up');
            module.hide();
          }
        },

        show: function show(callback) {
          callback = callback || function () {};
          module.debug('Showing pop-up', settings.transition);
          if (module.is.hidden() && !(module.is.active() && module.is.dropdown())) {
            if (!module.exists()) {
              module.create();
            }
            if (settings.onShow.call($popup, element) === false) {
              module.debug('onShow callback returned false, cancelling popup animation');
              return;
            } else if (!settings.preserve && !settings.popup) {
              module.refresh();
            }
            if ($popup && module.set.position()) {
              module.save.conditions();
              if (settings.exclusive) {
                module.hideAll();
              }
              module.animate.show(callback);
            }
          }
        },

        hide: function hide(callback) {
          callback = callback || function () {};
          if (module.is.visible() || module.is.animating()) {
            if (settings.onHide.call($popup, element) === false) {
              module.debug('onHide callback returned false, cancelling popup animation');
              return;
            }
            module.remove.visible();
            module.unbind.close();
            module.restore.conditions();
            module.animate.hide(callback);
          }
        },

        hideAll: function hideAll() {
          $(selector.popup).filter('.' + className.visible).each(function () {
            $(this).data(metadata.activator).popup('hide');
          });
        },
        exists: function exists() {
          if (!$popup) {
            return false;
          }
          if (settings.inline || settings.popup) {
            return module.has.popup();
          } else {
            return $popup.closest($context).length >= 1 ? true : false;
          }
        },

        removePopup: function removePopup() {
          if (module.has.popup() && !settings.popup) {
            module.debug('Removing popup', $popup);
            $popup.remove();
            $popup = undefined;
            settings.onRemove.call($popup, element);
          }
        },

        save: {
          conditions: function conditions() {
            module.cache = {
              title: $module.attr('title')
            };
            if (module.cache.title) {
              $module.removeAttr('title');
            }
            module.verbose('Saving original attributes', module.cache.title);
          }
        },
        restore: {
          conditions: function conditions() {
            if (module.cache && module.cache.title) {
              $module.attr('title', module.cache.title);
              module.verbose('Restoring original attributes', module.cache.title);
            }
            return true;
          }
        },
        supports: {
          svg: function svg() {
            return (typeof SVGGraphicsElement === 'undefined' ? 'undefined' : _typeof(SVGGraphicsElement)) === undefined;
          }
        },
        animate: {
          show: function show(callback) {
            callback = $.isFunction(callback) ? callback : function () {};
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.set.visible();
              $popup.transition({
                animation: settings.transition + ' in',
                queue: false,
                debug: settings.debug,
                verbose: settings.verbose,
                duration: settings.duration,
                onComplete: function onComplete() {
                  module.bind.close();
                  callback.call($popup, element);
                  settings.onVisible.call($popup, element);
                }
              });
            } else {
              module.error(error.noTransition);
            }
          },
          hide: function hide(callback) {
            callback = $.isFunction(callback) ? callback : function () {};
            module.debug('Hiding pop-up');
            if (settings.onHide.call($popup, element) === false) {
              module.debug('onHide callback returned false, cancelling popup animation');
              return;
            }
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              $popup.transition({
                animation: settings.transition + ' out',
                queue: false,
                duration: settings.duration,
                debug: settings.debug,
                verbose: settings.verbose,
                onComplete: function onComplete() {
                  module.reset();
                  callback.call($popup, element);
                  settings.onHidden.call($popup, element);
                }
              });
            } else {
              module.error(error.noTransition);
            }
          }
        },

        change: {
          content: function content(html) {
            $popup.html(html);
          }
        },

        get: {
          html: function html() {
            $module.removeData(metadata.html);
            return $module.data(metadata.html) || settings.html;
          },
          title: function title() {
            $module.removeData(metadata.title);
            return $module.data(metadata.title) || settings.title;
          },
          content: function content() {
            $module.removeData(metadata.content);
            return $module.data(metadata.content) || $module.attr('title') || settings.content;
          },
          variation: function variation() {
            $module.removeData(metadata.variation);
            return $module.data(metadata.variation) || settings.variation;
          },
          popup: function popup() {
            return $popup;
          },
          popupOffset: function popupOffset() {
            return $popup.offset();
          },
          calculations: function calculations() {
            var targetElement = $target[0],
                isWindow = $boundary[0] == window,
                targetPosition = settings.inline || settings.popup && settings.movePopup ? $target.position() : $target.offset(),
                screenPosition = isWindow ? { top: 0, left: 0 } : $boundary.offset(),
                calculations = {},
                scroll = isWindow ? { top: $window.scrollTop(), left: $window.scrollLeft() } : { top: 0, left: 0 },
                screen;
            calculations = {
              // element which is launching popup
              target: {
                element: $target[0],
                width: $target.outerWidth(),
                height: $target.outerHeight(),
                top: targetPosition.top,
                left: targetPosition.left,
                margin: {}
              },
              // popup itself
              popup: {
                width: $popup.outerWidth(),
                height: $popup.outerHeight()
              },
              // offset container (or 3d context)
              parent: {
                width: $offsetParent.outerWidth(),
                height: $offsetParent.outerHeight()
              },
              // screen boundaries
              screen: {
                top: screenPosition.top,
                left: screenPosition.left,
                scroll: {
                  top: scroll.top,
                  left: scroll.left
                },
                width: $boundary.width(),
                height: $boundary.height()
              }
            };

            // add in container calcs if fluid
            if (settings.setFluidWidth && module.is.fluid()) {
              calculations.container = {
                width: $popup.parent().outerWidth()
              };
              calculations.popup.width = calculations.container.width;
            }

            // add in margins if inline
            calculations.target.margin.top = settings.inline ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-top'), 10) : 0;
            calculations.target.margin.left = settings.inline ? module.is.rtl() ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-right'), 10) : parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-left'), 10) : 0;
            // calculate screen boundaries
            screen = calculations.screen;
            calculations.boundary = {
              top: screen.top + screen.scroll.top,
              bottom: screen.top + screen.scroll.top + screen.height,
              left: screen.left + screen.scroll.left,
              right: screen.left + screen.scroll.left + screen.width
            };
            return calculations;
          },
          id: function id() {
            return _id;
          },
          startEvent: function startEvent() {
            if (settings.on == 'hover') {
              return 'mouseenter';
            } else if (settings.on == 'focus') {
              return 'focus';
            }
            return false;
          },
          scrollEvent: function scrollEvent() {
            return 'scroll';
          },
          endEvent: function endEvent() {
            if (settings.on == 'hover') {
              return 'mouseleave';
            } else if (settings.on == 'focus') {
              return 'blur';
            }
            return false;
          },
          distanceFromBoundary: function distanceFromBoundary(offset, calculations) {
            var distanceFromBoundary = {},
                popup,
                boundary;
            calculations = calculations || module.get.calculations();

            // shorthand
            popup = calculations.popup;
            boundary = calculations.boundary;

            if (offset) {
              distanceFromBoundary = {
                top: offset.top - boundary.top,
                left: offset.left - boundary.left,
                right: boundary.right - (offset.left + popup.width),
                bottom: boundary.bottom - (offset.top + popup.height)
              };
              module.verbose('Distance from boundaries determined', offset, distanceFromBoundary);
            }
            return distanceFromBoundary;
          },
          offsetParent: function offsetParent($target) {
            var element = $target !== undefined ? $target[0] : $module[0],
                parentNode = element.parentNode,
                $node = $(parentNode);
            if (parentNode) {
              var is2D = $node.css('transform') === 'none',
                  isStatic = $node.css('position') === 'static',
                  isHTML = $node.is('html');
              while (parentNode && !isHTML && isStatic && is2D) {
                parentNode = parentNode.parentNode;
                $node = $(parentNode);
                is2D = $node.css('transform') === 'none';
                isStatic = $node.css('position') === 'static';
                isHTML = $node.is('html');
              }
            }
            return $node && $node.length > 0 ? $node : $();
          },
          positions: function positions() {
            return {
              'top left': false,
              'top center': false,
              'top right': false,
              'bottom left': false,
              'bottom center': false,
              'bottom right': false,
              'left center': false,
              'right center': false
            };
          },
          nextPosition: function nextPosition(position) {
            var positions = position.split(' '),
                verticalPosition = positions[0],
                horizontalPosition = positions[1],
                opposite = {
              top: 'bottom',
              bottom: 'top',
              left: 'right',
              right: 'left'
            },
                adjacent = {
              left: 'center',
              center: 'right',
              right: 'left'
            },
                backup = {
              'top left': 'top center',
              'top center': 'top right',
              'top right': 'right center',
              'right center': 'bottom right',
              'bottom right': 'bottom center',
              'bottom center': 'bottom left',
              'bottom left': 'left center',
              'left center': 'top left'
            },
                adjacentsAvailable = verticalPosition == 'top' || verticalPosition == 'bottom',
                oppositeTried = false,
                adjacentTried = false,
                nextPosition = false;
            if (!triedPositions) {
              module.verbose('All available positions available');
              triedPositions = module.get.positions();
            }

            module.debug('Recording last position tried', position);
            triedPositions[position] = true;

            if (settings.prefer === 'opposite') {
              nextPosition = [opposite[verticalPosition], horizontalPosition];
              nextPosition = nextPosition.join(' ');
              oppositeTried = triedPositions[nextPosition] === true;
              module.debug('Trying opposite strategy', nextPosition);
            }
            if (settings.prefer === 'adjacent' && adjacentsAvailable) {
              nextPosition = [verticalPosition, adjacent[horizontalPosition]];
              nextPosition = nextPosition.join(' ');
              adjacentTried = triedPositions[nextPosition] === true;
              module.debug('Trying adjacent strategy', nextPosition);
            }
            if (adjacentTried || oppositeTried) {
              module.debug('Using backup position', nextPosition);
              nextPosition = backup[position];
            }
            return nextPosition;
          }
        },

        set: {
          position: function position(_position, calculations) {

            // exit conditions
            if ($target.length === 0 || $popup.length === 0) {
              module.error(error.notFound);
              return;
            }
            var offset, distanceAway, target, popup, parent, positioning, popupOffset, distanceFromBoundary;

            calculations = calculations || module.get.calculations();
            _position = _position || $module.data(metadata.position) || settings.position;

            offset = $module.data(metadata.offset) || settings.offset;
            distanceAway = settings.distanceAway;

            // shorthand
            target = calculations.target;
            popup = calculations.popup;
            parent = calculations.parent;

            if (target.width === 0 && target.height === 0 && !module.is.svg(target.element)) {
              module.debug('Popup target is hidden, no action taken');
              return false;
            }

            if (settings.inline) {
              module.debug('Adding margin to calculation', target.margin);
              if (_position == 'left center' || _position == 'right center') {
                offset += target.margin.top;
                distanceAway += -target.margin.left;
              } else if (_position == 'top left' || _position == 'top center' || _position == 'top right') {
                offset += target.margin.left;
                distanceAway -= target.margin.top;
              } else {
                offset += target.margin.left;
                distanceAway += target.margin.top;
              }
            }

            module.debug('Determining popup position from calculations', _position, calculations);

            if (module.is.rtl()) {
              _position = _position.replace(/left|right/g, function (match) {
                return match == 'left' ? 'right' : 'left';
              });
              module.debug('RTL: Popup position updated', _position);
            }

            // if last attempt use specified last resort position
            if (searchDepth == settings.maxSearchDepth && typeof settings.lastResort === 'string') {
              _position = settings.lastResort;
            }

            switch (_position) {
              case 'top left':
                positioning = {
                  top: 'auto',
                  bottom: parent.height - target.top + distanceAway,
                  left: target.left + offset,
                  right: 'auto'
                };
                break;
              case 'top center':
                positioning = {
                  bottom: parent.height - target.top + distanceAway,
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  top: 'auto',
                  right: 'auto'
                };
                break;
              case 'top right':
                positioning = {
                  bottom: parent.height - target.top + distanceAway,
                  right: parent.width - target.left - target.width - offset,
                  top: 'auto',
                  left: 'auto'
                };
                break;
              case 'left center':
                positioning = {
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  right: parent.width - target.left + distanceAway,
                  left: 'auto',
                  bottom: 'auto'
                };
                break;
              case 'right center':
                positioning = {
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  left: target.left + target.width + distanceAway,
                  bottom: 'auto',
                  right: 'auto'
                };
                break;
              case 'bottom left':
                positioning = {
                  top: target.top + target.height + distanceAway,
                  left: target.left + offset,
                  bottom: 'auto',
                  right: 'auto'
                };
                break;
              case 'bottom center':
                positioning = {
                  top: target.top + target.height + distanceAway,
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  bottom: 'auto',
                  right: 'auto'
                };
                break;
              case 'bottom right':
                positioning = {
                  top: target.top + target.height + distanceAway,
                  right: parent.width - target.left - target.width - offset,
                  left: 'auto',
                  bottom: 'auto'
                };
                break;
            }
            if (positioning === undefined) {
              module.error(error.invalidPosition, _position);
            }

            module.debug('Calculated popup positioning values', positioning);

            // tentatively place on stage
            $popup.css(positioning).removeClass(className.position).addClass(_position).addClass(className.loading);

            popupOffset = module.get.popupOffset();

            // see if any boundaries are surpassed with this tentative position
            distanceFromBoundary = module.get.distanceFromBoundary(popupOffset, calculations);

            if (module.is.offstage(distanceFromBoundary, _position)) {
              module.debug('Position is outside viewport', _position);
              if (searchDepth < settings.maxSearchDepth) {
                searchDepth++;
                _position = module.get.nextPosition(_position);
                module.debug('Trying new position', _position);
                return $popup ? module.set.position(_position, calculations) : false;
              } else {
                if (settings.lastResort) {
                  module.debug('No position found, showing with last position');
                } else {
                  module.debug('Popup could not find a position to display', $popup);
                  module.error(error.cannotPlace, element);
                  module.remove.attempts();
                  module.remove.loading();
                  module.reset();
                  settings.onUnplaceable.call($popup, element);
                  return false;
                }
              }
            }
            module.debug('Position is on stage', _position);
            module.remove.attempts();
            module.remove.loading();
            if (settings.setFluidWidth && module.is.fluid()) {
              module.set.fluidWidth(calculations);
            }
            return true;
          },

          fluidWidth: function fluidWidth(calculations) {
            calculations = calculations || module.get.calculations();
            module.debug('Automatically setting element width to parent width', calculations.parent.width);
            $popup.css('width', calculations.container.width);
          },

          variation: function variation(_variation) {
            _variation = _variation || module.get.variation();
            if (_variation && module.has.popup()) {
              module.verbose('Adding variation to popup', _variation);
              $popup.addClass(_variation);
            }
          },

          visible: function visible() {
            $module.addClass(className.visible);
          }
        },

        remove: {
          loading: function loading() {
            $popup.removeClass(className.loading);
          },
          variation: function variation(_variation2) {
            _variation2 = _variation2 || module.get.variation();
            if (_variation2) {
              module.verbose('Removing variation', _variation2);
              $popup.removeClass(_variation2);
            }
          },
          visible: function visible() {
            $module.removeClass(className.visible);
          },
          attempts: function attempts() {
            module.verbose('Resetting all searched positions');
            searchDepth = 0;
            triedPositions = false;
          }
        },

        bind: {
          events: function events() {
            module.debug('Binding popup events to module');
            if (settings.on == 'click') {
              $module.on('click' + eventNamespace, module.toggle);
            }
            if (settings.on == 'hover' && hasTouch) {
              $module.on('touchstart' + eventNamespace, module.event.touchstart);
            }
            if (module.get.startEvent()) {
              $module.on(module.get.startEvent() + eventNamespace, module.event.start).on(module.get.endEvent() + eventNamespace, module.event.end);
            }
            if (settings.target) {
              module.debug('Target set to element', $target);
            }
            $window.on('resize' + elementNamespace, module.event.resize);
          },
          popup: function popup() {
            module.verbose('Allowing hover events on popup to prevent closing');
            if ($popup && module.has.popup()) {
              $popup.on('mouseenter' + eventNamespace, module.event.start).on('mouseleave' + eventNamespace, module.event.end);
            }
          },
          close: function close() {
            if (settings.hideOnScroll === true || settings.hideOnScroll == 'auto' && settings.on != 'click') {
              $scrollContext.one(module.get.scrollEvent() + elementNamespace, module.event.hideGracefully);
            }
            if (settings.on == 'hover' && openedWithTouch) {
              module.verbose('Binding popup close event to document');
              $document.on('touchstart' + elementNamespace, function (event) {
                module.verbose('Touched away from popup');
                module.event.hideGracefully.call(element, event);
              });
            }
            if (settings.on == 'click' && settings.closable) {
              module.verbose('Binding popup close event to document');
              $document.on('click' + elementNamespace, function (event) {
                module.verbose('Clicked away from popup');
                module.event.hideGracefully.call(element, event);
              });
            }
          }
        },

        unbind: {
          events: function events() {
            $window.off(elementNamespace);
            $module.off(eventNamespace);
          },
          close: function close() {
            $document.off(elementNamespace);
            $scrollContext.off(elementNamespace);
          }
        },

        has: {
          popup: function popup() {
            return $popup && $popup.length > 0;
          }
        },

        is: {
          offstage: function offstage(distanceFromBoundary, position) {
            var offstage = [];
            // return boundaries that have been surpassed
            $.each(distanceFromBoundary, function (direction, distance) {
              if (distance < -settings.jitter) {
                module.debug('Position exceeds allowable distance from edge', direction, distance, position);
                offstage.push(direction);
              }
            });
            if (offstage.length > 0) {
              return true;
            } else {
              return false;
            }
          },
          svg: function svg(element) {
            return module.supports.svg() && element instanceof SVGGraphicsElement;
          },
          active: function active() {
            return $module.hasClass(className.active);
          },
          animating: function animating() {
            return $popup !== undefined && $popup.hasClass(className.animating);
          },
          fluid: function fluid() {
            return $popup !== undefined && $popup.hasClass(className.fluid);
          },
          visible: function visible() {
            return $popup !== undefined && $popup.hasClass(className.visible);
          },
          dropdown: function dropdown() {
            return $module.hasClass(className.dropdown);
          },
          hidden: function hidden() {
            return !module.is.visible();
          },
          rtl: function rtl() {
            return $module.css('direction') == 'rtl';
          }
        },

        reset: function reset() {
          module.remove.visible();
          if (settings.preserve) {
            if ($.fn.transition !== undefined) {
              $popup.transition('remove transition');
            }
          } else {
            module.removePopup();
          }
        },

        setting: function setting(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            settings[name] = value;
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;
            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;
          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }
          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }
          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    });

    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.popup.settings = {

    name: 'Popup',

    // module settings
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    namespace: 'popup',

    // whether it should use dom mutation observers
    observeChanges: true,

    // callback only when element added to dom
    onCreate: function onCreate() {},

    // callback before element removed from dom
    onRemove: function onRemove() {},

    // callback before show animation
    onShow: function onShow() {},

    // callback after show animation
    onVisible: function onVisible() {},

    // callback before hide animation
    onHide: function onHide() {},

    // callback when popup cannot be positioned in visible screen
    onUnplaceable: function onUnplaceable() {},

    // callback after hide animation
    onHidden: function onHidden() {},

    // when to show popup
    on: 'hover',

    // element to use to determine if popup is out of boundary
    boundary: window,

    // whether to add touchstart events when using hover
    addTouchEvents: true,

    // default position relative to element
    position: 'top left',

    // name of variation to use
    variation: '',

    // whether popup should be moved to context
    movePopup: true,

    // element which popup should be relative to
    target: false,

    // jq selector or element that should be used as popup
    popup: false,

    // popup should remain inline next to activator
    inline: false,

    // popup should be removed from page on hide
    preserve: false,

    // popup should not close when being hovered on
    hoverable: false,

    // explicitly set content
    content: false,

    // explicitly set html
    html: false,

    // explicitly set title
    title: false,

    // whether automatically close on clickaway when on click
    closable: true,

    // automatically hide on scroll
    hideOnScroll: 'auto',

    // hide other popups on show
    exclusive: false,

    // context to attach popups
    context: 'body',

    // context for binding scroll events
    scrollContext: window,

    // position to prefer when calculating new position
    prefer: 'opposite',

    // specify position to appear even if it doesn't fit
    lastResort: false,

    // delay used to prevent accidental refiring of animations due to user error
    delay: {
      show: 50,
      hide: 70
    },

    // whether fluid variation should assign width explicitly
    setFluidWidth: true,

    // transition settings
    duration: 200,
    transition: 'scale',

    // distance away from activating element in px
    distanceAway: 0,

    // number of pixels an element is allowed to be "offstage" for a position to be chosen (allows for rounding)
    jitter: 2,

    // offset on aligning axis from calculated position
    offset: 0,

    // maximum times to look for a position before failing (9 positions total)
    maxSearchDepth: 15,

    error: {
      invalidPosition: 'The position you specified is not a valid position',
      cannotPlace: 'Popup does not fit within the boundaries of the viewport',
      method: 'The method you called is not defined.',
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',
      notFound: 'The target or popup you specified does not exist on the page'
    },

    metadata: {
      activator: 'activator',
      content: 'content',
      html: 'html',
      offset: 'offset',
      position: 'position',
      title: 'title',
      variation: 'variation'
    },

    className: {
      active: 'active',
      animating: 'animating',
      dropdown: 'dropdown',
      fluid: 'fluid',
      loading: 'loading',
      popup: 'ui popup',
      position: 'top left center bottom right',
      visible: 'visible'
    },

    selector: {
      popup: '.ui.popup'
    },

    templates: {
      escape: function escape(string) {
        var badChars = /[&<>"'`]/g,
            shouldEscape = /[&<>"'`]/,
            escape = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        },
            escapedChar = function escapedChar(chr) {
          return escape[chr];
        };
        if (shouldEscape.test(string)) {
          return string.replace(badChars, escapedChar);
        }
        return string;
      },
      popup: function popup(text) {
        var html = '',
            escape = $.fn.popup.settings.templates.escape;
        if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) !== undefined) {
          if (_typeof(text.title) !== undefined && text.title) {
            text.title = escape(text.title);
            html += '<div class="header">' + text.title + '</div>';
          }
          if (_typeof(text.content) !== undefined && text.content) {
            text.content = escape(text.content);
            html += '<div class="content">' + text.content + '</div>';
          }
        }
        return html;
      }
    }

  };
})(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function Tooltip(element, options) {
    this.type = null;
    this.options = null;
    this.enabled = null;
    this.timeout = null;
    this.hoverState = null;
    this.$element = null;
    this.inState = null;

    this.init('tooltip', element, options);
  };

  Tooltip.VERSION = '3.3.7';

  Tooltip.TRANSITION_DURATION = 150;

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
    this.inState = { click: false, hover: false, focus: false };

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
    }

    var triggers = this.options.trigger.split(' ');

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value;
    });

    return options;
  };

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in';
      return;
    }

    clearTimeout(self.timeout);

    self.hoverState = 'in';

    if (!self.options.delay || !self.options.delay.show) return self.show();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true;
    }

    return false;
  };

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
    }

    if (self.isInStateTrue()) return;

    clearTimeout(self.timeout);

    self.hoverState = 'out';

    if (!self.options.delay || !self.options.delay.hide) return self.hide();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide();
    }, self.options.delay.hide);
  };

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;

      var $tip = this.tip();

      var tipId = this.getUID(this.type);

      this.setContent();
      $tip.attr('id', tipId);
      this.$element.attr('aria-describedby', tipId);

      if (this.options.animation) $tip.addClass('fade');

      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

      $tip.detach().css({ top: 0, left: 0, display: 'block' }).addClass(placement).data('bs.' + this.type, this);

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      this.$element.trigger('inserted.bs.' + this.type);

      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;

        $tip.removeClass(orgPlacement).addClass(placement);
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

      this.applyPlacement(calculatedOffset, placement);

      var complete = function complete() {
        var prevHoverState = that.hoverState;
        that.$element.trigger('shown.bs.' + that.type);
        that.hoverState = null;

        if (prevHoverState == 'out') that.leave(that);
      };

      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }
  };

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10);
    var marginLeft = parseInt($tip.css('margin-left'), 10);

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;

    offset.top += marginTop;
    offset.left += marginLeft;

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function using(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        });
      }
    }, offset), 0);

    $tip.addClass('in');

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

    if (delta.left) offset.left += delta.left;else offset.top += delta.top;

    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
  };

  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };

  Tooltip.prototype.hide = function (callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e = $.Event('hide.bs.' + this.type);

    function complete() {
      if (that.hoverState != 'in') $tip.detach();
      if (that.$element) {
        // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
      }
      callback && callback();
    }

    this.$element.trigger(e);

    if (e.isDefaultPrevented()) return;

    $tip.removeClass('in');

    $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();

    this.hoverState = null;

    return this;
  };

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };

  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };

  Tooltip.prototype.getPosition = function ($element) {
    $element = $element || this.$element;

    var el = $element[0];
    var isBody = el.tagName == 'BODY';

    var elRect = el.getBoundingClientRect();
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement;
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset = isBody ? { top: 0, left: 0 } : isSvg ? null : $element.offset();
    var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'top' ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'left' ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
    /* placement == 'right' */{ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
  };

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 };
    if (!this.$viewport) return delta;

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);

    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) {
        // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
      if (leftEdgeOffset < viewportDimensions.left) {
        // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.right) {
        // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }

    return delta;
  };

  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;

    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

    return title;
  };

  Tooltip.prototype.getUID = function (prefix) {
    do {
      prefix += ~~(Math.random() * 1000000);
    } while (document.getElementById(prefix));
    return prefix;
  };

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
      }
    }
    return this.$tip;
  };

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };

  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.toggle = function (e) {
    var self = this;
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type);
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data('bs.' + this.type, self);
      }
    }

    if (e) {
      self.inState.click = !self.inState.click;
      if (self.isInStateTrue()) self.enter(self);else self.leave(self);
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    }
  };

  Tooltip.prototype.destroy = function () {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type);
      if (that.$tip) {
        that.$tip.detach();
      }
      that.$tip = null;
      that.$arrow = null;
      that.$viewport = null;
      that.$element = null;
    });
  };

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tooltip');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tooltip;

  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip;

  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * # Semantic UI 2.2.2 - Transition
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

  "use strict";

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.transition = function () {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        moduleArguments = arguments,
        query = moduleArguments[0],
        queryArguments = [].slice.call(arguments, 1),
        methodInvoked = typeof query === 'string',
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);
    },
        returnedValue;
    $allModules.each(function (index) {
      var $module = $(this),
          element = this,


      // set at run time
      settings,
          instance,
          error,
          className,
          metadata,
          animationEnd,
          animationName,
          namespace,
          moduleNamespace,
          eventNamespace,
          module;

      module = {

        initialize: function initialize() {

          // get full settings
          settings = module.get.settings.apply(element, moduleArguments);

          // shorthand
          className = settings.className;
          error = settings.error;
          metadata = settings.metadata;

          // define namespace
          eventNamespace = '.' + settings.namespace;
          moduleNamespace = 'module-' + settings.namespace;
          instance = $module.data(moduleNamespace) || module;

          // get vendor specific events
          animationEnd = module.get.animationEndEvent();

          if (methodInvoked) {
            methodInvoked = module.invoke(query);
          }

          // method not invoked, lets run an animation
          if (methodInvoked === false) {
            module.verbose('Converted arguments into settings object', settings);
            if (settings.interval) {
              module.delay(settings.animate);
            } else {
              module.animate();
            }
            module.instantiate();
          }
        },

        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, instance);
        },

        destroy: function destroy() {
          module.verbose('Destroying previous module for', element);
          $module.removeData(moduleNamespace);
        },

        refresh: function refresh() {
          module.verbose('Refreshing display type on next animation');
          delete module.displayType;
        },

        forceRepaint: function forceRepaint() {
          module.verbose('Forcing element repaint');
          var $parentElement = $module.parent(),
              $nextElement = $module.next();
          if ($nextElement.length === 0) {
            $module.detach().appendTo($parentElement);
          } else {
            $module.detach().insertBefore($nextElement);
          }
        },

        repaint: function repaint() {
          module.verbose('Repainting element');
          var fakeAssignment = element.offsetWidth;
        },

        delay: function delay(interval) {
          var direction = module.get.animationDirection(),
              shouldReverse,
              delay;
          if (!direction) {
            direction = module.can.transition() ? module.get.direction() : 'static';
          }
          interval = interval !== undefined ? interval : settings.interval;
          shouldReverse = settings.reverse == 'auto' && direction == className.outward;
          delay = shouldReverse || settings.reverse == true ? ($allModules.length - index) * settings.interval : index * settings.interval;
          module.debug('Delaying animation by', delay);
          setTimeout(module.animate, delay);
        },

        animate: function animate(overrideSettings) {
          settings = overrideSettings || settings;
          if (!module.is.supported()) {
            module.error(error.support);
            return false;
          }
          module.debug('Preparing animation', settings.animation);
          if (module.is.animating()) {
            if (settings.queue) {
              if (!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
              } else {
                module.queue(settings.animation);
              }
              return false;
            } else if (!settings.allowRepeats && module.is.occurring()) {
              module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);
              return false;
            } else {
              module.debug('New animation started, completing previous early', settings.animation);
              instance.complete();
            }
          }
          if (module.can.animate()) {
            module.set.animating(settings.animation);
          } else {
            module.error(error.noAnimation, settings.animation, element);
          }
        },

        reset: function reset() {
          module.debug('Resetting animation to beginning conditions');
          module.remove.animationCallbacks();
          module.restore.conditions();
          module.remove.animating();
        },

        queue: function queue(animation) {
          module.debug('Queueing animation of', animation);
          module.queuing = true;
          $module.one(animationEnd + '.queue' + eventNamespace, function () {
            module.queuing = false;
            module.repaint();
            module.animate.apply(this, settings);
          });
        },

        complete: function complete(event) {
          module.debug('Animation complete', settings.animation);
          module.remove.completeCallback();
          module.remove.failSafe();
          if (!module.is.looping()) {
            if (module.is.outward()) {
              module.verbose('Animation is outward, hiding element');
              module.restore.conditions();
              module.hide();
            } else if (module.is.inward()) {
              module.verbose('Animation is outward, showing element');
              module.restore.conditions();
              module.show();
            } else {
              module.verbose('Static animation completed');
              module.restore.conditions();
              settings.onComplete.call(element);
            }
          }
        },

        force: {
          visible: function visible() {
            var style = $module.attr('style'),
                userStyle = module.get.userStyle(),
                displayType = module.get.displayType(),
                overrideStyle = userStyle + 'display: ' + displayType + ' !important;',
                currentDisplay = $module.css('display'),
                emptyStyle = style === undefined || style === '';
            if (currentDisplay !== displayType) {
              module.verbose('Overriding default display to show element', displayType);
              $module.attr('style', overrideStyle);
            } else if (emptyStyle) {
              $module.removeAttr('style');
            }
          },
          hidden: function hidden() {
            var style = $module.attr('style'),
                currentDisplay = $module.css('display'),
                emptyStyle = style === undefined || style === '';
            if (currentDisplay !== 'none' && !module.is.hidden()) {
              module.verbose('Overriding default display to hide element');
              $module.css('display', 'none');
            } else if (emptyStyle) {
              $module.removeAttr('style');
            }
          }
        },

        has: {
          direction: function direction(animation) {
            var hasDirection = false;
            animation = animation || settings.animation;
            if (typeof animation === 'string') {
              animation = animation.split(' ');
              $.each(animation, function (index, word) {
                if (word === className.inward || word === className.outward) {
                  hasDirection = true;
                }
              });
            }
            return hasDirection;
          },
          inlineDisplay: function inlineDisplay() {
            var style = $module.attr('style') || '';
            return $.isArray(style.match(/display.*?;/, ''));
          }
        },

        set: {
          animating: function animating(animation) {
            var animationClass, direction;
            // remove previous callbacks
            module.remove.completeCallback();

            // determine exact animation
            animation = animation || settings.animation;
            animationClass = module.get.animationClass(animation);

            // save animation class in cache to restore class names
            module.save.animation(animationClass);

            // override display if necessary so animation appears visibly
            module.force.visible();

            module.remove.hidden();
            module.remove.direction();

            module.start.animation(animationClass);
          },
          duration: function duration(animationName, _duration) {
            _duration = _duration || settings.duration;
            _duration = typeof _duration == 'number' ? _duration + 'ms' : _duration;
            if (_duration || _duration === 0) {
              module.verbose('Setting animation duration', _duration);
              $module.css({
                'animation-duration': _duration
              });
            }
          },
          direction: function direction(_direction) {
            _direction = _direction || module.get.direction();
            if (_direction == className.inward) {
              module.set.inward();
            } else {
              module.set.outward();
            }
          },
          looping: function looping() {
            module.debug('Transition set to loop');
            $module.addClass(className.looping);
          },
          hidden: function hidden() {
            $module.addClass(className.transition).addClass(className.hidden);
          },
          inward: function inward() {
            module.debug('Setting direction to inward');
            $module.removeClass(className.outward).addClass(className.inward);
          },
          outward: function outward() {
            module.debug('Setting direction to outward');
            $module.removeClass(className.inward).addClass(className.outward);
          },
          visible: function visible() {
            $module.addClass(className.transition).addClass(className.visible);
          }
        },

        start: {
          animation: function animation(animationClass) {
            animationClass = animationClass || module.get.animationClass();
            module.debug('Starting tween', animationClass);
            $module.addClass(animationClass).one(animationEnd + '.complete' + eventNamespace, module.complete);
            if (settings.useFailSafe) {
              module.add.failSafe();
            }
            module.set.duration(settings.duration);
            settings.onStart.call(element);
          }
        },

        save: {
          animation: function animation(_animation) {
            if (!module.cache) {
              module.cache = {};
            }
            module.cache.animation = _animation;
          },
          displayType: function displayType(_displayType) {
            if (_displayType !== 'none') {
              $module.data(metadata.displayType, _displayType);
            }
          },
          transitionExists: function transitionExists(animation, exists) {
            $.fn.transition.exists[animation] = exists;
            module.verbose('Saving existence of transition', animation, exists);
          }
        },

        restore: {
          conditions: function conditions() {
            var animation = module.get.currentAnimation();
            if (animation) {
              $module.removeClass(animation);
              module.verbose('Removing animation class', module.cache);
            }
            module.remove.duration();
          }
        },

        add: {
          failSafe: function failSafe() {
            var duration = module.get.duration();
            module.timer = setTimeout(function () {
              $module.triggerHandler(animationEnd);
            }, duration + settings.failSafeDelay);
            module.verbose('Adding fail safe timer', module.timer);
          }
        },

        remove: {
          animating: function animating() {
            $module.removeClass(className.animating);
          },
          animationCallbacks: function animationCallbacks() {
            module.remove.queueCallback();
            module.remove.completeCallback();
          },
          queueCallback: function queueCallback() {
            $module.off('.queue' + eventNamespace);
          },
          completeCallback: function completeCallback() {
            $module.off('.complete' + eventNamespace);
          },
          display: function display() {
            $module.css('display', '');
          },
          direction: function direction() {
            $module.removeClass(className.inward).removeClass(className.outward);
          },
          duration: function duration() {
            $module.css('animation-duration', '');
          },
          failSafe: function failSafe() {
            module.verbose('Removing fail safe timer', module.timer);
            if (module.timer) {
              clearTimeout(module.timer);
            }
          },
          hidden: function hidden() {
            $module.removeClass(className.hidden);
          },
          visible: function visible() {
            $module.removeClass(className.visible);
          },
          looping: function looping() {
            module.debug('Transitions are no longer looping');
            if (module.is.looping()) {
              module.reset();
              $module.removeClass(className.looping);
            }
          },
          transition: function transition() {
            $module.removeClass(className.visible).removeClass(className.hidden);
          }
        },
        get: {
          settings: function settings(animation, duration, onComplete) {
            // single settings object
            if ((typeof animation === 'undefined' ? 'undefined' : _typeof(animation)) == 'object') {
              return $.extend(true, {}, $.fn.transition.settings, animation);
            }
            // all arguments provided
            else if (typeof onComplete == 'function') {
                return $.extend({}, $.fn.transition.settings, {
                  animation: animation,
                  onComplete: onComplete,
                  duration: duration
                });
              }
              // only duration provided
              else if (typeof duration == 'string' || typeof duration == 'number') {
                  return $.extend({}, $.fn.transition.settings, {
                    animation: animation,
                    duration: duration
                  });
                }
                // duration is actually settings object
                else if ((typeof duration === 'undefined' ? 'undefined' : _typeof(duration)) == 'object') {
                    return $.extend({}, $.fn.transition.settings, duration, {
                      animation: animation
                    });
                  }
                  // duration is actually callback
                  else if (typeof duration == 'function') {
                      return $.extend({}, $.fn.transition.settings, {
                        animation: animation,
                        onComplete: duration
                      });
                    }
                    // only animation provided
                    else {
                        return $.extend({}, $.fn.transition.settings, {
                          animation: animation
                        });
                      }
            return $.fn.transition.settings;
          },
          animationClass: function animationClass(animation) {
            var animationClass = animation || settings.animation,
                directionClass = module.can.transition() && !module.has.direction() ? module.get.direction() + ' ' : '';
            return className.animating + ' ' + className.transition + ' ' + directionClass + animationClass;
          },
          currentAnimation: function currentAnimation() {
            return module.cache && module.cache.animation !== undefined ? module.cache.animation : false;
          },
          currentDirection: function currentDirection() {
            return module.is.inward() ? className.inward : className.outward;
          },
          direction: function direction() {
            return module.is.hidden() || !module.is.visible() ? className.inward : className.outward;
          },
          animationDirection: function animationDirection(animation) {
            var direction;
            animation = animation || settings.animation;
            if (typeof animation === 'string') {
              animation = animation.split(' ');
              // search animation name for out/in class
              $.each(animation, function (index, word) {
                if (word === className.inward) {
                  direction = className.inward;
                } else if (word === className.outward) {
                  direction = className.outward;
                }
              });
            }
            // return found direction
            if (direction) {
              return direction;
            }
            return false;
          },
          duration: function duration(_duration2) {
            _duration2 = _duration2 || settings.duration;
            if (_duration2 === false) {
              _duration2 = $module.css('animation-duration') || 0;
            }
            return typeof _duration2 === 'string' ? _duration2.indexOf('ms') > -1 ? parseFloat(_duration2) : parseFloat(_duration2) * 1000 : _duration2;
          },
          displayType: function displayType() {
            if (settings.displayType) {
              return settings.displayType;
            }
            if ($module.data(metadata.displayType) === undefined) {
              // create fake element to determine display state
              module.can.transition(true);
            }
            return $module.data(metadata.displayType);
          },
          userStyle: function userStyle(style) {
            style = style || $module.attr('style') || '';
            return style.replace(/display.*?;/, '');
          },
          transitionExists: function transitionExists(animation) {
            return $.fn.transition.exists[animation];
          },
          animationStartEvent: function animationStartEvent() {
            var element = document.createElement('div'),
                animations = {
              'animation': 'animationstart',
              'OAnimation': 'oAnimationStart',
              'MozAnimation': 'mozAnimationStart',
              'WebkitAnimation': 'webkitAnimationStart'
            },
                animation;
            for (animation in animations) {
              if (element.style[animation] !== undefined) {
                return animations[animation];
              }
            }
            return false;
          },
          animationEndEvent: function animationEndEvent() {
            var element = document.createElement('div'),
                animations = {
              'animation': 'animationend',
              'OAnimation': 'oAnimationEnd',
              'MozAnimation': 'mozAnimationEnd',
              'WebkitAnimation': 'webkitAnimationEnd'
            },
                animation;
            for (animation in animations) {
              if (element.style[animation] !== undefined) {
                return animations[animation];
              }
            }
            return false;
          }

        },

        can: {
          transition: function transition(forced) {
            var animation = settings.animation,
                transitionExists = module.get.transitionExists(animation),
                elementClass,
                tagName,
                $clone,
                currentAnimation,
                inAnimation,
                directionExists,
                displayType;
            if (transitionExists === undefined || forced) {
              module.verbose('Determining whether animation exists');
              elementClass = $module.attr('class');
              tagName = $module.prop('tagName');

              $clone = $('<' + tagName + ' />').addClass(elementClass).insertAfter($module);
              currentAnimation = $clone.addClass(animation).removeClass(className.inward).removeClass(className.outward).addClass(className.animating).addClass(className.transition).css('animationName');
              inAnimation = $clone.addClass(className.inward).css('animationName');
              displayType = $clone.attr('class', elementClass).removeAttr('style').removeClass(className.hidden).removeClass(className.visible).show().css('display');
              module.verbose('Determining final display state', displayType);
              module.save.displayType(displayType);

              $clone.remove();
              if (currentAnimation != inAnimation) {
                module.debug('Direction exists for animation', animation);
                directionExists = true;
              } else if (currentAnimation == 'none' || !currentAnimation) {
                module.debug('No animation defined in css', animation);
                return;
              } else {
                module.debug('Static animation found', animation, displayType);
                directionExists = false;
              }
              module.save.transitionExists(animation, directionExists);
            }
            return transitionExists !== undefined ? transitionExists : directionExists;
          },
          animate: function animate() {
            // can transition does not return a value if animation does not exist
            return module.can.transition() !== undefined;
          }
        },

        is: {
          animating: function animating() {
            return $module.hasClass(className.animating);
          },
          inward: function inward() {
            return $module.hasClass(className.inward);
          },
          outward: function outward() {
            return $module.hasClass(className.outward);
          },
          looping: function looping() {
            return $module.hasClass(className.looping);
          },
          occurring: function occurring(animation) {
            animation = animation || settings.animation;
            animation = '.' + animation.replace(' ', '.');
            return $module.filter(animation).length > 0;
          },
          visible: function visible() {
            return $module.is(':visible');
          },
          hidden: function hidden() {
            return $module.css('visibility') === 'hidden';
          },
          supported: function supported() {
            return animationEnd !== false;
          }
        },

        hide: function hide() {
          module.verbose('Hiding element');
          if (module.is.animating()) {
            module.reset();
          }
          element.blur(); // IE will trigger focus change if element is not blurred before hiding
          module.remove.display();
          module.remove.visible();
          module.set.hidden();
          module.force.hidden();
          settings.onHide.call(element);
          settings.onComplete.call(element);
          // module.repaint();
        },

        show: function show(display) {
          module.verbose('Showing element', display);
          module.remove.hidden();
          module.set.visible();
          module.force.visible();
          settings.onShow.call(element);
          settings.onComplete.call(element);
          // module.repaint();
        },

        toggle: function toggle() {
          if (module.is.visible()) {
            module.hide();
          } else {
            module.show();
          }
        },

        stop: function stop() {
          module.debug('Stopping current animation');
          $module.triggerHandler(animationEnd);
        },

        stopAll: function stopAll() {
          module.debug('Stopping all animation');
          module.remove.queueCallback();
          $module.triggerHandler(animationEnd);
        },

        clear: {
          queue: function queue() {
            module.debug('Clearing animation queue');
            module.remove.queueCallback();
          }
        },

        enable: function enable() {
          module.verbose('Starting animation');
          $module.removeClass(className.disabled);
        },

        disable: function disable() {
          module.debug('Stopping animation');
          $module.addClass(className.disabled);
        },

        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;
            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        // modified for transition to return invoke success
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;
          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }
          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }
          return found !== undefined ? found : false;
        }
      };
      module.initialize();
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  // Records if CSS transition is available
  $.fn.transition.exists = {};

  $.fn.transition.settings = {

    // module info
    name: 'Transition',

    // hide all output from this component regardless of other settings
    silent: false,

    // debug content outputted to console
    debug: false,

    // verbose debug output
    verbose: false,

    // performance data output
    performance: true,

    // event namespace
    namespace: 'transition',

    // delay between animations in group
    interval: 0,

    // whether group animations should be reversed
    reverse: 'auto',

    // animation callback event
    onStart: function onStart() {},
    onComplete: function onComplete() {},
    onShow: function onShow() {},
    onHide: function onHide() {},

    // whether timeout should be used to ensure callback fires in cases animationend does not
    useFailSafe: true,

    // delay in ms for fail safe
    failSafeDelay: 100,

    // whether EXACT animation can occur twice in a row
    allowRepeats: false,

    // Override final display type on visible
    displayType: false,

    // animation duration
    animation: 'fade',
    duration: false,

    // new animations will occur after previous ones
    queue: true,

    metadata: {
      displayType: 'display'
    },

    className: {
      animating: 'animating',
      disabled: 'disabled',
      hidden: 'hidden',
      inward: 'in',
      loading: 'loading',
      looping: 'looping',
      outward: 'out',
      transition: 'transition',
      visible: 'visible'
    },

    // possible errors
    error: {
      noAnimation: 'Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.',
      repeated: 'That animation is already occurring, cancelling repeated animation',
      method: 'The method you called is not defined',
      support: 'This browser does not support CSS animations'
    }

  };
})(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 666:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(221);


/***/ }

},[666]);