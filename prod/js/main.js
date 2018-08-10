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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_datepicker_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_datepicker_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_datepicker_scss__);

var DatePicker = Backbone.View.extend({
	el: '.js-datepicker-content',
	CLASSES: {
		hide: 'is-hidden',
		calendar: '.js-datepicker'
	},

	date: function () {
		var today = new Date();
		return {
			mm: today.getMonth(),
			dd: today.getDate(),
			yyyy: today.getFullYear()
		};
	},
	numberMonths: 12,
	dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat'],
	monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octover', 'November', 'December'],

	initialize: function () {
		this.render();
		return this;
	},

	render: function () {
		$('.js-datepicker-content').append(this.monthTemplate());
	},

	events: {
		'click .js-datepicker-input': 'toggle',
		'click .js-day': 'updateInput',
		'click .js-calendar-left': 'moveCalendar',
		'click .js-calendar-right': 'moveCalendar'
	},

	buttonsTemplate: function () {
		return '<button class="js-calendar-left calendar__left">Left</button><button class="js-calendar-right calendar__right">Right</button>';
	},

	weekHeaderTemplate: function () {
		var daysName = this.dayName.map(function (day, index) {
			return day;
		}).join('</li><li>');

		return '<ul class="grid-container__7-cols"><li>' + daysName + '</li></ul>';
	},

	monthContentTemplate: function (month, year) {
		var totalDays = this.daysInMonth(month + 1, year),
		    that = this,
		    html = new String(),
		    firstDaysDay = new Date(month + 1 + ' 1, ' + year).getDay(),
		    spaces = totalDays + firstDaysDay;

		new Array(spaces).fill(undefined).map(function (space, index) {
			if (index < firstDaysDay) {
				html += '<li class="datepicker-day"></li>';
			} else {
				html += '<li class="datepicker-day"><button class="js-day" data-day="' + new Date(month + 1 + ' ' + (index + 1 - firstDaysDay) + ', ' + year).toLocaleDateString() + '">' + (index + 1 - firstDaysDay) + '</button></li>';
			}
			return html;
		});

		return '<ul class="grid-container__7-cols">' + html + '</ul>';
	},

	monthTemplate: function () {
		var that = this,
		    html = new String(),
		    year = this.date().yyyy;

		new Array(this.numberMonths).fill(undefined).map(function (month, index) {
			month = (that.date().mm + index) % 12;
			year = month === 0 ? year + 1 : year;

			html += '<section class="datepicker-month"><h4>' + that.monthName(month) + year + '</h4>' + that.weekHeaderTemplate() + that.monthContentTemplate(month, year) + '</section>';
		});

		return '<section class="js-datepicker calendar is-hidden">' + this.buttonsTemplate() + '<div class="js-calendar-months calendar__months">' + html + '</div></section>';
	},

	daysInMonth: function (month, year) {
		// Use month = 1 for January, 2 for February, etc.
		return new Date(year, month, 0).getDate();
	},

	monthName: function (month) {
		return this.monthNames[month];
	},

	weekDay: function (date) {
		return this.dayName[new Date(date).getDay()];
	},

	elSizeAndPosition(element) {
		return {
			left: element.offsetLeft,
			top: element.offsetTop,
			height: element.offsetHeight,
			width: element.offsetWidth
		};
	},
	moveCalendar: function (e) {
		var left = this.elSizeAndPosition($('.js-calendar-months')[0]).left;
		$(e.currentTarget).hasClass('js-calendar-left') ? $('.js-calendar-months').animate({ 'margin-left': '-=600' }) : $('.js-calendar-months').animate({ 'margin-left': '+=600' });
	},

	toggle: function (e) {
		$(this.CLASSES.calendar).toggleClass(this.CLASSES.hide);
	},

	updateInput: function (e) {
		$('.js-day').map(function (day) {
			return $(this).removeClass('active');
		});
		$(e.currentTarget).addClass('active');

		$('.js-datepicker-input').val($(e.currentTarget).data('day')).trigger('click');
	}
});
var datePicker = new DatePicker();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);