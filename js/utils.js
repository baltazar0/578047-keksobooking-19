'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
  };

  var getRandomLengthArray = function (arr) {
    var newArr = [];
    var randomLength = getRandomInteger(1, arr.length);
    for (var i = 0; i < randomLength; i++) {
      var element = arr[i];
      newArr.push(element);
    }
    return newArr;
  };

  var escPress = function (evt, cb) {
    if (evt.key === ESC_KEY) {
      cb();
    }
  };

  window.utils = {
    enter: ENTER_KEY,
    escPress: escPress,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    getRandomLengthArray: getRandomLengthArray
  };
})();
