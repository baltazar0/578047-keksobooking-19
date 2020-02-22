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
  var mapPinMain = document.querySelector('.map__pin--main');

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

  var pinMainMouseDownHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var pinMainMouseMoveHandler = function (moveEvt) {
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
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      var mapPinMainCoordX = getCoordsDrag(newCoords.x, dragRegion.minX, dragRegion.maxX);
      var mapPinMainCoordY = getCoordsDrag(newCoords.y, dragRegion.minY, dragRegion.maxY);
      mapPinMain.style.left = mapPinMainCoordX + 'px';
      mapPinMain.style.top = mapPinMainCoordY + 'px';
      window.form.getAddressInput(mapPinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
    };

    var pinMainMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', pinMainMouseMoveHandler);
      window.removeEventListener('mouseup', pinMainMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMainMouseMoveHandler);
    window.addEventListener('mouseup', pinMainMouseUpHandler);
  };

  mapPinMain.addEventListener('mousedown', pinMainMouseDownHandler);

})();
