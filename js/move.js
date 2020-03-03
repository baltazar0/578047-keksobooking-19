'use strict';

(function () {
  var BORDER = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  // var pin = document.querySelector('.map__pin--main');

  var dragRegion = {
    minX: BORDER.MIN_X - MAIN_PIN_WIDTH / 2,
    maxX: BORDER.MAX_X - MAIN_PIN_WIDTH / 2,
    minY: BORDER.MIN_Y - MAIN_PIN_HEIGHT,
    maxY: BORDER.MAX_Y - MAIN_PIN_HEIGHT
  };

  var getCoordsDrag = function (coord, min, max) {
    if (coord < min) {
      coord = min;
    } else if (coord > max) {
      coord = max;
    } else {
      coord = coord;
    }
    return coord;
  };

  var dragPin = function (pin) {
    var pinMouseDownHandler = function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var pinMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var newCoords = {
          x: pin.offsetLeft - shift.x,
          y: pin.offsetTop - shift.y
        };

        var pinCoordX = getCoordsDrag(newCoords.x, dragRegion.minX, dragRegion.maxX);
        var pinCoordY = getCoordsDrag(newCoords.y, dragRegion.minY, dragRegion.maxY);
        pin.style.left = pinCoordX + 'px';
        pin.style.top = pinCoordY + 'px';
        window.form.getAddressInput(pin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
      };

      var pinMouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', pinMouseMoveHandler);
        window.removeEventListener('mouseup', pinMouseUpHandler);
      };

      document.addEventListener('mousemove', pinMouseMoveHandler);
      window.addEventListener('mouseup', pinMouseUpHandler);
    };

    pin.addEventListener('mousedown', pinMouseDownHandler);
  };

  // var dataGetError = function (pin) {
  //   pin.removeEventListener('mousedown', pinMouseDownHandler);
  // };

  window.move = {
    dragPin: dragPin
    // dataGetError: dataGetError
    //   dataError: function () {
    //     pin.removeEventListener('mousedown', pinMouseDownHandler);
    //   }
  };
})();
