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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

jQuery(function ($) {
    Promise.resolve().then(function () {
        return __webpack_require__(8);
    }).then(function () {
        // Init on Ajax Popup :)
        $(document).on('wc_variation_form', '.variations_form', function () {
            $(this).WooVariationSwatches();
        });
    });
}); // end of jquery main wrapper

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ================================================================
// WooCommerce Variation Change
// ================================================================

// decrease `woocommerce_ajax_variation_threshold` filter value for ajax testing

var WooVariationSwatches = function ($) {

    var Default = {};

    var WooVariationSwatches = function () {
        function WooVariationSwatches(element, config) {
            _classCallCheck(this, WooVariationSwatches);

            // Assign
            this._element = $(element);
            this._config = $.extend({}, Default, config);
            this._generated = {};
            this.is_ajax_variation = !this._element.data('product_variations');

            // Call
            this.init();
            this.update(this.is_ajax_variation);
            this.reset(this.is_ajax_variation);

            $(document).trigger('woo_variation_swatches', [this._element]);
        }

        _createClass(WooVariationSwatches, [{
            key: 'init',
            value: function init() {
                this._element.find('ul.variable-items-wrapper').each(function (i, el) {

                    var select = $(this).siblings('select.woo-variation-raw-select');

                    $(this).on('click', 'li', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var value = $(this).data('value');
                        select.val(value).trigger('change');
                        select.trigger('click');
                        select.trigger('focusin');
                        select.trigger('touchstart');
                    });
                });
            }
        }, {
            key: 'reset',
            value: function reset(is_ajax) {
                this._element.on('reset_data', function (event) {
                    var isAjaxVariation = !$(this).data('product_variations');
                    $(this).find('ul.variable-items-wrapper').each(function () {
                        var li = $(this).find('li');
                        li.each(function () {
                            if (!is_ajax) {
                                $(this).removeClass('selected');
                                $(this).removeClass('disabled');
                            }
                        });
                    });
                });
            }
        }, {
            key: 'update',
            value: function update(is_ajax) {
                this._element.on('woocommerce_variation_has_changed', function (event) {
                    if (is_ajax) {
                        $(this).find('ul.variable-items-wrapper').each(function () {
                            var selected = '',
                                options = $(this).siblings('select.woo-variation-raw-select').find('option'),
                                current = $(this).siblings('select.woo-variation-raw-select').find('option:selected'),
                                eq = $(this).siblings('select.woo-variation-raw-select').find('option').eq(1),
                                li = $(this).find('li'),
                                selects = [];

                            options.each(function () {
                                if ($(this).val() !== '') {
                                    selects.push($(this).val());
                                    selected = current ? current.val() : eq.val();
                                }
                            });
                            _.delay(function () {
                                li.each(function () {
                                    var value = $(this).attr('data-value');
                                    $(this).removeClass('selected disabled');
                                    if (value === selected) {
                                        $(this).addClass('selected');
                                    }
                                });
                            }, 1);
                        });
                    }
                });

                // WithOut Ajax Update
                this._element.on('woocommerce_update_variation_values', function (event) {
                    $(this).find('ul.variable-items-wrapper').each(function () {

                        var selected = '',
                            options = $(this).siblings('select.woo-variation-raw-select').find('option'),
                            current = $(this).siblings('select.woo-variation-raw-select').find('option:selected'),
                            eq = $(this).siblings('select.woo-variation-raw-select').find('option').eq(1),
                            li = $(this).find('li'),
                            selects = [];

                        options.each(function () {
                            if ($(this).val() !== '') {
                                selects.push($(this).val());
                                selected = current ? current.val() : eq.val();
                            }
                        });

                        _.delay(function () {
                            li.each(function () {
                                var value = $(this).attr('data-value');
                                $(this).removeClass('selected disabled');
                                if (_.contains(selects, value)) {
                                    $(this).removeClass('disabled');
                                    if (value === selected) {
                                        $(this).addClass('selected');
                                    }
                                } else {
                                    $(this).addClass('disabled');
                                }
                            });
                        }, 1);
                    });
                });
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                return this.each(function () {
                    new WooVariationSwatches(this, config);
                });
            }
        }]);

        return WooVariationSwatches;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn['WooVariationSwatches'] = WooVariationSwatches._jQueryInterface;
    $.fn['WooVariationSwatches'].Constructor = WooVariationSwatches;
    $.fn['WooVariationSwatches'].noConflict = function () {
        $.fn['WooVariationSwatches'] = $.fn['WooVariationSwatches'];
        return WooVariationSwatches._jQueryInterface;
    };

    return WooVariationSwatches;
}(jQuery);

/* harmony default export */ __webpack_exports__["default"] = (WooVariationSwatches);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2Zyb250ZW5kLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDcyOTU5YTFkYzRmZWViZjhlNTQ0Iiwid2VicGFjazovLy9zcmMvanMvZnJvbnRlbmQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9Xb29WYXJpYXRpb25Td2F0Y2hlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3Mjk1OWExZGM0ZmVlYmY4ZTU0NCIsImpRdWVyeSgkID0+IHtcbiAgICBpbXBvcnQoJy4vV29vVmFyaWF0aW9uU3dhdGNoZXMnKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gSW5pdCBvbiBBamF4IFBvcHVwIDopXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd3Y192YXJpYXRpb25fZm9ybScsICcudmFyaWF0aW9uc19mb3JtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5Xb29WYXJpYXRpb25Td2F0Y2hlcygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyAgLy8gZW5kIG9mIGpxdWVyeSBtYWluIHdyYXBwZXJcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2Zyb250ZW5kLmpzIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gV29vQ29tbWVyY2UgVmFyaWF0aW9uIENoYW5nZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBkZWNyZWFzZSBgd29vY29tbWVyY2VfYWpheF92YXJpYXRpb25fdGhyZXNob2xkYCBmaWx0ZXIgdmFsdWUgZm9yIGFqYXggdGVzdGluZ1xuXG5jb25zdCBXb29WYXJpYXRpb25Td2F0Y2hlcyA9ICgoJCkgPT4ge1xuXG4gICAgY29uc3QgRGVmYXVsdCA9IHt9O1xuXG4gICAgY2xhc3MgV29vVmFyaWF0aW9uU3dhdGNoZXMge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuXG4gICAgICAgICAgICAvLyBBc3NpZ25cbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5fY29uZmlnICAgICAgICAgICA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVkICAgICAgICA9IHt9O1xuICAgICAgICAgICAgdGhpcy5pc19hamF4X3ZhcmlhdGlvbiA9ICF0aGlzLl9lbGVtZW50LmRhdGEoJ3Byb2R1Y3RfdmFyaWF0aW9ucycpO1xuXG4gICAgICAgICAgICAvLyBDYWxsXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuaXNfYWpheF92YXJpYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5yZXNldCh0aGlzLmlzX2FqYXhfdmFyaWF0aW9uKTtcblxuICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignd29vX3ZhcmlhdGlvbl9zd2F0Y2hlcycsIFt0aGlzLl9lbGVtZW50XSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5ldyBXb29WYXJpYXRpb25Td2F0Y2hlcyh0aGlzLCBjb25maWcpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuZGF0YSgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnZhbCh2YWx1ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdC50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcigndG91Y2hzdGFydCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNldChpc19hamF4KSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm9uKCdyZXNldF9kYXRhJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzQWpheFZhcmlhdGlvbiA9ICEkKHRoaXMpLmRhdGEoJ3Byb2R1Y3RfdmFyaWF0aW9ucycpO1xuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGkgPSAkKHRoaXMpLmZpbmQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc19hamF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKGlzX2FqYXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQub24oJ3dvb2NvbW1lcmNlX3ZhcmlhdGlvbl9oYXNfY2hhbmdlZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChpc19hamF4KSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXEgICAgICAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJykuZXEoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGkgICAgICAgPSAkKHRoaXMpLmZpbmQoJ2xpJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cyAgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cy5wdXNoKCQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGN1cnJlbnQgPyBjdXJyZW50LnZhbCgpIDogZXEudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRlbGF5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIGRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gV2l0aE91dCBBamF4IFVwZGF0ZVxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5vbignd29vY29tbWVyY2VfdXBkYXRlX3ZhcmlhdGlvbl92YWx1ZXMnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ3VsLnZhcmlhYmxlLWl0ZW1zLXdyYXBwZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBlcSAgICAgICA9ICQodGhpcykuc2libGluZ3MoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb24nKS5lcSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpICAgICAgID0gJCh0aGlzKS5maW5kKCdsaScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cyAgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cy5wdXNoKCQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gY3VycmVudCA/IGN1cnJlbnQudmFsKCkgOiBlcS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5kZWxheShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCBkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmNvbnRhaW5zKHNlbGVjdHMsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJC5mblsnV29vVmFyaWF0aW9uU3dhdGNoZXMnXSA9IFdvb1ZhcmlhdGlvblN3YXRjaGVzLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJC5mblsnV29vVmFyaWF0aW9uU3dhdGNoZXMnXS5Db25zdHJ1Y3RvciA9IFdvb1ZhcmlhdGlvblN3YXRjaGVzO1xuICAgICQuZm5bJ1dvb1ZhcmlhdGlvblN3YXRjaGVzJ10ubm9Db25mbGljdCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQuZm5bJ1dvb1ZhcmlhdGlvblN3YXRjaGVzJ10gPSAkLmZuWydXb29WYXJpYXRpb25Td2F0Y2hlcyddO1xuICAgICAgICByZXR1cm4gV29vVmFyaWF0aW9uU3dhdGNoZXMuX2pRdWVyeUludGVyZmFjZVxuICAgIH1cblxuICAgIHJldHVybiBXb29WYXJpYXRpb25Td2F0Y2hlcztcblxufSkoalF1ZXJ5KTtcblxuZXhwb3J0IGRlZmF1bHQgV29vVmFyaWF0aW9uU3dhdGNoZXNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL1dvb1ZhcmlhdGlvblN3YXRjaGVzLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXJCQTtBQUFBO0FBQUE7QUE2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0NBO0FBQUE7QUFBQTtBQThDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFEQTtBQUFBO0FBQUE7QUE2REE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3SEE7QUFBQTtBQUFBO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBMUJBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUErSEE7Ozs7OztBQU1BOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=