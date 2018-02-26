/*!
 * WooCommerce Variation Swatches v1.0.9 
 * 
 * Author: Emran Ahmed ( emran.bd.08@gmail.com ) 
 * Date: 2018-2-3 22:06:27
 * Released under the GPLv3 license.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

jQuery(function ($) {
    Promise.resolve().then(function () {
        return __webpack_require__(2);
    }).then(function (_ref) {
        var PluginHelper = _ref.PluginHelper;

        PluginHelper.SelectWoo();
        PluginHelper.ColorPicker();
        PluginHelper.FieldDependency();
        PluginHelper.ImageUploader();
    });
}); // end of jquery main wrapper

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginHelper", function() { return PluginHelper; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global WVSPluginObject, wp*/

var PluginHelper = function ($) {
    var PluginHelper = function () {
        function PluginHelper() {
            _classCallCheck(this, PluginHelper);
        }

        _createClass(PluginHelper, null, [{
            key: 'ImageUploader',
            value: function ImageUploader() {
                $(document).off('click', 'button.wvs_upload_image_button');
                $(document).on('click', 'button.wvs_upload_image_button', this.AddImage);
                $(document).on('click', 'button.wvs_remove_image_button', this.RemoveImage);
            }
        }, {
            key: 'AddImage',
            value: function AddImage(event) {
                var _this = this;

                event.preventDefault();
                event.stopPropagation();

                var file_frame = void 0;

                if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {

                    // If the media frame already exists, reopen it.
                    if (file_frame) {
                        file_frame.open();
                        return;
                    }

                    // Create the media frame.
                    file_frame = wp.media.frames.select_image = wp.media({
                        title: WVSPluginObject.media_title,
                        button: {
                            text: WVSPluginObject.button_title
                        },
                        multiple: false
                    });

                    // When an image is selected, run a callback.
                    file_frame.on('select', function () {
                        var attachment = file_frame.state().get('selection').first().toJSON();

                        if ($.trim(attachment.id) !== '') {

                            var url = typeof attachment.sizes.thumbnail === 'undefined' ? attachment.sizes.full.url : attachment.sizes.thumbnail.url;

                            $(_this).prev().val(attachment.id);
                            $(_this).closest('.meta-image-field-wrapper').find('img').attr('src', url);
                            $(_this).next().show();
                        }
                        //file_frame.close();
                    });

                    // When open select selected
                    file_frame.on('open', function () {

                        // Grab our attachment selection and construct a JSON representation of the model.
                        var selection = file_frame.state().get('selection');
                        var current = $(_this).prev().val();
                        var attachment = wp.media.attachment(current);
                        attachment.fetch();
                        selection.add(attachment ? [attachment] : []);
                    });

                    // Finally, open the modal.
                    file_frame.open();
                }
            }
        }, {
            key: 'RemoveImage',
            value: function RemoveImage(event) {

                event.preventDefault();
                event.stopPropagation();

                var placeholder = $(this).closest('.meta-image-field-wrapper').find('img').data('placeholder');
                $(this).closest('.meta-image-field-wrapper').find('img').attr('src', placeholder);
                $(this).prev().prev().val('');
                $(this).hide();
                return false;
            }
        }, {
            key: 'SelectWoo',
            value: function SelectWoo() {
                var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'select.wvs-selectwoo';

                if ($().selectWoo) {
                    $(selector).selectWoo({
                        allowClear: true
                    });
                }
            }
        }, {
            key: 'ColorPicker',
            value: function ColorPicker() {
                var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input.wvs-color-picker';

                if ($().wpColorPicker) {
                    $(selector).wpColorPicker();
                }
            }
        }, {
            key: 'FieldDependency',
            value: function FieldDependency() {
                var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-depends]';

                if ($().FormFieldDependency) {
                    $(selector).FormFieldDependency();
                }
            }
        }]);

        return PluginHelper;
    }();

    return PluginHelper;
}(jQuery);



/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2FkbWluLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDcyOTU5YTFkYzRmZWViZjhlNTQ0Iiwid2VicGFjazovLy9zcmMvanMvYmFja2VuZC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL1BsdWdpbkhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9iYWNrZW5kLnNjc3M/YmU2MSIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9mcm9udGVuZC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL3Rvb2x0aXAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3Mjk1OWExZGM0ZmVlYmY4ZTU0NCIsImpRdWVyeSgkID0+IHtcbiAgICBpbXBvcnQoJy4vUGx1Z2luSGVscGVyJykudGhlbigoe1BsdWdpbkhlbHBlcn0pID0+IHtcbiAgICAgICAgUGx1Z2luSGVscGVyLlNlbGVjdFdvbygpO1xuICAgICAgICBQbHVnaW5IZWxwZXIuQ29sb3JQaWNrZXIoKTtcbiAgICAgICAgUGx1Z2luSGVscGVyLkZpZWxkRGVwZW5kZW5jeSgpO1xuICAgICAgICBQbHVnaW5IZWxwZXIuSW1hZ2VVcGxvYWRlcigpO1xuICAgIH0pO1xufSk7ICAvLyBlbmQgb2YganF1ZXJ5IG1haW4gd3JhcHBlclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvYmFja2VuZC5qcyIsIi8qZ2xvYmFsIFdWU1BsdWdpbk9iamVjdCwgd3AqL1xuXG5jb25zdCBQbHVnaW5IZWxwZXIgPSAoKCQpID0+IHtcbiAgICBjbGFzcyBQbHVnaW5IZWxwZXIge1xuXG4gICAgICAgIHN0YXRpYyBJbWFnZVVwbG9hZGVyKCkge1xuICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsICdidXR0b24ud3ZzX3VwbG9hZF9pbWFnZV9idXR0b24nKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24ud3ZzX3VwbG9hZF9pbWFnZV9idXR0b24nLCB0aGlzLkFkZEltYWdlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24ud3ZzX3JlbW92ZV9pbWFnZV9idXR0b24nLCB0aGlzLlJlbW92ZUltYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBBZGRJbWFnZShldmVudCkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGxldCBmaWxlX2ZyYW1lO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdwICE9PSAndW5kZWZpbmVkJyAmJiB3cC5tZWRpYSAmJiB3cC5tZWRpYS5lZGl0b3IpIHtcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBtZWRpYSBmcmFtZSBhbHJlYWR5IGV4aXN0cywgcmVvcGVuIGl0LlxuICAgICAgICAgICAgICAgIGlmIChmaWxlX2ZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVfZnJhbWUub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBtZWRpYSBmcmFtZS5cbiAgICAgICAgICAgICAgICBmaWxlX2ZyYW1lID0gd3AubWVkaWEuZnJhbWVzLnNlbGVjdF9pbWFnZSA9IHdwLm1lZGlhKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgOiBXVlNQbHVnaW5PYmplY3QubWVkaWFfdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbiAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA6IFdWU1BsdWdpbk9iamVjdC5idXR0b25fdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gYW4gaW1hZ2UgaXMgc2VsZWN0ZWQsIHJ1biBhIGNhbGxiYWNrLlxuICAgICAgICAgICAgICAgIGZpbGVfZnJhbWUub24oJ3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBmaWxlX2ZyYW1lLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpLnRvSlNPTigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0oYXR0YWNobWVudC5pZCkgIT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSAodHlwZW9mKGF0dGFjaG1lbnQuc2l6ZXMudGh1bWJuYWlsKSA9PT0gJ3VuZGVmaW5lZCcpID8gYXR0YWNobWVudC5zaXplcy5mdWxsLnVybCA6IGF0dGFjaG1lbnQuc2l6ZXMudGh1bWJuYWlsLnVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcmV2KCkudmFsKGF0dGFjaG1lbnQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcubWV0YS1pbWFnZS1maWVsZC13cmFwcGVyJykuZmluZCgnaW1nJykuYXR0cignc3JjJywgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykubmV4dCgpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2ZpbGVfZnJhbWUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gb3BlbiBzZWxlY3Qgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICBmaWxlX2ZyYW1lLm9uKCdvcGVuJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgb3VyIGF0dGFjaG1lbnQgc2VsZWN0aW9uIGFuZCBjb25zdHJ1Y3QgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbC5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiAgPSBmaWxlX2ZyYW1lLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgICAgPSAkKHRoaXMpLnByZXYoKS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSB3cC5tZWRpYS5hdHRhY2htZW50KGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50LmZldGNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoYXR0YWNobWVudCA/IFthdHRhY2htZW50XSA6IFtdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIEZpbmFsbHksIG9wZW4gdGhlIG1vZGFsLlxuICAgICAgICAgICAgICAgIGZpbGVfZnJhbWUub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIFJlbW92ZUltYWdlKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5jbG9zZXN0KCcubWV0YS1pbWFnZS1maWVsZC13cmFwcGVyJykuZmluZCgnaW1nJykuZGF0YSgncGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLm1ldGEtaW1hZ2UtZmllbGQtd3JhcHBlcicpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICQodGhpcykucHJldigpLnByZXYoKS52YWwoJycpO1xuICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgU2VsZWN0V29vKHNlbGVjdG9yID0gJ3NlbGVjdC53dnMtc2VsZWN0d29vJykge1xuICAgICAgICAgICAgaWYgKCQoKS5zZWxlY3RXb28pIHtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5zZWxlY3RXb28oe1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0NsZWFyIDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIENvbG9yUGlja2VyKHNlbGVjdG9yID0gJ2lucHV0Lnd2cy1jb2xvci1waWNrZXInKSB7XG4gICAgICAgICAgICBpZiAoJCgpLndwQ29sb3JQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS53cENvbG9yUGlja2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgRmllbGREZXBlbmRlbmN5KHNlbGVjdG9yID0gJ1tkYXRhLWRlcGVuZHNdJykge1xuICAgICAgICAgICAgaWYgKCQoKS5Gb3JtRmllbGREZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcikuRm9ybUZpZWxkRGVwZW5kZW5jeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFBsdWdpbkhlbHBlcjtcbn0pKGpRdWVyeSk7XG5cbmV4cG9ydCB7IFBsdWdpbkhlbHBlciB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvUGx1Z2luSGVscGVyLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zY3NzL2JhY2tlbmQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Njc3MvZnJvbnRlbmQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Njc3MvdG9vbHRpcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUFBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUxBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5REE7QUFBQTtBQUFBO0FBQ0E7QUFpRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBMUVBO0FBQUE7QUFBQTtBQTRFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBbEZBO0FBQUE7QUFBQTtBQW9GQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUF4RkE7QUFBQTtBQUFBO0FBMEZBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQTlGQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBZ0dBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JHQTs7Ozs7O0FDQUE7Ozs7OztBQ0FBOzs7QSIsInNvdXJjZVJvb3QiOiIifQ==